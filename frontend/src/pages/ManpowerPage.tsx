import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Shield, Clock, Search, Filter, AlertCircle } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { ManpowerData } from '../types';

export const ManpowerPage: React.FC = () => {
  const [manpower, setManpower] = useState<ManpowerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [shiftFilter, setShiftFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getManpower();
      setManpower(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Fetching Workforce Telematics..." />;

  const filtered = manpower.filter((m) => {
    const matchesSearch = m.projectName.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchesShift = shiftFilter === 'All' || m.activeShift === shiftFilter;
    return matchesSearch && matchesShift;
  });

  const totalWorkers = manpower.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          Manpower & Workforce Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Active worker shifts, trade breakdown, safety certification tracking, and site utilization rates.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Active Workforce"
          value={`${totalWorkers} Personnel`}
          change="100% Shift Checked"
          isPositive={true}
          icon={Users}
          color="cyan"
        />
        <MetricCard
          title="Day Shift Active"
          value="642 Workers"
          change="Day Shift Ops"
          isPositive={true}
          icon={UserCheck}
          color="blue"
        />
        <MetricCard
          title="Avg Utilization Rate"
          value="87.4%"
          change="+2.1% efficiency"
          isPositive={true}
          icon={Clock}
          color="emerald"
        />
        <MetricCard
          title="Safety Certified"
          value="94.2%"
          change="PPE Verified"
          isPositive={true}
          icon={Shield}
          color="purple"
        />
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search role or project..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 text-xs text-white rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Shifts</option>
            <option value="Day">Day Shift</option>
            <option value="Night">Night Shift</option>
          </select>
        </div>
      </div>

      {/* Workforce Breakdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">{item.role}</h3>
                <p className="text-[11px] text-cyan-400">{item.projectName}</p>
              </div>
              <StatusBadge status={item.activeShift === 'Day' ? 'Normal' : 'In Maintenance'} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Headcount</div>
                <div className="text-lg font-extrabold text-white">{item.count} Workers</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px]">Utilization Rate</div>
                <div className="text-lg font-extrabold text-cyan-400">{item.utilizationRate}%</div>
              </div>
            </div>

            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${item.utilizationRate}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
              ></div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Shift: <strong className="text-slate-200">{item.activeShift}</strong>
              </span>
              <span className={`font-semibold ${item.safetyCertified ? 'text-emerald-400' : 'text-amber-400'}`}>
                {item.safetyCertified ? '✓ Safety Certified' : '⚠️ Pending Safety Refresh'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
