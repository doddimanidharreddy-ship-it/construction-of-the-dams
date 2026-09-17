import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, Lock, Mail, Activity, Eye, Cpu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Executive');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, email);
    navigate('/dashboard');
  };

  const handleDemoFastLogin = (role: UserRole) => {
    login(role, `${role.toLowerCase().replace(' ', '')}@buildvision.ai`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col justify-center items-center relative overflow-hidden px-4">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-glow-cyan mb-4">
            <Zap className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            BUILD<span className="text-cyan-400">VISION</span> AI
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">
            Autonomous Construction Intelligence & Safety Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Select Active Persona Role</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Executive', 'Project Manager', 'Safety Inspector', 'Site Engineer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                      selectedRole === r
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@buildvision.ai"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-glow-cyan hover:opacity-95 transition flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Telematics Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
              Fast Demo Launch (Instant Access)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoFastLogin('Executive')}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 hover:bg-cyan-500/10 text-left transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold">Executive Mode</div>
                  <div className="text-[9px] text-slate-400">KPIs & Portfolio</div>
                </div>
              </button>
              <button
                onClick={() => handleDemoFastLogin('Safety Inspector')}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-rose-500/30 text-xs text-rose-300 hover:bg-rose-500/10 text-left transition flex items-center gap-2"
              >
                <Eye className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <div className="font-bold">Safety Inspector</div>
                  <div className="text-[9px] text-slate-400">YOLO Video Monitor</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Powered by BuildVision Autonomous Neural Engine v4.2 • ISO 27001 Certified
        </div>
      </div>
    </div>
  );
};
