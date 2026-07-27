# Weather_OS v2.0 — Pixel Weather Intelligence Engine

A modern retro-brutalist weather forecasting application and outdoor activity advisor powered by real-time Open-Meteo atmospheric telemetry.

---

## 🚀 Key Features & What's New in v2.0

### 🌍 Real-Time Atmospheric Telemetry
* **Open-Meteo Integration**: Live global weather forecasting with zero API key configuration required.
* **Instant City & Region Search**: Autocomplete location search supporting cities and regions worldwide.
* **GPS Geolocation**: One-click location retrieval via browser standard Geolocation API.

### ⚡ Activity Advisory Engine
* **Smart Outdoor Threshold Evaluation**: Evaluates real-time weather metrics against safety and comfort thresholds for various activities (cycling, running, daily wear, outdoor events, sports).
* **Advisory Status Ratings**: Categorizes recommendations into `IDEAL`, `MODERATE`, `NOT REC.`, and `HAZARDOUS` status badges.
* **Pro-Tip Actionables**: Generates actionable tips based on wind speed, precipitation probability, solar UV indices, and temperature.

### 📊 Comprehensive Forecast Visuals
* **Current Weather Card**: Displays temperature, feels-like metrics, daily highs/lows, rain probability, wind speed & direction, humidity, pressure, UV index, cloud cover, and sun rise/set times.
* **Interactive 7-Day Forecast**: Weekly overview with custom visual temperature range bars, precipitation badges, and wind speed indicators.
* **24-Hour Hourly Timeline**: Detailed hourly breakdown for any selected day showing temperature curves, precipitation fill meters, and wind metrics.

### 🎮 Retro Experience & Customization
* **Brutalist Pixel Design**: High-contrast theme with crisp borders, pixel typography, and brutalist box shadows.
* **CRT Scanline Mode**: Optional toggle for authentic retro arcade monitor CRT scanline visual effects.
* **Chiptune Audio SFX**: Synthesized Web Audio API retro sound effects for user interactions.
* **Multiple Color Schemes**: Switch between *Minimal Mono*, *Arcade Dark*, *Gameboy Matrix*, and *Synth Retro*.
* **Unit Conversion**: Instant toggle between Metric (°C, km/h) and Imperial (°F, mph).

---

## 🛠️ Getting Started (Running Locally)

Follow these instructions if you have cloned or forked this repository to run the app on your local machine.

### Prerequisites
* **Node.js**: Version 18.x or higher
* **npm**: Version 9.x or higher

---

### Step-by-Step Installation

1. **Clone or Fork the Repository**
   ```bash
   git clone https://github.com/your-username/pixel-weather-intelligence.git
   cd pixel-weather-intelligence
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The development server will start locally at `http://localhost:3000` (or `http://localhost:5173`).

4. **Build for Production**
   To verify and compile the production build:
   ```bash
   npm run build
   ```

5. **Preview Production Build**
   To run the static production build locally:
   ```bash
   npm run preview
   ```

---

## 🏗️ Tech Stack

* **Frontend Framework**: React 19 with TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Weather Data API**: [Open-Meteo API](https://open-meteo.com/)
* **Audio Engine**: Web Audio API (Chiptune Sound FX)

---

## 📜 License

Distributed under the MIT License.
