# Verification

Checked locally on 20 October 2026.

- Clean npm dependency installation: passed. The environment blocked the optional `unrs-resolver` postinstall script; its packaged native binding was available and lint/build still passed.
- TypeScript (`tsc --noEmit`): passed.
- ESLint: passed with no errors or warnings.
- Next.js production build: passed after installing the clean npm dependency tree.
- Catalogue/filter/asset audit: passed for 30 listings, unique IDs/slugs, 15 area guides, complete galleries, local JPEG originals and responsive WebP variants.
- HTTP route audit: all 58 public routes returned 200 and real page content.
- Browser checks: rental search from the homepage, location/price/bedroom filters, combined rapid filter changes, sorting, clear/reset, empty state, load more, preserved back-to-search filters, commercial sale filtering, persistent shortlist and removal, 15 area cards and guide links.
- Property browser checks: gallery dialog, next-image counter, sample brochure, illustrative tour, simulated enquiry confirmation, interactive OpenStreetMap embed.
- Forms: required-field blocking on valuation, completed valuation confirmation, completed contact confirmation and property enquiry confirmation using fictional test details.
- Responsive checks: 1440px desktop, 768px tablet and 390px mobile; no horizontal overflow on inspected pages. Mobile menu and expandable listing filters checked.
- Fresh homepage browser session: no console errors or warnings and no broken loaded images.
- Publishing update: removed both bottom hero captions, enabled a static export of every property route and preserved filtered back-to-search navigation in the browser. Static production build, TypeScript, lint and catalogue audit passed.

The saved homepage screenshot is in `docs/homepage-preview.jpg`.

Maps need an internet connection. Photography and all property/company information are illustrative; stock galleries are not real shoots of the named addresses. No enquiry is delivered or stored. This is a presentation prototype, not a production or regulatory-compliance release.
