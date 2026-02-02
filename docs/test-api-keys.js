#!/usr/bin/env node

/**
 * API Keys Verification Script
 * Tests if your LLM API keys are configured correctly
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

function checkEnvVar(name, description) {
  const value = process.env[name];
  
  if (!value || value.trim() === '') {
    log(`❌ ${name} - NOT SET`, 'red');
    log(`   ${description}`, 'yellow');
    return false;
  }
  
  // Mask the key for security
  const masked = value.substring(0, 8) + '...' + value.substring(value.length - 4);
  log(`✅ ${name} - SET (${masked})`, 'green');
  return true;
}

async function testOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    return false;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    if (response.ok) {
      log('   ✓ OpenAI API key is valid!', 'green');
      return true;
    } else {
      log('   ✗ OpenAI API key is invalid or expired', 'red');
      return false;
    }
  } catch (error) {
    log('   ✗ Could not connect to OpenAI API', 'red');
    return false;
  }
}

async function testGemini() {
  if (!process.env.GEMINI_API_KEY) {
    return false;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`);

    if (response.ok) {
      log('   ✓ Gemini API key is valid!', 'green');
      return true;
    } else {
      log('   ✗ Gemini API key is invalid or expired', 'red');
      return false;
    }
  } catch (error) {
    log('   ✗ Could not connect to Gemini API', 'red');
    return false;
  }
}

async function testDeepSeek() {
  if (!process.env.DEEPSEEK_API_KEY) {
    return false;
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
    });

    if (response.ok) {
      log('   ✓ DeepSeek API key is valid!', 'green');
      return true;
    } else {
      log('   ✗ DeepSeek API key is invalid or expired', 'red');
      return false;
    }
  } catch (error) {
    log('   ✗ Could not connect to DeepSeek API', 'red');
    return false;
  }
}

async function main() {
  log('\n🔍 AgathaAI - API Keys Verification\n', 'cyan');
  log('═'.repeat(50), 'blue');
  
  // Check environment variables
  log('\n📋 Checking Environment Variables:\n', 'cyan');
  
  const hasOpenAI = checkEnvVar('OPENAI_API_KEY', 'Get from: https://platform.openai.com/api-keys');
  const hasGemini = checkEnvVar('GEMINI_API_KEY', 'Get from: https://aistudio.google.com/app/apikey');
  const hasDeepSeek = checkEnvVar('DEEPSEEK_API_KEY', 'Get from: https://platform.deepseek.com/');
  
  log('\n' + '═'.repeat(50), 'blue');
  
  // Test API connections
  log('\n🌐 Testing API Connections:\n', 'cyan');
  
  if (hasOpenAI) {
    log('Testing OpenAI API...', 'yellow');
    await testOpenAI();
  }
  
  if (hasGemini) {
    log('\nTesting Gemini API...', 'yellow');
    await testGemini();
  }
  
  if (hasDeepSeek) {
    log('\nTesting DeepSeek API...', 'yellow');
    await testDeepSeek();
  }
  
  log('\n' + '═'.repeat(50), 'blue');
  
  // Summary
  log('\n📊 Summary:\n', 'cyan');
  
  const totalKeys = 3;
  const configuredKeys = [hasOpenAI, hasGemini, hasDeepSeek].filter(Boolean).length;
  
  if (configuredKeys === 0) {
    log('❌ No API keys configured!', 'red');
    log('\n📝 Next Steps:', 'yellow');
    log('1. Edit .env.local file', 'yellow');
    log('2. Add your API keys', 'yellow');
    log('3. Run this script again: node test-api-keys.js', 'yellow');
  } else if (configuredKeys < totalKeys) {
    log(`⚠️  ${configuredKeys}/${totalKeys} API keys configured`, 'yellow');
    log('\nYou can still use the models with configured keys.', 'yellow');
    log('Add the missing keys to enable all models.', 'yellow');
  } else {
    log('✅ All API keys configured!', 'green');
    log('\n🚀 You\'re ready to start using AgathaAI!', 'green');
    log('\nRun: npm run dev', 'cyan');
  }
  
  log('\n' + '═'.repeat(50) + '\n', 'blue');
}

main().catch(console.error);
