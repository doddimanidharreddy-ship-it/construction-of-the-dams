import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
  Users,
  HardHat,
  Package,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskGauge } from '../components/common/RiskGauge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { Project, Equipment, ResourceItem } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [resourceList, setResourceList] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const projData = await api.getProjectById(id || 'proj-1');
      const eqData = await api.getEquipment();
      const resData = await api.getResources();
      setProject(projData || null);
      setEquipmentList(eqData.filter((e) => e.projectId === id || e.projectId === 'proj-1'));
      setResourceList(resData.filter((r) => r.projectId === id || r.projectId === 'proj-1'));
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) return <LoadingSpinner label="Loading Project Detailed Telematics..." />;
  if (!project) return <div className="text-center p-12 text-slate-400">Project record not found.</div>;

  const milestones = [
    { title: 'Site Excavation & Deep Foundation Work', date: '2025-05-15', status: 'Completed' },
    { title: 'Sub-Level Substructure & Concrete Slab', date: '2025-09-30', status: 'Completed' },
    { title: 'Steel Frame Superstructure Floor 1-20', date: '2026-03-20', status: 'In Progress' },
    { title: 'Smart Glass Facade Enclosure & Roofing', date: '2026-07-15', status: 'Upcoming' },
    { title: 'MEP Electrical & HVAC Fitout', date: '2026-10-30', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Back Button & Header */}
      <div>
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Portfolio</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-glow-cyan">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white">{project.name}</h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Code: <strong className="text-slate-200">{project.code}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {project.location}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/predictions`)}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-glow-cyan hover:bg-cyan-400 transition"
          >
            Run AI Risk Simulation →
          </button>
        </div>
      </div>

      {/* Top Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Stats & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Completion Progress & Financials
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">Total Schedule Completion</span>
                <span className="text-cyan-400 font-extrabold text-sm">{project.progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${project.progress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-glow-cyan"
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Total Budget</div>
                <div className="text-base font-bold text-white mt-0.5">${(project.budgetTotal / 1000000).toFixed(1)}M</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Spent to Date</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">${(project.budgetSpent / 1000000).toFixed(1)}M</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Active Workforce</div>
                <div className="text-base font-bold text-blue-400 mt-0.5">{project.activeWorkers} Workers</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Active Machinery</div>
                <div className="text-base font-bold text-purple-400 mt-0.5">{project.activeEquipment} Units</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 mb-1">Structural Overview</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{project.description}</p>
            </div>
          </div>

          {/* Milestones Timeline */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Project Milestones Timeline
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-8">
                  <div
                    className={`absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold ${
                      m.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : m.status === 'In Progress'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {m.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">{m.title}</div>
                      <div className="text-[10px] text-slate-400">Target Date: {m.date}</div>
                    </div>
                    <StatusBadge status={m.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Risk Gauges & Equipment/Resource Quick View */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Project Risk Gauge
            </h3>
            <RiskGauge score={project.riskScore} title="Risk Matrix Index" size="lg" />
            <div className="pt-2 border-t border-slate-800 flex justify-around text-xs">
              <div>
                <div className="text-slate-400 text-[10px]">Safety Rating</div>
                <div className="text-emerald-400 font-extrabold">{project.safetyScore} / 100</div>
              </div>
              <div>
                <div className="text-slate-400 text-[10px]">Delay Index</div>
                <div className="text-rose-400 font-extrabold">{project.riskScore > 50 ? 'High' : 'Low'}</div>
              </div>
            </div>
          </div>

          {/* Connected Equipment */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Active Site Machinery</span>
              <HardHat className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-2">
              {equipmentList.map((eq) => (
                <div key={eq.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{eq.name}</div>
                    <div className="text-[10px] text-slate-400">{eq.type} • {eq.operatingHoursToday}h today</div>
                  </div>
                  <StatusBadge status={eq.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Connected Resources */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Material Inventory</span>
              <Package className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="space-y-2">
              {resourceList.map((res) => (
                <div key={res.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{res.name}</div>
                    <div className="text-[10px] text-slate-400">Stock: {res.currentStock} {res.unit}</div>
                  </div>
                  <StatusBadge status={res.status} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
