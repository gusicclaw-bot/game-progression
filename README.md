# Game Progression

Game Progression is an MVP pilot for an interactive website that maps the history of the game industry through studios, publishers, people, and games.

## What this first pass includes

This repo has been cleaned up as a better local-development starter, especially for running from a private laptop or a MacBook in VS Code.

### Included in this pass
- cleaner React project structure (`components`, `data`, `types`)
- Mac-friendly local scripts with fixed ports
- improved README and setup guidance
- polished pilot UI for demos and local exploration
- neural-net style relationship map
- clickable nodes for publishers, studios, people, and games
- detail side panel for selected entities
- sample game drill-down sections for story progression, characters, and accolades

## MVP direction

This pilot intentionally focuses on a curated Nintendo-adjacent ecosystem instead of trying to model the entire industry at once.

The point of the pilot is to validate the core interaction pattern:
1. discover through a visual network
2. read through a focused side panel
3. drill deeper into selected games

## Tech
- React
- TypeScript
- Vite

## Recommended Node version

This project was prepared with Node 22.

If you use `nvm`:

```bash
nvm use
```

The repo includes an `.nvmrc` file.

## Quick start on MacBook or laptop

### 1. Clone the repo

```bash
git clone https://github.com/gusicclaw-bot/game-progression.git
cd game-progression
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will run on:
- <http://localhost:4173>

Because the dev server binds to `0.0.0.0`, it is also easier to test from other devices on your private network if you want to later.

## Production-style local preview

To test the built app locally:

```bash
npm run build
npm run preview
```

Preview runs on:
- <http://localhost:4174>

## Available scripts

- `npm run dev` — local development server on port 4173
- `npm run start` — alias for dev server
- `npm run build` — production build
- `npm run preview` — preview built app on port 4174
- `npm run serve` — alias for preview
- `npm run lint` — run ESLint

## Project structure

```text
src/
  components/
    DetailPanel.tsx
    GraphMap.tsx
  data/
    gameData.ts
  types/
    gameData.ts
  App.tsx
  App.css
  index.css
  main.tsx
```

## Next suggested improvements
- add search and filtering
- add a timeline mode
- replace static sample data with a real schema/API
- expand to 20–50 curated nodes for the first production dataset
- add dedicated detail pages for studios and games
