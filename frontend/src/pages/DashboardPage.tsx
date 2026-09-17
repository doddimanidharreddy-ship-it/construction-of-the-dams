import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  HardHat,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BrainCircuit,
  ArrowUpRight,
  RefreshCw,
  Activity,
  Zap,
  Radio,
  Sliders,
  Compass
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskGauge } from '../components/common/RiskGauge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { Project, AlertItem } from '../types';

// Datasets
const budgetVSActualData = [
  { name: 'NH-44 Highway', budget: 45, spent: 29.8 },
  { name: 'Mumbai Metro', budget: 82, spent: 41.2 },
  { name: 'Bangalore Sub', budget: 28, spent: 16.4 },
  { name: 'Coastal Bridge', budget: 34, spent: 29.1 },
  { name: 'Solar Plant II', budget: 110, spent: 67.5 },
];

const scheduleVarianceTrend = [
  { week: 'Wk 1', planned: 20, actual: 21 },
  { week: 'Wk 2', planned: 35, actual: 34 },
  { week: 'Wk 3', planned: 50, actual: 46 },
  { week: 'Wk 4', planned: 65, actual: 59 },
  { week: 'Wk 5', planned: 80, actual: 72 },
  { week: 'Wk 6', planned: 95, actual: 88 },
];

const safetyViolationsBySeverity = [
  { name: 'Low', count: 14, color: '#10b981' },
  { name: 'Medium', count: 8, color: '#f59e0b' },
  { name: 'High', count: 5, color: '#f43f5e' },
  { name: 'Critical', count: 2, color: '#e11d48' },
];

const workerUtilizationData = [
  { site: 'NH-44 Highway', rate: 94 },
  { site: 'Mumbai Metro', rate: 82 },
  { site: 'Bangalore Sub', rate: 64 },
  { site: 'Coastal Bridge', rate: 96 },
  { site: 'Solar Plant II', rate: 88 },
];

const equipmentStatusDist = [
  { name: 'Operational', value: 72, color: '#06b6d4' },
  { name: 'Maintenance', value: 18, color: '#f59e0b' },
  { name: 'Faulty', value: 10, color: '#f43f5e' },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [pData, aData] = await Promise.all([api.getProjects(), api.getAlerts()]);
    setProjects(pData);
    setAlerts(aData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner label="Loading Executive Cyber Control HUD..." />;

  const criticalProjects = projects.filter((p) => p.status === 'At Risk' || p.status === 'Delayed');

  return (
    <div className="space-y-8 animate-fadeIn pb-8">
      {/* 🚀 NEW FUTURISTIC HUD CONTROL CENTER HEADER */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-glow-cyan">
                <BrainCircuit className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    BuildVision AI — Executive Cyber Command HUD
                  </h1>
                  <span className="flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    <Radio className="w-3 h-3 animate-ping" />
                    LIVE TELEMETRY
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time neural monitoring across 5 mega infrastructure sites, 12,400 HP heavy fleet, & 870 workforce crew.
                </p>
              </div>
            </div>
          </div>

          {/* Quick HUD Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/site-map')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 hover:border-cyan-500/50 transition shadow-lg"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>GIS Satellite Map</span>
            </button>
            <button
              onClick={() => navigate('/predictions')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-glow-cyan transition"
            >
              <Zap className="w-4 h-4" />
              <span>AI Delay Forecast</span>
            </button>
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              title="Sync AI Telematics"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HUD AI PREDICTIVE INTELLIGENCE BANNER */}
        <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-extrabold text-cyan-300 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <span>Predictive Early Warning Dispatch</span>
              <span className="text-[10px] text-amber-400 font-normal">• 78% Probability Confidence</span>
            </div>
            <p className="text-slate-300 mt-1 leading-relaxed font-medium">
              <strong className="text-white">Highway Expansion NH-44</strong> is experiencing sub-grade soil saturation near Km 14.2. AI suggests redirecting 2 Earth Compactors & activating sub-surface drainage pumps before rain forecasts hit.
            </p>
          </div>
          <button
            onClick={() => navigate('/assistant')}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-bold text-xs border border-cyan-500/40 transition"
          >
            Ask AI Decision Assistant →
          </button>
        </div>
      </div>

      {/* 📊 NEW GLOW KPI CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Active Projects Portfolio"
          value={`${projects.length} Mega Projects`}
          change="+1 In Progress"
          isPositive={true}
          icon={Building2}
          color="cyan"
          subtitle="All 5 Sites Active"
        />
        <MetricCard
          title="Active Site Workforce"
          value="870 Workers"
          change="91.4% Attendance Rate"
          isPositive={true}
          icon={Users}
          color="blue"
          subtitle="Excel & QR Sync Active"
        />
        <MetricCard
          title="Machine Power Operating"
          value="12,400 HP"
          change="14,850 HP Total Fleet"
          isPositive={true}
          icon={Activity}
          color="emerald"
          subtitle="83.5% Fleet Efficiency"
        />
        <MetricCard
          title="Portfolio Safety Score"
          value="94.2 / 100"
          change="YOLO Real-Time Guard"
          isPositive={true}
          icon={ShieldCheck}
          color="purple"
          subtitle="3 Incidents Flagged"
        />
      </div>

      {/* 📈 6 NEW FUTURISTIC RECHARTS VISUALIZATIONS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual 1: Budget Total vs Spent */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Budget vs Actual Spend ($M)
            </h3>
            <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-0.5 rounded-full">Financial</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetVSActualData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 9 }} interval={0} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="budget" name="Total Budget ($M)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Spent to Date ($M)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 2: Schedule Variance Trend */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Planned vs Actual Progress %
            </h3>
            <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full">S-Curve</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scheduleVarianceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="planned" stroke="#10b981" fillOpacity={0.2} fill="#10b981" name="Planned %" />
                <Area type="monotone" dataKey="actual" stroke="#f59e0b" fillOpacity={0.2} fill="#f59e0b" name="Actual %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 3: Heavy Equipment Health */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Heavy Machinery Fleet Health
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">131 Fleet</span>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={equipmentStatusDist}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {equipmentStatusDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 4: Manpower Rate by Site */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              Workforce Shift Utilization (%)
            </h3>
            <span className="text-[10px] text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded-full">Attendance</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workerUtilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="site" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Utilization Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 5: YOLO Safety Incidents */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              YOLO Vision Incidents Flagged
            </h3>
            <span className="text-[10px] text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full">YOLOv8</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={safetyViolationsBySeverity} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d1322', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Bar dataKey="count" fill="#f43f5e" radius={[0, 4, 4, 0]} name="Incidents Flagged" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visual 6: Overall Portfolio Risk Gauge */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Composite AI Portfolio Risk Score
            </h3>
            <button
              onClick={() => navigate('/risk-analysis')}
              className="text-[10px] text-cyan-400 font-bold hover:underline"
            >
              Risk Matrix →
            </button>
          </div>
          <div className="py-2">
            <RiskGauge score={34.5} title="Low Operational Risk" size="lg" />
          </div>
          <div className="text-[11px] text-slate-400 text-center font-medium">
            Risk mitigated by real-time GPS telemetry & predictive material re-orders.
          </div>
        </div>
      </div>

      {/* 🏗️ CRITICAL PROJECTS & RECENT RISK ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Projects List */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              Active Construction Sites Portfolio
            </h3>
            <button
              onClick={() => navigate('/projects')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              All Projects ({projects.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-white group-hover:text-cyan-300 transition">{project.name}</span>
                    <StatusBadge status={project.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Progress: <strong className="text-slate-200">{project.progress}%</strong> • Safety Score: <strong className="text-emerald-400">{project.safetyScore}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold text-cyan-400">{project.riskScore} Risk Score</div>
                    <div className="text-[10px] text-slate-500">{project.activeWorkers} workers on site</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts feed */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Live AI Telematics Alert Center
            </h3>
            <button
              onClick={() => navigate('/alerts')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
            >
              Alert Center →
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5 hover:border-amber-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{alert.title}</span>
                  <StatusBadge status={alert.priority} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{alert.message}</p>
                <div className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1">
                  <span>AI Guidance:</span> {alert.actionGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

