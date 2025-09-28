# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
pnpm dev                    # Start Vite development server (localhost:5173)
pnpm build                  # Production build with source maps
pnpm validate               # Run lint:fix, typecheck, and build concurrently
```

### Code Quality
```bash
pnpm lint                   # ESLint analysis
pnpm lint:fix              # Auto-fix ESLint issues
pnpm typecheck             # TypeScript validation (--noEmit)
pnpm prettier              # Format all files
```

### Testing
```bash
pnpm e2e                   # Run Playwright tests
pnpm e2e:headed            # Run tests with browser UI
pnpm e2e:ui                # Run tests with Playwright UI
```

### Code Generation
```bash
pnpm gen                   # Generate new experiment page using Plop templates
```

### Utilities
```bash
pnpm clean                 # Remove node_modules, pnpm-lock.yaml, and dist
```

## Architecture Overview

### Application Structure
This is a **React experimental workspace** - a collection of isolated experiments demonstrating various React patterns and modern web development techniques. Each experiment is self-contained and accessible via routing.

### Key Architectural Patterns

#### Experiment-Based Organization
- **Single-page navigation**: `src/pages/index.jsx` serves as the experiment catalog
- **Lazy-loaded experiments**: All experiments use React.lazy() for code splitting
- **Route-based structure**: Each experiment has its own route in `src/Routes.tsx`
- **Self-contained experiments**: Each experiment in `src/pages/[ExperimentName]/` contains its own components and logic

#### MSW Integration
- **Mock Service Worker** runs in browser for API simulation
- **Initialization sequence**: MSW worker starts before React app renders (see `src/main.tsx`)
- **Handler organization**: API handlers in `mockAPI/handlers/`, routes in `mockAPI/routes.ts`
- **Development-first**: Real API simulation without backend dependency

#### Multi-Framework Styling
The project uses **multiple styling approaches intentionally** to demonstrate different patterns:
- **Tailwind CSS**: Utility-first via @tailwindcss/vite plugin
- **Styled Components**: CSS-in-JS for experiment-specific styling
- **Material-UI**: Component library integration
- **CSS Modules**: Scoped styles (e.g., `index.module.css`)

#### Component Architecture
- **Page wrapper pattern**: Most experiments use `Page.Container` for consistent layout
- **Shared components**: Core components in `src/components/` (Link, Loading, Page)
- **UI components**: Design system components in `src/components/ui/`
- **Custom hooks**: Reusable logic in `src/hooks/`

### Technology Integration Points

#### Build System (Vite)
- **React SWC**: Fast compilation via @vitejs/plugin-react-swc
- **Path aliases**: `@/` maps to `./src/` for clean imports
- **Source maps**: Enabled for production debugging

#### Form Handling
- **React Hook Form**: Primary form library with Zod validation
- **Multiple patterns**: Different experiments show various form approaches
- **Validation integration**: Zod schemas with @hookform/resolvers

#### State Management
- **Context API**: Demonstrated in Context experiment
- **Local state**: Most experiments use local component state
- **No global state**: Intentionally avoids Redux/Zustand to focus on React patterns

### Development Workflow

#### Adding New Experiments
1. Run `pnpm gen` to scaffold new experiment
2. Implement experiment in `src/pages/[ExperimentName]/`
3. Add route to `src/Routes.tsx` with lazy loading
4. Add navigation link to `src/pages/index.jsx`

#### Quality Gates
- **Pre-commit hooks**: Husky runs Prettier on all files
- **Validation script**: `pnpm validate` runs all quality checks concurrently
- **TypeScript strict mode**: Full type checking enabled

#### Testing Strategy
- **E2E focused**: Playwright tests for critical user flows
- **No unit tests**: Intentional focus on integration testing
- **Visual testing**: Screenshots and browser automation

### Important File Locations

#### Configuration
- `vite.config.mjs`: Build configuration with React SWC and Tailwind
- `eslint.config.mjs`: ESLint with TypeScript and React rules
- `playwright.config.ts`: E2E test configuration
- `plopfile.cjs`: Code generation templates

#### Core Application
- `src/main.tsx`: App entry point with MSW initialization
- `src/Routes.tsx`: Route definitions with lazy loading
- `src/pages/index.jsx`: Experiment catalog and navigation

#### Mock API
- `mockAPI/browser.js`: MSW worker setup
- `mockAPI/routes.ts`: API route definitions
- `mockAPI/handlers/`: Request handlers by feature

### Development Notes

#### Node Version
- **Required**: Node.js v22.17.0 (managed by Volta)
- **Package manager**: pnpm (configured in package.json)

#### Build Characteristics
- **ESM modules**: "type": "module" in package.json
- **Code splitting**: Automatic route-based splitting via lazy loading
- **Development mode**: Fast refresh with SWC compilation

#### MSW Integration Pattern
The MSW (Mock Service Worker) integration is critical for development:
1. Worker starts in `src/main.tsx` before React renders
2. Intercepts network requests during development
3. Provides realistic API responses without backend
4. Essential for experiments that demonstrate API integration