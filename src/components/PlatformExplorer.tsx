import React, { useState, useMemo } from 'react';
import {
  PLATFORMS_DATA,
  SocialPlatform,
} from '../data/platformsData';
import {
  Search,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  TrendingUp,
  Clock,
  DollarSign,
  Layers,
  ArrowUpDown,
  ExternalLink,
  X,
  Sparkles,
  Info,
} from 'lucide-react';

export const PlatformExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedTaxonomy, setSelectedTaxonomy] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'mau' | 'growth' | 'time' | 'year'>('mau');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [inspectedPlatform, setInspectedPlatform] = useState<SocialPlatform | null>(null);

  const regions = ['All', 'Global', 'North America', 'APAC', 'EMEA', 'LATAM'];
  const taxonomies = [
    'All',
    'Social Network',
    'Visual Media',
    'Short-Form Video',
    'Messaging & Super App',
    'Professional Network',
    'Discussion & Forum',
    'Ephemeral & AR',
    'Microblogging',
    'Knowledge & Q&A',
    'Community & Voice',
  ];

  const filteredPlatforms = useMemo(() => {
    return PLATFORMS_DATA.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.parentCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.taxonomy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.algorithmEngine.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === 'All' || p.regionDominance === selectedRegion || p.regionDominance === 'Global';

      const matchesTaxonomy =
        selectedTaxonomy === 'All' || p.taxonomy === selectedTaxonomy;

      return matchesSearch && matchesRegion && matchesTaxonomy;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'mau') {
        comparison = b.metrics.mau - a.metrics.mau;
      } else if (sortBy === 'growth') {
        const growthA = parseFloat(a.metrics.growthRateYoY.replace(/[^\d.-]/g, '')) || 0;
        const growthB = parseFloat(b.metrics.growthRateYoY.replace(/[^\d.-]/g, '')) || 0;
        comparison = growthB - growthA;
      } else if (sortBy === 'time') {
        comparison = b.metrics.avgDailyMinutes - a.metrics.avgDailyMinutes;
      } else if (sortBy === 'year') {
        comparison = b.foundedYear - a.foundedYear;
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }, [searchQuery, selectedRegion, selectedTaxonomy, sortBy, sortOrder]);

  const totalMau = useMemo(() => {
    return PLATFORMS_DATA.reduce((acc, curr) => acc + curr.metrics.mau, 0);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Kicker & Editorial Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181329] to-[#120E1F] border border-purple-900/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
            <span>2026 DataReportal & Telemetry Benchmark</span>
            <span aria-hidden="true">·</span>
            <span>18 Core Global Platforms</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Global Social Media Platforms Explorer
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Analyze active monthly user telemetries, regional market dominance, deep learning recommendation engines,
            monetization splits, and underlying distributed database architectures across all major networks.
          </p>

          {/* Quick Aggregate Stats Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/80">
            <div>
              <span className="text-xs text-zinc-400 block">Total Combined MAUs</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                {(totalMau / 1000).toFixed(1)}B+
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">Fastest Growing (YoY)</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
                Threads (+42.5%)
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">Highest Daily Dwell</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-purple-300 tabular-nums">
                Douyin (105 min)
              </span>
            </div>
            <div>
              <span className="text-xs text-zinc-400 block">Ecosystem Anchor</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                Meta (3.07B MAU)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters, Sorting, and View Switcher */}
      <div className="space-y-4 bg-[#141021] border border-zinc-800/80 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by platform name, company, algorithm or demographics..."
              className="w-full bg-[#0D0B14] border border-zinc-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector & View Toggle */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#0D0B14] border border-zinc-800 rounded-xl px-3 py-1.5 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-zinc-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'mau' | 'growth' | 'time' | 'year')}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="mau" className="bg-[#141021]">MAUs</option>
                <option value="growth" className="bg-[#141021]">YoY Growth</option>
                <option value="time" className="bg-[#141021]">Daily Dwell</option>
                <option value="year" className="bg-[#141021]">Launch Year</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                title="Toggle sort direction"
                className="ml-1 text-zinc-400 hover:text-white text-[10px] font-mono cursor-pointer"
              >
                {sortOrder === 'desc' ? '↓' : '↑'}
              </button>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center p-1 bg-[#0D0B14] border border-zinc-800 rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Grid Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Telemetry Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Badges / Segmented Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800/60">
          
          {/* Region Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-[11px] font-medium text-zinc-400 mr-1 flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3 h-3" /> Region:
            </span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-purple-600 text-white font-medium shadow-sm shadow-purple-900/40'
                    : 'text-zinc-400 hover:text-zinc-200 bg-[#0D0B14] hover:bg-zinc-800/50'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Taxonomy Dropdown for mobile & desktop */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-zinc-400 shrink-0">Taxonomy:</span>
            <select
              value={selectedTaxonomy}
              onChange={(e) => setSelectedTaxonomy(e.target.value)}
              className="bg-[#0D0B14] border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              {taxonomies.map((tax) => (
                <option key={tax} value={tax} className="bg-[#141021]">
                  {tax}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Counter & Active Filter Indicators */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <div>
          Showing <span className="text-white font-semibold font-mono tabular-nums">{filteredPlatforms.length}</span> of{' '}
          <span className="font-mono tabular-nums">{PLATFORMS_DATA.length}</span> global networks
        </div>
        {(selectedRegion !== 'All' || selectedTaxonomy !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedRegion('All');
              setSelectedTaxonomy('All');
              setSearchQuery('');
            }}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* VIEW 1: GRID CARDS VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPlatforms.map((platform) => (
            <div
              key={platform.id}
              onClick={() => setInspectedPlatform(platform)}
              className="group relative bg-[#141021] border border-zinc-800/90 hover:border-amber-400/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:shadow-purple-950/20 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm"
                      style={{ backgroundColor: platform.color || '#6D28D9' }}
                    >
                      {platform.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                        {platform.name}
                      </h3>
                      <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                        <span>{platform.parentCompany}</span>
                        <span aria-hidden="true">·</span>
                        <span>Est. {platform.foundedYear}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-white bg-[#0D0B14] px-2.5 py-1 rounded-lg border border-zinc-800 tabular-nums">
                    {platform.metrics.mau >= 1000
                      ? `${(platform.metrics.mau / 1000).toFixed(2)}B`
                      : `${platform.metrics.mau}M`}{' '}
                    <span className="text-[10px] text-zinc-400 font-normal">MAU</span>
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                  {platform.tagline}
                </p>

                {/* Unboxed Metadata Row */}
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-4 pb-3 border-b border-zinc-800/80">
                  <span className="text-zinc-200">{platform.taxonomy}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400">{platform.regionDominance}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-purple-300 tabular-nums">
                    {platform.metrics.growthRateYoY} YoY
                  </span>
                </div>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-[#0D0B14] p-3 rounded-xl border border-zinc-800/60 font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-sans">Avg Daily Time:</span>
                    <span className="text-white font-medium tabular-nums">{platform.metrics.avgDailyMinutes} mins</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-sans">Ad Revenue:</span>
                    <span className="text-emerald-400 font-medium tabular-nums">{platform.metrics.adRevenueEstimate}</span>
                  </div>
                </div>

                {/* Algorithm Snippet */}
                <div className="text-xs text-zinc-300 mb-3">
                  <span className="text-[11px] text-zinc-400 block font-semibold mb-1">Algorithm Architecture:</span>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 italic">
                    &ldquo;{platform.algorithmEngine.corePhilosophy}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer Clicker */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60 text-xs">
                <span className="text-[11px] text-zinc-400 font-mono">
                  {platform.dataArchitecture.storageEngine.split('+')[0].trim()}
                </span>
                <span className="flex items-center gap-1 text-purple-300 group-hover:text-amber-300 font-medium transition-colors">
                  Inspect Telemetry <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: HIGH-DENSITY COMPARISON TABLE */}
      {viewMode === 'table' && (
        <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D0B14] text-zinc-400 uppercase tracking-wider text-[10px] font-mono border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Platform & Parent</th>
                  <th className="py-3.5 px-4 font-semibold text-right">MAUs (2026)</th>
                  <th className="py-3.5 px-4 font-semibold">Taxonomy</th>
                  <th className="py-3.5 px-4 font-semibold">Core Demographics</th>
                  <th className="py-3.5 px-4 font-semibold">Monetization Engine</th>
                  <th className="py-3.5 px-4 font-semibold">Algorithm & Storage</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredPlatforms.map((platform) => (
                  <tr
                    key={platform.id}
                    onClick={() => setInspectedPlatform(platform)}
                    className="hover:bg-purple-950/20 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-[11px] shrink-0"
                          style={{ backgroundColor: platform.color || '#6D28D9' }}
                        >
                          {platform.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-white group-hover:text-amber-300 transition-colors block">
                            {platform.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 block">{platform.parentCompany}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                      {platform.metrics.mau >= 1000
                        ? `${(platform.metrics.mau / 1000).toFixed(2)}B`
                        : `${platform.metrics.mau}M`}
                      <span className="block text-[10px] font-normal text-purple-300">
                        {platform.metrics.growthRateYoY}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-zinc-200 block">{platform.taxonomy}</span>
                      <span className="text-[10px] text-amber-400 block">{platform.regionDominance}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-zinc-200 block">{platform.demographics.primaryAgeGroup}</span>
                      <span className="text-[10px] text-zinc-400 line-clamp-1">
                        {platform.demographics.topRegions.join(', ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-zinc-200 block line-clamp-1">{platform.monetization.primary}</span>
                      <span className="text-[10px] text-emerald-400 block">
                        {platform.metrics.adRevenueEstimate}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-zinc-300 font-mono text-[11px] block line-clamp-1">
                        {platform.algorithmEngine.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono line-clamp-1">
                        {platform.dataArchitecture.graphDb}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="px-2.5 py-1 rounded bg-zinc-800/80 group-hover:bg-purple-600 text-zinc-300 group-hover:text-white transition-colors text-[11px] font-medium cursor-pointer">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PLATFORM INSPECTION DEEP-DIVE MODAL */}
      {inspectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#141021] border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left">
            {/* Top Accent Strip */}
            <div className="w-full h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600" />

            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-start justify-between gap-4 bg-[#181329]">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shrink-0"
                  style={{ backgroundColor: inspectedPlatform.color || '#6D28D9' }}
                >
                  {inspectedPlatform.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-white font-display">
                      {inspectedPlatform.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-amber-300 font-mono">
                      {inspectedPlatform.taxonomy}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                    <span>{inspectedPlatform.parentCompany}</span>
                    <span aria-hidden="true">·</span>
                    <span>HQ: {inspectedPlatform.headquarters}</span>
                    <span aria-hidden="true">·</span>
                    <span>Founded {inspectedPlatform.foundedYear}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectedPlatform(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body with Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* 2026 Strategic Insight Highlight */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-800/50">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> 2026 Telemetry & Industry Insight
                </span>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {inspectedPlatform.status2026Insight}
                </p>
              </div>

              {/* Core Telemetry Metrics Grid */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  01. Scale & User Engagement Telemetry
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Monthly Actives:</span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {inspectedPlatform.metrics.mau >= 1000
                        ? `${(inspectedPlatform.metrics.mau / 1000).toFixed(2)} Billion`
                        : `${inspectedPlatform.metrics.mau} Million`}
                    </span>
                    <span className="text-[10px] text-purple-300 block">
                      Growth: {inspectedPlatform.metrics.growthRateYoY} YoY
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Daily Actives (DAU):</span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {inspectedPlatform.metrics.dau ? `${inspectedPlatform.metrics.dau}M` : 'Undisclosed'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">
                      Ratio: {inspectedPlatform.metrics.dau ? `${Math.round((inspectedPlatform.metrics.dau / inspectedPlatform.metrics.mau) * 100)}% DAU/MAU` : 'N/A'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Avg Daily Time:</span>
                    <span className="text-lg font-bold text-amber-400 tabular-nums">
                      {inspectedPlatform.metrics.avgDailyMinutes} Mins
                    </span>
                    <span className="text-[10px] text-zinc-400 block">Per Active User</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Annual Ad Rev:</span>
                    <span className="text-lg font-bold text-emerald-400 tabular-nums">
                      {inspectedPlatform.metrics.adRevenueEstimate}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">2025/2026 Est.</span>
                  </div>
                </div>
              </div>

              {/* Audience Demographics & Persona */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  02. Demographics & Audience Persona
                </h4>
                <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800 space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Primary Age Concentration:</span>
                      <span className="text-white font-medium text-sm">{inspectedPlatform.demographics.primaryAgeGroup}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[11px]">Gender Distribution:</span>
                      <span className="text-white font-medium text-sm">
                        {inspectedPlatform.demographics.genderSplit.male}% Male / {inspectedPlatform.demographics.genderSplit.female}% Female
                        {inspectedPlatform.demographics.genderSplit.other ? ` / ${inspectedPlatform.demographics.genderSplit.other}% Other` : ''}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px] mb-1">Geographic Strongholds:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectedPlatform.demographics.topRegions.map((reg, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 text-xs">
                          {reg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">User Persona Profile:</span>
                    <p className="text-zinc-300 italic mt-0.5">&ldquo;{inspectedPlatform.demographics.userPersona}&rdquo;</p>
                  </div>
                </div>
              </div>

              {/* Algorithm Engine & Ranking Factors */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  03. Recommendation Engine Architecture
                </h4>
                <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-display">
                      {inspectedPlatform.algorithmEngine.name}
                    </span>
                    <span className="text-xs text-purple-300 font-mono">
                      {inspectedPlatform.algorithmEngine.type.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {inspectedPlatform.algorithmEngine.type}
                  </p>
                  <div>
                    <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">Core Ranking Signals:</span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {inspectedPlatform.algorithmEngine.rankingFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-mono text-[10px] mt-0.5">#{idx + 1}</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Systems & Persistence Infrastructure */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  04. Distributed Data Systems & Infrastructure Stack
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Storage & Persistence:</span>
                    <span className="text-zinc-200">{inspectedPlatform.dataArchitecture.storageEngine}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Graph Database Engine:</span>
                    <span className="text-zinc-200">{inspectedPlatform.dataArchitecture.graphDb}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Stream Processing:</span>
                    <span className="text-zinc-200">{inspectedPlatform.dataArchitecture.streamIngestion}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0D0B14] border border-zinc-800">
                    <span className="text-[10px] text-zinc-400 block font-sans">Distributed Caching:</span>
                    <span className="text-zinc-200">{inspectedPlatform.dataArchitecture.cacheLayer}</span>
                  </div>
                </div>
                <div className="p-3 mt-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs">
                  <span className="text-[10px] text-purple-300 block font-sans font-semibold mb-0.5">
                    Proprietary Technical Innovation:
                  </span>
                  <span className="text-zinc-300">{inspectedPlatform.dataArchitecture.specialTech}</span>
                </div>
              </div>

              {/* Monetization & Creator Economics */}
              <div>
                <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  05. Monetization Strategy & Creator Splits
                </h4>
                <div className="p-4 rounded-xl bg-[#0D0B14] border border-zinc-800 space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Primary Revenue Engine:</span>
                    <span className="text-white font-medium">{inspectedPlatform.monetization.primary}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Secondary Streams:</span>
                    <span className="text-zinc-300">{inspectedPlatform.monetization.secondary.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 block">Creator Revenue Share:</span>
                    <span className="text-emerald-400 font-medium">{inspectedPlatform.monetization.creatorRevenueShare}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-[#181329] flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                Source: DataReportal Global Overview, SEC Filings & Engineering Whitepapers
              </span>
              <button
                onClick={() => setInspectedPlatform(null)}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium cursor-pointer transition-colors"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
