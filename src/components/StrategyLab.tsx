import React, { useState, useMemo } from 'react';
import {
  PLATFORM_STRATEGIES,
  STRATEGY_RULES,
  TimingHeatmapSlot,
} from '../data/strategyData';
import {
  CalendarClock,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  TrendingUp,
  Share2,
  Calendar,
  Check,
  AlertCircle,
  BarChart3,
  Sliders,
  Info,
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const HOURS = Array.from({ length: 18 }, (_, i) => i + 6); // 6 AM to 23 (11 PM)

export const StrategyLab: React.FC = () => {
  const [selectedPlatformKey, setSelectedPlatformKey] = useState<string>('instagram');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('EST');
  const [hoveredSlot, setHoveredSlot] = useState<TimingHeatmapSlot | null>(null);

  // 5:3:2 Planner state
  const [brandNiche, setBrandNiche] = useState<string>('Tech & Developer SaaS');
  const [postsPerWeek, setPostsPerWeek] = useState<number>(7);
  const [generatedPlan, setGeneratedPlan] = useState<any[]>([]);

  // 50/30/20 Balance Simulator state
  const [eduPercent, setEduPercent] = useState<number>(50);
  const [engPercent, setEngPercent] = useState<number>(30);
  const [promoPercent, setPromoPercent] = useState<number>(20);

  const activeStrategy = useMemo(() => {
    return PLATFORM_STRATEGIES[selectedPlatformKey] || PLATFORM_STRATEGIES.instagram;
  }, [selectedPlatformKey]);

  // Generate 7-day schedule adhering strictly to 5:3:2 ratio
  const handleGeneratePlan = () => {
    const plans = [
      {
        day: 'Monday',
        time: '8:30 AM',
        category: 'Curated',
        ratioBadge: '5:3:2 Curated',
        color: '#6D28D9',
        headline: `Industry Weekly Benchmark Roundup: Top Developments in ${brandNiche}`,
        objective: 'Position as a sharp domain curator and signal morning alertness.',
      },
      {
        day: 'Tuesday',
        time: '10:00 AM',
        category: 'Original Thought Leadership',
        ratioBadge: '5:3:2 Original',
        color: '#F59E0B',
        headline: `Tactical Teardown: How we solved high-friction bottlenecks in ${brandNiche}`,
        objective: 'Deliver deep original value through step-by-step documentation.',
      },
      {
        day: 'Wednesday',
        time: '12:30 PM',
        category: 'Curated',
        ratioBadge: '5:3:2 Curated',
        color: '#6D28D9',
        headline: `Contrarian Analysis: Deconstructing a peer whitepaper in ${brandNiche}`,
        objective: 'Stimulate intellectual debate and peer tagging in comments.',
      },
      {
        day: 'Thursday',
        time: '9:00 AM',
        category: 'Original Thought Leadership',
        ratioBadge: '5:3:2 Original',
        color: '#F59E0B',
        headline: `Actionable Swipe File / Architecture Diagram for ${brandNiche} Teams`,
        objective: 'Drive high-velocity saves and DM shares with an evergreen reference asset.',
      },
      {
        day: 'Friday',
        time: '11:30 AM',
        category: 'Humanizing / Personal',
        ratioBadge: '5:3:2 Humanizing',
        color: '#10B981',
        headline: `Behind the Curtain: The hardest lesson our team navigated this quarter`,
        objective: 'Build human warmth and vulnerability before the weekend disconnect.',
      },
      {
        day: 'Saturday',
        time: '2:00 PM',
        category: 'Curated',
        ratioBadge: '5:3:2 Curated',
        color: '#6D28D9',
        headline: `Weekend Long-Read: 3 Research Papers Transforming ${brandNiche}`,
        objective: 'Satisfy deep-dive study mindsets during relaxed weekend downtime.',
      },
      {
        day: 'Sunday',
        time: '7:30 PM',
        category: 'Humanizing / Personal',
        ratioBadge: '5:3:2 Humanizing',
        color: '#10B981',
        headline: `Sunday Reflections: Mental models and focus priorities for the upcoming sprint`,
        objective: 'Inspire your audience as they mentally prepare for Monday morning.',
      },
    ];
    setGeneratedPlan(plans.slice(0, postsPerWeek));
  };

  // Run initial plan generation
  useState(() => {
    handleGeneratePlan();
  });

  // Calculate algorithmic health from 50/30/20 slider
  const strategyScore = useMemo(() => {
    let reachIndex = 88;
    let conversionIndex = 75;
    let fatigueRisk = 'Low';

    if (promoPercent > 35) {
      reachIndex -= (promoPercent - 35) * 2.2;
      fatigueRisk = 'High (Audience churn expected)';
    } else if (promoPercent < 15) {
      conversionIndex -= (15 - promoPercent) * 2;
    }

    if (eduPercent < 35) {
      reachIndex -= 18;
    }

    return {
      reachIndex: Math.max(30, Math.min(100, Math.round(reachIndex))),
      conversionIndex: Math.max(25, Math.min(100, Math.round(conversionIndex))),
      fatigueRisk,
    };
  }, [eduPercent, engPercent, promoPercent]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181329] to-[#120E1F] border border-purple-900/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
            <span>2026 Chronobiology & Algorithmic Velocity</span>
            <span aria-hidden="true">·</span>
            <span>Audience Dwell Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Best Times to Post & Strategic Frameworks
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Leverage empirical platform heatmaps to publish inside peak algorithmic test cohorts. Apply the 5:3:2 Rule
            and 50/30/20 Distribution Model to avoid audience fatigue while accelerating compound audience growth.
          </p>
        </div>
      </div>

      {/* SECTION 1: PLATFORM TIMING HEATMAPS */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              01. Platform Empirical Engagement Heatmap
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Hour-by-hour algorithmic multiplier grid. Darker gold represents peak golden windows (up to 3.8x baseline reach).
            </p>
          </div>

          {/* Timezone Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Timezone:
            </span>
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-[#0D0B14] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="EST">EST (New York, UTC-5)</option>
              <option value="PST">PST (San Francisco, UTC-8)</option>
              <option value="GMT">GMT / UTC (London, UTC+0)</option>
              <option value="CET">CET (Berlin / Paris, UTC+1)</option>
              <option value="JST">JST (Tokyo / Seoul, UTC+9)</option>
            </select>
          </div>
        </div>

        {/* Platform Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {Object.keys(PLATFORM_STRATEGIES).map((key) => {
            const plat = PLATFORM_STRATEGIES[key];
            const isSelected = selectedPlatformKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedPlatformKey(key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30'
                    : 'bg-[#0D0B14] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {plat.name}
              </button>
            );
          })}
        </div>

        {/* Platform Overview Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0B14] border border-zinc-800 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-zinc-400 block font-sans">Primary Golden Window:</span>
              <span className="text-sm font-bold text-amber-400">{activeStrategy.bestHoursLabel}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block font-sans">High-Velocity Days:</span>
              <span className="text-sm font-bold text-white">{activeStrategy.bestDays.join(', ')}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block font-sans">Reach Multiplier Peak:</span>
              <span className="text-sm font-bold text-emerald-400">{activeStrategy.peakMultiplier}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 block font-sans">Worst Time to Avoid:</span>
              <span className="text-xs text-rose-300 font-sans line-clamp-1">{activeStrategy.worstTimes}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-xs text-zinc-300">
            <span className="text-amber-400 font-semibold font-mono text-[11px] block mb-0.5">
              Audience Psychological State ({selectedTimezone}):
            </span>
            <p className="leading-relaxed">{activeStrategy.audiencePsychology}</p>
          </div>
        </div>

        {/* Interactive Heatmap Matrix */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[700px]">
            {/* Hour Headers */}
            <div className="grid grid-cols-[100px_repeat(18,1fr)] gap-1 text-[10px] font-mono text-zinc-400 mb-1 text-center">
              <span className="text-left font-sans pl-2">Day / Hour</span>
              {HOURS.map((hour) => (
                <span key={hour}>
                  {hour > 12 ? `${hour - 12}p` : hour === 12 ? '12p' : `${hour}a`}
                </span>
              ))}
            </div>

            {/* Days Rows */}
            {DAYS.map((day) => {
              return (
                <div
                  key={day}
                  className="grid grid-cols-[100px_repeat(18,1fr)] gap-1 mb-1 items-center"
                >
                  <span className="text-xs font-medium text-zinc-300 pl-2 text-left truncate">
                    {day}
                  </span>
                  {HOURS.map((hour) => {
                    const slot = activeStrategy.heatmap.find((s) => s.day === day && s.hour === hour) || {
                      day,
                      hour,
                      multiplier: 1.0,
                      tier: 'low',
                    };

                    let bgClass = 'bg-[#181329] border-zinc-900';
                    let textClass = 'text-zinc-500';

                    if (slot.tier === 'peak') {
                      bgClass = 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400 text-black font-bold shadow-md shadow-amber-950/40';
                      textClass = 'text-black';
                    } else if (slot.tier === 'high') {
                      bgClass = 'bg-purple-700/80 border-purple-500 text-white font-semibold';
                      textClass = 'text-white';
                    } else if (slot.tier === 'moderate') {
                      bgClass = 'bg-purple-950/40 border-purple-900 text-purple-300';
                      textClass = 'text-purple-300';
                    }

                    return (
                      <div
                        key={hour}
                        onMouseEnter={() => setHoveredSlot(slot)}
                        className={`h-9 rounded-lg border flex items-center justify-center text-[10px] font-mono transition-transform hover:scale-110 cursor-pointer ${bgClass}`}
                        title={`${day} @ ${hour}:00 · ${slot.multiplier}x · ${slot.tier.toUpperCase()}`}
                      >
                        <span className={textClass}>{slot.multiplier.toFixed(1)}x</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Heatmap Legend & Tooltip Inspector */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-zinc-400">Multiplier Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-gradient-to-br from-amber-500 to-amber-600" />
              <span className="text-zinc-200">Peak (&gt;3.0x)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-purple-700" />
              <span className="text-zinc-200">High (2.0x-2.9x)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-purple-950/60 border border-purple-900" />
              <span className="text-zinc-200">Moderate (1.0x-1.9x)</span>
            </div>
          </div>

          {hoveredSlot && (
            <div className="p-2.5 rounded-lg bg-[#0D0B14] border border-amber-500/40 text-[11px] font-mono text-zinc-200 flex items-center gap-2">
              <span className="text-amber-400 font-bold">{hoveredSlot.day} @ {hoveredSlot.hour}:00</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-bold">{hoveredSlot.multiplier}x Multiplier</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-sans">{hoveredSlot.contextNote}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: THE 5:3:2 CONTENT CALENDAR PLANNER */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              02. The 5:3:2 Content Ratio Schedule Generator
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              5 Curated Posts · 3 Original Posts · 2 Humanizing/Personal Posts. Generates a balanced 7-day tactical content sprint.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 px-3 py-1 rounded-lg bg-amber-950/30 border border-amber-800/40">
            Zero-Fatigue Formula
          </span>
        </div>

        {/* Niche & Configuration Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-[#0D0B14] border border-zinc-800 text-xs">
          <div>
            <label className="block text-zinc-400 font-semibold mb-1.5">Industry or Brand Niche:</label>
            <input
              type="text"
              value={brandNiche}
              onChange={(e) => setBrandNiche(e.target.value)}
              placeholder="e.g. Fintech SaaS, AI Architecture, Fashion eCommerce"
              className="w-full bg-[#141021] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1.5">Target Cadence (Posts / Week):</label>
            <select
              value={postsPerWeek}
              onChange={(e) => setPostsPerWeek(parseInt(e.target.value, 10))}
              className="w-full bg-[#141021] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value={5}>5 Posts / Week</option>
              <option value={7}>7 Posts / Week (Daily Cadence)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGeneratePlan}
              className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" /> Re-Generate Schedule
            </button>
          </div>
        </div>

        {/* Generated Schedule Cards */}
        <div className="space-y-3">
          {generatedPlan.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                    {item.day} @ {item.time}
                  </span>
                  <span
                    className="text-[11px] font-mono font-medium px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.ratioBadge}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">Slot 0{idx + 1} of 0{generatedPlan.length}</span>
              </div>

              <h4 className="text-sm font-semibold text-white mb-1">{item.headline}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.objective}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: THE 50/30/20 MARKETING RULE SIMULATOR */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              03. The 50/30/20 Content Balance Simulator
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              50% Value/Education · 30% Engagement/Story · 20% Direct Commercial Promotion
            </p>
          </div>
          <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-800/50">
            Conversion Velocity Model
          </span>
        </div>

        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#0D0B14] border border-zinc-800 mb-6">
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-blue-400">1. Educational Value</span>
              <span className="font-mono text-white font-bold">{eduPercent}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={eduPercent}
              onChange={(e) => setEduPercent(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[11px] text-zinc-400 mt-2">
              Tutorials, architectural teardowns, and swipe files. Builds long-term trust.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-purple-400">2. Community Stories</span>
              <span className="font-mono text-white font-bold">{engPercent}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={60}
              value={engPercent}
              onChange={(e) => setEngPercent(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <p className="text-[11px] text-zinc-400 mt-2">
              Customer wins, industry debates, and community polls. Sparks comment velocity.
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-pink-400">3. Commercial Offer</span>
              <span className="font-mono text-white font-bold">{promoPercent}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={promoPercent}
              onChange={(e) => setPromoPercent(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
            <p className="text-[11px] text-zinc-400 mt-2">
              Product demos, limited offers, and direct calls-to-action. Converts pipeline.
            </p>
          </div>
        </div>

        {/* Simulated Health Outcome Indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Projected Algorithmic Reach:</span>
            <span className="text-xl font-bold text-emerald-400 tabular-nums">{strategyScore.reachIndex} / 100</span>
            <span className="text-[10px] text-zinc-400 block font-sans mt-1">Organic Feed Distribution Score</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Lead Conversion Velocity:</span>
            <span className="text-xl font-bold text-amber-400 tabular-nums">{strategyScore.conversionIndex} / 100</span>
            <span className="text-[10px] text-zinc-400 block font-sans mt-1">High-Intent Sales Pipeline Efficiency</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Audience Fatigue Risk:</span>
            <span className={`text-base font-bold font-sans mt-1 block ${strategyScore.fatigueRisk.includes('High') ? 'text-rose-400' : 'text-emerald-400'}`}>
              {strategyScore.fatigueRisk}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
