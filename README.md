# Public Diplomacy and Soft Power course

The public course is deployed to GitHub Pages from `main`. Student accounts, study-time recording, private assignment uploads and the instructor dashboard use the existing authenticated course service linked from the page.

## Publishing

`site-manifest.sha256` is the authoritative list of the published assets. The publisher uses checked-in files when present and downloads the remaining large media/download assets from the existing course service. Every file must match its SHA-256 digest before deployment. After editing an asset, update its manifest digest. Never publish student records, credentials or assignment files in this repository.

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

## Detailed bilingual learning materials, 5 October 2026

Each of the fourteen weeks has separate English and Turkish reading pages and naturally paginated PDFs. The learning path connects an accessible introduction to six substantial explanatory sections, three visual syntheses, two worked cases, an explained research exercise, methodological questions, and the existing academic argument and source guide. Turkish pages retain the earlier thirty-part text as an optional extended appendix. Original publication titles are retained in the bibliography.

Notes, PDFs, Excel workbooks, presentation downloads, lecture headings and readable video transcripts follow the interface language. English videos continue to use Turkish subtitles by default, as requested. Presentation ZIP files contain only the selected language.

Editable sources:

- `learning/week-XX.json`: introductory explanations and exercises.
- `learning/deep-week-XX.json`: corresponding detailed academic supplements in both languages.
- `content_weeks_*.js`, `weekly-study-guide.js`, `seminar-frames.js`: academic arguments and source assignments.

Build notes with `node scripts/build-course-notes.cjs`. This also exports `learning/academic-readings.json` for the PDF builder and derives Turkish transcripts from the caption tracks. Then run `python scripts/build-course-pdfs.py` to regenerate all twenty-eight PDFs. Their length follows the content; there is no fixed page limit. The original `build-beginner-notes.cjs` command delegates to the complete generator.

`depth-guide.js` and `depth-guide.css` render the expanded material in the course and standalone reading pages. `notes-layout.css` provides the reading layout. The workbook builder `scripts/build-learning-workbook.mjs` creates separate English and Turkish versions, with five equivalent sheets: weekly tasks, evidence practice, a hypothetical measurement experiment, concepts, and research design. Sample numbers are explicitly hypothetical; they are not student data.

`tests/language-notes.cjs` checks all language-specific reading links, PDFs, anchors, complete material, presentation selection and readable transcripts; the course regression also checks the fourteen weeks and five interactive tabs. Run these with `NODE_PATH` pointing to `jsdom`. PDF generation verifies all explanatory and academic paragraphs survive export; workbook validation covers formulas, missing/zero/inconsistent inputs, and rendered sheets.

Source-media notes: the week-seven narration says 14 April for the establishment of the Committee on Public Information; the notes give the verified 13 April 1917 date. A localized correction links to Executive Order 2594 beside the video and transcript. The original recording and its faithful subtitles are preserved. Week twelve's slide26 (16:45–16:53) remains short for its source-caption passage; the video dialog provides a readable transcript in the selected language. Source audio has not been regenerated.

## Academic register revision, 5 October 2026

The English and Turkish conceptual introductions and detailed supplements use a formal academic register throughout all fourteen weeks. The revision includes definitions, explanatory prose, illustrative analogies, diagram labels, case analyses, methodological questions and model responses. Conversational headings and individual forms of address have been replaced with analytical terminology and formal instructional language. English follows British usage; Turkish uses formal plural or impersonal constructions. The historical scope, source qualifications, hypothetical examples and distinction between intention, activity, reception and effect are retained.

The shared course interface, separate reading pages, PDFs and both Excel workbooks use corresponding academic labels. Workbook formulas, worksheet names and links are unchanged. Video narration and faithful subtitle transcriptions retain their existing wording; Turkish subtitles remain the default for English lectures.

Verification for this revision: all fourteen weeks and five study tabs pass the course regression; all twenty-eight reading pages/PDF links retain language separation, valid anchors, visual structures and transcript routing. Both workbook versions preserve their formulas and pass recalculation checks. The PDFs are naturally paginated at 19–21 pages each, with no imposed page count.
