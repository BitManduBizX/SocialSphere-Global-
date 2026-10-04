/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar, ActiveTab } from './components/Navbar';
import { PlatformExplorer } from './components/PlatformExplorer';
import { DataSystemsLab } from './components/DataSystemsLab';
import { StrategyLab } from './components/StrategyLab';
import { MarketingCareerHub } from './components/MarketingCareerHub';
import { GeminiCopilot } from './components/GeminiCopilot';
import { ApiSetupModal } from './components/ApiSetupModal';
import { ConsentModal } from './components/ConsentModal';
import { Globe2, Shield, Sparkles, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('platforms');
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState<boolean>(false);
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(false);
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  useEffect(() => {
    // Check if custom key is in session/local storage
    const customKey =
      sessionStorage.getItem('socialsphere_custom_api_key') ||
      localStorage.getItem('socialsphere_custom_api_key');
    setHasCustomKey(Boolean(customKey));

    // Check privacy consent status
    const consent = localStorage.getItem('socialsphere_privacy_consent');
    if (consent) {
      try {
        const parsed = JSON.parse(consent);
        setHasConsent(Boolean(parsed.consented));
      } catch {
        // ignore
      }
    } else {
      // First visit: show consent prompt modal gently
      const hasSeenPrompt = sessionStorage.getItem('socialsphere_has_seen_consent_prompt');
      if (!hasSeenPrompt) {
        setIsConsentModalOpen(true);
        sessionStorage.setItem('socialsphere_has_seen_consent_prompt', 'true');
      }
    }
  }, []);

  const handleKeySaved = (key: string) => {
    setHasCustomKey(Boolean(key));
  };

  const handleConsentChange = (consented: boolean) => {
    setHasConsent(consented);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0D0B14] text-[#FAFAFD] flex flex-col font-sans selection:bg-purple-600 selection:text-white">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenApiModal={() => setIsApiModalOpen(true)}
          onOpenConsentModal={() => setIsConsentModalOpen(true)}
          hasCustomKey={hasCustomKey}
          hasConsent={hasConsent}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'platforms' && <PlatformExplorer />}
          {activeTab === 'systems' && <DataSystemsLab />}
          {activeTab === 'strategy' && <StrategyLab />}
          {activeTab === 'marketing' && <MarketingCareerHub />}
          {activeTab === 'copilot' && (
            <GeminiCopilot
              onOpenApiModal={() => setIsApiModalOpen(true)}
              hasCustomKey={hasCustomKey}
              hasConsent={hasConsent}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-purple-950/40 bg-[#0A0810] py-8 text-xs text-zinc-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-amber-400">
                <Globe2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold text-white tracking-tight">SocialSphere</span>
              <span aria-hidden="true" className="text-zinc-700">·</span>
              <span>Global Intelligence & Distributed Architecture Ecosystem</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <button
                onClick={() => setIsConsentModalOpen(true)}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Privacy Protocol
              </button>
              <button
                onClick={() => setIsApiModalOpen(true)}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Gemini Engine Config
              </button>
              <span className="text-zinc-600">© 2026 SocialSphere Telemetry</span>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <ApiSetupModal
          isOpen={isApiModalOpen}
          onClose={() => setIsApiModalOpen(false)}
          onKeySaved={handleKeySaved}
        />

        <ConsentModal
          isOpen={isConsentModalOpen}
          onClose={() => setIsConsentModalOpen(false)}
          onConsentChange={handleConsentChange}
        />
      </div>
    </ErrorBoundary>
  );
}
