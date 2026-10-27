/* scenes 00–05 */
window.SCENES = window.SCENES || [];
(function (S) {
  const V = (n) => 'assets/video/' + n + '.mp4';
  const P = (n) => 'assets/poster/' + n + '.jpg';
  const IMG = (n) => 'assets/img/' + n + '.webp';
  const head = (n, sec, title, gov, extra) =>
    '<div class="col-left">' +
    '<div class="kicker"><b>' + String(n).padStart(2, '0') + '</b> / 16 &nbsp;·&nbsp; ' + sec + (extra || '') + '</div>' +
    '<h2 class="title">' + title.split('\n').map(l => '<span class="ln"><span>' + l + '</span></span>').join('') + '</h2>' +
    (gov ? '<p class="gov fr" data-f="0">' + gov + '</p>' : '') +
    '</div>';
  window.H = { V, P, IMG, head };

  /* ---------- 00 COVER ---------- */
  S.push({
    n: 0, id: 'cover', title: 'TheOtherDay 2026 — 표지', section: 'tech', steps: 0,
    bg: { video: V('V00_s00'), poster: P('V00_s00'), strength: 'strong' },
    build(c) {
      c.innerHTML =
        '<div class="boot"><i></i></div>' +
        '<div class="cover">' +
        '<div class="kicker">TILON &nbsp;|&nbsp; CLOUD &amp; AI SERVICES</div>' +
        '<h1>TheOtherDay<span>2026</span></h1>' +
        '<p class="gov">증명한 기술을,<br>모두가 누리는 서비스로.</p>' +
        '<div class="svcs"><span class="svc-space">TheOther.Space 2.0</span><span class="svc-town">TheOther.Town &nbsp;|&nbsp; iStation + TStation</span><span class="svc-kstory">Kstory.ai</span></div>' +
        '</div><div class="hint">→ 또는 SPACE 로 시작</div>';
      const boot = c.querySelector('.boot'), svcs = c.querySelectorAll('.svcs span');
      let timer = null, k = 0, booted = false;
      return {
        enter() {
          if (!booted) {
            booted = true;
            // CSS-class reveal (not gsap.from): avoids a Chrome repaint glitch under the scaled stage
            const items = c.querySelectorAll('.cover > *');
            setTimeout(() => { boot.style.opacity = 0; setTimeout(() => boot.remove(), 650); }, 800);
            items.forEach((el, i) => setTimeout(() => { el.classList.add('in'); void el.offsetWidth; }, 1100 + i * 120));
          }
          timer = setInterval(() => { svcs.forEach((s, i) => s.classList.toggle('lit', i === k % 3)); k++; }, 2600);
        },
        leave() { clearInterval(timer); }
      };
    }
  });

  /* ---------- 01 GAUGE ---------- */
  S.push({
    n: 1, id: 'market', title: '89.4%의 선택, 이제 서비스로', section: 'tech', steps: 4,
    bg: { video: V('V01_s01'), poster: P('V01_s01'), strength: 'faint' },
    build(c) {
      const R = 300, C = 2 * Math.PI * R;
      c.innerHTML = head(1, '시장 증명', '89.4%의 선택,\n이제 서비스로', '시장이 선택한 기술은, 더 많은 사람이 사용할 수 있어야 합니다.') +
        '<div class="col-left" style="top:430px">' +
        '<div class="stats fr" data-f="2"><div><b>110.5억 원</b><span>누적 판매액</span></div><div><b>103건</b><span>판매 건수</span></div></div>' +
        '<p class="basis fr" data-f="2">2021.8 ~ 2026.8 · 직접 VDI·보안가상화 제품 조달 판매액 기준 <span class="badge badge--memo">집계 기준 확인 중</span></p>' +
        '<div class="chips">' + [
          ['기업', '<rect x="4" y="10" width="24" height="18" rx="2"/><rect x="10" y="4" width="12" height="6" rx="1"/><path d="M10 16h4M18 16h4M10 22h4M18 22h4"/>'],
          ['학교', '<path d="M4 14l12-8 12 8"/><rect x="7" y="14" width="18" height="14" rx="1"/><path d="M13 28v-7h6v7"/>'],
          ['기관', '<path d="M4 12l12-6 12 6"/><path d="M6 12h20M8 28h16"/><path d="M9 16v10M14 16v10M19 16v10M24 16v10"/>'],
          ['개인', '<circle cx="16" cy="11" r="5"/><path d="M6 28c0-6 4.5-10 10-10s10 4 10 10"/>'],
        ].map((t, i) => '<div class="chip fr" data-f="3" style="transition-delay:' + (i * .1) + 's"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + t[1] + '</svg>' + t[0] + '</div>').join('') + '</div>' +
        '</div>' +
        '<div class="gauge visual"><svg viewBox="0 0 720 720"><circle class="track" cx="360" cy="360" r="' + R + '"/>' +
        '<circle class="arc" id="g1arc" cx="360" cy="360" r="' + R + '" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg>' +
        '<div class="num"><b><span id="g1num">0.0</span><small>%</small></b><span>최근 5개년 공공 VDI 조달판매 누적 점유율</span></div></div>' +
        '<p class="closing" data-f="4">구축으로 증명한 기술을, 서비스로 개방합니다.</p>' +
        '<p class="caption">※ 89.4% · 110.5억 원 · 103건은 최종 개정안의 집계값이며, 원천자료·비교 범위 확정 전까지 확인 항목으로 표시합니다. (PRD §8-1)</p>';
      const arc = c.querySelector('#g1arc'), num = c.querySelector('#g1num'), chips = c.querySelectorAll('.chip'), gauge = c.querySelector('.gauge');
      const obj = { v: 0 };
      let tw;
      function setArc(p) { arc.style.strokeDashoffset = C * (1 - p / 100); }
      return {
        step(f, imm) {
          if (tw) tw.kill();
          if (f >= 1) {
            if (imm) { obj.v = 89.4; setArc(89.4); num.textContent = '89.4'; }
            else tw = gsap.to(obj, { v: 89.4, duration: 1.6, ease: 'power2.out', onUpdate() { setArc(obj.v); num.textContent = obj.v.toFixed(1); } });
          } else { obj.v = 0; setArc(0); num.textContent = '0.0'; }
          gauge.classList.toggle('idle', f < 1);
          // ring opens & light flows to chips
          gsap.to(gauge, { scale: f >= 3 ? .78 : 1, x: f >= 3 ? 120 : 0, opacity: f >= 4 ? .35 : 1, duration: imm ? 0 : .9, ease: 'power2.inOut' });
          chips.forEach((ch, i) => setTimeout(() => ch.classList.toggle('lit', f >= 3), imm ? 0 : 400 + i * 150));
        }
      };
    }
  });

  /* ---------- 02 GATES ---------- */
  S.push({
    n: 2, id: 'threshold', title: '기술은 넘치는데, 시작은 왜 여전히 어려울까요?', section: 'tech', steps: 5,
    bg: { video: V('V02_s02'), poster: P('V02_s02'), strength: 'faint' },
    build(c) {
      const gates = [
        { img: 'I02a_desk', h: '일을 시작하기 전에,<br>업무환경부터', svc: 'TheOther.Space 2.0', cls: 'svc-space' },
        { img: 'I02b_gpu', h: 'AI를 배우기 전에,<br>실습환경부터', svc: 'TStation', cls: 'svc-town' },
        { img: 'I02c_token', h: 'AI를 활용하기 전에,<br>비용부터', svc: 'iStation', cls: 'svc-town', meter: true },
        { img: 'I02d_door', h: 'AI를 처음 만나는 사람에게는,<br>계기부터', svc: 'Kstory.ai', cls: 'svc-kstory' },
      ];
      c.innerHTML = head(2, '시작의 문턱', '기술은 넘치는데,\n시작은 왜 여전히 어려울까요?', '기술은 앞서갔습니다. 시작의 문턱은 남았습니다.') +
        '<div class="cols">' + gates.map((g, i) => '<div class="gate ' + g.cls + '" data-i="' + i + '"><div class="bar"></div><img src="' + IMG(g.img) + '" alt=""><h3>' + g.h + '</h3>' +
          (g.meter ? '<div class="meter">' + '<i></i>'.repeat(10) + '</div><div class="models">ChatGPT · Claude · Gemini · … 계정·요금·사용량 각각</div>' : '') +
          '<div class="svc">' + g.svc + '</div></div>').join('') + '</div>' +
        '<p class="closing" data-f="5">일할 환경, AI를 배울 환경, 비용을 관리하며 활용할 환경, 그리고 첫 경험.<br>이 네 가지 문턱을, 틸론은 서비스로 낮춥니다.</p>' +
        '<p class="caption">※ ‘비용을 관리하며’는 비용 통합관리의 방향을 뜻하며, 무료·무제한 사용을 의미하지 않습니다. (PRD §8-3)</p>';
      const G = c.querySelectorAll('.gate'), meter = c.querySelectorAll('.meter i');
      let mt;
      return {
        step(f, imm) {
          G.forEach((g, i) => { g.classList.toggle('lit', f >= i + 1); g.classList.toggle('open', f >= 5); });
          clearInterval(mt);
          if (f >= 3 && f < 5) { let k = 0; mt = setInterval(() => { k = (k + 1) % 11; meter.forEach((m, i) => m.classList.toggle('on', i < k)); }, 220); }
          else meter.forEach((m, i) => m.classList.toggle('on', f >= 5 ? i < 4 : false));
        },
        leave() { clearInterval(mt); }
      };
    }
  });

  /* ---------- 03 ROADSTER ---------- */
  S.push({
    n: 3, id: 'fusion', title: '자동차를 띄운 것은, 자동차 기술만이 아니었습니다', section: 'tech', steps: 5,
    bg: { video: V('s03_roadster_loop'), poster: P('s03_bg'), strength: 'strong' },
    build(c, el) {
      c.innerHTML =
        '<div class="col-left fr" data-f="1">' +
        '<div class="kicker"><b>03</b> / 16 &nbsp;·&nbsp; 기술의 연결</div>' +
        '<h2 class="title">자동차를 띄운 것은,<br>자동차 기술만이 아니었습니다</h2>' +
        '<p class="gov">혁신은 한 기술의 진화가 아니라, 축적된 기술이 연결되는 순간 탄생합니다.</p></div>' +
        '<div class="col-left" style="top:430px">' +
        '<div class="pair fr" data-f="2"><div class="stack"><span class="tech ev">전기차 기술</span><span class="tech rk">로켓 추진 기술</span></div>' +
        '<svg viewBox="0 0 120 120"><path class="p1" d="M0 30 C60 30 60 60 120 60" stroke="#3B82F6"/><path class="p2" d="M0 90 C60 90 60 60 120 60" stroke="#2DD4BF"/></svg>' +
        '<div class="result">결합한다면 — 새로운 장면</div></div>' +
        '<div class="nodes">' + [['VDI·DaaS', '안전하고 동일한 컴퓨팅 공간'], ['GPU 분할', 'Partitioning · Slicing'], ['보안관제', '접근통제 · 세션·기록'], ['iStation', '멀티 LLM · 토큰 · RAG'], ['TStation', 'Jupyter · VS Code · Docker']]
          .map((n, i) => '<div class="node fr" data-f="3" style="transition-delay:' + i * .1 + 's">' + n[0] + '<small>' + n[1] + '</small></div>').join('') + '</div>' +
        '<div class="conv fr" data-f="4"><svg viewBox="0 0 860 60" preserveAspectRatio="none">' + [70, 240, 410, 580, 750].map(x => '<path d="M' + x + ' 0 C' + x + ' 40 430 20 430 60"/>').join('') + '</svg></div>' +
        '<div class="result3 fr" data-f="4"><span class="svc-space">TheOther.Space 2.0</span><span class="svc-town">TheOther.Town</span><span class="svc-kstory">Kstory.ai</span></div>' +
        '</div>' +
        '<p class="closing" data-f="5">AI가 유행해서 시작한 사업이 아닙니다.<br>오래 준비한 기술을, 이제 고객이 사용하는 서비스로 연결합니다.</p>' +
        '<p class="src">연출 참고 영상 · 출처 및 시연 사실 확인 중 (PRD §8-2)<br>화면 문구는 ‘결합한다면’이라는 가정형으로 통일했습니다.</p>';
      const video = el.querySelector('.media-bg video');
      const FREEZE = 11.0;
      let sound = false, raf;
      function watch() {
        if (video && !video.paused && video.currentTime >= FREEZE && DECK.state.f >= 1) { video.pause(); el.classList.add('frozen'); }
        raf = requestAnimationFrame(watch);
      }
      return {
        enter() { el.classList.remove('frozen'); if (video) { video.currentTime = 0; } cancelAnimationFrame(raf); watch(); },
        leave() { cancelAnimationFrame(raf); if (video && sound) { sound = false; video.muted = true; } },
        reset() { if (video) { video.currentTime = 0; video.play().catch(() => {}); } el.classList.remove('frozen'); },
        toggleSound() { if (!video) return; sound = !sound; video.muted = !sound; if (sound && video.paused) { video.currentTime = 0; el.classList.remove('frozen'); video.play().catch(() => {}); } },
        step(f, imm) {
          if (!video) return;
          if (f >= 1) {
            if (video.currentTime < FREEZE && !imm) { /* let it run to FREEZE */ }
            else { video.currentTime = Math.max(video.currentTime, FREEZE); video.pause(); el.classList.add('frozen'); }
          } else { el.classList.remove('frozen'); if (video.paused) video.play().catch(() => {}); }
          const ps = c.querySelectorAll('.pair svg path'), conv = c.querySelectorAll('.conv path');
          gsap.to(ps, { strokeDashoffset: f >= 2 ? 0 : 200, duration: imm ? 0 : 1.1, ease: 'power2.inOut', stagger: .15 });
          gsap.to(conv, { strokeDashoffset: f >= 4 ? 0 : 400, duration: imm ? 0 : 1.2, ease: 'power2.inOut', stagger: .08 });
          c.querySelector('.result3').classList.toggle('on', f >= 4);
        }
      };
    }
  });

  /* ---------- 04 BEFORE / AFTER ---------- */
  S.push({
    n: 4, id: 'shift', title: '구축을 끝내는 회사에서, 사용을 계속 책임지는 회사로', section: 'tech', steps: 3,
    bg: { video: V('V04_s04'), poster: P('V04_s04'), strength: 'faint' },
    build(c) {
      const before = ['고객이 시스템을 직접 구축', '초기 대규모 투자', '개별 제품 도입', '장비·라이선스 중심', '구축 완료 후 운영 이관'];
      const after = ['필요한 환경을 즉시 이용', '이용 목적과 규모에 따른 선택', '연결된 서비스 경험', '사용자 경험과 성과 중심', '이용 과정에서 지속적인 개선'];
      c.innerHTML = head(4, '서비스 전환', '구축을 끝내는 회사에서,\n사용을 계속 책임지는 회사로', '납품은 한 번이지만, 서비스는 매일 증명됩니다.') +
        '<div class="cmp no-advance" style="--x:95%">' +
        '<div class="pane before"><img src="' + IMG('I04L_build') + '" alt=""><div class="list"><h4>기존 구축 중심</h4>' + before.map(t => '<p>' + t + '</p>').join('') + '</div></div>' +
        '<div class="pane after"><img src="' + IMG('I04R_service') + '" alt=""><div class="list"><h4>서비스 중심</h4>' + after.map(t => '<p>' + t + '</p>').join('') + '</div></div>' +
        '<div class="handle"></div></div>' +
        '<div class="svcs">' +
        '<span class="svc-space fr" data-f="2"><b>TheOther.Space 2.0</b>업무환경을 설치하는 대신, 클라우드 데스크톱을 이용</span>' +
        '<span class="svc-town fr" data-f="2" style="transition-delay:.1s"><b>TheOther.Town</b>GPU·개발환경을 구축하는 대신, AI 실습·개발환경을 이용</span>' +
        '<span class="svc-town fr" data-f="2" style="transition-delay:.2s"><b>iStation</b>AI를 개별 구매하는 대신, 모델·토큰·비용·내부 데이터를 통합 관리</span>' +
        '<span class="svc-kstory fr" data-f="2" style="transition-delay:.3s"><b>Kstory.ai</b>AI를 배운 뒤 창작하는 대신, 만드는 과정에서 AI를 경험</span></div>' +
        '<p class="closing" data-f="3" style="bottom:36px;font-size:30px">구축형 사업을 포기하는 것이 아닙니다. 구축사업에서 검증한 기술을, 더 많은 고객이 이용할 수 있는 방식으로 확장하는 것입니다.</p>';
      const cmp = c.querySelector('.cmp'); const pos = { x: 95 }; let tw, dragging = false;
      function apply() { cmp.style.setProperty('--x', pos.x + '%'); }
      function animTo(v, imm) { if (tw) tw.kill(); if (imm) { pos.x = v; apply(); } else tw = gsap.to(pos, { x: v, duration: 1.2, ease: 'power2.inOut', onUpdate: apply }); }
      function fromEvent(e) { const r = cmp.getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * 100; pos.x = Math.max(8, Math.min(96, x)); apply(); }
      cmp.addEventListener('pointerdown', e => { dragging = true; if (tw) tw.kill(); cmp.setPointerCapture(e.pointerId); fromEvent(e); });
      cmp.addEventListener('pointermove', e => { if (dragging) fromEvent(e); });
      cmp.addEventListener('pointerup', () => dragging = false);
      cmp.addEventListener('click', e => e.stopPropagation());
      return { step(f, imm) { animTo(f === 0 ? 95 : f === 1 ? 50 : 62, imm); }, reset() { animTo(95, true); } };
    }
  });

  /* ---------- 05 THREE SERVICES ---------- */
  S.push({
    n: 5, id: 'three', title: '세 가지 서비스, 하나의 선언', section: 'tech', steps: 4,
    bg: null,
    build(c) {
      const cards = [
        { cls: 'svc-space', v: 'V05a_s05', h: 'TheOther.Space 2.0', s: '클라우드 데스크톱', p: '<b>업무환경</b>의 진입장벽을 낮춥니다.<br>장비와 장소에 구애받지 않고 안전하게.' },
        { cls: 'svc-town', v: 'V05b_s05', h: 'TheOther.Town', s: 'iStation + TStation', p: '<b>AI 활용</b>의 진입장벽을 낮춥니다.<br>GPU·개발도구·멀티 LLM·토큰 비용·내부문서를 하나로.' },
        { cls: 'svc-kstory', v: 'V05c_s05', h: 'Kstory.ai', s: 'AI 창작', p: '<b>AI 창작</b>의 진입장벽을 낮춥니다.<br>코딩도, 복잡한 프롬프트도 없이 내 이야기를 콘텐츠로.' },
      ];
      c.innerHTML = head(5, '포트폴리오', '세 가지 서비스, 하나의 선언', '기술의 진입장벽은 낮추고, 사용자의 가능성은 높입니다.') +
        '<div class="cards">' + cards.map((k, i) => '<div class="card ' + k.cls + '" data-i="' + i + '"><video class="card-video" muted loop playsinline preload="none" poster="' + P(k.v) + '" data-src="' + V(k.v) + '"></video><div class="pillar"></div><div class="txt"><h3>' + k.h + '<small>' + k.s + '</small></h3><p>' + k.p + '</p></div></div>').join('') + '</div>' +
        '<div class="q fr" data-f="4"><span class="strike">기술을 어떻게 더 많이 팔 것인가</span> &nbsp;→&nbsp; <span class="ans">더 많은 사람의 시작을 어떻게 앞당길 것인가</span></div>';
      const C = c.querySelectorAll('.card'), q = c.querySelector('.q');
      let focus = -1;
      function setFocus(i) {
        focus = i;
        C.forEach((cd, j) => {
          cd.classList.toggle('lit', j === i); cd.classList.toggle('dim', i === -2 || (i >= 0 && j !== i && j < i));
          const v = cd.querySelector('video');
          if (j === i) { if (!v.src) { v.src = v.dataset.src; } v.play().catch(() => {}); } else v.pause();
        });
      }
      C.forEach((cd, i) => cd.addEventListener('mouseenter', () => { if (DECK.state.f >= 4) setFocus(i); }));
      return {
        step(f) {
          if (f === 0) setFocus(-1); else if (f <= 3) setFocus(f - 1);
          else { C.forEach(cd => { cd.classList.remove('lit'); cd.classList.add('dim'); cd.querySelector('video').pause(); }); }
          setTimeout(() => q.classList.toggle('struck', f >= 4), f >= 4 ? 700 : 0);
        },
        leave() { C.forEach(cd => cd.querySelector('video').pause()); }
      };
    }
  });
})(window.SCENES);
