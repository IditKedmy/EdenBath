import {readFileSync} from 'fs';
import {spawn} from 'child_process';

const profile = process.argv[2] || 'development'; // default: development
const eas = JSON.parse(readFileSync('./eas.json', 'utf8'));

const envFromProfile = eas.build?.[profile]?.env || {};
if (!Object.keys(envFromProfile).length) {
  console.error(`No env found for profile "${profile}" in eas.json`);
  process.exit(1);
}

// Merge current env + profile env
const env = { ...process.env, ...envFromProfile };

// Windows-safe spawn via cmd /c (works also in UNIX)
const isWin = process.platform === 'win32';
const cmd = isWin ? 'cmd' : 'npx';
const args = isWin ? ['/c', 'npx', 'expo', 'start', '-c'] : ['expo', 'start', '-c'];

console.log(`Starting Expo with profile: ${profile}`);
console.log(`Injected env:`, Object.keys(envFromProfile).join(', '));

const child = spawn(cmd, args, {
  stdio: 'inherit',
  env,
  shell: false,
});

child.on('exit', (code) => process.exit(code ?? 0));
