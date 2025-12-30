# Public Assets

This folder contains static assets served at the root URL.

## Required Assets (Replace Before Production)

### Favicons
Generate all favicon sizes using [RealFaviconGenerator](https://realfavicongenerator.net/) or similar tools.

| File | Size | Purpose |
|------|------|---------|
| `favicon.svg` | Any | Modern browsers (included, dark-mode aware) |
| `favicon.ico` | 48x48 | Legacy browsers fallback |
| `favicon-16x16.png` | 16x16 | Browser tabs |
| `favicon-32x32.png` | 32x32 | Browser tabs (retina) |
| `apple-touch-icon.png` | 180x180 | iOS home screen |

### PWA Icons (in `/icons/`)
| File | Size | Purpose |
|------|------|---------|
| `icon-192.png` | 192x192 | PWA manifest icon |
| `icon-512.png` | 512x512 | PWA splash screen |

### Open Graph Image (in `/images/`)
| File | Size | Purpose |
|------|------|---------|
| `og-image.png` | 1200x630 | Social media previews |

## Quick Setup

1. Design your logo/icon
2. Use [RealFaviconGenerator](https://realfavicongenerator.net/) to generate all sizes
3. Replace the placeholder files in this folder
4. Update `manifest.json` with your app name and colors
