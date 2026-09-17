import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle, ArrowUpRight, ShoppingCart } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { ResourceItem } from '../types';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getResources();
      setResources(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Auditing Site Material Inventories..." />;

  const criticalCount = resources.filter((r) => r.status === 'Critical').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Package className="w-6 h-6 text-cyan-400" />
          Resource & Stock Inventory Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Automated stock level tracking, consumption rate forecasting, and supply chain reorder alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Tracked Material Types"
          value={`${resources.length} Categories`}
          change="Real-time RFID"
          isPositive={true}
          icon={Package}
          color="cyan"
        />
        <MetricCard
          title="Normal Stock Level"
          value={`${resources.filter((r) => r.status === 'Normal').length} Normal`}
          change="Adequate Reserves"
          isPositive={true}
          icon={Package}
          color="emerald"
        />
        <MetricCard
          title="Low Stock Warning"
          value={`${resources.filter((r) => r.status === 'Low Stock').length} Items`}
          change="Near Threshold"
          isPositive={false}
          icon={AlertTriangle}
          color="amber"
        />
        <MetricCard
          title="Critical Reorder Alerts"
          value={`${criticalCount} Critical`}
          change="Supplier Action Req."
          isPositive={false}
          icon={ShoppingCart}
          color="rose"
        />
      </div>

      {/* Stock Items Grid */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Material Inventory Telematics
          </h3>
          <span className="text-xs text-cyan-400 font-semibold">Auto-Reorder Engine Enabled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item) => (
            <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={item.status} size="sm" />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.category}</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                <p className="text-[11px] text-cyan-400">{item.projectName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Current Stock</div>
                  <div className="font-extrabold text-white mt-0.5">{item.currentStock} {item.unit}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Daily Consumption</div>
                  <div className="font-extrabold text-cyan-400 mt-0.5">{item.consumptionRateDaily} {item.unit}/day</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Reorder Threshold: <strong className="text-slate-200">{item.reorderThreshold}</strong></span>
                {item.status === 'Critical' && (
                  <button className="px-2.5 py-1 rounded-lg bg-rose-500 text-white font-extrabold text-[10px] hover:bg-rose-400">
                    Auto-Order Rebar →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
