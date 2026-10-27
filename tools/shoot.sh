#!/usr/bin/env bash
# Headless Chrome screenshots of every slide at its final fragment: tools/shoot.sh [out_dir]
# Requires the deck served at http://localhost:8765 (see .claude/launch.json)
OUT="${1:-D:/Coding/PPT_theother/qa}"; mkdir -p "$OUT"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
shoot() { # name hash
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=6000 \
    --autoplay-policy=no-user-gesture-required --screenshot="$OUT/$1.png" "http://localhost:8765/?noclick=1#/$2" 2>/dev/null
}
shoot s00 00
shoot s01 01/4
shoot s02 02/5
shoot s03 03/5
shoot s04 04/2
shoot s05 05/4
shoot s06 06/3
shoot s07 07/4
shoot s08 08/3
shoot s09 09/4
shoot s10 10/5
shoot s11 11/5
shoot s12 12/4
shoot s13 13/4
shoot s14 14/5
shoot s15 15/5
shoot s16a 16/4
shoot s16b 16/5
ls "$OUT"
