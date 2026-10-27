#!/usr/bin/env python3
"""Build the TheOtherDay 2026 deck for static hosting.

1. Verifies that every asset referenced from deck/ (html, css, js) exists.
2. Copies deck/ to dist/ and adds .nojekyll so GitHub Pages serves it as-is.

Usage: python tools/build.py [--out dist]
Exit code 1 when a referenced asset is missing.
"""
import argparse, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DECK = os.path.join(ROOT, "deck")

REF_PATTERNS = [
    re.compile(r"""(?:src|href)\s*=\s*["']([^"'#?]+)"""),                  # html
    re.compile(r"""url\(\s*["']?([^"')]+?)["']?\s*\)"""),                   # css
    re.compile(r"""["'`]((?:\.\./)?(?:assets|css|js)/[\w./@-]+)["'`]"""),   # js string literals
]
SKIP = ("http://", "https://", "data:", "mailto:", "javascript:", "about:")


def collect_refs():
    refs = {}
    for dirpath, _, files in os.walk(DECK):
        for name in files:
            if not name.endswith((".html", ".css", ".js")) or "vendor" in dirpath:
                continue
            path = os.path.join(dirpath, name)
            with open(path, encoding="utf-8", errors="replace") as fh:
                text = fh.read()
            for pat in REF_PATTERNS:
                for ref in pat.findall(text):
                    if ref.startswith(SKIP) or not ref.strip():
                        continue
                    refs.setdefault(ref, set()).add(os.path.relpath(path, ROOT))
    return refs


HELPER_CALLS = {  # scenes-*.js build paths through V(name) / P(name) / IMG(name)
    "V": "assets/video/{}.mp4",
    "P": "assets/poster/{}.jpg",
    "IMG": "assets/img/{}.webp",
}


def collect_helper_refs(refs):
    pat = re.compile(r"\b(V|P|IMG)\(\s*'([^'`$]+)'\s*\)")
    js_dir = os.path.join(DECK, "js")
    for name in os.listdir(js_dir):
        if not name.endswith(".js"):
            continue
        path = os.path.join(js_dir, name)
        with open(path, encoding="utf-8", errors="replace") as fh:
            for fn, arg in pat.findall(fh.read()):
                refs.setdefault(HELPER_CALLS[fn].format(arg), set()).add(os.path.relpath(path, ROOT))
    return refs


def resolve(ref):
    # references are written relative to deck/ (where index.html lives) or to css/
    cand = [os.path.join(DECK, ref), os.path.join(DECK, "css", ref), os.path.join(DECK, "js", ref)]
    if ref.endswith("/"):  # directory prefix used for dynamic names
        return any(os.path.isdir(c) for c in cand)
    return any(os.path.isfile(c) for c in cand)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(ROOT, "dist"))
    args = ap.parse_args()

    refs = collect_helper_refs(collect_refs())
    missing = {r: s for r, s in refs.items() if not resolve(r)}
    print(f"[check] {len(refs)} distinct references scanned")
    if missing:
        for ref, srcs in sorted(missing.items()):
            print(f"  MISSING {ref}   <- {', '.join(sorted(srcs))}")
        sys.exit(1)
    print("[check] all referenced assets exist")

    out = os.path.abspath(args.out)
    if os.path.isdir(out):
        shutil.rmtree(out)
    shutil.copytree(DECK, out, ignore=shutil.ignore_patterns("run.bat", "__pycache__"))
    open(os.path.join(out, ".nojekyll"), "w").close()

    n, size = 0, 0
    for dirpath, _, files in os.walk(out):
        for f in files:
            n += 1
            size += os.path.getsize(os.path.join(dirpath, f))
    print(f"[build] {n} files, {size/1024/1024:.1f} MB -> {out}")


if __name__ == "__main__":
    main()
