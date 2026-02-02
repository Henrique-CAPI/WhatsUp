# What's Up? — "What's Above Me?" Web App

## Overview
**What's Up?** is a lightweight web application that determines a user's geographic location and displays celestial objects directly above them, including planets, the Moon, and the Sun. Objects are ranked by proximity to zenith (directly overhead).

The app uses astronomy calculations and runs fully in the browser.

---

## Goals
- Automatically determine the user's location
- Identify celestial objects directly above the user (not just above the horizon)
- Rank objects by proximity to zenith (directly overhead)
- Present the information in a simple, readable list
- Require no paid services or backend infrastructure

---

## Functional Requirements

### 1. Location Detection
The app provides two methods for setting location:

#### Option A: Use Current Location
- Use the **Browser Geolocation API**
- Retrieve latitude and longitude automatically
- Handle permission denial gracefully with a user-facing message
- Suggests using manual input as fallback

#### Option B: Enter Coordinates Manually
- User inputs latitude (-90 to 90) and longitude (-180 to 180)
- Includes preset locations for quick selection (New York, London, Tokyo, Sydney)
- No permissions required

---

### 2. Astronomy Data Sources

#### Visible Planets (astronomy-engine library)
**Purpose:** Identify visible planets, Moon, and Sun  
**Cost:** Free (client-side calculations)  
**Inputs:**
- Latitude
- Longitude

**Outputs:**
- Object name
- Altitude (degrees above horizon)
- Azimuth (direction in degrees)
- Distance from zenith (degrees from directly overhead)

**Reason for Use:**
- No API key required
- Pure JavaScript calculations
- Objects filtered to those reasonably overhead (≥20° altitude)

---

#### N2YO Satellite API (Free Tier) — Future Enhancement
**Purpose:** Identify satellites above the user  
**Cost:** Free tier (API key required)  
**Inputs:**
- Latitude
- Longitude
- Search radius / altitude filter

**Outputs:**
- Satellite name
- Elevation (altitude)
- Azimuth

**Reason for Use:**
- Reliable real-time satellite data
- Explicit "above observer" endpoints
- Relative position data included

---

## Unified Object Data Model

Normalize all API responses into a single internal format:

- `name` — Object name
- `type` — Planet | Moon | Star | Satellite
- `altitude` — Degrees above horizon
- `azimuth` — Compass direction in degrees
- `distanceFromZenith` — Degrees away from directly overhead (0° = directly overhead)
- `relativePosition` — Human-readable sky location relative to overhead

---

## Relative Position Logic

### Minimum Altitude Threshold
- Objects must be at least **20°** above the horizon to be considered "above" the user
- This filters out objects near the horizon that aren't truly overhead

### Distance from Zenith Buckets
- **0–5°** → Directly overhead
- **5–15°** → Almost directly overhead
- **15–30°** → High above
- **30–50°** → Above you
- **50°+** → Low (near minimum threshold)

### Azimuth Mapping (for non-zenith objects)
- **0°** → North
- **90°** → East
- **180°** → South
- **270°** → West

### Example Output
- "Directly overhead"
- "Almost directly overhead, slightly south"
- "High above, toward the west"
- "Above you to the northeast"

---

## UI Requirements

### Layout
- App title: **What's Up?**
- Subtitle: "What's above you right now"
- Main menu with location options
- Coordinate input form (when manual entry selected)
- Display of current coordinates with "Change" button
- Scrollable list of visible objects

---

### List Item Structure
Each item should display:
- Object name
- Object type icon:
  - 🪐 Planet
  - 🌕 Moon
  - ☀️ Sun/Star
  - 🛰️ Satellite
- Proximity icon:
  - 🎯 Directly overhead (0–5° from zenith)
  - 🔝 Almost overhead (5–15° from zenith)
  - ⬆️ High above (15–30° from zenith)
  - ↗️ Above (30°+ from zenith)
- Relative position text
- Numeric altitude, distance from zenith, and azimuth

#### Example

Mars  
🎯 Directly overhead  
Altitude: 87.2° | From Zenith: 2.8° | Direction: South

---

## App Flow

1. App loads
2. Display main menu with two options:
   - "Use Current Location" (requires permission)
   - "Enter Coordinates" (manual input)
3. If using current location:
   - Request browser geolocation permission
   - On success: proceed to step 5
   - On failure: show error with option to use manual input
4. If entering coordinates:
   - Display coordinate input form with presets
   - Validate input (-90 to 90 lat, -180 to 180 lon)
   - On submit: proceed to step 5
5. Fetch visible planets, Moon, and Sun
6. Filter to objects ≥20° altitude (reasonably overhead)
7. Compute distance from zenith and relative positions
8. Sort objects by proximity to zenith (closest to directly overhead first)
9. Render list in UI
10. Show "Change" button to return to main menu

---

## Technical Constraints

- Client-side only (no backend)
- Uses astronomy-engine JavaScript library
- Location permission required for GPS feature (or use manual entry)
- No star or constellation data in v1

---

## Non-Goals (v1)

- Star catalogs
- Constellation outlines
- AR sky overlay
- Time-travel sky views

---

## Future Enhancements

- Satellite tracking (N2YO API integration)
- Constellation detection
- Interactive sky map
- Time slider (past / future sky)
- Night-vision red mode
- Device orientation integration
- AR "point at the sky" mode

---

## Success Criteria

- User location successfully detected
- Only objects reasonably overhead displayed (≥20° altitude)
- Objects ranked by proximity to directly overhead (zenith)
- Clear, human-readable relative positions focused on "above you"
- Fast load time
- Runs entirely in the browser
- No paid services required

---

## Project Name
**What's Up?**
