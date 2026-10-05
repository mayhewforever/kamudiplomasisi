# Public Diplomacy and Soft Power course

The public course is deployed to GitHub Pages from `main`. Student accounts, study-time recording, private assignment uploads and the instructor dashboard use the existing authenticated course service linked from the page.

## Publishing

`site-manifest.sha256` is the authoritative list of the 165 published assets. The publisher uses checked-in files when present and downloads the remaining large media/download assets from the existing course service. Every file must match its SHA-256 digest before deployment. After editing an asset, update its manifest digest. Never publish student records, credentials or assignment files in this repository.

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

## Turkish subtitles, 5 October 2026

All fourteen English AI lecture videos have complete Turkish WebVTT subtitle tracks. Turkish is selected when a lecture opens in either interface language; the original English captions remain selectable in the player. Each translated cue preserves its original English cue number and timing. The Turkish files are checked in under `videos/` and published to both deployments.

YouTube embeds request Turkish captions with `cc_lang_pref=tr` and `cc_load_policy=1`. External video owners and YouTube determine which caption and automatic translation options are available; the player provides guidance when Turkish does not appear.

## Beginner learning guides, 5 October 2026

All fourteen weeks start with a plain-language Turkish/English learning guide: an everyday analogy, defined terms, three explanatory steps, a four-node visual diagram, a worked example, an explained self-check and a specific Excel exercise. The detailed academic material remains in an expandable section. The fourteen standalone Turkish reading pages use the same beginner guides. Existing PDF files are clearly labeled as detailed academic notes.

`learning/week-XX.json` is the editable source. Run `node scripts/build-beginner-notes.cjs` after editing it. `learning-content.js` supplies the in-page guides; `learning-guide.js` and `learning-guide.css` provide the shared accessible layout. The spreadsheet is `workbooks/Kamu_Diplomasisi_Ogrenme_Atolyesi_TR.xlsx`. Its four sheets provide weekly tasks, worked evidence examples, a hypothetical measurement experiment and a concept reference. The workbook builder uses the Codex primary runtime's artifact tool.

Known source-media limitation: week 12's original slide 26 (16:45–16:53) contains only about seven seconds for a much longer source-caption passage. Turkish captions retain the original timeline; the video dialog identifies the short interval and provides the complete readable Turkish caption text. The source audio has not been regenerated.
