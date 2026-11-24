#!/usr/bin/env python3
"""Copy the public course site into a verified GitHub Pages artifact."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
import time

BASE = "https://kamu-diplomasisi-yumusak-guc.mtoman.chatgpt.site/course/"
PAGES_FALLBACK = "https://mayhewforever.github.io/kamudiplomasisi/"
PINNED_PDFS = {
    f"notes/{filename}"
    for week in range(1, 15)
    for filename in (f"Hafta_{week:02d}_Ders_Notu_TR.pdf", f"Week_{week:02d}_Lecture_Notes_EN.pdf")
}
MANIFEST = Path("site-manifest.sha256")
OUTPUT = Path("site")
entries = []
for line in MANIFEST.read_text(encoding="utf-8").splitlines():
    digest, relative = line.split("  ", 1)
    target = Path(relative)
    if len(digest) != 64 or target.is_absolute() or ".." in target.parts:
        raise ValueError(f"Unsafe manifest entry: {relative}")
    entries.append((digest, relative))


def fetch(entry):
    digest, relative = entry
    target = OUTPUT / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    if Path(relative).is_file():
        payload = Path(relative).read_bytes()
        if sha256(payload).hexdigest() != digest:
            raise ValueError("Checked-in file differs from the manifest")
        target.write_bytes(payload)
        return relative
    errors = []
    origins = [(BASE, 4)]
    # The current host serves revised PDFs; deploy the exact November edition.
    if relative in PINNED_PDFS:
        origins.append((PAGES_FALLBACK, 2))
    for origin, attempts in origins:
        url = origin + quote(relative, safe="/")
        for attempt in range(attempts):
            try:
                request = Request(url, headers={
                    "User-Agent": "CourseSiteMirror/1.0",
                    "Accept-Encoding": "identity",
                })
                with urlopen(request, timeout=120) as response:
                    payload = response.read()
            except OSError as exc:
                if attempt + 1 < attempts:
                    time.sleep(2 * (attempt + 1))
                    continue
                errors.append(f"{url}: {exc}")
                break

            actual = sha256(payload).hexdigest()
            if actual != digest:
                errors.append(f"{url}: SHA-256 {actual} (expected {digest})")
                break
            target.write_bytes(payload)
            if origin == PAGES_FALLBACK:
                print(f"Recovered pinned public asset from GitHub Pages: {relative}")
            return relative

    raise ValueError(f"Could not retrieve verified asset {relative}: {'; '.join(errors)}")


with ThreadPoolExecutor(max_workers=8) as pool:
    copied = list(pool.map(fetch, entries))

if not (OUTPUT / "index.html").is_file():
    raise RuntimeError("index.html is missing from the Pages artifact")
print(f"Verified {len(copied)} files for GitHub Pages.")
