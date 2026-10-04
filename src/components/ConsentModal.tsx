import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Info } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentChange: (consented: boolean) => void;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  onConsentChange,
}) => {
  const [allowAiInteractions, setAllowAiInteractions] = useState(true);
  const [allowTelemetry, setAllowTelemetry] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('socialsphere_privacy_consent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAllowAiInteractions(Boolean(parsed.allowAiInteractions));
        setAllowTelemetry(Boolean(parsed.allowTelemetry));
      } catch {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSave = (consented: boolean) => {
    const preferences = {
      consented,
      allowAiInteractions: consented && allowAiInteractions,
      allowTelemetry: consented && allowTelemetry,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('socialsphere_privacy_consent', JSON.stringify(preferences));
    onConsentChange(consented);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141021] border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-left overflow-hidden">
        {/* Regal top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-amber-400 to-purple-600" />

        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">Privacy & AI Telemetry Consent</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Explicit consent protocol for research interactions</p>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-5">
          SocialSphere operates on a strict <span className="text-amber-400 font-medium">&quot;Always Ask Permission&quot;</span> foundation. 
          We never store personal queries on remote servers or track your identity across sessions.
        </p>

        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800/80 cursor-pointer hover:border-purple-500/40 transition-colors">
            <input
              type="checkbox"
              checked={allowAiInteractions}
              onChange={(e) => setAllowAiInteractions(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-zinc-900 border-zinc-700"
            />
            <div>
              <span className="text-sm font-semibold text-zinc-200 block">Personalized Gemini AI Queries</span>
              <span className="text-xs text-zinc-400 leading-normal">
                Permit local browser execution of streaming prompts with Gemini 2.5 Flash research model.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800/80 cursor-pointer hover:border-purple-500/40 transition-colors">
            <input
              type="checkbox"
              checked={allowTelemetry}
              onChange={(e) => setAllowTelemetry(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-zinc-900 border-zinc-700"
            />
            <div>
              <span className="text-sm font-semibold text-zinc-200 block">Interactive Simulator Analytics</span>
              <span className="text-xs text-zinc-400 leading-normal">
                Allow client-side calculation of system throughput, QPS latency charts, and heatmap filters.
              </span>
            </div>
          </label>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300 mb-6">
          <Info className="w-4 h-4 shrink-0 text-amber-400" />
          <span>You can revoke or modify these permissions at any time from the top navigation bar.</span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => handleSave(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            Decline & Use Offline Only
          </button>
          <button
            onClick={() => handleSave(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-lg shadow-purple-900/40 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
