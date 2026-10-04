# Public Diplomacy and Soft Power course

The public course is deployed to GitHub Pages from `main`. Student accounts, study-time recording, private assignment uploads and the instructor dashboard use the existing authenticated course service linked from the page.

## Publishing

`site-manifest.sha256` is the authoritative list of the 147 published assets. The publisher uses checked-in files when present and downloads the remaining large media/download assets from the existing course service. Every file must match its SHA-256 digest before deployment. After editing an asset, update its manifest digest. Never publish student records, credentials or assignment files in this repository.

The interactive JavaScript and styles are checked in so that changes can be reviewed and deployed without first modifying the separate service. The same frontend fixes are maintained in that service's `public/course/` directory.

## Regression check

Install `jsdom` in a disposable directory and run:

```sh
NODE_PATH=/absolute/path/to/node_modules node tests/course-regression.cjs
```

The test runs against an in-memory DOM, with no production sign-in or student record writes. It covers all 14 weeks and five tabs, search/filter navigation, language switching, selected-week links, flashcards, quiz feedback, matching, reset behaviour and unavailable browser storage. It is not a real-browser layout or authenticated upload test.

## Repairs, 4 October 2026

- Selecting a week clears filters that would otherwise keep it hidden.
- Search matches include all matching weeks and respect the selected category.
- Course workspace labels follow the selected language and week.
- The public mirror identifies that study-time recording requires the signed-in workspace, with direct links for recording, assignments and instructor access.
- Student sign-in preserves the selected week; note readers return to the same deployment.
- Resetting local exercises does not clear server-derived completion.
- Blocked browser storage does not stop the course from loading.
- Tablet navigation uses the accessible collapsible menu.

All 147 published file URLs returned HTTP 200 during the audit. All artifact checksums were verified. The live week-one video loaded with a 20:50 duration. Authenticated uploads, study-time writes and instructor records were not exercised against production student data.
