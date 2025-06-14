#!/usr/bin/env node
// Valve-Tuner v0.2
import { readFileSync } from 'fs';
import { parseHeadings, hasDuplicateTopLevel, sectionContent } from './rules';

const required = ['Project Map', 'Functional Directives', 'Style Rules'];

function checkFile(path: string): number {
  const content = readFileSync(path, 'utf8');
  const lines = content.split(/\r?\n/);
  const headings = parseHeadings(lines);

  const dup = hasDuplicateTopLevel(headings);
  if (dup) {
    console.error(`\u26a0\ufe0f Pressure surge: duplicate top-level "${dup}"`);
    return 1;
  }

  let index = 0;
  for (const h of headings) {
    if (h.text.includes(required[index])) {
      index++;
      if (index === required.length) break;
    }
  }
  if (index !== required.length) {
    const missing = required[index];
    console.error(`\u26a0\ufe0f Pressure drop: expected heading "${missing}"`);
    return 1;
  }

  for (const h of headings) {
    for (const req of required) {
      if (h.text.includes(req)) {
        const body = sectionContent(lines, headings, h);
        if (!body.some((l) => l.trim())) {
          console.error(`\u26a0\ufe0f Pressure void: section "${req}" empty`);
          return 1;
        }
      }
    }
  }

  const funcHeading = headings.find((h) => h.text.includes('Functional Directives'));
  if (funcHeading) {
    const body = sectionContent(lines, headings, funcHeading);
    for (let i = 0; i < body.length; i++) {
      const open = body[i].match(/^(`{3,})bash\s*$/);
      if (open) {
        const fence = open[1];
        let hasCmd = false;
        i++;
        for (; i < body.length; i++) {
          if (body[i].startsWith(fence)) break;
          if (body[i].trim()) hasCmd = true;
        }
        if (!hasCmd) {
          console.error(
            '\u26a0\ufe0f Pressure void: bash block without commands',
          );
          return 1;
        }
      }
    }
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

