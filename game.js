/* ---------- The game: state, wardrobe UI, live gauges, verdict, lookbook ---------- */
(function () {
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = o => JSON.parse(JSON.stringify(o));
  const KEY = 'fit-check-v1';
  const START = { top: 'tee', bottom: 'jeans', dress: null, layer: null, shoes: 'sneakers', socks: 'ankle', head: null, eyes: null, neck: null, bag: null, extras: [], col: {}, pat: {}, pcol: {} };
  const SLOTS = ['top', 'bottom', 'dress', 'layer', 'shoes', 'socks', 'head', 'eyes', 'neck', 'bag'];
  const TABS = [['look', 'Her look'], ['top', 'Tops'], ['bottom', 'Bottoms'], ['dress', 'Dresses'], ['layer', 'Jackets'], ['shoes', 'Shoes'], ['socks', 'Socks'], ['head', 'Headwear'], ['eyes', 'Glasses'], ['neck', 'Neckwear'], ['bag', 'Bags'], ['extras', 'Extras']];
  const NONE = { layer: 'No jacket', shoes: 'No shoes', socks: 'No socks', head: 'Nothing', eyes: 'No glasses', neck: 'Nothing', bag: 'No bag' };
  const PATTERNABLE = ['top', 'bottom', 'dress', 'layer', 'shoes', 'socks', 'head', 'bag'];
  const PERKS = { rain: 'rainproof', splash: 'splash-proof', snow: 'snow-proof', grip: 'good grip', closed: 'closed toe', sun: 'sun cover', soft: 'soft and stretchy', holds: 'fits a sketchbook', free: 'hands-free', secure: 'zips shut', smart: 'small and smart', drag: 'long hem', jangly: 'jangly', brolly: 'keeps rain off', snug: 'keeps ears warm' };
  const PLAYABLE = OCCASIONS.filter(o => !o.free);

  let S = { occ: 'school', tab: 'top', look: { name: 'Mila', skin: 1, hair: 'long', hairCol: 2, eye: 0, freckles: false }, fit: clone(START), best: {}, book: [] };
  function load() { try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (d && d.fit && d.look) { S = Object.assign(S, d); S.fit = Object.assign(clone(START), d.fit); if (!OCC[S.occ]) S.occ = 'school'; } } catch (e) { /* storage is optional */ } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage is optional */ } }

  const nm = () => (S.look.name || 'Mila').trim() || 'Mila';
  const lookOf = L => { const sk = SKINS[L.skin] || SKINS[1], hc = (HAIRCOLS[L.hairCol] || HAIRCOLS[2])[0]; return { skin: sk[0], skinShade: sk[1], hair: L.hair, hairCol: hc, eye: (EYECOLS[L.eye] || EYECOLS[0])[0], browCol: Art.mix(hc, '#1c1430', 0.42), freckles: !!L.freckles }; };
  function wearOf(fit) { const o = outfit(fit), w = { extras: o.extras.map(e => e.id) }; SLOTS.forEach(s => { if (o[s]) w[s] = { id: o[s].id, base: SWX[o.colId(s)].h, pat: o.patOf(s), pcol: SWX[o.pcolId(s)].h }; }); return w; }

  const sv = inner => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
  const ICON = {
    sun: sv('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3L7 7M17 17l1.7 1.7M18.7 5.3L17 7M7 17l-1.7 1.7"/>'),
    cloud: sv('<path d="M7 18h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7 9.2 4.4 4.4 0 0 0 7 18z"/>'),
    rain: sv('<path d="M7 14.5h10a3.6 3.6 0 0 0 .5-7.2A5 5 0 0 0 7.2 6.4 4 4 0 0 0 7 14.5z"/><path d="M8.5 17.5l-1 3M12.5 17.5l-1 3M16.5 17.5l-1 3"/>'),
    snow: sv('<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9.6 4.6L12 6.6l2.4-2M9.6 19.4l2.4-2 2.4 2"/>'),
    indoor: sv('<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>'),
    moon: sv('<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>'),
    star: sv(`<path d="${Art.star(12, 12.6, 9)}"/>`),
    none: sv('<circle cx="12" cy="12" r="8"/><path d="M6.5 17.5l11-11"/>'),
    tick: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 6.4l2.3 2.3 4.7-5"/></svg>',
    cross: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6"/></svg>',
    dash: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h6"/></svg>'
  };
  const starsHtml = n => `<span class="stars" role="img" aria-label="${n} out of 5 stars">${[1, 2, 3, 4, 5].map(i => `<svg viewBox="0 0 20 20" class="${i <= n ? 'on' : 'off'}" aria-hidden="true"><path d="${Art.star(10, 10.6, 8.6)}"/></svg>`).join('')}</span>`;

  /* ----- masthead and plans ----- */
  function renderMast() {
    $('kicker').textContent = nm() + '’s';
    $('sub').textContent = `${nm()} has a packed fortnight and no idea what to wear. Read her messages, dress her for each plan, then show her the mirror.`;
    const tot = PLAYABLE.reduce((a, o) => a + (S.best[o.id] || 0), 0);
    $('score').innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="${Art.star(10, 10.6, 8.6)}" fill="currentColor"/></svg><span>${tot} / ${PLAYABLE.length * 5} stars</span>`;
    $('nameTag').textContent = nm();
    $('doll').setAttribute('aria-label', `${nm()} in the outfit you have chosen`);
  }
  function renderDiary() {
    $('diary').innerHTML = OCCASIONS.map(o => {
      const b = S.best[o.id] || 0;
      return `<button type="button" class="day" data-occ="${o.id}" aria-pressed="${o.id === S.occ}"><span class="day-top"><span class="day-tab">${o.day}</span>${ICON[o.sky]}</span><span class="day-title">${o.title}</span>${o.free ? '<span class="day-new">Play without scores</span>' : b ? starsHtml(b) : '<span class="day-new">Not styled yet</span>'}</button>`;
    }).join('');
  }

  /* ----- her messages and live must-haves ----- */
  function mustList() {
    const oc = OCC[S.occ], o = outfit(S.fit);
    return oc.musts.concat(oc.checks).map(m => { const ok = !!m.ok(o); return `<li class="${ok ? 'done' : ''}"><span class="tick">${ICON.tick}</span><span>${m.t}<span class="sr">${ok ? ' (done)' : ' (still needed)'}</span></span></li>`; }).join('');
  }
  function renderBrief() {
    const oc = OCC[S.occ];
    let h = `<div class="brief-head"><h2>${oc.title}</h2></div><div class="brief-meta"><span class="chip">${ICON[oc.sky]}${oc.wx}</span><span class="chip">${oc.where}</span>`;
    if (!oc.free) h += `<span class="chip want">Dress level: ${oc.dressWord}</span><span class="chip want">Vibe: ${oc.vibes.map(v => VIBEWORD[v]).join(' or ')}</span>`;
    h += `</div><div class="brief-body"><div class="thread"><span class="thread-from">${esc(nm())} texted you</span>${oc.texts.map(t => `<p class="bubble">${t}</p>`).join('')}</div>`;
    if (oc.free) h += '<div class="musts"><h3>No rules today</h3><p class="musts-note">Nothing is scored here. Try the wildest mix you can think of.</p></div>';
    else h += `<div class="musts"><h3>Her must-haves</h3><ul id="musts">${mustList()}</ul><p class="musts-note">One missing must-have holds the look at 3 stars. Two hold it at 2.</p></div>`;
    $('brief').innerHTML = h + '</div>';
    $('btnShow').textContent = oc.free ? 'Save this look' : `Show ${nm()}`;
  }

  /* ----- mirror and gauges ----- */
  function renderDoll(pop) {
    $('doll').innerHTML = Art.doll(lookOf(S.look), wearOf(S.fit), { uid: 'main' });
    if (pop) { const m = $('mirror'); m.classList.remove('pop'); void m.offsetWidth; m.classList.add('pop'); }
  }
  function gauge(label, val, min, max, zone, ends, texts) {
    const pct = v => Math.max(4, Math.min(96, (v - min) / (max - min) * 100));
    let status = texts.free, cls = '';
    if (zone) { if (val < zone[0] - 1e-9) { status = texts.lo; cls = 'g-off'; } else if (val > zone[1] + 1e-9) { status = texts.hi; cls = 'g-off'; } else { status = texts.ok; cls = 'g-ok'; } }
    const z = zone ? `<i class="g-zone" style="left:${pct(zone[0]) - 3}%;width:${pct(zone[1]) - pct(zone[0]) + 6}%"></i>` : '';
    return `<div class="gauge"><div class="gauge-top"><b>${label}</b><span class="${cls}">${status}</span></div><div class="g-track">${z}<i class="g-dot" style="left:${pct(val)}%"></i></div><div class="g-ends"><span>${ends[0]}</span><span>${ends[1]}</span></div></div>`;
  }
  function renderGauges() {
    const oc = OCC[S.occ], o = outfit(S.fit), f = oc.free;
    const wWord = o.warmth <= 2 ? 'Airy' : o.warmth <= 6 ? 'Light' : o.warmth <= 10 ? 'Warm' : 'Toasty';
    const dWord = o.dressy < 1.8 ? 'Sporty' : o.dressy < 2.8 ? 'Casual' : o.dressy < 3.9 ? 'Smart' : 'Fancy';
    const mWord = ['Careful steps', 'Gentle walking', 'Walk all day', 'Ready to run'][o.move];
    $('gauges').innerHTML =
      gauge('Warmth', o.warmth, -1, 22, f ? null : oc.warm, ['cool', 'toasty'], { ok: 'Just right', lo: 'Too chilly', hi: 'Too warm', free: wWord }) +
      gauge('Dressiness', o.dressy, 1, 5, f ? null : oc.dress, ['sporty', 'fancy'], { ok: 'Just right', lo: 'Too casual', hi: 'Too fancy', free: dWord }) +
      gauge('Movement', o.move, 0, 3, f ? null : [oc.move, 3], ['careful', 'run'], { ok: oc.move ? 'Moves enough' : 'Anything goes', lo: 'Too restrictive', hi: '', free: mWord });
  }

  /* ----- wardrobe ----- */
  function renderTabs() {
    $('tabs').innerHTML = TABS.map(([k, n]) => {
      const worn = k === 'extras' ? S.fit.extras.length > 0 : (NONE[k] && S.fit[k]) || (k === 'dress' && S.fit.dress);
      return `<button type="button" class="tab" role="tab" data-tab="${k}" aria-selected="${k === S.tab}">${n}${worn ? '<span class="dot"></span><span class="sr"> (wearing one)</span>' : ''}</button>`;
    }).join('');
  }
  const pips = (n, max) => `<span class="pips" aria-hidden="true">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`;
  function tagHtml(item) {
    const clothes = ['top', 'bottom', 'dress', 'layer', 'shoes'].includes(item.slot);
    const wWord = item.w <= 0 ? 'airy' : item.w === 1 ? 'light' : item.w === 2 ? 'medium' : item.w === 3 ? 'warm' : 'very warm';
    const dWord = ['', 'sporty', 'casual', 'smart-casual', 'smart', 'fancy'][item.f] || '';
    const mWord = ['stand still', 'gentle', 'walk all day', 'run and jump'][item.m] || '';
    let rows = '';
    if (clothes || item.w > 0) rows += `<dt>Warmth</dt><dd>${pips(Math.max(0, item.w), 5)}${wWord}</dd>`;
    if (clothes) rows += `<dt>Dressy</dt><dd>${pips(item.f, 5)}${dWord}</dd><dt>Moves</dt><dd>${pips(item.m, 3)}${mWord}</dd>`;
    if (item.wild) rows += '<dt>Vibe</dt><dd>goes with everything</dd>';
    else if (item.v.length) rows += `<dt>Vibe</dt><dd>${item.v.map(v => VIBEWORD[v]).join(', ')}</dd>`;
    const perks = Object.keys(PERKS).filter(k => item[k]).map(k => `<span class="perk">${PERKS[k]}</span>`).join('');
    return `<div class="tag"><h3>${item.name}</h3><dl>${rows}</dl>${perks ? `<div class="perks">${perks}</div>` : ''}</div>`;
  }
  const swatchRow = (act, current) => `<div class="swatches">${SW.map(s => `<button type="button" class="sw" data-k="${act}:${s.id}" data-act="${act}" data-v="${s.id}" aria-pressed="${s.id === current}" aria-label="${s.n}" title="${s.n}" style="background:${s.h}"></button>`).join('')}</div>`;
  function lookPanel() {
    const L = S.look, lk = lookOf(L);
    const dots = (list, act, cur, bg) => `<div class="swatches">${list.map((c, i) => `<button type="button" class="sw" data-k="${act}:${i}" data-act="${act}" data-v="${i}" aria-pressed="${i === cur}" aria-label="${c[1] || 'Skin tone ' + (i + 1)}" title="${c[1] || 'Skin tone ' + (i + 1)}" style="background:${bg(c)}"></button>`).join('')}</div>`;
    return `<div class="look-grid">
      <div class="field"><label for="nameInput">Her name</label><input type="text" id="nameInput" maxlength="12" value="${esc(L.name)}" autocomplete="off"></div>
      <div class="field"><span class="lab">Skin tone</span>${dots(SKINS, 'skin', L.skin, c => c[0])}</div>
      <div class="field"><span class="lab">Hairstyle</span><div class="rack">${HAIRS.map(([id, n]) => `<button type="button" class="item" data-k="hair:${id}" data-act="hair" data-v="${id}" aria-pressed="${id === L.hair}"><span class="th">${Art.hairThumb(lk, id)}</span><span class="nm">${n}</span></button>`).join('')}</div></div>
      <div class="field"><span class="lab">Hair colour</span>${dots(HAIRCOLS, 'hairCol', L.hairCol, c => c[0])}</div>
      <div class="field"><span class="lab">Eye colour</span>${dots(EYECOLS, 'eye', L.eye, c => c[0])}</div>
      <div class="field"><label class="check"><input type="checkbox" id="freckles" ${L.freckles ? 'checked' : ''}> Freckles</label></div>
    </div>`;
  }
  function renderPanel() {
    const panel = $('panel'), keep = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.k : null;
    const slot = S.tab, f = S.fit;
    let h = '';
    if (slot === 'look') h = lookPanel();
    else {
      const o = outfit(f), items = ITEMS.filter(i => i.slot === slot);
      if (f.dress && (slot === 'top' || slot === 'bottom')) h += `<p class="rail-note">${esc(nm())} is wearing a dress. Pick a ${slot} to swap the dress for separates.</p>`;
      if (slot === 'dress') h += '<p class="rail-note">A dress replaces the top and bottom. Tap it again to go back to separates.</p>';
      if (slot === 'extras') h += '<p class="rail-note">Wear as many as you like, but every one counts as an accessory.</p>';
      h += '<div class="rack">';
      if (NONE[slot]) h += `<button type="button" class="item none" data-k="item:none" data-act="item" data-v="" aria-pressed="${!f[slot]}"><span class="th">${ICON.none}</span><span class="nm">${NONE[slot]}</span></button>`;
      items.forEach(i => {
        const on = slot === 'extras' ? f.extras.includes(i.id) : (slot === 'top' || slot === 'bottom') ? (!f.dress && f[slot] === i.id) : f[slot] === i.id;
        const base = slot === 'extras' ? '#ffffff' : SWX[on ? o.colId(slot) : i.col].h;
        h += `<button type="button" class="item" data-k="item:${i.id}" data-act="item" data-v="${i.id}" aria-pressed="${on}"><span class="th">${Art.thumb(slot, i.id, base)}</span><span class="nm">${i.name}</span></button>`;
      });
      h += '</div>';
      if (slot === 'extras') { const worn = o.extras; h += `<div class="custom">${worn.length ? worn.map(tagHtml).join('') : '<p class="empty">Pick a little extra to read its tag.</p>'}</div>`; }
      else {
        const cur = o[slot];
        if (!cur) h += `<div class="custom"><p class="empty">${f.dress && (slot === 'top' || slot === 'bottom') ? '' : 'Pick something from the rail to see its tag and choose a colour.'}</p></div>`;
        else {
          const pat = o.patOf(slot), base = SWX[o.colId(slot)], canPat = PATTERNABLE.includes(slot) || cur.fabric;
          let picks = `<div class="pick"><h3>Colour<b>${base.n}</b></h3>${swatchRow('col', base.id)}</div>`;
          if (canPat) {
            const ink = SWX[o.pcolId(slot)];
            picks += `<div class="pick"><h3>Pattern</h3><div class="pats">${PATTERNS.map(([k, n]) => `<button type="button" class="pat" data-k="pat:${k}" data-act="pat" data-v="${k}" aria-pressed="${k === pat}"><svg viewBox="0 0 52 34" aria-hidden="true">${k === 'solid' ? '' : `<defs>${Art.patDef('pv-' + k, k, base.h, ink.h)}</defs>`}<rect width="52" height="34" fill="${k === 'solid' ? base.h : `url(#pv-${k})`}" stroke="${Art.INK}" stroke-width="2"/></svg>${n}</button>`).join('')}</div></div>`;
            if (pat !== 'solid') picks += `<div class="pick"><h3>Pattern colour<b>${ink.n}</b></h3>${swatchRow('pcol', ink.id)}</div>`;
          }
          h += `<div class="custom">${tagHtml(cur)}<div class="picks">${picks}</div></div>`;
        }
      }
    }
    panel.innerHTML = h;
    if (keep) { const el = panel.querySelector(`[data-k="${keep}"]`); if (el) el.focus({ preventScroll: true }); }
  }

  /* ----- lookbook ----- */
  function renderBook() {
    $('bookNote').textContent = S.book.length ? `${S.book.length} saved look${S.book.length > 1 ? 's' : ''}. Kept in this browser.` : '';
    if (!S.book.length) { $('book').innerHTML = `<p class="book-empty"><b>No saved looks yet.</b> After you show ${esc(nm())} an outfit, choose “Save to lookbook” and it will be pinned here with its score, ready to wear again.</p>`; return; }
    $('book').innerHTML = '<div class="book-grid">' + S.book.map((b, i) => `<article class="snap"><div class="pic"><svg viewBox="20 0 260 500" role="img" aria-label="Saved outfit">${Art.doll(lookOf(b.look), wearOf(b.fit), { uid: 'b' + b.id, mood: b.stars === 5 ? 'grin' : 'smile' })}</svg></div><h3>${OCC[b.occ] ? OCC[b.occ].title : 'Free style'}</h3><div class="snap-row">${b.stars ? starsHtml(b.stars) + `<span>${b.total}</span>` : '<span>Free style</span>'}</div><div class="snap-btns"><button type="button" class="mini" data-wear="${i}">Wear again</button><button type="button" class="mini" data-del="${i}">Remove</button></div></article>`).join('') + '</div>';
  }
  function saveLook(r) {
    S.book.unshift({ id: Date.now(), occ: S.occ, fit: clone(S.fit), look: clone(S.look), total: r ? r.total : null, stars: r ? r.stars : null });
    S.book = S.book.slice(0, 24); save(); renderBook();
  }
  let toastT = null;
  function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 2400); }

  /* ----- the verdict ----- */
  let lastFocus = null, lastReport = null;
  function showReport() {
    const oc = OCC[S.occ];
    if (oc.free) { saveLook(null); toast('Saved to the lookbook'); return; }
    const r = judge(S.fit, oc); lastReport = r;
    const prev = S.best[oc.id] || 0, isBest = r.stars > prev;
    if (isBest) S.best[oc.id] = r.stars;
    save(); renderDiary(); renderMast();
    const noteIcon = n => n.ok === true ? `<i class="n-ok">${ICON.tick}</i>` : n.ok === false ? `<i class="n-no">${ICON.cross}</i>` : `<i class="n-meh">${ICON.dash}</i>`;
    const next = [48, 64, 78, 90].find(t => t > r.total);
    let cap;
    if (r.stars === 5) cap = `<b>Five stars.</b> ${esc(nm())} is walking out of the door in this.`;
    else if (r.capped) cap = `<b>${r.missed} must-have${r.missed > 1 ? 's' : ''} missing.</b> That holds this look at ${r.cap} star${r.cap > 1 ? 's' : ''}, however good the rest is.`;
    else cap = `<b>${next - r.total} more point${next - r.total > 1 ? 's' : ''}</b> for ${r.stars + 1} stars.`;
    if (isBest && prev) cap += ' New best for this plan.';
    const face = Art.doll(lookOf(S.look), wearOf(S.fit), { uid: 'rep', mood: r.mood });
    $('report').innerHTML = `<div class="rep-card" role="dialog" aria-modal="true" aria-labelledby="repTitle" tabindex="-1" id="repCard">
      ${r.stars === 5 ? '<div class="confetti" id="confetti" aria-hidden="true"></div>' : ''}
      <div class="rep-top"><div class="rep-face"><svg viewBox="62 6 176 196" role="img" aria-label="${esc(nm())} reacting">${face}</svg></div>
        <div class="rep-chat"><span class="thread-from" id="repTitle">${esc(nm())} on “${oc.title}”</span>${r.bubbles.map(b => `<p class="bubble">${b}</p>`).join('')}</div></div>
      <div class="rep-score"><div class="rep-num" id="repNum">0<small>/ 100</small></div>${starsHtml(r.stars)}<p class="rep-cap">${cap}</p></div>
      <div class="rep-cats">${r.cats.map(c => `<section class="cat"><div class="cat-top"><h3>${c.label}</h3><span>${c.score} / 20</span></div><div class="bar"><i data-w="${c.score * 5}"></i></div><ul>${c.notes.map(n => `<li>${noteIcon(n)}<span>${n.t}</span></li>`).join('')}</ul></section>`).join('')}
        <aside class="tip"><small>Stylist’s notebook</small><h3>${r.tip[0]}</h3><p>${r.tip[1]}</p></aside></div>
      <div class="rep-actions"><button type="button" class="btn" id="repBack">Keep styling</button><button type="button" class="btn" id="repSave">Save to lookbook</button><button type="button" class="btn primary" id="repNext">Next plan</button></div>
    </div>`;
    lastFocus = document.activeElement;
    $('report').hidden = false; document.documentElement.style.overflow = 'hidden';
    $('repCard').focus({ preventScroll: true }); $('report').scrollTop = 0;
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => { document.querySelectorAll('#report .bar i').forEach(b => { b.style.width = b.dataset.w + '%'; }); });
    const num = $('repNum').firstChild;
    if (still) num.textContent = r.total; else { const t0 = performance.now(); const step = t => { const k = Math.min(1, (t - t0) / 700); num.textContent = Math.round(r.total * (1 - Math.pow(1 - k, 3))); if (k < 1 && !$('report').hidden) requestAnimationFrame(step); else num.textContent = r.total; }; requestAnimationFrame(step); }
    if (r.stars === 5 && !still) { const cols = ['#FF6F3D', '#D8F25A', '#E8468F', '#1F9C9A', '#F7CD3C', '#7A50C8']; let c = ''; for (let i = 0; i < 34; i++) c += `<i style="left:${(Math.random() * 100).toFixed(1)}%;background:${cols[i % cols.length]};animation-delay:${(Math.random() * 0.5).toFixed(2)}s;transform:rotate(${(Math.random() * 90) | 0}deg)"></i>`; $('confetti').innerHTML = c; }
  }
  function closeReport() { $('report').hidden = true; $('report').innerHTML = ''; document.documentElement.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }

  /* ----- actions ----- */
  function refresh(pop) { renderDoll(pop); renderGauges(); const m = $('musts'); if (m) m.innerHTML = mustList(); renderTabs(); renderPanel(); save(); }
  function setOcc(id) { S.occ = id; renderDiary(); renderBrief(); renderGauges(); save(); }
  function pickItem(slot, id) {
    const f = S.fit;
    if (slot === 'extras') { const i = f.extras.indexOf(id); if (i >= 0) f.extras.splice(i, 1); else f.extras.push(id); }
    else if (slot === 'dress') f.dress = f.dress === id ? null : id;
    else if (slot === 'top' || slot === 'bottom') { f[slot] = id; f.dress = null; }
    else f[slot] = id && f[slot] !== id ? id : null;      // tapping the worn piece again takes it off
    refresh(true);
  }
  function surprise() {
    const r = a => a[(Math.random() * a.length) | 0], by = s => ITEMS.filter(i => i.slot === s).map(i => i.id), f = clone(START);
    f.top = r(by('top')); f.bottom = r(by('bottom')); if (Math.random() < 0.3) f.dress = r(by('dress'));
    f.layer = Math.random() < 0.45 ? r(by('layer')) : null; f.shoes = r(by('shoes')); f.socks = Math.random() < 0.7 ? r(by('socks')) : null;
    ['head', 'eyes', 'neck', 'bag'].forEach(s => { f[s] = Math.random() < 0.35 ? r(by(s)) : null; });
    f.extras = by('extras').filter(() => Math.random() < 0.15);
    ['top', 'bottom', 'dress', 'layer', 'shoes', 'bag', 'head'].forEach(s => { if (Math.random() < 0.6) f.col[s] = r(SW).id; });
    ['top', 'bottom', 'dress'].forEach(s => { if (Math.random() < 0.25) { f.pat[s] = r(PATTERNS)[0]; } });
    S.fit = f; refresh(true);
  }

  function init() {
    renderMast(); renderDiary(); renderBrief(); renderDoll(false); renderGauges(); renderTabs(); renderPanel(); renderBook();
    $('diary').addEventListener('click', e => { const b = e.target.closest('[data-occ]'); if (b) setOcc(b.dataset.occ); });
    $('tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) { S.tab = b.dataset.tab; renderTabs(); renderPanel(); const t = $('tabs').querySelector('[aria-selected="true"]'); if (t) t.focus({ preventScroll: true }); save(); } });
    $('panel').addEventListener('click', e => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const act = b.dataset.act, v = b.dataset.v, slot = S.tab;
      if (act === 'item') pickItem(slot, v);
      else if (act === 'col') { S.fit.col[slot] = v; refresh(true); }
      else if (act === 'pat') { S.fit.pat[slot] = v; refresh(true); }
      else if (act === 'pcol') { S.fit.pcol[slot] = v; refresh(true); }
      else if (act === 'hair') { S.look.hair = v; renderDoll(true); renderPanel(); save(); }
      else if (['skin', 'hairCol', 'eye'].includes(act)) { S.look[act] = +v; renderDoll(true); renderPanel(); save(); }
    });
    $('panel').addEventListener('input', e => {
      if (e.target.id === 'nameInput') { S.look.name = e.target.value.slice(0, 12); renderMast(); renderBrief(); if (!S.book.length) renderBook(); save(); }
      if (e.target.id === 'freckles') { S.look.freckles = e.target.checked; renderDoll(false); save(); }
    });
    $('btnShow').addEventListener('click', showReport);
    $('btnRandom').addEventListener('click', surprise);
    $('btnReset').addEventListener('click', () => { S.fit = clone(START); refresh(true); toast('Back to the plain tee and jeans'); });
    $('report').addEventListener('click', e => {
      if (e.target.id === 'report' || e.target.id === 'repBack') return closeReport();
      if (e.target.id === 'repSave') { saveLook(lastReport); e.target.disabled = true; e.target.textContent = 'Saved'; return; }
      if (e.target.id === 'repNext') { const i = PLAYABLE.findIndex(o => o.id === S.occ); closeReport(); setOcc(PLAYABLE[(i + 1) % PLAYABLE.length].id); const d = $('diary').querySelector('[aria-pressed="true"]'); if (d && d.scrollIntoView) d.scrollIntoView({ block: 'nearest', inline: 'center' }); $('brief').scrollIntoView({ block: 'start', behavior: 'auto' }); }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('report').hidden) closeReport(); });
    $('book').addEventListener('click', e => {
      const w = e.target.closest('[data-wear]'), d = e.target.closest('[data-del]');
      if (w) { const b = S.book[+w.dataset.wear]; S.fit = Object.assign(clone(START), clone(b.fit)); if (OCC[b.occ]) setOcc(b.occ); refresh(true); $('brief').scrollIntoView({ block: 'start' }); toast('She is wearing it again'); }
      if (d) { S.book.splice(+d.dataset.del, 1); save(); renderBook(); }
    });
  }

  load();
  const hot = window.claude && window.claude.hot;
  if (hot && hot.snapshot) hot.snapshot(() => ({ S }));
  const start = d => { if (d && d.S && d.S.fit) S = Object.assign(S, d.S); init(); };
  if (hot && hot.ready) hot.ready(start); else start((hot && hot.data) || {});
})();
