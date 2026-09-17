import React, { useEffect, useState } from 'react';
import { ShieldCheck, Upload, Play, AlertTriangle, Eye, RefreshCw, CheckCircle2, FileImage } from 'lucide-react';
import { DetectionCanvas } from '../components/safety/DetectionCanvas';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { SafetyViolation } from '../types';

export const SafetyVisionPage: React.FC = () => {
  const [violations, setViolations] = useState<SafetyViolation[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeFrame, setActiveFrame] = useState<{ url: string; bboxes: any[] }>({
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    bboxes: [{ x: 35, y: 20, w: 25, h: 45, label: 'No Helmet detected (96.4%)' }]
  });

  const loadViolations = async () => {
    setLoading(true);
    const data = await api.getSafetyViolations();
    setViolations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadViolations();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    const result = await api.analyzeSafetyImage(file);
    setActiveFrame({
      url: result.snapshotUrl || URL.createObjectURL(file),
      bboxes: result.bbox || []
    });
    setViolations([result, ...violations]);
    setAnalyzing(false);
  };

  const selectDemoFrame = (url: string, bboxes: any[]) => {
    setActiveFrame({ url, bboxes });
  };

  if (loading) return <LoadingSpinner label="Initializing YOLOv8 Safety Neural Model..." />;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            YOLO Computer Vision Safety Monitoring
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
              YOLOv8 Real-Time
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated PPE detection (Hard Hats & High-Vis Vests), restricted zone monitoring, and safety risk scoring.
          </p>
        </div>

        {/* Image Upload Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-glow-cyan cursor-pointer hover:bg-cyan-400 transition">
          <Upload className="w-4 h-4" />
          <span>Upload CCTV Inspection Image</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Overall Safety Compliance Score"
          value="91.8 / 100"
          change="OSHA Standard Pass"
          isPositive={true}
          icon={ShieldCheck}
          color="emerald"
        />
        <MetricCard
          title="Detected Violations Today"
          value={`${violations.length} Incidents`}
          change="3 High Severity"
          isPositive={false}
          icon={AlertTriangle}
          color="rose"
        />
        <MetricCard
          title="YOLO Inference Latency"
          value="34 ms / frame"
          change="29.8 FPS stream"
          isPositive={true}
          icon={Eye}
          color="cyan"
        />
        <MetricCard
          title="Active Vision Channels"
          value="18 Cameras"
          change="4 Sites Covered"
          isPositive={true}
          icon={Play}
          color="blue"
        />
      </div>

      {/* Main Vision Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Frame Canvas & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                Live Inspection Canvas (YOLOv8 Detection Overlays)
              </h3>
              {analyzing && <span className="text-xs text-cyan-400 font-semibold animate-pulse">Running Neural Inference...</span>}
            </div>

            {/* Canvas */}
            <DetectionCanvas imageUrl={activeFrame.url} bboxes={activeFrame.bboxes} />

            {/* Preset Demo Feeds */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Select Demo CCTV Video Feed
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    selectDemoFrame('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', [
                      { x: 35, y: 20, w: 25, h: 45, label: 'No Helmet (96.4%)' }
                    ])
                  }
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition text-xs"
                >
                  <div className="font-bold text-white">Harbor Pier 4</div>
                  <div className="text-[10px] text-rose-400">1 Missing Helmet</div>
                </button>
                <button
                  onClick={() =>
                    selectDemoFrame('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', [
                      { x: 50, y: 30, w: 20, h: 50, label: 'No Hi-Vis Vest (91.2%)' }
                    ])
                  }
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition text-xs"
                >
                  <div className="font-bold text-white">GreenValley Zone B</div>
                  <div className="text-[10px] text-amber-400">1 Missing Vest</div>
                </button>
                <button
                  onClick={() =>
                    selectDemoFrame('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80', [
                      { x: 20, y: 40, w: 60, h: 50, label: 'PPE Fully Compliant (99.1%)' }
                    ])
                  }
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left transition text-xs"
                >
                  <div className="font-bold text-white">Skyline Tower Deck</div>
                  <div className="text-[10px] text-emerald-400">100% Compliant</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Logged Safety Violations */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Safety Violation Audit Log
            </h3>
            <span className="text-[10px] text-rose-400 font-semibold">{violations.length} Flagged</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {violations.map((v) => (
              <div key={v.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400">{v.violationType}</span>
                  <StatusBadge status={v.severity} size="sm" />
                </div>
                <div className="text-[11px] text-slate-300 font-medium">{v.projectName} — {v.zone}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Confidence: <strong className="text-cyan-400">{v.confidence}%</strong></span>
                  <span>{v.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
