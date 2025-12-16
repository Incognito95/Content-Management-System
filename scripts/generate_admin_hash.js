const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Usage: NEW_ADMIN_PASSWORD=yourpass node scripts/generate_admin_hash.js
const pwd = process.env.NEW_ADMIN_PASSWORD;
const username = process.env.NEW_ADMIN_USERNAME || 'admin';
if (!pwd) {
    console.error('Please set NEW_ADMIN_PASSWORD environment variable to the new admin password.');
    process.exit(1);
}

const hash = bcrypt.hashSync(pwd, 12);
const out = {
    username,
    passwordHash: hash
};

const cfgDir = path.join(__dirname, '..', 'config');
if (!fs.existsSync(cfgDir)) fs.mkdirSync(cfgDir, { recursive: true });
const outPath = path.join(cfgDir, 'admin.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), { mode: 0o600 });
console.log('Wrote', outPath);
console.log('admin username:', username);
console.log('passwordHash:', hash);
console.log('Permissions set to 600. Add config/admin.json to .gitignore to avoid committing secrets.');
