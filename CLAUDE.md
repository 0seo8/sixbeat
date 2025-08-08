# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SixBeat is a K-pop music chart tracking application focused on DAY6 fandom streaming and voting support. It consists of:

- **Python crawlers** for collecting chart data from Korean music platforms (Melon, Genie, Bugs, Vibe, Flo)
- **Next.js frontend** for displaying charts and providing streaming/voting guidance
- **GitHub Actions** for automated hourly data collection

## Development Commands

### Frontend (Next.js)

```bash
cd frontend
yarn install          # Install dependencies
yarn dev          # Start development server (Turbopack enabled)
yarn build        # Build for production
yarn lint         # Run ESLint
```

### Crawlers (Python)

```bash
cd crawlers
pip install -r requirements.txt    # Install dependencies
python main.py                      # Run all crawlers manually
python test_melon.py               # Test Melon crawler specifically
```

## Architecture

### Data Flow

1. **GitHub Actions** runs crawlers every hour (KST timezone)
2. Crawlers fetch chart data and save to `docs/` as JSON files
3. Data is deployed to GitHub Pages for static hosting
4. Frontend fetches JSON data from GitHub Pages endpoint

### Key Components

#### Crawlers (`/crawlers`)

- `base_crawler.py`: Abstract base class for all platform crawlers
- `{platform}_crawler.py`: Platform-specific implementations (melon, genie, bugs, vibe, flo)
- `main.py`: Orchestrates all crawlers, filters target songs, generates HTML output
- `target_songs.py`: Defines which artists/songs to track
- `rank_tracker.py`: Tracks rank changes over time
- `twitter_bot.py`: Posts rank updates to Twitter

#### Frontend (`/frontend`)

- Next.js 15 with App Router
- TypeScript + Tailwind CSS v4
- React 19 with new features enabled

### Data Structure

Chart data is stored as JSON with this schema:

```json
{
  "collectedAtKST": "2025-08-09T15:00:00+09:00",
  "artist": "DAY6",
  "tracks": [
    {
      "rank": 97,
      "title": "예뻤어",
      "artist": "DAY6",
      "album": "Album Name",
      "delta": 2,
      "timestamp": "2025080915"
    }
  ]
}
```

## Key Implementation Notes

- All timestamps use KST (Korea Standard Time, UTC+9)
- Crawlers handle chart-out scenarios by storing `rank: null`
- Twitter bot only posts at full hours (e.g., 15:00, not 15:30)
- HTML generation creates `target_index.html` for filtered target songs
- Rank tracking maintains 24-hour history for change detection

## Testing Approach

- Python crawlers: Run individual crawler scripts (e.g., `python test_melon.py`)
- Frontend: No specific test setup yet - verify with `npm run build` and manual testing
- GitHub Actions: Use `workflow_dispatch` for manual testing

## Environment Variables

Required for full functionality:

- `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`, `TWITTER_BEARER_TOKEN`
- `YOUTUBE_API_KEY` (for YouTube stats collection)

These are configured in GitHub Actions secrets for automated runs.
