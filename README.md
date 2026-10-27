# TheOtherDay 2026 — 인터랙티브 발표자료 작업 폴더

VSCode에서 이어서 작업하기 위한 안내입니다. 상세 요건은 `docs/` 두 문서를 기준으로 합니다.

## 실행 방법 (완성본)
```
deck\run.bat           ← 더블클릭: 로컬 서버(8765) 시작 + 브라우저 열림
```
또는 `cd deck && python -m http.server 8765` 후 http://localhost:8765 접속.
`index.html`을 파일로 직접 열어도 슬라이드는 동작하지만, **발표자 창(S) 동기화는 로컬 서버에서만** 안정적으로 동작합니다.

| 키 | 동작 |
|---|---|
| → / Space / PageDown / 클릭 | 다음 fragment → 다음 장 |
| ← / PageUp | 이전 |
| O | 목차(썸네일 그리드) · S | 발표자 창 · F | 전체화면 · B | 블랙 |
| R | 현재 장 인터랙션 리셋 · M | 03장 원본 음향 토글 · Home / End |

URL 해시 `#/07/2` = 07장 fragment 2. `?noclick=1`을 붙이면 클릭 이동이 꺼집니다(키보드·리모컨 전용).

## 저장소 · 배포
- 저장소: https://github.com/gojump0713/theother
- 배포(GitHub Pages): https://gojump0713.github.io/theother/ — `main`에 push하면 `.github/workflows/deploy.yml`이 `tools/build.py`를 실행해 `deck/`를 `dist/`로 검증·복사한 뒤 자동 배포합니다
- 로컬 빌드 확인: `python tools/build.py` (참조 에셋 누락 검사 + `dist/` 생성)
- 개발 경과: `docs/개발일지.md`

### 검수 상태 (2026-10-24)
- 1920×1080 헤드리스 캡처로 17개 화면 전부 확인 → `qa/` 폴더 (`tools/shoot.sh`로 재생성)
- 겹침·줄바꿈 문제 14건 수정 완료. 발표자 창(멘트 하이라이트·3종 타이머) 동작 확인
- **3차 품질 점검(2026-10-24)**: 86개 fragment 상태를 전부 캡처(`tools/shoot_all.sh` → `qa/frags/`)해 장별로 검토. 01장 아이콘 교체(SVG), 04장 비교판·칩·클로징 재배치, 05장 초기 카드 밝기, 06장 카드 정렬·모니터 투명도, 07·10장 글자 크기 상향, 09장 책 표지 아트, 12장 카드 재설계(높이·요약문), 13장 초기 빈 박스 제거, 14장 태그 위치, 15장 순환 라벨, 캡션 18px·대비 상향 등 18건 반영
- **2차 검수(실제 브라우저 창, 800px 폭)**: 창이 1920보다 좁을 때 무대가 flex로 찌그러져 글자가 겹치던 근본 원인(`#stage` flex-shrink) 수정. 표지 제목이 그려지지 않던 Chrome 재도색 문제는 GSAP 대신 CSS 전환으로 교체해 해결. 08장 카드 위치, 02장 칩 간격 조정. 00~16장을 좁은 창에서 다시 전부 확인
- **미검증**: 실제 발표 PC에서의 영상 재생 성능, 프레젠터 리모컨, 20분 리허설, 인쇄(PDF) 레이아웃
- 알려진 제한: 10장 음성 낭독은 브라우저 `speechSynthesis` 한국어 음성이 설치된 PC에서만 소리가 남(없으면 하이라이트만)

## 폴더 구성
```
PPT_theother/
  README.md                                 ← 이 문서 (작업 현황·다음 단계)
  Roadster.mp4                              ← 03장 배경 원본 (1920×1080, 23.976fps, 45.7s, 음향 있음)
  TheOtherDay_2026_발표자료_최종개정안.pdf     ← 원고 (16장)
  TheOtherDay_2026_페이지별_발표멘트.docx      ← 발표 멘트·시간·진행 힌트
  docs/
    개발일지.md                              ← 개발 경과 기록
    PRD_TheOtherDay2026_인터랙티브발표.md      ← 작업지시서 (요건·디자인 시스템·에셋 계획·사실 검증 게이트)
    화면설계서_TheOtherDay2026.html            ← 16장 와이어프레임·fragment·멘트 매핑 (브라우저로 열기)
  assets/
    stylekeys/style_dark.png                ← 승인된 스타일 키 (모든 에셋의 레퍼런스)
    stylekeys/style_paper.png               ← 폐기 (참고용)
    keyframes/                              ← 장별 키 이미지 (영상 시작 프레임 = 포스터)
    video/                                  ← Kling 3.0 배경·카드 영상 (생성 후 저장)
  deck/                                     ← ★ 완성된 발표자료 (46MB, 외부 네트워크 의존 0)
    index.html · presenter.html · run.bat
    css/  base.css(토큰·엔진 UI) slides.css(장별) presenter.css
    js/   engine.js(스케일·내비·fragment·해시·미디어·목차·발표자 동기화)
          content.js(원고·멘트·진행 힌트·목표 시간 — docx에서 자동 생성)
          scenes-a.js(00–05) scenes-b.js(06–10) scenes-c.js(11–16)
          presenter.js · vendor/gsap.min.js
    assets/ video/(22개 mp4, 1080p 무음) poster/(첫 프레임 jpg) img/(21 webp) fonts/Pretendard
  qa/                                       ← 장별 검수 캡처
  tools/shoot.sh · shoot_all.sh             ← 헤드리스 Chrome 전 장·전 fragment 캡처 스크립트
  tools/build.py                            ← 배포용 dist/ 빌드 (에셋 참조 검사)
  .github/workflows/deploy.yml              ← GitHub Pages 자동 배포
```

## 확정된 결정 (2026-10-24)
| 항목 | 결정 |
|---|---|
| 톤 | **Dark 단일 테마** (#060B16). Kstory 구간(09~13)은 accent만 Amber/Coral로 교체 |
| 배경 영상 | **모든 장**에 배경 영상 (strong 00·03·16 / mid 06·08·12 / faint 나머지) |
| 이미지 모델 | Nano Banana 2, 16:9, 2k — 2 크레딧/장 |
| 영상 모델 | **Kling 3.0 pro, 무음**, 16:9, start_image = 키 이미지 — 8초 14 크레딧, 6초 10.5 크레딧 |
| 03장 | 로컬 `Roadster.mp4` 사용 (생성하지 않음). ffmpeg로 무음 루프본·정지 프레임 제작 필요 |

## 힉스필드 생성 현황
크레딧: 시작 609.8 → 스타일 키 4 → 키 이미지 42 사용 → **약 564 잔여**.

### 스타일 키 (완료)
| 파일 | job_id | 비고 |
|---|---|---|
| `style_dark.png` | `f5f4636c-9850-4c16-a3c6-7ea2e231af7a` | **승인**. 이후 모든 이미지의 `image_references` |
| `style_paper.png` | `3313bf93-2b76-414b-971b-40e6ad4c1890` | 폐기 |

### 키 이미지 21장 (완료 — `assets/keyframes/{에셋}_s{장}.png`, 2752×1536)
| idx | 에셋 | 장 | 용도 | job_id |
|---|---|---|---|---|
| 0 | V00 | 00 | 표지 풀블리드 | `ceeff546-2aaf-4017-89c1-5b1af4dbbac9` |
| 1 | V01 | 01 | 배경 faint | `bc704d16-4150-4f51-8452-e382eee68388` |
| 2 | V02 | 02 | 배경 faint | `dabc355a-2492-42da-bf89-fba68821c11d` |
| 4 | V04 | 04 | 배경 faint | `ed3fe6bc-d081-42f6-832b-b8e5f36b904a` |
| 5 | V05a | 05 | 카드 Space | `205ebb5b-eb6d-4838-aa9c-58dc88fdc335` |
| 6 | V05b | 05 | 카드 Town | `41c875b6-b624-40e5-a59d-fcc090eff686` |
| 7 | V05c | 05 | 카드 Kstory | `456d0110-6ea0-4d5f-8c6e-dde9f8881dda` |
| 8 | V06 | 06 | 배경 mid | `2525edfe-2f3f-4e01-9cf1-051933fa50d5` |
| 9 | V07 | 07 | 배경 faint | `4b43aa84-58d1-4a42-900d-6a79d37af3a6` |
| 10 | V08 | 08 | 배경 mid | `6fdfaa18-60e3-401c-b32d-70f4ae91b6b9` |
| 11 | V09 | 09 | 책 뒤 | `a1d61d46-baa0-42be-8c70-3d06c60a229b` |
| 12 | V10 | 10 | 배경 faint | `8fdabf0c-6d9d-41bb-a6a5-fc3e69641739` |
| 13 | V11 | 11 | 배경 faint | `a4862ee6-7b86-4de9-a1e6-b0a1503835bd` |
| 14 | V12 | 12 | 배경 mid | `0b10c1cf-01be-45ce-a8b8-c95c2a3323af` |
| 15 | V13 | 13 | 배경 faint | `3978b849-9419-4810-b25d-bf37215b6746` |
| 16 | V14 | 14 | 배경 faint | `756ab0ef-c91b-4605-9ab8-80fec7a7e819` |
| 17 | V15 | 15 | 배경 faint | `662e1924-43b0-49da-8d6e-c2e9d59fc1f0` |
| 18 | V16a | 16 | 카드 Space 미래 | `be8e4449-6ed7-493e-a0cd-903370fd607a` |
| 19 | V16b | 16 | 카드 Town 미래 | `cc9b0396-cf71-4a9d-a964-11a57c7ed56b` |
| 20 | V16c | 16 | 카드 Kstory 미래 | `156009f8-f3fc-4ecd-ac49-5d4611061b94` |
| 21 | V16 | 16 | 클로징 풀블리드 | `7f2b40d3-a809-4b92-9b31-80bef8bc0f24` |

(idx 3은 03장 Roadster — 생성하지 않음)

### 영상 21개 · 보조 이미지 21장 (완료)
- 영상: Kling 3.0 pro 무음, 키 이미지를 `start_image`로. 원본 `assets/video_raw/`, 덱용 재인코딩본 `deck/assets/video/`. job_id는 `assets/jobs.json`
- 보조 이미지: `assets/images/`(원본 png) → `deck/assets/img/`(webp)
- 크레딧 사용 합계 348 → **잔여 261.8** (2026-10-24 01:05 기준)

## 남은 할 일
1. **PRD §8 사실 검증 게이트** — 특히 01장 점유율 기준(89.4% vs 83.13%) 확정. 확정 전까지 01장에 "집계 기준 확인 중" 배지가 떠 있음
2. 03장 Roadster 영상의 출처·사용 권리 확인 (캡션 "연출 참고 영상" 유지 중)
3. 10장 다국어 문장 원어민 검수 후 언어 추가 (현재 한국어·English)
4. 발표 PC에서 리허설: `S`로 발표자 창 띄우고 20분 타이머로 2회
5. 교체하고 싶은 에셋이 있으면 같은 파일명으로 `deck/assets/video|img`에 덮어쓰기만 하면 됨

## 참고 레퍼런스
- https://gojump0713.github.io/PPT_ART/ — 다크 톤·배경 영상 강도 체계
- https://gojump0713.github.io/PPT_Native/ — 엔진 구조·발표자 노트·비교 슬라이더
- https://gojump0713.github.io/ppt_tstory/ — Kstory 정서·등장 효과
- https://kwon007009-stack.github.io/jiwon13/ — 01장 연도 드릴다운
