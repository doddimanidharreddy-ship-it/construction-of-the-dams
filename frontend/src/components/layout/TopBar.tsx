import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Shield,
  Radio,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { mockAlerts } from '../../services/mockData';

export const TopBar: React.FC = () => {
  const { user, role, setRole, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadAlerts = mockAlerts.filter((a) => !a.read);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-[#090e1a]/90 backdrop-blur-md border-b border-slate-800/80 fixed top-0 right-0 left-64 z-30 px-6 flex items-center justify-between">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-80">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, equipment, safety logs..."
          className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/80 text-white rounded-xl border border-slate-700/60 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition"
        />
      </form>

      {/* Center Demo Badge */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-glow-cyan animate-pulse">
        <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
        <span>DEMO MODE — SIMULATED DATA</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick AI Assistant Trigger */}
        <button
          onClick={() => navigate('/ai-assistant')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Ask AI</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
          >
            <Bell className="w-5 h-5" />
            {unreadAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#090e1a]"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0d1322] border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 glass-panel">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Recent Alerts</span>
                <span className="text-[10px] text-cyan-400 font-semibold">{unreadAlerts.length} Unread</span>
              </div>
              <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                {mockAlerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/alerts');
                    }}
                    className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer border border-slate-800 transition flex items-start gap-2.5 text-xs"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-200">{alert.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{alert.message}</div>
                      <div className="text-[9px] text-slate-500 mt-1">{alert.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowNotifications(false);
                  navigate('/alerts');
                }}
                className="w-full mt-2 py-1.5 text-center text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                View Centralized Alert Center →
              </button>
            </div>
          )}
        </div>

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-slate-600 transition"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt="User Avatar"
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-cyan-500/50"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white leading-tight">{user?.name || 'Alexander Mercer'}</div>
              <div className="text-[10px] text-cyan-400 font-medium leading-tight">{role}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#0d1322] border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 glass-panel">
              <div className="px-3 py-2 border-b border-slate-800">
                <div className="text-xs font-semibold text-slate-400">Switch Persona Role</div>
              </div>

              {(['Executive', 'Project Manager', 'Safety Inspector', 'Site Engineer'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setShowUserMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition ${
                    role === r
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    {r}
                  </span>
                  {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                    navigate('/login');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
