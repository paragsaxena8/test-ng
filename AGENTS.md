# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `ng serve` - Start development server (runs on http://localhost:4200/)
- `ng build` - Build the application (production build by default)
- `ng build --watch --configuration development` - Build with file watching for development
- `ng test` - Run unit tests with Karma
- `ng test --include=**/specific-component.spec.ts` - Run a single test file
- `ng e2e` - Run end-to-end tests (requires e2e framework setup)

### Code Generation
- `ng generate component component-name` - Generate a new component (uses SCSS by default)
- `ng generate --help` - List all available schematics

### Formatting
- Prettier config is embedded in package.json (printWidth: 100, singleQuote: true)
- Run `npx prettier --write .` to format all files

## Project Architecture

### Technology Stack
- **Angular 20** with standalone components (zoneless change detection enabled via `provideZonelessChangeDetection`)
- **Spartan NG** UI library with Helm components (configured via components.json)
- **Tailwind CSS v4** with PostCSS (configured in .postcssrc.json)
- **NgRx** for state management
- **TypeScript** with strict configuration (noImplicitReturns, noFallthroughCasesInSwitch, strictTemplates)
- **SCSS** for component styles

### Key Architectural Patterns

#### Component Organization
- **Practice Components**: Located in `src/app/components/` - individual practice implementations
- **Shared Components**: Located in `src/app/shared/` - reusable components
- **UI Library**: Located in `libs/ui/` - Spartan NG Helm components with path aliases

#### Practice Registry System
The app uses a centralized practice registry (`src/app/components/practice-registry.ts`) that:
- Defines practice sections (Overview, Core Patterns, Form Utilities, Interactive Widgets)
- Supports both lazy and eager loaded components
- Provides automatic routing configuration

#### Routing
- All routes configured in `src/app/components/practice-registry.ts`
- Default route redirects to `/dashboard`
- Wildcard route redirects to `/dashboard`
- Dashboard provides bento grid navigation to all practice components

#### Styling Architecture
- **CSS Custom Properties**: Defined in `src/styles.scss` for theming
- **Dark Mode**: Toggle via `.dark` class on root element
- **Tailwind Layers**: Organized as theme, base, components, utilities
- **Spartan NG Preset**: Imported for consistent component styling

### UI Components Path Aliases
All UI components use the `@spartan-ng/helm` prefix with paths configured in `tsconfig.json`. For example:
- `@spartan-ng/helm/button` → `./libs/ui/button/src/index.ts`
- `@spartan-ng/helm/card` → `./libs/ui/card/src/index.ts`

### State Management
- NgRx Store configured globally in `app.config.ts`
- Components can use signals for local state
- Practice components should demonstrate state patterns without external dependencies

### Development Guidelines
- Components should be standalone (no NgModules)
- Use SCSS for component-specific styles
- Follow the existing directory structure for new practices
- Implement both light and dark theme support
- Use semantic HTML5 elements
- Practice components should be self-contained demonstrations

### Testing
- Unit tests use Karma with Jasmine (`.spec.ts` extension)
- Component tests should focus on behavior, not implementation details.