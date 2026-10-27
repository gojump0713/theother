#!/usr/bin/env bash
# Capture EVERY fragment of every slide at 1920x1080 and tile per slide: tools/shoot_all.sh
OUT="D:/Coding/PPT_theother/qa/frags"; mkdir -p "$OUT"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
STEPS=(0 4 5 5 3 4 3 4 3 4 5 5 4 4 5 5 5)
for n in $(seq 0 16); do
  nn=$(printf %02d $n)
  for f in $(seq 0 ${STEPS[$n]}); do
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=7000 \
      --autoplay-policy=no-user-gesture-required --screenshot="$OUT/s${nn}_f${f}.png" "http://localhost:8765/?noclick=1#/$nn/$f" 2>/dev/null
  done
done
python -I -X utf8 - "$OUT" <<'EOF'
import sys,glob,os,re
from PIL import Image, ImageDraw
out=sys.argv[1]
for n in range(17):
    fs=sorted(glob.glob(f'{out}/s{n:02d}_f*.png'), key=lambda p:int(re.search(r'_f(\d+)',p).group(1)))
    cols=3; W,H=640,360; rows=(len(fs)+cols-1)//cols
    s=Image.new('RGB',(cols*W,rows*(H+18)),'black'); d=ImageDraw.Draw(s)
    for i,f in enumerate(fs):
        im=Image.open(f).convert('RGB').resize((W,H)); x,y=(i%cols)*W,(i//cols)*(H+18)
        s.paste(im,(x,y+18)); d.text((x+4,y+3),os.path.basename(f)[:-4],fill='white')
    s.save(f'{out}/sheet_s{n:02d}.jpg',quality=85)
print('ok')
EOF
