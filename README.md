# Alder & Row Estates

A complete local estate agency presentation prototype built with Next.js App Router, React, TypeScript, Tailwind CSS and Lucide icons. Node.js 20.9 or newer is required.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

The production build exports all routes to `out/` for static hosting. `npm start` serves that exported website locally; search state and back-to-results links are handled in the browser.

## Included

- Premium responsive homepage, property carousel and Buy / Rent / Commercial search.
- 12 sale listings, 10 rental listings and 8 commercial listings, with five or six gallery photographs each.
- Working URL-based location, price, bedroom, type, furnishing, availability and transaction filters; sorting, reset, empty states and load more.
- Property details, keyboard-accessible native dialog lightboxes, sample on-screen brochures, illustrative photo tours, neighbourhood maps and similar listings.
- Device-local shortlists, all 15 London area guides, services, about, contact and valuation pages.
- Validated forms with simulated confirmations; no submission endpoint, database or authentication.
- Privacy, cookie and photography notes, accessible focus styles and reduced-motion support.

## Change the content

- `data/settings.ts`: agency identity, contact details and services.
- `data/properties.ts`: typed local catalogue and pricing labels.
- `data/areas.ts`: 15 distinct neighbourhood guides.
- `data/image-sources.json`: image sources and licence references.
- `app/globals.css`: design tokens, component styles and responsive layouts.
- `public/assets/`: downloaded originals and responsive WebP variants.
- `public/fonts/`: locally stored DM Sans and Playfair Display with OFL licences.

Audit data, filters and assets with `node scripts/audit.mjs`. With the server running, use `node scripts/audit.mjs --routes` to check all 58 public routes.

## GitHub Pages

The live GitHub Pages site is https://noorisysba.github.io/alder-and-row-estates/.
Pushing to GitHub's `main` branch runs `.github/workflows/pages.yml`, checks the project, exports it and deploys the `out` directory. Pages must use **GitHub Actions** as its publishing source.

The workflow sets `NEXT_PUBLIC_BASE_PATH` from the Pages configuration. Leave this variable unset for a normal root-hosted build. To preview a Pages build locally in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/alder-and-row-estates"
npm run build
npm start
```

Then open http://localhost:3000/alder-and-row-estates/. Remove the variable with `Remove-Item Env:NEXT_PUBLIC_BASE_PATH` before returning to root-hosted development.

## Presentation limitations

All properties, addresses, prices, availability, dimensions, EPC ratings, council tax bands, testimonials and company details are fictional. Stock photographs are illustrative and may show different real spaces; they never represent the named address. Interiors are grouped by broad visual style rather than actual property photo shoots.

Most images are from Unsplash under the Unsplash Licence. The Belgravia photograph is by No Swan So Fine, Wikimedia Commons, CC BY-SA 4.0; resizing, compression and responsive crops of that image remain under the same licence. The Photography page includes source and licence information. No stock image API is required at runtime.

OpenStreetMap embeds require an internet connection and show approximate neighbourhood positions. The demonstration office is not a real destination. Social profile labels lead to explanatory demo content. Email and telephone details are demonstration data. Brochures and tours are labelled demonstrations, not genuine downloadable property documents or recorded videos.

Forms do not send or retain entered details. Favourite property IDs alone are stored in the browser’s local storage. For a clean presentation, remove any saved hearts from the shortlist page.
