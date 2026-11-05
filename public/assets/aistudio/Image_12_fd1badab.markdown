---
name: Kinetic Performance
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#e5beb2'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#ac897e'
  outline-variant: '#5c4037'
  surface-tint: '#ffb59c'
  primary: '#ffb59c'
  on-primary: '#5c1900'
  primary-container: '#ff5708'
  on-primary-container: '#511500'
  inverse-primary: '#aa3600'
  secondary: '#ffffff'
  on-secondary: '#2a3400'
  secondary-container: '#caf300'
  on-secondary-container: '#596c00'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#909191'
  on-tertiary-container: '#282a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822700'
  secondary-fixed: '#caf300'
  secondary-fixed-dim: '#b0d500'
  on-secondary-fixed: '#171e00'
  on-secondary-fixed-variant: '#3e4c00'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  headline-hero:
    fontFamily: Barlow Condensed
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 76px
    letterSpacing: -0.02em
  headline-hero-mobile:
    fontFamily: Barlow Condensed
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0em
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Barlow Condensed
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '800'
    lineHeight: 12px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system channels high-performance athletic engineering and precision retail. It speaks directly to athletes, performance purists, and modern fitness enthusiasts who demand technical excellence and aesthetic distinction. The interface projects an aura of raw energy, speed, and elite-tier craft.

The design movement merges **High-Contrast Performance Engineering** with subtle **Precision Glassmorphism**. Dark obsidian foundations carve out deep dimensional staging areas, allowing ultra-saturated energetic primaries to direct visual velocity. Crisp geometric lines, structured technical grids, and controlled luminescence establish a responsive, tactile environment suited for elite athletic commerce.

## Colors
The palette balances light absorption and luminous emission:

- **Primary (#FF5500 - Hyper Orange):** High-impact operational velocity. Reserved for critical transaction anchors, key add-to-cart CTAs, active states, and core system drivers.
- **Secondary (#D4FF00 - Volt Lime):** High-frequency technical resonance. Used for performance metrics, technical badges, inventory alerts, and energetic highlights.
- **Tertiary (#FFFFFF - Pure White):** High-contrast legibility for primary product typography, technical specifications, and sharp focal graphics.
- **Neutral Foundations:**
  - Base Obsidian: `#0F1115` (Viewport floor canvas)
  - Surface Mid: `#161920` (Product cards, structural panels)
  - Elevated Container: `#222631` (Interactive controls, popovers, elevated modules)
  - Ghost Perimeter: `#2A303C` (Structural outlines, divider boundaries)
  - Text Muted: `#8E95A5` (Secondary metadata, inactive labels, dimension indicators)

## Typography
Typographic rhythm sets mechanical speed against analytical clarity. Headlines utilize condensed, architectural proportions that cut through dark backgrounds with authority. Uppercase transformations are mandatory for `headline-sm`, `label-md`, and `label-sm` to maintain industrial athletic styling.

Body copy defaults to high-clarity geometry with balanced apertures, ensuring immediate legibility under varied lighting conditions and high-density technical specifications.

## Layout & Spacing
The layout adheres to a 12-column fluid grid system across desktop views, shifting to 8 columns on tablet and 4 columns on mobile viewports.

- **Desktop (1280px+):** Outer margin of `2rem` (or variable centering above 1440px up to a max width of 1600px), with `gutter-lg` (`2rem`) separating dense product cards and editorial grids.
- **Tablet (768px - 1279px):** Outer margin of `1.5rem`, unified `gutter` (`1.5rem`), reflowing 4-column product matrices into 2-up responsive tiles.
- **Mobile (Below 768px):** Outer margin of `1rem`, `gutter-sm` (`1rem`). Filters compress into sliding sheets, while product carousels collapse into edge-to-edge swipe containers with negative breakout margins.

## Elevation & Depth
Elevation abandons traditional muddy drop shadows in favor of luminous depth, precision borders, and stacked dark matter:

- **Surface Baseline (0F1115):** The ground floor for full-page background viewports.
- **Level 1 Panels (161920):** Primary retail cards and media backdrops. Encased in a single-pixel ghost edge (`1px solid #2A303C`).
- **Level 2 Modals & Flyouts (222631):** Navigational drawers, active tooltips, and shopping bags. Casts an ambient rim glow: `0px 20px 40px -10px rgba(0, 0, 0, 0.7), 0px 0px 0px 1px #2A303C`.
- **Level 3 Precision Glass:** Navigation headers and sticky buy bars use a high-performance frosted treatment: `background: rgba(15, 17, 21, 0.75)`, coupled with `backdrop-filter: blur(16px)` and a bottom border of `1px solid rgba(42, 48, 60, 0.6)`.
- **Active State Glow:** Hover and active elements project focused chromatic energy: `0px 0px 24px -4px rgba(255, 85, 0, 0.35)`.

## Shapes
Shapes express precision engineering and technical discipline. Sharp corners are softened with an intentional minimal radius (`0.25rem` base), creating tight, aerodynamic forms reminiscent of high-grade carbon-fiber molded equipment and tactical hardware. Overly rounded or pill shapes are avoided to preserve athletic posture, with the exception of micro status dots and circular icon toggles.

## Components

### Buttons
- **Primary Action (Add to Cart / Checkout):** Solid `#FF5500` surface, `#0F1115` typography, uppercase `label-md` tracking. Crisp `4px` corner radius. Interactive state transitions to `#FF6611` with kinetic micro-expansion and subtle luminous halo.
- **Secondary Technical:** Obsidian surface (`#161920`) with a rigid `1px solid #2A303C` border, `#FFFFFF` text. Hover shifts border color to `#FF5500` with instant color snap.
- **Ghost/Tertiary:** Clear fill with underline offset tracking in `#8E95A5`, shifting to `#D4FF00` on focus or interaction.

### Product Retail Cards
- Built on `#161920` with a structural `1px solid #2A303C` perimeter.
- Image container features high-contrast framing against neutral staging backdrops.
- Technical badges float at `0.75rem` padding from the top edge.
- Price module combines high-impact pure white numeric scales with secondary currency indicators.
- Quick-add triggers slide smoothly up from the card floor on hover.

### Badges & Technical Indicators
- **Performance Spec:** Solid `#0F1115` fill with a `1px solid #D4FF00` edge and high-visibility `#D4FF00` uppercase micro-text.
- **Alert / High Demand:** `#FF5500` flat background with contrasting `#0F1115` bold type.

### Form Inputs & Search Fields
- Inset field container in `#161920`, framed by `#2A303C`.
- Placeholder text in `#8E95A5`. Active input text in pure `#FFFFFF`.
- Focus state brings a sharp 1px border swap to `#FF5500` with no browser outline.

### Checkboxes & Segmented Filters
- Selection elements are square tiles (`4px` radius) built with `#222631` frames.
- Checked state fills with `#FF5500` and displays a crisp white internal check icon.
- Size and performance selectors function as structural chips: active tiles illuminate with a bold `#FFFFFF` fill and dark text, or a `#D4FF00` border accent.

### Spec Sheets & Technical Comparison Drawers
- Alternate zebra-striping between `#161920` and `#0F1115`.
- Data lines anchored by `1px solid #222631` dividers.
- Highlighting metrics and superior specifications emphasized via `#D4FF00` text highlights.