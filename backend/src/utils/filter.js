const GOVERNMENT_KEYWORDS = [
  'government', 'policy', 'tariff', 'subsidy', 'scheme', 'ministry',
  'regulation', 'tax', 'budget', 'mnre', 'discom', 'fame', 'pli',
  'import duty', 'export duty', 'customs', 'tender', 'auction',
  'psu', 'sebi', 'rbi', 'cabinet', 'minister', 'bill', 'act',
  'parliament', 'congress', 'senate', 'legislation', 'amendment',
  'directive', 'ordinance', 'order', 'guideline', 'notification',
  'cabinet approval', 'state government', 'central government',
  'renewable purchase obligation', 'rpo', 'renewable obligation',
  'net metering', 'gross metering', 'feed in tariff', 'fit',
  'carbon tax', 'environmental levy', 'green cess',
  'emission standard', 'pollution control', 'bs-vi', 'bharat stage',
  'ev policy', 'ev mandate', 'ev incentive',
  'solar policy', 'wind policy', 'storage policy',
  'energy conservation', 'energy efficiency', 'bee bureau',
  'petrol', 'diesel', 'fossil fuel phase', 'coal phase',
  'green hydrogen mission', 'national hydrogen mission',
  'pmsby', 'pmjay', 'pmkisan', 'pmjdy',
  'state electricity board', 'seb', 'load shedding', 'power cut',
  'uppcl', 'bescom', 'mescom', 'maharastra electricity',
  'cea', 'central electricity authority', 'power ministry'
];

const COMPANY_KEYWORDS = [
  'tesla', 'adani', 'reliance', 'tata', 'suzlon', 'vestas', 'gamesa',
  'byd', 'hero', 'ola', 'bounce', 'ather', 'yulu', 'tata power',
  'adani green', 'acme', 'orb', 'startup', 'product', 'launch',
  'battery', 'solar panel', 'inverter', 'module', 'turbine',
  'manufacturing', 'plant', 'commissioned', 'inaugurated', 'unveiled',
  'factory', 'production', 'facility', 'mw', 'gw', 'megawatt', 'gigawatt',
  'order', 'contract', 'deal', 'partnership', 'collaboration',
  'funding', 'investment', 'ipo', 'revenue', 'profit',
  'first solar', 'sunpower', 'lg', 'panasonic', 'huawei',
  'enphase', 'solaredge', 'growatt', 'fronius',
  'nextracker', 'gamechange solar', 'ideemso',
  'siemens gamesa', 'nordex', 'ge renewable', 'vestas wind',
  'bing energy', 'windar', 'mitsubishi heavy',
  'catl', 'panasonic battery', 'samsung sdi',
  'northvolt', 'svolt', 'proterra', 'clarios',
  'nimh', 'lithium', 'cobalt', 'nickel',
  'jinko solar', 'trina solar', 'longi solar', 'canadian solar',
  'rsted', 'iberdrola', 'engie', 'edp renewables',
  'azure power', 'cleantech solar', 'orange renewable',
  'renew power', 'renew energy', 'gent max',
  'energy efficiency services', 'eESL', 'evertron',
  'exicom', 'luminous', 'microtek', 'schneider electric',
  'abb', 'siemens', 'hitachi energy',
  'kpit', 'tata elxsi', 'tech mahindra',
  'chargepoint', 'blink charging', 'voltaware', 'tata power ev',
  'acre', 'ampere', 'avestrong', 'e-sprzal',
  'joy e-bike', 'ather energy', 'ola electric', 'bajaj chetak',
  'tvs motor', 'hero electric', 'ampere electric',
  'greaves cotton', 'mahindra electric', 'tata motors ev',
  'mg motor', 'hyundai kona', 'kia ev',
  'order book', 'backlog', 'pipeline project',
  'quarterly results', 'annual report', 'stock performance'
];

const INTERNATIONAL_KEYWORDS = [
  'usa', 'united states', 'china', 'europe', 'germany', 'uk',
  'united kingdom', 'australia', 'japan', 'canada', 'brazil',
  'france', 'uae', 'saudi', 'singapore', 'middle east', 'africa',
  'south america', 'asia pacific', 'g20', 'g7', 'cop28', 'cop29',
  'cop30', 'summit', 'conference', 'iaea', 'world bank', 'united nations',
  'global', 'international', 'world', 'overseas', 'abroad', 'european union',
  'eu green deal', 'us inflation reduction act', 'ira clean energy',
  'china solar', 'china wind', 'china ev',
  'eu carbon border', 'carbon border adjustment mechanism',
  'iea', 'irena', 'ipcc', 'wef', 'world economic forum',
  'us department of energy', 'doe', 'nrel',
  'uk grid', 'national grid uk', 'ofgem',
  'germany energiewende', 'austrian solar', 'spanish solar',
  'dutch wind', 'belgian offshore', 'danish wind',
  'japan feed-in', 'japan meti', 'japan solar',
  'australia cer', 'australia clean energy',
  'canada net-zero', 'canada climate',
  'brazil aneel', 'brazil solar',
  'uae masdar', 'saudi neom', 'masdar city',
  'us california', 'us texas', 'us new york',
  'us pjm', 'us ercot', 'us caiso',
  'global solar alliance', 'isa solar',
  'belt and road', 'bri green',
  'asean energy', 'apec energy',
  'pacific island', 'sids renewable',
  'african development bank', 'afdb green',
  'new zealand energy', 'south korea green new deal',
  'india us solar', 'india eu trade', 'india china solar'
];

const INDIA_KEYWORDS = ['india', 'indian', 'indian government', 'mnre'];

const categorizeArticle = (article) => {
  if (!article) {
    return 'Others';
  }

  const country = article.country || 'in';
  const title = article.title ?? '';
  const description = article.description ?? '';
  const content = `${title} ${description}`.toLowerCase();

  const isIndiaNews = INDIA_KEYWORDS.some(keyword => content.includes(keyword));

  if (country === 'world' && !isIndiaNews) {
    const hasGovernment = GOVERNMENT_KEYWORDS.some(k => content.includes(k));
    const hasCompany = COMPANY_KEYWORDS.some(k => content.includes(k));
    
    if (hasGovernment) return 'Government & Tariff';
    if (hasCompany) return 'Companies & Products';
    return 'International News';
  }

  const hasGovernment = GOVERNMENT_KEYWORDS.some(k => content.includes(k));
  const hasCompany = COMPANY_KEYWORDS.some(k => content.includes(k));
  const hasInternational = INTERNATIONAL_KEYWORDS.some(k => content.includes(k));

  if (hasGovernment) return 'Government & Tariff';
  if (hasCompany) return 'Companies & Products';
  if (hasInternational && !isIndiaNews) return 'International News';

  return 'Others';
};

const addCategoryToArticles = (articles) => {
  if (!Array.isArray(articles)) return [];
  return articles.map(article => ({
    ...article,
    category: categorizeArticle(article)
  }));
};

export { categorizeArticle, addCategoryToArticles };
