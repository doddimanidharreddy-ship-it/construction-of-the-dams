import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Camera,
  Upload,
  Share2,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';

const sCurveData = [
  { month: 'Jan', planned: 5, actual: 5 },
  { month: 'Feb', planned: 12, actual: 11 },
  { month: 'Mar', planned: 22, actual: 20 },
  { month: 'Apr', planned: 35, actual: 32 },
  { month: 'May', planned: 48, actual: 42 },
  { month: 'Jun', planned: 62, actual: 54 },
  { month: 'Jul', planned: 75, actual: 68 },
  { month: 'Aug (Est)', planned: 88, actual: 78 },
  { month: 'Sep (Est)', planned: 100, actual: 92 },
];

const milestoneData = [
  { name: 'Skyline Cyber Tower', planned: 70, actual: 68, variance: '-2%' },
  { name: 'Harbor Gateway Bridge', planned: 55, actual: 42, variance: '-13%' },
  { name: 'GreenValley Eco-Res', planned: 45, actual: 31, variance: '-14%' },
  { name: 'Apex Industrial Hub', planned: 85, actual: 88, variance: '+3%' },
  { name: 'Central Metro Station', planned: 60, actual: 54, variance: '-6%' },
];

export const ProgressPage: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState('All Sites Portfolio');

  // Photo Analyzer State
  const [analyzing, setAnalyzing] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);
  const [photoAnalysis, setPhotoAnalysis] = useState({
    title: 'Harbor Pier 4 — Substructure Rebar Mesh',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    progressPct: 82.4,
    detectedStage: 'Rebar Placement & Formwork Alignment',
    elementsFound: ['High-Grade Steel Rebar (82.4%)', 'Timber Formwork (94.0%)', 'Scaffolding Supports (88.1%)'],
    anomalies: 'Zero structural defects detected. Spacing within ±3mm OSHA tolerances.',
    completionEst: 'Target Finish: Oct 14, 2026 (On Schedule)'
  });

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(label);
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  const handleCopyImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopiedStatus('Photo Image Copied to Clipboard!');
    } catch (err) {
      navigator.clipboard.writeText(url);
      setCopiedStatus('Photo Link Copied to Clipboard!');
    }
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  const runAISimulation = (customUrl?: string, customTitle?: string) => {
    setAnalyzing(true);
    const targetUrl = customUrl || photoAnalysis.imageUrl;
    const targetTitle = customTitle || photoAnalysis.title;

    setTimeout(() => {
      // Dynamic AI simulation calculations based on photo
      const randomProgress = (65 + Math.random() * 25).toFixed(1);
      const stages = [
        'Foundation Pier Concrete Pouring',
        'Superstructure Rebar Mesh & Formwork',
        'Slab Casting & Curing Monitoring',
        'Structural Steel Beam Assembly'
      ];
      const selectedStage = stages[Math.floor(Math.random() * stages.length)];

      setPhotoAnalysis({
        title: targetTitle,
        imageUrl: targetUrl,
        progressPct: parseFloat(randomProgress),
        detectedStage: selectedStage,
        elementsFound: [
          `High-Strength Steel Rebar (${randomProgress}%)`,
          'Heavy Formwork Alignment (92.4%)',
          'Load-Bearing Scaffolding (86.0%)',
          'Vibrated Concrete Density (98.2%)'
        ],
        anomalies: Math.random() > 0.5 
          ? 'Zero structural defects detected. Rebar spacing within ±2mm OSHA tolerances.'
          : '1 Surface micro-fissure detected on North Span Column (Non-structural).',
        completionEst: `Target Completion: ${Math.floor(Math.random() * 10 + 2)} Days Ahead of Schedule`
      });
      setAnalyzing(false);
    }, 1500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    runAISimulation(localUrl, `Uploaded Inspection — ${file.name}`);
  };

  const formattedReportSummary = `🏗️ BUILDVISION AI — SITE PROGRESS PHOTO ANALYSIS REPORT
--------------------------------------------------
Project: ${photoAnalysis.title}
Stage: ${photoAnalysis.detectedStage}
Measured Progress: ${photoAnalysis.progressPct}%
Detected Structural Elements: ${photoAnalysis.elementsFound.join(', ')}
Quality Anomaly Scan: ${photoAnalysis.anomalies}
Timeline Forecast: ${photoAnalysis.completionEst}
Generated via BuildVision AI Telematics Engine`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Progress & Milestone Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            S-Curve schedule variance analysis, planned vs actual milestone performance, and AI Site Progress Photo Analysis.
          </p>
        </div>

        <select
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
        >
          <option>All Sites Portfolio</option>
          <option>Skyline Cyber Tower A</option>
          <option>Harbor Gateway Bridge</option>
          <option>GreenValley Eco-Residences</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Overall Portfolio Progress"
          value="56.6%"
          change="-4.2% vs Plan"
          isPositive={false}
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          title="Completed Milestones"
          value="24 / 42"
          change="57% Achieved"
          isPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          title="Critical Delay Variance"
          value="-14 Days"
          change="GreenValley Site"
          isPositive={false}
          icon={Clock}
          color="rose"
        />
        <MetricCard
          title="Schedule Performance Index (SPI)"
          value="0.91"
          change="SPI < 1.0 (Trailing)"
          isPositive={false}
          icon={AlertTriangle}
          color="amber"
        />
      </div>

      {/* Toast Notification for Copied Action */}
      {copiedStatus && (
        <div className="p-3.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 animate-bounce shadow-glow-cyan">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{copiedStatus}</span>
        </div>
      )}

      {/* 📸 AI SITE PROGRESS PHOTO ANALYZER MODULE */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h2 className="text-lg font-extrabold text-white tracking-tight">
                AI Site Progress Photo Analyzer
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 uppercase">
                Neural Vision v4
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Upload daily construction site photos to run AI computer vision simulations, measure progress %, and copy visual reports.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-glow-cyan cursor-pointer transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Site Photo</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>

            {/* Run AI Simulator Button */}
            <button
              onClick={() => runAISimulation()}
              disabled={analyzing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg transition border border-indigo-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              <span>{analyzing ? 'Analyzing Photo...' : '▶️ Run AI Simulator Scan'}</span>
            </button>

            {/* Photo Copy Button */}
            <button
              onClick={() => handleCopyImage(photoAnalysis.imageUrl)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
              title="Copy photo image to clipboard"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>Copy Photo</span>
            </button>

            {/* Copy Report Summary */}
            <button
              onClick={() => handleCopyText(formattedReportSummary, 'Report Summary Copied to Clipboard!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
              title="Copy formatted text report"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copy Report Summary</span>
            </button>

            {/* Copy Image URL */}
            <button
              onClick={() => handleCopyText(photoAnalysis.imageUrl, 'Photo URL Copied!')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
            >
              <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Photo URL</span>
            </button>
          </div>
        </div>

        {/* Preset Photo Selection Buttons */}
        <div className="flex items-center gap-2 pt-1 pb-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Sample Photo Presets:
          </span>
          <button
            onClick={() => runAISimulation('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', 'Harbor Pier 4 — Substructure Rebar')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-[11px] font-bold transition"
          >
            🏗️ Substructure Rebar Mesh
          </button>
          <button
            onClick={() => runAISimulation('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', 'Skyline Tower — Slab Casting')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-[11px] font-bold transition"
          >
            🏢 Concrete Slab Casting
          </button>
          <button
            onClick={() => runAISimulation('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', 'GreenValley Zone — Pier Column')}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-[11px] font-bold transition"
          >
            🌉 Column Formwork & Curing
          </button>
        </div>

        {/* Photo Display & AI Telematics Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Photo Preview Container (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
            {analyzing ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xs text-cyan-300 font-semibold">Scanning Structural Geometry...</div>
              </div>
            ) : (
              <>
                <img
                  src={photoAnalysis.imageUrl}
                  alt="Site Progress Scan"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700 backdrop-blur-md">
                    📷 {photoAnalysis.title}
                  </span>
                  <button
                    onClick={() => handleCopyImage(photoAnalysis.imageUrl)}
                    className="p-1.5 rounded-lg bg-cyan-500/80 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-glow-cyan"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
              </>
            )}
          </div>

          {/* AI Telematics Breakdown (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Detected Construction Stage</span>
                <h3 className="text-base font-extrabold text-white">{photoAnalysis.detectedStage}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-cyan-400 tracking-tight">{photoAnalysis.progressPct}%</span>
                <div className="text-[10px] text-emerald-400 font-semibold">Measured Stage Completion</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-3 p-0.5 border border-slate-800">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-2 rounded-full transition-all duration-700 shadow-glow-cyan"
                style={{ width: `${photoAnalysis.progressPct}%` }}
              ></div>
            </div>

            {/* Detected Elements Grid */}
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Detected Structural Components & Materials
              </div>
              <div className="flex flex-wrap gap-2">
                {photoAnalysis.elementsFound.map((elem, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    {elem}
                  </span>
                ))}
              </div>
            </div>

            {/* Anomaly & Completion Forecast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Structural Anomaly Scan
                </div>
                <div className="text-slate-300 text-[11px]">{photoAnalysis.anomalies}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <div className="font-bold text-emerald-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Milestone Forecast
                </div>
                <div className="text-slate-300 text-[11px]">{photoAnalysis.completionEst}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Overall Portfolio Progress"
          value="56.6%"
          change="-4.2% vs Plan"
          isPositive={false}
          icon={TrendingUp}
          color="cyan"
        />
        <MetricCard
          title="Completed Milestones"
          value="24 / 42"
          change="57% Achieved"
          isPositive={true}
          icon={CheckCircle2}
          color="emerald"
        />
        <MetricCard
          title="Critical Delay Variance"
          value="-14 Days"
          change="GreenValley Site"
          isPositive={false}
          icon={Clock}
          color="rose"
        />
        <MetricCard
          title="Schedule Performance Index (SPI)"
          value="0.91"
          change="SPI < 1.0 (Trailing)"
          isPositive={false}
          icon={AlertTriangle}
          color="amber"
        />
      </div>

      {/* S-Curve Chart (Planned vs Actual) */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Cumulative Progress S-Curve Baseline
            </h3>
            <p className="text-[11px] text-slate-400">Planned Target Progress vs Actual Site Telematics</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            SPI: 0.91
          </span>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sCurveData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
              />
              <Line type="monotone" dataKey="planned" stroke="#06b6d4" strokeWidth={3} name="Planned Target %" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="actual" stroke="#f59e0b" strokeWidth={3} name="Actual Telematics %" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Variance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Site Milestone Variance Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={milestoneData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} interval={0} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="planned" fill="#06b6d4" name="Planned %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milestone Log Table */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Current Active Milestone Log
          </h3>
          <div className="space-y-3">
            {milestoneData.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{m.name}</div>
                  <div className="text-[10px] text-slate-400">Planned: {m.planned}% • Actual: {m.actual}%</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${m.variance.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {m.variance} Variance
                  </div>
                  <StatusBadge status={m.actual >= m.planned ? 'On Schedule' : 'Delayed'} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
