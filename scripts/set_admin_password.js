const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const username = process.env.NEW_ADMIN_USERNAME || 'admin';
const pwd = process.env.NEW_ADMIN_PASSWORD || crypto.randomBytes(9).toString('hex'); // 18 hex chars
const hash = bcrypt.hashSync(pwd, 12);
const out = { username, passwordHash: hash };
const cfgDir = path.join(__dirname, '..', 'config');
if (!fs.existsSync(cfgDir)) fs.mkdirSync(cfgDir, { recursive: true });
const outPath = path.join(cfgDir, 'admin.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), { mode: 0o600 });
console.log('Wrote', outPath);
console.log(`ADMIN_USERNAME=${username}`);
console.log(`ADMIN_PASSWORD=${pwd}`);
