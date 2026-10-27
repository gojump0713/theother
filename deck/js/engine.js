/* TheOtherDay 2026 — slide engine
   scale · navigation · fragments · hash routing · media · overview · presenter sync */
(function () {
  const SCENES = window.SCENES;               // [{n, id, section, bg, steps, build}]
  const CONTENT = window.CONTENT;             // speaker script per slide (1..16)
  const stage = document.getElementById('stage');
  const slidesEl = document.getElementById('slides');
  const progress = document.getElementById('progress');
  const pagerCur = document.getElementById('pager-cur');
  const pagerSec = document.getElementById('pager-sec');
  const veil = document.getElementById('veil');
  const overview = document.getElementById('overview');
  const black = document.getElementById('black');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SECTION_NAME = { tech: 'TILON · Cloud & AI Services', kstory: 'Kstory.ai', closing: 'Closing' };
  const state = { i: -1, f: 0, muted: true, rafs: [] };
  const inst = [];                            // per-slide instances {el, api}
  // mirror frames inside the presenter window neither broadcast nor obey commands
  const isMirror = /presenterview=1/.test(location.search);
  let bc = null;
  try { if (!isMirror) bc = new BroadcastChannel('theotherday'); } catch (e) {}

  /* ---------- build DOM ---------- */
  SCENES.forEach((sc, idx) => {
    const el = document.createElement('section');
    el.className = 'slide';
    el.id = 's' + String(sc.n).padStart(2, '0');
    el.dataset.n = sc.n;
    if (sc.bg) {
      const bg = document.createElement('div');
      bg.className = 'media-bg media-bg--' + (sc.bg.strength || 'faint');
      if (sc.bg.video && !reduced) {
        const v = document.createElement('video');
        v.muted = true; v.loop = sc.bg.loop !== false; v.playsInline = true; v.preload = 'none';
        v.poster = sc.bg.poster || '';
        v.dataset.src = sc.bg.video;
        bg.appendChild(v);
      } else if (sc.bg.poster) {
        const im = document.createElement('img'); im.src = sc.bg.poster; im.alt = ''; bg.appendChild(im);
      }
      el.appendChild(bg);
    }
    const content = document.createElement('div');
    content.className = 'slide-content';
    el.appendChild(content);
    slidesEl.appendChild(el);
    const api = sc.build(content, el) || {};
    inst.push({ el, api, sc, video: el.querySelector('.media-bg video') });
  });

  /* ---------- scaling ---------- */
  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = 'scale(' + s + ')';
    stage.dataset.scale = s;
  }
  addEventListener('resize', fit); addEventListener('load', fit); fit();
  if (isMirror) {                                   // iframe size settles after load; keep fitting
    setInterval(fit, 500);
    document.body.classList.add('mirror');
  }

  /* ---------- media ---------- */
  function loadVideo(k) {
    const it = inst[k]; if (!it || !it.video) return;
    const v = it.video;
    if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.preload = 'auto'; v.load(); }
  }
  function playVideo(k) {
    const it = inst[k]; if (!it || !it.video) return;
    loadVideo(k);
    const p = it.video.play(); if (p && p.catch) p.catch(() => {});
  }
  function pauseVideo(k) {
    const it = inst[k]; if (!it || !it.video) return;
    it.video.pause();
  }
  function manageMedia(k) {
    inst.forEach((it, j) => {
      if (Math.abs(j - k) > 1 && it.video && it.video.src) { it.video.pause(); }
    });
    loadVideo(k - 1); loadVideo(k + 1);
    playVideo(k);
    // card videos inside the slide
    inst[k].el.querySelectorAll('video.card-video').forEach(v => { if (v.dataset.auto === '1') { v.play().catch(() => {}); } });
  }

  /* ---------- fragments ---------- */
  function applyFragments(k, f, immediate) {
    const it = inst[k];
    it.el.querySelectorAll('.fr').forEach(node => {
      const at = +node.dataset.f || 0;
      const on = at <= f;
      if (immediate) node.style.transition = 'none';
      node.classList.toggle('on', on);
      if (immediate) requestAnimationFrame(() => node.style.transition = '');
    });
    it.el.querySelectorAll('.closing').forEach(c => c.classList.toggle('on', (+c.dataset.f || 0) <= f));
    if (it.api.step) it.api.step(f, immediate);
  }

  /* ---------- navigation ---------- */
  function sectionOf(k) { return inst[k].sc.section || 'tech'; }
  function setSection(sec) {
    const prev = document.body.dataset.section;
    if (prev === sec) return;
    document.body.dataset.section = sec;
    // warm-shift / cool-shift veil
    if (!reduced) {
      veil.style.background = sec === 'kstory'
        ? 'radial-gradient(ellipse at 65% 60%, rgba(232,163,61,.38), transparent 62%)'
        : 'radial-gradient(ellipse at 65% 60%, rgba(45,212,191,.30), transparent 62%)';
      gsap.fromTo(veil, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out', yoyo: true, repeat: 1, repeatDelay: .2 });
    }
  }

  function go(k, f, opts) {
    opts = opts || {};
    k = Math.max(0, Math.min(inst.length - 1, k));
    const it = inst[k];
    const maxF = it.sc.steps || 0;
    f = Math.max(0, Math.min(maxF, f == null ? 0 : f));
    const changed = k !== state.i;
    if (changed) {
      const prev = inst[state.i];
      if (prev) {
        if (prev.api.leave) prev.api.leave();
        prev.el.classList.remove('is-active');
        pauseVideo(state.i);
        prev.el.querySelectorAll('video.card-video').forEach(v => v.pause());
      }
      if (!reduced && !opts.immediate) {
        gsap.fromTo(it.el, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: .6, ease: 'power2.out', clearProps: 'scale' });
      }
      it.el.classList.add('is-active');
      state.i = k;
      setSection(sectionOf(k));
      if (it.api.enter) it.api.enter();
      manageMedia(k);
    }
    state.f = f;
    applyFragments(k, f, changed || opts.immediate);
    // chrome
    pagerCur.textContent = String(it.sc.n).padStart(2, '0');
    pagerSec.textContent = SECTION_NAME[sectionOf(k)] || '';
    progress.style.width = (k / (inst.length - 1) * 100) + '%';
    const h = '#/' + String(it.sc.n).padStart(2, '0') + (f ? '/' + f : '');
    if (location.hash !== h) history.replaceState(null, '', h);
    broadcast();
    markOverview();
  }
  function next() {
    const it = inst[state.i];
    if (state.f < (it.sc.steps || 0)) go(state.i, state.f + 1);
    else if (state.i < inst.length - 1) go(state.i + 1, 0);
  }
  function prev() {
    if (state.f > 0) go(state.i, state.f - 1);
    else if (state.i > 0) go(state.i - 1, inst[state.i - 1].sc.steps || 0);
  }
  function fromHash() {
    const m = location.hash.match(/#\/(\d{1,2})(?:\/(\d+))?/);
    if (!m) return go(0, 0, { immediate: true });
    const n = +m[1], f = +(m[2] || 0);
    const k = inst.findIndex(it => it.sc.n === n);
    go(k < 0 ? 0 : k, f, { immediate: true });
  }

  /* ---------- overview ---------- */
  const grid = overview.querySelector('.grid');
  inst.forEach((it, k) => {
    const th = document.createElement('div'); th.className = 'th';
    const poster = it.sc.bg && it.sc.bg.poster ? '<img src="' + it.sc.bg.poster + '" alt="">' : '';
    th.innerHTML = poster + '<i>' + String(it.sc.n).padStart(2, '0') + '</i><span>' + (it.sc.title || '') + '</span>';
    th.addEventListener('click', () => { toggleOverview(false); go(k, 0); });
    grid.appendChild(th);
  });
  function markOverview() { grid.querySelectorAll('.th').forEach((t, k) => t.classList.toggle('cur', k === state.i)); }
  function toggleOverview(on) { overview.classList.toggle('on', on == null ? !overview.classList.contains('on') : on); }

  /* ---------- presenter sync ---------- */
  function broadcast() {
    if (!bc) return;
    bc.postMessage({ type: 'state', i: state.i, f: state.f, n: inst[state.i].sc.n, steps: inst[state.i].sc.steps || 0 });
  }
  if (bc) bc.onmessage = (e) => {
    const m = e.data || {};
    if (m.type === 'cmd') {
      if (m.cmd === 'next') next(); else if (m.cmd === 'prev') prev();
      else if (m.cmd === 'go') go(m.i, m.f || 0);
      else if (m.cmd === 'hello') broadcast();
    }
  };
  function openPresenter() {
    window.open('presenter.html', 'theotherday-presenter', 'width=1500,height=900');
  }

  /* ---------- keys ---------- */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (overview.classList.contains('on') && (k === 'Escape' || k === 'o' || k === 'O')) { toggleOverview(false); return; }
    switch (k) {
      case 'ArrowRight': case ' ': case 'PageDown': case 'ArrowDown': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'PageUp': case 'ArrowUp': case 'Backspace': e.preventDefault(); prev(); break;
      case 'Home': go(0, 0); break;
      case 'End': go(inst.length - 1, inst[inst.length - 1].sc.steps || 0); break;
      case 'f': case 'F': document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); break;
      case 'o': case 'O': toggleOverview(); break;
      case 'b': case 'B': case '.': black.classList.toggle('on'); break;
      case 's': case 'S': openPresenter(); break;
      case 'r': case 'R': { const it = inst[state.i]; if (it.api.reset) it.api.reset(); go(state.i, 0, { immediate: true }); break; }
      case 'm': case 'M': { const it = inst[state.i]; if (it.api.toggleSound) it.api.toggleSound(); break; }
    }
  });
  // click / touch
  let tx = 0;
  // click to advance: only on the slide itself, outside interactive regions, and only when the
  // pointer actually moved onto the stage (ignores automation / focus clicks at 0,0)
  stage.addEventListener('click', (e) => {
    if (e.target.closest('[data-noadvance], button, input, a, .no-advance, #overview, #help')) return;
    if (overview.classList.contains('on')) return;
    if (e.clientX === 0 && e.clientY === 0) return;
    if (e.detail === 0) return;
    if (/noclick=1/.test(location.search)) return;   // QA / kiosk mode: keyboard only
    next();
  });
  stage.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  stage.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 60) (dx < 0 ? next() : prev()); });
  addEventListener('hashchange', fromHash);

  /* ---------- helpers exposed to scenes ---------- */
  window.DECK = {
    go, next, prev, state, inst,
    currentIndex: () => state.i,
    isReduced: reduced,
    content: (n) => CONTENT.find(c => c.n === n),
  };

  fromHash();
})();
