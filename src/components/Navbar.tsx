import React from 'react';
import {
  Globe2,
  Server,
  CalendarClock,
  Briefcase,
  Sparkles,
  Key,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export type ActiveTab = 'platforms' | 'systems' | 'strategy' | 'marketing' | 'copilot';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenApiModal: () => void;
  onOpenConsentModal: () => void;
  hasCustomKey: boolean;
  hasConsent: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApiModal,
  onOpenConsentModal,
  hasCustomKey,
  hasConsent,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'platforms', label: 'Platform Explorer', icon: Globe2 },
    { id: 'systems', label: 'Data Systems Lab', icon: Server },
    { id: 'strategy', label: 'Posting Strategy & Timing', icon: CalendarClock },
    { id: 'marketing', label: 'Marketing & Careers', icon: Briefcase },
    { id: 'copilot', label: 'Gemini AI Copilot', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-950/40 bg-[#0D0B14]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('platforms')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-700 to-amber-500 p-[1px] shadow-lg shadow-purple-900/30">
              <div className="w-full h-full bg-[#0D0B14] rounded-[11px] flex items-center justify-center text-amber-400">
                <Globe2 className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-zinc-100 to-amber-200 bg-clip-text text-transparent">
                  SocialSphere
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/90 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  Global 2026
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-normal hidden sm:block">
                Unified Social Intelligence & Architecture Ecosystem
              </p>
            </div>
          </div>

          {/* Center Navigation Segmented Buttons */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#141021] border border-zinc-800/80 rounded-xl shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/30 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Privacy Consent Trigger */}
            <button
              onClick={onOpenConsentModal}
              title="Privacy & Consent Settings"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                hasConsent
                  ? 'bg-purple-950/40 border-purple-800/60 text-purple-300 hover:bg-purple-900/40'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${hasConsent ? 'text-emerald-400' : 'text-zinc-400'}`} />
              <span className="hidden md:inline">{hasConsent ? 'Consent Active' : 'Permissions'}</span>
            </button>

            {/* AI API Setup Trigger */}
            <button
              onClick={onOpenApiModal}
              title="Configure Gemini Engine Key"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                hasCustomKey
                  ? 'bg-amber-950/40 border-amber-600/50 text-amber-300 hover:bg-amber-900/40'
                  : 'bg-[#181329] border-purple-800/50 text-zinc-300 hover:text-white hover:border-amber-400/50'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">AI Config</span>
            </button>

            {/* Quick Copilot Jump Button */}
            <button
              onClick={() => setActiveTab('copilot')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'copilot'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-900/30'
                  : 'bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-md shadow-purple-900/30'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden items-center gap-1 overflow-x-auto py-2.5 scrollbar-none border-t border-zinc-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-sm shadow-purple-900/30'
                    : 'text-zinc-400 hover:text-white bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
