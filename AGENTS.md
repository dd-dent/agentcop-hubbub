# AgentCop Hubbub – Operating Charter

Welcome, Codex.  
This document tells you **how to build, test, and polish** the AGENTS.md linter that enforces itself.

---

## 1 · Project Map
| Path | Nickname | Human-oriented metaphor |
|------|----------|------------------------|
| `src/`   | Gauge Room | Parses Markdown under pressure |
| `tests/` | Pressure Bench | Torture suite for brittle specs |
| `.grimoire/` | Cellar | Narrative lore (consult & update) |

> **Before coding:** read `.grimoire/MANIFEST.md` and any subtree page that matches the files you touch.

---

## 2 · Functional Directives
1. **Install & run tests**

    ```bash
    npm i
    npm test        # must exit 0
    ```

2. **Linter behaviour**

    * Validate presence & order of mandatory AGENTS.md headings.
    * Fail on missing `Functional Directives` or `Project Map`.
    * Return non-zero exit code with clear, motif-flavoured messages.

3. **Evidence & commits**

   * After passing tests, commit with message prefix `💡 Valve-Tweak:` and include mocha output in commit body.

---

## 3 · Style Rules

   * Language: TypeScript 5.x
   * Formatter: Prettier default
   * ESLint: `eslint:recommended`

---

## 4 · Narrative Motifs

All metaphor guidance lives inside `.grimoire/`.
When you introduce a new component or concept, append a row to the appropriate grimoire file.

> *This section is for human orientation; no functional constraint is implied.*

---

*End of charter – tread lightly and keep the flow laminar.*