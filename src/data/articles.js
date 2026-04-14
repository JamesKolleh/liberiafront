// LiberiaFront — Article Data
// In production, this is replaced by your RSS scraper API endpoint

const ARTICLES = [
  // ---- POLITICS ----
  {
    id: 1,
    headline: "President Boakai signs landmark infrastructure bill into law, pledges 500km of new roads",
    excerpt: "President Joseph Boakai signed the National Infrastructure Development Act on Thursday, allocating $320 million toward road construction across all 15 counties, with priority given to rural connectivity in Lofa, Nimba, and Grand Gedeh.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    time: "2h ago",
    timeMs: Date.now() - 7200000,
    breaking: true
  },
  {
    id: 2,
    headline: "Senate approves new election commission members after months of deadlock",
    excerpt: "The Liberian Senate voted 18-12 to confirm five new members to the National Elections Commission, ending a six-month political standoff that threatened to delay the 2027 by-elections.",
    source: "Daily Observer",
    sourceUrl: "https://liberianobserver.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
    time: "4h ago",
    timeMs: Date.now() - 14400000,
    breaking: false
  },
  {
    id: 3,
    headline: "CDC calls for independent audit of government contracts awarded since 2024",
    excerpt: "The Congress for Democratic Change formally petitioned the General Auditing Commission to review all sole-source contracts awarded by government ministries, citing over $40 million in unexplained expenditures.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    time: "6h ago",
    timeMs: Date.now() - 21600000,
    breaking: false
  },
  {
    id: 4,
    headline: "Bomi County superintendent removed over land dispute mismanagement",
    excerpt: "President Boakai accepted the resignation of Bomi County Superintendent Trokon Reeves following a formal inquiry into allegations he facilitated illegal land sales affecting over 300 farming families.",
    source: "New Dawn",
    sourceUrl: "https://thenewdawnliberia.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&q=80",
    time: "8h ago",
    timeMs: Date.now() - 28800000,
    breaking: false
  },

  // ---- BUSINESS ----
  {
    id: 5,
    headline: "MTN Liberia announces 4G expansion to cover 10 new districts by end of 2026",
    excerpt: "MTN Liberia CEO Selorm Adadevoh confirmed a $28 million capital investment to extend 4G LTE coverage to Buchanan, Gbarnga, Zwedru, and seven additional district capitals, with rollout beginning in Q3.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "business",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    time: "3h ago",
    timeMs: Date.now() - 10800000,
    breaking: true
  },
  {
    id: 6,
    headline: "ArcelorMittal extends iron ore mining concession for 25 years in new deal with government",
    excerpt: "Liberia's largest foreign investor signed a revised concession agreement expected to generate $180 million in annual royalties and create 4,200 direct jobs in Nimba and Bong counties.",
    source: "Liberia News",
    sourceUrl: "https://liberianews.net",
    category: "business",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    time: "5h ago",
    timeMs: Date.now() - 18000000,
    breaking: false
  },
  {
    id: 7,
    headline: "Ecobank Liberia launches mobile banking for unbanked populations in rural counties",
    excerpt: "The new Ecobank Xpress Account requires only a national ID and works entirely via feature phone USSD, targeting the estimated 68% of adult Liberians who remain outside the formal banking system.",
    source: "Daily Observer",
    sourceUrl: "https://liberianobserver.com",
    category: "business",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    time: "1d ago",
    timeMs: Date.now() - 86400000,
    breaking: false
  },
  {
    id: 8,
    headline: "Liberia rubber exports up 14% in first quarter on rising global prices",
    excerpt: "The Liberia Revenue Authority reported $67 million in rubber export earnings for Q1 2026, the highest quarterly figure since 2019, driven by increased demand from Asian automotive manufacturers.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "business",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
    time: "1d ago",
    timeMs: Date.now() - 90000000,
    breaking: false
  },

  // ---- SPORTS ----
  {
    id: 9,
    headline: "Lone Star qualifies for AFCON 2027 after dramatic 2-1 win over Ivory Coast",
    excerpt: "Liberia's national football team secured their first Africa Cup of Nations berth in 26 years with a stunning comeback victory in Abidjan, as substitute Anthony Tarplah scored in the 89th minute.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "sports",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
    time: "1h ago",
    timeMs: Date.now() - 3600000,
    breaking: true
  },
  {
    id: 10,
    headline: "LFA First Division: LPRC Oilers and Barrack Young Controllers share spoils in Monrovia derby",
    excerpt: "The highly anticipated capital derby ended 1-1 at the Antoinette Tubman Stadium, with both clubs remaining level on points at the top of the First Division standings heading into the final stretch.",
    source: "New Dawn",
    sourceUrl: "https://thenewdawnliberia.com",
    category: "sports",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80",
    time: "5h ago",
    timeMs: Date.now() - 18000000,
    breaking: false
  },
  {
    id: 11,
    headline: "Liberian athlete Famatta Dunbar sets new national 400m record at West Africa Athletics Championships",
    excerpt: "The 22-year-old University of Liberia student clocked 52.34 seconds in Accra to break the previous record by nearly half a second, earning her a wildcard invitation to compete at the World Athletics Championships.",
    source: "Daily Observer",
    sourceUrl: "https://liberianobserver.com",
    category: "sports",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
    time: "7h ago",
    timeMs: Date.now() - 25200000,
    breaking: false
  },

  // ---- HEALTH ----
  {
    id: 12,
    headline: "Ministry of Health announces free malaria treatment rollout across all public hospitals",
    excerpt: "Beginning May 2026, all government health facilities will provide artemisinin-based combination therapy at no cost, funded by a $12 million grant from the Global Fund, serving an estimated 2.3 million Liberians annually.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    time: "3h ago",
    timeMs: Date.now() - 10800000,
    breaking: false
  },
  {
    id: 13,
    headline: "JFK Medical Center receives new surgical equipment worth $4.5 million from US government",
    excerpt: "The donation includes two modern operating theater setups, an intensive care unit expansion package, and advanced diagnostic imaging tools, in a ceremony attended by the US Ambassador and Health Minister.",
    source: "Liberia News",
    sourceUrl: "https://liberianews.net",
    category: "health",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
    time: "1d ago",
    timeMs: Date.now() - 86400000,
    breaking: false
  },

  // ---- DIASPORA ----
  {
    id: 14,
    headline: "Liberian community in Minnesota raises $180,000 for Buchanan school reconstruction",
    excerpt: "The Liberia Minnesota Association surpassed its fundraising goal in just three weeks, with contributions from over 1,400 diaspora households. Construction of the three-classroom block begins in July.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "diaspora",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    time: "2h ago",
    timeMs: Date.now() - 7200000,
    breaking: false
  },
  {
    id: 15,
    headline: "US removes Liberia from TPS review list — residency status secure for 85,000 Liberians",
    excerpt: "The Department of Homeland Security confirmed Liberia will not be included in the 2026 TPS review cycle, providing continued protection for an estimated 85,000 Liberian nationals currently living and working in the United States.",
    source: "New Dawn",
    sourceUrl: "https://thenewdawnliberia.com",
    category: "diaspora",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    time: "4h ago",
    timeMs: Date.now() - 14400000,
    breaking: true
  },
  {
    id: 16,
    headline: "Liberian-American entrepreneur opens $2M tech hub in Monrovia's Sinkor district",
    excerpt: "James Karnga, who built a logistics software company in Atlanta, returned to Liberia to launch LiberTech Hub — a co-working space and startup incubator offering affordable desk space and mentorship to young Liberian tech founders.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "diaspora",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    time: "6h ago",
    timeMs: Date.now() - 21600000,
    breaking: false
  },

  // ---- COUNTY ----
  {
    id: 17,
    headline: "Nimba County gets first traffic lights as road modernisation project reaches Sanniquellie",
    excerpt: "The $1.2 million Sanniquellie urban roads upgrade, funded by the African Development Bank, includes signal-controlled intersections, pedestrian crossings, and street lighting along five key corridors.",
    source: "Daily Observer",
    sourceUrl: "https://liberianobserver.com",
    category: "county",
    image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800&q=80",
    time: "5h ago",
    timeMs: Date.now() - 18000000,
    breaking: false
  },
  {
    id: 18,
    headline: "Grand Cape Mount fishermen demand government action on illegal Chinese trawlers",
    excerpt: "Over 400 artisanal fishermen from Robertsport and surrounding villages staged a peaceful protest at the National Port Authority, citing significant declines in daily catches due to unlicensed industrial fishing vessels operating within the 12-nautical-mile exclusion zone.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "county",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    time: "8h ago",
    timeMs: Date.now() - 28800000,
    breaking: false
  },
  {
    id: 19,
    headline: "Lofa County bridge rehabilitation opens cross-border trade route to Guinea",
    excerpt: "The newly rehabilitated Kolahun-Voinjama corridor, including three bridge upgrades, has cut the travel time between Monrovia and Conakry by 4 hours and is already generating increased agricultural trade flow.",
    source: "Liberia News",
    sourceUrl: "https://liberianews.net",
    category: "county",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    time: "1d ago",
    timeMs: Date.now() - 86400000,
    breaking: false
  },

  // ---- ENTERTAINMENT / CULTURE ----
  {
    id: 20,
    headline: "Monrovia International Film Festival announces 2026 lineup with 40 African films",
    excerpt: "The 4th edition of MIFF will screen 40 feature films and 22 documentaries from 18 African countries over five days in August, with Liberian filmmaker Kona Khasu's debut feature 'River Season' opening the festival.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "entertainment",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    time: "3h ago",
    timeMs: Date.now() - 10800000,
    breaking: false
  },
  {
    id: 21,
    headline: "Liberian Afrobeats artist D-12 signs with Universal Music Africa ahead of debut album",
    excerpt: "Monrovia-born singer and songwriter Daniel Kollie, known as D-12, becomes the first Liberian artist to sign a major label deal in a decade, with his debut album 'Pepper Coast Dreams' slated for global release in September.",
    source: "New Dawn",
    sourceUrl: "https://thenewdawnliberia.com",
    category: "entertainment",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    time: "6h ago",
    timeMs: Date.now() - 21600000,
    breaking: false
  },
  {
    id: 22,
    headline: "National Museum of Liberia reopens after three-year renovation with new permanent collection",
    excerpt: "President Boakai cut the ribbon on the renovated museum on Broad Street, which now features a dedicated Pepper Coast pre-colonial history wing, a civil war reconciliation gallery, and an interactive digital archive of Liberian cultural heritage.",
    source: "Daily Observer",
    sourceUrl: "https://liberianobserver.com",
    category: "entertainment",
    image: "https://images.unsplash.com/photo-1565060169194-19fabf63012c?w=800&q=80",
    time: "1d ago",
    timeMs: Date.now() - 86400000,
    breaking: false
  },

  // ---- MORE POLITICS ----
  {
    id: 23,
    headline: "Liberia ratifies ECOWAS free movement protocol after 12-year delay",
    excerpt: "The Senate's unanimous ratification of the ECOWAS Protocol on Free Movement of Persons marks a significant regional integration milestone, removing passport requirements for citizens of all 15 member states.",
    source: "FrontPage Africa",
    sourceUrl: "https://frontpageafricaonline.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=800&q=80",
    time: "10h ago",
    timeMs: Date.now() - 36000000,
    breaking: false
  },
  {
    id: 24,
    headline: "Anti-corruption court sentences former ministry official to 8 years for $2.3M embezzlement",
    excerpt: "The Criminal Court E handed down the stiffest sentence in the Liberia Anti-Corruption Commission's history, convicting the former Director of Procurement at the Ministry of Public Works on four counts of economic sabotage.",
    source: "Bush Chicken",
    sourceUrl: "https://www.bushchicken.com",
    category: "politics",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    time: "12h ago",
    timeMs: Date.now() - 43200000,
    breaking: false
  }
];

const BREAKING_HEADLINES = ARTICLES
  .filter(a => a.breaking)
  .map(a => a.headline);

// Duplicate for continuous scroll
const TICKER_ITEMS = [...BREAKING_HEADLINES, ...BREAKING_HEADLINES];

