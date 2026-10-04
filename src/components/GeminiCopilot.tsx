import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Cpu,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { AI_ECOSYSTEM_TRENDS, getOfflineAiResponse } from '../data/aiEcosystemData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini-live' | 'offline-knowledge';
}

interface GeminiCopilotProps {
  onOpenApiModal: () => void;
  hasCustomKey: boolean;
  hasConsent: boolean;
}

export const GeminiCopilot: React.FC<GeminiCopilotProps> = ({
  onOpenApiModal,
  hasCustomKey,
  hasConsent,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to the **SocialSphere Intelligence Copilot** powered by **Gemini 2.5 Flash**.

I can assist you with:
- **Algorithm Mechanics**: Reconstructing TikTok, Instagram, YouTube, and X ranking weights.
- **Data Architecture**: Modeling real-time messaging pipelines with Kafka, Flink, and ScyllaDB.
- **Posting Optimization**: Calculating optimal hourly publication windows and content ratios.
- **Marketing Strategy**: Career progression benchmarks, salary telemetry, and agency vs in-house economics.

Click one of the suggested prompts below or ask any custom research question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'offline-knowledge',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'chat' | 'trends'>('chat');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const promptSuggestions = [
    "Explain TikTok's recommendation graph & candidate generation",
    "Calculate my best posting time for B2B tech SaaS",
    "Simulate Kafka to Cassandra write path in high-throughput chat",
    "Break down the 5:3:2 content rule and how to apply it",
    "Compare Cassandra vs ScyllaDB in social messaging storage",
    "What skills does a VP of Growth need to reach $300k+?",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputPrompt).trim();
    if (!prompt || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    const botMessageId = `assistant-${Date.now()}`;
    const initialBotMessage: Message = {
      id: botMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'gemini-live',
    };

    setMessages((prev) => [...prev, initialBotMessage]);

    const customKey = sessionStorage.getItem('socialsphere_custom_api_key') || localStorage.getItem('socialsphere_custom_api_key') || '';
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (customKey) {
      headers['x-gemini-api-key'] = customKey;
    }

    try {
      // First attempt streaming from server-side endpoint
      const response = await fetch('/api/gemini/stream', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          prompt,
          systemInstruction: `You are the Principal AI Research Scientist and Lead Systems Architect for SocialSphere. 
You provide deep, technically rigorous, highly structured, and empirical insights into global social media platforms, distributed streaming architectures (Kafka, Flink, ScyllaDB, Meta TAO), algorithmic candidate generation (DLRM, vector search HNSW), marketing frameworks (5:3:2 rule, 50/30/20 rule), and executive career telemetry.
Format with clean markdown, bullet points, and code/architecture snippets where relevant. Avoid generic filler.`,
          model: 'gemini-2.5-flash',
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';
      let streamFailed = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]' || dataStr === '{"done":true}') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                streamFailed = true;
                break;
              }
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((m) => (m.id === botMessageId ? { ...m, content: accumulated } : m))
                );
              }
            } catch {
              // ignore json parse splits
            }
          }
        }
        if (streamFailed) break;
      }

      if (!accumulated || streamFailed) {
        throw new Error('Streaming failed or returned empty payload.');
      }
    } catch (err) {
      console.warn('Live Gemini stream unavailable, invoking SocialSphere Knowledge Engine:', err);
      // Graceful offline fallback intelligence
      const offlineReply = getOfflineAiResponse(prompt);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                content: offlineReply,
                source: 'offline-knowledge',
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181329] to-[#120E1F] border border-purple-900/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
            <span>Conversational Intelligence & System Reverse-Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Targeting Gemini 2.5 Flash</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Gemini AI Research Copilot & Ecosystem Guide
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Query real-time algorithmic telemetry, simulate distributed message flows, calculate optimal posting intervals,
            and study emerging shifts such as GenAI creative proliferation and social search disruption.
          </p>

          {/* Sub-view switcher */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800/80">
            <button
              onClick={() => setActiveGuideTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeGuideTab === 'chat'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-[#0D0B14] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" /> Interactive Research Assistant
            </button>
            <button
              onClick={() => setActiveGuideTab('trends')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeGuideTab === 'trends'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40'
                  : 'bg-[#0D0B14] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> 2026 AI Social Ecosystem Guide
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE RESEARCH ASSISTANT CHAT */}
      {activeGuideTab === 'chat' && (
        <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
          {/* Chat Top Banner */}
          <div className="p-4 border-b border-zinc-800 bg-[#0D0B14] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-black font-bold">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="text-xs font-bold text-white font-display block">
                  SocialSphere Gemini Copilot
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Engine: gemini-2.5-flash · Grounded Telemetry
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenApiModal}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-amber-400 transition-colors cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>Engine Key</span>
              </button>
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset',
                      role: 'assistant',
                      content: 'Conversation history reset. How can I assist your social intelligence research?',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    },
                  ])
                }
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#0D0B14]/60">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs leading-relaxed ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 sm:p-5 relative group ${
                      isAssistant
                        ? 'bg-[#141021] border border-zinc-800/90 text-zinc-200'
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md shadow-purple-900/30'
                    }`}
                  >
                    {isAssistant && (
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60 text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1">
                          {msg.source === 'offline-knowledge' ? (
                            <span className="text-amber-400 font-semibold">SocialSphere Knowledge Engine</span>
                          ) : (
                            <span className="text-purple-300 font-semibold">Gemini 2.5 Flash Live</span>
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap font-sans text-xs sm:text-[13px]">
                      {msg.content}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800 flex items-center justify-center text-amber-400 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-xl bg-[#141021] border border-zinc-800 flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Synthesizing empirical research model...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2.5 bg-[#0D0B14] border-t border-zinc-800/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono text-zinc-400 shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Suggestions:
            </span>
            {promptSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="px-2.5 py-1 rounded-lg bg-[#141021] hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#141021] border-t border-zinc-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask about recommendation algorithms, Kafka latency, posting heatmaps, or career paths..."
                disabled={isLoading}
                className="flex-1 bg-[#0D0B14] border border-zinc-700/80 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputPrompt.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-md shadow-purple-900/30 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 2: AI SOCIAL ECOSYSTEM GUIDE */}
      {activeGuideTab === 'trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AI_ECOSYSTEM_TRENDS.map((trend) => (
              <div
                key={trend.id}
                className="p-6 rounded-2xl bg-[#141021] border border-zinc-800 space-y-4 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      {trend.timeframe}
                    </span>
                    <h3 className="text-base font-bold text-white font-display leading-snug">
                      {trend.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#0D0B14] border border-zinc-800 font-mono text-[10px] text-purple-300 shrink-0">
                    {trend.impactScore}
                  </span>
                </div>

                <p className="text-zinc-300 leading-relaxed">{trend.description}</p>

                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5 font-mono">
                    Underlying Structural Drivers:
                  </span>
                  <ul className="space-y-1.5 text-zinc-300">
                    {trend.keyDrivers.map((driver, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 block mb-1 font-mono">
                    Platform Manifestations:
                  </span>
                  <div className="space-y-1 text-zinc-400 font-mono text-[11px]">
                    {trend.platformExamples.map((ex, idx) => (
                      <div key={idx}>· {ex}</div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/50">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5 font-mono">
                    Recommended Strategic Action:
                  </span>
                  <p className="text-zinc-200 leading-relaxed">{trend.strategicAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
