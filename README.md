# Personal portfolio

Personal site of Low Yong Ting, built with React 18 and Vite.

**Live site:** <https://lowyongting.github.io/personal-portfolio/>

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173/personal-portfolio/
```

| Script            | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload           |
| `npm run build`   | Production build into `dist/`                  |
| `npm run preview` | Serve the production build locally             |
| `npm run lint`    | Run ESLint                                     |
| `npm run deploy`  | Build and publish `dist/` to the `gh-pages` branch |

## Editing content

All content lives in JSON under `public/`, so no code changes are needed to update it:

- `portfolio_shared_data.json`: name, titles, location, social links, photo, skills
- `res_primaryLanguage.json`: intro text, section names, experience, projects, education
- `images/`: profile photo and project screenshots

## Structure

```
src/
  components/   one folder per component, each with its own .module.scss
  hooks/        useJson (data loading), useTheme, useActiveSection
  styles/       global.scss: design tokens, light/dark themes
  utils/        date range helpers
```

Theme follows the system setting by default; the toggle in the nav cycles system → light → dark.

## Credit

Originally based on the [React Portfolio Template](https://github.com/adamisafk/portfolio).
