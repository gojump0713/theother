@echo off
rem TheOtherDay 2026 deck - local server (needed for presenter window sync)
cd /d "%~dp0"
start "" http://localhost:8765/
python -m http.server 8765
