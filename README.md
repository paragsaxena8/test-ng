# TestNg

An Angular 20 practice project showcasing UI patterns and components using Spartan NG Helm and Tailwind CSS v4.

## Tech Stack

- **Angular 20** with standalone components (zoneless change detection)
- **Spartan NG** - Brain primitives + Helm styled components
- **Tailwind CSS v4** with custom light/dark themes
- **NgRx** for state management
- **TypeScript** with strict configuration

## Development

```bash
# Install dependencies
pnpm install

# Start development server
ng serve
# Opens at http://localhost:4200

# Build for production
ng build

# Build with watch mode
ng build --watch --configuration development

# Run unit tests
ng test

# Run single test file
ng test --include=**/specific-component.spec.ts
```

## Project Structure

```
src/
├── app/
│   ├── components/          # Practice components
│   │   ├── dashboard/       # Bento grid navigation
│   │   ├── search/          # Autocomplete search
│   │   ├── infinite-scroll/ # Virtual scrolling
│   │   ├── pagination*/     # Pagination patterns
│   │   ├── drawer/          # Sheet/drawer demo
│   │   ├── forms/           # Form utilities
│   │   ├── widgets/         # Interactive widgets
│   │   └── practice-registry.ts
│   ├── shared/              # Reusable components
│   ├── sidebar/             # App sidebar layout
│   └── app.config.ts
├── libs/ui/                  # Spartan NG Helm components
└── styles.scss              # Global styles & theming
```

## Helm Components

This project uses Spartan NG's Helm components (styled Tailwind wrappers around Brain primitives). Components are kept locally in `libs/ui/` for full customization control.

**Installed components (19):**
`autocomplete`, `avatar`, `breadcrumb`, `button`, `card`, `collapsible`, `dropdown-menu`, `icon`, `input`, `input-group`, `pagination`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `textarea`, `tooltip`, `utils`

### Adding Components

```bash
# Add a new Helm component
ng g @spartan-ng/cli:ui <component-name>

# Example: add a dialog component
ng g @spartan-ng/cli:ui dialog
```

### Import Pattern

```typescript
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  imports: [HlmCardImports, HlmSidebarImports],
})
```

## Theming

The app supports light and dark modes via CSS custom properties defined in `src/styles.scss`. Toggle dark mode by adding/removing the `.dark` class on the root element.

## Code Scaffolding

```bash
# Generate a new component
ng generate component component-name

# List all available schematics
ng generate --help
```

## Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Spartan NG Documentation](https://spartan.ng/documentation)
- [Tailwind CSS v4](https://tailwindcss.com/docs)