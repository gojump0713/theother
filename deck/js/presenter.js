/* Presenter window: mirrors main deck via BroadcastChannel, shows script + cues + timers */
(function () {
  const bc = new BroadcastChannel('theotherday');
  const $ = id => document.getElementById(id);
  const cur = $('cur'), nxt = $('nxt');
  const ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]; // slide n by index
  let st = { i: 0, f: 0, n: 0, steps: 0 };
  let t0 = null, slideT0 = null, lastN = null;

  // Map fragment -> script paragraph index (approx: paragraphs spread across fragments)
  function paraForFragment(c, f, steps) {
    if (!c) return -1;
    const L = c.script.length; if (!L) return -1;
    if (!steps) return Math.min(L - 1, f);
    return Math.min(L - 1, Math.round(f / steps * (L - 1)));
  }
  function render() {
    const c = window.CONTENT.find(x => x.n === st.n);
    $('cur-n').textContent = String(st.n).padStart(2, '0');
    $('cur-f').textContent = 'fragment ' + st.f + ' / ' + st.steps;
    if (!c) {
      $('s-title').textContent = st.n === 0 ? '표지 / 대기' : '';
      $('s-gov').textContent = st.n === 0 ? '증명한 기술을, 모두가 누리는 서비스로.' : '';
      $('s-body').innerHTML = st.n === 0 ? '<p class="line cur">→ 또는 Space로 시작합니다. 첫 멘트: "안녕하십니까. 오늘은 틸론이 어떤 서비스를 출시하는지에 앞서…"</p>' : '';
      $('s-cue').textContent = '발표 시작 전 대기 화면입니다. 타이머는 01장 진입 시 자동 시작됩니다.';
      $('s-review').textContent = '';
      $('t-target').textContent = '–';
      return;
    }
    $('s-title').textContent = String(c.n).padStart(2, '0') + ' · ' + c.title;
    $('s-gov').textContent = c.gov;
    const pi = paraForFragment(c, st.f, st.steps);
    $('s-body').innerHTML = c.script.map((p, i) => '<p class="line' + (i === pi ? ' cur' : '') + '">' + p + '</p>').join('');
    const el = $('s-body').querySelector('.cur'); if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    $('s-cue').textContent = c.cue || '';
    $('s-review').textContent = c.review || '';
    $('t-target').textContent = fmt(c.targetSec);
  }
  function fmt(s) { s = Math.max(0, Math.round(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
  function tick() {
    const now = Date.now();
    if (t0) {
      const el = (now - t0) / 1000;
      $('t-total').textContent = fmt(el);
      $('t-left').textContent = (el > 1200 ? '-' : '') + fmt(Math.abs(1200 - el));
    }
    const c = window.CONTENT.find(x => x.n === st.n);
    if (slideT0 && c) {
      const el = (now - slideT0) / 1000;
      $('t-slide').textContent = fmt(el);
      const box = $('t-slide-box');
      box.classList.toggle('warn', el > c.targetSec && el <= c.targetSec + 15);
      box.classList.toggle('over', el > c.targetSec + 15);
    }
    requestAnimationFrame(tick);
  }
  function onState(m) {
    st = m;
    if (m.n >= 1 && !t0) t0 = Date.now();
    if (m.n !== lastN) { slideT0 = Date.now(); lastN = m.n; }
    // mirror frames
    const h = '#/' + String(m.n).padStart(2, '0') + (m.f ? '/' + m.f : '');
    if (cur.contentWindow) cur.contentWindow.location.hash = h;
    const nn = Math.min(16, m.n + 1);
    if (nxt.contentWindow) nxt.contentWindow.location.hash = '#/' + String(nn).padStart(2, '0');
    render();
  }
  bc.onmessage = e => { if (e.data && e.data.type === 'state') onState(e.data); };
  bc.postMessage({ type: 'cmd', cmd: 'hello' });
  $('b-next').onclick = () => bc.postMessage({ type: 'cmd', cmd: 'next' });
  $('b-prev').onclick = () => bc.postMessage({ type: 'cmd', cmd: 'prev' });
  $('b-reset').onclick = () => { t0 = st.n >= 1 ? Date.now() : null; slideT0 = Date.now(); };
  addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); bc.postMessage({ type: 'cmd', cmd: 'next' }); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); bc.postMessage({ type: 'cmd', cmd: 'prev' }); }
    else if (e.key === 't' || e.key === 'T') $('b-reset').click();
    else if (e.key === 'n' || e.key === 'N') { const d = document.querySelector('details.review'); d.open = !d.open; }
  });
  render(); tick();
})();
