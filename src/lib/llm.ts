import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { query } from './database';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

interface InferenceParams {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export async function processInference(
  requestId: string,
  userId: string,
  model: string,
  prompt: string,
  parameters: InferenceParams
) {
  const startTime = Date.now();
  
  try {
    // Update status to processing
    await query(
      'UPDATE inference_requests SET status = $1 WHERE id = $2',
      ['processing', requestId]
    );
    
    let response: string;
    let tokensPrompt: number;
    let tokensCompletion: number;
    
    // Call appropriate LLM provider
    if (model.startsWith('gpt-')) {
      if (!openai) throw new Error('OpenAI API key not configured');
      const result = await callOpenAI(model, prompt, parameters);
      response = result.response;
      tokensPrompt = result.tokensPrompt;
      tokensCompletion = result.tokensCompletion;
    } else if (model.startsWith('claude-')) {
      if (!anthropic) throw new Error('Anthropic API key not configured');
      const result = await callAnthropic(model, prompt, parameters);
      response = result.response;
      tokensPrompt = result.tokensPrompt;
      tokensCompletion = result.tokensCompletion;
    } else if (model.startsWith('llama-')) {
      const result = await callTogether(model, prompt, parameters);
      response = result.response;
      tokensPrompt = result.tokensPrompt;
      tokensCompletion = result.tokensCompletion;
    } else {
      throw new Error(`Unsupported model: ${model}`);
    }
    
    const processingTime = Date.now() - startTime;
    const tokensTotal = tokensPrompt + tokensCompletion;
    
    // Update request with results
    await query(
      `UPDATE inference_requests
       SET status = $1, response = $2, tokens_prompt = $3, tokens_completion = $4,
           tokens_total = $5, processing_time_ms = $6, completed_at = NOW()
       WHERE id = $7`,
      ['completed', response, tokensPrompt, tokensCompletion, tokensTotal, processingTime, requestId]
    );
    
    // Update usage statistics
    await updateUsageStatistics(userId, tokensTotal, processingTime, model);
    
  } catch (error: any) {
    console.error('Inference processing error:', error);
    
    await query(
      `UPDATE inference_requests
       SET status = $1, error_message = $2, completed_at = NOW()
       WHERE id = $3`,
      ['failed', error.message, requestId]
    );
  }
}

async function callOpenAI(model: string, prompt: string, params: InferenceParams) {
  const completion = await openai!.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: params.temperature || 0.7,
    max_tokens: params.maxTokens || 1000,
    top_p: params.topP || 1,
  });
  
  return {
    response: completion.choices[0].message.content || '',
    tokensPrompt: completion.usage?.prompt_tokens || 0,
    tokensCompletion: completion.usage?.completion_tokens || 0,
  };
}

async function callAnthropic(model: string, prompt: string, params: InferenceParams) {
  const message = await anthropic!.messages.create({
    model,
    max_tokens: params.maxTokens || 1000,
    temperature: params.temperature || 0.7,
    messages: [{ role: 'user', content: prompt }],
  });
  
  const content = message.content[0];
  const responseText = content.type === 'text' ? content.text : '';
  
  return {
    response: responseText,
    tokensPrompt: message.usage.input_tokens,
    tokensCompletion: message.usage.output_tokens,
  };
}

async function callTogether(model: string, prompt: string, params: InferenceParams) {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: params.temperature || 0.7,
      max_tokens: params.maxTokens || 1000,
      top_p: params.topP || 1,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Together API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    response: data.choices[0].message.content,
    tokensPrompt: data.usage?.prompt_tokens || 0,
    tokensCompletion: data.usage?.completion_tokens || 0,
  };
}

async function updateUsageStatistics(userId: string, tokens: number, processingTime: number, model: string) {
  const today = new Date().toISOString().split('T')[0];
  
  await query(
    `INSERT INTO usage_statistics (user_id, date, total_requests, successful_requests, total_tokens, avg_response_time_ms, models_used)
     VALUES ($1, $2, 1, 1, $3, $4, $5)
     ON CONFLICT (user_id, date)
     DO UPDATE SET
       total_requests = usage_statistics.total_requests + 1,
       successful_requests = usage_statistics.successful_requests + 1,
       total_tokens = usage_statistics.total_tokens + $3,
       avg_response_time_ms = (usage_statistics.avg_response_time_ms * usage_statistics.total_requests + $4) / (usage_statistics.total_requests + 1),
       models_used = usage_statistics.models_used || $5`,
    [userId, today, tokens, processingTime, JSON.stringify({ [model]: 1 })]
  );
}
