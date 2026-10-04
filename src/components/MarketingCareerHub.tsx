import React, { useState } from 'react';
import {
  MARKETING_PILLARS,
  MarketingPillar,
  MARKETING_CAREER_TRACKS,
  MarketingCareerTrack,
  AGENCY_VS_INHOUSE_MODELS,
} from '../data/marketingData';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Search,
  Share2,
  FileText,
  Mail,
  Target,
  Handshake,
  Award,
  ChevronRight,
  Sparkles,
  Building,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';

export const MarketingCareerHub: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('pillar-seo');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('career-vp-growth');
  const [salarySeniority, setSalarySeniority] = useState<'senior' | 'mid' | 'leadExec' | 'entry'>('senior');
  const [remoteOnlyFilter, setRemoteOnlyFilter] = useState<boolean>(false);

  const selectedPillar = MARKETING_PILLARS.find((p) => p.id === selectedPillarId) || MARKETING_PILLARS[0];
  const selectedCareer = MARKETING_CAREER_TRACKS.find((c) => c.id === selectedCareerId) || MARKETING_CAREER_TRACKS[0];

  const filteredCareers = MARKETING_CAREER_TRACKS.filter((c) => {
    if (remoteOnlyFilter) {
      const percentage = parseInt(c.remoteAvailability.replace(/\D/g, ''), 10) || 0;
      return percentage >= 85;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181329] to-[#120E1F] border border-purple-900/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
            <span>Executive Career Telemetry & Business Models</span>
            <span aria-hidden="true">·</span>
            <span>2026 Industry Compensation Benchmarks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Digital Marketing & Career Navigator
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Deconstruct the 7 core pillars of modern revenue growth and explore compensation telemetry,
            technical skill stacks, and progression roadmaps for the 10 highest-paid marketing tracks in tech.
          </p>
        </div>
      </div>

      {/* SECTION 1: THE 7 CORE DIGITAL MARKETING PILLARS */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              01. The 7 Core Pillars of Modern Digital Marketing
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select a pillar below to review its KPI framework, modern tech stack, and execution playbook
            </p>
          </div>
          <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-800/50">
            Multi-Channel Architecture
          </span>
        </div>

        {/* 7 Pillar Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
          {MARKETING_PILLARS.map((pillar) => {
            const isSelected = selectedPillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/40 border-amber-400 shadow-md shadow-purple-950/40'
                    : 'bg-[#0D0B14] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400 block mb-1">0{pillar.order}</span>
                  <h3 className="text-xs font-bold text-white line-clamp-1 font-display">{pillar.name}</h3>
                </div>
                <span className="text-[10px] font-mono text-purple-300 mt-2 block">{pillar.acronym}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Inspection Box */}
        <div className="p-6 rounded-2xl bg-[#0D0B14] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Pillar 0{selectedPillar.order} Breakdown
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-xs text-purple-300 font-mono">{selectedPillar.acronym}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {selectedPillar.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{selectedPillar.tagline}</p>
            </div>

            <div className="max-w-xs text-xs font-mono bg-[#141021] p-3 rounded-xl border border-zinc-800 shrink-0">
              <span className="text-[10px] text-zinc-400 block font-sans">Primary Strategic Goal:</span>
              <span className="text-emerald-400 font-medium block mt-0.5">{selectedPillar.primaryGoal}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* KPIs */}
            <div className="p-4 rounded-xl bg-[#141021] border border-zinc-800">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-3">
                Core Metrics & KPIs
              </span>
              <ul className="space-y-2 text-zinc-300">
                {selectedPillar.coreMetricsKPIs.map((kpi, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-mono text-[10px] mt-0.5">#{idx + 1}</span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Playbook */}
            <div className="p-4 rounded-xl bg-[#141021] border border-zinc-800">
              <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider block mb-3">
                Tactical Execution Playbook
              </span>
              <ul className="space-y-2 text-zinc-300">
                {selectedPillar.executionPlaybook.map((tactic, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Pitfall */}
            <div className="p-4 rounded-xl bg-[#141021] border border-zinc-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  Key Production Tools
                </span>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedPillar.techStackTools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#0D0B14] border border-zinc-800 font-mono text-[11px] text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80">
                <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1 mb-1 font-mono uppercase">
                  <AlertTriangle className="w-3 h-3" /> Critical Risk / Pitfall:
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{selectedPillar.riskFactor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 10 HIGHEST-PAID MARKETING CAREER TRACKS */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              02. The 10 Highest-Paid Marketing Career Tracks
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Salary telemetry, technical vs creative ratios, remote prevalence, and executive day-in-the-life profiles
            </p>
          </div>

          {/* Controls: Seniority Toggle & Remote Filter */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <label className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnlyFilter}
                onChange={(e) => setRemoteOnlyFilter(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-purple-600 bg-zinc-900 border-zinc-700"
              />
              <span>High Remote (&ge;85%)</span>
            </label>

            <div className="flex items-center bg-[#0D0B14] p-1 rounded-xl border border-zinc-800 text-xs font-mono">
              <button
                onClick={() => setSalarySeniority('entry')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${salarySeniority === 'entry' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Entry
              </button>
              <button
                onClick={() => setSalarySeniority('mid')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${salarySeniority === 'mid' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Mid
              </button>
              <button
                onClick={() => setSalarySeniority('senior')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${salarySeniority === 'senior' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Senior
              </button>
              <button
                onClick={() => setSalarySeniority('leadExec')}
                className={`px-2.5 py-1 rounded-lg cursor-pointer ${salarySeniority === 'leadExec' ? 'bg-purple-600 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Lead/Exec
              </button>
            </div>
          </div>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {filteredCareers.map((career) => {
            const isSelected = selectedCareerId === career.id;
            return (
              <button
                key={career.id}
                onClick={() => setSelectedCareerId(career.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/40 border-amber-400 shadow-md shadow-purple-950/40 ring-1 ring-amber-400/40'
                    : 'bg-[#0D0B14] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-amber-400">RANK 0{career.rank}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{career.remoteAvailability.split(' ')[0]}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-2 font-display mb-2">{career.title}</h3>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 font-mono">
                  <span className="text-[10px] text-zinc-400 block font-sans">USD Benchmark:</span>
                  <span className="text-xs font-bold text-emerald-400 block truncate">
                    {career.salaryUSD[salarySeniority].split('(')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Career Detailed Telemetry Card */}
        <div className="p-6 rounded-2xl bg-[#0D0B14] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  Rank 0{selectedCareer.rank} Career Deep Dive
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-xs text-purple-300 font-mono">{selectedCareer.remoteAvailability}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {selectedCareer.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Also known as: {selectedCareer.alternateTitles.join(', ')}
              </p>
            </div>

            {/* Salary Tier Selector Display */}
            <div className="p-3.5 rounded-xl bg-[#141021] border border-zinc-800 font-mono text-xs shrink-0">
              <span className="text-[10px] text-zinc-400 block font-sans">
                {salarySeniority.toUpperCase()} Salary Range (2026):
              </span>
              <span className="text-lg font-bold text-emerald-400 tabular-nums">
                {selectedCareer.salaryUSD[salarySeniority]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* Left: Mission & Day In The Life */}
            <div className="space-y-4">
              <div>
                <span className="text-zinc-400 font-semibold block text-[11px] mb-1">Primary Strategic Mission:</span>
                <p className="text-zinc-200 leading-relaxed">{selectedCareer.primaryMission}</p>
              </div>

              <div>
                <span className="text-zinc-400 font-semibold block text-[11px] mb-1">Day-in-the-Life Walkthrough:</span>
                <p className="text-zinc-300 leading-relaxed bg-[#141021] p-3 rounded-xl border border-zinc-800">
                  {selectedCareer.dayInTheLife}
                </p>
              </div>

              {/* Technical vs Creative Balance Bar */}
              <div>
                <div className="flex justify-between text-[11px] mb-1.5 font-mono">
                  <span className="text-purple-300">Technical / Data ({selectedCareer.technicalVsCreativeRatio.technical}%)</span>
                  <span className="text-amber-300">Creative / Narrative ({selectedCareer.technicalVsCreativeRatio.creative}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex">
                  <div
                    className="h-full bg-purple-600"
                    style={{ width: `${selectedCareer.technicalVsCreativeRatio.technical}%` }}
                  />
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${selectedCareer.technicalVsCreativeRatio.creative}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Tool Stack, Career Path & Interview Question */}
            <div className="space-y-4">
              <div>
                <span className="text-zinc-400 font-semibold block text-[11px] mb-2">Dominant Tool Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.coreToolStack.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#141021] border border-zinc-800 font-mono text-[11px] text-zinc-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-400 font-semibold block text-[11px] mb-1">Career Progression Ladder:</span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-300">
                  {selectedCareer.careerAdvancement.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px]">
                        {step}
                      </span>
                      {idx < selectedCareer.careerAdvancement.length - 1 && (
                        <ChevronRight className="w-3 h-3 text-zinc-600" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/50">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1 font-mono">
                  Sample Executive Interview Topic:
                </span>
                <p className="text-xs text-zinc-200 italic">&ldquo;{selectedCareer.interviewTopicSample}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: AGENCY BUSINESS MODELS VS IN-HOUSE */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              03. Agency Business Models vs. In-House Economics
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Strategic tradeoffs between external marketing agencies, performance retainers, and dedicated internal teams
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 px-3 py-1 rounded-lg bg-amber-950/30 border border-amber-800/40">
            Economics Comparison
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AGENCY_VS_INHOUSE_MODELS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D0B14] border border-zinc-800 space-y-3 text-xs"
            >
              <h3 className="text-sm font-bold text-white font-display pb-2 border-b border-zinc-800">
                {item.attribute}
              </h3>

              <div>
                <span className="text-purple-300 font-semibold block text-[11px] mb-0.5 font-mono">
                  External Agency Model:
                </span>
                <p className="text-zinc-300 leading-relaxed">{item.agencyModel}</p>
              </div>

              <div>
                <span className="text-amber-400 font-semibold block text-[11px] mb-0.5 font-mono">
                  In-House Team Model:
                </span>
                <p className="text-zinc-300 leading-relaxed">{item.inHouseModel}</p>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-400 italic">
                <span className="text-emerald-400 font-sans not-italic font-semibold mr-1">Recommendation:</span>
                {item.bestFitRecommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
