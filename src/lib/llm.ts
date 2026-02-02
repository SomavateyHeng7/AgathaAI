import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { query } from "./database";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

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
  parameters: InferenceParams,
) {
  const startTime = Date.now();

  try {
    // Update status to processing
    await query("UPDATE inference_requests SET status = $1 WHERE id = $2", [
      "processing",
      requestId,
    ]);

    let response: string;
    let tokensPrompt: number;
    let tokensCompletion: number;

    // Call appropriate LLM provider
    if (model.startsWith("gpt-")) {
      if (!openai) throw new Error("OpenAI API key not configured");
      const result = await callOpenAI(model, prompt, parameters);
      response = result.response;
      tokensPrompt = result.tokensPrompt;
      tokensCompletion = result.tokensCompletion;
    } else if (model.startsWith("gemini-")) {
      if (!gemini) throw new Error("Gemini API key not configured");
      const result = await callGemini(model, prompt, parameters);
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
      [
        "completed",
        response,
        tokensPrompt,
        tokensCompletion,
        tokensTotal,
        processingTime,
        requestId,
      ],
    );

    // Update usage statistics
    await updateUsageStatistics(userId, tokensTotal, processingTime, model);
  } catch (error: any) {
    console.error("Inference processing error:", error);

    await query(
      `UPDATE inference_requests
       SET status = $1, error_message = $2, completed_at = NOW()
       WHERE id = $3`,
      ["failed", error.message, requestId],
    );
  }
}

async function callOpenAI(
  model: string,
  prompt: string,
  params: InferenceParams,
) {
  const completion = await openai!.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: params.temperature || 0.7,
    max_tokens: params.maxTokens || 1000,
    top_p: params.topP || 1,
  });

  return {
    response: completion.choices[0].message.content || "",
    tokensPrompt: completion.usage?.prompt_tokens || 0,
    tokensCompletion: completion.usage?.completion_tokens || 0,
  };
}

async function callGemini(
  model: string,
  prompt: string,
  params: InferenceParams,
) {
  // Map model names to actual Gemini model IDs
  const modelMap: Record<string, string> = {
    "gemini-pro": "gemini-1.5-flash-8b",
    "gemini-1.5-pro": "gemini-1.5-flash-8b",
    "gemini-1.5-flash": "gemini-1.5-flash-8b",
  };

  const actualModel = modelMap[model] || "gemini-1.5-flash-8b";
  const genModel = gemini!.getGenerativeModel({ model: actualModel });

  const result = await genModel.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: params.temperature || 0.7,
      maxOutputTokens: params.maxTokens || 1000,
      topP: params.topP || 1,
    },
  });

  const response = result.response;
  const text = response.text();

  const tokensPrompt =
    response.usageMetadata?.promptTokenCount || Math.ceil(prompt.length / 4);
  const tokensCompletion =
    response.usageMetadata?.candidatesTokenCount || Math.ceil(text.length / 4);

  return {
    response: text,
    tokensPrompt,
    tokensCompletion,
  };
}
async function updateUsageStatistics(
  userId: string,
  tokens: number,
  processingTime: number,
  model: string,
) {
  const today = new Date().toISOString().split("T")[0];

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
    [userId, today, tokens, processingTime, JSON.stringify({ [model]: 1 })],
  );
}

export async function chat(
  model: string,
  messages: Array<{ role: string; content: string }>,
  params: InferenceParams = {},
) {
  const startTime = Date.now();

  let response: string;
  let tokensPrompt: number;
  let tokensCompletion: number;

  if (model.startsWith("gpt-")) {
    if (!openai) throw new Error("OpenAI API key not configured");
    const result = await callOpenAIChat(model, messages, params);
    response = result.response;
    tokensPrompt = result.tokensPrompt;
    tokensCompletion = result.tokensCompletion;
  } else if (model.startsWith("gemini-")) {
    if (!gemini) throw new Error("Gemini API key not configured");
    const result = await callGeminiChat(model, messages, params);
    response = result.response;
    tokensPrompt = result.tokensPrompt;
    tokensCompletion = result.tokensCompletion;
  } else {
    throw new Error(`Unsupported model: ${model}`);
  }

  const processingTime = Date.now() - startTime;

  return {
    response,
    tokensPrompt,
    tokensCompletion,
    tokensTotal: tokensPrompt + tokensCompletion,
    processingTime,
  };
}

async function callOpenAIChat(
  model: string,
  messages: Array<{ role: string; content: string }>,
  params: InferenceParams,
) {
  const completion = await openai!.chat.completions.create({
    model,
    messages: messages as any,
    temperature: params.temperature || 0.7,
    max_tokens: params.maxTokens || 2000,
    top_p: params.topP || 1,
  });

  return {
    response: completion.choices[0].message.content || "",
    tokensPrompt: completion.usage?.prompt_tokens || 0,
    tokensCompletion: completion.usage?.completion_tokens || 0,
  };
}

async function callGeminiChat(
  model: string,
  messages: Array<{ role: string; content: string }>,
  params: InferenceParams,
) {
  const modelMap: Record<string, string> = {
    "gemini-pro": "gemini-1.5-flash",
    "gemini-2.5-flash": "gemini-2.5-flash",
    "gemini-2.0-flash": "gemini-2.0-flash",
  };

  const actualModel = modelMap[model] || "gemini-2.0-flash";
  const genModel = gemini!.getGenerativeModel({ model: actualModel });

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const result = await genModel.generateContent({
    contents,
    generationConfig: {
      temperature: params.temperature || 0.7,
      maxOutputTokens: params.maxTokens || 2000,
      topP: params.topP || 1,
    },
  });

  const responseObj = result.response;
  const text = responseObj.text();

  const tokensPrompt =
    responseObj.usageMetadata?.promptTokenCount ||
    Math.ceil(messages.reduce((sum, m) => sum + m.content.length, 0) / 4);
  const tokensCompletion =
    responseObj.usageMetadata?.candidatesTokenCount ||
    Math.ceil(text.length / 4);

  return {
    response: text,
    tokensPrompt,
    tokensCompletion,
  };
}
