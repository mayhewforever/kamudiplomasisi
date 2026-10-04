#!/usr/bin/env python3
"""Copy the public course site into a verified GitHub Pages artifact."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
from pathlib import Path
from urllib.parse import quote
from urllib.request import Request, urlopen
import time

BASE = "https://kamu-diplomasisi-yumusak-guc.mtoman.chatgpt.site/course/"
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
    url = BASE + quote(relative, safe="/")
    if Path(relative).is_file():
        payload = Path(relative).read_bytes()
        if sha256(payload).hexdigest() != digest:
            raise ValueError("Checked-in file differs from the manifest")
        target.write_bytes(payload)
        return relative
    for attempt in range(4):
        try:
            request = Request(url, headers={
                "User-Agent": "CourseSiteMirror/1.0",
                "Accept-Encoding": "identity",
            })
            with urlopen(request, timeout=120) as response:
                payload = response.read()
                final_url = response.url
                content_type = response.headers.get("Content-Type")
            actual = sha256(payload).hexdigest()
            if actual != digest:
                raise ValueError(f"Checksum mismatch: {relative}; expected={digest}; actual={actual}; url={final_url}; type={content_type}; size={len(payload)}; prefix={payload[:160]!r}")
            target.write_bytes(payload)
            return relative
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 * (attempt + 1))


with ThreadPoolExecutor(max_workers=8) as pool:
    copied = list(pool.map(fetch, entries))

if not (OUTPUT / "index.html").is_file():
    raise RuntimeError("index.html is missing from the Pages artifact")
print(f"Verified {len(copied)} files for GitHub Pages.")
