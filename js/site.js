/* Wspólny nagłówek, stopka, menu i galerie. Menu zmieniasz TUTAJ — działa na wszystkich stronach. */
(function () {
  const S = window.SITE;
  const page = location.pathname.split('/').pop() || 'index.html';
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Nagłówek i stopka ---------- */
  const sub = (file, items) => `<ul class="dropdown-menu">${items.map(([h, t]) => `<li><a href="${file}#${h}">${t}</a></li>`).join('')}</ul>`;
  const link = (file, text) => `<a href="${file}"${page === file ? ' class="current"' : ''}>${text}</a>`;

  const galleriesSub = sub('galerie.html', S.galleries.map((g) => [g.id, esc(g.title)]));
  const aboutSub = sub('o-mnie.html', [['biografia', 'Biografia'], ['sprzet', 'Sprzęt fotograficzny'], ['osiagniecia', 'Osiągnięcia']]);

  const header = `
    <a href="index.html" class="brand">
      ${S.avatar ? `<img src="${esc(S.avatar)}" alt="${esc(S.name)}" class="brand-avatar">` : ''}
      <div class="brand-text"><h1>${esc(S.name)}</h1><p>${esc(S.tagline)}</p></div>
    </a>
    <button class="menu-toggle" id="mobile-menu" aria-label="Menu"><span></span><span></span><span></span></button>
    <nav id="nav-menu"><ul>
      <li class="has-dropdown">${link('o-mnie.html', 'O mnie &#9663;')}${aboutSub}</li>
      <li class="has-dropdown">${link('galerie.html', 'Galerie &#9663;')}${galleriesSub}</li>
      <li>${link('blog.html', 'Blog')}</li>
      <li>${link('warsztaty.html', 'Warsztaty')}</li>
      <li>${link('sklep.html', 'Sklep')}</li>
      <li>${link('ebooki.html', 'Ebooki')}</li>
      <li>${link('wydruki.html', 'Wydruki zdjęć')}</li>
      <li>${link('wspolpraca.html', 'Współpraca')}</li>
      <li>${link('kontakt.html', 'Kontakt')}</li>
    </ul></nav>`;

  const socials = [['Instagram', S.instagram], ['Facebook', S.facebook], ['500px', S.px500]]
    .filter(([, url]) => url)
    .map(([n, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${n}</a>`).join('');

  const footer = `
    ${socials ? `<div class="social">${socials}</div>` : ''}
    <p>&copy; ${new Date().getFullYear()} ${esc(S.name)} (Pjotografia). Wszelkie prawa zastrzeżone.</p>`;

  const h = document.createElement('header');
  h.className = 'site-header';
  h.innerHTML = header;
  document.body.prepend(h);

  const f = document.createElement('footer');
  f.className = 'site-footer';
  f.innerHTML = footer;
  document.body.appendChild(f);

  document.getElementById('mobile-menu').addEventListener('click', () => document.getElementById('nav-menu').classList.toggle('active'));

  // Na stronie głównej nagłówek jest przezroczysty, dopóki się nie przewinie
  const onScroll = () => h.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Pobieranie zdjęć ---------- */
  const cdn = (p, t) => `https://res.cloudinary.com/${S.cloudName}/image/upload/${t}/v${p.version}/${p.public_id}.${p.format}`;
  const prettify = (id) => id.split('/').pop().replace(/[_-]+/g, ' ').replace(/\s+\d{6,}$/, '').trim();

  async function fromCloudinary(tag) {
    const r = await fetch(`https://res.cloudinary.com/${S.cloudName}/image/list/${encodeURIComponent(tag)}.json`);
    if (!r.ok) throw new Error('Cloudinary ' + r.status);
    const j = await r.json();
    return j.resources
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
      .map((p) => ({
        thumb: cdn(p, 'f_auto,q_auto,w_900'),
        full: cdn(p, 'f_auto,q_auto,w_2200'),
        title: (p.context && p.context.custom && p.context.custom.caption) || prettify(p.public_id)
      }));
  }

  let fallback;
  async function fromLocal(tag) {
    fallback = fallback || fetch('data/photos.json').then((r) => r.json());
    return (await fallback).filter((p) => p.tags.includes(tag)).map((p) => ({ thumb: p.src, full: p.src, title: p.title }));
  }

  async function loadPhotos(tag) {
    if (S.cloudName) {
      try { return await fromCloudinary(tag); } catch (e) { console.warn('Cloudinary niedostępne, używam zdjęć zastępczych:', e.message); }
    }
    return fromLocal(tag);
  }

  /* ---------- Siatka + lightbox ---------- */
  let lbList = [], lbIdx = 0, lb;
  function buildLightbox() {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Zamknij">&times;</button><button class="lb-btn lb-prev" aria-label="Poprzednie">&#8249;</button><img alt=""><button class="lb-btn lb-next" aria-label="Następne">&#8250;</button><div class="cap"></div>';
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-close')) closeLb(); });
    lb.querySelector('.lb-prev').addEventListener('click', () => step(-1));
    lb.querySelector('.lb-next').addEventListener('click', () => step(1));
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
  function showLb() {
    const p = lbList[lbIdx];
    lb.querySelector('img').src = p.full;
    lb.querySelector('img').alt = p.title;
    lb.querySelector('.cap').textContent = p.title;
  }
  function openLb(list, i) { if (!lb) buildLightbox(); lbList = list; lbIdx = i; showLb(); lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function step(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; showLb(); }

  function renderGrid(el, photos) {
    if (!photos.length) { el.innerHTML = '<p class="empty">Wkrótce pojawią się tu zdjęcia.</p>'; return; }
    el.classList.add('masonry');
    el.innerHTML = '';
    photos.forEach((p, i) => {
      const fig = document.createElement('figure');
      fig.className = 'shot';
      fig.innerHTML = `<img loading="lazy" alt="${esc(p.title)}" src="${esc(p.thumb)}"><figcaption>${esc(p.title)}</figcaption>`;
      fig.querySelector('img').addEventListener('load', (e) => e.target.classList.add('loaded'));
      fig.addEventListener('click', () => openLb(photos, i));
      el.appendChild(fig);
    });
  }

  // Udostępnione stronom
  window.PJ = { loadPhotos, renderGrid };

  // Karty galerii na stronie głównej
  const cardsEl = document.querySelector('[data-gallery-cards]');
  if (cardsEl) {
    cardsEl.innerHTML = S.galleries.map((g) => `
      <a class="card" href="galerie.html#${esc(g.id)}" data-cover="${esc(g.tag)}">
        <div class="cover"></div>
        <div class="body"><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p></div>
      </a>`).join('');
  }

  // Pełne sekcje galerii na stronie Galerie
  const sectionsEl = document.querySelector('[data-gallery-sections]');
  if (sectionsEl) {
    sectionsEl.innerHTML = S.galleries.map((g) => `
      <h3 class="section-title" id="${esc(g.id)}">${esc(g.title)}</h3>
      <p class="section-desc">${esc(g.description)}</p>
      <div data-gallery="${esc(g.tag)}"></div>`).join('');
  }

  // Automatycznie wypełnij każdy element <div data-gallery="tag" data-limit="9">
  document.querySelectorAll('[data-gallery]').forEach(async (el) => {
    const photos = await loadPhotos(el.dataset.gallery);
    renderGrid(el, el.dataset.limit ? photos.slice(0, +el.dataset.limit) : photos);
  });

  // Okładki kart galerii: <a class="card" data-cover="tag">
  document.querySelectorAll('[data-cover]').forEach(async (el) => {
    const photos = await loadPhotos(el.dataset.cover);
    if (photos[0]) el.querySelector('.cover').style.backgroundImage = `url('${photos[0].thumb}')`;
  });
})();
