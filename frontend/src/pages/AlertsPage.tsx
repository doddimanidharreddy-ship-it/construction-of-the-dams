import React, { useEffect, useState } from 'react';
import { Bell, Filter, CheckCircle2, AlertTriangle, ShieldCheck, XCircle, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { AlertItem } from '../types';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getAlerts();
      setAlerts(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const handleResolve = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, resolved: true, read: true } : a)));
  };

  if (loading) return <LoadingSpinner label="Fetching Centralized Telemetry Alerts..." />;

  const filtered = alerts.filter((a) => {
    const matchesPriority = priorityFilter === 'All' || a.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All' || a.category === categoryFilter;
    return matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Bell className="w-6 h-6 text-cyan-400" />
          Centralized AI Alert Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time incident notifications across safety vision, delay predictions, equipment telematics, and stock alerts.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            <option value="Safety">Safety Vision</option>
            <option value="Delay">Schedule Delay</option>
            <option value="Equipment">Equipment IoT</option>
            <option value="Resource">Material Stock</option>
          </select>
        </div>

        <button
          onClick={() => setAlerts(alerts.map((a) => ({ ...a, read: true })))}
          className="text-xs font-semibold text-cyan-400 hover:underline"
        >
          Mark All as Read
        </button>
      </div>

      {/* Alert Cards Feed */}
      <div className="space-y-4">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 rounded-2xl border transition-all ${
              alert.resolved
                ? 'bg-slate-950/40 border-slate-800 opacity-60'
                : !alert.read
                ? 'bg-gradient-to-r from-slate-900 to-[#0f172a] border-cyan-500/40 shadow-glow-cyan'
                : 'glass-panel border-slate-800'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    alert.priority === 'Critical'
                      ? 'bg-rose-500/20 text-rose-400'
                      : alert.priority === 'High'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{alert.title}</span>
                    <StatusBadge status={alert.priority} size="sm" />
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {alert.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>

                  {alert.actionGuidance && (
                    <div className="text-xs font-semibold text-cyan-400 flex items-center gap-1 mt-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Guidance: {alert.actionGuidance}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                {!alert.resolved && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs hover:bg-emerald-500/30 flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Alert</span>
                  </button>
                )}
                {!alert.read && !alert.resolved && (
                  <button
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 transition"
                  >
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
