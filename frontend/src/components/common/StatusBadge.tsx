import React from 'react';

type StatusType = 'On Schedule' | 'At Risk' | 'Delayed' | 'Completed' | 'Operational' | 'In Maintenance' | 'Faulty' | 'Critical' | 'Normal' | 'Low Stock' | 'High' | 'Medium' | 'Low';

interface StatusBadgeProps {
  status: StatusType | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getColors = (st: string) => {
    switch (st) {
      case 'On Schedule':
      case 'Completed':
      case 'Operational':
      case 'Normal':
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'At Risk':
      case 'In Maintenance':
      case 'Low Stock':
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Delayed':
      case 'Faulty':
      case 'Critical':
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${getColors(
        status
      )} ${sizeClasses[size]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {status}
    </span>
  );
};
