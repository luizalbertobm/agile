# Copilot Instructions for This Codebase

## Overview
A single-page web application (SPA) for creating, validating, and documenting User Stories, built with React, Tailwind CSS, and Flowbite for the UI. It speeds up story authoring, enforces clarity via an ambiguity linter, generates Gherkin acceptance criteria, and streamlines export/sharing. All data is persisted locally (no backend).
Roadmap: integration with GitHub Issues and the OpenAI API for task automation and intelligent assistance.


## Architecture & Key Files

- **Entry Point:** `src/main.jsx` mounts the React app to `#root` in `index.html`.
- **App Component:** `src/App.jsx` is the main UI component. All new features should be composed here or in new components imported here.
- **Styling:**
  - `src/App.css` and `src/index.css` use Tailwind CSS and Flowbite React plugin. Custom themes are defined with CSS variables and `@theme` blocks.
  - `.flowbite-react/` contains auto-generated config and theme files for Flowbite React. Do not edit `.flowbite-react/init.tsx` directly; update `.flowbite-react/config.json` instead.
- **Vite Config:** `vite.config.js` loads React, Tailwind, and Flowbite React plugins.
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

- **Component Library:** Use Flowbite React components for UI. Reference the [Flowbite React docs](https://flowbite-react.com/docs/components/accordion.md) for usage and customization.
- **Theme Customization:** Update `.flowbite-react/config.json` and run the Flowbite CLI if you need to change themes or component settings.
- **Tailwind Usage:** Tailwind classes are used in both `class` and `className` attributes. See `.vscode/settings.json` for custom Tailwind class detection.
- **No TypeScript:** This template is JavaScript-only. For TypeScript, see the [Vite React TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).
- **Auto-Generated Files:** Do not edit files in `.flowbite-react/` except `config.json`.

## External Integrations

- **Flowbite React:** Integrated via plugin in `vite.config.js` and configured in `.flowbite-react/`.
- **Tailwind CSS:** Integrated via plugin in `vite.config.js` and configured in CSS files.

## Examples

- To add a new page or feature, create a new component in `src/`, import it in `App.jsx`, and use Flowbite React components for UI.
- To customize the theme, edit `.flowbite-react/config.json` and re-run the Flowbite CLI if needed.

---

For more details, see the [README.md](../README.md) and [Flowbite React documentation](https://flowbite-react.com/docs/getting-started/introduction.md).
