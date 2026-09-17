import React, { useEffect, useState } from 'react';
import { Gauge, ShieldAlert, Cpu, BarChart2, CheckCircle2, HelpCircle } from 'lucide-react';
import { RiskGauge } from '../components/common/RiskGauge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { RiskAnalysis } from '../types';

export const RiskAnalysisPage: React.FC = () => {
  const [riskData, setRiskData] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getRiskAnalysis();
      setRiskData(data);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Calculating Multimodal Risk Explainability Matrix..." />;
  if (!riskData) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Gauge className="w-6 h-6 text-cyan-400" />
          Interactive Risk Matrix & AI Explainability
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Composite 0-100 site risk score decomposed across schedule, supply chain, workforce, equipment, and safety.
        </p>
      </div>

      {/* Main Risk Score & Component Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score Gauge Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center space-y-4 flex flex-col justify-center items-center">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Overall Site Composite Risk Score
          </h3>
          <RiskGauge score={riskData.overallRiskScore} title="Harbor Gateway Bridge" size="lg" />
          <div className="text-xs text-slate-400 max-w-xs">
            Calculated via neural weightings of 14 telemetry feeds. Updated every 15 mins.
          </div>
        </div>

        {/* 5 Risk Component Sub-Scores */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Decomposed Risk Components Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Schedule & Milestone Risk</span>
                <span className="text-amber-400 font-extrabold">{riskData.components.schedule} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${riskData.components.schedule}%` }} className="h-full bg-amber-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Supply Chain & Materials</span>
                <span className="text-rose-400 font-extrabold">{riskData.components.resource} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${riskData.components.resource}%` }} className="h-full bg-rose-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Manpower & Shift Allocation</span>
                <span className="text-cyan-400 font-extrabold">{riskData.components.manpower} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${riskData.components.manpower}%` }} className="h-full bg-cyan-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Heavy Equipment Telematics</span>
                <span className="text-purple-400 font-extrabold">{riskData.components.equipment} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${riskData.components.equipment}%` }} className="h-full bg-purple-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Safety & PPE Compliance</span>
                <span className="text-emerald-400 font-extrabold">{riskData.components.safety} / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${riskData.components.safety}%` }} className="h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explainability Matrix Table */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            AI Risk Score Explainability Matrix (Shapley Value Weights)
          </h3>
          <span className="text-[10px] text-cyan-400 font-semibold">Transparent AI Analytics</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Telemetry Metric</th>
                <th className="p-4">Risk Contribution</th>
                <th className="p-4">Neural Weight</th>
                <th className="p-4">Directional Impact</th>
                <th className="p-4">Explanatory Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {riskData.explainabilityMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-white">{item.metric}</td>
                  <td className="p-4 font-mono font-bold text-cyan-400">{item.score} / 100</td>
                  <td className="p-4 text-slate-400">{item.weight}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        item.impact === 'Negative'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : item.impact === 'Positive'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700/50 text-slate-300'
                      }`}
                    >
                      {item.impact}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 leading-relaxed">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
