export interface PlatformMetrics {
  mau: number; // in Millions
  dau?: number; // in Millions
  growthRateYoY: string;
  avgDailyMinutes: number;
  adRevenueEstimate: string; // e.g., "$135B (2025/2026)"
  engagementRateBench: string;
}

export interface PlatformDemographics {
  primaryAgeGroup: string;
  genderSplit: { male: number; female: number; other?: number };
  topRegions: string[];
  userPersona: string;
}

export interface SocialPlatform {
  id: string;
  name: string;
  tagline: string;
  parentCompany: string;
  foundedYear: number;
  headquarters: string;
  taxonomy: 
    | 'Social Network'
    | 'Visual Media'
    | 'Short-Form Video'
    | 'Messaging & Super App'
    | 'Professional Network'
    | 'Discussion & Forum'
    | 'Ephemeral & AR'
    | 'Microblogging'
    | 'Knowledge & Q&A'
    | 'Community & Voice';
  regionDominance: 'Global' | 'North America' | 'APAC' | 'EMEA' | 'LATAM';
  metrics: PlatformMetrics;
  demographics: PlatformDemographics;
  monetization: {
    primary: string;
    secondary: string[];
    creatorRevenueShare: string;
  };
  algorithmEngine: {
    name: string;
    type: string;
    rankingFactors: string[];
    corePhilosophy: string;
  };
  dataArchitecture: {
    storageEngine: string;
    graphDb: string;
    streamIngestion: string;
    cacheLayer: string;
    specialTech: string;
  };
  color: string;
  iconName: string;
  status2026Insight: string;
}

export const PLATFORMS_DATA: SocialPlatform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'The foundational global social graph connecting over 3 billion people',
    parentCompany: 'Meta Platforms, Inc.',
    foundedYear: 2004,
    headquarters: 'Menlo Park, California, USA',
    taxonomy: 'Social Network',
    regionDominance: 'Global',
    metrics: {
      mau: 3070,
      dau: 2110,
      growthRateYoY: '+3.2%',
      avgDailyMinutes: 34,
      adRevenueEstimate: '$135.2B',
      engagementRateBench: '1.4% (Groups & Community)',
    },
    demographics: {
      primaryAgeGroup: '25-44 (56%)',
      genderSplit: { male: 56, female: 44 },
      topRegions: ['APAC (44%)', 'EMEA (22%)', 'LATAM (19%)', 'North America (15%)'],
      userPersona: 'Family-centric connectors, local marketplace buyers, niche community members, and SMB advertisers.',
    },
    monetization: {
      primary: 'Targeted Programmatic Ads (Advantage+ AI)',
      secondary: ['Marketplace fee structures', 'Meta Verified Subscriptions', 'Creator Stars & Subscriptions'],
      creatorRevenueShare: '55% on in-stream ads and Reels performance bonuses',
    },
    algorithmEngine: {
      name: 'Meta EdgeRank & Multimodal Deep Learning (DLRM)',
      type: 'Two-stage candidate retrieval with collaborative filtering and real-time affinity scoring',
      rankingFactors: [
        'Friend & Group Affinity score (Inventory scoring)',
        'Content Type Weight (Reels > Native Video > Photos > Links)',
        'Meaningful Social Interactions (Long-form comments and shares)',
        'Recency decay function (Time-decay decay lambda)',
      ],
      corePhilosophy: 'Prioritize content from close ties and hyper-active community groups while dynamically inserting discovery Reels.',
    },
    dataArchitecture: {
      storageEngine: 'RocksDB + MySQL Shards + Warm/Cold Stratified Storage',
      graphDb: 'Meta TAO (The Associations and Objects distributed graph cache, >100M QPS)',
      streamIngestion: 'Scribe + Apache Pulsar/Kafka pipelines',
      cacheLayer: 'Memcached (distributed tier with Mcrouter router proxy)',
      specialTech: 'ZippyDB distributed key-value store; PyTorch distributed training clusters.',
    },
    color: '#1877F2',
    iconName: 'Share2',
    status2026Insight: 'Surpassing 3.07B MAUs with massive resurgence among young adults joining local Facebook Marketplace and hyper-local interest groups.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'The global epicenter of long-form video, streaming, and educational entertainment',
    parentCompany: 'Alphabet Inc. (Google)',
    foundedYear: 2005,
    headquarters: 'San Bruno, California, USA',
    taxonomy: 'Visual Media',
    regionDominance: 'Global',
    metrics: {
      mau: 2504,
      dau: 1220,
      growthRateYoY: '+4.8%',
      avgDailyMinutes: 48,
      adRevenueEstimate: '$36.4B (Ad) + $18B (Services)',
      engagementRateBench: '2.8% (Like/Comment to View)',
    },
    demographics: {
      primaryAgeGroup: '18-49 (68%)',
      genderSplit: { male: 54, female: 46 },
      topRegions: ['North America', 'APAC (India #1 MAU)', 'EMEA', 'LATAM'],
      userPersona: 'Lifelong learners, deep-dive hobbyists, music listeners, and multi-format video consumers.',
    },
    monetization: {
      primary: 'TrueView In-stream Video Ads & Shorts Rev-Share',
      secondary: ['YouTube Premium Subscriptions', 'Channel Memberships & Super Chats', 'YouTube Shopping affiliate tags'],
      creatorRevenueShare: '55% for long-form partner program; 45% pool for YouTube Shorts',
    },
    algorithmEngine: {
      name: 'Google Two-Stage Deep Neural Network for Recommendation',
      type: 'Extreme multi-class classification candidate generation + deep ranking neural network',
      rankingFactors: [
        'Click-Through Rate (CTR) multiplied by Average Percentage Viewed (APV)',
        'Session Duration & Long-Term Watch Journey Lift',
        'User Satisfaction Signals (Survey ratings, not-interested taps)',
        'Viewer Topic Co-occurrence embedding proximity',
      ],
      corePhilosophy: 'Maximize aggregate user satisfaction and total engaged watch session time over raw clickbait impulses.',
    },
    dataArchitecture: {
      storageEngine: 'Google Spanner (globally distributed) + Bigtable + Colossus Distributed FS',
      graphDb: 'Knowledge Graph integration with Google Search index',
      streamIngestion: 'Google Cloud Pub/Sub & MillWheel real-time processing',
      cacheLayer: 'Google Edge CDN & Global Cache (BFE / Borg Edge)',
      specialTech: 'YouTube Transcoder (Argon ASIC clusters for 4K AV1/VP9 video encoding).',
    },
    color: '#FF0000',
    iconName: 'Youtube',
    status2026Insight: 'Living room Connected TV (CTV) viewing accounts for over 38% of total watch hours; YouTube Shorts rivals TikTok in daily volume.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    tagline: 'The world’s ubiquitous end-to-end encrypted private communication layer',
    parentCompany: 'Meta Platforms, Inc.',
    foundedYear: 2009,
    headquarters: 'Menlo Park, California, USA',
    taxonomy: 'Messaging & Super App',
    regionDominance: 'Global',
    metrics: {
      mau: 2050,
      dau: 1650,
      growthRateYoY: '+6.1%',
      avgDailyMinutes: 38,
      adRevenueEstimate: '$3.5B (Business Messaging)',
      engagementRateBench: '98% Message Open Rate',
    },
    demographics: {
      primaryAgeGroup: '18-55+ (Universal span)',
      genderSplit: { male: 52, female: 48 },
      topRegions: ['LATAM (Brazil #1)', 'APAC (India 500M+)', 'EMEA', 'Emerging North America'],
      userPersona: 'Individuals, corporate teams, and SMBs conducting daily communication and conversational commerce.',
    },
    monetization: {
      primary: 'WhatsApp Business API (Per-conversation tiered pricing)',
      secondary: ['Click-to-WhatsApp Ads on Facebook/Instagram', 'WhatsApp Pay merchant fees', 'Meta Verified for Business'],
      creatorRevenueShare: 'Channel monetization through sponsored broadcast posts and newsletter subscriptions',
    },
    algorithmEngine: {
      name: 'Zero-Access Encryption Routing & Channel Discovery',
      type: 'Strict peer-to-peer/relay routing with zero algorithmic feed manipulation in chats',
      rankingFactors: [
        'Chronological recency in direct chats',
        'Channel Directory algorithmic indexing based on verified subscriber growth and engagement',
        'Spam detection via metadata behavioral heuristics (graph clustering)',
      ],
      corePhilosophy: 'Absolute privacy by design (Signal Protocol E2EE) while opening public broadcast channels for entities.',
    },
    dataArchitecture: {
      storageEngine: 'Erlang Mnesia & SQLite on-device local storage + Meta blob storage for media',
      graphDb: 'Ephemeral contact discovery without server-side contact book caching',
      streamIngestion: 'Custom Erlang OTP / Elixir distributed message broker clusters',
      cacheLayer: 'Ephemeral memory queues with auto-delete after ACK delivery',
      specialTech: 'Signal Protocol double ratchet key exchange; Noise Protocol framework.',
    },
    color: '#25D366',
    iconName: 'MessageSquare',
    status2026Insight: 'WhatsApp Channels has crossed 700M monthly active viewers, transforming it from a pure messenger into a broadcast ecosystem.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'The cultural aesthetic canvas for visual storytelling, Reels, and lifestyle commerce',
    parentCompany: 'Meta Platforms, Inc.',
    foundedYear: 2010,
    headquarters: 'Menlo Park, California, USA',
    taxonomy: 'Visual Media',
    regionDominance: 'Global',
    metrics: {
      mau: 2000,
      dau: 1400,
      growthRateYoY: '+5.4%',
      avgDailyMinutes: 33,
      adRevenueEstimate: '$68.5B',
      engagementRateBench: '1.9% (Carousels leading at 2.4%)',
    },
    demographics: {
      primaryAgeGroup: '18-34 (62%)',
      genderSplit: { male: 51, female: 49 },
      topRegions: ['North America', 'APAC', 'EMEA', 'LATAM'],
      userPersona: 'Visual creatives, tastemakers, fashion/beauty consumers, and dynamic storytellers.',
    },
    monetization: {
      primary: 'Story, Feed, & Reels Native Sponsored Content Ads',
      secondary: ['Instagram Shop Affiliate Tagging', 'Creator Subscriptions', 'Badges in Live Broadcasts'],
      creatorRevenueShare: 'Rev-share on Reels monetization bonus programs and 100% of fan subscriptions (minus app store fees)',
    },
    algorithmEngine: {
      name: 'Separate Multi-Surface Ranking (Feed, Stories, Explore, Reels)',
      type: 'Vector embedding search matching viewer historical engagement with candidate items',
      rankingFactors: [
        'DMs and Share Velocity (The #1 signal for Reels viral reach in 2026)',
        'Saves & Carousel Slide-through rate',
        'Viewer-Creator Interaction History (Direct message affinity and comment depth)',
        'Audio Track Trending Velocity',
      ],
      corePhilosophy: 'Connect people with the creators, aesthetic trends, and friends they find inspiring.',
    },
    dataArchitecture: {
      storageEngine: 'Meta Sharded PostgreSQL & Cassandra for media indices + RocksDB',
      graphDb: 'Meta TAO social graph engine',
      streamIngestion: 'Scribe & Meta Real-Time Stream Processor',
      cacheLayer: 'Memcached tier caching user timelines and Story status bitsets',
      specialTech: 'IG FastImage rendering pipeline and client-side pre-fetching predictions.',
    },
    color: '#E4405F',
    iconName: 'Instagram',
    status2026Insight: 'Private DMs and Story shares have officially surpassed public feed comments as the dominant driver of organic algorithmic distribution.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'The algorithmic entertainment engine revolutionizing short video & discovery commerce',
    parentCompany: 'ByteDance Ltd.',
    foundedYear: 2016,
    headquarters: 'Los Angeles, USA & Singapore',
    taxonomy: 'Short-Form Video',
    regionDominance: 'Global',
    metrics: {
      mau: 1580,
      dau: 1050,
      growthRateYoY: '+8.9%',
      avgDailyMinutes: 58,
      adRevenueEstimate: '$24.8B (Ad) + $20B+ (TikTok Shop GMV cut)',
      engagementRateBench: '4.6% (Highest among video platforms)',
    },
    demographics: {
      primaryAgeGroup: '13-29 (64%)',
      genderSplit: { male: 46, female: 54 },
      topRegions: ['North America (US 170M+)', 'Southeast Asia', 'EMEA', 'LATAM'],
      userPersona: 'Gen Z and Millennial trendsetters, meme architects, short-form narrative storytellers, and social searchers.',
    },
    monetization: {
      primary: 'In-Feed Spark Ads & TopView Banners',
      secondary: ['TikTok Shop E-Commerce Commissions (5-8%)', 'Live Streaming Virtual Gifts (Diamonds)', 'Creator Rewards Program'],
      creatorRevenueShare: 'Creator Rewards Program paying $0.40 - $1.20 RPM for qualified >1 min high-retention videos',
    },
    algorithmEngine: {
      name: 'ByteDance Monolith & Interest Graph Real-Time Neural Loop',
      type: 'Real-time embedding updates with sub-minute feedback loop on watch behavior',
      rankingFactors: [
        'Watch-Through Rate (Full Completion %) & Re-watch Loops',
        'Watch Time Threshold (First 3 seconds survival)',
        'Share to DM / External Link ratio',
        'Audio/Sound co-usage viral coefficient',
      ],
      corePhilosophy: 'The Interest Graph completely decouples reach from follower count; any video can reach millions based on merit.',
    },
    dataArchitecture: {
      storageEngine: 'Custom ByteDance BigStore NoSQL + HDFS/Ceph object storage',
      graphDb: 'Deep Graph Library (DGL) real-time interest node cluster',
      streamIngestion: 'Apache Kafka handling trillions of events/day + Apache Flink for real-time feature extraction',
      cacheLayer: 'Redis Cluster for active session state & pre-buffered video chunks',
      specialTech: 'Monolith: Real-Time Recommendation System with Collisionless Embedding Tables.',
    },
    color: '#00F2FE',
    iconName: 'Zap',
    status2026Insight: 'TikTok has become the primary search engine for over 40% of Gen Z users seeking restaurant, beauty, travel, and how-to recommendations.',
  },
  {
    id: 'wechat',
    name: 'WeChat (Weixin)',
    tagline: 'The ultimate operating system for modern digital life in China and beyond',
    parentCompany: 'Tencent Holdings Ltd.',
    foundedYear: 2011,
    headquarters: 'Shenzhen, Guangdong, China',
    taxonomy: 'Messaging & Super App',
    regionDominance: 'APAC',
    metrics: {
      mau: 1360,
      dau: 1100,
      growthRateYoY: '+3.1%',
      avgDailyMinutes: 82,
      adRevenueEstimate: '$18.2B',
      engagementRateBench: 'High intimacy (Moments & Mini-Programs)',
    },
    demographics: {
      primaryAgeGroup: '18-60+ (Universal penetration in China)',
      genderSplit: { male: 53, female: 47 },
      topRegions: ['China (92%)', 'Southeast Asia & Global Chinese Diaspora (8%)'],
      userPersona: 'Citizens, consumers, professionals, and municipal agencies conducting daily living through one interface.',
    },
    monetization: {
      primary: 'WeChat Pay Transaction Merchant Fees & Mini-Program Commerce',
      secondary: ['Moments In-Feed Advertising', 'Official Account Subscriptions', 'Channels (Video Account) Creator live sales'],
      creatorRevenueShare: 'WeChat Channels live-stream commissions and official account tipping',
    },
    algorithmEngine: {
      name: 'WeChat Channels (ShiPinHao) Social + Algorithmic Dual Engine',
      type: 'Hybrid social endorsement (what your WeChat friends "Liked") combined with AI topic clustering',
      rankingFactors: [
        'Social Endorsement (Friends Liked is the most prominent discovery badge)',
        'Completion Rate & Re-share to Group Chats',
        'Official Account subscriber loyalty coefficient',
      ],
      corePhilosophy: 'Prioritize trusted private social circles first, leveraging friend endorsements to seed public algorithmic discovery.',
    },
    dataArchitecture: {
      storageEngine: 'Tencent PaxosStore (high-availability distributed transaction store)',
      graphDb: 'Custom massive graph engine mapping relationships across 1B+ nodes',
      streamIngestion: 'Tencent TubeMQ / Kafka real-time ingestion pipelines',
      cacheLayer: 'CKV (Custom Key-Value store holding billions of user sessions)',
      specialTech: 'Mini-Programs runtime sandbox supporting millions of standalone lightweight web apps.',
    },
    color: '#07C160',
    iconName: 'Globe',
    status2026Insight: 'WeChat Mini-Programs daily transaction GMV has surpassed $400B annually, cementing its position as an entire commerce operating system.',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    tagline: 'The high-speed, uncensored cloud messenger and decentralized mini-app ecosystem',
    parentCompany: 'Telegram FZ-LLC',
    foundedYear: 2013,
    headquarters: 'Dubai, United Arab Emirates',
    taxonomy: 'Messaging & Super App',
    regionDominance: 'Global',
    metrics: {
      mau: 950,
      dau: 500,
      growthRateYoY: '+15.2%',
      avgDailyMinutes: 32,
      adRevenueEstimate: '$1.8B',
      engagementRateBench: '35% Channel Post View Rate',
    },
    demographics: {
      primaryAgeGroup: '18-39 (72%)',
      genderSplit: { male: 59, female: 41 },
      topRegions: ['Eastern Europe & Central Asia', 'India', 'Middle East', 'LATAM'],
      userPersona: 'Tech enthusiasts, crypto communities, independent journalists, and gamers utilizing lightweight mini-apps.',
    },
    monetization: {
      primary: 'Telegram Premium Subscriptions ($4.99/mo) & Fragment Ad Platform',
      secondary: ['The Open Network (TON) blockchain microtransactions', 'Sponsored channel messages', 'Collectible usernames & virtual goods'],
      creatorRevenueShare: '50% of ad revenue generated in public channels distributed via TON cryptocurrency',
    },
    algorithmEngine: {
      name: 'Chronological Channel Broadcast with Zero Filter Bubbles',
      type: 'Strict time-ordered broadcast stream with opt-in algorithmic channel search recommendations',
      rankingFactors: [
        'Chronological order strictly maintained in chats and channels',
        'Channel recommendation engine based on topic tags and language similarity',
        'Anti-spam reputation heuristics',
      ],
      corePhilosophy: 'Give creators direct uncensored access to 100% of their subscribers with zero algorithmic suppression or throttling.',
    },
    dataArchitecture: {
      storageEngine: 'Custom MTProto schema with distributed encrypted storage across international data jurisdictions',
      graphDb: 'Relational index shards with server-side message history synchronization',
      streamIngestion: 'In-house high-throughput C++ microservices',
      cacheLayer: 'Multi-datacenter distributed RAM caches',
      specialTech: 'MTProto 2.0 protocol; Telegram Mini Apps (TMA) running high-performance WebGL/React apps.',
    },
    color: '#229ED9',
    iconName: 'Send',
    status2026Insight: 'Surging toward 1 Billion MAUs powered by the explosive adoption of Telegram Mini Apps and decentralized TON crypto-economy rails.',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    tagline: 'The pioneer of ephemeral visual communication and augmented reality lenses',
    parentCompany: 'Snap Inc.',
    foundedYear: 2011,
    headquarters: 'Santa Monica, California, USA',
    taxonomy: 'Ephemeral & AR',
    regionDominance: 'North America',
    metrics: {
      mau: 800,
      dau: 432,
      growthRateYoY: '+7.8%',
      avgDailyMinutes: 35,
      adRevenueEstimate: '$5.4B',
      engagementRateBench: 'High streak loyalty',
    },
    demographics: {
      primaryAgeGroup: '13-24 (58%)',
      genderSplit: { male: 48, female: 52 },
      topRegions: ['North America (90% of 13-24 demo)', 'Europe', 'India & Middle East'],
      userPersona: 'Gen Z and Gen Alpha best-friend communicators obsessed with streaks, custom Bitmojis, and AR camera filters.',
    },
    monetization: {
      primary: 'Snap Ads, Story Takeovers, and Sponsored AR Lenses',
      secondary: ['Snapchat+ Subscription ($3.99/mo, >9M subscribers)', 'Spotlight Creator rewards', 'Bitmoji digital commerce'],
      creatorRevenueShare: 'Spotlight daily prize pool rewarding top performing viral short snaps',
    },
    algorithmEngine: {
      name: 'Friends Graph Separation + Spotlight AI Ranker',
      type: 'Dual-architecture: Strict peer-to-peer friends feed separated from algorithmic public Spotlight & Discover',
      rankingFactors: [
        'Snap Completion Rate and Quick Re-shares to Chat',
        'Snap Map geographical relevance',
        'AR Lens engagement duration and viral adoption',
      ],
      corePhilosophy: 'Keep close friends separate from public influencers; make the camera the fundamental starting interface.',
    },
    dataArchitecture: {
      storageEngine: 'Google Cloud Datastore / Bigtable + AWS S3 for short-lived ephemeral media',
      graphDb: 'Friends Graph mapping mutual intimacy scores and Snap Streaks',
      streamIngestion: 'Kafka streams feeding real-time ephemeral deletion cron jobs',
      cacheLayer: 'Memcached on Google Cloud Platform',
      specialTech: 'Snap AR Engine (Lens Studio real-time neural face mesh tracking).',
    },
    color: '#FFFC00',
    iconName: 'Camera',
    status2026Insight: 'Snapchat+ has become one of the most successful consumer software subscriptions in tech, with over 10 million paying subscribers.',
  },
  {
    id: 'kuaishou',
    name: 'Kuaishou',
    tagline: 'The authentic, grassroots video community driving massive live-stream e-commerce',
    parentCompany: 'Kuaishou Technology',
    foundedYear: 2011,
    headquarters: 'Beijing, China',
    taxonomy: 'Short-Form Video',
    regionDominance: 'APAC',
    metrics: {
      mau: 700,
      dau: 395,
      growthRateYoY: '+6.2%',
      avgDailyMinutes: 70,
      adRevenueEstimate: '$14.2B',
      engagementRateBench: '4.9% (High live interaction)',
    },
    demographics: {
      primaryAgeGroup: '20-45 (Tier 2, 3, & 4 cities)',
      genderSplit: { male: 54, female: 46 },
      topRegions: ['China (88%)', 'LATAM (via Kwai app 12%)'],
      userPersona: 'Everyday working-class creators, farmers, artisans, and community live-stream shoppers valuing genuine warmth.',
    },
    monetization: {
      primary: 'Live-Streaming E-Commerce Gross Merchandise Value (GMV) Commissions',
      secondary: ['Virtual Gifting during live streams', 'Online Marketing Services (Kuaishou Ads)', 'Short-drama micro-paywalls'],
      creatorRevenueShare: 'Live streamers keep 50-60% of virtual gifts and tier-based merchant sales commissions',
    },
    algorithmEngine: {
      name: 'Trust-Based Community Inclusive Fair Distribution Algorithm',
      type: 'Gini coefficient controlled distribution ensuring non-celebrity creators receive guaranteed baseline impressions',
      rankingFactors: [
        'Creator-Viewer Trust Index (Repeat comment frequency)',
        'Gini Coefficient balancing (Preventing top 1% from hoarding all views)',
        'Live-stream conversion and viewer chat velocity',
      ],
      corePhilosophy: 'Fairness and warmth over celebrity monopoly; cultivate lasting trust between everyday creators and buyers.',
    },
    dataArchitecture: {
      storageEngine: 'Distributed hybrid cloud with custom columnar storage',
      graphDb: 'Massive bipartite graph for creator-follower trust evaluation',
      streamIngestion: 'Apache Flink real-time stream aggregation',
      cacheLayer: 'Distributed Redis clusters managing live room interaction buffers',
      specialTech: 'Kwai AI Video generation (Kling AI generative video model integration).',
    },
    color: '#FF5000',
    iconName: 'Tv',
    status2026Insight: 'Kling AI video generation model developed by Kuaishou has made it an AI frontier powerhouse alongside its e-commerce strength.',
  },
  {
    id: 'x_twitter',
    name: 'X (formerly Twitter)',
    tagline: 'The global town square for breaking news, rapid debate, tech, and cultural discourse',
    parentCompany: 'X Corp.',
    foundedYear: 2006,
    headquarters: 'Bastrop, Texas, USA',
    taxonomy: 'Microblogging',
    regionDominance: 'Global',
    metrics: {
      mau: 611,
      dau: 260,
      growthRateYoY: '+2.1%',
      avgDailyMinutes: 31,
      adRevenueEstimate: '$2.9B',
      engagementRateBench: '0.9% (High quote-tweet velocity)',
    },
    demographics: {
      primaryAgeGroup: '24-49 (65%)',
      genderSplit: { male: 63, female: 37 },
      topRegions: ['North America (US #1)', 'Japan (#2)', 'United Kingdom', 'EMEA'],
      userPersona: 'Journalists, software engineers, venture capitalists, political observers, and breaking news scavengers.',
    },
    monetization: {
      primary: 'X Premium (Basic, Premium, Premium+) & Verified Organizations',
      secondary: ['Targeted programmatic advertising', 'Creator Revenue Share payouts', 'Enterprise Data API access tiers ($42k/mo)'],
      creatorRevenueShare: 'Creator Ads Revenue Sharing based on organic impressions of ads in verified replies',
    },
    algorithmEngine: {
      name: 'Open-Source For You Algorithm & Grok AI Ranker',
      type: 'Heavy Ranker neural network utilizing SimClusters community graph matrix factorizations',
      rankingFactors: [
        'Likes (0.5x weight) vs Retweets (1.0x) vs Direct Replies with author response (75x boost)',
        'X Premium boost multiplier (2x to 4x reach amplification)',
        'Out-of-network discovery via SimClusters latent community topic clustering',
        'Media presence (Video native uploads favored over raw external links)',
      ],
      corePhilosophy: 'Optimize for unregretted user minutes while rewarding rapid dialogue and breaking news velocity.',
    },
    dataArchitecture: {
      storageEngine: 'Manhattan distributed key-value store + MySQL Shards',
      graphDb: 'FlockDB distributed graph database for follow networks',
      streamIngestion: 'Apache Kafka running high-volume tweet ingestion fanouts',
      cacheLayer: 'Twemcache (Memcached fork) storing timeline home buffers',
      specialTech: 'xAI Grok integration for real-time semantic query answering and news summaries.',
    },
    color: '#000000',
    iconName: 'MessageCircle',
    status2026Insight: 'Native long-form video and Grok AI integration have transformed the platform into an open media network beyond 280-character text.',
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    tagline: 'The visual search and intentional inspiration engine for future planning and shopping',
    parentCompany: 'Pinterest, Inc.',
    foundedYear: 2010,
    headquarters: 'San Francisco, California, USA',
    taxonomy: 'Visual Media',
    regionDominance: 'North America',
    metrics: {
      mau: 518,
      dau: 145,
      growthRateYoY: '+10.5%',
      avgDailyMinutes: 26,
      adRevenueEstimate: '$3.8B',
      engagementRateBench: '8.5% (Pin Save / Board curation rate)',
    },
    demographics: {
      primaryAgeGroup: '20-49 (69%)',
      genderSplit: { male: 26, female: 69, other: 5 },
      topRegions: ['North America (US 90M+)', 'Europe', 'Emerging LATAM'],
      userPersona: 'Interior decorators, wedding planners, fashion curators, DIY hobbyists, and high-intent buyers planning purchases.',
    },
    monetization: {
      primary: 'Promoted Pins & Direct Shopping Product Ads',
      secondary: ['Amazon Multi-Year Ad Partnership', 'Shoppable Catalogs & Merchant storefronts', 'Creator Idea Pins'],
      creatorRevenueShare: 'Direct affiliate link commissions and brand sponsorship integrations',
    },
    algorithmEngine: {
      name: 'PinSage Graph Convolutional Neural Network (GCN)',
      type: 'Deep learning on petascale bipartite graphs combining visual features and board curation semantics',
      rankingFactors: [
        'Board Co-Occurrence (How often two pins are saved to the same themed board)',
        'Visual Similarity Embeddings via Convolutional feature extraction',
        'Search Intent & Keyword Semantic match',
        'Shopping Propensity and Buy Intent signals',
      ],
      corePhilosophy: 'Help users discover ideas they want to bring to life, optimizing for personal utility rather than social comparison.',
    },
    dataArchitecture: {
      storageEngine: 'HBase / RocksDB on AWS + Amazon S3 for imagery',
      graphDb: 'PinSage custom graph deep learning cluster operating on 3B+ pins and 30B+ boards',
      streamIngestion: 'Apache Kafka feeding real-time user intent signals',
      cacheLayer: 'Memcached clusters running on AWS EC2',
      specialTech: 'Visual Search Camera: Real-time mobile visual object recognition and product matching.',
    },
    color: '#E60023',
    iconName: 'Bookmark',
    status2026Insight: 'Gen Z now represents over 42% of Pinterest users, driving massive growth in aesthetic moodboards, collage creations, and vintage fashion curation.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    tagline: 'The premier professional network, B2B marketplace, and career knowledge repository',
    parentCompany: 'Microsoft Corporation',
    foundedYear: 2002,
    headquarters: 'Sunnyvale, California, USA',
    taxonomy: 'Professional Network',
    regionDominance: 'Global',
    metrics: {
      mau: 350, // Active monthly consumers out of 1B+ registered members
      dau: 160,
      growthRateYoY: '+8.1%',
      avgDailyMinutes: 18,
      adRevenueEstimate: '$17.5B (Total LinkedIn revenue including Talent Solutions)',
      engagementRateBench: '2.6% (B2B Thought Leadership)',
    },
    demographics: {
      primaryAgeGroup: '25-54 (74%)',
      genderSplit: { male: 56, female: 44 },
      topRegions: ['North America (US 220M+)', 'EMEA (250M+)', 'APAC (India 120M+)', 'LATAM'],
      userPersona: 'Corporate executives, job seekers, software engineers, founders, and B2B enterprise sales professionals.',
    },
    monetization: {
      primary: 'Talent Solutions (LinkedIn Recruiter Enterprise licenses)',
      secondary: ['LinkedIn Marketing Solutions (Sponsored B2B InMail & Content Ads)', 'LinkedIn Premium Career & Business', 'Sales Navigator'],
      creatorRevenueShare: 'Top Voice badges, newsletter subscriber monetization, and LinkedIn Learning instructor royalties',
    },
    algorithmEngine: {
      name: 'Economic Graph Relevance & DLRM Multi-Objective Optimization',
      type: 'Multi-objective ranking predicting professional value, constructive comments, and relevance',
      rankingFactors: [
        'Professional Relevance & Topical Niche Authority (Creator industry vs viewer industry)',
        'Constructive Comments (>10 words demonstrating domain expertise)',
        'Dwell Time on PDFs / Document Carousels',
        'Penalization for engagement-bait ("Comment YES to get the PDF")',
      ],
      corePhilosophy: 'Facilitate economic opportunity by matching professionals with relevant ideas, skills, and business partners.',
    },
    dataArchitecture: {
      storageEngine: 'Espresso (LinkedIn internal distributed document store) + Venice serving platform',
      graphDb: 'Economic Graph linking members, companies, jobs, and skills in real-time',
      streamIngestion: 'Apache Kafka (originally invented and open-sourced by LinkedIn)',
      cacheLayer: 'Couchbase distributed memory caching',
      specialTech: 'Dagli (Machine learning framework) & Microsoft Azure AI Copilot writing assistants.',
    },
    color: '#0A66C2',
    iconName: 'Briefcase',
    status2026Insight: 'Over 1 Billion global members, with video posts and document carousels generating the highest corporate B2B lead generation conversion.',
  },
  {
    id: 'threads',
    name: 'Threads',
    tagline: 'Meta’s rapid-growth conversational platform engineered for positive public dialogue',
    parentCompany: 'Meta Platforms, Inc.',
    foundedYear: 2023,
    headquarters: 'Menlo Park, California, USA',
    taxonomy: 'Microblogging',
    regionDominance: 'North America',
    metrics: {
      mau: 275,
      dau: 125,
      growthRateYoY: '+42.5%',
      avgDailyMinutes: 22,
      adRevenueEstimate: '$450M (Early monetization rollout)',
      engagementRateBench: '3.1% (High reply ratios)',
    },
    demographics: {
      primaryAgeGroup: '18-40 (61%)',
      genderSplit: { male: 50, female: 50 },
      topRegions: ['North America', 'Japan', 'LATAM', 'EMEA'],
      userPersona: 'Displaced Twitter/X users, Instagram creators expanding into text, pop culture analysts, and optimistic conversationalists.',
    },
    monetization: {
      primary: 'Sponsored In-Feed Thread Placement (Advantage+ integration)',
      secondary: ['Meta Verified perks', 'Creator Tip Jars', 'Fediverse cross-publishing'],
      creatorRevenueShare: 'Threads creator bonus programs and integrated branded content tags',
    },
    algorithmEngine: {
      name: 'Federated ActivityPub + Instagram Knowledge Ranker',
      type: 'Graph bridging combining your existing Instagram follow network with emerging topical topic clusters',
      rankingFactors: [
        'Thread Replies & Extended Dialogue Depth',
        'Instagram Social Graph Seed Affinity',
        'Topic tags (Single clean topic tag per thread enforcement)',
        'Downranking of rage-bait, political hyperbole, and repetitive copypasta',
      ],
      corePhilosophy: 'Foster a relaxed, friendly public space for conversations without algorithmic outrage mechanics.',
    },
    dataArchitecture: {
      storageEngine: 'Meta Sharded PostgreSQL & RocksDB infrastructure',
      graphDb: 'Integrated Meta TAO + ActivityPub W3C protocol federation endpoints',
      streamIngestion: 'Scribe / Pulsar real-time pipeline',
      cacheLayer: 'Memcached tier shared with Instagram',
      specialTech: 'ActivityPub protocol integration connecting Threads to Mastodon and the open Fediverse.',
    },
    color: '#101010',
    iconName: 'AtSign',
    status2026Insight: 'Surpassed 275M MAUs, gaining substantial ground on X by prioritizing positive sports, entertainment, and tech discussions.',
  },
  {
    id: 'reddit',
    name: 'Reddit',
    tagline: 'The front page of the internet and collective consciousness of human communities',
    parentCompany: 'Reddit Inc.',
    foundedYear: 2005,
    headquarters: 'San Francisco, California, USA',
    taxonomy: 'Discussion & Forum',
    regionDominance: 'North America',
    metrics: {
      mau: 850, // Monthly unique visitors
      dau: 73,
      growthRateYoY: '+18.4%',
      avgDailyMinutes: 29,
      adRevenueEstimate: '$1.4B (Ad) + $280M (Data Licensing)',
      engagementRateBench: 'High upvote / comment volume',
    },
    demographics: {
      primaryAgeGroup: '18-34 (64%)',
      genderSplit: { male: 61, female: 39 },
      topRegions: ['North America (US 48%)', 'United Kingdom', 'Canada', 'Australia', 'Germany'],
      userPersona: 'Pseudonymous researchers, gamers, niche hobbyists, troubleshooting techies, and authentic reviewers.',
    },
    monetization: {
      primary: 'Subreddit Contextual Ad Placements & Promoted Posts',
      secondary: ['LLM Training Data Licensing (Google & OpenAI agreements)', 'Reddit Premium ($5.99/mo)', 'Contributor Program (Gold to Cash)'],
      creatorRevenueShare: 'Contributor Program paying qualified moderators and top contributors cash for awarded Gold karma',
    },
    algorithmEngine: {
      name: 'Wilson Score Confidence Interval & Dynamic Subreddit Hotness',
      type: 'Mathematical voting confidence scoring balanced against logarithmic time decay',
      rankingFactors: [
        'Net Upvote to Downvote Velocity (Logarithmic Karma scale)',
        'Submission Recency (Hotness decay lambda)',
        'Comment Tree Depth and Controversy Variance',
        'Subreddit subscriber engagement frequency',
      ],
      corePhilosophy: 'Democratic, community-moderated curation where the collective wisdom decides what rises to the front page.',
    },
    dataArchitecture: {
      storageEngine: 'PostgreSQL clusters + Apache Cassandra for comment trees + AWS S3',
      graphDb: 'Subreddit category graphs & vector embeddings for semantic search',
      streamIngestion: 'Apache Kafka feeding event-driven indexing pipelines',
      cacheLayer: 'Redis & Fastly Edge CDN caching static subreddit feeds',
      specialTech: 'Vector Search: Semantic search allowing users to find answers across 18 years of user archives.',
    },
    color: '#FF4500',
    iconName: 'Compass',
    status2026Insight: 'Massive surge in organic Google Search referrals as users universally append "reddit" to queries seeking unfiltered human advice.',
  },
  {
    id: 'douyin',
    name: 'Douyin',
    tagline: 'China’s domestic short-video, local life services, and livestream commerce powerhouse',
    parentCompany: 'ByteDance Ltd.',
    foundedYear: 2016,
    headquarters: 'Beijing, China',
    taxonomy: 'Short-Form Video',
    regionDominance: 'APAC',
    metrics: {
      mau: 750, // DAU is >700M
      dau: 710,
      growthRateYoY: '+5.5%',
      avgDailyMinutes: 105,
      adRevenueEstimate: '$32.5B',
      engagementRateBench: '5.2% (Deep livestream commerce)',
    },
    demographics: {
      primaryAgeGroup: '18-45 (Universal across urban China)',
      genderSplit: { male: 51, female: 49 },
      topRegions: ['Tier 1 & Tier 2 Chinese Metros (Beijing, Shanghai, Shenzhen, Chengdu)'],
      userPersona: 'Modern consumers ordering food, booking hotels, purchasing luxury goods, and consuming short dramas.',
    },
    monetization: {
      primary: 'Livestream E-Commerce Commissions (Take rate on $350B+ GMV)',
      secondary: ['Local Life Services (Food delivery, hotel bookings)', 'OceanEngine advertising system', 'Pay-per-episode micro-dramas'],
      creatorRevenueShare: 'Live streamers and MCN agencies earn 30-50% commission cuts on livestream merchant sales',
    },
    algorithmEngine: {
      name: 'ByteDance Hyper-Local Multi-Task Learning (MTL) Engine',
      type: 'Multi-gate mixture-of-experts (MMoE) balancing entertainment, local service purchases, and video completion',
      rankingFactors: [
        'Location-based Geohash Proximity (Within 5km for restaurant deals)',
        'Live Room Purchase Conversion Rate (GMV per 1,000 views)',
        'Video Completion Rate and Re-loop count',
        'Short-drama retention across 3-minute episodic cliffs',
      ],
      corePhilosophy: 'Seamlessly blend infinite digital entertainment with real-world offline consumer spending and local experiences.',
    },
    dataArchitecture: {
      storageEngine: 'ByteDance BigStore + Custom LSM-tree distributed database',
      graphDb: 'ByteGraph (trillion-edge real-time graph storage system)',
      streamIngestion: 'In-house high-throughput streaming processing clusters',
      cacheLayer: 'Distributed In-Memory Flash cache nodes',
      specialTech: 'Real-time 4K live video stream transcoding with sub-second ultra-low latency WebRTC.',
    },
    color: '#1C0B2B',
    iconName: 'Play',
    status2026Insight: 'Local Life Services (dining, hotel stays, cinema tickets) grew by over 60%, posing a direct challenge to Meituan in China.',
  },
  {
    id: 'vk',
    name: 'VK (VKontakte)',
    tagline: 'The dominant social network, media streaming, and super app in Eastern Europe and CIS',
    parentCompany: 'VK Group',
    foundedYear: 2006,
    headquarters: 'Saint Petersburg, Russia',
    taxonomy: 'Social Network',
    regionDominance: 'EMEA',
    metrics: {
      mau: 102,
      dau: 54,
      growthRateYoY: '+6.4%',
      avgDailyMinutes: 44,
      adRevenueEstimate: '$1.2B',
      engagementRateBench: '2.1% (Music & Video clips)',
    },
    demographics: {
      primaryAgeGroup: '18-40 (68%)',
      genderSplit: { male: 48, female: 52 },
      topRegions: ['Russia (85%)', 'Belarus', 'Kazakhstan', 'Central Asia'],
      userPersona: 'Regional internet users seeking an all-in-one ecosystem for social feeds, music streaming, video clips, and gaming.',
    },
    monetization: {
      primary: 'VK Ads (MyTarget Programmatic advertising)',
      secondary: ['VK Music Subscriptions', 'VK Pay microtransactions', 'Gaming virtual currency (VK Votes)'],
      creatorRevenueShare: 'VK Donut fan subscription payouts and video partner ad monetization',
    },
    algorithmEngine: {
      name: 'VK SmartFeed & Clips Recommendation ML',
      type: 'Neural collaborative filtering with strong weighting on user music listening history and community groups',
      rankingFactors: [
        'Community Group participation frequency',
        'Music and video content co-listening signals',
        'Friend interaction and wall post comments',
        'VK Clips short-video completion percentage',
      ],
      corePhilosophy: 'Provide a culturally tailored, full-featured digital hub combining media entertainment with personal networking.',
    },
    dataArchitecture: {
      storageEngine: 'Custom KPHP-compiled backend + MySQL Shards + Tarantool in-memory database',
      graphDb: 'Tarantool-based social graph holding user relationship trees',
      streamIngestion: 'Kafka pipelines powering real-time newsfeed generation',
      cacheLayer: 'Memcached + Tarantool in-memory clusters',
      specialTech: 'KPHP: High-performance PHP-to-C++ compiler developed internally for massive scaling.',
    },
    color: '#0077FF',
    iconName: 'Users',
    status2026Insight: 'Over 85M daily unique video views across VK Video and VK Clips as domestic video consumption consolidates.',
  },
  {
    id: 'quora',
    name: 'Quora',
    tagline: 'The global repository of high-level human knowledge, Q&A, and AI aggregator Poe',
    parentCompany: 'Quora Inc.',
    foundedYear: 2009,
    headquarters: 'Mountain View, California, USA',
    taxonomy: 'Knowledge & Q&A',
    regionDominance: 'Global',
    metrics: {
      mau: 400,
      dau: 65,
      growthRateYoY: '+7.0%',
      avgDailyMinutes: 15,
      adRevenueEstimate: '$320M',
      engagementRateBench: 'High search-inbound read time',
    },
    demographics: {
      primaryAgeGroup: '20-50 (Universal interest)',
      genderSplit: { male: 54, female: 46 },
      topRegions: ['North America (US #1)', 'India (Rapid growth)', 'United Kingdom', 'EMEA'],
      userPersona: 'Curious intellectuals, students, subject-matter experts, and developers exploring AI chatbots on Poe.',
    },
    monetization: {
      primary: 'Intent-Based Search and Contextual Text Ads',
      secondary: ['Poe AI Bot Subscription Platform ($19.99/mo)', 'Quora+ Content Paywalls', 'Space Creator subscriptions'],
      creatorRevenueShare: 'Poe AI Creator Monetization (paying developers per bot message) and Quora+ reading pool',
    },
    algorithmEngine: {
      name: 'Question-Answer Expertise PageRank & Poe Model Routing',
      type: 'Topic-based expertise graph scoring authors based on past upvotes from verified peers',
      rankingFactors: [
        'Author Domain Expertise Score in specific Topic ontology',
        'Answer Upvote-to-Impression ratio',
        'Answer Reading Depth & Length retention',
        'Search Intent relevance score',
      ],
      corePhilosophy: 'Share and grow the world’s knowledge by connecting people who have knowledge to those who need it.',
    },
    dataArchitecture: {
      storageEngine: 'MySQL Shards on AWS + Amazon Redshift + DynamoDB',
      graphDb: 'Custom Topic Hierarchy DAG (Directed Acyclic Graph) mapping 500k+ topics',
      streamIngestion: 'Kafka streams processing viewer read milestones',
      cacheLayer: 'Memcached tier caching hot answers',
      specialTech: 'Poe AI Orchestrator: Multi-model AI gateway routing requests to Claude, GPT-4, Gemini, and open-source models.',
    },
    color: '#B92B27',
    iconName: 'HelpCircle',
    status2026Insight: 'Poe AI has become Quora’s primary growth engine, paying millions to bot developers and serving as a universal multi-LLM consumer platform.',
  },
  {
    id: 'discord',
    name: 'Discord',
    tagline: 'The real-time voice, video, and text hangout for communities, gaming, and developers',
    parentCompany: 'Discord Inc.',
    foundedYear: 2015,
    headquarters: 'San Francisco, California, USA',
    taxonomy: 'Community & Voice',
    regionDominance: 'Global',
    metrics: {
      mau: 220,
      dau: 85,
      growthRateYoY: '+11.8%',
      avgDailyMinutes: 52,
      adRevenueEstimate: '$650M (Nitro Subscriptions & App Store)',
      engagementRateBench: 'Exceptionally high real-time chat throughput',
    },
    demographics: {
      primaryAgeGroup: '16-30 (71%)',
      genderSplit: { male: 66, female: 34 },
      topRegions: ['North America (US 40%)', 'Western Europe', 'APAC (Japan/Korea)', 'LATAM'],
      userPersona: 'PC & console gamers, crypto DAOs, open-source AI developers, and close-knit study or hangout squads.',
    },
    monetization: {
      primary: 'Discord Nitro & Nitro Basic Subscriptions ($2.99 - $9.99/mo)',
      secondary: ['Server Boosting tiers', 'App Directory developer commissions', 'Avatar Shop collectibles (Dekos)'],
      creatorRevenueShare: 'Server Subscription payouts (90% to creators minus payment processing)',
    },
    algorithmEngine: {
      name: 'Zero Algorithmic Feed (Server Guild Architecture)',
      type: 'Pure event-driven push architecture with zero algorithmic timeline manipulation or ad interruptions',
      rankingFactors: [
        'Chronological WebSocket event push in text channels',
        'Server Discovery ranking based on active voice occupants and verified community status',
        'AutoMod machine-learning toxic content filtering',
      ],
      corePhilosophy: 'Create space for everyone to find belonging; voice chat should feel as effortless as sitting in the same living room.',
    },
    dataArchitecture: {
      storageEngine: 'ScyllaDB (migrated from Cassandra to eliminate Java GC pauses, storing trillions of messages)',
      graphDb: 'Guild permission and role trees cached in memory via Elixir stateful processes',
      streamIngestion: 'In-house WebRTC voice gateway written in Rust + Erlang/Elixir broker nodes',
      cacheLayer: 'Redis Cluster for gateway sessions and ephemeral voice channel states',
      specialTech: 'Distributed WebRTC Voice Engine delivering sub-20ms packet latency across 200M concurrent voice users.',
    },
    color: '#5865F2',
    iconName: 'Headphones',
    status2026Insight: 'Midjourney, developer communities, and college study groups have turned Discord into the default workplace and social hub for Gen Z technical talent.',
  },
];
