# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `pnpm dev` or `pnpm start`: Run development server
- `pnpm build`: Build production version
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Run ESLint with auto-fixing
- `pnpm typecheck`: Run TypeScript type checking
- `pnpm prettier`: Format code with Prettier
- `pnpm validate`: Run lint:fix, typecheck, and build in parallel
- `pnpm gen`: Generate new pages/components via plop
- `pnpm test:e2e`: Run Playwright E2E tests
- `pnpm test:e2e:ui`: Run Playwright tests in UI mode

## Code Style
- Use TypeScript for new files (.tsx/.ts)
- Use single quotes, no semicolons (per Prettier config)
- Import order: external libs, then local imports (separated by blank line)
- Component folders should have index.tsx/jsx as entry point
- Use absolute imports with `@/` alias (maps to ./src)
- Prefer functional components with hooks
- Use MSW for API mocking (check mockAPI/handlers)
- Pages go in src/pages directory, with each page in its own folder
- Use pnpm for package management
- Ensure you check for existing MSW handlers when modifying pages