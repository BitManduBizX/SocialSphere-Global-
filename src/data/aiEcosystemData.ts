export interface AiTrend {
  id: string;
  title: string;
  tagline: string;
  impactScore: string;
  timeframe: string;
  description: string;
  keyDrivers: string[];
  platformExamples: string[];
  strategicAction: string;
}

export const AI_ECOSYSTEM_TRENDS: AiTrend[] = [
  {
    id: 'trend-social-search',
    title: 'Social Search Overthrowing Traditional Web Search',
    tagline: 'Gen Z and younger cohorts default to TikTok, Reddit, and Instagram over Google',
    impactScore: 'High Disruption (40%+ Query Shift)',
    timeframe: '2024 - 2026 Active Shift',
    description: 'Over 40% of internet users under 30 now begin product discovery, restaurant searches, and travel planning on social apps rather than traditional search engines. Users prefer authentic, peer-tested visual video proof over ad-cluttered search engine results pages.',
    keyDrivers: [
      'Visual verification: Seeing real people test a restaurant dish or skincare routine in high definition',
      'Anti-SEO fatigue: Traditional search results are overrun by AI-generated affiliate listicles',
      'Algorithmic localization: Real-time geohash clustering recommending places currently trending nearby',
    ],
    platformExamples: [
      'TikTok Search: Auto-suggest search pills directly embedded into video comment sections',
      'Reddit Vector Search: Millions seeking human nuance by adding "reddit" to search queries',
      'Pinterest Visual Search: Snapping photos with phone cameras to find exact shoppable product matches',
    ],
    strategicAction: 'Shift SEO strategies to Social Search Optimization (SSO). Embed high-intent spoken keywords directly in video audio scripts and burned-in captions.',
  },
  {
    id: 'trend-genai-creative',
    title: 'GenAI Creative Proliferation & Autonomous Ad Variations',
    tagline: 'From manual photoshoot bottlenecks to thousands of personalized synthetic variations',
    impactScore: 'Transformative (80% Ad Pipeline Automation)',
    timeframe: '2025 - 2027 Proliferation',
    description: 'Generative video and image synthesis (Kling AI, Sora, Veo, Midjourney) allow marketing teams to produce 50+ localized variations of an ad from a single creative brief, altering background scenery, actor languages, and product accents on the fly.',
    keyDrivers: [
      'Algorithmic creative fatigue: Ad algorithms require continuous fresh creative to avoid CPM fatigue',
      'Hyper-localization: Dubbing voices and modifying text overlays into 30+ regional languages in seconds',
      'Dynamic product placement: Inserting brand logos and 3D product renders natively into video backgrounds',
    ],
    platformExamples: [
      'Meta Advantage+ Creative: AI auto-expands aspect ratios and generates multiple headline copy options',
      'TikTok Symphony: AI-generated virtual avatars reading marketing scripts with natural facial inflections',
      'Kuaishou Kling AI: High-fidelity generative physics simulations in creator video production',
    ],
    strategicAction: 'Treat AI as a creative multiplier. Humans own the emotional angle and core problem hook; AI scales the variations, aspect ratios, and localized translations.',
  },
  {
    id: 'trend-multimodal-recommendation',
    title: 'Multimodal Vector Embeddings in Recommendation Algorithms',
    tagline: 'Algorithms no longer just track clicks; they watch, listen, and comprehend video content',
    impactScore: 'Fundamental Paradigm Shift',
    timeframe: 'Mature 2026 Core',
    description: 'Modern recommendation engines convert video frames, background audio, speech phonemes, and text captions into unified high-dimensional vector embeddings. Algorithms comprehend emotional sentiment, comedic timing, and visual aesthetics directly.',
    keyDrivers: [
      'Two-stage retrieval scaling: Vector indexes (HNSW) searching across billions of multimodal embeddings in sub-10ms',
      'Elimination of hashtag dependency: Algorithms categorize content accurately even if the creator includes zero hashtags or descriptions',
      'Cross-lingual discovery: Videos in French or Korean can go viral in the US if visual pacing resonates universally',
    ],
    platformExamples: [
      'ByteDance Monolith: Real-time neural network with continuous online embedding updates',
      'YouTube Deep Neural Networks: Co-training visual frames with user satisfaction watch histories',
      'Pinterest PinSage: Graph convolutional networks combining visual pixels with board taxonomy',
    ],
    strategicAction: 'Focus on visual pacing, clear vocal delivery, and high audio clarity. The algorithm listens to the words spoken in your video to determine topical classification.',
  },
  {
    id: 'trend-synthetic-moderation',
    title: 'Automated Deepfake Watermarking & Semantic Guardrails',
    tagline: 'Balancing frictionless creative freedom against disinformation and platform safety',
    impactScore: 'Regulatory & Trust Essential',
    timeframe: '2024 - 2026 Enforced Standard',
    description: 'With generative media flooding social networks, major platforms enforce cryptographic metadata standards (C2PA / Content Credentials) to automatically label synthetic and manipulated media, paired with LLM-based toxic intent filters.',
    keyDrivers: [
      'Global regulatory frameworks mandating clear labeling of synthetic political and commercial media',
      'Automated semantic guardrails: LLM agents inspecting comment threads in real-time to suppress coordinated hate campaigns',
      'Bot network fingerprinting: Behavioral graph anomaly detection identifying coordinated bot farms',
    ],
    platformExamples: [
      'Meta AI Label: Automatic cryptographic detection flags AI-generated imagery and video in feed',
      'YouTube Creator Studio: Mandatory disclosure checkboxes for altered or synthetic realistic content',
      'Discord AutoMod: Machine-learning models blocking harmful speech before it renders in chat channels',
    ],
    strategicAction: 'Maintain transparency with your audience. Disclose AI assistance proactively to foster lasting human trust and prevent platform reach throttling.',
  },
];

export const OFFLINE_KNOWLEDGE_BASE: Record<string, string> = {
  'tiktok recommendation': `### TikTok Recommendation Architecture Teardown

TikTok's recommendation engine, famously pioneered through ByteDance's **Monolith** architecture, operates fundamentally differently from traditional follower-based social networks like Facebook or Twitter.

#### 1. The Core Paradigm: Interest Graph vs. Social Graph
- **Zero Follower Dependency**: On TikTok, an account with 0 followers has mathematically the same initial reach potential for a new video as an account with 100,000 followers.
- **The Cold-Start Crucible**: Every newly published video is pushed to a small, localized "sandbox cohort" of 200–500 random high-affinity users.

#### 2. The Algorithmic Scoring Hierarchy
1. **Watch-Through Rate (Completion %)**: The single heaviest ranking factor. Videos with >60% completion rate automatically trigger larger distribution tiers.
2. **Re-watch / Loop Rate**: When users let the video loop 2+ times, the algorithm predicts high dopamine satisfaction.
3. **DM Shares (Direct Messaging)**: Sharing a video privately via DM or external link is weighted up to **10x higher** than a passive like.
4. **First 3 Seconds Retention**: If >40% of viewers swipe away within the first 3 seconds, the video fails the cohort test and distribution halts.

#### 3. Technical System Infrastructure
- **Monolith Engine**: Collisionless embedding tables that update in **real-time (<60 seconds)** based on user swipe behavior, unlike legacy models that update every 4–24 hours.
- **Stream Ingestion**: Powered by petabyte-scale Apache Kafka clusters and Apache Flink stateful streaming nodes.`,

  'best posting time': `### Global Optimal Posting Time Intelligence

Audience behavior is dictated by biological chronotypes, workday commutes, and dopamine-seeking breaks.

#### 1. Platform-by-Platform Golden Windows (2026 Benchmarks)
- **LinkedIn**: Tuesday & Thursday, **7:30 AM – 10:30 AM** (morning desk arrival) and **12:00 PM – 1:30 PM** (lunch hour).
- **TikTok**: Tuesday, Thursday & Friday, **2:00 PM – 5:00 PM** (afternoon energy slump) and **7:00 PM – 10:00 PM** (evening relaxation).
- **Instagram**: Wednesday & Friday, **11:00 AM – 2:00 PM** (mid-day escapism) and **7:00 PM – 9:30 PM** (Stories & Reels).
- **X / Twitter**: Monday through Friday, **8:00 AM – 10:00 AM** (morning news cycle) and **12:00 PM – 2:00 PM** (breaking commentary).
- **Pinterest**: Friday, Saturday & Sunday, **6:00 PM – 11:00 PM** (weekend aspirational project planning).

#### 2. Strategic Rules
- **The First 60 Minutes Golden Rule**: Algorithms test posts during the initial 45–60 minutes. Publish when you have time to actively respond to comments.
- **Timezone Anchor Rule**: Always publish according to the timezone where your highest-LTV customers reside (e.g., if selling to US enterprise SaaS, anchor to Eastern Time).`,

  '5:3:2': `### The 5:3:2 Social Strategy Rule Explained

The **5:3:2 Rule** is the industry standard framework for content balance, designed to avoid audience fatigue while establishing undisputed industry authority.

#### The Ratio Breakdown (Out of 10 Posts):
1. **5 Posts — Curated Content (50%)**:
   - Industry news, benchmark studies, breaking trends, and peer highlights.
   - *Why*: Builds authority without needing to reinvent the wheel daily. Shows you are an objective curator who respects the wider ecosystem.
2. **3 Posts — Original Value (30%)**:
   - Proprietary tutorials, frameworks, teardowns, and deep-dive technical guides.
   - *Why*: Directly proves your intellectual capability, tactical execution, and unique point of view.
3. **2 Posts — Humanizing / Personal (20%)**:
   - Team culture, vulnerable reflections, behind-the-scenes failures, or lighthearted industry humor.
   - *Why*: People do business with people they like and trust; pure corporate feeds suffer severe retention drop-off.`,

  'cassandra vs scylladb': `### Distributed Messaging Database Architecture: Cassandra vs ScyllaDB

Social messaging platforms (like Discord, Meta, and Slack) handle trillions of messages where writes must be fast, append-only, and partitioned chronologically.

#### 1. Why Wide-Column Distributed NoSQL?
- Data is partitioned by \`channel_id\` or \`chat_id\` and clustered by \`snowflake_timestamp\`.
- This ensures querying messages in a chat is a sequential disk read rather than an expensive relational table join.

#### 2. The Cassandra Problem at Scale
- **Java Virtual Machine (JVM) Garbage Collection**: As heap sizes grow into hundreds of gigabytes, Java "Stop-the-World" GC pauses cause catastrophic p99 latency spikes (several seconds).
- **Compaction Bottlenecks**: Heavy write bursts choke CPU resources during background SSTable compactions.

#### 3. The ScyllaDB Solution
- **C++ Rewritten on Seastar Framework**: Asynchronous, shared-nothing, thread-per-core architecture that utilizes 100% of modern multi-core NVMe hardware without JVM runtime overhead.
- **Real-World Discord Case Study**: Discord migrated trillions of messages from Apache Cassandra to ScyllaDB.
  - *Result*: p99 read latency dropped from several seconds to <15ms; server cluster footprint shrank by over 60%.`,

  '7 pillars': `### The 7 Core Pillars of Modern Digital Marketing

A mature digital marketing ecosystem relies on a synchronized multi-channel architecture:

1. **SEO & AIO (Answer Engine Optimization)**: Capturing organic search intent across Google SGE, Perplexity, and AI chat citation engines.
2. **Social Media Marketing (SMM)**: Harnessing native vertical video and interest graphs to drive cultural virality and community fandom.
3. **Content Marketing**: Establishing undisputed domain authority through proprietary benchmark research, technical whitepapers, and customer case studies.
4. **Email & Lifecycle Marketing**: Maximizing Customer Lifetime Value (LTV) through automated behavioral drip sequences (welcome flows, cart recovery, churn win-backs).
5. **Paid Media & Performance Marketing (PPC)**: Deploying capital across Google Ads, Meta Advantage+, and TikTok Spark Ads with strict CAC/ROAS payback discipline.
6. **Affiliate & Partnership Marketing**: Scaling a decentralized performance-based sales force on a strict Cost-Per-Acquisition (CPA) commission model.
7. **Influencer & Creator Economy**: Borrowing authentic human trust and driving scalable User Generated Content (UGC) for paid advertising creative.`,

  'vp of growth': `### VP of Growth & Chief Growth Officer (CGO) Career Profile

- **Salary Benchmark (2026)**: $270,000 – $420,000+ base salary, plus significant executive equity grants.
- **Primary Mission**: Unify marketing, product analytics, engineering, and sales to optimize the entire pirate metrics funnel (AARRR: Acquisition, Activation, Retention, Referral, Revenue).
- **Core Skill Stack**:
  - Econometric attribution and Media Mix Modeling (MMM)
  - Statistical experimentation velocity (A/B testing, synthetic control groups)
  - Data pipelines (SQL, dbt, Snowflake, Amplitude)
  - Capital allocation across high-scale paid and organic acquisition engines
- **Daily Focus**: Balancing short-term CAC payback with long-term brand equity and customer retention curves.`,
};

export function getOfflineAiResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  for (const [key, response] of Object.entries(OFFLINE_KNOWLEDGE_BASE)) {
    if (lower.includes(key)) {
      return response;
    }
  }

  if (lower.includes('tiktok') || lower.includes('algorithm') || lower.includes('recommendation')) {
    return OFFLINE_KNOWLEDGE_BASE['tiktok recommendation'];
  }
  if (lower.includes('posting time') || lower.includes('best time') || lower.includes('timing')) {
    return OFFLINE_KNOWLEDGE_BASE['best posting time'];
  }
  if (lower.includes('5:3:2') || lower.includes('rule') || lower.includes('framework')) {
    return OFFLINE_KNOWLEDGE_BASE['5:3:2'];
  }
  if (lower.includes('cassandra') || lower.includes('scylladb') || lower.includes('kafka') || lower.includes('storage') || lower.includes('database')) {
    return OFFLINE_KNOWLEDGE_BASE['cassandra vs scylladb'];
  }
  if (lower.includes('pillar') || lower.includes('marketing') || lower.includes('career')) {
    return OFFLINE_KNOWLEDGE_BASE['7 pillars'];
  }
  if (lower.includes('salary') || lower.includes('vp') || lower.includes('growth')) {
    return OFFLINE_KNOWLEDGE_BASE['vp of growth'];
  }

  return `### SocialSphere Global Telemetry Synthesis

Based on cross-platform social intelligence and data systems research:

- **Algorithmic Mechanics**: The dominant global trend is the shift from *Social Graphs* (who you follow) to *Interest Graphs* (what content captivates your attention), pioneered by ByteDance and now integrated across Meta, YouTube, and X.
- **Engagement Optimization**: Save rates and Direct Message (DM) share velocity are currently the highest-weighted signals for organic algorithmic amplification.
- **Architecture Standard**: Petabyte-scale distributed streaming with Apache Kafka, stateful streaming with Apache Flink, and low-latency storage using wide-column stores (ScyllaDB) and graph caches (TAO).
- **Strategic Recommendation**: Enforce the **5:3:2 content rule** and align publication with platform-specific golden hour windows to maximize early cohort algorithmic velocity.`;
}
