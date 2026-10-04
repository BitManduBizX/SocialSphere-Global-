export interface MarketingPillar {
  id: string;
  order: number;
  name: string;
  acronym?: string;
  tagline: string;
  description: string;
  primaryGoal: string;
  coreMetricsKPIs: string[];
  techStackTools: string[];
  executionPlaybook: string[];
  riskFactor: string;
  iconName: string;
}

export const MARKETING_PILLARS: MarketingPillar[] = [
  {
    id: 'pillar-seo',
    order: 1,
    name: 'Search Engine Optimization & AIO',
    acronym: 'SEO / AIO',
    tagline: 'Capturing intent-driven search traffic across Google SGE, Perplexity, ChatGPT, and Social Search',
    description: 'The science and art of ranking organic content on search engines and LLM answer aggregators by maximizing crawlability, topical authority, and semantic entity matching.',
    primaryGoal: 'Drive sustainable, high-intent compounding organic traffic with zero incremental media cost.',
    coreMetricsKPIs: [
      'Organic Search Impressions & Clicks (GSC)',
      'LLM Answer Citation Share (Perplexity & ChatGPT citations)',
      'Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)',
      'Keyword Velocity & Search Share of Voice (SOV)',
    ],
    techStackTools: ['Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'Clearscope', 'SurferSEO'],
    executionPlaybook: [
      'Construct topic clusters around core customer pain points with clear hub-and-spoke internal links.',
      'Optimize for Answer Engine Optimization (AIO): Provide direct, unbloated markdown tables and statistics at the top of articles for AI citations.',
      'Execute technical audits eliminating 404 redirects, orphaned URLs, and duplicate canonical tags.',
    ],
    riskFactor: 'Algorithm updates (Core Updates) can disrupt rankings overnight if content lacks original primary research or genuine human experience.',
    iconName: 'Search',
  },
  {
    id: 'pillar-smm',
    order: 2,
    name: 'Social Media Marketing & Viral Loops',
    acronym: 'SMM',
    tagline: 'Building magnetic community presence and viral organic distribution loops',
    description: 'Designing brand narrative and native vertical video content that taps into algorithmic interest graphs across TikTok, Instagram, LinkedIn, and YouTube Shorts.',
    primaryGoal: 'Cultivate an engaged audience, build cultural relevance, and generate organic brand advocacy.',
    coreMetricsKPIs: [
      'Save and Direct Message (DM) Share Velocity',
      'Average Watch Percentage & First 3-Second Retention',
      'Audience Growth Rate & Follower-to-Subscriber Conversion',
      'Engagement Rate per Impression (Benchmark > 2.5%)',
    ],
    techStackTools: ['CapCut Pro', 'Sprout Social', 'Buffer', 'Phantombuster', 'Brand24', 'Descript'],
    executionPlaybook: [
      'Craft high-contrast visual hooks in the first 2.5 seconds to prevent feed drop-off.',
      'Build native conversation loops by personally responding to all qualified comments within the first 60 minutes.',
      'Repurpose long-form pillar assets (podcasts, webinars) into 6-8 micro-reels with burned-in dynamic captions.',
    ],
    riskFactor: 'Audience fatigue and platform algorithm shifts suppressing external link clicks and organic commercial posts.',
    iconName: 'Share2',
  },
  {
    id: 'pillar-content',
    order: 3,
    name: 'Content Marketing & Thought Leadership',
    acronym: 'Content',
    tagline: 'Educating, inspiring, and establishing undisputed domain authority',
    description: 'Developing high-caliber editorial assets, proprietary benchmark research reports, technical whitepapers, and customer case studies.',
    primaryGoal: 'Nurture prospects across the entire buying cycle by solving problems before transacting.',
    coreMetricsKPIs: [
      'Content Download / Lead Magnet Completion Rate',
      'Average Dwell Time & Scroll Depth (> 3 minutes)',
      'Assisted Conversion Pipeline Value ($)',
      'Backlink Acquisition Velocity from tier-1 publications',
    ],
    techStackTools: ['Notion', 'Grammarly Business', 'Figma', 'HubSpot CMS', 'Substack', 'BuzzSumo'],
    executionPlaybook: [
      'Publish proprietary industry data surveys that cannot be replicated by generic AI copywriters.',
      'Deploy the 50/30/20 content framework to ensure 80% of assets deliver pure value before asking for conversions.',
      'Interview internal engineers, product architects, and customers to uncover authentic technical stories.',
    ],
    riskFactor: 'Producing shallow "commodity content" that fails to provide new insights or tangible takeaways.',
    iconName: 'FileText',
  },
  {
    id: 'pillar-email',
    order: 4,
    name: 'Email & Lifecycle Marketing',
    acronym: 'Lifecycle',
    tagline: 'Monetizing owned audience relationships with automated behavioral drip flows',
    description: 'Designing hyper-segmented communication sequences based on user actions, RFM (Recency, Frequency, Monetary) scores, and lifecycle churn risks.',
    primaryGoal: 'Maximize Customer Lifetime Value (LTV), accelerate trial-to-paid velocity, and reactivate dormant users.',
    coreMetricsKPIs: [
      'Unique Open Rate (> 38%) & Click-to-Open Rate (CTOR > 12%)',
      'Revenue Per Recipient (RPR) and Flow Attribution %',
      'Unsubscribe Rate (< 0.25%) & Spam Complaint Rate (< 0.05%)',
      'Churn Reduction Lift in automated win-back cohorts',
    ],
    techStackTools: ['Klaviyo', 'Customer.io', 'Braze', 'Mailchimp', 'Litmus', 'ActiveCampaign'],
    executionPlaybook: [
      'Implement automated behavioral triggers: Welcome onboarding series, browse abandonment, abandoned cart, and renewal alerts.',
      'Strictly segment lists by engagement frequency (e.g., active in last 30 days vs 90 days) to protect sender domain reputation.',
      'Clean subscriber lists quarterly using sunset flows to purge unengaged inboxes and preserve deliverability.',
    ],
    riskFactor: 'Aggressive emailing causing high spam complaint rates, degrading domain deliverability into Gmail Promotions tabs.',
    iconName: 'Mail',
  },
  {
    id: 'pillar-ppc',
    order: 5,
    name: 'Paid Media & Performance Marketing',
    acronym: 'PPC / Paid',
    tagline: 'Predictable user acquisition at scale through algorithmic ad auction engines',
    description: 'Deploying capital across Google Ads (Search & Performance Max), Meta Advantage+, TikTok Spark Ads, and LinkedIn B2B campaigns with strict attribution.',
    primaryGoal: 'Drive predictable, profitable revenue and pipeline with positive Customer Acquisition Cost (CAC) to LTV ratios.',
    coreMetricsKPIs: [
      'Return on Ad Spend (ROAS) & Customer Acquisition Cost (CAC)',
      'Cost Per Click (CPC) & Cost Per Thousand Impressions (CPM)',
      'Blended Marketing Efficiency Ratio (MER = Total Revenue / Total Ad Spend)',
      'First-Day Payback Period (Days to recover CAC)',
    ],
    techStackTools: ['Meta Ads Manager', 'Google Ads Editor', 'Triple Whale', 'Northbeam', 'AppsFlyer', 'Supermetrics'],
    executionPlaybook: [
      'Adopt broad targeting and feed ad algorithms with 20+ varied creative hooks (UGC, founder pitch, comparison chart, problem-agitation).',
      'Deploy server-side Conversion APIs (CAPI) to bypass client-side Safari ITP and iOS tracking restrictions.',
      'Enforce strict kill-and-scale rules: Kill ad variants failing target CPA after 3x spend; scale winners by 20% every 48 hours.',
    ],
    riskFactor: 'Ad fatigue and creative saturation causing sudden CPM inflation and volatile CAC spikes.',
    iconName: 'Target',
  },
  {
    id: 'pillar-affiliate',
    order: 6,
    name: 'Affiliate & Partnership Marketing',
    acronym: 'Partnerships',
    tagline: 'Building a decentralized sales force via revenue-share commission models',
    description: 'Recruiting third-party publishers, review aggregators, newsletter operators, and coupon portals to promote products in exchange for performance-based payouts.',
    primaryGoal: 'Acquire net-new customers with zero upfront financial media risk on a strict Cost-Per-Acquisition (CPA) basis.',
    coreMetricsKPIs: [
      'Active Affiliate Participation Rate (% of partners driving sales)',
      'Effective Commission Rate vs Net Margin',
      'Affiliate Channel Incrementality Lift',
      'Average Order Value (AOV) across partner cohorts',
    ],
    techStackTools: ['Impact.com', 'CJ Affiliate', 'Partnerize', 'Refersion', 'Everflow', 'ShareASale'],
    executionPlaybook: [
      'Establish competitive tiered commission structures (e.g., 20% recurring for SaaS or 12% CPA for e-commerce).',
      'Provide turnkey promotional kits: High-converting banners, custom discount coupons, pre-written email swipes, and video assets.',
      'Audit affiliate coupon leakage to prevent coupon sites from cannibalizing direct organic checkouts.',
    ],
    riskFactor: 'Coupon scraping portals hijacking brand search keywords without driving true incremental conversions.',
    iconName: 'Handshake',
  },
  {
    id: 'pillar-influencer',
    order: 7,
    name: 'Influencer & Creator Economy',
    acronym: 'Creator',
    tagline: 'Borrowing trust and authentic cultural endorsements from native creators',
    description: 'Partnering with nano, micro, and macro creators to produce User Generated Content (UGC), sponsored reviews, and whitelisted performance ads.',
    primaryGoal: 'Drive authentic social proof, human trust, and scalable visual creative assets for paid acquisition.',
    coreMetricsKPIs: [
      'Cost Per Engagement (CPE) & Earned Media Value (EMV)',
      'UGC Creative Win Rate when repurposed in paid Meta/TikTok ad campaigns',
      'Creator Code Redemption Velocity',
      'Audience Demographics Brand Affinity Match',
    ],
    techStackTools: ['GRIN', 'Upfluence', 'Modash', 'Aspire', 'Mavrck', 'TikTok Creator Marketplace'],
    executionPlaybook: [
      'Prioritize micro-creators (10k-100k followers) with genuine engagement rates (> 4%) over celebrity macro-influencers.',
      'Contractually secure paid advertising whitelisting rights (Meta Partnership Ads / TikTok Spark Ads) on all sponsored creator posts.',
      'Ship product seeding gifts with personalized handwritten notes and zero forced posting mandates to trigger authentic praise.',
    ],
    riskFactor: 'Fake follower bot accounts and creator reputational controversies misaligned with brand values.',
    iconName: 'Award',
  },
];

export interface MarketingCareerTrack {
  id: string;
  rank: number;
  title: string;
  alternateTitles: string[];
  salaryUSD: {
    entry: string;
    mid: string;
    senior: string;
    leadExec: string;
  };
  remoteAvailability: string;
  technicalVsCreativeRatio: { technical: number; creative: number };
  coreToolStack: string[];
  primaryMission: string;
  dayInTheLife: string;
  careerAdvancement: string[];
  interviewTopicSample: string;
}

export const MARKETING_CAREER_TRACKS: MarketingCareerTrack[] = [
  {
    id: 'career-vp-growth',
    rank: 1,
    title: 'VP of Growth / Chief Growth Officer',
    alternateTitles: ['Head of Growth', 'Director of Growth Marketing', 'CGO'],
    salaryUSD: {
      entry: '$160,000 - $190,000',
      mid: '$200,000 - $260,000',
      senior: '$270,000 - $350,000',
      leadExec: '$360,000 - $500,000+ (plus equity)',
    },
    remoteAvailability: '82% Remote / Hybrid',
    technicalVsCreativeRatio: { technical: 75, creative: 25 },
    coreToolStack: ['SQL / BigQuery', 'Looker / Tableau', 'Amplitude / Mixpanel', 'dbt', 'Statsig (A/B Testing)', 'HubSpot'],
    primaryMission: 'Orchestrates the entire acquisition, activation, retention, and monetization funnel to maximize top-line compound ARR growth.',
    dayInTheLife: 'Analyzes cross-channel CAC payback curves, reviews weekly A/B experimentation velocity with data engineering, reallocates multi-million dollar quarterly marketing budgets, and aligns marketing KPIs with executive board objectives.',
    careerAdvancement: ['Director of Performance', 'VP of Growth', 'Chief Growth Officer (CGO)', 'Chief Operating Officer (COO)', 'Tech Founder / CEO'],
    interviewTopicSample: 'How would you build an experimentation engine to reduce onboarding churn by 25% while maintaining a 6-month CAC payback period?',
  },
  {
    id: 'career-head-performance',
    rank: 2,
    title: 'Head of Performance Marketing',
    alternateTitles: ['Director of Paid Acquisition', 'Lead Media Buyer', 'VP of Paid Media'],
    salaryUSD: {
      entry: '$110,000 - $140,000',
      mid: '$150,000 - $190,000',
      senior: '$200,000 - $260,000',
      leadExec: '$270,000 - $360,000',
    },
    remoteAvailability: '88% Remote',
    technicalVsCreativeRatio: { technical: 70, creative: 30 },
    coreToolStack: ['Meta Ads Manager', 'Google Ads Editor', 'Triple Whale / Northbeam', 'Google Analytics 4', 'Excel / BigQuery'],
    primaryMission: 'Manages multi-million dollar paid acquisition budgets across programmatic and social auctions with uncompromising ROAS discipline.',
    dayInTheLife: 'Monitors early morning ad pacing and MER metrics, coordinates rapid creative iterations with the design team, sets bid caps on volatile ad auctions, and audits multi-touch attribution reports to eliminate ad waste.',
    careerAdvancement: ['Senior Media Buyer', 'Performance Marketing Manager', 'Head of Performance', 'VP of Growth'],
    interviewTopicSample: 'Walk me through your framework for scaling Meta ad spend from $50k/month to $500k/month without CAC inflating by more than 15%.',
  },
  {
    id: 'career-data-scientist',
    rank: 3,
    title: 'Marketing Data Scientist & Attribution Lead',
    alternateTitles: ['Lead Growth Analyst', 'Marketing Econometrician', 'Media Mix Modeling (MMM) Lead'],
    salaryUSD: {
      entry: '$120,000 - $150,000',
      mid: '$160,000 - $210,000',
      senior: '$220,000 - $280,000',
      leadExec: '$290,000 - $380,000',
    },
    remoteAvailability: '92% Remote',
    technicalVsCreativeRatio: { technical: 95, creative: 5 },
    coreToolStack: ['Python / R', 'SQL / Snowflake', 'Robyn / Meridian (Meta & Google MMM)', 'dbt', 'Airflow', 'Databricks'],
    primaryMission: 'Builds statistical models, incrementality experiments, and Media Mix Modeling (MMM) pipelines to uncover true marketing causality.',
    dayInTheLife: 'Validates synthetic control geo-lift tests, fine-tunes Bayesian regression models attributing offline and podcast conversions, builds automated data pipelines in dbt, and translates complex statistical outputs for marketing executives.',
    careerAdvancement: ['Data Analyst', 'Marketing Data Scientist', 'Staff Econometrician', 'VP of Data & Analytics'],
    interviewTopicSample: 'How do you design a geo-testing experiment to measure the true incrementality of YouTube ads when privacy changes break deterministic tracking?',
  },
  {
    id: 'career-pmm',
    rank: 4,
    title: 'Product Marketing Director (PMM)',
    alternateTitles: ['Lead Product Marketer', 'Head of Product Marketing', 'VP of PMM'],
    salaryUSD: {
      entry: '$115,000 - $145,000',
      mid: '$155,000 - $205,000',
      senior: '$210,000 - $275,000',
      leadExec: '$280,000 - $370,000',
    },
    remoteAvailability: '79% Remote / Hybrid',
    technicalVsCreativeRatio: { technical: 50, creative: 50 },
    coreToolStack: ['Crayon / Klue (Competitive Intel)', 'Figma', 'Gong / Chorus', 'Notion', 'Salesforce', 'UserTesting'],
    primaryMission: 'Bridges the gap between engineering and the customer, owning product positioning, competitive battlecards, and go-to-market launches.',
    dayInTheLife: 'Conducts win-loss interviews with enterprise buyers, crafts differentiated product positioning frameworks, collaborates with product managers on upcoming feature roadmaps, and trains enterprise sales reps on competitive objections.',
    careerAdvancement: ['Senior PMM', 'Principal PMM', 'Director of Product Marketing', 'VP of Marketing / CMO'],
    interviewTopicSample: 'How would you position a developer-focused infrastructure tool in a crowded market dominated by incumbent legacy vendors?',
  },
  {
    id: 'career-lifecycle',
    rank: 5,
    title: 'Lifecycle & Retention Marketing Director',
    alternateTitles: ['Head of CRM', 'Director of Customer Lifecycle', 'Retention Lead'],
    salaryUSD: {
      entry: '$100,000 - $130,000',
      mid: '$140,000 - $180,000',
      senior: '$190,000 - $245,000',
      leadExec: '$255,000 - $330,000',
    },
    remoteAvailability: '85% Remote',
    technicalVsCreativeRatio: { technical: 65, creative: 35 },
    coreToolStack: ['Braze / Iterable / Customer.io', 'Segment (CDP)', 'SQL / BigQuery', 'Klaviyo', 'Mixpanel'],
    primaryMission: 'Designs predictive customer retention journeys, reducing churn and unlocking compounding expansion revenue across existing users.',
    dayInTheLife: 'Audits retention cohorts across 30/60/90 days, tests dynamic in-app onboarding sequences, coordinates personalized SMS and push notification triggers, and models LTV cohorts to forecast renewal cash flows.',
    careerAdvancement: ['Lifecycle Manager', 'CRM Lead', 'Director of Retention', 'VP of Customer Growth / Chief Customer Officer'],
    interviewTopicSample: 'What behavioral events would you track in a SaaS freemium product to trigger an automated expansion offer before the user realizes they need it?',
  },
  {
    id: 'career-seo-director',
    rank: 6,
    title: 'Global SEO & Answer Engine Optimization Director',
    alternateTitles: ['Head of Organic Growth', 'Search Intelligence Director', 'VP of SEO'],
    salaryUSD: {
      entry: '$95,000 - $125,000',
      mid: '$135,000 - $175,000',
      senior: '$180,000 - $240,000',
      leadExec: '$250,000 - $320,000',
    },
    remoteAvailability: '90% Remote',
    technicalVsCreativeRatio: { technical: 75, creative: 25 },
    coreToolStack: ['Ahrefs / Semrush', 'Screaming Frog', 'Google Search Console', 'Python (Search scripts)', 'Logstash / BigQuery'],
    primaryMission: 'Drives millions of organic visits by mastering programmatic SEO, technical crawl efficiency, and modern LLM answer citations.',
    dayInTheLife: 'Inspects server access logs to monitor search bot crawl budgets, executes programmatic landing page architectures with engineering, analyzes generative AI snippet presence, and optimizes schema markup across millions of URLs.',
    careerAdvancement: ['Technical SEO Specialist', 'SEO Manager', 'Director of Organic Growth', 'VP of Growth'],
    interviewTopicSample: 'How are you restructuring enterprise content architectures to maintain visibility as Google transitions from 10 blue links to AI Overviews?',
  },
  {
    id: 'career-creative-director',
    rank: 7,
    title: 'Creative Director / Head of Brand',
    alternateTitles: ['VP of Creative', 'Executive Creative Director (ECD)', 'Head of Brand Strategy'],
    salaryUSD: {
      entry: '$105,000 - $135,000',
      mid: '$145,000 - $190,000',
      senior: '$200,000 - $265,000',
      leadExec: '$275,000 - $360,000',
    },
    remoteAvailability: '70% Remote / Studio Hybrid',
    technicalVsCreativeRatio: { technical: 25, creative: 75 },
    coreToolStack: ['Figma', 'Adobe Creative Cloud', 'Midjourney / Stable Diffusion', 'Frame.io', 'Cinema 4D / Blender'],
    primaryMission: 'Shapes the aesthetic identity, emotional narrative, and cultural resonance that transforms products into iconic global brands.',
    dayInTheLife: 'Leads concept sprints for flagship multi-channel campaigns, directs video production shoots, critiques visual guidelines with typography and motion designers, and evaluates creative test assets with the performance media team.',
    careerAdvancement: ['Senior Art Director / Copywriter', 'Creative Director', 'VP of Brand & Creative', 'Chief Marketing Officer (CMO)'],
    interviewTopicSample: 'How do you balance high-concept artistic brand storytelling with performance marketing’s demand for high-volume, fast-iterating UGC assets?',
  },
  {
    id: 'career-social-director',
    rank: 8,
    title: 'Social Media & Community Director',
    alternateTitles: ['Head of Social', 'Director of Community & Content', 'VP of Social Media'],
    salaryUSD: {
      entry: '$85,000 - $110,000',
      mid: '$120,000 - $155,000',
      senior: '$160,000 - $210,000',
      leadExec: '$220,000 - $290,000',
    },
    remoteAvailability: '84% Remote',
    technicalVsCreativeRatio: { technical: 35, creative: 65 },
    coreToolStack: ['Sprout Social', 'CapCut Pro', 'Brand24 (Listening)', 'Canva / Figma', 'Discord / Slack Communities'],
    primaryMission: 'Drives cultural virality and rabid brand fandom across short video platforms, social feeds, and private community hubs.',
    dayInTheLife: 'Tracks trending audio sounds on TikTok and Reels before 9:00 AM, directs on-camera creator talent, coordinates real-time brand social banter on X and Threads, and analyzes DM share velocity metrics across weekly posts.',
    careerAdvancement: ['Social Media Manager', 'Head of Content & Social', 'VP of Brand & Community', 'Chief Communications Officer (CCO)'],
    interviewTopicSample: 'Explain your strategy for building a 500,000-follower organic presence on TikTok from scratch for a traditional, risk-averse enterprise B2B brand.',
  },
  {
    id: 'career-revops',
    rank: 9,
    title: 'Revenue Operations (RevOps) Manager',
    alternateTitles: ['Director of RevOps', 'Marketing Operations Lead (MOPs)', 'Head of GTM Systems'],
    salaryUSD: {
      entry: '$95,000 - $125,000',
      mid: '$130,000 - $170,000',
      senior: '$175,000 - $230,000',
      leadExec: '$240,000 - $310,000',
    },
    remoteAvailability: '91% Remote',
    technicalVsCreativeRatio: { technical: 85, creative: 15 },
    coreToolStack: ['Salesforce', 'HubSpot Enterprise', 'Zapier / Make', 'LeanData (Lead Routing)', 'Apollo.io', 'Clearbit / ZoomInfo'],
    primaryMission: 'Unifies marketing, sales, and customer success data infrastructure to eliminate pipeline leakage and accelerate deal velocity.',
    dayInTheLife: 'Configures lead routing automation rules between marketing forms and sales reps, troubleshoots webhook data discrepancies between CRM and billing systems, builds pipeline velocity dashboards, and enforces clean data hygiene.',
    careerAdvancement: ['Marketing Ops Specialist', 'RevOps Manager', 'Director of Revenue Operations', 'Chief Revenue Officer (CRO)'],
    interviewTopicSample: 'How do you design a lead scoring and routing model that prioritizes product usage signals over traditional form fills without angering sales reps?',
  },
  {
    id: 'career-influencer-head',
    rank: 10,
    title: 'Head of Influencer & Creator Partnerships',
    alternateTitles: ['Director of Influencer Marketing', 'Creator Economy Lead', 'VP of Talent Partnerships'],
    salaryUSD: {
      entry: '$90,000 - $120,000',
      mid: '$125,000 - $165,000',
      senior: '$170,000 - $225,000',
      leadExec: '$235,000 - $300,000',
    },
    remoteAvailability: '80% Remote / Event Travel',
    technicalVsCreativeRatio: { technical: 40, creative: 60 },
    coreToolStack: ['GRIN', 'Upfluence', 'Modash', 'DocuSign', 'Shopify Collabs', 'Google Sheets'],
    primaryMission: 'Recruits, negotiates, and manages a global network of hundreds of authentic creators producing high-converting UGC and cultural endorsement.',
    dayInTheLife: 'Negotiates multi-month creator exclusivity contracts, audits influencer media kits for fake bot followers, approves creator script drafts, and reviews CPA and whitelisted ad ROAS generated by creator content.',
    careerAdvancement: ['Influencer Coordinator', 'Partnerships Manager', 'Director of Creator Marketing', 'VP of Brand Partnerships'],
    interviewTopicSample: 'How do you structure compensation (flat fee vs rev-share vs hybrid) to motivate creators while protecting brand downside risk?',
  },
];

export interface AgencyVsInHouseModel {
  attribute: string;
  agencyModel: string;
  inHouseModel: string;
  bestFitRecommendation: string;
}

export const AGENCY_VS_INHOUSE_MODELS: AgencyVsInHouseModel[] = [
  {
    attribute: 'Compensation & Fee Structure',
    agencyModel: 'Monthly Retainer ($5k-$50k/mo) + % of Ad Spend (7-15%) or Performance Commission.',
    inHouseModel: 'Fixed Annual Salary + Benefits + Company Equity / Bonuses.',
    bestFitRecommendation: 'Startups testing channels should hire agencies to avoid hiring overhead; mature brands in-house for lower long-term cost.',
  },
  {
    attribute: 'Specialization & Skill Breadth',
    agencyModel: 'Broad multi-account exposure. Cross-pollinates winning tactics observed across 50+ diverse client accounts.',
    inHouseModel: 'Deep domain expertise. 100% focused on understanding the single company’s nuances, product, and ICP.',
    bestFitRecommendation: 'Hire specialized agencies for fast-moving platforms (TikTok/Meta ads); build in-house teams for product marketing and brand.',
  },
  {
    attribute: 'Agility & Execution Speed',
    agencyModel: 'Rapid creative iteration and specialized tools, but must juggle multiple competing client deadlines.',
    inHouseModel: 'Instant communication with internal product and sales teams; zero scope-of-work friction.',
    bestFitRecommendation: 'In-house wins on cross-functional launches; agencies win on high-volume creative production.',
  },
  {
    attribute: 'Data Ownership & Learning Retention',
    agencyModel: 'Learning often stays with the agency team; risk of institutional knowledge loss if agency is replaced.',
    inHouseModel: 'All experimentation data, audience insights, and pixel history remain permanently internal to the organization.',
    bestFitRecommendation: 'Ensure all ad accounts, analytics, and software are owned by the client company, not the agency.',
  },
];
