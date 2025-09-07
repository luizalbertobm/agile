# Copilot Instructions for This Codebase

## Overview
A single-page web application (SPA) for creating, validating, and documenting User Stories, built with React, Tailwind CSS, and Shadcn/ui for the UI. It speeds up story authoring, enforces clarity via an ambiguity linter, generates Gherkin acceptance criteria, and streamlines export/sharing. All data is persisted locally (no backend).
Roadmap: integration with GitHub Issues and the OpenAI API for task automation and intelligent assistance.


## Architecture & Key Files

- **Entry Point:** `src/main.jsx` mounts the React app to `#root` in `index.html`.
- **App Component:** `src/App.jsx` is the main UI component. All new features should be composed here or in new components imported here.
- **Styling:**
  - `src/App.css` and `src/index.css` use Tailwind CSS and Shadcn/ui React plugin. Custom themes are defined with CSS variables and `@theme` blocks.
  - Shadcn/ui themes can be customized in `src/styles/themes/` and imported in `src/index.css`.
- **Vite Config:** `vite.config.js` loads React, Tailwind, and Shadcn/ui React plugins.
- **ESLint:** `eslint.config.js` enforces strict linting, including React Hooks and Fast Refresh rules. Unused variables starting with uppercase or underscore are ignored.

## Developer Workflows

- **Terminal Command Execution:**
  Before running any new command in the terminal, verify that the terminal is not currently executing another process.
  This prevents command blocking and ensures each process completes properly.

- **Start Dev Server:**
  ```sh
  npm run dev
  ```
  Runs Vite with HMR.

- **Build for Production:**
  ```sh
  npm run build
  ```

- **Preview Production Build:**
  ```sh
  npm run preview
  ```

## Project-Specific Conventions

- **Component Library:** Use Shadcn/ui components for UI. Reference the [Shadcn/ui docs](https://ui.shadcn.com/docs/components/accordion.md) for usage and customization.
- **Theme Customization:** Update `src/styles/themes/` and import the desired theme in `src/index.css` if you need to change themes or component settings.
- **Tailwind Usage:** Tailwind classes are used in both `class` and `className` attributes. See `.vscode/settings.json` for custom Tailwind class detection.
- **No TypeScript:** This template is JavaScript-only. For TypeScript, see the [Vite React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).

## External Integrations

- **Shadcn/ui:** Integrated via plugin in `vite.config.js` and configured in `src/styles/themes/`.
- **Tailwind CSS:** Integrated via plugin in `vite.config.js` and configured in CSS files.

## Examples

- To add a new page or feature, create a new component in `src/`, import it in `App.jsx`, and use Shadcn/ui components for UI.
- To customize the theme, edit `src/styles/themes/` and import the desired theme in `src/index.css` if needed.

---

For more details, see the [README.md](../README.md) and [Shadcn/ui documentation](https://ui.shadcn.com/docs/getting-started/introduction.md).
