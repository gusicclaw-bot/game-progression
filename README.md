# Game Progression

Game Progression is an MVP pilot for an interactive website that maps the history of the game industry through studios, publishers, people, and games.

## MVP direction

This pilot intentionally focuses on a curated Nintendo-adjacent ecosystem instead of trying to model the entire industry at once.

### Included in this pilot
- Neural-net style relationship map
- Clickable nodes for publishers, studios, people, and games
- Detail side panel for selected entities
- Sample game drill-down sections for story progression, characters, and accolades
- MVP rationale section explaining scope choices

## Why this scope

The pilot is designed to validate the core interaction pattern:
1. Discover through a visual network
2. Read through a focused side panel
3. Drill deeper into selected games

## Tech
- React
- TypeScript
- Vite

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Next steps
- Add search and filtering
- Add timeline mode
- Replace static sample data with a real schema/API
- Expand to 20-50 curated nodes for the first production dataset
- Add dedicated detail pages for studios and games
