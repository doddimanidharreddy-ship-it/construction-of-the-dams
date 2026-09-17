import React, { useEffect, useState } from 'react';
import { HardHat, Wrench, AlertTriangle, Clock, Fuel, ShieldAlert } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { Equipment } from '../types';

export const EquipmentPage: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getEquipment();
      setEquipmentList(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Connecting Heavy Machinery IoT Gateway..." />;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <HardHat className="w-6 h-6 text-cyan-400" />
          Heavy Equipment Telematics & Fleet Monitoring
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time IoT engine hours, maintenance telemetry alerts, fuel efficiency, and machine health diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Total Equipment Fleet"
          value={`${equipmentList.length} Heavy Units`}
          change="100% Telematics Connected"
          isPositive={true}
          icon={HardHat}
          color="cyan"
        />
        <MetricCard
          title="Operational Units"
          value={equipmentList.filter((e) => e.status === 'Operational').length}
          change="Active Duty"
          isPositive={true}
          icon={Clock}
          color="emerald"
        />
        <MetricCard
          title="Maintenance Pending"
          value={equipmentList.filter((e) => e.status === 'In Maintenance').length}
          change="Service Scheduled"
          isPositive={false}
          icon={Wrench}
          color="amber"
        />
        <MetricCard
          title="Critical Fault Alerts"
          value={equipmentList.filter((e) => e.status === 'Faulty').length}
          change="Code E-44 Error"
          isPositive={false}
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentList.map((item) => (
          <div key={item.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <StatusBadge status={item.status} size="sm" />
                <span className="font-mono text-xs text-slate-400 font-bold">{item.code}</span>
              </div>
              <h3 className="font-bold text-base text-white">{item.name}</h3>
              <p className="text-xs text-cyan-400">{item.projectName}</p>
            </div>

            {/* Diagnostics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> Today Operating
                </div>
                <div className="text-base font-bold text-white mt-1">{item.operatingHoursToday} Hours</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div className="text-slate-400 text-[10px] flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-amber-400" /> Fuel Level
                </div>
                <div className="text-base font-bold text-amber-400 mt-1">{item.fuelLevelPercentage}%</div>
              </div>
            </div>

            {item.telematicsAlert && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[11px]">IoT Fault Warning</div>
                  <div className="text-[10px]">{item.telematicsAlert}</div>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Next Service: <strong className="text-slate-200">{item.nextServiceDue}</strong></span>
              <button className="text-cyan-400 font-semibold hover:underline">Log Maintenance →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
