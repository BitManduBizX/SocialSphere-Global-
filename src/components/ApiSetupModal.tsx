import React, { useState, useEffect } from 'react';
import { Key, CheckCircle2, AlertCircle, Eye, EyeOff, X, Shield, Cpu, RefreshCw } from 'lucide-react';

interface ApiSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export const ApiSetupModal: React.FC<ApiSetupModalProps> = ({
  isOpen,
  onClose,
  onKeySaved,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'configured' | 'unconfigured'>('checking');
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  useEffect(() => {
    if (isOpen) {
      checkServerKeyStatus();
      const localKey = sessionStorage.getItem('socialsphere_custom_api_key') || localStorage.getItem('socialsphere_custom_api_key') || '';
      setApiKeyInput(localKey);
    }
  }, [isOpen]);

  const checkServerKeyStatus = async () => {
    setServerStatus('checking');
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setServerStatus(data.hasApiKey ? 'configured' : 'unconfigured');
      } else {
        setServerStatus('unconfigured');
      }
    } catch {
      setServerStatus('unconfigured');
    }
  };

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = apiKeyInput.trim();
    if (trimmed) {
      sessionStorage.setItem('socialsphere_custom_api_key', trimmed);
      onKeySaved(trimmed);
    } else {
      sessionStorage.removeItem('socialsphere_custom_api_key');
      onKeySaved('');
    }
    onClose();
  };

  const handleTestKey = async () => {
    setTestResult({ status: 'testing', message: 'Verifying with Gemini model...' });
    const keyToTest = apiKeyInput.trim();

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (keyToTest) {
        headers['x-gemini-api-key'] = keyToTest;
      }

      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          prompt: 'Respond with the single word: "Operational"',
          model: 'gemini-2.5-flash',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTestResult({
          status: 'success',
          message: `API Verified Successfully! Response: "${data.text?.trim()}"`,
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setTestResult({
          status: 'error',
          message: errData.details || errData.error || 'Connection failed. Please check the API key.',
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setTestResult({
        status: 'error',
        message: `Network error: ${msg}`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141021] border border-amber-500/30 rounded-2xl p-6 md:p-8 shadow-2xl text-left overflow-hidden">
        {/* Regal top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-amber-500" />

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-white">AI Engine Configuration</h3>
              <p className="text-xs text-zinc-400">Gemini 2.5 Flash research connection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Key Status Badge */}
        <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800/90 mb-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-purple-400" />
              Server Environment Status:
            </span>
            {serverStatus === 'checking' && (
              <span className="text-zinc-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin" /> Checking...
              </span>
            )}
            {serverStatus === 'configured' && (
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Server Key Active
              </span>
            )}
            {serverStatus === 'unconfigured' && (
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> No Server Key Found
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
            {serverStatus === 'configured'
              ? 'A default Gemini key is already injected into the backend server environment. You may also override it with a session key below.'
              : 'You can test queries using SocialSphere’s rich built-in offline research intelligence, or provide your Gemini API key below for live streaming models.'}
          </p>
        </div>

        {/* Custom Key Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-zinc-300 mb-2">
            Optional Session Gemini API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#0D0B14] border border-zinc-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 font-mono tracking-wide pr-10"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1.5 block">
            Stored in browser memory only for this session. Never transmitted to third parties.
          </span>
        </div>

        {/* Test Result Message */}
        {testResult.message && (
          <div
            className={`p-3 rounded-xl text-xs mb-5 flex items-start gap-2 ${
              testResult.status === 'success'
                ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                : testResult.status === 'error'
                ? 'bg-rose-950/40 border border-rose-800 text-rose-300'
                : 'bg-purple-950/40 border border-purple-800 text-purple-300'
            }`}
          >
            {testResult.status === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />}
            {testResult.status === 'error' && <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />}
            {testResult.status === 'testing' && <RefreshCw className="w-4 h-4 shrink-0 mt-0.5 animate-spin text-purple-400" />}
            <span className="leading-relaxed">{testResult.message}</span>
          </div>
        )}

        <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 mb-6">
          <Shield className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Zero-Risk Resilience: Offline synthesis guarantees answers even if offline or keyless.</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleTestKey}
            disabled={testResult.status === 'testing'}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testResult.status === 'testing' ? 'animate-spin' : ''}`} />
            Test Connection
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-900/30 transition-all cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
