export interface TimingHeatmapSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  hour: number; // 6 to 23 (6 AM to 11 PM)
  multiplier: number; // e.g., 1.0 (baseline) up to 3.8 (peak golden window)
  tier: 'peak' | 'high' | 'moderate' | 'low';
  contextNote?: string;
}

export interface PlatformStrategyData {
  platformId: string;
  name: string;
  bestDays: string[];
  bestHoursLabel: string;
  peakMultiplier: string;
  worstTimes: string;
  audiencePsychology: string;
  formatPriority: string[];
  contentTip2026: string;
  heatmap: TimingHeatmapSlot[];
}

const DAYS: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

function generateHeatmap(
  platformId: string,
  peakDays: string[],
  peakHours: number[],
  highHours: number[]
): TimingHeatmapSlot[] {
  const slots: TimingHeatmapSlot[] = [];

  for (const day of DAYS) {
    const isPeakDay = peakDays.includes(day);
    for (let hour = 6; hour <= 23; hour++) {
      let multiplier = 0.8;
      let tier: 'peak' | 'high' | 'moderate' | 'low' = 'low';
      let contextNote = 'Low audience active engagement';

      if (peakHours.includes(hour) && isPeakDay) {
        multiplier = platformId === 'linkedin' ? 3.6 : platformId === 'tiktok' ? 3.8 : 3.4;
        tier = 'peak';
        contextNote = 'Golden Window: Maximum algorithmic velocity and audience dwell';
      } else if (highHours.includes(hour) || (peakHours.includes(hour) && !isPeakDay)) {
        multiplier = 2.4;
        tier = 'high';
        contextNote = 'High Activity: Strong organic visibility and engagement';
      } else if ((hour >= 9 && hour <= 19) || (hour >= 20 && hour <= 22)) {
        multiplier = 1.4;
        tier = 'moderate';
        contextNote = 'Moderate Activity: Standard baseline reach';
      } else {
        multiplier = 0.6;
        tier = 'low';
        contextNote = 'Trough Period: Slow algorithmic test distribution';
      }

      slots.push({
        day,
        hour,
        multiplier,
        tier,
        contextNote,
      });
    }
  }

  return slots;
}

export const PLATFORM_STRATEGIES: Record<string, PlatformStrategyData> = {
  instagram: {
    platformId: 'instagram',
    name: 'Instagram',
    bestDays: ['Wednesday', 'Thursday', 'Friday'],
    bestHoursLabel: '11:00 AM – 2:00 PM & 7:00 PM – 9:30 PM',
    peakMultiplier: '3.4x Reach Lift',
    worstTimes: 'Sunday mornings before 9:00 AM and late-night weekdays after 11:30 PM',
    audiencePsychology: 'Lunchtime escapism and evening relaxation. Users seek visually stimulating carousels during mid-day and entertaining Reels in the evening.',
    formatPriority: ['Saveable Multi-Slide Carousels', 'Short-Form Reels (under 25s)', 'Interactive Stories with Poll stickers'],
    contentTip2026: 'Direct Message (DM) shares are the primary ranking metric. Add a direct call-to-action inviting viewers to send the post to a teammate or friend.',
    heatmap: generateHeatmap('instagram', ['Wednesday', 'Thursday', 'Friday'], [11, 12, 13, 19, 20], [9, 10, 14, 18, 21]),
  },
  tiktok: {
    platformId: 'tiktok',
    name: 'TikTok',
    bestDays: ['Tuesday', 'Thursday', 'Friday'],
    bestHoursLabel: '2:00 PM – 5:00 PM & 7:00 PM – 10:00 PM',
    peakMultiplier: '3.8x Viral Coefficient',
    worstTimes: 'Monday early morning (6:00 AM – 9:00 AM)',
    audiencePsychology: 'Afternoon energy slump pick-me-ups and evening continuous doom-scrolling. High tolerance for fast-paced audio-visual dopamine loops.',
    formatPriority: ['First 3-Second Hook Video', 'Trending Sound Duets / CapCut templates', 'Search-Optimized Educational Walkthroughs'],
    contentTip2026: 'Incorporate search keywords directly into video text overlays and spoken audio transcripts for long-tail TikTok Search discovery.',
    heatmap: generateHeatmap('tiktok', ['Tuesday', 'Thursday', 'Friday'], [14, 15, 16, 19, 20, 21], [12, 13, 17, 18, 22]),
  },
  linkedin: {
    platformId: 'linkedin',
    name: 'LinkedIn',
    bestDays: ['Tuesday', 'Wednesday', 'Thursday'],
    bestHoursLabel: '7:30 AM – 10:30 AM & 12:00 PM – 1:30 PM',
    peakMultiplier: '3.6x Lead Generation Lift',
    worstTimes: 'Friday after 4:00 PM and all day Saturday / Sunday',
    audiencePsychology: 'Morning professional mindsets during desk arrival and mid-day coffee breaks. Audiences look for tactical playbooks, career growth, and B2B case studies.',
    formatPriority: ['Multi-page PDF Document Carousels', 'Data-Backed Text Breakdowns with charts', 'Short Native Video (under 60s)'],
    contentTip2026: 'Detailed constructive comments from industry peers within the first 60 minutes trigger the algorithm’s high-value professional network cascade.',
    heatmap: generateHeatmap('linkedin', ['Tuesday', 'Wednesday', 'Thursday'], [8, 9, 10, 12, 13], [7, 11, 14, 15, 16]),
  },
  facebook: {
    platformId: 'facebook',
    name: 'Facebook',
    bestDays: ['Monday', 'Wednesday', 'Friday'],
    bestHoursLabel: '9:00 AM – 1:00 PM',
    peakMultiplier: '2.8x Community Share Rate',
    worstTimes: 'Weekdays after 9:00 PM and early weekend mornings',
    audiencePsychology: 'Workday break browsing and family group interactions. Strong responsiveness to local news, emotional community updates, and video snippets.',
    formatPriority: ['Native Video Reels', 'Community Group Discussions', 'High-Res Photo with long-form storytelling'],
    contentTip2026: 'Posts originating within or cross-shared to active Facebook Groups experience up to 400% higher comment depth than standard page feeds.',
    heatmap: generateHeatmap('facebook', ['Monday', 'Wednesday', 'Friday'], [9, 10, 11, 12], [8, 13, 14, 15, 18]),
  },
  x_twitter: {
    platformId: 'x_twitter',
    name: 'X (formerly Twitter)',
    bestDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    bestHoursLabel: '8:00 AM – 10:00 AM & 12:00 PM – 3:00 PM',
    peakMultiplier: '3.1x Quote-Reply Velocity',
    worstTimes: 'Saturday evening and Sunday morning',
    audiencePsychology: 'Real-time breaking events, market moves, and rapid debates. Users are quick to quote-tweet and react during active trading/working hours.',
    formatPriority: ['Concise Contrarian Hooks with Data', 'Native Video Clips with captions', 'Curated Analytical Threads'],
    contentTip2026: 'Engage actively in your own reply section within the first 30 minutes; verified subscriber author replies grant a 75x algorithmic weight boost.',
    heatmap: generateHeatmap('x_twitter', ['Monday', 'Tuesday', 'Wednesday', 'Friday'], [8, 9, 12, 13, 14], [10, 11, 15, 16, 17]),
  },
  pinterest: {
    platformId: 'pinterest',
    name: 'Pinterest',
    bestDays: ['Friday', 'Saturday', 'Sunday'],
    bestHoursLabel: '6:00 PM – 11:00 PM',
    peakMultiplier: '3.5x Pin Save Rate',
    worstTimes: 'Weekday working hours (9:00 AM – 4:00 PM)',
    audiencePsychology: 'Weekend and evening aspirational planning mode. Users save recipes, wedding ideas, renovation guides, and outfit collages for future implementation.',
    formatPriority: ['Vertical 2:3 High-Res Graphic Pins', 'Collage Idea Pins with Product Tags', 'Step-by-step DIY Infographics'],
    contentTip2026: 'Pinterest has a 4-month search half-life compared to 24 hours on social feeds. Optimize pin titles and board descriptions with rich search keywords.',
    heatmap: generateHeatmap('pinterest', ['Friday', 'Saturday', 'Sunday'], [19, 20, 21, 22], [17, 18, 23, 12, 13]),
  },
};

export interface StrategyRule {
  title: string;
  name: string;
  formula: string;
  description: string;
  breakdown: {
    ratio: string;
    label: string;
    percentage: number;
    color: string;
    role: string;
    examples: string[];
  }[];
  practicalAdvice: string;
}

export const STRATEGY_RULES: StrategyRule[] = [
  {
    title: 'The 5:3:2 Rule for Social Media Balance',
    name: '5:3:2 Content Ratio',
    formula: '50% Curated : 30% Original : 20% Personal',
    description: 'A proven framework that builds domain authority and human connection without alienating audiences through relentless self-promotion.',
    breakdown: [
      {
        ratio: '5 of 10 Posts',
        label: 'Curated Content',
        percentage: 50,
        color: '#6D28D9',
        role: 'Industry news, research papers, peer insights, and community highlights.',
        examples: [
          'Sharing a new benchmark report from DataReportal with your commentary',
          'Highlighting an inspiring campaign executed by another creator or brand',
          'Retweeting and adding analytical context to breaking market developments',
        ],
      },
      {
        ratio: '3 of 10 Posts',
        label: 'Original Thought Leadership',
        percentage: 30,
        color: '#F59E0B',
        role: 'Proprietary tutorials, technical breakdowns, data teardowns, and tactical how-to guides.',
        examples: [
          'Step-by-step PDF carousel explaining distributed caching architectures',
          'Behind-the-scenes case study detailing how your product improved conversion by 40%',
          'Original video tutorial teaching a specific skill or methodology',
        ],
      },
      {
        ratio: '2 of 10 Posts',
        label: 'Humanizing & Personal Content',
        percentage: 20,
        color: '#10B981',
        role: 'Behind-the-scenes glimpses, team culture, unfiltered thoughts, and relatable milestones.',
        examples: [
          'A transparent reflection on a failure or lesson learned this quarter',
          'Photos of team whiteboard brainstorming sessions or workspace setups',
          'Lighthearted industry humor, relatable memes, or personal gratitude notes',
        ],
      },
    ],
    practicalAdvice: 'For every 10 posts on your schedule, strictly enforce this split. You will avoid audience fatigue while steadily positioning yourself as a trusted industry curator.',
  },
  {
    title: 'The 50/30/20 Content Marketing Distribution Model',
    name: '50/30/20 Marketing Rule',
    formula: '50% Education : 30% Engagement : 20% Promotion',
    description: 'An audience-first sales conversion architecture that nurtures prospects through value before asking for a financial or lead transaction.',
    breakdown: [
      {
        ratio: '50%',
        label: 'Pure Educational Value',
        percentage: 50,
        color: '#3B82F6',
        role: 'Solves high-friction problems with zero commercial pitch.',
        examples: [
          'Comprehensive cheat sheets, swipe files, and template spreadsheets',
          'Deep architectural post-mortems of system outages and solutions',
          'Actionable guides on how to audit digital marketing funnels',
        ],
      },
      {
        ratio: '30%',
        label: 'Engagement & Community Stories',
        percentage: 30,
        color: '#8B5CF6',
        role: 'Sparks dialogue, emotional connection, and active audience participation.',
        examples: [
          'Provocative industry debate questions (e.g., "Is SQL still king over Vector DBs?")',
          'Customer spotlight interviews and transformative user success stories',
          'Live interactive Q&A sessions and audience polls',
        ],
      },
      {
        ratio: '20%',
        label: 'Direct Conversion & Commercial Offers',
        percentage: 20,
        color: '#EC4899',
        role: 'Clear, high-intent call-to-actions, product launches, demos, and gated lead magnets.',
        examples: [
          'Product feature release announcement with clear trial sign-up link',
          'Limited-time early bird pricing offer for an upcoming summit or course',
          'Direct invitation to book a 1-on-1 enterprise sales architecture consultation',
        ],
      },
    ],
    practicalAdvice: 'If your promotional content exceeds 20%, algorithmic reach drops precipitously as platforms penalize outbound links and low-retention sales copy.',
  },
];
