# LineCall

A feature prioritization board for product teams, styled like a sportsbook odds board. Submit a feature request with its Reach, Impact, Confidence, and Effort, and LineCall ranks it against everything else on the board — then prices it like a betting line, with the top-ranked feature as the "favorite" and everything else quoted as an underdog.

Live demo-> https://line-call.vercel.app/ 

## The problem

Most feature-prioritization tools are spreadsheets. They work, but nobody outside the PM team wants to open one, and a bare number ("RICE score: 42.3") doesn't mean much to a stakeholder without context for how it compares to everything else in the backlog.

LineCall keeps the same underlying math (RICE: Reach × Impact × Confidence ÷ Effort) but frames the output the way a sportsbook frames a line — a favorite is priced short (-450), a longshot is priced long (+650) — because relative odds communicate priority faster than a raw score does. It's a small reframe, but it's the kind of detail that makes a prioritization tool something a team actually opens.

## How it works

1. **Submit a feature** with four inputs:
   - **Reach** — how many users it touches in a given period
   - **Impact** — per-user effect, scored 0.25 (minimal) to 3 (massive)
   - **Confidence** — how sure you are about the reach/impact estimates
   - **Effort** — cost to build, in person-months
2. LineCall computes `RICE = (Reach × Impact × Confidence) / Effort` for every open item.
3. The board re-sorts automatically. The top score becomes the favorite; every other item is priced relative to it.
4. Everything persists locally, so the board survives a refresh.

## Why RICE, and why odds

RICE is a standard PM prioritization framework (popularized by Intercom) because it forces you to separate "how many people does this help" from "how sure am I" from "how expensive is it" — three questions that get muddied together in a gut-feel backlog review. LineCall doesn't change the framework; it changes the output format, because a ranked list of decimals is harder to defend in a room than "this is our -450 favorite, that's a +600 longshot."

## Tech stack

- React 18 + Vite
- No backend — state lives in local component state, persisted to `localStorage`
- No UI framework — hand-rolled CSS with a small design-token system (see `src/index.css`)

## Running locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  components/
    FeatureForm.jsx   — intake form for new features
    Board.jsx          — sorts and renders the ranked list
    FeatureCard.jsx     — single line item, computes score + odds
  utils/
    rice.js             — RICE scoring + odds-conversion logic
  App.jsx               — layout and state
```

## What I'd build next

- Drag-to-reprioritize with manual override (some calls shouldn't be purely algorithmic)
- Team voting on Confidence, instead of a single owner's estimate
- Export the board to a shareable read-only link for stakeholder reviews
