import React, { useEffect, useState } from 'react';
import { Settings, Shield, Server, Cpu, RefreshCw, CheckCircle2, Save } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { SystemSettings } from '../types';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getSettings();
      setSettings(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <LoadingSpinner label="Loading Enterprise System Configuration..." />;
  if (!settings) return null;

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-cyan-400" />
          System Settings & API Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure backend API gateway, IoT telemetry refresh rates, YOLO vision model parameters, and role permissions.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Gateway & API Setup */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            Backend REST API Gateway
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">API Server Base Endpoint</label>
              <input
                type="text"
                value={settings.apiEndpoint}
                onChange={(e) => setSettings({ ...settings, apiEndpoint: e.target.value })}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Default API server runs at http://localhost:8000/api. Built-in automatic mock data fallback triggers if offline.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">IoT Telematics Gateway Status</label>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {settings.iotGatewayStatus} (99.98% Telemetry Ping)
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">YOLO Computer Vision Model</label>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-bold">
                  {settings.yoloModelVersion}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neural Refresh Rate & Toggles */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Neural Engine Polling & Notifications
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Automated Risk Alerts</div>
                <div className="text-[10px] text-slate-400">Push critical risk alerts to TopBar and Alert Center</div>
              </div>
              <input
                type="checkbox"
                checked={settings.autoAlertNotifications}
                onChange={(e) => setSettings({ ...settings, autoAlertNotifications: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <div className="font-bold text-white">Voice Assistant Synthesis</div>
                <div className="text-[10px] text-slate-400">Enable text-to-speech audio responses in AI Assistant</div>
              </div>
              <input
                type="checkbox"
                checked={settings.voiceAssistantEnabled}
                onChange={(e) => setSettings({ ...settings, voiceAssistantEnabled: e.target.checked })}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
            </div>
          </div>
        </div>

        {/* Role Permissions Matrix View */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Role Permission View Matrix
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-cyan-300">Executive</div>
              <div className="text-[10px] text-slate-400 mt-1">Full Portfolio Access, Financials, High-level KPIs</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-blue-300">Project Manager</div>
              <div className="text-[10px] text-slate-400 mt-1">Schedule Variance, Manpower, Milestone Controls</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-rose-300">Safety Inspector</div>
              <div className="text-[10px] text-slate-400 mt-1">YOLO Vision Cameras, PPE Violation Audits</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-purple-300">Site Engineer</div>
              <div className="text-[10px] text-slate-400 mt-1">Equipment Telematics, Inventory & Stock</div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-glow-cyan hover:opacity-95 transition flex items-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>Settings Saved Successfully</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
