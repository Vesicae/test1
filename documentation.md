# GameStoB — Project Documentation
**COMP6800 | Human and Computer Interaction**
**Even Semester 2025/2026**

---

## Application Description

GameStoB is a digital and physical game retailer website offering authentic game keys, new releases, DLCs, and offline store experiences. The website was built with a **Cyberpunk / Dark Gaming** theme using dark backgrounds, neon purple, and cyan accents to reflect the gaming culture and brand identity.

### How to Use the Application

1. Open `index.html` in a modern web browser (Google Chrome recommended)
2. Navigate between pages using the top navigation bar
3. On mobile, tap the hamburger icon (☰) to open the navigation menu
4. Visit the **Catalog** page to browse and filter games
5. Click **Buy Now** on any game to go to the Purchase page
6. Fill in all required fields on the Purchase page and click **Complete Purchase**

---

## Pages Overview

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero banner with sale countdown, latest releases, best sellers, new DLCs |
| Catalog | `pages/catalog.html` | Filterable game catalog with search, genre, and platform filters |
| Purchase | `pages/purchase.html` | Checkout form with payment details and JavaScript validation |
| About Us | `pages/about.html` | Company background, timeline, key characteristics, and team |
| Locations | `pages/locations.html` | All offline store locations with name, description, and hours |

---

## File Structure

```
gamestoB/
├── index.html              (Home Page)
├── css/
│   └── style.css           (Global External Stylesheet)
├── js/
│   ├── main.js             (Navigation, scroll reveal)
│   └── purchase.js         (Form validation — no regex)
├── pages/
│   ├── catalog.html        (Catalog Page)
│   ├── purchase.html       (Purchase Page)
│   ├── about.html          (About Us Page)
│   └── locations.html      (Locations Page)
├── assets/
│   └── images/             (Image assets folder)
└── documentation.md        (This file)
```

---

## Technical Requirements Checklist

### CSS Properties Used (5+ kinds)
1. `display: grid` — used for multi-column layouts (catalog, about, footer)
2. `position: sticky` — used for the navbar and sidebar
3. `backdrop-filter: blur()` — used for the frosted glass navbar effect
4. `animation` / `@keyframes` — used for glitch text, pulse effects, and scroll reveals
5. `background: linear-gradient()` and `radial-gradient()` — used throughout for backgrounds and cards
6. `box-shadow` with custom values — used for neon glow effects on buttons and cards
7. `transition` — used for all hover state animations

### JavaScript Used
- `main.js`: Hamburger toggle, active nav link detection, IntersectionObserver scroll reveal
- `purchase.js`: Full form validation (5 validations, no regex), live card number formatting, expiry formatting, success modal

### Responsive Design
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — present on all pages
- `@media screen and (max-width: 768px)` — applied in `style.css`:
  - Navbar collapses to hamburger menu
  - Multi-column grids switch to single column
  - Hero layout stacks vertically
  - Footer grid stacks vertically
- Additional breakpoints at `1024px` and `480px` for tablets and small phones

---

## Form Components (Purchase Page — 5 kinds)

| # | Component | HTML Element | Field |
|---|-----------|-------------|-------|
| 1 | Text Input | `<input type="text">` | Full Name, Card Number, Expiry, CVV |
| 2 | Email Input | `<input type="email">` | Email Address |
| 3 | Radio Button | `<input type="radio">` | Payment Method |
| 4 | Checkbox | `<input type="checkbox">` | Terms & Conditions |
| 5 | Select / Dropdown | `<select>` | Country |

---

## Form Validations (5 kinds — No Regex)

| # | Validation | Method | Field |
|---|-----------|--------|-------|
| 1 | Empty Check | `.trim().length === 0` | Full Name, Email, Card, Expiry, CVV |
| 2 | Length Check | `.length < min \|\| .length > max` | Full Name (3–80 chars), Card (13–19 digits) |
| 3 | Numeric Range Check | `charCodeAt()` loop checking 48–57 (ASCII digits) | CVV (3–4 digits), Card Number |
| 4 | Luhn Algorithm | Checksum calculation without regex | Credit Card Number |
| 5 | Expiry Date Future Check | Compare parsed MM/YY against `new Date()` | Expiry Date |

---

## HCI Principles Applied

- **Consistency**: Unified color palette, typography (Orbitron + Rajdhani), and component patterns across all pages
- **Feedback**: Real-time form field validation with visual success/error states; countdown timer; hover animations
- **Affordance**: Buttons styled distinctly (primary/outline/cyan) to communicate different actions
- **Visibility**: Active navigation link highlighted; sticky navbar always visible
- **Error Prevention**: Input formatting helpers (card number auto-spaces, expiry auto-slash)
- **Aesthetic Integrity**: Cyberpunk gaming theme matches the brand identity of a game retailer

---

## Asset References

| Asset Type | Source |
|-----------|--------|
| Fonts | Google Fonts — Orbitron, Rajdhani, Share Tech Mono (https://fonts.google.com) |
| Icons | Unicode Emoji (built-in, no license required) |
| Color Palette | Custom — inspired by cyberpunk gaming aesthetics |
| No third-party images or audio used — all visuals are CSS-generated |

---

*Documentation prepared for COMP6800 — Human and Computer Interaction, Even Semester 2025/2026.*
