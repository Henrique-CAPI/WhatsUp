# What's Up? 🌌

A lightweight web application that determines your geographic location and displays celestial objects directly above you, including planets, the Moon, and the Sun. Objects are ranked by proximity to zenith (directly overhead).

## Features

- **Two Location Options** — Use GPS or enter coordinates manually
- **Real-time Celestial Data** — Shows planets and Moon positions using the astronomy-engine library
- **Human-readable Positions** — Displays where to look in the sky (e.g., "High above, toward the southwest")
- **Beautiful Dark Theme** — Starfield background with a modern UI designed for night use
- **Preset Locations** — Quick access to New York, London, Tokyo, Sydney
- **No Backend Required** — Runs entirely in the browser

## Quick Start

**Start the app:**
```bash
./start-app.sh
```

**Stop the app:**
```bash
./stop-app.sh
```

Then open **http://localhost:8000** in your browser.

## How It Works

### Location Options
1. **Use Current Location** — Requests browser geolocation permission
2. **Enter Coordinates** — Manual latitude/longitude input with preset cities

### Celestial Calculations
Uses the [astronomy-engine](https://github.com/cosinekitty/astronomy) library to calculate precise positions of:
- The Moon
- The Sun
- Mercury, Venus, Mars, Jupiter, Saturn, Uranus, and Neptune

### Filtering
Only objects with altitude ≥20° are shown (objects must be reasonably "above" you, not just above the horizon).

### Position Display
Each object shows:
- **Name** and type icon
- **Proximity icon** — indicates how close to directly overhead
- **Relative position** (e.g., "High above, toward the west")
- **Altitude** — degrees above the horizon (0° = horizon, 90° = directly overhead)
- **Distance from Zenith** — how far from directly overhead
- **Azimuth** — compass direction (0° = North, 90° = East, 180° = South, 270° = West)

### Distance from Zenith Descriptions
- **0–5°** — "Directly overhead" 🎯
- **5–15°** — "Almost directly overhead" 🔝
- **15–30°** — "High above" ⬆️
- **30°+** — "Above you" ↗️

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers with geolocation support

## Privacy

This app:
- Only requests location when you grant permission
- Does not store or transmit your location
- Runs all calculations locally in your browser

## File Structure

```
WhatsUp/
├── index.html      # Main HTML structure
├── style.css       # Dark theme styling
├── app.js          # Application logic
├── start-app.sh    # Start server script
├── stop-app.sh     # Stop server script
└── README.md       # This file
```

## Future Enhancements

- Satellite tracking (via N2YO API)
- Constellation detection
- Interactive sky map
- Time slider for past/future sky views
- Night-vision red mode
- Device orientation integration

## License

MIT License — Feel free to use and modify!
