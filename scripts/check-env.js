/**
 * Environment Variable Checker
 *
 * Pre-build script to verify that all required environment variables are set.
 * Prevents builds from failing silently due to missing configuration.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Required environment variables (must be set for production builds)
const REQUIRED_VARS = ['VITE_APP_NAME', 'VITE_APP_URL', 'VITE_API_BASE_URL'];

// Optional environment variables (warning only if missing)
const OPTIONAL_VARS = ['VITE_GA_TRACKING_ID'];

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = resolve(rootDir, '.env');
  const envExamplePath = resolve(rootDir, '.env.example');

  // Check if .env file exists
  if (!existsSync(envPath)) {
    log(colors.red, '\n[ERROR] .env file not found!');
    log(colors.cyan, '\nTo fix this:');
    log(colors.reset, '  1. Copy .env.example to .env:');
    log(colors.yellow, '     cp .env.example .env');
    log(colors.reset, '  2. Fill in the required values');
    log(colors.reset, '  3. Run the build again\n');

    if (existsSync(envExamplePath)) {
      log(colors.cyan, 'Required variables (from .env.example):');
      const exampleContent = readFileSync(envExamplePath, 'utf-8');
      const vars = exampleContent
        .split('\n')
        .filter((line) => line.includes('=') && !line.startsWith('#'))
        .map((line) => line.split('=')[0].trim());
      vars.forEach((v) => log(colors.yellow, `  - ${v}`));
    }

    process.exit(1);
  }

  // Parse .env file
  const envContent = readFileSync(envPath, 'utf-8');
  const envVars = {};

  envContent.split('\n').forEach((line) => {
    // Skip comments and empty lines
    if (line.startsWith('#') || !line.includes('=')) return;

    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
    envVars[key.trim()] = value;
  });

  // Check required variables
  const missingRequired = [];
  const emptyRequired = [];

  REQUIRED_VARS.forEach((varName) => {
    if (!(varName in envVars)) {
      missingRequired.push(varName);
    } else if (!envVars[varName]) {
      emptyRequired.push(varName);
    }
  });

  // Check optional variables
  const missingOptional = [];

  OPTIONAL_VARS.forEach((varName) => {
    if (!(varName in envVars) || !envVars[varName]) {
      missingOptional.push(varName);
    }
  });

  // Report results
  console.log('');
  log(colors.bold, '=== Environment Check ===\n');

  if (missingRequired.length > 0 || emptyRequired.length > 0) {
    log(colors.red, '[FAILED] Missing required environment variables:\n');

    if (missingRequired.length > 0) {
      log(colors.yellow, '  Not defined:');
      missingRequired.forEach((v) => log(colors.red, `    - ${v}`));
    }

    if (emptyRequired.length > 0) {
      log(colors.yellow, '\n  Defined but empty:');
      emptyRequired.forEach((v) => log(colors.red, `    - ${v}`));
    }

    log(colors.cyan, '\nPlease add these variables to your .env file.\n');
    process.exit(1);
  }

  log(colors.green, '[PASSED] All required environment variables are set.\n');

  // Show optional warnings
  if (missingOptional.length > 0) {
    log(colors.yellow, '[WARNING] Optional variables not configured:');
    missingOptional.forEach((v) => log(colors.yellow, `  - ${v}`));
    console.log('');
  }

  // Show summary
  log(colors.cyan, 'Configuration Summary:');
  REQUIRED_VARS.forEach((v) => {
    const value = envVars[v];
    const displayValue = v.includes('SECRET') || v.includes('KEY') ? '***' : value;
    log(colors.reset, `  ${v}: ${displayValue}`);
  });
  console.log('');
}

// Run the check
checkEnvFile();
