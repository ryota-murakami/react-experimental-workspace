# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `pnpm dev` or `pnpm start`: Run Vite development server
- `pnpm build`: Build production version with Vite
- `pnpm lint`: Run ESLint
- `pnpm lint:fix`: Run ESLint with auto-fixing
- `pnpm typecheck`: Run TypeScript type checking (no emit)
- `pnpm prettier`: Format code with Prettier
- `pnpm validate`: Run lint:fix, typecheck, and build in parallel via scripts/validate
- `pnpm gen`: Generate new pages/components via Plop
- `pnpm test:e2e`: Run Playwright E2E tests
- `pnpm test:e2e:ui`: Run Playwright tests in UI mode

## Architecture & Project Structure

### Core Architecture
- **Build Tool**: Vite with React SWC for fast compilation
- **Routing**: React Router v7 with lazy loading for code splitting
- **Styling**: Tailwind CSS v4 + Emotion + styled-components hybrid approach
- **UI Libraries**: Material-UI (MUI) v7 + Radix UI themes for component library
- **API Mocking**: MSW (Mock Service Worker) with handlers in `mockAPI/` 
- **Testing**: Playwright for E2E testing
- **Package Manager**: pnpm with Volta for Node version management

### Page Generation System
- Use `pnpm gen` to create new experiment pages
- Plop generator automatically:
  - Creates page component in `src/pages/{{Name}}/index.tsx`
  - Adds route to `src/Routes.tsx` with lazy loading
  - Updates homepage navigation in `src/pages/index.jsx`
- All pages are experiments showcasing different React patterns/features

### MSW Integration
- Service worker starts before React app in `main.tsx`
- Mock API routes defined in `mockAPI/routes.ts`
- Handlers organized in `mockAPI/handlers/` by feature
- Check existing handlers before adding new API endpoints

### Styling Strategy
- Base styles in `src/global.css`
- Tailwind for utility classes
- classed-components for styled component patterns
- MUI for complex components
- Emotion/styled-components for CSS-in-JS where needed

## Code Style
- Use TypeScript for new files (.tsx/.ts)
- Use single quotes, no semicolons (per Prettier config)
- Import order: external libs, then local imports (separated by blank line)
- Component folders should have index.tsx/jsx as entry point
- Use absolute imports with `@/` alias (maps to ./src)
- Prefer functional components with hooks over class components
- Pages go in src/pages directory, with each page in its own folder
- Use pnpm for package management
- Check existing MSW handlers when adding API-dependent features