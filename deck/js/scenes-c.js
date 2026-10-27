/* scenes 11–16 */
(function (S) {
  const { V, P, IMG, head } = window.H;

  /* ---------- 11 CYCLE ---------- */
  S.push({
    n: 11, id: 'cycle', title: '내가 만든 책은, 다시 읽게 됩니다', section: 'kstory', steps: 5,
    bg: { video: V('V11_s11'), poster: P('V11_s11'), strength: 'faint' },
    build(c) {
      const nodes = [['I11_1_choose', '① 이야기 만들기'], ['I11_2_pick', '② 삽화 고르기'], ['I11_3_read', '③ 완성된 책 읽기'], ['I11_4_edit', '④ 수정하고 다시 만들기']];
      // arcs between node centers on a circle r=265 centered (360,360): top(360,95) right(625,360) bottom(360,625) left(95,360)
      const arcs = ['M460 130 A265 265 0 0 1 590 260', 'M590 460 A265 265 0 0 1 460 590', 'M260 590 A265 265 0 0 1 130 460', 'M130 260 A265 265 0 0 1 260 130'];
      c.innerHTML = head(11, 'Kstory.ai', '내가 만든 책은,\n다시 읽게 됩니다', '만들다 보니 읽고, 읽다 보니 다시 만듭니다.') +
        '<div class="q"><p>“AI가 책을 만들어주면, 오히려 사람이 읽거나 생각할 일이 줄어드는 것 아닐까요?”</p><p class="a">그래서 만드는 과정에 주목합니다. AI의 결과를 받는 데서 끝나지 않고, 사용자가 읽고 수정하는 과정에 참여하도록 돕는 것입니다.</p></div>' +
        '<div class="cycle"><svg viewBox="0 0 720 720">' + arcs.map(d => '<path d="' + d + '"/>').join('') + '</svg>' +
        nodes.map((n, i) => '<div class="node n' + (i + 1) + '"><img src="' + IMG(n[0]) + '" alt=""><span>' + n[1] + '</span></div>').join('') +
        '<div class="center"><span class="from">이야기를 받는 사람</span><b>→ 만드는 사람</b></div></div>' +
        '<p class="closing" data-f="5">책 한 권을 빠르게 생성하는 것보다,<br>그 책을 통해 한 번 더 읽고 생각하게 하는 것.</p>' +
        '<p class="caption">기대하는 경험이며 실측 효과가 아닙니다. 「…PART2.md」 [20] 읽기를 만들기로.</p>';
      const Nn = c.querySelectorAll('.node'), A = c.querySelectorAll('svg path'), ctr = c.querySelector('.center'), cyc = c.querySelector('.cycle');
      let spin;
      return {
        step(f, imm) {
          Nn.forEach((n, i) => n.classList.toggle('on', f >= i + 1)); A.forEach((a, i) => a.classList.toggle('on', f >= i + 1));
          ctr.classList.toggle('maker', f >= 4); c.querySelector('.q').classList.toggle('ans', f >= 5);
          if (spin) spin.kill();
          if (f >= 4 && !DECK.isReduced) spin = gsap.to(cyc.querySelector('svg'), { rotation: 360, duration: 60, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
          else gsap.set(cyc.querySelector('svg'), { rotation: 0 });
        },
        leave() { if (spin) spin.kill(); }
      };
    }
  });

  /* ---------- 12 LIBRARY FAMILY ---------- */
  S.push({
    n: 12, id: 'family', title: '도서관이, 우리 가족의 창작실이 되는 순간', section: 'kstory', steps: 4,
    bg: { video: V('V12_s12'), poster: P('V12_s12'), strength: 'mid' },
    build(c) {
      const K = [
        { from: '혼자 읽기', to: '함께 읽기', back: ['부모와 조부모, 형제의 이야기를 동화책으로', '가족이 함께 만들고 함께 읽는 경험', '개인의 활동에서 가족이 공유하는 문화로'] },
        { from: '한 번의 콘텐츠', to: '반복해 읽는 소장품', back: ['PDF · 디지털 책 · 종이책으로 남김', '한 번 보고 지나가는 화면이 아니라', '집과 도서관에서 반복해 읽는 작품으로'] },
        { from: '일회성 AI 체험', to: '지속형 독서 프로그램', back: ['독서교실 · 방학 프로그램 · 가족 독서', '학교 연계 · 다문화가정 · 지역문화 기록', '체험 뒤 관련 도서를 찾아 대출하는 활동까지'] },
      ];
      c.innerHTML = head(12, 'Kstory.ai', '도서관이,\n우리 가족의 창작실이 되는 순간', '책을 빌리러 오던 곳에, 책을 만들러 올 이유를 더합니다.') +
        '<div class="flips">' + K.map((k, i) => '<div class="flip fr no-advance" data-f="' + (i + 1) + '"><div class="in">' +
          '<div class="face front"><div class="from">' + k.from + '</div><div class="arrow"></div><div class="to">' + k.to + '</div><div class="lead">' + k.back[0] + '</div><div class="hintflip">클릭하여 상세 보기</div></div>' +
          '<div class="face back"><h3 style="font-size:28px;color:var(--coral)">' + k.to + '</h3><ul>' + k.back.map(b => '<li>' + b + '</li>').join('') + '</ul></div></div></div>').join('') + '</div>' +
        '<p class="closing" data-f="4"><span>AI가 재미있어서 참여하고,</span> <span>이야기가 궁금해서 읽고,</span> <span>다른 책까지 찾아보게 합니다.</span></p>' +
        '<p class="caption">프로그램 설계와 기대효과이며 실제 운영 결과가 아닙니다. 「…PART2.md」 [21]~[24].</p>';
      const F = c.querySelectorAll('.flip');
      F.forEach(f => f.addEventListener('click', e => { e.stopPropagation(); f.classList.toggle('flipped'); }));
      return { step(f) { F.forEach((fl, i) => { setTimeout(() => fl.classList.toggle('on', f >= i + 1), 300); if (f < i + 1) fl.classList.remove('flipped'); }); } };
    }
  });

  /* ---------- 13 INSTITUTIONS ---------- */
  S.push({
    n: 13, id: 'institutions', title: '개인의 작품이, 기관의 교육 자산이 됩니다', section: 'kstory', steps: 4,
    bg: { video: V('V13_s13'), poster: P('V13_s13'), strength: 'faint' },
    build(c) {
      const TABS = [
        { t: '도서관', img: 'I13a_library', cap: '도서관 · 독서 프로그램', e: [['방문 목적 확대', '대출과 반납을 넘어, 책을 만들기 위해 방문하는 새로운 동기'], ['독서 프로그램 활성화', 'AI 창작 체험을 독서교실·방학·가족 프로그램과 연결'], ['디지털 포용', '저연령·다문화가정·디지털 소외계층도 음성·다국어로 참여'], ['지역문화 기록', '지역 인물과 장소, 가족의 기억을 디지털 콘텐츠로 축적']] },
        { t: '학교', img: 'I13b_school', cap: '학교 · 프로젝트 수업', e: [['AI 리터러시', 'AI 결과를 그대로 소비하지 않고 질문하고 선택하고 수정하는 경험'], ['읽기·쓰기·표현력', '이야기 구조를 만들고 문장을 고치며 읽기·쓰기·표현을 함께'], ['프로젝트 교육', '학생별 작품과 팀 프로젝트, 발표와 피드백을 연결'], ['성장과정 기록', '생각 노트·초안·수정·성찰을 학습 포트폴리오로', 'future']] },
        { t: '평생교육기관', img: 'I13c_lifelong', cap: '평생교육 · 인생기록', e: [['시니어 디지털 참여', '복잡한 도구 대신 자신의 경험과 목소리로 AI 창작 시작'], ['자서전과 인생기록', '개인의 기억을 자서전·수필·가족 이야기로'], ['세대 연결', '시니어의 이야기와 어린 세대의 디지털 역량을 잇는 공동 창작'], ['지역사회 아카이브', '주민의 삶과 지역의 역사를 기관의 문화·교육 자산으로']] },
      ];
      c.innerHTML = head(13, '기관 도입', '개인의 작품이,\n기관의 교육 자산이 됩니다', null) +
        '<div class="tabs no-advance">' + TABS.map((t, i) => '<span class="tab" data-i="' + i + '">' + t.t + '</span>').join('') + '</div>' +
        '<div class="expect"><span class="badge badge--expect" style="font-size:18px;padding:8px 18px">기대효과 · 측정 성과 아님</span></div>' +
        '<div class="pic">' + TABS.map(t => '<img src="' + IMG(t.img) + '" alt="">').join('') + '<div class="cap"></div></div>' +
        '<div class="effects"></div>' +
        '<p class="closing" data-f="4" style="bottom:36px;font-size:30px">한 번의 체험을 넘어, 기관이 반복해서 운영하고 축적할 수 있는 AI 교육 프로그램으로 발전시키겠습니다.</p>' +
        '<p class="caption" style="bottom:12px">측정된 성과가 아닌 기대효과입니다. 성장기록 등 고도화 기능은 현재 제공 범위와 구분합니다. (PRD §8-6)</p>';
      const tabs = c.querySelectorAll('.tab'), pics = c.querySelectorAll('.pic img'), cap = c.querySelector('.cap'), eff = c.querySelector('.effects');
      let cur = -1;
      function show(i, imm) {
        if (i === cur) return; cur = i;
        tabs.forEach((t, j) => t.classList.toggle('active', j === i));
        pics.forEach((p, j) => p.classList.toggle('show', j === i));
        c.querySelector('.pic').classList.toggle('on', i >= 0);
        if (i < 0) { eff.innerHTML = ''; cap.textContent = ''; return; }
        cap.textContent = TABS[i].cap;
        eff.innerHTML = TABS[i].e.map(e => '<div class="eff"><h4>' + e[0] + '</h4><p>' + e[1] + '</p>' + (e[2] === 'future' ? '<span class="badge badge--future">고도화 예정</span>' : '') + '</div>').join('');
        gsap.to(eff.children, { opacity: 1, y: 0, duration: imm ? 0 : .5, stagger: imm ? 0 : .1, ease: 'power2.out' });
      }
      tabs.forEach((t, i) => t.addEventListener('click', e => { e.stopPropagation(); show(i); }));
      return { step(f, imm) { show(f === 0 ? -1 : Math.min(2, f - 1), imm); }, reset() { cur = -1; show(0, true); } };
    }
  });

  /* ---------- 14 CONTROL ---------- */
  S.push({
    n: 14, id: 'control', title: '쉬운 AI 뒤에는, 보이지 않는 통제가 있습니다', section: 'tech', steps: 5,
    bg: { video: V('V14_s14'), poster: P('V14_s14'), strength: 'faint' },
    build(c, el) {
      const L = [
        { cls: 'svc-space', h: 'TheOther.Space 2.0', li: ['사용자 인증과 접근통제', '업무환경과 데이터의 중앙관리', '단말 데이터 미저장 <small>(정책에 따라)</small>', '세션과 접속기록 관리'] },
        { cls: 'svc-town', h: 'TheOther.Town · iStation', li: ['허용 AI 모델 관리 · Public│Internal 선택', '사용자별 문서 접근권한', '모델별 토큰 사용량 · 부서별 예산과 쿼터', '내부문서 RAG · 답변 근거와 출처', '로그·추적·이상사용 관리'], split: true },
        { cls: 'svc-kstory', h: 'Kstory.ai', li: ['개인·팀 권한 구분', '팀 프로젝트와 작품 검토', '기관 외 공유 범위 관리', '창작물과 개인정보 보호', '팀별 토리와 사용량 관리'] },
      ];
      c.innerHTML = head(14, '신뢰', '쉬운 AI 뒤에는,\n보이지 않는 통제가 있습니다', '사용자는 자유롭게. 조직은 데이터·모델·토큰을 통제하게.') +
        '<div class="glass"><span class="lab">사용자가 보는 화면</span><div class="search">무엇을 도와드릴까요?</div><div class="btn">시작</div></div>' +
        '<div class="layers">' + L.map(l => '<div class="layer ' + l.cls + '"><h4>' + l.h + '</h4><ul>' + l.li.map(x => '<li>' + x + '</li>').join('') + '</ul>' + (l.split ? '<div class="tag">Public AI │ Internal<br>데이터 경계 분기</div><div class="split"></div><div class="pk"></div><div class="pk"></div>' : '') + '</div>').join('') + '</div>' +
        '<p class="closing" data-f="5" style="bottom:70px">복잡한 기술은 틸론이 책임지고,<br>고객에게는 단순하고 신뢰할 수 있는 경험을 제공합니다.</p>' +
        '<p class="caption">‘단말 데이터 미저장’과 외부 전송 통제는 구성·정책에 따라 적용 범위가 다릅니다. Public AI 사용과 내부 처리의 데이터 경계를 구분해 설명합니다. (PRD §8-8)</p>';
      const layers = c.querySelectorAll('.layer'), pk = c.querySelectorAll('.pk');
      let tl;
      return {
        step(f, imm) {
          el.classList.toggle('lift', f >= 1);
          layers.forEach((l, i) => l.classList.toggle('on', f >= i + 2));
          if (tl) tl.kill();
          if (f >= 3 && !DECK.isReduced) {
            tl = gsap.timeline({ repeat: -1, repeatDelay: .6 });
            tl.set(pk, { opacity: 1, y: 0, x: 0 })
              .to(pk[0], { y: 300, x: -60, duration: 1.6, ease: 'none' }, 0)
              .to(pk[1], { y: 300, x: 24, duration: 1.6, ease: 'none' }, 0)
              .to(pk, { opacity: 0, duration: .3 });
          } else gsap.set(pk, { opacity: 0 });
        },
        leave() { if (tl) tl.kill(); }
      };
    }
  });

  /* ---------- 15 ROADMAP ---------- */
  S.push({
    n: 15, id: 'roadmap', title: '출시가 끝이라면, 서비스가 아닙니다', section: 'tech', steps: 5,
    bg: { video: V('V15_s15'), poster: P('V15_s15'), strength: 'faint' },
    build(c) {
      const ST = [['1단계', '서비스 안정화', '사용성과 성능 개선 · 운영체계 정착 · 장애·보안 대응 강화 · 고객 의견의 빠른 반영'],
        ['2단계', '현장별 활용모델 정착', '기업용 클라우드 업무환경 · 대학 AI 실습·연구환경 · 기관용 멀티 LLM·RAG · 학교·도서관·평생교육기관 AI 창작교육'],
        ['3단계', '지능형 운영 고도화', 'AI 모델 자동 라우팅 · 토큰 비용 최적화 · GPU 자원 자동 배분 · 기관별 RAG와 AI 에이전트 · 프로젝트·교육 성과관리'],
        ['4단계', '서비스 생태계 확장', '기업·대학·도서관·공공기관 협력 · 산업별 파트너 서비스 · 지역 기반 AI 교육모델 · 일본 등 해외시장 확장']];
      c.innerHTML = head(15, '실행계획', '출시가 끝이라면,\n서비스가 아닙니다', '출시는 오늘의 약속입니다. 개선은 매일의 증명입니다.') +
        '<div class="stairs">' + ST.map((s, i) => '<div class="step st' + (i + 1) + '"><small>' + s[0] + '</small><h4>' + s[1] + '</h4><p>' + s[2] + '</p></div>').join('') + '</div>' +
        '<div class="loop"><svg viewBox="0 0 560 110"><path d="M20 70 C120 -20 260 -20 300 60 S460 120 540 40"/></svg><span>현장에서 듣고</span><span>→ 실제 사용으로 검증하고</span><span>→ 다시 반영</span></div>' +
        '<p class="closing" data-f="5" style="bottom:40px;font-size:32px">출시는 오늘의 약속입니다. 개선은 매일의 증명입니다.</p>' +
        '<p class="caption" style="bottom:12px">확정 일정·수치 목표가 아닌 단계별 발전 방향입니다.</p>';
      const steps = c.querySelectorAll('.step'), loop = c.querySelector('.loop');
      return { step(f) { steps.forEach((s, i) => s.classList.toggle('on', f >= i + 1)); loop.classList.toggle('on', f >= 5); } };
    }
  });

  /* ---------- 16 FUTURE + CLOSING ---------- */
  S.push({
    n: 16, id: 'next', title: 'AI가 일하고, 누구나 창작하는 다음 세상 · 클로징', section: 'closing', steps: 5,
    bg: null,
    build(c) {
      const F = [
        { cls: 'svc-space', v: 'V16a_s16', svc: 'THEOTHER.SPACE 2.0', from: '사람의 업무공간', to: 'Secure AI Agent Workspace', kw: ['에이전트별 독립 업무공간', '도구·계정 격리', '중앙 접근통제', '24시간 지속 실행', '작업기록·감사로그', '중요 업무 사용자 승인'] },
        { cls: 'svc-town', v: 'V16b_s16', svc: 'THEOTHER.TOWN', from: 'AI 실습환경', to: 'AI Development & Operations Platform', kw: ['상용·내부 모델', '토큰·비용', '내부 데이터', 'GPU', 'RAG·Fine-tuning', 'AI 에이전트', '테스트·배포', '운영 모니터링'] },
        { cls: 'svc-kstory', v: 'V16c_s16', svc: 'KSTORY.AI', from: 'AI 동화책', to: 'AI Creative Studio', kw: ['동화책', '성장앨범', '자서전', '수필·소설·시', '음악과 노래', '교육 콘텐츠'] },
      ];
      c.innerHTML = head(16, '미래 방향', 'AI가 일하고,\n누구나 창작하는 다음 세상', '', ' <span class="badge badge--future">중장기 발전 방향 · 현재 제공 기능 아님</span>') +
        '<div class="cards">' + F.map((f, i) => '<div class="fc ' + f.cls + ' fr" data-f="' + (i + 1) + '"><video class="card-video" muted loop playsinline preload="none" poster="' + P(f.v) + '" data-src="' + V(f.v) + '"></video><div class="txt"><div class="svc">' + f.svc + '</div><div class="from">' + f.from + '</div><div class="to">→ ' + f.to + '</div><div class="kw">' + f.kw.map(k => '<span>' + k + '</span>').join('') + '</div></div></div>').join('') + '</div>' +
        '<p class="line fr" data-f="4">모습은 달라도 방향은 같습니다.<br>더 많은 사람이 자신이 하고 싶은 일을 시작하게 하는 것.</p>' +
        '<div class="beams"><i style="left:25%;background:var(--space)"></i><i style="left:50%;background:var(--town)"></i><i style="left:75%;background:var(--kstory)"></i></div>' +
        '<div class="final"><video muted playsinline preload="none" poster="' + P('V16_s16') + '" data-src="' + V('V16_s16') + '"></video><div class="shade"></div>' +
        '<div class="msg"><h2><span class="ln"><span>증명한 기술을,</span></span><span class="ln"><span>모두가 누리는 서비스로.</span></span></h2><p>TheOtherDay 2026 &nbsp;·&nbsp; TILON</p></div></div>';
      const cards = c.querySelectorAll('.fc'), fin = c.querySelector('.final'), fv = fin.querySelector('video'), beams = c.querySelectorAll('.beams i'), ln = fin.querySelectorAll('h2 .ln > span'), tag = fin.querySelector('.msg p');
      let timers = [], tl;
      function playCard(i) { const v = cards[i].querySelector('video'); if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
      function closing(imm) {
        if (tl) tl.kill();
        if (!fv.src) fv.src = fv.dataset.src;
        tl = gsap.timeline();
        if (!imm) {
          tl.to(cards, { scaleX: .02, opacity: .9, duration: .6, ease: 'power3.in', transformOrigin: '50% 50%' })
            .set(beams, { height: 1080, opacity: 1 })
            .set(cards, { opacity: 0 })
            .to(beams, { left: '50%', duration: 1.4, ease: 'power2.inOut' }, '+=.1')
            .add(() => { fin.classList.add('on'); fv.currentTime = 0; fv.play().catch(() => {}); })
            .to(beams, { opacity: 0, duration: .8 })
            .to(ln, { y: 0, duration: .9, stagger: .15, ease: 'power3.out' }, '-=.4')
            .to(tag, { opacity: 1, duration: .8 }, '+=.3');
        } else { gsap.set(cards, { opacity: 0 }); fin.classList.add('on'); gsap.set(ln, { y: 0 }); gsap.set(tag, { opacity: 1 }); fv.play().catch(() => {}); }
      }
      function unclose() { if (tl) tl.kill(); fin.classList.remove('on'); fv.pause(); gsap.set(cards, { clearProps: 'all' }); gsap.set(beams, { height: 0, opacity: 0, clearProps: 'left' }); gsap.set(ln, { y: '110%' }); gsap.set(tag, { opacity: 0 }); }
      return {
        step(f, imm) {
          timers.forEach(clearTimeout); timers = [];
          cards.forEach((cd, i) => { const on = f >= i + 1; if (on) { playCard(i); timers.push(setTimeout(() => cd.classList.add('morph'), imm ? 0 : 900)); } else { cd.classList.remove('morph'); cd.querySelector('video').pause(); } });
          if (f >= 5) closing(imm); else unclose();
        },
        leave() { timers.forEach(clearTimeout); cards.forEach(cd => cd.querySelector('video').pause()); fv.pause(); }
      };
    }
  });
})(window.SCENES);
