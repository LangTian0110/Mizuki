const fs = require('fs');
const path = require('path');
const sshKey = process.env.CONTENT_REPO_SSH_KEY;

if (sshKey) {
  const sshDir = path.join(process.env.HOME || process.env.USERPROFILE, '.ssh');
  fs.mkdirSync(sshDir, { recursive: true });
  fs.writeFileSync(path.join(sshDir, 'id_ed25519'), sshKey.trim() + '\n');
  fs.chmodSync(path.join(sshDir, 'id_ed25519'), 0o600);
  console.log('SSH key configured for content repo access.');
}