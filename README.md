# APIWatchTowerWeb — HACKWAVE Dependency Guardian Website

A developer-focused landing page and product architecture showcase for **HACKWAVE Dependency Guardian**, built strictly to the specifications of `Dependency_Guardian_PRD.md`.

## Overview

Dependency Guardian monitors external dependencies, detects breaking API changes against preserved known-good baselines, maps impacts directly to configured source code and test files, proposes compatibility adapters, and validates repairs before developer approval.

**Core Positioning:** *Know what changed. See what breaks. Fix it with confidence.*

---

## Key Features Implemented

1. **Announcement Bar**: Dismissible banner highlighting the MVP Preview.
2. **Navigation Bar**: Sticky navigation with original vector SVG shield & dependency graph logo, smooth navigation anchors, and responsive mobile drawer menu.
3. **Hero Section**: Strong typographic hierarchy, truthful trust badges ("Built for developers who depend on APIs"), and clear conversion CTA flow.
4. **Hero Product Demonstration**: 3-panel realistic developer interface (Detected API Change, Impacted Code Workflow, Repair Preview & Pytest Runner Console) with an interactive 5-stage lifecycle timeline.
5. **Problem & Value Statement**: 3 major engineering challenges ("Breaking changes go unnoticed", "Debugging consumes engineering hours", "Fixes need evidence and validation") mapped directly to Dependency Guardian solutions.
6. **5-Stage Workflow Progression**: "From API change to actionable repair" interactive tabbed progression with live technical artifacts (YAML config, diff engine, impact trace, adapter diff, pytest output).
7. **Product Capabilities Matrix**: 8 filterable capability cards with Lucide icons, status indicators, and evidence metrics.
8. **Interactive API Comparison Sandbox**: Live side-by-side JSON diff comparison between Baseline V1 and Observed V2 for Users API (field rename), Search API (cursor pagination), and Payments API (semantic uncertainty with safety brake).
9. **VS Code Extension Showcase**: Photorealistic IDE window mockup with Activity Bar, Explorer sidebar, incident inspection, file diff view, integrated terminal output, and quick install commands.
10. **Verified System Architecture**: Responsive multi-tier diagram connecting simulated services (:8001–:8004), local Python backend (:8765), and the VS Code extension.
11. **Developer Reference & Contracts**: Interactive tabs for the `dependency-guardian.yml` configuration contract, quickstart setup commands, local REST endpoints, and safety invariants.
12. **Engineering Team Business Value**: 3 pillars for engineering leads with a 4-phase separation of concerns.
13. **FAQ Accordion**: 8 interactive questions answered strictly from the PRD.
14. **Final CTA & Footer**: High-conversion closing banner with copyable installation command, comprehensive links, and dynamic copyright year.

---

## Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS Design System with CSS Custom Properties (`src/styles/tokens.css` and `src/styles/index.css`)
- **Icons**: `lucide-react`
- **Typography**: Inter (UI) & JetBrains Mono (Code/Endpoints)
- **Palette**: Dominant white canvas (`#ffffff`), slate neutrals (`#f8fafc`, `#e2e8f0`), electric indigo accents (`#4f46e5`), semantic emerald/amber/danger alerts.

---

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
# The website will be available at http://localhost:5173/
```

### 3. Build Production Bundle
```bash
npm run build
# Compiles to dist/ with full TypeScript type-checking
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## Local Port Architecture (from PRD)

- **Marketing Website**: `http://localhost:5173/`
- **Local Python Backend**: `http://127.0.0.1:8765`
- **Simulated Users API**: `http://127.0.0.1:8001`
- **Simulated Payments API**: `http://127.0.0.1:8002`
- **Simulated Search API**: `http://127.0.0.1:8003`
- **Simulated Notification Endpoint**: `http://127.0.0.1:8004`
