# LiberiaFront — Liberian News Aggregator PWA

A production-ready Progressive Web App that aggregates news from Liberia's top publications. Works offline, installable on Android/iOS, and optimized for low-bandwidth connections.

---

## What's included

- **Full PWA** — installable on Android/iOS from browser, works offline
- **Service Worker** — caches all assets + images for offline reading
- **24 seed articles** across 7 categories (Politics, Business, Sports, Health, Diaspora, Counties, Culture)
- **Breaking news ticker** — auto-scrolling headlines
- **Category navigation** — filter by topic
- **Search** — live search across all articles
- **Article modal** — preview + link to source
- **Ad slot** — built-in sponsor banner slot
- **Push notifications** — infrastructure ready (needs backend)
- **Dark mode** — automatic via prefers-color-scheme

---

## Project structure

```
liberia-news/
├── index.html              # App shell
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── src/
│   ├── style.css           # All styles
│   ├── app.js              # App logic
│   └── data/
│       └── articles.js     # Seed articles (replace with API)
```

---

## Quick deploy (Netlify — free)

1. Create account at netlify.com
2. Drag the entire `liberia-news/` folder into the Netlify deploy dropzone
3. Your site is live instantly at a `.netlify.app` URL
4. Add custom domain (liberiafront.com) in Netlify settings

**That's it. No server, no backend needed for the MVP.**

---

## Connecting a real RSS scraper (production step)

Replace the static `articles.js` with a live API. Here's a simple Node.js scraper to run on Railway ($5/month):

### 1. Install dependencies
```bash
npm install rss-parser axios cheerio node-cron
```

### 2. Scraper script (scraper.js)
```javascript
const Parser = require('rss-parser');
const cron = require('node-cron');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const parser = new Parser();

const FEEDS = [
  { url: 'https://frontpageafricaonline.com/feed/', source: 'FrontPage Africa', category: 'politics' },
  { url: 'https://www.bushchicken.com/feed/', source: 'Bush Chicken', category: 'politics' },
  { url: 'https://thenewdawnliberia.com/feed/', source: 'New Dawn', category: 'politics' },
  // Add more feeds here
];

async function scrapeFeeds() {
  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 10)) {
        await supabase.from('articles').upsert({
          headline: item.title,
          excerpt: item.contentSnippet?.slice(0, 280),
          source: feed.source,
          sourceUrl: item.link,
          category: feed.category,
          image: extractImage(item),
          publishedAt: item.isoDate,
        }, { onConflict: 'sourceUrl' });
      }
    } catch (err) {
      console.error(`Failed to scrape ${feed.source}:`, err.message);
    }
  }
}

function extractImage(item) {
  const content = item['content:encoded'] || item.content || '';
  const match = content.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

// Run every 30 minutes
cron.schedule('*/30 * * * *', scrapeFeeds);
scrapeFeeds(); // Run immediately on start
```

### 3. API endpoint (api.js)
```javascript
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const app = express();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/articles', async (req, res) => {
  const { cat, q, page = 1 } = req.query;
  let query = supabase.from('articles').select('*').order('publishedAt', { ascending: false });
  if (cat && cat !== 'all') query = query.eq('category', cat);
  if (q) query = query.textSearch('headline', q);
  query = query.range((page - 1) * 20, page * 20 - 1);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(3000);
```

### 4. Update app.js to use API
Replace the `ARTICLES` reference in `renderFeed()` with:
```javascript
async function fetchArticles(cat, page) {
  const res = await fetch(`/api/articles?cat=${cat}&page=${page}`);
  return res.json();
}
```

---

## Monetization setup

### Google AdSense
1. Sign up at google.com/adsense with your Netlify domain
2. Paste their `<script>` tag in the `<head>` of index.html
3. Replace the `.ad-slot` div with AdSense auto-ad code
4. Approval takes 1–2 weeks

### Direct sponsors (better margins)
- Edit the `adSlot()` function in `app.js` with your sponsor's logo + link
- Charge $200–$800/month per slot
- For the newsletter slot, use Resend.com (free up to 3,000 emails/month)

---

## Push notifications (breaking news alerts)

1. Get VAPID keys: `npx web-push generate-vapid-keys`
2. Store public key in frontend, private key in backend
3. When user clicks "Enable notifications", subscribe them:
```javascript
const reg = await navigator.serviceWorker.ready;
const sub = await reg.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: YOUR_PUBLIC_VAPID_KEY
});
await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify(sub) });
```
4. Send breaking news from your scraper using `web-push` npm package

---

## Supabase schema (copy into Supabase SQL editor)

```sql
create table articles (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  excerpt text,
  source text not null,
  "sourceUrl" text unique not null,
  category text not null default 'politics',
  image text,
  "publishedAt" timestamptz default now(),
  breaking boolean default false,
  created_at timestamptz default now()
);

create index on articles (category);
create index on articles ("publishedAt" desc);
alter table articles enable row level security;
create policy "Public read" on articles for select using (true);
```

---

## Estimated revenue at scale

| Monthly visitors | AdSense est. | Direct sponsor (2 slots) | Newsletter sponsor | Total |
|---|---|---|---|---|
| 10,000 | $30–60 | $400 | $150 | ~$600 |
| 50,000 | $150–300 | $1,200 | $400 | ~$1,900 |
| 200,000 | $600–1,200 | $3,200 | $800 | ~$5,200 |

**Key**: Diaspora readers (US/UK) earn 8–12x more AdSense CPM than in-country traffic. Target diaspora audience to multiply revenue at same traffic numbers.

---

Built with love for Liberia. 🇱🇷
