import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Users,
  HardHat,
  Package,
  ShieldCheck,
  BrainCircuit,
  Gauge,
  Bell,
  MapPin,
  MessageSquare,
  FileSpreadsheet,
  Settings,
  Zap
} from 'lucide-react';

export const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/projects', label: 'Projects', icon: Building2 },
  { path: '/progress', label: 'Progress Tracking', icon: TrendingUp },
  { path: '/manpower', label: 'Manpower', icon: Users },
  { path: '/equipment', label: 'Equipment', icon: HardHat },
  { path: '/resources', label: 'Resources & Stock', icon: Package },
  { path: '/safety-vision', label: 'YOLO Safety Vision', icon: ShieldCheck, badge: 'YOLOv8' },
  { path: '/predictions', label: 'AI Delay Prediction', icon: BrainCircuit, badge: 'AI' },
  { path: '/risk-analysis', label: 'Risk Score Matrix', icon: Gauge },
  { path: '/alerts', label: 'Alert Center', icon: Bell },
  { path: '/site-map', label: 'Site Map', icon: MapPin },
  { path: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  { path: '/reports', label: 'Reports & Export', icon: FileSpreadsheet },
  { path: '/settings', label: 'System Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#080c16] border-r border-slate-800/80 flex flex-col fixed inset-y-0 left-0 z-40 select-none shadow-2xl">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-slate-800/80 bg-slate-950/40">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-glow-cyan text-white group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-wider text-white flex items-center gap-1">
              BUILD<span className="text-cyan-400">VISION</span>
            </div>
            <div className="text-[10px] font-semibold tracking-widest text-cyan-400/80 uppercase">
              AI CONSTRUCTION
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Enterprise Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar Footer System Health */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span>YOLO Safety Model</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Active
          </span>
        </div>
        <div className="text-[11px] text-slate-500">v4.2 Engine • 99.4% Uptime</div>
      </div>
    </aside>
  );
};
