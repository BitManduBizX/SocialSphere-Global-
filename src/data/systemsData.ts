export interface ArchitectureLayer {
  id: string;
  order: number;
  name: string;
  subtitle: string;
  category: 'Ingress' | 'Streaming' | 'Storage' | 'Recommendation' | 'Analytics';
  keyTechnologies: string[];
  throughputTarget: string;
  latencySLA: string;
  coreRole: string;
  deepDive: string;
  caseStudy: {
    company: string;
    challenge: string;
    solution: string;
    outcome: string;
  };
  metricsSimulated: {
    activeConnections: string;
    dataRate: string;
    errorRate: string;
  };
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'layer-ingress',
    order: 1,
    name: '01. Edge Ingress, Gateway & Rate-Limiting',
    subtitle: 'Global Anycast BGP, DDoS Scrubbing, TLS 1.3 Termination & Protocol Buffers',
    category: 'Ingress',
    keyTechnologies: ['Envoy Proxy', 'Cloudflare Anycast', 'HTTP/3 QUIC', 'Token Bucket Rate Limiter', 'gRPC-Web'],
    throughputTarget: '100,000,000+ Edge Requests / sec',
    latencySLA: '< 15ms TTFB (Time to First Byte)',
    coreRole: 'Terminates client TLS handshakes at edge PoPs, authenticates JWT session tokens, and applies distributed token-bucket rate limiting before traffic hits internal service meshes.',
    deepDive: 'Clients connect via HTTP/3 over QUIC to eliminate head-of-line blocking on flaky mobile cell networks. Edge Envoy proxies inspect incoming payloads, unpack binary Protocol Buffers (reducing mobile payload size by 65% vs JSON), and dispatch requests across regional ingress clusters.',
    caseStudy: {
      company: 'Meta (Facebook / Instagram)',
      challenge: 'Handling billions of sudden burst requests during global events (e.g., World Cup finals) without cascading edge gateway crashes.',
      solution: 'Deployed Proxygen (in-house C++ HTTP stack) and Adaptive Traffic Throttling with active health feedback from downstream backend clusters.',
      outcome: 'Reduced global connection handshake latency by 42% and successfully mitigated multi-terabit volumetric DDoS attacks.',
    },
    metricsSimulated: {
      activeConnections: '24.8 Million Edge Sockets',
      dataRate: '1.84 Terabits / sec',
      errorRate: '0.0012%',
    },
  },
  {
    id: 'layer-streaming',
    order: 2,
    name: '02. Real-Time Streaming & Event Bus',
    subtitle: 'Partitioned Distributed Append-Only Commit Logs & Stateful Stream Processing',
    category: 'Streaming',
    keyTechnologies: ['Apache Kafka', 'Redpanda (C++ Log)', 'Apache Flink', 'Debezium (CDC)', 'RabbitMQ'],
    throughputTarget: '50,000,000 Events / sec ingested',
    latencySLA: '< 8ms Ingestion Latency',
    coreRole: 'Decouples microservices by treating all user actions (likes, comments, views, scrolls, DMs) as immutable timestamped event streams distributed across partitioned logs.',
    deepDive: 'Kafka partitions organize streams by user ID or entity key to guarantee strict in-order delivery. Apache Flink runs stateful sliding-window computations on live streams to calculate trending hashtags, detect malicious coordinated bot attacks, and compute real-time video engagement counters.',
    caseStudy: {
      company: 'LinkedIn',
      challenge: 'Scaling event data pipeline that grew to trillions of messages per day across thousands of disparate services.',
      solution: 'Invented and open-sourced Apache Kafka; evolved architecture to tiered storage where older partitions migrate seamlessly to cold object storage.',
      outcome: 'Powers over 7 trillion daily messages across 100+ Kafka clusters with zero data loss.',
    },
    metricsSimulated: {
      activeConnections: '4,200 Broker Nodes',
      dataRate: '850 Gigabytes / sec',
      errorRate: '0.00004%',
    },
  },
  {
    id: 'layer-storage',
    order: 3,
    name: '03. Stratified Storage & Petabyte Graph Tier',
    subtitle: 'Wide-Column Sharded NoSQL, In-Memory Graph Caches & Cold Parquet Blob Storage',
    category: 'Storage',
    keyTechnologies: ['ScyllaDB / Cassandra', 'Meta TAO Graph Engine', 'RocksDB', 'Redis Cluster', 'AWS S3 / Ceph'],
    throughputTarget: '120,000,000 Read QPS / 15,000,000 Write QPS',
    latencySLA: '< 2ms In-Memory / < 12ms Sharded Disk',
    coreRole: 'Provides stratified data persistence: sub-millisecond memory caches for active timelines, wide-column NoSQL for message histories, graph databases for follow edges, and object storage for raw 4K video blobs.',
    deepDive: 'Social feeds have an extreme 99:1 read-to-write skew. Meta TAO caches the social graph (objects = users/posts, associations = friend/follow edges) across thousands of distributed read-slave tiers. Wide-column stores like ScyllaDB organize messages partitioned by Channel ID and sorted chronologically by SnowFlake 64-bit unique IDs.',
    caseStudy: {
      company: 'Discord',
      challenge: 'Apache Cassandra suffered severe Java Garbage Collection (GC) pauses and node compaction bottlenecks storing trillions of messages.',
      solution: 'Migrated trillions of messages to ScyllaDB (C++ rewrite of Cassandra) running on asynchronous shared-nothing Seastar architecture.',
      outcome: 'Slashed p99 read latency from several seconds to under 15ms while reducing fleet size by 65%.',
    },
    metricsSimulated: {
      activeConnections: '18,500 Storage Shards',
      dataRate: '12.4 Petabytes Processed / day',
      errorRate: '0.0002%',
    },
  },
  {
    id: 'layer-recommendation',
    order: 4,
    name: '04. Neural Recommendation & Candidate Ranking Engine',
    subtitle: 'Two-Stage Architecture: Multi-Million Item Retrieval -> Deep Neural Network Ranker',
    category: 'Recommendation',
    keyTechnologies: ['Faiss / ScaNN (HNSW Vector Search)', 'DLRM (Deep Learning Recommendation)', 'PyTorch Distributed', 'ByteDance Monolith', 'Feature Store (Feast)'],
    throughputTarget: '850,000 Feed Predictions / sec',
    latencySLA: '< 45ms P99 Inference Budget',
    coreRole: 'Filters billions of available video and post candidates down to the top 20 items personalized for an individual viewer within a strict 50ms user-perceived latency budget.',
    deepDive: 'Stage 1 (Candidate Generation): HNSW vector similarity search instantly narrows 100M items down to ~2,000 candidates using user embedding vectors. Stage 2 (Heavy Ranking): A deep neural network evaluates hundreds of dense and sparse features (historical completion rate, current time, creator affinity, sound virality) to predict probability of watch, like, and share.',
    caseStudy: {
      company: 'TikTok (ByteDance)',
      challenge: 'Traditional batch recommendation models updated user vectors every few hours, failing to capture instant shifts in viewer mood.',
      solution: 'Engineered Monolith: A real-time recommendation architecture with collisionless embedding tables and online learning updated within 60 seconds.',
      outcome: 'Elevated viewer session retention by 28% and set the global benchmark for interest-graph algorithm performance.',
    },
    metricsSimulated: {
      activeConnections: '3,800 GPU/TPU Worker Pods',
      dataRate: '4.2 Billion Vector Lookups / sec',
      errorRate: '0.003%',
    },
  },
  {
    id: 'layer-analytics',
    order: 5,
    name: '05. Distributed OLAP, Ad Attribution & Telemetry',
    subtitle: 'Columnar Analytics, Real-Time Bid Engines (RTB) & Multi-Touch Conversion Modeling',
    category: 'Analytics',
    keyTechnologies: ['ClickHouse', 'Apache Pinot', 'Snowflake', 'Apache Iceberg', 'Meta Advantage+ AI'],
    throughputTarget: '2,500,000 Telemetry Rows / sec',
    latencySLA: '< 100ms Complex Aggregation Queries',
    coreRole: 'Ingests billions of advertising impressions, click-throughs, and purchase events to perform sub-second cohort analytics, campaign pacing, and real-time ad auction attribution.',
    deepDive: 'Columnar storage engines like ClickHouse compress billions of daily telemetry events by 85% using ZSTD and dictionary encoding. Fast analytical queries allow advertisers to inspect conversion ROI in real-time, while attribution engines compute Markov-chain multi-touch credit across influencer touches.',
    caseStudy: {
      company: 'Uber & Pinterest',
      challenge: 'Needed real-time dashboard analytics over hundreds of billions of user events without waiting for overnight ETL batch jobs.',
      solution: 'Deployed Apache Pinot and ClickHouse atop Apache Kafka, reading raw partition offsets directly into columnar memory segments.',
      outcome: 'Reduced dashboard query response times from 45 seconds down to 80 milliseconds at 1/5th the server footprint.',
    },
    metricsSimulated: {
      activeConnections: '1,200 Columnar Nodes',
      dataRate: '420 Gigabytes Ingested / min',
      errorRate: '0.0001%',
    },
  },
];

export interface PacketStep {
  step: number;
  stage: string;
  component: string;
  durationMs: number;
  description: string;
  payloadInfo: string;
}

export const PACKET_TRACER_STEPS: PacketStep[] = [
  {
    step: 1,
    stage: 'Client & Mobile Edge',
    component: 'Mobile App / Browser (HTTP/3 QUIC)',
    durationMs: 12,
    description: 'User taps "Publish 4K Reel with Audio Tag". Mobile client chunks video into 4MB byte segments and signs an ephemeral TLS 1.3 token.',
    payloadInfo: 'POST /v4/media/publish · 14.8MB Chunked Binary Buffer',
  },
  {
    step: 2,
    stage: 'Edge Ingress & Envoy Gateway',
    component: 'Anycast PoP & Envoy Proxy Mesh',
    durationMs: 4,
    description: 'BGP Anycast routes traffic to closest edge PoP. Envoy validates JWT signature, checks token-bucket rate limit (20 req/min for creator tier), and terminates TLS.',
    payloadInfo: 'Validated Session: user_id=984210 · Rate-Limit: 1/20 (Passed)',
  },
  {
    step: 3,
    stage: 'Distributed Message Ingestion',
    component: 'Apache Kafka Partitioned Topic',
    durationMs: 6,
    description: 'Event published to Kafka topic `user-media-created` partitioned by user_id hash. Replicated across 3 Availability Zones for durability.',
    payloadInfo: 'Topic: raw-events-partition-48 · Offset: 1498293810 · ACK=all',
  },
  {
    step: 4,
    stage: 'Stream Processing & Async Transcoding',
    component: 'Apache Flink + Hardware Transcoding ASIC',
    durationMs: 35,
    description: 'Flink consumes event, extracts hashtags, audio track ID, and video metadata. Triggers asynchronous GPU cluster for AV1/H.265 multi-resolution renditions (1080p, 720p, 480p).',
    payloadInfo: 'Extracted: tags=["#TechTrends", "#DataEngineering"], audio_id=58102',
  },
  {
    step: 5,
    stage: 'Graph DB & Sharded Persistence',
    component: 'Meta TAO Graph Engine & ScyllaDB',
    durationMs: 8,
    description: 'Post object written to ScyllaDB cluster. New association edge `(creator)-[POSTED]->(media_id)` inserted into TAO graph cache; follower notification fan-out initialized.',
    payloadInfo: 'TAO Edge: AssocID=491029 · Storage: ScyllaDB Cluster Zone US-East',
  },
  {
    step: 6,
    stage: 'Recommendation Vector Indexing',
    component: 'Vector Search HNSW & Feature Store',
    durationMs: 14,
    description: 'Deep neural network generates a 512-dimension semantic vector embedding of the video (audio transcription + visual frames). Vector inserted into Faiss/ScaNN index for candidate generation.',
    payloadInfo: 'Embedding: float32[512] · Cluster: scann_index_tier_02 · Searchable in <200ms',
  },
  {
    step: 7,
    stage: 'Real-Time Fan-Out & Feed Delivery',
    component: 'WebSocket Gateway & Feed Redis Cache',
    durationMs: 9,
    description: 'Followers with active WebSocket connections receive instant real-time notification push. Active follower home timelines in Redis are invalidated or prepended.',
    payloadInfo: 'Pushed to 4,820 active WebSocket sessions · Total End-to-End: ~88ms',
  },
];
