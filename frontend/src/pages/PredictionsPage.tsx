import React, { useEffect, useState } from 'react';
import { BrainCircuit, Clock, AlertTriangle, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { DelayPrediction } from '../types';

export const PredictionsPage: React.FC = () => {
  const [predictions, setPredictions] = useState<DelayPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getDelayPredictions();
      setPredictions(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleRunSimulation = async () => {
    setSimulating(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSimulating(false);
  };

  if (loading) return <LoadingSpinner label="Running Monte Carlo Delay Risk Simulation..." />;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            AI Schedule Delay Prediction & Risk Modeling
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Machine learning forecast algorithms evaluating supply chain bottlenecks, equipment outages, and labor shortages.
          </p>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={simulating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition"
        >
          <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
          <span>{simulating ? 'Running Neural Simulation...' : 'Re-Run Monte Carlo Forecast'}</span>
        </button>
      </div>

      {/* Top Prediction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <MetricCard
          title="Highest Delay Probability"
          value="82%"
          change="GreenValley Site"
          isPositive={false}
          icon={BrainCircuit}
          color="rose"
        />
        <MetricCard
          title="Max Predicted Delay"
          value="25 Days"
          change="Critical Milestone"
          isPositive={false}
          icon={Clock}
          color="amber"
        />
        <MetricCard
          title="Primary Risk Catalyst"
          value="Material Supply"
          change="Steel Rebar Shortage"
          isPositive={false}
          icon={AlertTriangle}
          color="purple"
        />
        <MetricCard
          title="AI Mitigation Confidence"
          value="92.4%"
          change="3 Action Options"
          isPositive={true}
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      {/* Delay Predictions Detail Cards */}
      <div className="space-y-6">
        {predictions.map((pred, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  Site Risk Forecast
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{pred.projectName}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Primary Risk Factor: <strong className="text-rose-400">{pred.primaryRiskFactor}</strong>
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-rose-400">{pred.delayProbability}%</div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase">Delay Probability</div>
                </div>
                <div className="text-center pl-6 border-l border-slate-800">
                  <div className="text-2xl font-extrabold text-amber-400">+{pred.predictedDelayDays} Days</div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase">Predicted Slippage</div>
                </div>
              </div>
            </div>

            {/* Contributing Risk Factors Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Contributing Risk Factor Weights
                </h4>
                <div className="space-y-2.5">
                  {pred.contributingFactors.map((factor, fIdx) => (
                    <div key={fIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{factor.factor}</span>
                        <span className="text-cyan-400 font-bold">{factor.impactPercentage}% Impact</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${factor.impactPercentage}%` }}
                          className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommended Mitigations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  AI Recommended Action Guidance
                </h4>
                <div className="space-y-2">
                  {pred.recommendedActions.map((action, aIdx) => (
                    <div key={aIdx} className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
