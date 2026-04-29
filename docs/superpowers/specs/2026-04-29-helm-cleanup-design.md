# Helm Components Cleanup

**Date:** 2026-04-29
**Status:** Completed

## Summary

Remove unused Helm component directories from `libs/ui/` to reduce codebase size and improve maintainability.

## Context

Spartan NG uses a two-layer architecture:
- **Brain** (`@spartan-ng/brain`) - npm package with unstyled primitives
- **Helm** - Styled components copied into the codebase (not on npm)

The project had 58 Helm component directories but only uses 10 directly. However, those 10 have internal dependencies on other Helm components.

## Final Component Count

| Category | Count | Components |
|----------|-------|------------|
| Directly used | 10 | autocomplete, avatar, breadcrumb, card, collapsible, dropdown-menu, input-group, pagination, separator, sidebar |
| Dependencies | 9 | button, icon, input, textarea, select, sheet, skeleton, tooltip, utils |
| **Kept** | **19** | |
| **Deleted** | **39** | accordion, alert, alert-dialog, aspect-ratio, badge, button-group, calendar, carousel, checkbox, combobox, command, context-menu, date-picker, dialog, empty, field, form-field, hover-card, input-otp, item, kbd, label, menubar, native-select, navigation-menu, popover, progress, radio-group, resizable, scroll-area, slider, sonner, spinner, switch, table, tabs, toggle, toggle-group, typography |

## Changes Made

1. Deleted 39 unused component directories from `libs/ui/`
2. Updated `tsconfig.json` with 19 path aliases (only for kept components)
3. Build verified successful

## Re-adding Components

To add a removed component back:
```bash
ng g @spartan-ng/cli:ui <component-name>
```