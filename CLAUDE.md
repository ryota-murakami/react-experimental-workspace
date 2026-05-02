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

## Design Context

> Source of truth: `.impeccable.md` in the project root. This section is synchronized with it — edit both together.

### Users
- **Primary user**: Raphtalia (Ryota), the repo owner, using this as a private React R&D lab.
- **Context**: Rapid experimentation with React 19+ patterns, modern web APIs, and UI techniques. Velocity of iteration matters more than polish per experiment.
- **Job to be done**: Try a new pattern → ship a working demo → move on. The landing page acts as a *lobby* (publicly visible, deserves polish). Individual experiment pages act as *workbenches* (free to be rough as long as the technique is clear).

### Brand Personality
- **Three words**: Technical. Modern. Crafted.
- **Voice**: Confident, concise, precise. Shows rather than tells. Values code clarity over marketing copy.
- **Emotional goal**: A visitor should feel "this person cares about their craft" within three seconds of landing.

### Aesthetic Direction
- **Landing page (`src/pages/index.tsx`)** — the lobby:
  - Apple **Liquid Glass** design language (WWDC 2025).
  - **Bluesky-inspired palette**: `#0560ff` → `#00d4ff` → `#a855f7` over deep navy (`#0a0f1a` → `#111827`).
  - Glassmorphism via `backdrop-filter: blur(20px) saturate(180%)`, floating gradient orbs, fluid gradient typography via `clamp()` and `background-clip: text`.
  - Currently WCAG AAA-compliant (contrast 7:1–21:1) — hold that standard.
- **Experiment pages** — the workbenches:
  - **Total stylistic freedom.** Each experiment chooses Tailwind / shadcn-ui / MUI / Radix Themes / styled-components / CSS Modules based on what best demonstrates its technique.
  - No forced visual consistency. Do not impose the landing's Liquid Glass aesthetic onto experiments.
- **Theme handling**: Both light and dark, driven by **`prefers-color-scheme`**. The shadcn neutral CSS variables in `src/global.css` already define both. The user's OS choice wins — no forced theme, no manual override required (a toggle is optional and must default to system).
- **Anti-references**:
  - ❌ Brutalist / raw HTML aesthetics. Even a prototype should look intentional, never deliberately ugly.
- **References that inform this project**:
  - Apple's Liquid Glass (WWDC 2025) & Apple HIG.
  - Bluesky's color and brand work.
  - shadcn-ui neutral palette as the light/dark token foundation.

### Design Principles

1. **The lobby is polished, the workbenches are free.**
   The landing page earns pixel attention and cohesion because it is publicly visible. Individual experiment pages choose whatever styling approach best illustrates their concept. Do not force visual consistency across experiments — doing so would obscure the point.

2. **Experimentation velocity beats pixel polish.**
   When adding a new experiment, a working demo that clearly shows the pattern is the win. Do not block on design. It is always acceptable to return and refine later.

3. **Respect the user's system.**
   Support both light and dark modes via `prefers-color-scheme`. Every new experiment must render legibly in both modes from day one. Never hard-code a theme. If a theme toggle is added, it defaults to system.

4. **Apple HIG is the floor, not the ceiling.**
   Minimum 44×44 px tap targets. Role-based colors (accent / label / background / fill). 4/8 spacing grid with key margins at 16/20/24 px. WCAG 2.2 AA minimum, AAA preferred (as achieved on the landing). Honor `prefers-reduced-motion` with genuine fallbacks — not just `animation: none`, but reduced blur intensity and static alternatives where motion carried meaning.

5. **Meaningful motion only.**
   Animations must communicate state change, draw attention deliberately, or signal spatial continuity. No decoration-for-decoration's-sake. If in doubt, remove it. Use `cubic-bezier(0.4, 0, 0.2, 1)` for material-style easing; keep durations ≤ 300 ms for interactions.