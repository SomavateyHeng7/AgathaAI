#!/usr/bin/env node

/**
 * Simple LLM API Test (no dependencies)
 * Run with: node test-llm-simple.js
 */

// Read .env.local file manually
const fs = require('fs');
const path = require('path');

function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        if (key && value) {
          process.env[key.trim()] = value;
        }
      }
    });
  } catch (error) {
    console.log('⚠️  Could not read .env.local file');
  }
}

loadEnv();

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || apiKey.trim() === '') {
    log('⏭️  OpenAI: No API key configured', 'yellow');
    return { configured: false, working: false };
  }
  
  log('🧪 Testing OpenAI API...', 'cyan');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say "Hello!"' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0].message.content;
      log(`✅ OpenAI: Working! Response: "${reply}"`, 'green');
      return { configured: true, working: true, response: reply };
    } else {
      const error = await response.text();
      log(`❌ OpenAI: API error (${response.status})`, 'red');
      log(`   ${error.substring(0, 100)}`, 'red');
      return { configured: true, working: false, error: error.substring(0, 100) };
    }
  } catch (error) {
    log(`❌ OpenAI: Connection failed - ${error.message}`, 'red');
    return { configured: true, working: false, error: error.message };
  }
}

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey.trim() === '') {
    log('⏭️  Gemini: No API key configured', 'yellow');
    return { configured: false, working: false };
  }
  
  log('🧪 Testing Gemini API...', 'cyan');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say "Hello!"' }] }]
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const reply = data.candidates[0].content.parts[0].text;
      log(`✅ Gemini: Working! Response: "${reply}"`, 'green');
      return { configured: true, working: true, response: reply };
    } else {
      const error = await response.text();
      log(`❌ Gemini: API error (${response.status})`, 'red');
      log(`   ${error.substring(0, 100)}`, 'red');
      return { configured: true, working: false, error: error.substring(0, 100) };
    }
  } catch (error) {
    log(`❌ Gemini: Connection failed - ${error.message}`, 'red');
    return { configured: true, working: false, error: error.message };
  }
}

async function testDeepSeek() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey || apiKey.trim() === '') {
    log('⏭️  DeepSeek: No API key configured', 'yellow');
    return { configured: false, working: false };
  }
  
  log('🧪 Testing DeepSeek API...', 'cyan');
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Say "Hello!"' }],
        max_tokens: 10,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0].message.content;
      log(`✅ DeepSeek: Working! Response: "${reply}"`, 'green');
      return { configured: true, working: true, response: reply };
    } else {
      const error = await response.text();
      log(`❌ DeepSeek: API error (${response.status})`, 'red');
      log(`   ${error.substring(0, 100)}`, 'red');
      return { configured: true, working: false, error: error.substring(0, 100) };
    }
  } catch (error) {
    log(`❌ DeepSeek: Connection failed - ${error.message}`, 'red');
    return { configured: true, working: false, error: error.message };
  }
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║                                                        ║', 'cyan');
  log('║       🧪 AgathaAI - LLM API Keys Test 🧪              ║', 'cyan');
  log('║                                                        ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝\n', 'cyan');
  
  const openai = await testOpenAI();
  console.log('');
  const gemini = await testGemini();
  console.log('');
  const deepseek = await testDeepSeek();
  
  log('\n' + '═'.repeat(56), 'cyan');
  log('\n📊 Summary:\n', 'cyan');
  
  const configured = [openai, gemini, deepseek].filter(r => r.configured).length;
  const working = [openai, gemini, deepseek].filter(r => r.working).length;
  
  log(`Configured: ${configured}/3 API keys`, configured > 0 ? 'green' : 'yellow');
  log(`Working: ${working}/${configured} APIs`, working > 0 ? 'green' : 'red');
  
  if (working > 0) {
    log('\n✅ SUCCESS: At least one LLM API is working!', 'green');
    log('\nYou can use these models in the chat:', 'green');
    if (openai.working) log('  • GPT-4, GPT-3.5 Turbo, GPT-4o', 'green');
    if (gemini.working) log('  • Gemini Pro, Gemini 1.5 Pro', 'green');
    if (deepseek.working) log('  • DeepSeek Chat, DeepSeek Coder', 'green');
  } else if (configured > 0) {
    log('\n⚠️  WARNING: API keys configured but not working!', 'yellow');
    log('\nPossible issues:', 'yellow');
    log('  • Invalid or expired API keys', 'yellow');
    log('  • No credits remaining', 'yellow');
    log('  • Rate limits exceeded', 'yellow');
    log('  • Network connectivity issues', 'yellow');
  } else {
    log('\n⚠️  No API keys configured', 'yellow');
    log('\nAdd your API keys to .env.local:', 'yellow');
    log('  OPENAI_API_KEY=sk-...', 'yellow');
    log('  GEMINI_API_KEY=AIza...', 'yellow');
    log('  DEEPSEEK_API_KEY=sk-...', 'yellow');
  }
  
  log('\n' + '═'.repeat(56) + '\n', 'cyan');
}

main().catch(console.error);
