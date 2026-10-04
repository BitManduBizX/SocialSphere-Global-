import React, { useState, useMemo, useEffect } from 'react';
import {
  ARCHITECTURE_LAYERS,
  ArchitectureLayer,
  PACKET_TRACER_STEPS,
  PacketStep,
} from '../data/systemsData';
import {
  Server,
  Activity,
  Layers,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Database,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';

export const DataSystemsLab: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>('layer-ingress');
  const [qpsSlider, setQpsSlider] = useState<number>(500000); // 500k QPS default
  const [isTracingPacket, setIsTracingPacket] = useState<boolean>(false);
  const [activePacketStep, setActivePacketStep] = useState<number>(0);

  const selectedLayer = useMemo(() => {
    return ARCHITECTURE_LAYERS.find((l) => l.id === selectedLayerId) || ARCHITECTURE_LAYERS[0];
  }, [selectedLayerId]);

  // Dynamic simulation calculations based on QPS
  const simulationTelemetry = useMemo(() => {
    const qpsK = qpsSlider / 1000;
    // P50 latency scales smoothly with QPS
    const p50 = Math.max(3.2, 4 + (qpsSlider / 1000000) * 1.8).toFixed(1);
    // P99 latency shows queuing effects at high QPS
    const p99 = Math.max(14, 15 + Math.pow(qpsSlider / 1000000, 1.4) * 4.5).toFixed(1);
    // Bandwidth in Gbps
    const ingressGbps = ((qpsSlider * 3.4 * 8) / 1000000).toFixed(1);
    // Cache Hit Ratio slightly drops under extreme load
    const cacheHit = Math.max(92.4, 99.1 - (qpsSlider / 10000000) * 4.2).toFixed(2);
    // Kafka partitions needed
    const partitions = Math.ceil(qpsSlider / 25000);
    // Daily storage generation in TB
    const dailyTb = ((qpsSlider * 2.8 * 86400) / (1024 * 1024 * 1024)).toFixed(1);

    return {
      p50,
      p99,
      ingressGbps,
      cacheHit,
      partitions,
      dailyTb,
      qpsFormatted: qpsSlider >= 1000000 ? `${(qpsSlider / 1000000).toFixed(2)}M` : `${(qpsSlider / 1000).toFixed(0)}k`,
    };
  }, [qpsSlider]);

  // Automated step-by-step packet tracer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTracingPacket) {
      if (activePacketStep < PACKET_TRACER_STEPS.length) {
        timer = setTimeout(() => {
          setActivePacketStep((prev) => prev + 1);
        }, 1200);
      } else {
        setIsTracingPacket(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isTracingPacket, activePacketStep]);

  const startPacketTrace = () => {
    setActivePacketStep(1);
    setIsTracingPacket(true);
  };

  const resetPacketTrace = () => {
    setIsTracingPacket(false);
    setActivePacketStep(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181329] to-[#120E1F] border border-purple-900/40 p-6 sm:p-8">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono uppercase tracking-wider mb-2">
            <span>Petabyte-Scale Engineering Laboratory</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time High-Throughput Topology</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
            Distributed Social Systems Architecture
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            Explore how modern social platforms ingest 100M+ requests per second, stream immutable logs via Apache Kafka,
            persist social graphs in Meta TAO, eliminate JVM garbage-collection pauses with ScyllaDB, and run real-time
            vector candidate generation in under 45 milliseconds.
          </p>
        </div>
      </div>

      {/* SECTION 1: ARCHITECTURE TOPOLOGY DIAGRAM */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              01. End-to-End System Pipeline Topology
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Click any stage below to inspect its data contract, tech stack, and real-world production case study
            </p>
          </div>
          <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-800/50 self-start sm:self-auto">
            5 Critical Architectural Tiers
          </span>
        </div>

        {/* Visual Pipeline Stages Strip */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {ARCHITECTURE_LAYERS.map((layer, idx) => {
            const isSelected = selectedLayerId === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/40 border-amber-400/80 shadow-lg shadow-purple-900/30 ring-1 ring-amber-400/50'
                    : 'bg-[#0D0B14] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400">
                      TIER 0{layer.order}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      {layer.category}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 font-display leading-snug">
                    {layer.name.replace(/^\d+\.\s*/, '')}
                  </h3>
                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {layer.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">SLA:</span>
                  <span className="text-emerald-400 font-medium">{layer.latencySLA.split('/')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer In-Depth Inspection Card */}
        <div className="mt-6 p-6 rounded-2xl bg-[#0D0B14] border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Deep Architecture Analysis
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-xs text-purple-300 font-mono">{selectedLayer.category} Layer</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {selectedLayer.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                {selectedLayer.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs shrink-0 bg-[#141021] p-3 rounded-xl border border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-400 block font-sans">Throughput Target:</span>
                <span className="text-amber-300 font-bold">{selectedLayer.throughputTarget}</span>
              </div>
              <div className="border-l border-zinc-700 pl-3">
                <span className="text-[10px] text-zinc-400 block font-sans">Strict SLA:</span>
                <span className="text-emerald-400 font-bold">{selectedLayer.latencySLA}</span>
              </div>
            </div>
          </div>

          {/* Description & Technical Deep-Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> Core Architectural Role
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedLayer.coreRole}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-400" /> Deep-Dive Implementation Mechanics
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {selectedLayer.deepDive}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-400 mb-2">Core Technology Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLayer.keyTechnologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Production Case Study Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-[#181329] to-[#120E1F] border border-purple-900/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> High-Scale Production Case Study
                  </span>
                  <span className="text-xs font-bold text-white font-display">
                    {selectedLayer.caseStudy.company}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[11px] text-zinc-400 font-semibold block">The Scaling Bottleneck:</span>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed">{selectedLayer.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-purple-300 font-semibold block">Architectural Solution:</span>
                    <p className="text-zinc-300 mt-0.5 leading-relaxed">{selectedLayer.caseStudy.solution}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-emerald-400 font-semibold block">Measurable Business Outcome:</span>
                    <p className="text-emerald-300/90 font-medium mt-0.5 leading-relaxed">
                      {selectedLayer.caseStudy.outcome}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Active Nodes</span>
                  <span className="text-white font-bold">{selectedLayer.metricsSimulated.activeConnections.split(' ')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Bandwidth / Day</span>
                  <span className="text-amber-400 font-bold">{selectedLayer.metricsSimulated.dataRate.split(' ')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block font-sans">Error Rate</span>
                  <span className="text-emerald-400 font-bold">{selectedLayer.metricsSimulated.errorRate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE LIVE TRAFFIC LOAD SIMULATOR */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              02. Distributed System Traffic Simulator
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Simulate traffic bursts from 10k QPS to 10M QPS and observe downstream queuing, latency drift, and partition scale
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQpsSlider(100000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                qpsSlider === 100000 ? 'bg-purple-600 text-white font-bold' : 'bg-[#0D0B14] text-zinc-400 hover:text-white'
              }`}
            >
              100k QPS
            </button>
            <button
              onClick={() => setQpsSlider(1000000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                qpsSlider === 1000000 ? 'bg-purple-600 text-white font-bold' : 'bg-[#0D0B14] text-zinc-400 hover:text-white'
              }`}
            >
              1M QPS
            </button>
            <button
              onClick={() => setQpsSlider(5000000)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                qpsSlider === 5000000 ? 'bg-purple-600 text-white font-bold' : 'bg-[#0D0B14] text-zinc-400 hover:text-white'
              }`}
            >
              5M QPS
            </button>
          </div>
        </div>

        {/* Traffic Slider Control */}
        <div className="p-6 rounded-2xl bg-[#0D0B14] border border-zinc-800 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-300">
              Ingress Traffic Load: <span className="text-amber-400 font-bold font-mono text-base ml-1 tabular-nums">{simulationTelemetry.qpsFormatted} QPS</span>
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Range: 10,000 to 10,000,000 QPS
            </span>
          </div>

          <input
            type="range"
            min={10000}
            max={10000000}
            step={50000}
            value={qpsSlider}
            onChange={(e) => setQpsSlider(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />

          <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-2">
            <span>10k QPS (Calm)</span>
            <span>1M QPS (Standard Meta/TikTok)</span>
            <span>5M QPS (Super Bowl Event)</span>
            <span>10M QPS (Global Peak)</span>
          </div>
        </div>

        {/* Simulated Telemetry Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Edge Bandwidth</span>
            <span className="text-base font-bold text-white tabular-nums">{simulationTelemetry.ingressGbps}</span>
            <span className="text-[10px] text-zinc-400 block">Gbps Wire</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">P50 Latency</span>
            <span className="text-base font-bold text-emerald-400 tabular-nums">{simulationTelemetry.p50} ms</span>
            <span className="text-[10px] text-zinc-400 block">Median Response</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">P99 Latency</span>
            <span className={`text-base font-bold tabular-nums ${parseFloat(simulationTelemetry.p99) > 35 ? 'text-amber-400' : 'text-purple-300'}`}>
              {simulationTelemetry.p99} ms
            </span>
            <span className="text-[10px] text-zinc-400 block">Tail SLA</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Redis Cache Hit</span>
            <span className="text-base font-bold text-amber-300 tabular-nums">{simulationTelemetry.cacheHit}%</span>
            <span className="text-[10px] text-zinc-400 block">Memory Tier</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Kafka Partitions</span>
            <span className="text-base font-bold text-white tabular-nums">{simulationTelemetry.partitions}</span>
            <span className="text-[10px] text-zinc-400 block">Active Topics</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0D0B14] border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block font-sans">Daily Ingestion</span>
            <span className="text-base font-bold text-emerald-400 tabular-nums">{simulationTelemetry.dailyTb}</span>
            <span className="text-[10px] text-zinc-400 block">Terabytes / Day</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: ANIMATED DATA PACKET TRACER */}
      <div className="bg-[#141021] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              03. Real-Time Event Packet Tracer
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Trace how a single user event (&ldquo;Publishing 4K Video Reel with Audio Tag&rdquo;) traverses the entire infrastructure stack in &lt;100ms
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isTracingPacket && activePacketStep === 0 && (
              <button
                onClick={startPacketTrace}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" /> Start Packet Simulation
              </button>
            )}

            {isTracingPacket && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-amber-300 bg-amber-950/40 border border-amber-800/60">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Simulating Step {activePacketStep} of {PACKET_TRACER_STEPS.length}...
              </div>
            )}

            {activePacketStep > 0 && !isTracingPacket && (
              <button
                onClick={resetPacketTrace}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Tracer
              </button>
            )}
          </div>
        </div>

        {/* Step-by-Step Traversal Timeline */}
        <div className="space-y-3">
          {PACKET_TRACER_STEPS.map((step) => {
            const isCompleted = activePacketStep >= step.step;
            const isCurrent = activePacketStep === step.step;

            return (
              <div
                key={step.step}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-purple-950/40 border-amber-400 shadow-md shadow-amber-950/30 ring-1 ring-amber-400/40'
                    : isCompleted
                    ? 'bg-[#0D0B14] border-purple-900/40 text-zinc-300'
                    : 'bg-[#0D0B14]/40 border-zinc-800/40 opacity-40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-amber-400 text-black animate-pulse'
                          : isCompleted
                          ? 'bg-purple-600 text-white'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `0${step.step}`}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-display">
                          {step.stage}
                        </span>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span className="text-[11px] font-mono text-purple-300">{step.component}</span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0 font-mono text-xs">
                    <span className="text-amber-400 font-bold tabular-nums">+{step.durationMs}ms</span>
                    <span className="text-[10px] text-zinc-400 block font-mono line-clamp-1">{step.payloadInfo}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activePacketStep === PACKET_TRACER_STEPS.length && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex items-center justify-between text-xs font-mono text-emerald-300">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Event End-to-End Fan-Out Completed!
            </span>
            <span>Total End-to-End Latency: 88ms (P99 Compliant)</span>
          </div>
        )}
      </div>
    </div>
  );
};
