# VALENCE // DOMAIN
### Bespoke Architectural Holdings & Curated Living Monoliths

[![Live Demo](https://img.shields.io/badge/Demo-valence--realestate.vercel.app-C5A880?style=for-the-badge&logo=vercel&logoColor=white)](https://valence-realestate.vercel.app)
[![Architecture](https://img.shields.io/badge/Architecture-Asymmetrical%20Masonry-161820?style=for-the-badge)](https://valence-realestate.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-4A534C?style=for-the-badge)](LICENSE)

An ultra-modern, editorial real estate portfolio designed to break away from generic, template-driven 3-column corporate layouts. Engineered with high-end editorial minimalism, an asymmetrical staggered masonry grid, dynamic data-mapping architecture, a top-value auto-rotating hero canvas, a client-side query engine with pill filters, an adaptive mobile filter compression bar, and a native `<dialog>` slide-out dossier with extended architectural specifications.

**Live Production Deployment**: [https://valence-realestate.vercel.app](https://valence-realestate.vercel.app)

---

## 🏛️ Design Philosophy: The "Anti-Template" Look

Traditional real estate portals rely on cookie-cutter grid systems and corporate blue palettes. **VALENCE // DOMAIN** is designed as a digital architectural monograph:

1. **Editorial Palette**:
   - **Base & Scrim**: Deep Charcoal Void (`#090a0d`), Surface (`#0f1116`), and Elevated Glass (`#151820`).
   - **Typography**: Crisp Alabaster (`#f6f5f1`) and Pale Limestone (`#aba9a1`).
   - **Architectural Accents**: Warm Travertine (`#cfb89d`), Champagne Gold (`#e5cfad`), Burnished Terracotta (`#bd6a4c`), and Nordic Sage (`#5e6b5d`).
   - **Atmosphere**: Subtle procedural film grain overlay and frosted glassmorphism (`backdrop-filter: blur(20px)`).

2. **Typography Pairing**:
   - **Headings**: `Playfair Display` — Oversized, elegant serif typography with italicized accents.
   - **Body & Metrics**: `Inter` — High-density, neutral sans-serif engineered for data readability.
   - **Indices & Coordinates**: `Space Mono` — Monospaced datums for GPS coordinates, pricing metrics, and asset IDs.

3. **Asymmetrical Masonry Rhythm**:
   - Rather than uniform boxes, holdings are assigned irregular column spans across a 12-column grid:
     - **Lead Panorama** (`grid-column: span 7`): Dramatic visual anchor.
     - **Vertical Monolith** (`grid-column: span 5`): Tall portrait framing.
     - **Architectural Breather Block** (`grid-column: span 4`): Typographic editorial quote and curatorial metrics.
     - **Horizontal Panorama** (`grid-column: span 8`): Wide horizon capture.
     - **Compact Brutalist Box** (`grid-column: span 6`): Balanced secondary focus.

4. **Fluid Micro-Animations**:
   - Imagery gently expands on hover (`transform: scale(1.07)` with cinematic bezier curve).
   - Property data overlay slides upward with frosted-glass blur to reveal hidden specifications (`Area`, `Suites`, `Completed`).

---

## 🧩 Architectural Data Schema & Ingestion

Components are decoupled from hardcoded markup, ingesting structured data from an asynchronous property data layer ([`js/data.js`](file:///d:/Techxodia-realestate/js/data.js)):

| Field | Type | Description | Frontend Mapping |
| :--- | :--- | :--- | :--- |
| `id` | `String` | Unique asset code (e.g. `vlc-001`) | Asset badge, data attributes, URL state |
| `property_title` | `String` | Official architectural title | Card header, Hero text, Modal title |
| `price_formatted` | `String` | Human-readable valuation | Card footer, Hero datum, Modal pricing box |
| `price_numeric` | `Number` | Raw valuation integer | Sorting engine, Top 3 Hero algorithm |
| `neighborhood` | `String` | Geographic precinct | Location line, Search index |
| `status_badge` | `String` | Transactional availability | Glowing status pill (`Available`, `Off-Market`, `Private Treaty`, `Under Contract`) |
| `main_image_url` | `URL` | High-res full-bleed photography | Hero slider canvas, Card viewport |
| `architectural_style` | `String` | Movement / school | Metadata pill, Filter taxonomy |
| `sqft`, `beds`, `baths` | `Number` | Spatial dimensions | Hover-reveal spec grid, Modal spec matrix |
| `year_built`, `architect`| `Number/String` | Provenance | Technical spec table |
| `lot_size`, `coordinates`| `String` | Land area & GPS datum | Technical spec table |
| `curator_statement` | `String` | Editorial critique | Modal narrative block |
| `agent_notes` | `String` | Private broker & material notes | Confidential callout block |
| `features` | `Array<String>` | Signature structural elements | Feature tags list |
| `gallery_images` | `Array<URL>` | Auxiliary captures | Interactive thumbnail strip |

---

## ⚡ Core Page Components

### 1. Immersive Dynamic Hero
- **Algorithmic Selection**: Computes the top 3 highest-valued portfolio entries in real time via `PropertyDatabaseClient.getTopValuedProperties(3)`.
- **Auto-Rotating Cinematic Canvas**: Background smoothly crossfades between full-bleed imagery every 6.5 seconds, with synchronized progress bar slots.
- **Split-Screen Interaction**: Floating glassmorphic card tracks the active property, providing direct access to the master dossier.

### 2. Database Query & Filter Interface
- **Pill-Shaped Toggles**: Instant client-side filtering by **Movement** (`architectural_style`) and **Availability** (`status_badge`) without reloading the page.
- **Auxiliary Controls**: Debounced real-time keyword search and multi-metric sorting (Curated, Price Descending, Price Ascending, Interior Area).
- **Holdings Counter**: Reactive status readout indicating matching acquisitions against total archive count.

### 3. Mobile Filter Compression & Collapsible Drawer
- **Compact Viewport**: On screens `< 768px`, the 300px+ filter section is compressed by default into a slim **44px sticky bar**, leaving over 90% of the mobile screen visible for viewing imagery while scrolling.
- **Dynamic Status Summary**: Displays the active filters (e.g. `ALL HOLDINGS (8)` or `BRUTALIST MODERNISM • AVAILABLE (1)`).
- **Smooth Expansion**: Tap **"Filter & Sort"** to slide open the complete pill drawers, with a dedicated **"Hide / Compress Filters ▴"** action at the bottom.

### 4. Native `<dialog>` Quick-View Slide-Out Panel
- **Modern Standards**: Built with HTML5 `<dialog id="quickViewModal">` utilizing CSS `transition-behavior: allow-discrete` and `@starting-style` for smooth entry and exit transitions.
- **Interactive Multi-Image Gallery**: Click any thumbnail in the strip to immediately preview auxiliary architectural captures.
- **Confidential Dossier Action**: Interactive "Request Confidential Dossier" button with simulated dispatch toast notification.
- **Dismissal**: Native backdrop click, Escape key, or close button with automatic scroll restoration.

---

## 📁 Repository Structure

```
Techxodia-realestate/
├── index.html            # Semantic HTML5 architecture, typography & landmarks
├── css/
│   └── style.css         # Complete editorial design system & responsive layout
├── js/
│   ├── data.js           # Architectural mock database & asynchronous client
│   └── app.js            # Core application controller, carousel & modal logic
├── scripts/
│   └── server.js         # Lightweight local preview HTTP server (Node.js)
├── vercel.json           # Vercel static deployment configuration
├── .gitignore            # Git exclusion rules
└── README.md             # Project documentation
```

---

## 🛠️ Local Development & Quick Start

This project is built with zero build step dependencies—native modern Web APIs, ES6 Modules, and CSS custom properties.

### Prerequisites
- Node.js `v18+` (or any static HTTP server)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/bangdon15/Techxodia-realestate.git
cd Techxodia-realestate

# Start the preview server
node scripts/server.js
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🌐 Deployment

The repository is configured for zero-configuration static deployment on **Vercel's Global Edge Network**:

```bash
# Deploy to Vercel production
npx vercel --prod --yes
```

- **Production URL**: [https://valence-realestate.vercel.app](https://valence-realestate.vercel.app)
- **Deployment Platform**: Vercel (Static CDN, clean URLs enabled)

---

## 📄 License & Attribution

Designed and developed for **VALENCE ATELIER INC.**  
All architectural assets, photography, and layout designs protected under registered copyright. Code released under the [MIT License](LICENSE).
