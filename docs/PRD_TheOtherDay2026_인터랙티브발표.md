# TheOtherDay 2026 인터랙티브 발표자료 — 작업지시서 (PRD)

| 항목 | 내용 |
|---|---|
| 문서 버전 | v1.0 (2026-10-23) |
| 산출물 | 16:9 HTML 기반 인터랙티브 발표자료 1식 (발표자 모드 포함) |
| 기준 원고 | `TheOtherDay_2026_발표자료_최종개정안.pdf` (16장), `TheOtherDay_2026_페이지별_발표멘트.docx` (장별 멘트·시간·진행 힌트) |
| 함께 보는 문서 | `화면설계서_TheOtherDay2026.html` (장별 레이아웃·인터랙션·에셋 상세) |
| 발표 | 16장 / 20분 / 단독 발표자 / 대형 스크린(1920×1080) |
| 핵심 메시지 | **증명한 기술을, 모두가 누리는 서비스로.** |

---

## 1. 목적과 성공 기준

### 1.1 목적
틸론이 구축형 기술 기업에서 **서비스 기업**으로 전환한다는 선언을, 청중이 "읽는" 발표가 아니라 "보고 체감하는" 발표로 전달합니다. 장마다 거버닝 메시지 하나를 **하나의 시각적 사건(Visual Event)** 으로 바꾸는 것이 기획의 핵심입니다.

### 1.2 성공 기준
| # | 기준 | 측정 방법 |
|---|---|---|
| S1 | 장마다 거버닝 메시지가 화면의 시각적 사건 1개로 표현된다 | 화면설계서의 "메시지 → 시각 장치" 매핑 16/16 충족 |
| S2 | 발표멘트의 진행 힌트(가리키기·한 박자 쉬기 등)가 클릭 단계(fragment)와 1:1로 맞물린다 | 리허설 시 멘트 문장과 fragment 순서 대조 |
| S3 | 20분 안에 끝난다 | 발표자 모드 타이머 기준 리허설 2회 |
| S4 | 오프라인·네트워크 불안정 환경에서도 끝까지 진행된다 | 랜선 분리 상태에서 전 장 진행 테스트 |
| S5 | 확인되지 않은 사실을 확정 표현으로 보여주지 않는다 | §8 사실 검증 게이트 전 항목 처리 |
| S6 | 전환과 애니메이션이 끊기지 않는다 (목표 60fps, 최소 45fps) | 발표용 PC에서 Chrome DevTools Performance 측정 |

---

## 2. 참고 레퍼런스 분석과 적용 방침

| 레퍼런스 | 관찰한 특징 | 이번 발표에 가져올 것 |
|---|---|---|
| **jiwon13** (공공조달 마켓 인텔리전스) | 연도 탭을 바꾸면 표·원형차트·막대가 함께 갱신되는 대시보드. 틸론 Dstation 점유율 강조 | 01장 **점유율 드릴다운**(연도 탭, 원형 게이지). 단, 수치 체계는 §8-1 확정 후 사용 |
| **PPT_Native** (AI Native Campus) | 37장, GSAP + Lenis, 해시 라우팅(`#/opening`), 파티클 캔버스, Before/After 비교 슬라이더, 장면별 루프 영상, 목차(O)·발표자 노트·경과 타이머 | **엔진 구조**(장면 모듈·해시 라우팅·발표자 노트·목차), 04장 **비교 슬라이더**, 파티클 |
| **ppt_tstory** (AI 시민 동화책) | 따뜻한 종이 톤 라이트 테마, 장마다 배경 영상, 카운트업, 노드 체인·벤다이어그램, `rv-left / rv-scale` 등장 효과 | 09~13장 Kstory 구간의 **따뜻한 정서와 등장 효과 어휘** (라이트 테마는 채택하지 않음, §2.1) |
| **PPT_ART** (AX Native Campus 기대효과) | 다크 네이비(#060B16), Pretendard, 부팅 로더, WebGL 베일 캔버스, 장면별 풀블리드 루프 영상(strong/faint 강도), 커튼 디바이더, 도넛·사이클 노드 | **다크 시네마틱 톤**, 배경 영상 강도 체계, 커튼형 섹션 전환, 사이클 다이어그램(11장) |

### 2.1 종합 크리에이티브 콘셉트 — "One Dark, Warm Light" (2026-10-24 개정)
> 스타일 키 검토 결과 **Dark 톤으로 통일**합니다. 초안의 "Dark → Paper → Dark"(Kstory 구간 종이 톤 반전)는 폐기합니다. 승인된 스타일 키: `assets/stylekeys/style_dark.png`.

- **전 구간(00~16)**: 다크 네이비(#060B16) 시네마틱 톤. 빛, 데이터, 연결을 시각 언어로 씁니다.
- **Kstory.ai 구간(09~13)**: 배경은 다크를 유지하되 **포인트 컬러를 Teal/Blue → Amber(#E8A33D)·Coral(#D9776A)로 바꾸고**, 배경 영상에 따뜻한 광원(빛나는 책, 랜턴, 저녁 창가)을 씁니다. 삽화 요소(책, 동물, 인물)는 어두운 배경 위에 **빛을 머금은 그림책 컷**으로 올립니다.
- **08→09 전환**: 종이 반전 대신 Teal 광원이 Amber 광원으로 **색온도가 바뀌는 전환**(1.2s)으로 "기술 → 사람"을 표현합니다. 13→14는 Amber가 Teal로 식는 전환입니다.
- **16장 클로징**: 세 서비스의 빛(Blue·Teal·Amber)이 하나로 모여 핵심 문장을 완성합니다.

---

## 3. 범위

### 3.1 포함
1. 발표 장 16개와 대기 화면(00, 표지)
2. 슬라이드 엔진: 스케일링, 내비게이션, fragment, 해시 라우팅, 미디어 프리로드
3. 발표자 모드: 멘트, 진행 힌트, 다음 장 미리보기, 장별 목표 시간 타이머
4. 장별 인터랙션 12종 (§6)
5. 힉스필드(Higgsfield) 생성 영상·이미지 에셋 제작과 배치 (§7)
6. 03장 `Roadster.mp4` 배경 적용
7. 인쇄용 PDF 출력(장당 1페이지, 최종 상태 기준)

### 3.2 제외
- 백엔드, 로그인, 실시간 청중 투표 (오프라인 진행 원칙)
- 실제 서비스 화면 캡처 (제공받으면 교체할 수 있는 자리만 마련)
- 대학, 기관, AI 모델 공식 로고 (사용 허락 전까지 텍스트로 표기)

---

## 4. 기술 요건

### 4.1 구조
```
/deck
  index.html              ← 단일 진입점
  /css   base.css, theme-dark.css, theme-paper.css, slides.css, presenter.css
  /js
    vendor/gsap.min.js    ← 로컬 동봉 (CDN 의존 금지)
    engine.js             ← 스케일·내비·fragment·라우팅·프리로드
    content.js            ← 16장 텍스트 + 발표 멘트 + 진행 힌트 + 목표 시간 (단일 데이터 소스)
    presenter.js          ← 발표자 창(BroadcastChannel 동기화)
    scenes/s01.js … s16.js← 장별 인터랙션 모듈 (enter / step / leave)
  /assets
    /video   s01_bg.mp4 …  (H.264, 1920×1080, 6~10초 루프, 무음, ≤ 8MB)
    /poster  s01_bg.jpg …  (영상 첫 프레임, 폴백용)
    /img     s10_var_*.webp …
    /fonts   PretendardVariable.woff2
```
- **빌드 도구 없이** `index.html` 더블클릭(file://)과 정적 호스팅(GitHub Pages) 양쪽에서 동작해야 합니다.
- 외부 네트워크 요청은 **0건**이어야 합니다. 폰트, 라이브러리, 영상을 모두 로컬에 동봉합니다.

### 4.2 슬라이드 엔진
| 기능 | 요건 |
|---|---|
| 캔버스 | 1920×1080 고정 좌표계를 `transform: scale()`로 화면에 맞춤. 남는 영역은 레터박스(#000) |
| 이동 | `→ / Space / PageDown / 클릭`: 다음 fragment, 끝나면 다음 장. `← / PageUp`: 이전. `Home / End` |
| 프레젠터 리모컨 | 로지텍 계열(PageUp/PageDown, B 키)과 호환 |
| 라우팅 | `#/01` ~ `#/16`, `#/01/2`(fragment 단위). 새로고침해도 위치 유지 |
| 단축키 | `S` 발표자 창, `O` 목차 그리드, `B` 블랙 화면, `F` 전체화면, `M` 음소거 토글(03장 원본 음향), `R` 현재 장 인터랙션 리셋 |
| 장 수명주기 | 각 장 모듈은 `enter()`, `step(n)`, `leave()`를 구현. 장을 벗어나면 영상 일시정지와 타이머·rAF 해제 |
| 프리로드 | 현재 장 ±1 장의 영상을 `preload="auto"`로 미리 불러오고, 나머지는 `none` |
| 전환 | 기본 0.6초 크로스페이드 + 미세 스케일. 섹션 전환(09 진입, 14 진입)은 전용 전환(§5.3) |
| 진행 표시 | 하단 2px 진행 바 + 우하단 `03 / 16` + 섹션명 |
| 접근성 | `prefers-reduced-motion`이면 영상은 포스터로 대체하고 모션은 페이드만 사용 |

### 4.3 발표자 모드 (`S`)
- 별도 창. 메인 창과 `BroadcastChannel('theotherday')`로 장과 fragment를 동기화합니다.
- 화면 구성: 현재 장(축소) | 다음 장 미리보기 | **발표 멘트 전문**(현재 fragment에 해당하는 문단 강조) | 진행 힌트(노란 박스) | 검토 메모(회색, 접힘)
- 타이머 3종: 전체 경과(목표 20:00), **장별 경과 / 목표 시간**(docx 기준 예: 01장 1:30), 남은 시간.
- 장별 목표 시간을 넘기면 타이머가 주황색, 15초를 더 넘기면 빨간색으로 바뀝니다.

### 4.4 성능과 브라우저
- 대상은 Chrome / Edge 최신 버전이며 발표 PC 기준입니다. Safari는 동작만 확인합니다.
- 모든 장에 배경 영상이 있으므로, 동시에 재생하는 영상은 **최대 2개**로 제한합니다(배경 1 + 카드 1). 장을 벗어나는 즉시 이전 배경 영상은 `pause()`하고 `src`를 해제합니다. 05장의 3분할 영상은 포커스된 1개만 재생합니다.
- WebGL과 캔버스 효과는 화면 밖에 있거나 장을 벗어나면 정지합니다.
- 영상은 H.264 High, CRF 23 수준으로 인코딩하고 1개당 8MB 이하로 맞춥니다. 전체 패키지는 250MB 이하로 둡니다.

---

## 5. 디자인 시스템

### 5.1 테마 토큰 (단일 Dark 테마, 구간별 accent만 교체)
| 토큰 | 기술 구간 (00~08, 14~16) | Kstory 구간 (09~13) |
|---|---|---|
| `--bg` | `#060B16` | `#060B16` (동일) |
| `--surface` | `#0E1626` | `#161119` (살짝 따뜻한 다크) |
| `--ink` | `#E8EEF7` | `#F3EDE3` |
| `--ink-sub` | `#8A97AD` | `#A89C8E` |
| `--accent` | `#2DD4BF` (Teal) | `#E8A33D` (Amber) |
| `--accent-2` | `#3B82F6` (Blue) | `#D9776A` (Coral) |
| `--line` | `rgba(255,255,255,.08)` | `rgba(255,240,220,.10)` |

`theme-paper.css`는 만들지 않습니다. `body[data-section="kstory"]`에서 accent 토큰만 덮어씁니다.

서비스별 시그니처 컬러는 장이 바뀌어도 일관되게 씁니다.
- **TheOther.Space 2.0**: `#3B82F6`
- **TheOther.Town**: `#2DD4BF`
- **Kstory.ai**: `#E8A33D`

### 5.2 타이포그래피 (Pretendard Variable)
| 역할 | 크기/굵기 (1920 기준) |
|---|---|
| 장 번호·키커 | 22px / 600 / letter-spacing .2em / 대문자 |
| 장 제목 | 64~72px / 800 / line-height 1.15 |
| 거버닝 메시지 | 36px / 600 / accent 컬러 |
| 본문 | 26~28px / 400 / line-height 1.55 |
| 거대 숫자 | 220~280px / 800 / tabular-nums |
| 캡션·출처·확인 문구 | 16px / 400 / `--ink-sub` |

원칙
- 한 화면에 본문은 최대 3줄입니다. 장표 원고의 상세 본문은 화면이 아니라 **발표자 멘트**로 전달합니다.
- 장마다 마지막 굵은 문장(멘트의 강조 문장)은 **화면 하단의 "클로징 라인"** 으로 마지막 fragment에서 등장합니다.

### 5.3 모션 어휘
| 이름 | 사용처 | 사양 |
|---|---|---|
| `rise` | 일반 텍스트 등장 | y 24px→0, opacity 0→1, 0.6s, `power3.out`, stagger 0.08s |
| `mask-reveal` | 제목 | 줄 단위 clip-path 아래→위, 0.8s |
| `count-up` | 수치 | 1.6s, `power2.out`, 소수점 1자리 유지 |
| `draw` | 선·흐름·차트 | stroke-dashoffset, 1.2s |
| `converge` | 기술 결합(03, 16) | 입자/노드가 중심으로 모여 하나로 합쳐짐, 1.4s |
| `warm-shift` | 08→09 전환 | 화면 색온도가 Teal→Amber로 바뀌며(광원 레이어 크로스페이드) 전환, 1.2s |
| `cool-shift` | 13→14 전환 | Amber→Teal로 식는 전환, 1.0s |
| `closing-line` | 각 장 마지막 문장 | 하단 중앙, 밑줄이 왼쪽→오른쪽으로 그려진 뒤 텍스트 페이드 |

### 5.4 배경 영상 강도 (PPT_ART 방식)
| 클래스 | 영상 opacity | 오버레이 | 용도 |
|---|---|---|---|
| `media-bg--strong` | 1.0 | 하단·좌측 그라디언트 60% | 표지, 03, 16 클로징 |
| `media-bg--mid` | 0.55 | 전체 40% | 섹션 도입 장 |
| `media-bg--faint` | 0.18 | 전체 70% | 텍스트·다이어그램 중심 장 |

---

## 6. 장별 기획 요약

> 레이아웃 와이어프레임, fragment 단계, 에셋 배치 좌표는 **화면설계서**에 상세히 정리했습니다. 이 표는 작업 범위와 인터랙션 유형을 고정하기 위한 요약입니다.

| 장 | 제목 | 목표 시간 | 핵심 시각 사건 | 인터랙션 유형 | 힉스필드 에셋 |
|---|---|---|---|---|---|
| 00 | 표지 / 대기 | – | 부팅 로더 → 빛이 모여 "TheOtherDay 2026" | 자동 루프 | V00 히어로 루프 |
| 01 | 89.4%의 선택, 이제 서비스로 | 1:30 | 원형 게이지가 89.4%까지 차오른 뒤 **링이 열리며 빛이 기업·학교·기관·개인으로 퍼짐** | count-up, 연도 드릴다운(옵션) | V01 데이터센터→도시 불빛 |
| 02 | 시작은 왜 여전히 어려울까요? | 1:35 | **4개의 차단봉(문턱)**이 클릭마다 하나씩 내려가며 서비스 칩으로 바뀜 | fragment 4단 + 비용 미터(정성) | V02 복도·게이트 루프 + I02 문턱 아이콘 4종 |
| 03 | 자동차를 띄운 것은… | 1:25 | **Roadster.mp4 풀블리드** → 이륙 장면에서 정지 → 두 기술선이 합쳐짐 → 틸론 5개 기술 노드가 3개 서비스로 수렴 | 영상 제어 + converge | 로컬 `Roadster.mp4` |
| 04 | 구축에서 사용으로 | 1:15 | **Before/After 드래그 슬라이더**: 구축 중심 ↔ 서비스 중심 5행 | 드래그 + 자동 시연 | V04 배경 루프 + I04 구축/서비스 대비 이미지 2장 |
| 05 | 세 가지 서비스, 하나의 선언 | 0:45 | **세 개의 빛기둥 카드**가 차례로 켜짐. "더 많이 팔 것인가"에 취소선 → "시작을 앞당길 것인가" | 아코디언 포커스 | V05a/b/c 서비스 루프 3종 |
| 06 | TheOther.Space 2.0 | 1:25 | 기존 방식 6개 작업 카드가 쌓인 책상 → **[접속] 클릭** 시 카드가 흡수되며 하나의 클라우드 데스크톱으로 | 버튼 트리거 시뮬레이션 | V06 오피스→클라우드 데스크톱 |
| 07 | TheOther.Town | 1:55 | **AI 라우팅 시연**: 질문 칩 클릭 → 패킷이 모델로 라우팅 → 조직 예산 바 감소 / TStation GPU가 슬라이스로 분할 | 클릭 시뮬레이터 2종 | V07 AI 워크스페이스 |
| 08 | 강의실에서 증명하다 | 1:10 | 3개 대학 카드가 강의실 영상 위에 펼쳐짐. **"확인된 활용"과 "확장 방향" 배지 구분** | 카드 플립 | V08 강의실 실습 |
| 09 | Kstory.ai — 진짜 이유 | 1:05 | **warm-shift 전환**으로 Teal→Amber 색온도 변화. 빛이 새어 나오는 닫힌 책을 클릭하면 펼쳐지며 "나의 이야기" | 3D 책 열기 | V09 그림책 열리는 장면 |
| 10 | '네 이야기야' | 1:10 | **라이브 개인화 데모**: 동물·장소·가족 칩 선택 → 삽화와 문장 즉시 교체 / 수준·낭독·언어 토글 | 칩 선택 + 음성 낭독 | V10 수채 배경 루프 + I10 삽화 변형 8종 |
| 11 | 내가 만든 책은, 다시 읽게 됩니다 | 1:05 | **4노드 순환 다이어그램**이 회전하며 단계 강조, 중앙 아이콘이 "받는 사람 → 만드는 사람"으로 변형 | 사이클 스텝 | V11 책상 루프 + I11 순환 4단계 삽화 |
| 12 | 도서관이, 우리 가족의 창작실 | 1:10 | 가족 창작 영상 위 **3개의 변화 카드가 뒤집힘**(혼자→함께 / 한 번→소장 / 체험→프로그램) | 카드 플립 | V12 도서관 가족 창작 |
| 13 | 개인의 작품이, 기관의 교육 자산 | 1:30 | **3개 탭**(도서관/학교/평생교육) 전환. 탭마다 효과 카드 4개와 "기대효과" 배지 | 탭 | V13 도서관 홀 루프 + I13a/b/c 기관별 장면 3종 |
| 14 | 쉬운 AI 뒤의 통제 | 0:50 | **fold-dark 전환** → 단순한 UI 레이어를 들어 올리면 아래에 통제 레이어 3열. Public/Internal 경계선에서 데이터 패킷이 분기 | 레이어 필(peel) | V14 보이지 않는 통제 레이어 |
| 15 | 출시가 끝이라면 | 0:45 | **4단 계단 로드맵**이 차례로 점등 + "듣고→검증→반영" 순환 화살표 | fragment 4단 | V15 계단 루프 |
| 16 | 다음 세상 + 클로징 | 1:25 | 세 서비스의 **현재 → 미래 모핑** → 세 빛이 하나로 모여 핵심 문장 완성 | morph + converge | V16a/b/c 미래 장면, V16 클로징 |

---

## 7. 힉스필드 에셋 제작 계획

### 7.1 전제와 제약
- **현재 상태: 힉스필드 MCP가 인증되지 않은 상태입니다.** Claude Code에서 `/mcp`로 higgsfield를 인증해야 생성을 진행할 수 있습니다.
- 크레딧이 소모되므로 **견적(`ads_studio_quote` 또는 모델별 비용) 확인 → 사용자 승인 → 생성** 순서를 지킵니다.
- 생성 순서는 다음과 같습니다.
  1. 스타일 키 이미지 2장(Dark, Paper)을 먼저 승인받습니다.
  2. 장별 키 이미지(첫 프레임)를 생성합니다.
  3. 승인된 이미지를 시작 프레임으로 루프 영상을 생성합니다.
- **모델 확정 (2026-10-24)**
  - 이미지: `nano_banana_2`, 16:9, 2k (2 크레딧/장). 영상의 시작 프레임이자 포스터로 씁니다.
  - 영상: `kling3_0`, mode `pro`, sound `off`, 16:9, `start_image` = 해당 키 이미지. 배경 8초(14 크레딧), 카드 6초(10.5 크레딧).
  - Seedance 2.5는 1080p 8초가 128 크레딧이라 제외했습니다. 변환 연출(06·16)에서 Kling 결과가 부족하면 그 장만 Seedance 720p(56)로 재생성합니다.
  - 예상 총액: 이미지 42 + 배경 영상 15×14 + 카드 영상 6×10.5 ≈ **315 크레딧** (잔여 606).
- 공통 규칙은 다음과 같습니다.
  - **화면 안에 글자, 로고, 실존 브랜드를 넣지 않습니다.** 텍스트는 HTML로 올립니다.
  - **실존 인물을 닮게 만들지 않습니다.**
  - 텍스트가 놓일 좌측 40%는 비워 둡니다(negative space).

### 7.2 스타일 키 (모든 프롬프트 앞에 붙임)
- **STYLE_DARK**: `cinematic, deep navy night (#060B16), soft teal (#2DD4BF) and electric blue (#3B82F6) rim light, volumetric haze, shallow depth of field, premium tech keynote mood, clean negative space on the left 40% for typography, no text, no logos, 16:9`
- **STYLE_WARM** (Kstory 구간, 기존 STYLE_PAPER 대체): `cinematic, deep navy night (#060B16) background, warm amber (#E8A33D) and coral (#D9776A) light sources — glowing open book, paper lantern, evening window — soft volumetric glow, picture-book illustrated elements (books, small animals, stylized figures) lit from within, cozy and hopeful, Korean everyday setting, clean negative space on the left 40%, no text, no logos, 16:9`
- 프롬프트 표의 `[PAPER]` 표기는 모두 **STYLE_WARM**으로 읽습니다.
- 스타일 키 결과: `style_dark.png` **승인**, `style_paper.png`는 폐기(참고용 보관).

### 7.3 에셋 목록
| ID | 장 | 종류 | 배치 | 프롬프트 (STYLE_* 뒤에 이어 붙임) |
|---|---|---|---|---|
| V00 | 00 | 영상 8s 루프 | 풀블리드 strong | `[DARK] countless tiny points of light drifting in dark space slowly converging into a calm glowing horizon line, seamless loop` |
| V01 | 01 | 영상 8s 루프 | 풀블리드 faint | `[DARK] a single glowing server rack in a dark hall, its light spreads outward as thin luminous lines across a night city map, lines reaching offices, schools and homes, slow dolly-out` |
| I02 | 02 | 이미지 ×4 | 차단봉 아이콘 | `[DARK] minimal 3D isometric icon, glass material, teal glow: (a) office desk with unassembled PC parts (b) GPU chip with tangled cables (c) stack of tokens / coins with a meter (d) a closed door with a soft light behind it, transparent-looking dark background` |
| — | 03 | **로컬 영상** | 풀블리드 strong | `Roadster.mp4` (1920×1080, 45.7초, 음성 포함). §7.4 참조 |
| I04 | 04 | 이미지 ×2 | 슬라이더 좌/우 | (L) `[DARK] heavy server room under construction, boxes, cables, workers' silhouettes, cool grey, static` (R) `[DARK] the same space transformed: clean bright workspace, people using laptops and tablets connected by soft teal light threads, open and calm` |
| V05a | 05 | 영상 6s 루프 | 카드 1 | `[DARK] floating translucent desktop windows forming a secure glowing workspace, blue (#3B82F6) light, slow orbit` |
| V05b | 05 | 영상 6s 루프 | 카드 2 | `[DARK] abstract AI network of nodes and GPU blocks pulsing with teal light, data flowing between them, slow push-in` |
| V05c | 05 | 영상 6s 루프 | 카드 3 | `[DARK→warm] an open book emitting warm amber light, paper illustrations rising like fireflies, gentle` |
| V06 | 06 | 영상 8s | 배경 mid | `[DARK] a cluttered office desk with boxed PCs and installation discs slowly dissolves into particles that reform into a single clean floating cloud desktop screen, smooth transition` |
| V07 | 07 | 영상 8s 루프 | 배경 faint | `[DARK] AI native workspace: multiple holographic model cores connected to a central router, token light particles flowing through gated channels, organized and controlled` |
| V08 | 08 | 영상 8s 루프 | 배경 mid | `[DARK] university computer lab at dusk, diverse students in front of monitors running notebooks and code, screens glow teal, over-the-shoulder, no readable screen text, faces not in focus` |
| V09 | 09 | 영상 6s | 중앙 책 뒤 | `[PAPER] a child's hands opening a picture book, warm light and tiny illustrated animals rising from the pages` |
| I10 | 10 | 이미지 ×8 | 데모 삽화 | `[PAPER] same composition, a child protagonist on an adventure; variants: {cat, dinosaur} × {seaside, forest} × {with grandmother, with dad}` (8컷, 동일 캐릭터 시트 고정) |
| I11 | 11 | 이미지 ×4 | 사이클 노드 | `[PAPER] small vignette: (1) child choosing characters on cards (2) child picking an illustration (3) child reading a finished book (4) child editing a page with a pencil` |
| V12 | 12 | 영상 8s 루프 | 배경 mid | `[PAPER] a Korean public library corner, grandparent, parent and child making a picture book together on a tablet and paper, warm afternoon light` |
| I13 | 13 | 이미지 ×3 | 탭 비주얼 | (a) `[PAPER] library reading program, kids and multicultural families` (b) `[PAPER] classroom project, students presenting their storybooks` (c) `[PAPER] senior learners writing life stories with a younger helper` |
| V14 | 14 | 영상 6s 루프 | 배경 faint | `[DARK] a simple clean glass interface floating on top; beneath it, layered translucent control planes with locks, gates and audit trails glowing softly, camera tilts down from top layer to bottom` |
| V15 | 15 | 영상 8s 루프 | 배경 faint | `[DARK] four ascending luminous steps into a horizon, minimal architecture, teal light slowly climbing step by step, seamless loop` |
| V02 | 02 | 영상 8s 루프 | 배경 faint | `[DARK] a long dim corridor with four closed glass gates in a row, soft light leaking from behind each gate, slow forward dolly` |
| V04 | 04 | 영상 8s 루프 | 배경 faint | `[DARK] abstract transition: heavy concrete blocks slowly dissolving into light flowing threads, left to right, calm` |
| V10 | 10 | 영상 8s 루프 | 배경 faint | `[PAPER] dark background with tiny glowing illustrated animals, stars and leaves drifting slowly like fireflies, very subtle` |
| V11 | 11 | 영상 8s 루프 | 배경 faint | `[PAPER] a child's desk from above: pencils, paper pages and small book turning slowly, warm light shifting, gentle` |
| V13 | 13 | 영상 8s 루프 | 배경 faint | `[PAPER] a wide library hall with soft bokeh of people reading and writing, warm afternoon light moving slowly` |
| V16a | 16 | 영상 6s | 미래 카드 1 | `[DARK] secure virtual offices where small abstract AI agent lights work 24/7 inside isolated glass rooms, a human approves with a gesture` |
| V16b | 16 | 영상 6s | 미래 카드 2 | `[DARK] continuous pipeline of light: idea → code → test → deploy → monitor, as connected glowing modules` |
| V16c | 16 | 영상 6s | 미래 카드 3 | `[warm] a book opening into many forms: photo album, memoir, poem, music notes, floating around a person` |
| V16 | 16 | 영상 10s | 클로징 풀블리드 | `[DARK] three beams of light — blue, teal, amber — rise from different places and merge into one bright line across the horizon, sunrise feeling, hold last frame` |

**합계: 영상 21개, 이미지 21장**(스타일 키 2장 별도). 사용자 요청에 따라 **모든 장에 배경 영상**을 둡니다. 인터랙션이 많은 장(02·04·07·10·11·13·14·15)은 `faint` 등급으로 눌러 조작 요소의 가독성을 지킵니다. 실제 견적은 인증 후 모델별 단가로 산정합니다.

### 7.4 03장 Roadster.mp4 적용 사양
- 원본은 1920×1080, 23.976fps, 45.7초, AAC 음향이 있습니다. 야간 장면에서 차량이 수직 램프를 오른 뒤 공중에 뜨고, 연기 속에 착지합니다.
- 배경으로는 `muted`, `playsinline` 속성을 주고, 진입 즉시 재생합니다.
  - fragment 1: **차량이 떠오르는 구간에서 정지(freeze)** 하고 0.8초 동안 블러를 걸어 텍스트 레이어를 띄웁니다.
  - fragment 2 이후: 정지 프레임 위에 다이어그램을 올립니다.
- 무음 루프 구간용 편집본 `s03_roadster_loop.mp4`(약 0~30초)와 정지 프레임 `s03_freeze.jpg`를 ffmpeg로 따로 만듭니다. 원본은 `M` 키로 음향을 켤 때만 씁니다.
- 좌측에 그라디언트(`#060B16` 85% → 0%)를 깔아 텍스트 가독성을 확보합니다.
- **출처와 사용 권리 확인이 필요합니다**(§8-2). 확인 전에는 하단에 "연출 참고 영상" 캡션을 표기합니다.

---

## 8. 사실 검증 게이트 (빌드 전 반드시 확정)

| # | 항목 | 현재 상태 | 처리 방침 |
|---|---|---|---|
| 8-1 | **01장 점유율 수치** | 장표는 89.4%, 110.5억 원, 103건(2021.8~2026.8). 참고 대시보드(jiwon13)의 2021~2026 전체 VDI 탭은 **83.13%, 틸론 118.4억 원, 합계 142.4억 원**으로 집계 범위가 다릅니다 | 집계 기준(기간, 직접 판매 여부, VDI·보안가상화 포함 범위)을 하나로 확정하고 화면 하단에 기준 문구를 고정합니다. **확정 전에는 01장 빌드를 보류**하고 플레이스홀더로 둡니다 |
| 8-2 | 03장 로드스터 시연 | 원고는 "공중 부양 시연"으로 서술. 원문 확인 전입니다 | 화면 문구는 멘트와 같이 **"결합을 상상해 보면"이라는 가정형**으로 씁니다. 장 제목을 단정형으로 둘지 결정이 필요합니다. 영상 출처와 사용 권리도 확인합니다 |
| 8-3 | 02·07장 비용 표현 | "비용 걱정 없이"는 무료·무제한이 아닙니다 | 화면에는 "비용을 **관리하며**"를 쓰고, 비용 미터와 예산 바에는 **숫자를 넣지 않습니다**(개념 시연) |
| 8-4 | 07장 기능 범위 | 연동 모델과 기능의 출시 범위는 미확인입니다 | 라우팅 데모 하단에 "개념 시연 · 제공 범위는 계약 기준" 캡션을 넣습니다. 모델명은 텍스트로만 쓰고 로고는 쓰지 않습니다 |
| 8-5 | 08장 대학 활용 | 확인된 사실은 서강대(중국인 유학생 AI 실습), 백석대, 상명대의 활용입니다 | 카드마다 **"활용 중"(확인)** 과 **"확장 방향"(제안)** 배지를 구분합니다. "무중단" 같은 실적 표현은 쓰지 않습니다 |
| 8-6 | 09~13장 효과 | 측정 성과가 아니라 기대효과입니다 | 13장 각 탭에 "기대효과" 배지를 붙이고, 수치형 그래프를 쓰지 않습니다 |
| 8-7 | 10장 다국어 문장 | 데모용 번역문이 필요합니다 | 원어민 검수를 받습니다. 검수 전에는 한국어와 영어 2종만 노출합니다 |
| 8-8 | 14장 데이터 통제 | "단말 데이터 미저장"과 외부 전송 통제는 구성에 따라 다릅니다 | "정책에 따라" 수식어를 붙이고, 모든 전송을 차단하는 것처럼 보이는 연출은 하지 않습니다 |
| 8-9 | 16장 | 중장기 방향입니다 | 장 진입 시 "중장기 발전 방향" 키커를 먼저 노출합니다 |

---

## 9. 작업 단계와 산출물

| 단계 | 작업 | 산출물 | 완료 조건 |
|---|---|---|---|
| P0 | 사실 검증 게이트 처리 | §8 결정 기록 | 8-1, 8-2 확정 |
| P1 | 엔진 + 디자인 시스템 + 발표자 모드 | `index.html`, `engine.js`, `presenter.js`, 테마 CSS | 빈 16장 이동, 동기화, 타이머 동작 |
| P2 | 콘텐츠 주입 | `content.js` (장표 + 멘트 + 진행 힌트 + 목표 시간) | 16장 텍스트와 멘트가 docx와 일치 |
| P3 | 에셋 1차: 스타일 키 2장 | 승인된 스타일 이미지 | 사용자 승인 |
| P4 | 에셋 2차: 장별 키 이미지 → 영상 | `/assets` 전체 + 포스터 | 장별 승인, 용량 기준 충족 |
| P5 | 장별 인터랙션 구현 | `scenes/s00~s16.js` | 화면설계서 fragment 순서와 일치 |
| P6 | QA와 리허설 | 체크리스트 결과 | §10 전 항목 통과, 20분 이내 |

---

## 10. QA 체크리스트
- [ ] 1920×1080, 1366×768, 2560×1440, 3840×2160에서 레이아웃이 깨지지 않는다
- [ ] 프레젠터 리모컨만으로 00→16장을 끝까지 진행할 수 있다
- [ ] 네트워크를 끊어도 모든 영상, 폰트, 인터랙션이 동작한다
- [ ] 장을 빠르게 왕복(→←→←)해도 애니메이션이 겹치거나 멈추지 않는다 (`leave()` 정리 확인)
- [ ] `R` 키로 10장 개인화 데모와 07장 라우팅 데모를 초기화할 수 있다
- [ ] 발표자 창의 멘트 강조 문단이 fragment와 일치한다
- [ ] 장별 목표 시간 합계가 20:00이다 (docx 기준)
- [ ] `prefers-reduced-motion`에서 영상이 포스터로 대체된다
- [ ] 인쇄 미리보기에서 장당 1페이지로, 모든 fragment를 펼친 상태로 출력된다
- [ ] §8의 캡션과 배지가 모두 화면에 반영됐다
- [ ] 영상 1개 8MB 이하, 전체 250MB 이하
