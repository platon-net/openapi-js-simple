# Repository Guidelines

## Project Structure & Module Organization
- `src/API.js`: main vanilla JavaScript OpenAPI client (ES module export).
- `tests/`: runnable usage examples for browser/Node-style ES module flows:
  - `get-example.js`, `post-example.js`, `bearer-example.js`, `error-handling-example.js`
  - `get-example.html` for direct browser demo.
- `temp/API.php`: reference implementation used as a design baseline.
- `README.md`: public usage documentation.

Keep new functionality in `src/` and add matching usage examples in `tests/`.

## Build, Test, and Development Commands
This repository has no build step and no external dependencies.

- `node --check src/API.js`
  - Validates syntax of the client.
- `node --check tests/get-example.js`
  - Validates syntax of an example script (repeat for other files).
- Serve browser demo from repo root with any static server (example):
  - `python -m http.server 8000`
  - Open `http://localhost:8000/tests/get-example.html`

## Coding Style & Naming Conventions
- Language: plain JavaScript (ES modules), no frameworks/libraries.
- Indentation: tabs in `src/API.js`; follow existing style in touched files.
- Naming:
  - Class names: `PascalCase` (e.g., `API`).
  - Methods/variables: `camelCase` (e.g., `setBearerToken`, `responseBody`).
  - Example files: kebab-case with `-example` suffix.
- Prefer small, explicit methods and readable error messages.

## Testing Guidelines
- Current tests are example-driven, not framework-based.
- For each new capability, add or update a file in `tests/` that demonstrates usage.
- Minimum validation before PR:
  - Syntax check updated JS files with `node --check`.
  - Manually verify browser demo when changing request/auth/error behavior.

## Commit & Pull Request Guidelines
Git history is not accessible in this environment, so use clear, conventional commit messages:
- `feat: add query parameter filtering`
- `fix: include status code in HTTP errors`
- `docs: update browser usage example`

PRs should include:
- concise summary of what changed and why,
- list of affected files,
- verification steps performed (syntax checks, manual browser check),
- screenshots only for HTML/UI changes when relevant.

## Security & Configuration Tips
- Do not hardcode production Bearer tokens in client-side code.
- Treat `tests/` tokens and URLs as demo values only.
- For write-capable endpoints, prefer server-side token handling/proxying.
