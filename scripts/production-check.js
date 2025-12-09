const fs = require('fs');
const path = require('path');
const https = require('https');

// Load env vars from .env.production.example for validation keys
// In a real scenario, we would check process.env against these keys
const envExamplePath = path.join(__dirname, '../.env.production.example');
const envExample = fs.readFileSync(envExamplePath, 'utf8');
const requiredKeys = envExample.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=')[0]);

console.log("FluxSpace Production Check");
console.log("==========================");

// 1. Environment Variables
console.log("\n[1] Checking Environment Variables...");
const missingKeys = requiredKeys.filter(key => !process.env[key]);
if (missingKeys.length > 0) {
    console.warn("⚠️  Warning: The following environment variables are missing (this is expected in dev/build without .env.local loaded):");
    missingKeys.forEach(key => console.log(`   - ${key}`));
} else {
    console.log("✅ All environment variables present.");
}

// 2. Configuration Files
console.log("\n[2] Checking Configuration Files...");
const configFiles = ['package.json', 'next.config.js', 'vercel.json'];
configFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, `../${file}`))) {
        console.log(`✅ ${file} exists.`);
    } else {
        console.error(`❌ ${file} is MISSING.`);
    }
});

// 3. Integration Configs
console.log("\n[3] Checking Integration Configs...");
const integrations = [
    { name: 'Stripe', keys: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLIC_KEY'] },
    { name: 'Canva', keys: ['CANVA_CLIENT_ID', 'CANVA_CLIENT_SECRET'] },
    { name: 'Meta', keys: ['META_APP_ID', 'META_APP_SECRET'] },
    { name: 'OpenAI', keys: ['OPENAI_API_KEY'] }
];

integrations.forEach(integration => {
    const hasKeys = integration.keys.every(key => process.env[key]);
    if (hasKeys) {
        console.log(`✅ ${integration.name} configuration present.`);
    } else {
        console.log(`⚠️  ${integration.name} configuration incomplete (check env vars).`);
    }
});

// 4. Public Pages Build Check (Mock)
console.log("\n[4] Verifying Public Pages...");
const publicPages = [
    'app/page.tsx',
    'app/(public)/landing/page.tsx',
    'app/help/page.tsx'
];
publicPages.forEach(page => {
    if (fs.existsSync(path.join(__dirname, `../${page}`))) {
        console.log(`✅ ${page} exists.`);
    } else {
        console.error(`❌ ${page} is MISSING.`);
    }
});

console.log("\n==========================");
console.log("Production check complete.");
console.log("Note: Run this script with loaded environment variables for accurate results.");
