import React from 'react';

interface RiskGaugeProps {
  score: number; // 0 - 100
  title?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, title = 'Risk Score', size = 'md' }) => {
  const normalizedScore = Math.max(0, Math.min(100, score));

  // Determine color based on risk score
  const getScoreColor = (val: number) => {
    if (val < 30) return { stroke: '#10b981', label: 'Low Risk', text: 'text-emerald-400' };
    if (val < 65) return { stroke: '#f59e0b', label: 'Moderate Risk', text: 'text-amber-400' };
    return { stroke: '#f43f5e', label: 'Critical Risk', text: 'text-rose-400' };
  };

  const { stroke, label, text } = getScoreColor(normalizedScore);

  const dimensions = {
    sm: { radius: 32, strokeWidth: 6, width: 80, height: 80, fontSize: 'text-lg' },
    md: { radius: 50, strokeWidth: 8, width: 120, height: 120, fontSize: 'text-2xl' },
    lg: { radius: 70, strokeWidth: 10, width: 170, height: 170, fontSize: 'text-4xl' },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={dimensions.width} height={dimensions.height} className="transform -rotate-90">
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={dimensions.radius}
            stroke="#1f293d"
            strokeWidth={dimensions.strokeWidth}
            fill="transparent"
          />
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={dimensions.radius}
            stroke={stroke}
            strokeWidth={dimensions.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`font-extrabold ${dimensions.fontSize} ${text}`}>{normalizedScore}</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">/ 100</span>
        </div>
      </div>
      {title && <div className="mt-2 text-xs font-semibold text-slate-300">{title}</div>}
      <div className={`mt-0.5 text-xs font-bold ${text}`}>{label}</div>
    </div>
  );
};
