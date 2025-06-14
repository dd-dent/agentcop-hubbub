#!/usr/bin/env node
import { readFileSync } from 'fs';

const required = ["Project Map", "Functional Directives", "Style Rules"];

function checkFile(path: string): number {
  const content = readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  let index = 0;
  for (const line of lines) {
    const m = line.match(/^#{1,6}\s*(.*)$/);
    if (!m) continue;
    const text = m[1];
    if (text.includes(required[index])) {
      index++;
      if (index === required.length) break;
    }
  }
  if (index !== required.length) {
    const missing = required[index];
    console.error(`\u26a0\ufe0f Pressure drop: expected heading "${missing}"`);
    return 1;
  }
  return 0;
}

const args = process.argv.slice(2);
const files = args.length ? args : ['AGENTS.md'];
let exitCode = 0;
for (const file of files) {
  try {
    const code = checkFile(file);
    if (code !== 0) exitCode = code;
  } catch (err) {
    console.error(`\u26a0\ufe0f Valve jam: cannot read ${file}`);
    exitCode = 1;
  }
}
process.exit(exitCode);

