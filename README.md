# agentcop-hubbub

[![CI](https://github.com/dd-dent/agentcop-hubbub/actions/workflows/ci.yml/badge.svg)](https://github.com/dd-dent/agentcop-hubbub/actions/workflows/ci.yml) [![npm](https://img.shields.io/npm/v/agentcop-hubbub.svg)](https://www.npmjs.com/package/agentcop-hubbub) [![npm](https://img.shields.io/npm/l/agentcop-hubbub.svg)](https://www.npmjs.com/package/agentcop-hubbub)


A cheeky linter for AGENTS.md charters.

**Install:** `npm i -g agentcop-hubbub`

## Quick Start

```bash
# Validate the charter in this repo
ts-node src/agentcop.ts AGENTS.md
```

The CLI reports a **pressure drop** if required headings are missing.

## VS Code

The repo ships with `.vscode/tasks.json` so you can run `npm test` via the
**AgentCop: Lint Repo** task. Failures show up in the Problems panel using the
bundled Mocha matcher.

## Narrative Cellar

The `.grimoire/` folder stores the lore behind each component. It is a cellar of
metaphors and history. Peek inside before changing code and add a note when you
create something new.

## Contributing

1. Run the checks:
   ```bash
   npm i
   npm test
   ```
2. Extend the `.grimoire` stories when you add features.
3. Keep the tone playful and the pipelines green.

## License

MIT License - see [LICENSE](./LICENSE) file for details.  

---
