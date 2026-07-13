# AGENTS.md

## Cursor Cloud specific instructions

This is a single **Vite + React 19 SPA** (a catalog of self-contained front-end experiments). All "API" traffic is mocked in-browser by **Mock Service Worker (MSW)** — there is **no backend, database, or external service** to run. See `CLAUDE.md` for the full architecture and the canonical command list (`pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm e2e`, etc.).

### Running the app
- `pnpm dev` starts the only runtime process (Vite dev server on `http://localhost:5173`). MSW starts automatically inside the browser before React renders; no separate command is needed.
- The startup update script only runs `pnpm install`. Everything else (dev server, tests) is started manually.

### Node / package manager
- `node` resolves to a system `v22.14.0` in this environment (fine — Vite 8 needs Node ≥ 22.12), even though `package.json` pins Node `24.12.0` via Volta and `README.md`/`CLAUDE.md` mention older versions. The version discrepancy across docs is pre-existing and does not block dev/build.
- `pnpm` (10.21.0, matching `packageManager`) is already available in fresh shells; do not reinstall it.

### e2e tests (Playwright)
- Playwright's Chromium browser must be installed once per fresh VM before running e2e: `pnpm exec playwright install chromium` (binaries are cached under `~/.cache/ms-playwright` and persist in the VM snapshot). It is intentionally **not** in the update script to keep startup lightweight and avoid a large download on every boot.
- `pnpm e2e` auto-starts the dev server via Playwright's `webServer` config, so you do not need to start `pnpm dev` first.

### Known pre-existing breakages (do NOT treat as environment problems; do not "fix" as part of setup)
- **`pnpm lint` and `pnpm typecheck` fail on `main`** and this is reproduced by CI (Lint + Typecheck jobs are red; Build is green). Causes: TypeScript 7 removed the `baseUrl` tsconfig option, and `@typescript-eslint` 8.59.1 (pulled transitively) is incompatible with TypeScript 7 (`Cannot read properties of undefined (reading 'Cjs')`). `pnpm build` still succeeds.
- **Several experiment pages crash at runtime** with `classed.header is not a function` because `@/components/Header` uses `classed-components@2.0.1`, which is broken with the current React 19 / Vite 8 bundle. Affected routes include `/mixi`, `/useoptimistic`, `/dateform`, `/imageupload`, `/arrayform`, `/contextmenu`, `/multi-file-upload`, `/windowOpen`, `/urlparams`, `/sandbox`, `/tailwindlineclamp`. `pnpm build` does not catch these because the bundler never executes the code.
- The `/search` experiment fetches the absolute `http://localhost:3000/api/search`, but the MSW handler is registered for the relative `/api/search` (origin `:5173`), so the search request is not mocked and fails with `ERR_CONNECTION_REFUSED`.
- Some `e2e` specs (`toppage`, `mui-migration`, `tailwind-line-clamp`) are **stale** and fail because the landing-page labels/pages changed; `context.spec.ts` passes. e2e is not part of CI.

### Reliable pages for smoke-testing the environment
`/` (landing), `/form` (React Hook Form: validation + submit), `/formobservatory` (live form-state lab), and `/context` (Context API demo) all render and work.
