#!/usr/bin/env node
// Valve-Tuner v0.2.1
import { readFileSync } from "fs";
import chalk from "chalk";
import {
  parseHeadings,
  hasDuplicateHeading,
  requiredOrderIndices,
  sectionContent,
} from "./rules";

const required = ["Project Map", "Functional Directives", "Style Rules"];
const EXIT_MISSING = 2;
const EXIT_DUP = 3;
const EXIT_EMPTY = 4;
const EXIT_BAD_BASH = 5;
const EXIT_ORDER = 6;

function checkFile(path: string): number {
  const content = readFileSync(path, "utf8");
  const lines = content.split(/\r?\n/);
  const headings = parseHeadings(lines);

  const dup = hasDuplicateHeading(headings);
  if (dup) {
    console.error(
      chalk.red(`\u26a0\ufe0f Pressure surge: duplicate heading "${dup}"`),
    );
    return EXIT_DUP;
  }

  const indicesOrMissing = requiredOrderIndices(headings, required);
  if (typeof indicesOrMissing === "string") {
    console.error(
      chalk.red(
        `\u26a0\ufe0f Pressure drop: expected heading "${indicesOrMissing}"`,
      ),
    );
    return EXIT_MISSING;
  }
  const indices = indicesOrMissing;
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] < indices[i - 1]) {
      console.error(
        chalk.red(
          "\u26a0\ufe0f Pressure crosswind: required headings out of order",
        ),
      );
      return EXIT_ORDER;
    }
  }

  for (const h of headings) {
    for (const req of required) {
      if (h.text.includes(req)) {
        const body = sectionContent(lines, headings, h);
        if (!body.some((l) => l.trim())) {
          console.error(
            chalk.red(`\u26a0\ufe0f Pressure void: section "${req}" empty`),
          );
          return EXIT_EMPTY;
        }
      }
    }
  }

  const funcHeading = headings.find((h) =>
    h.text.includes("Functional Directives"),
  );
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
            chalk.red(
              "\u26a0\ufe0f Pressure void: bash block without commands",
            ),
          );
          return EXIT_BAD_BASH;
        }
      }
    }
  }

  return 0;
}

const args = process.argv.slice(2);
const files = args.length ? args : ["AGENTS.md"];
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
