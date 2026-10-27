/* scenes 06–10 */
(function (S) {
  const { V, P, IMG, head } = window.H;

  /* ---------- 06 SPACE 2.0 ---------- */
  S.push({
    n: 6, id: 'space', title: 'TheOther.Space 2.0 — PC를 준비하는 시간을, 업무로 돌려드립니다', section: 'tech', steps: 3,
    bg: { video: V('V06_s06'), poster: P('V06_s06'), strength: 'mid' },
    build(c, el) {
      const tasks = [['업무용 PC 구매', '장비 선정·발주·배송'], ['프로그램 개별 설치', '사용자마다 반복'], ['사용자별 환경 설정', '계정·권한·네트워크'], ['보안정책 적용', '단말마다 점검'], ['장애 대응·장비 교체', '현장 방문'], ['종료 후 장비 재관리', '회수·초기화·재배치']];
      const pos = [[0, 0, -5], [275, 36, 3], [550, -6, -3], [30, 215, 4], [305, 250, -4], [570, 212, 3]];
      c.innerHTML = head(6, 'TheOther.Space 2.0', 'PC를 준비하는 시간을,\n업무로 돌려드립니다', '접속하는 순간, 그곳이 안전한 사무실이 됩니다.') +
        '<div class="desk"><div class="lab">기존 방식 · 예시 상황</div>' + tasks.map((t, i) => '<div class="task" data-i="' + i + '" style="left:' + pos[i][0] + 'px;top:' + pos[i][1] + 'px;transform:rotate(' + pos[i][2] + 'deg);opacity:0">' + t[0] + '<small>' + t[1] + '</small></div>').join('') + '</div>' +
        '<button class="connect no-advance" data-noadvance>접속</button>' +
        '<div class="monitor"><div class="cloud">CLOUD DESKTOP</div><div class="screen"></div><ul>' +
        ['사용자별 업무환경 신속 제공', '중앙에서 동일한 환경 배포', '다양한 단말에서 안전하게 접속 · 데이터 중앙 저장', '프로젝트·인력 변화에 따른 자원 조정', '보안정책과 접속환경의 중앙관리'].map(t => '<li style="opacity:0">' + t + '</li>').join('') + '</ul></div>' +
        '<p class="closing" data-f="3">PC를 준비하는 시간을 업무로 돌려드리는 것.<br>그것이 클라우드 데스크톱을 서비스로 제공하는 이유입니다.</p>';
      const T = c.querySelectorAll('.task'), btn = c.querySelector('.connect'), mon = c.querySelector('.monitor'), li = c.querySelectorAll('.monitor li');
      const video = el.querySelector('.media-bg video');
      let absorbed = false;
      function scatter(imm) {
        absorbed = false; mon.classList.remove('on'); btn.classList.remove('pulse'); btn.style.opacity = 1;
        gsap.killTweensOf([T, li]);
        T.forEach((t, i) => gsap.set(t, { x: 0, y: 0, scale: 1, rotation: pos[i][2], opacity: 0 }));
        gsap.set(li, { opacity: 0, y: 8 });
        if (video) video.currentTime = 0;
      }
      function showCards(imm) { gsap.to(T, { opacity: 1, duration: imm ? 0 : .5, stagger: imm ? 0 : .08, ease: 'power2.out' }); btn.classList.add('pulse'); }
      function absorb(imm) {
        if (absorbed) return; absorbed = true; btn.classList.remove('pulse');
        gsap.to(btn, { opacity: .3, duration: .4 });
        T.forEach((t, i) => { const dx = 1120 - 120 - pos[i][0] + 300, dy = 380 - 400 - pos[i][1] + 200; gsap.to(t, { x: dx, y: dy, scale: .1, opacity: 0, rotation: 0, duration: imm ? 0 : 1, delay: imm ? 0 : i * .06, ease: 'power3.in' }); });
        setTimeout(() => { mon.classList.add('on'); gsap.to(li, { opacity: 1, y: 0, duration: .5, stagger: .1, ease: 'power2.out' }); }, imm ? 0 : 900);
        if (video && video.duration) { try { video.currentTime = Math.min(4, video.duration - .1); } catch (e) {} }
      }
      btn.addEventListener('click', e => { e.stopPropagation(); if (DECK.state.f < 2) DECK.go(DECK.state.i, 2); else absorb(); });
      return {
        step(f, imm) { if (f === 0) scatter(imm); else if (f === 1) { if (absorbed) scatter(imm); showCards(imm); } else { if (!T[0].style.opacity || T[0].style.opacity === '0') showCards(true); absorb(imm); } },
        reset() { scatter(true); }
      };
    }
  });

  /* ---------- 07 TOWN ---------- */
  S.push({
    n: 7, id: 'town', title: 'TheOther.Town — AI 모델은 늘었는데, 왜 사용은 더 복잡해졌을까요?', section: 'tech', steps: 4,
    bg: { video: V('V07_s07'), poster: P('V07_s07'), strength: 'faint' },
    build(c) {
      const chips = [['요약', 0], ['코드 작성', 1], ['내부 규정 검색', 3], ['번역', 2]];
      const models = ['ChatGPT', 'Claude', 'Gemini', 'Internal AI'];
      c.innerHTML = head(7, 'TheOther.Town', 'AI 모델은 늘었는데,\n왜 사용은 더 복잡해졌을까요?', '모델은 자유롭게, 토큰·데이터·비용은 통제되게.') +
        '<div class="board ist no-advance"><h3><i></i>iStation — AI 활용과 통제<small>질문 칩을 눌러 라우팅을 시연합니다</small></h3>' +
        '<div class="qchips">' + chips.map((q, i) => '<span class="qchip" data-m="' + q[1] + '" data-i="' + i + '">' + q[0] + '</span>').join('') + '</div>' +
        '<div class="route"><svg viewBox="0 0 960 280" preserveAspectRatio="none">' +
        '<path d="M200 140 C300 140 300 140 390 140"/>' + models.map((m, i) => '<path d="M560 140 C680 140 680 ' + (35 + i * 70) + ' 780 ' + (35 + i * 70) + '"/>').join('') + '</svg>' +
        '<div class="src"><b>사용자 질문</b>조직 정책 적용</div><div class="router">AI 모델 라우터</div>' +
        models.map((m, i) => '<div class="model' + (i === 3 ? ' internal' : '') + '" data-i="' + i + '" style="top:' + (10 + i * 70) + 'px">' + m + '</div>').join('') +
        '<div class="pkt"></div></div>' +
        '<div class="meta"><div class="budget"><small>조직 예산 · 쿼터 (개념)</small><div class="bars">' + '<i></i>'.repeat(12) + '</div></div><div class="log"></div></div>' +
        '<div class="toast">쿼터 초과 — 관리자 정책에 따라 추가 사용 승인 필요</div></div>' +
        '<div class="board tst no-advance"><h3><i style="background:var(--space)"></i>TStation — AI 개발과 실습</h3>' +
        '<div class="gpu">' + '<i></i>'.repeat(6) + '</div>' +
        '<div class="ws">' + [['Jupyter', '데이터 분석·모델 학습'], ['VS Code', '브라우저 기반 개발'], ['Docker', '사용자별 독립 공간']].map(w => '<div>' + w[0] + '<small>' + w[1] + '</small></div>').join('') + '</div>' +
        '<p class="sub" style="font-size:17px;margin-top:22px;line-height:1.5">GPU Slicing으로 한 장의 GPU를 사용자별 독립 작업공간으로 나눕니다. 브라우저에서 즉시 접속합니다.</p></div>' +
        '<div class="link"></div>' +
        '<p class="closing" data-f="4" style="bottom:70px">모델은 자유롭게, 토큰과 데이터와 비용은 통제되게.<br>GPU의 사양표를 넘어, AI를 지속해서 사용할 환경을 제공합니다.</p>' +
        '<p class="caption">개념 시연 · 제공 범위와 연동 가능한 모델, 요금·운영정책은 실제 사양·계약 기준으로 확인합니다. 모델명은 예시입니다. (PRD §8-4)</p>';
      const ist = c.querySelector('.ist'), tst = c.querySelector('.tst'), pkt = c.querySelector('.pkt'), bars = c.querySelectorAll('.budget i'), log = c.querySelector('.log'), toast = c.querySelector('.toast');
      const M = c.querySelectorAll('.model'), Q = c.querySelectorAll('.qchip');
      let used = 0, busy = false, demoT = [];
      function route(qi) {
        if (busy) return; busy = true;
        const mi = +Q[qi].dataset.m; Q.forEach(q => q.classList.remove('active')); Q[qi].classList.add('active');
        M.forEach(m => m.classList.remove('hit'));
        const tl = gsap.timeline({ onComplete() { busy = false; } });
        tl.set(pkt, { left: 200, top: 133, opacity: 1 })
          .to(pkt, { left: 390, duration: .4, ease: 'none' })
          .to(pkt, { left: 560, duration: .3, ease: 'none' })
          .to(pkt, { left: 780, top: 28 + mi * 70, duration: .5, ease: 'power1.inOut' })
          .add(() => {
            M[mi].classList.add('hit');
            if (mi !== 3) { if (used < bars.length) bars[used++].classList.add('off'); }
            if (used >= bars.length) toast.classList.add('on');
            const d = document.createElement('div');
            d.innerHTML = mi === 3 ? '<b>' + Q[qi].textContent + '</b> → Internal AI · 근거: 내부문서 3건 · 권한 확인됨' : '<b>' + Q[qi].textContent + '</b> → ' + models[mi] + ' · 토큰 사용 기록 · 부서 예산 차감';
            log.prepend(d); requestAnimationFrame(() => d.classList.add('on'));
            while (log.children.length > 2) log.lastChild.remove();
          })
          .to(pkt, { opacity: 0, duration: .3 });
      }
      Q.forEach((q, i) => q.addEventListener('click', e => { e.stopPropagation(); route(i); }));
      function clearDemo() { demoT.forEach(clearTimeout); demoT = []; }
      function resetBoard() { used = 0; bars.forEach(b => b.classList.remove('off')); log.innerHTML = ''; toast.classList.remove('on'); M.forEach(m => m.classList.remove('hit')); Q.forEach(q => q.classList.remove('active')); gsap.set(pkt, { opacity: 0 }); }
      return {
        step(f, imm) {
          clearDemo();
          ist.classList.toggle('on', f >= 1); tst.classList.toggle('on', f >= 3);
          c.querySelector('.gpu').classList.toggle('sliced', f >= 3); c.querySelector('.ws').classList.toggle('on', f >= 3);
          c.querySelector('.link').classList.toggle('on', f >= 4);
          if (f === 2 && !imm) { demoT.push(setTimeout(() => route(0), 300)); demoT.push(setTimeout(() => route(2), 2400)); }
          if (f === 0) resetBoard();
        },
        reset() { clearDemo(); resetBoard(); },
        leave() { clearDemo(); }
      };
    }
  });

  /* ---------- 08 UNIVERSITIES ---------- */
  S.push({
    n: 8, id: 'campus', title: '설명자료를 벗어나, 강의실에서 증명하다', section: 'tech', steps: 3,
    bg: { video: V('V08_s08'), poster: P('V08_s08'), strength: 'mid' },
    build(c) {
      const U = [
        { h: '서강대학교', s: '중국인 유학생 대상 AI 실습', b: ['live'], back: [['학생별 동일한 브라우저 실습환경', 0], ['사용자별 독립 AI 작업공간', 0], ['여러 AI 모델을 활용한 실습', 1], ['수업 단위 이용량과 토큰 관리', 1]] },
        { h: '백석대학교', s: 'AX 실무인재 양성환경 활용', b: ['live'], back: [['AI·VDI 융합 실습', 0], ['AI 개발도구와 GPU 자원 제공', 0], ['프로젝트 중심의 AI 활용', 1], ['산업현장형 실습환경 운영', 1]] },
        { h: '상명대학교', s: 'AI Native Campus 활용', b: ['live', 'ext'], back: [['서울·천안캠퍼스 AI 환경 연결', 1], ['GPU 공동 활용 · 표준 실습환경', 1], ['멀티 LLM과 교내문서 RAG', 1], ['모델·토큰·비용 통합관리', 1]] },
      ];
      c.innerHTML = head(8, '현장 활용', '설명자료를 벗어나,\n강의실에서 증명하다', '기술의 진짜 성능은 벤치마크가 아니라, 수업이 멈추지 않는 데서 드러납니다.') +
        '<div class="flips">' + U.map((u, i) => '<div class="flip fr no-advance" data-f="1" style="transition-delay:' + i * .12 + 's"><div class="in">' +
          '<div class="face front"><h3>' + u.h + '</h3><h4>' + u.s + '</h4><div class="badges">' + u.b.map(b => b === 'live' ? '<span class="badge badge--live">활용 중</span>' : '<span class="badge">확장 방향</span>').join('') + '</div><div class="hintflip">클릭하여 상세 보기</div></div>' +
          '<div class="face back"><h3 style="font-size:26px">' + u.h + '</h3><ul>' + u.back.map(b => '<li class="' + (b[1] ? 'ext' : '') + '">' + b[0] + (b[1] ? ' <small style="font-size:14px">(확장 방향)</small>' : '') + '</li>').join('') + '</ul><div class="hintflip">● 확인된 활용 &nbsp; ○ 확장 방향</div></div>' +
          '</div></div>').join('') + '</div>' +
        '<p class="closing" data-f="3">대학에 GPU를 제공하는 데서 끝나지 않습니다.<br>대학이 AI 교육을 지속해서 운영할 수 있는 환경을 제공합니다.</p>' +
        '<p class="caption">대학별 활용 현황은 내부 현황 기준 · 세부 기능의 실제 적용 범위는 대학마다 다르며, 제안 단계의 범위를 운영 성과로 해석하지 않습니다. (PRD §8-5)</p>';
      const F = c.querySelectorAll('.flip');
      F.forEach(f => f.addEventListener('click', e => { e.stopPropagation(); f.classList.toggle('flipped'); }));
      return { step(f) { F.forEach((fl, i) => setTimeout(() => fl.classList.toggle('flipped', f >= 2), i * 120)); } };
    }
  });

  /* ---------- 09 KSTORY WHY ---------- */
  S.push({
    n: 9, id: 'kstory-why', title: 'Kstory.ai — AI로 책을 만드는 진짜 이유', section: 'kstory', steps: 4,
    bg: { video: V('V10_s10'), poster: P('V10_s10'), strength: 'faint' },
    build(c) {
      c.innerHTML =
        '<div class="col-left fr" data-f="1"><div class="kicker"><b>09</b> / 16 &nbsp;·&nbsp; Kstory.ai</div>' +
        '<h2 class="title">AI로 책을 만드는<br>진짜 이유</h2><p class="gov">책을 대신하는 AI가 아니라, 책을 펼치게 하는 AI입니다.</p></div>' +
        '<div class="col-left" style="top:400px"><ul class="list fr" data-f="2"><li class="h">왜 시작하지 못할까요?</li>' +
        ['책에 관심이 없어 첫 장을 펼치지 않는 아이', '아직 글자가 어려워 독서에 참여하지 못하는 아이', '언어가 달라 가족과 같은 책을 읽기 어려운 아이', '자신의 이야기를 표현할 기회를 얻지 못한 사람', 'AI를 활용해 보고 싶지만 무엇부터 할지 모르는 사람'].map((t, i) => '<li class="fr" data-f="2" style="transition-delay:' + (i * .1) + 's">' + t + '</li>').join('') + '</ul></div>' +
        '<div class="book no-advance"><div class="bvid"><video class="card-video" muted loop playsinline preload="none" poster="' + P('V09_s09') + '" data-src="' + V('V09_s09') + '"></video></div>' +
        '<div class="page left"><span class="fade">다른 사람의 이야기</span></div>' +
        '<div class="page inner">나의 이야기<small>내가 좋아하는 동물, 우리 가족,<br>내가 다녀온 장소가 등장하는</small></div>' +
        '<div class="page cover"><i></i></div></div>' +
        '<div class="tap fr" data-f="1">책을 클릭하면 펼쳐집니다</div>' +
        '<p class="closing" data-f="4">책을 대신하는 AI가 아니라, 책을 펼치게 하는 AI.<br>Kstory.ai가 동화책에서 출발한 이유입니다.</p>' +
        '<p class="caption">「AI 시민동화책_공공도서관_발표멘트_PART2.md」의 독서 활성화 방향에 기반 · 원고에 통계 수치는 없습니다.</p>';
      const book = c.querySelector('.book'), bv = book.querySelector('video');
      book.addEventListener('click', e => { e.stopPropagation(); if (DECK.state.f < 3) DECK.go(DECK.state.i, 3); else book.classList.toggle('open'); });
      return {
        step(f) {
          book.classList.toggle('right', f >= 1); book.classList.toggle('open', f >= 3);
          if (f >= 3) { if (!bv.src) bv.src = bv.dataset.src; bv.play().catch(() => {}); } else bv.pause();
        },
        leave() { bv.pause(); }
      };
    }
  });

  /* ---------- 10 PERSONALIZATION DEMO ---------- */
  S.push({
    n: 10, id: 'yours', title: '‘읽어라’보다 강한 말, ‘네 이야기야’', section: 'kstory', steps: 5,
    bg: { video: V('V10_s10'), poster: P('V10_s10'), strength: 'faint' },
    build(c) {
      const st = { hero: 'cat', place: 'forest', with: 'grandma', level: 7, lang: 'ko' };
      const N = { cat: { ko: '고양이', en: 'the cat' }, dino: { ko: '공룡', en: 'the dinosaur' }, forest: { ko: '숲', en: 'forest' }, sea: { ko: '바닷가', en: 'seaside' }, grandma: { ko: '할머니', en: 'Grandma' }, dad: { ko: '아빠', en: 'Dad' } };
      const T = {
        ko: { 5: (h, p, w) => `${w}랑 ${h}랑 ${p}에 갔어요. 참 좋았어요.`, 7: (h, p, w) => `오늘은 ${w}와 함께 ${p}에 갔어요. 작은 ${h}도 따라왔어요. 우리는 함께 걸으며 재미있는 것들을 찾았어요.`, 9: (h, p, w) => `${w}와 함께 ${p}로 떠난 날, 발밑에서 작은 ${h}가 따라오고 있었습니다. 우리는 서로 다른 것을 보았지만, 같은 길을 걸으며 이야기를 나누었습니다. 그날의 바람과 빛을, 나는 오래 기억하기로 했습니다.` },
        en: { 5: (h, p, w) => `${w} and I went to the ${p} with ${h}. It was fun.`, 7: (h, p, w) => `Today I went to the ${p} with ${w}. A little ${h} came along. We walked together and found many fun things.`, 9: (h, p, w) => `On the day we set off for the ${p} with ${w}, a small ${h} followed at our feet. We noticed different things, yet we walked the same path and talked. I decided to remember that day's wind and light for a long time.` },
      };
      const imgs = ['cat', 'dino'].flatMap(h => ['forest', 'sea'].flatMap(p => ['grandma', 'dad'].map(w => `I10_${h}_${p}_${w}`)));
      c.innerHTML = head(10, 'Kstory.ai', '‘읽어라’보다 강한 말,\n‘네 이야기야’', null) +
        '<div class="panel p1 fr no-advance" data-f="1"><h4><i>1</i>관심사<small>다른 사람의 책에서, 나의 책으로</small></h4>' +
        '<div class="row"><span class="lab">주인공</span><span class="opt sel" data-k="hero" data-v="cat">고양이</span><span class="opt" data-k="hero" data-v="dino">공룡</span><span class="lab" style="margin-left:14px">장소</span><span class="opt sel" data-k="place" data-v="forest">숲</span><span class="opt" data-k="place" data-v="sea">바닷가</span></div>' +
        '<div class="row"><span class="lab">함께</span><span class="opt sel" data-k="with" data-v="grandma">할머니</span><span class="opt" data-k="with" data-v="dad">아빠</span></div></div>' +
        '<div class="panel p2 fr no-advance" data-f="2"><h4><i>2</i>읽기 수준<small>어려운 책에서, 내가 읽을 수 있는 책으로</small></h4><div class="row"><span class="lab">연령</span><span class="opt" data-k="level" data-v="5">5세</span><span class="opt sel" data-k="level" data-v="7">7세</span><span class="opt" data-k="level" data-v="9">9세</span></div></div>' +
        '<div class="panel p3 fr no-advance" data-f="3"><h4><i>3</i>음성 낭독<small>읽기 어려워도, 이야기에 닿을 수 있도록</small></h4><div class="row"><button class="play">▶ 들려주기</button><span class="sub" style="font-size:15px">읽는 단어가 하이라이트됩니다 (브라우저 음성 합성)</span></div></div>' +
        '<div class="panel p4 fr no-advance" data-f="4"><h4><i>4</i>다국어<small>서로 다른 언어에서, 함께 읽는 가족으로</small></h4><div class="row"><span class="lab">언어</span><span class="opt sel" data-k="lang" data-v="ko">한국어</span><span class="opt" data-k="lang" data-v="en">English</span><span class="sub" style="font-size:14px;margin-left:10px">※ 추가 언어는 원어민 검수 후 노출</span></div></div>' +
        '<div class="bookv no-advance"><div class="pic">' + imgs.map(n => '<img data-n="' + n + '" src="' + IMG(n) + '" alt="">').join('') + '</div><div class="txt"><p></p><small></small></div><div class="pg">데모용 샘플 · 실제 서비스 생성 결과가 아닙니다</div></div>' +
        '<p class="closing" data-f="5" style="bottom:40px;font-size:30px">모두에게 같은 책을 권하는 것에서, 각자에게 맞는 시작을 제공하는 것으로.</p>';
      const P_ = c.querySelector('.bookv .txt p'), sm = c.querySelector('.bookv .txt small'), pics = c.querySelectorAll('.pic img'), play = c.querySelector('.play');
      let utter = null;
      function render() {
        pics.forEach(im => im.classList.toggle('show', im.dataset.n === `I10_${st.hero}_${st.place}_${st.with}`));
        const h = N[st.hero][st.lang], p = N[st.place][st.lang], w = N[st.with][st.lang];
        const text = T[st.lang][st.level](h, p, w);
        P_.className = 'lv' + st.level;
        P_.innerHTML = text.split(' ').map(x => '<span class="w">' + x + '</span>').join(' ');
        sm.textContent = st.lang === 'en' ? '원문: ' + T.ko[st.level](N[st.hero].ko, N[st.place].ko, N[st.with].ko) : '';
        c.querySelectorAll('.opt').forEach(o => o.classList.toggle('sel', String(st[o.dataset.k]) === o.dataset.v));
      }
      c.querySelectorAll('.opt').forEach(o => o.addEventListener('click', e => { e.stopPropagation(); st[o.dataset.k] = o.dataset.k === 'level' ? +o.dataset.v : o.dataset.v; stopSpeak(); render(); }));
      function stopSpeak() { if (window.speechSynthesis) speechSynthesis.cancel(); play.classList.remove('playing'); play.textContent = '▶ 들려주기'; c.querySelectorAll('.w').forEach(w => w.classList.remove('hi')); }
      function speak() {
        const words = [...c.querySelectorAll('.w')]; const text = words.map(w => w.textContent).join(' ');
        stopSpeak(); play.classList.add('playing'); play.textContent = '■ 멈춤';
        let i = 0; const per = Math.max(260, 9000 / words.length);
        const hiTimer = setInterval(() => { words.forEach(w => w.classList.remove('hi')); if (i < words.length) words[i++].classList.add('hi'); else { clearInterval(hiTimer); stopSpeak(); } }, per);
        if (window.speechSynthesis) {
          utter = new SpeechSynthesisUtterance(text); utter.lang = st.lang === 'ko' ? 'ko-KR' : 'en-US'; utter.rate = st.level === 5 ? .85 : .95;
          utter.onend = () => { clearInterval(hiTimer); stopSpeak(); };
          speechSynthesis.speak(utter);
        }
      }
      play.addEventListener('click', e => { e.stopPropagation(); play.classList.contains('playing') ? stopSpeak() : speak(); });
      c.querySelector('.bookv').addEventListener('click', e => e.stopPropagation());
      render();
      let auto = [];
      return {
        step(f, imm) {
          auto.forEach(clearTimeout); auto = [];
          if (imm) return;
          // one automatic demonstration per panel
          if (f === 1) auto.push(setTimeout(() => { st.hero = 'dino'; render(); }, 900), setTimeout(() => { st.place = 'sea'; render(); }, 1800));
          if (f === 2) auto.push(setTimeout(() => { st.level = 5; render(); }, 900), setTimeout(() => { st.level = 9; render(); }, 2100), setTimeout(() => { st.level = 7; render(); }, 3300));
          if (f === 3) auto.push(setTimeout(speak, 700));
          if (f === 4) auto.push(setTimeout(() => { st.lang = 'en'; render(); }, 900));
        },
        reset() { Object.assign(st, { hero: 'cat', place: 'forest', with: 'grandma', level: 7, lang: 'ko' }); stopSpeak(); render(); },
        leave() { auto.forEach(clearTimeout); stopSpeak(); }
      };
    }
  });
})(window.SCENES);
