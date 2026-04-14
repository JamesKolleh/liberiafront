// LiberiaFront — Main App Logic
// Production: replace ARTICLES with fetch('/api/articles') calls to your scraper

let currentCat = 'all';
let currentPage = 1;
const PAGE_SIZE = 8;
let filteredArticles = [];
let deferredPrompt = null;
let searchActive = false;

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  setLiveDate();
  buildTicker();
  renderFeed('all');
  setupNav();
  setupSearch();
  setupInstallBanner();
  setupOfflineDetection();
  registerServiceWorker();
});

// ============ DATE ============
function setLiveDate() {
  const el = document.getElementById('live-date');
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }).toUpperCase();
}

// ============ TICKER ============
function buildTicker() {
  const track = document.getElementById('tickerTrack');
  if (!TICKER_ITEMS.length) {
    document.querySelector('.breaking-ticker').style.display = 'none';
    return;
  }
  track.innerHTML = TICKER_ITEMS.map(h => `<span>${h}</span>`).join('');
}

// ============ NAV ============
function setupNav() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      currentPage = 1;
      clearSearch();
      renderFeed(currentCat);
    });
  });
}

// ============ SEARCH ============
function setupSearch() {
  const toggle = document.getElementById('searchToggle');
  const bar = document.getElementById('searchBar');
  const input = document.getElementById('searchInput');
  const close = document.getElementById('searchClose');

  toggle.addEventListener('click', () => {
    bar.classList.toggle('open');
    if (bar.classList.contains('open')) input.focus();
    else clearSearch();
  });

  close.addEventListener('click', () => {
    bar.classList.remove('open');
    clearSearch();
  });

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = input.value.trim();
      if (q.length > 1) {
        searchActive = true;
        renderSearch(q);
      } else {
        searchActive = false;
        renderFeed(currentCat);
      }
    }, 280);
  });
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  searchActive = false;
  renderFeed(currentCat);
}

function renderSearch(query) {
  const q = query.toLowerCase();
  const results = ARTICLES.filter(a =>
    a.headline.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.source.toLowerCase().includes(q) ||
    a.category.toLowerCase().includes(q)
  );

  document.getElementById('heroSection').innerHTML = `
    <div class="search-results-header">
      <div class="search-results-title">Results for "${query}"</div>
      <div class="search-results-count">${results.length} stor${results.length === 1 ? 'y' : 'ies'} found</div>
    </div>
  `;

  const grid = document.getElementById('contentGrid');
  document.getElementById('loadMoreBtn').style.display = 'none';

  if (!results.length) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-state-title">No stories found</div>
      <p>Try a different search — politics, MTN, Nimba, sports…</p>
    </div>`;
    return;
  }

  grid.innerHTML = `
    <div class="section-label">Search results</div>
    <div class="articles-row">${results.map(a => articleCard(a)).join('')}</div>
  `;
}

// ============ FEED RENDER ============
function renderFeed(cat) {
  filteredArticles = cat === 'all'
    ? [...ARTICLES]
    : ARTICLES.filter(a => a.category === cat);

  filteredArticles.sort((a, b) => b.timeMs - a.timeMs);

  renderHero(filteredArticles);
  renderGrid(filteredArticles, 1);
  document.getElementById('loadMoreBtn').style.display =
    filteredArticles.length > 3 + PAGE_SIZE ? 'inline-block' : 'none';
}

function renderHero(articles) {
  const heroEl = document.getElementById('heroSection');

  if (!articles.length) {
    heroEl.innerHTML = `<div class="empty-state">
      <div class="empty-state-title">No stories in this category yet</div>
      <p>Check back soon — we update every 30 minutes.</p>
    </div>`;
    return;
  }

  const main = articles[0];
  const sides = articles.slice(1, 4);

  heroEl.innerHTML = `
    <div class="hero-grid">
      <div class="hero-main fade-in" onclick="openArticle(${main.id})">
        <img class="article-image" src="${main.image}" alt="${main.headline}" loading="eager" onerror="this.style.background='#e8e3db'" />
        <div class="article-meta">
          <span class="source-badge">${main.source}</span>
          <span class="cat-badge">${catLabel(main.category)}</span>
          <span class="article-time">${main.time}</span>
        </div>
        <div class="article-headline">${main.headline}</div>
        <div class="article-excerpt">${main.excerpt}</div>
      </div>
      <div class="hero-sidebar">
        ${sides.map((a, i) => `
          <div class="hero-side-item fade-in" style="animation-delay:${(i+1)*0.08}s" onclick="openArticle(${a.id})">
            <div class="article-meta">
              <span class="source-badge">${a.source}</span>
              <span class="cat-badge">${catLabel(a.category)}</span>
              <span class="article-time">${a.time}</span>
            </div>
            <div class="article-headline">${a.headline}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderGrid(articles, page) {
  currentPage = page;
  const gridEl = document.getElementById('contentGrid');
  const start = 4; // skip hero articles
  const end = start + page * PAGE_SIZE;
  const slice = articles.slice(start, end);

  if (!slice.length) {
    gridEl.innerHTML = '';
    document.getElementById('loadMoreBtn').style.display = 'none';
    return;
  }

  // Group by category for sectioned display
  const grouped = {};
  slice.forEach(a => {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  });

  let html = '';
  const cats = Object.keys(grouped);

  cats.forEach((cat, ci) => {
    const items = grouped[cat];
    html += `<div class="section-label">${catLabel(cat)}</div>`;
    html += `<div class="articles-row">${items.map(a => articleCard(a)).join('')}</div>`;

    // Insert ad slot after 2nd category
    if (ci === 1) html += adSlot();
  });

  gridEl.innerHTML = html;

  document.getElementById('loadMoreBtn').style.display =
    articles.slice(start, end + PAGE_SIZE).length > 0 ? 'inline-block' : 'none';
}

function loadMore() {
  renderGrid(filteredArticles, currentPage + 1);
  document.getElementById('loadMoreBtn').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showHome() {
  document.querySelectorAll('.cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === 'all');
  });
  currentCat = 'all';
  clearSearch();
  renderFeed('all');
}

// ============ ARTICLE CARD ============
function articleCard(a) {
  return `
    <div class="article-card fade-in" onclick="openArticle(${a.id})">
      <img class="article-image" src="${a.image}" alt="${a.headline}" loading="lazy" onerror="this.style.background='#e8e3db'" />
      <div class="article-meta">
        <span class="source-badge">${a.source}</span>
        <span class="cat-badge">${catLabel(a.category)}</span>
        <span class="article-time">${a.time}</span>
      </div>
      <div class="article-headline">${a.headline}</div>
      <div class="article-excerpt">${a.excerpt}</div>
    </div>
  `;
}

// ============ AD SLOT ============
function adSlot() {
  return `
    <div class="ad-slot">
      <div>
        <div class="ad-slot-label">Sponsored</div>
        <div class="ad-slot-title">Advertise your business to all of Liberia</div>
        <div class="ad-slot-sub">Reach 50,000+ monthly readers — Monrovia & diaspora</div>
      </div>
      <button class="ad-cta" onclick="alert('Contact us at ads@liberiafront.com')">Get listed</button>
    </div>
  `;
}

// ============ ARTICLE MODAL ============
function openArticle(id) {
  const a = ARTICLES.find(x => x.id === id);
  if (!a) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-sheet">
      <button class="modal-close" onclick="closeModal()">×</button>
      <img class="modal-img" src="${a.image}" alt="${a.headline}" onerror="this.style.display='none'" />
      <div class="modal-meta">
        <div class="article-meta">
          <span class="source-badge">${a.source}</span>
          <span class="cat-badge">${catLabel(a.category)}</span>
          <span class="article-time">${a.time}</span>
        </div>
      </div>
      <div class="modal-headline">${a.headline}</div>
      <div class="modal-excerpt">${a.excerpt}</div>
      <p style="font-size:13px;color:#888;font-family:var(--mono);margin-bottom:12px;">
        This is a summary. Read the full story on ${a.source}.
      </p>
      <button class="modal-read-btn" onclick="window.open('${a.sourceUrl}', '_blank')">
        Read full story on ${a.source} →
      </button>
    </div>
  `;
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
}

// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ============ HELPERS ============
function catLabel(cat) {
  const labels = {
    politics: 'Politics', business: 'Business', sports: 'Sports',
    health: 'Health', diaspora: 'Diaspora', county: 'Counties',
    entertainment: 'Culture'
  };
  return labels[cat] || cat;
}

// ============ PWA INSTALL ============
function setupInstallBanner() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    const banner = document.getElementById('installBanner');
    if (!localStorage.getItem('lf_install_dismissed')) {
      setTimeout(() => banner.classList.add('show'), 3000);
    }
  });

  document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      document.getElementById('installBanner').classList.remove('show');
    }
    deferredPrompt = null;
  });

  document.getElementById('installDismiss').addEventListener('click', () => {
    document.getElementById('installBanner').classList.remove('show');
    localStorage.setItem('lf_install_dismissed', '1');
  });
}

// ============ OFFLINE DETECTION ============
function setupOfflineDetection() {
  const bar = document.getElementById('offlineBar');
  window.addEventListener('offline', () => bar.classList.add('show'));
  window.addEventListener('online', () => bar.classList.remove('show'));
  if (!navigator.onLine) bar.classList.add('show');
}

// ============ SERVICE WORKER ============
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

