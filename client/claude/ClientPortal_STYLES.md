# ClientPortal — Style Guide

> Design system and CSS conventions for the ClientPortal invoice generator application.

---

## Brand Identity

**Product:** ClientPortal
**Tagline:** "Stop losing clients in your inbox."
**Tone:** Clean, professional, approachable
**Primary Theme:** Indigo and white with subtle neutrals

---

## Colour Palette

### Primary Colours

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#4F46E5` (Indigo 600) | Logos, CTA buttons, active states, brand accent, price text |
| Primary Tint | `#EEF2FF` (Indigo 50) | Icon backgrounds, active sidebar highlights, badges, default avatar background |

### Semantic Status Colours

| Status | Background | Text | Used For |
|--------|------------|------|----------|
| Success / Green | `#EAF3DE` | `#3B6D11` | "Active", "Paid", "Done" tags |
| Info / Blue | `#E6F1FB` | `#185FA5` | "New", "Sent" status badges |
| Warning / Amber | `#FAEEDA` | `#854F0B` | "Invoice due" tags |
| Draft | `--color-background-secondary` | `--color-text-secondary` | Draft invoice status |

### Avatar Accent Palette

Each client portal card uses a unique colour pair for the initials avatar:

| Name | Background | Text |
|------|------------|------|
| Default (Indigo) | `#EEF2FF` | `#4F46E5` |
| Green | `#E1F5EE` | `#0F6E56` |
| Coral | `#FAECE7` | `#993C1D` |
| Pink | `#FBEAF0` | `#993556` |

---

## CSS Custom Properties (Design Tokens)

The wireframes reference the following CSS variables, expected to be defined at `:root` by the Next.js global stylesheet:

```css
--font-sans              /* System font stack */
--color-text-primary     /* Headings, primary body text */
--color-text-secondary   /* Captions, labels, muted text */
--color-background-primary   /* White surface backgrounds */
--color-background-secondary /* Subtle section backgrounds (stats, footers) */
--color-border-secondary     /* Button outlines, form controls */
--color-border-tertiary      /* Cards, dividers, table lines */
--border-radius-md           /* Buttons, tags, stat cards, avatars */
--border-radius-lg           /* Frame containers, portal cards, file lists */
```

These tokens make dark mode (a "Could Have" feature) straightforward — swap the variable values and the entire UI adapts.

---

## Typography

The app uses the system font stack via `var(--font-sans)`. No custom web fonts are loaded.

| Element | Size | Weight | Colour |
|---------|------|--------|--------|
| Hero heading (h1) | 32px | 500 | `--color-text-primary`; accent `<span>` in `#4F46E5` |
| Page title | 18px | 500 | `--color-text-primary` |
| Section heading (h3 / h4) | 13–14px | 500 | `--color-text-primary` |
| Body / nav links | 12–13px | 400 | `--color-text-secondary` |
| Stat value | 22px | 500 | `--color-text-primary` |
| Stat label | 11px | 400 | `--color-text-secondary` |
| Invoice title | 24px | 500 | `--color-text-primary` |
| Plan price | 24px | 500 | `#4F46E5` |
| Tags / badges | 10–11px | 400–500 | Varies by semantic colour |
| Party label (uppercase) | 11px | 400 | `--color-text-secondary`, `letter-spacing: 0.05em` |

---

## Spacing & Layout

### Global Reset

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
```

### Common Padding Values

| Context | Padding |
|---------|---------|
| Hero section | `60px 40px 50px` |
| Main content area | `24px` |
| Pricing grid container | `40px` |
| Sidebar items | `8px 16px` |
| Portal cards | `16px` |
| Invoice header / parties / items | `24px 32px` or `28px 32px` |

### Grid Patterns

| Component | Columns | Gap |
|-----------|---------|-----|
| Landing features | `repeat(3, 1fr)` | `1px` (border-trick for dividers) |
| Pricing cards | `repeat(3, 1fr)` | `16px` |
| Dashboard stats | `repeat(4, 1fr)` | `12px` |
| Client portal stats | `repeat(3, 1fr)` | `12px` |
| Portal cards | `repeat(3, 1fr)` | `12px` |
| Invoice line items | `1fr 60px 80px 80px` | `8px` |

---

## Borders & Radii

| Property | Value | Usage |
|----------|-------|-------|
| Standard border | `0.5px solid var(--color-border-tertiary)` | Cards, dividers, file rows, table lines |
| Button / form border | `0.5px solid var(--color-border-secondary)` | Outline buttons, inputs |
| Featured plan border | `2px solid #4F46E5` | Highlighted pricing card |
| Dashed border | `border-style: dashed` | "+ New portal" placeholder card |
| Small radius | `var(--border-radius-md)` | Buttons, tags, stat cards, avatars, icons |
| Large radius | `var(--border-radius-lg)` | Frame containers, portal cards, file lists, invoice doc |

---

## Component Reference

### Buttons `.btn`

| Variant | Styles |
|---------|--------|
| Base | `padding: 6px 14px; border-radius: var(--border-radius-md); font-size: 12px; font-weight: 500; border: none; cursor: pointer` |
| Primary `.btn-primary` | `background: #4F46E5; color: #fff` |
| Outline `.btn-outline` | `background: transparent; border: 0.5px solid var(--color-border-secondary); color: var(--color-text-primary)` |
| Small `.btn-sm` | `padding: 4px 10px; font-size: 11px` |

### Tags `.tag`

| Variant | Background | Text |
|---------|------------|------|
| Default | `--color-background-secondary` | `--color-text-secondary` |
| Green `.tag-green` | `#EAF3DE` | `#3B6D11` |
| Blue `.tag-blue` | `#E6F1FB` | `#185FA5` |
| Amber `.tag-amber` | `#FAEEDA` | `#854F0B` |

All tags: `font-size: 10px; padding: 2px 8px; border-radius: var(--border-radius-md)`

### Stat Cards `.stat`

```
background: var(--color-background-secondary)
border-radius: var(--border-radius-md)
padding: 14px
```

### Portal Cards `.portal-card`

```
border: 0.5px solid var(--color-border-tertiary)
border-radius: var(--border-radius-lg)
padding: 16px
```

The "+ New portal" variant uses `border-style: dashed` with centred text and `cursor: pointer`.

### Avatars `.portal-avatar`

```
32 x 32px
border-radius: var(--border-radius-md)
background: #EEF2FF (default)
color: #4F46E5
font-size: 12px; font-weight: 500
```

Per-client colours override the defaults (see Avatar Accent Palette above).

### Sidebar

| Property | Owner Sidebar `.sidebar` | Client Sidebar `.client-sidebar` |
|----------|--------------------------|----------------------------------|
| Width | 200px | 220px |
| Padding | `16px 0` | `20px 0` |
| Active item colour | `#4F46E5` | `#4F46E5` |
| Active item background | `#EEF2FF` | `#EEF2FF` |
| Icon size | 14 x 14px | 14 x 14px |

### Invoice Document `.invoice-doc`

```
max-width: 680px
margin: 0 auto
border: 0.5px solid var(--color-border-tertiary)
border-radius: var(--border-radius-lg)
```

Sections are separated by `border-bottom`. The footer has `background: var(--color-background-secondary)`.

### Invoice Status Badges `.invoice-status`

| Class | Background | Colour |
|-------|------------|--------|
| `.status-sent` | `#E6F1FB` | `#185FA5` |
| `.status-paid` | `#EAF3DE` | `#3B6D11` |
| `.status-draft` | `--color-background-secondary` | `--color-text-secondary` |

All: `padding: 4px 12px; border-radius: var(--border-radius-md); font-size: 12px; font-weight: 500`

### File List `.files-list`

```
border: 0.5px solid var(--color-border-tertiary)
border-radius: var(--border-radius-lg)
overflow: hidden
```

File rows (`.file-row`): flex layout with `padding: 12px 16px`, separated by `border-bottom`.

### Task Board `.tasks-list`

Task items use a flex row with a circular checkbox (`.task-check`):
- Incomplete: `16px circle, border 1.5px solid var(--color-border-secondary)`
- Complete: `background: #4F46E5; border-color: #4F46E5` with strikethrough text

---

## Icon System

All icons are inline SVGs at 14–16px using `stroke="currentColor"` (or `stroke="#4F46E5"` on the landing page). No external icon library is loaded. Lucide or Heroicons would be compatible drop-in replacements if needed.

---

## Responsive Design Notes

- Mobile-responsive design is a "Should Have" feature.
- Wireframes are desktop-first.
- Sidebar layouts should collapse to a hamburger menu or bottom tab bar on small screens.
- Grid columns (3-col features, 4-col stats, 3-col portals) should reduce to 1–2 columns below ~768px.
- The invoice document (`max-width: 680px`) is already self-contained and will scale down naturally.

---

## Dark Mode Notes

Dark mode is listed as a "Could Have" feature. The design token approach makes this straightforward — swap `--color-text-*`, `--color-background-*`, and `--color-border-*` values. The primary indigo accent remains unchanged.
