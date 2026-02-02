#!/usr/bin/env node

/**
 * Test Script: LLM API Keys & Chat History
 * Tests if LLM API keys work and if chat history is stored
 */

require('dotenv').config({ path: '.env.local' });

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test 1: Check if API keys are configured
function checkAPIKeys() {
  log('\n📋 Checking API Keys Configuration:\n', 'cyan');
  
  const keys = {
    'OPENAI_API_KEY': process.env.OPENAI_API_KEY,
    'GEMINI_API_KEY': process.env.GEMINI_API_KEY,
    'DEEPSEEK_API_KEY': process.env.DEEPSEEK_API_KEY,
  };
  
  let configured = 0;
  
  for (const [name, value] of Object.entries(keys)) {
    if (value && value.trim() !== '') {
      const masked = value.substring(0, 8) + '...' + value.substring(value.length - 4);
      log(`✅ ${name}: ${masked}`, 'green');
      configured++;
    } else {
      log(`❌ ${name}: NOT SET`, 'red');
    }
  }
  
  return configured;
}

// Test 2: Test OpenAI API
async function testOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    log('⏭️  Skipping OpenAI test (no API key)', 'yellow');
    return false;
  }

  log('\n🧪 Testing OpenAI API...', 'yellow');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say "Hello from OpenAI!"' }],
        max_tokens: 20,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0].message.content;
      log(`✅ OpenAI API is working!`, 'green');
      log(`   Response: "${reply}"`, 'green');
      return true;
    } else {
      const error = await response.text();
      log(`❌ OpenAI API error: ${response.status}`, 'red');
      log(`   ${error}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ OpenAI API connection failed: ${error.message}`, 'red');
    return false;
  }
}

// Test 3: Test Gemini API
async function testGemini() {
  if (!process.env.GEMINI_API_KEY) {
    log('\n⏭️  Skipping Gemini test (no API key)', 'yellow');
    return false;
  }

  log('\n🧪 Testing Gemini API...', 'yellow');
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Say "Hello from Gemini!"' }]
          }]
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const reply = data.candidates[0].content.parts[0].text;
      log(`✅ Gemini API is working!`, 'green');
      log(`   Response: "${reply}"`, 'green');
      return true;
    } else {
      const error = await response.text();
      log(`❌ Gemini API error: ${response.status}`, 'red');
      log(`   ${error}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Gemini API connection failed: ${error.message}`, 'red');
    return false;
  }
}

// Test 4: Test DeepSeek API
async function testDeepSeek() {
  if (!process.env.DEEPSEEK_API_KEY) {
    log('\n⏭️  Skipping DeepSeek test (no API key)', 'yellow');
    return false;
  }

  log('\n🧪 Testing DeepSeek API...', 'yellow');
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: 'Say "Hello from DeepSeek!"' }],
        max_tokens: 20,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reply = data.choices[0].message.content;
      log(`✅ DeepSeek API is working!`, 'green');
      log(`   Response: "${reply}"`, 'green');
      return true;
    } else {
      const error = await response.text();
      log(`❌ DeepSeek API error: ${response.status}`, 'red');
      log(`   ${error}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ DeepSeek API connection failed: ${error.message}`, 'red');
    return false;
  }
}

// Test 5: Check Database Connection
async function testDatabase() {
  log('\n🗄️  Testing Database Connection...', 'yellow');
  
  if (!process.env.DATABASE_URL) {
    log('❌ DATABASE_URL not configured', 'red');
    return false;
  }

  try {
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    
    // Check if inference_requests table exists
    const result = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'inference_requests'
      );
    `);
    
    if (result.rows[0].exists) {
      log('✅ Database connected!', 'green');
      log('✅ inference_requests table exists', 'green');
      
      // Check recent requests
      const countResult = await client.query(
        'SELECT COUNT(*) FROM inference_requests'
      );
      const count = countResult.rows[0].count;
      log(`   Total requests in history: ${count}`, 'green');
      
      await client.end();
      return true;
    } else {
      log('❌ inference_requests table not found', 'red');
      log('   Run: npm run db:migrate', 'yellow');
      await client.end();
      return false;
    }
  } catch (error) {
    log(`❌ Database connection failed: ${error.message}`, 'red');
    return false;
  }
}

// Test 6: Check Chat History Storage
async function testChatHistory() {
  log('\n📚 Testing Chat History Storage...', 'yellow');
  
  try {
    const { Client } = require('pg');
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });

    await client.connect();
    
    // Get recent chat history
    const result = await client.query(`
      SELECT 
        id,
        model,
        status,
        LEFT(prompt, 50) as prompt_preview,
        LEFT(response, 50) as response_preview,
        tokens_total,
        processing_time_ms,
        created_at
      FROM inference_requests
      ORDER BY created_at DESC
      LIMIT 5
    `);
    
    if (result.rows.length > 0) {
      log(`✅ Found ${result.rows.length} recent chat(s) in history`, 'green');
      log('\n   Recent chats:', 'cyan');
      
      result.rows.forEach((row, index) => {
        log(`\n   ${index + 1}. ${row.model} - ${row.status}`, 'blue');
        log(`      Prompt: "${row.prompt_preview}..."`, 'reset');
        if (row.response_preview) {
          log(`      Response: "${row.response_preview}..."`, 'reset');
        }
        log(`      Tokens: ${row.tokens_total || 'N/A'}, Time: ${row.processing_time_ms || 'N/A'}ms`, 'reset');
        log(`      Created: ${row.created_at}`, 'reset');
      });
    } else {
      log('⚠️  No chat history found', 'yellow');
      log('   This is normal if you haven\'t used the chat yet', 'yellow');
    }
    
    await client.end();
    return true;
  } catch (error) {
    log(`❌ Failed to check chat history: ${error.message}`, 'red');
    return false;
  }
}

// Main test runner
async function main() {
  log('\n╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                                                                ║', 'cyan');
  log('║       🧪 AgathaAI - LLM API & Chat History Test Suite 🧪      ║', 'cyan');
  log('║                                                                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝', 'cyan');
  
  // Test 1: Check API Keys
  const configuredKeys = checkAPIKeys();
  
  log('\n' + '═'.repeat(65), 'blue');
  
  // Test 2-4: Test LLM APIs
  const openaiWorks = await testOpenAI();
  const geminiWorks = await testGemini();
  const deepseekWorks = await testDeepSeek();
  
  log('\n' + '═'.repeat(65), 'blue');
  
  // Test 5: Database
  const dbWorks = await testDatabase();
  
  // Test 6: Chat History
  if (dbWorks) {
    await testChatHistory();
  }
  
  log('\n' + '═'.repeat(65), 'blue');
  
  // Summary
  log('\n📊 Test Summary:\n', 'cyan');
  
  const workingAPIs = [openaiWorks, geminiWorks, deepseekWorks].filter(Boolean).length;
  
  log(`API Keys Configured: ${configuredKeys}/3`, configuredKeys === 3 ? 'green' : 'yellow');
  log(`Working LLM APIs: ${workingAPIs}/${configuredKeys}`, workingAPIs > 0 ? 'green' : 'red');
  log(`Database: ${dbWorks ? 'Connected ✅' : 'Not Connected ❌'}`, dbWorks ? 'green' : 'red');
  
  log('\n' + '═'.repeat(65), 'blue');
  
  if (workingAPIs === 0 && configuredKeys > 0) {
    log('\n⚠️  WARNING: API keys are configured but not working!', 'yellow');
    log('\nPossible issues:', 'yellow');
    log('1. API keys are invalid or expired', 'yellow');
    log('2. No credits remaining on the accounts', 'yellow');
    log('3. Network connectivity issues', 'yellow');
    log('4. API rate limits exceeded', 'yellow');
  } else if (workingAPIs > 0) {
    log('\n✅ SUCCESS: LLM APIs are working!', 'green');
    log('\nYou can now:', 'green');
    log('1. Start the app: npm run dev', 'green');
    log('2. Go to: http://localhost:3000', 'green');
    log('3. Sign in and start chatting!', 'green');
  }
  
  if (!dbWorks) {
    log('\n⚠️  Database not configured. Run:', 'yellow');
    log('   createdb genai_platform', 'yellow');
    log('   npm run db:migrate', 'yellow');
    log('   npm run db:seed', 'yellow');
  }
  
  log('\n' + '═'.repeat(65) + '\n', 'blue');
}

main().catch(console.error);
