import React, { useState, useEffect } from 'react';
import { 
  Building2, LayoutDashboard, FolderKanban, TrendingUp, Users, HardHat, 
  Package, ShieldAlert, Cpu, AlertTriangle, MapPin, Bot, FileText, Settings, 
  LogOut, Bell, Search, ChevronRight, Activity, CheckCircle, Clock, ShieldCheck, 
  Sparkles, Filter, Plus, ExternalLink, RefreshCw, Layers, ArrowUpRight, Play, Eye, Zap,
  CloudRain, Smartphone, Award, CheckSquare, AlertOctagon, HelpCircle, BarChart2, Shield, Wrench,
  FileSpreadsheet, Upload, UserPlus, X, Sliders, DollarSign, Camera, Image, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const API_BASE = "http://localhost:8000/api";

type PageType = 'dashboard' | 'projects' | 'project-detail' | 'progress' | 'manpower' | 'equipment' | 'resources' | 'safety' | 'predictions' | 'risk' | 'alerts' | 'map' | 'assistant' | 'reports' | 'settings' | 'sih-pitch' | 'what-if' | 'photo-analyzer';
type ViewMode = 'desktop' | 'mobile';

interface UserInfo {
  email: string;
  role: string;
  full_name: string;
}

export default function App() {
  const [user, setUser] = useState<UserInfo | null>({
    email: 'admin@buildvision.ai',
    role: 'Admin',
    full_name: 'Vikramaditya Sharma (SIH Lead)'
  });
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertsList, setAlertsList] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [showWhatIfModal, setShowWhatIfModal] = useState<boolean>(false);
  const [showDailySummaryModal, setShowDailySummaryModal] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_BASE}/alerts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setAlertsList(data);
      })
      .catch(() => {
        setAlertsList([
          { id: 1, title: 'NH-44 Schedule Slippage (+14 Days)', time: '10m ago', priority: 'Critical' },
          { id: 2, title: '16mm TMT Steel Stock below Reorder Threshold', time: '1h ago', priority: 'High' },
          { id: 3, title: 'Worker Helmet Violation Detected (Zone B)', time: '2h ago', priority: 'High' },
          { id: 4, title: 'Excavator E-201 Idle for > 4 Hours', time: '3h ago', priority: 'Medium' }
        ]);
      });
  }, []);

  const handleFastLogin = (role: string, email: string, name: string) => {
    setUser({ role, email, full_name: name });
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleFastLogin} />;
  }

  return (
    <div className={`min-h-screen bg-[#0B0F17] text-gray-100 font-sans ${viewMode === 'mobile' ? 'flex justify-center items-center py-6 bg-gray-950' : 'flex overflow-hidden h-screen'}`}>
      <div className={`${viewMode === 'mobile' ? 'w-[390px] h-[820px] bg-[#111827] rounded-[48px] border-[10px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative' : 'flex-1 flex overflow-hidden'}`}>
        
        {viewMode === 'desktop' && (
          <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col justify-between z-20 shrink-0">
            <div>
              <div className="p-5 border-b border-gray-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-extrabold text-lg tracking-wider text-white heading-font leading-none">BUILDVISION</h1>
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50 mt-1 inline-block">
                    SIH1295 AI PLATFORM
                  </span>
                </div>
              </div>

              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                <NavItem icon={<Award className="w-4 h-4 text-amber-400" />} label="SIH Pitch & Evaluation" active={currentPage === 'sih-pitch'} onClick={() => setCurrentPage('sih-pitch')} badge="WIN" />
                <NavItem icon={<LayoutDashboard className="w-4 h-4" />} label="Digital Twin Dashboard" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
                <NavItem icon={<FolderKanban className="w-4 h-4" />} label="Projects" active={currentPage === 'projects' || currentPage === 'project-detail'} onClick={() => setCurrentPage('projects')} />
                <NavItem icon={<TrendingUp className="w-4 h-4 text-cyan-400" />} label="Real-Time Progress" active={currentPage === 'progress'} onClick={() => setCurrentPage('progress')} />
                <NavItem icon={<Users className="w-4 h-4 text-purple-400" />} label="Manpower Monitoring" active={currentPage === 'manpower'} onClick={() => setCurrentPage('manpower')} />
                <NavItem icon={<Zap className="w-4 h-4 text-amber-400" />} label="Machine Power Fleet" active={currentPage === 'equipment'} onClick={() => setCurrentPage('equipment')} badge="HP" />
                <NavItem icon={<Package className="w-4 h-4 text-emerald-400" />} label="Resource Optimization" active={currentPage === 'resources'} onClick={() => setCurrentPage('resources')} />
                
                <div className="pt-3 pb-1 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">AI Innovations</div>
                <NavItem icon={<Sliders className="w-4 h-4 text-amber-400" />} label="What-If Simulator" active={currentPage === 'what-if'} onClick={() => setCurrentPage('what-if')} badge="SIM" />
                <NavItem icon={<Camera className="w-4 h-4 text-indigo-400" />} label="Photo Progress Analysis" active={currentPage === 'photo-analyzer'} onClick={() => setCurrentPage('photo-analyzer')} badge="VISION" />
                <NavItem icon={<ShieldAlert className="w-4 h-4 text-emerald-400" />} label="AI Safety Vision (YOLO)" active={currentPage === 'safety'} onClick={() => setCurrentPage('safety')} badge="CV" />
                <NavItem icon={<Cpu className="w-4 h-4 text-cyan-400" />} label="AI Delay Forecast" active={currentPage === 'predictions'} onClick={() => setCurrentPage('predictions')} badge="ML" />
                <NavItem icon={<Activity className="w-4 h-4 text-amber-400" />} label="Health & Risk Score" active={currentPage === 'risk'} onClick={() => setCurrentPage('risk')} />
                <NavItem icon={<AlertTriangle className="w-4 h-4 text-rose-400" />} label="Intelligent Alerts" active={currentPage === 'alerts'} onClick={() => setCurrentPage('alerts')} badge={alertsList.length.toString()} />
                <NavItem icon={<MapPin className="w-4 h-4 text-indigo-400" />} label="GIS Site Map" active={currentPage === 'map'} onClick={() => setCurrentPage('map')} />
                <NavItem icon={<Bot className="w-4 h-4 text-purple-400" />} label="AI Assistant" active={currentPage === 'assistant'} onClick={() => setCurrentPage('assistant')} />
                
                <div className="pt-3 pb-1 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Executive</div>
                <NavItem icon={<FileText className="w-4 h-4 text-cyan-400" />} label="Daily AI Executive Summary" active={currentPage === 'reports'} onClick={() => setCurrentPage('reports')} badge="DAILY" />
                <NavItem icon={<Settings className="w-4 h-4" />} label="Settings & RBAC" active={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
              </nav>
            </div>

            <div className="p-3 border-t border-gray-800/80 bg-gray-900/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center font-bold text-xs text-blue-300">
                    {user.full_name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-white truncate">{user.full_name}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.role}</p>
                  </div>
                </div>
                <button onClick={() => setUser(null)} className="p-1.5 hover:bg-gray-800 text-gray-400 hover:text-rose-400 rounded-lg transition-colors" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 flex flex-col overflow-hidden bg-[#0B0F17]">
          <header className="h-16 border-b border-gray-800/80 bg-[#111827]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search digital twin, risk score, YOLO safety, What-If..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-gray-900/80 border border-gray-700/60 rounded-xl text-xs text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-2 bg-blue-950/60 border border-blue-800/60 px-3 py-1 rounded-xl text-xs">
                <CloudRain className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span className="text-gray-300 text-[11px]">Weather AI: <strong>Monsoon Rain 🌧️</strong> <span className="text-cyan-300 font-bold">(+2 Days Impact)</span></span>
              </div>

              <button 
                onClick={() => setShowWhatIfModal(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-800 text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1.5 shadow-md hover:bg-purple-900 transition-all"
              >
                <Sliders className="w-3.5 h-3.5 text-purple-400" /> What-If Sim
              </button>

              <button 
                onClick={() => setShowDailySummaryModal(true)}
                className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 shadow-md hover:bg-cyan-900 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" /> Daily Briefing
              </button>

              <button 
                onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}
                className="px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-700 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 shadow-md"
                title="Switch view"
              >
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                {viewMode === 'desktop' ? 'Field App View' : 'Web View'}
              </button>

              <button 
                onClick={() => setCurrentPage('sih-pitch')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-600/30"
              >
                <Award className="w-3.5 h-3.5" /> SIH Pitch Deck
              </button>

              <div className="relative">
                <button 
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                    {alertsList.length}
                  </span>
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-4 z-50">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live System Alerts</h4>
                      <span className="text-[10px] text-cyan-400 font-semibold cursor-pointer hover:underline" onClick={() => { setCurrentPage('alerts'); setNotificationOpen(false); }}>View All</span>
                    </div>
                    <div className="space-y-2.5 max-h-60 overflow-y-auto">
                      {alertsList.map((alt, idx) => (
                        <AlertItem key={idx} title={alt.title} time={alt.time || "Just now"} priority={alt.priority || "High"} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6">
            {currentPage === 'sih-pitch' && <SIHPitchDeckPage onNavigate={(p) => setCurrentPage(p)} />}
            {currentPage === 'dashboard' && <DashboardPage onNavigate={(page, id) => { setCurrentPage(page); if (id) setSelectedProjectId(id); }} openWhatIf={() => setShowWhatIfModal(true)} openDailySummary={() => setShowDailySummaryModal(true)} />}
            {currentPage === 'projects' && <ProjectsPage onSelectProject={(id) => { setSelectedProjectId(id); setCurrentPage('project-detail'); }} />}
            {currentPage === 'project-detail' && <ProjectDetailPage projectId={selectedProjectId} onBack={() => setCurrentPage('projects')} />}
            {currentPage === 'progress' && <ProgressPage projectId={selectedProjectId} />}
            {currentPage === 'manpower' && <ManpowerPage />}
            {currentPage === 'equipment' && <EquipmentPage />}
            {currentPage === 'resources' && <ResourcesPage />}
            {currentPage === 'safety' && <SafetyVisionPage />}
            {currentPage === 'predictions' && <PredictionsPage projectId={selectedProjectId} openWhatIf={() => setShowWhatIfModal(true)} />}
            {currentPage === 'risk' && <RiskAnalysisPage projectId={selectedProjectId} />}
            {currentPage === 'alerts' && <AlertsPage alerts={alertsList} />}
            {currentPage === 'map' && <SiteMapPage />}
            {currentPage === 'assistant' && <AIAssistantPage />}
            {currentPage === 'reports' && <ReportsPage openDailySummary={() => setShowDailySummaryModal(true)} />}
            {currentPage === 'settings' && <SettingsPage user={user} />}
            {currentPage === 'what-if' && <WhatIfSimulatorPage />}
            {currentPage === 'photo-analyzer' && <SitePhotoAnalyzerPage />}
          </div>
        </main>
      </div>

      {showWhatIfModal && <WhatIfSimulatorModal onClose={() => setShowWhatIfModal(false)} />}
      {showDailySummaryModal && <DailySummaryModal onClose={() => setShowDailySummaryModal(false)} />}
    </div>
  );
}

function NavItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
        active 
          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-950/50 font-semibold' 
          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {badge && (
        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
          badge === 'WIN' ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse' :
          badge === 'CV' || badge === 'VISION' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
          badge === 'ML' || badge === 'SIM' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
          badge === 'HP' || badge === 'DAILY' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
          'bg-rose-950 text-rose-400 border border-rose-800'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function AlertItem({ title, time, priority }: { title: string, time: string, priority: string }) {
  return (
    <div className="p-2 rounded-lg bg-gray-950/60 border border-gray-800/60 flex items-start gap-2.5">
      <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${priority === 'Critical' ? 'text-rose-400' : 'text-amber-400'}`} />
      <div>
        <p className="text-xs text-gray-200 font-medium leading-tight">{title}</p>
        <p className="text-[10px] text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: (role: string, email: string, name: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20 mb-4">
            <Building2 className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-wider text-white heading-font">BUILDVISION AI</h1>
          <p className="text-xs text-gray-400 mt-1">SIH1295 — Real-Time Construction Intelligence Platform</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 mb-3 text-center uppercase tracking-wider">Quick Demo Login (Select Role)</p>
          <div className="grid grid-cols-2 gap-2.5">
            <button onClick={() => onLogin('Admin', 'admin@buildvision.ai', 'Vikramaditya Sharma')} className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-left hover:border-blue-500 transition-all">
              <div className="text-xs font-bold text-white">System Admin</div>
              <div className="text-[10px] text-gray-400">admin@buildvision.ai</div>
            </button>
            <button onClick={() => onLogin('Project Manager', 'pm@buildvision.ai', 'Rajesh Iyer')} className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-left hover:border-blue-500 transition-all">
              <div className="text-xs font-bold text-white">Project Manager</div>
              <div className="text-[10px] text-gray-400">pm@buildvision.ai</div>
            </button>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin('Project Manager', 'pm@buildvision.ai', 'Demo User'); }} className="space-y-4">
          <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30">
            SIGN IN TO SIH DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}

function SIHPitchDeckPage({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/80 via-indigo-950/80 to-blue-950/80 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-amber-400 tracking-widest uppercase bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
              SMART INDIA HACKATHON 2026 — PROBLEM STATEMENT SIH1295
            </span>
            <h2 className="text-2xl font-black text-white heading-font mt-2">BuildVision AI — Executive SIH Innovation Matrix</h2>
            <p className="text-xs text-gray-300 mt-1 max-w-2xl">
              An intelligent construction-site management platform combining real-time Digital Twins, AI delay forecasting, YOLO CV safety enforcement, What-If simulation, and automated daily briefs.
            </p>
          </div>
          <Award className="w-12 h-12 text-amber-400 shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <InnovationCard num="1" title="🧠 AI Project Health Score (0-100)" desc="Single unified health index with granular breakdown (Progress, Resources, Equipment, Safety, Schedule) and explanation engine." onClick={() => onNavigate('dashboard')} />
        <InnovationCard num="2" title="🔮 AI Delay Prediction Engine" desc="Forecasts 78% probability of delay & expected 12 days delay with root cause percentage attribution." onClick={() => onNavigate('predictions')} />
        <InnovationCard num="3" title="🚨 AI Early Warning System" desc="Detects 14% progress deficit early and recommends precise corrective workforce adjustments." onClick={() => onNavigate('predictions')} />
        <InnovationCard num="4" title="👷 Workforce Productivity Intelligence" desc="Calculates units/man-hour productivity (3.69 u/hr) and flags team efficiency imbalances." onClick={() => onNavigate('manpower')} />
        <InnovationCard num="5" title="🚜 Equipment Utilization & Idle Detection" desc="Telematics engine tracking machine HP, utilization rate, and idle warnings (>4 hrs)." onClick={() => onNavigate('equipment')} />
        <InnovationCard num="6" title="📦 Predictive Material Shortage" desc="Calculates daily stock burn velocity and predicts stockouts 6.6 days ahead with auto-reorder recommendations." onClick={() => onNavigate('resources')} />
        <InnovationCard num="7" title="🛡️ AI Construction Safety Vision" desc="YOLOv8 + OpenCV stream detecting PPE compliance (helmets, vests, restricted zones) in real time." onClick={() => onNavigate('safety')} />
        <InnovationCard num="8" title="🗺️ Construction Site Digital Twin Map" desc="Interactive SVG site grid with zone status, risk indicators, active equipment, and personnel count." onClick={() => onNavigate('map')} />
        <InnovationCard num="9" title="🌦️ Weather Impact Analysis" desc="External factor integration calculating monsoon impact on concrete & earthwork (+2 days schedule delta)." onClick={() => onNavigate('predictions')} />
        <InnovationCard num="10" title="💰 Budget Overrun Prediction" desc="Tracks planned ₹10 Cr vs final cost forecast ₹11.4 Cr to flag ₹1.4 Cr overrun early." onClick={() => onNavigate('dashboard')} />
        <InnovationCard num="11" title="📊 What-If Scenario Simulator" desc="Interactive sandbox allowing project managers to simulate manpower/equipment boosts to reduce delay." onClick={() => onNavigate('what-if')} />
        <InnovationCard num="12" title="🤖 Construction AI Assistant" desc="Chatbot answering complex site telemetry queries with actionable recommendations." onClick={() => onNavigate('assistant')} />
        <InnovationCard num="13" title="📱 Field Engineer Mobile Interface" desc="Compact mobile view tailored for on-site engineers to report incidents and attendance." onClick={() => onNavigate('dashboard')} />
        <InnovationCard num="14" title="📸 Site Photo Progress Inspector" desc="AI image analyzer detecting structural elements, vehicles, workers, and safety violations." onClick={() => onNavigate('photo-analyzer')} />
        <InnovationCard num="15" title="🔄 Automatic Daily AI Briefing" desc="End-of-day executive report generating progress velocity, active assets, and top AI priorities." onClick={() => onNavigate('reports')} />
      </div>
    </div>
  );
}

function InnovationCard({ num, title, desc, onClick }: { num: string, title: string, desc: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="p-4 bg-[#111827] border border-gray-800 hover:border-amber-500/50 rounded-2xl cursor-pointer transition-all space-y-2 group">
      <div className="flex items-center justify-between">
        <span className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800/80 flex items-center justify-center font-black text-amber-400 text-xs">{num}</span>
        <span className="text-[10px] text-cyan-400 font-bold group-hover:underline flex items-center gap-1">Explore <ChevronRight className="w-3 h-3" /></span>
      </div>
      <h4 className="font-bold text-white leading-tight">{title}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// --------------------------------------------------------------------------
// 1. DIGITAL TWIN DASHBOARD (FEATURES 1, 2, 3, 10 INTEGRATED)
// --------------------------------------------------------------------------
function DashboardPage({ onNavigate, openWhatIf, openDailySummary }: { onNavigate: (page: PageType, id?: number) => void, openWhatIf: () => void, openDailySummary: () => void }) {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE}/dashboard/summary`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(() => {});
  }, []);

  const chartData = [
    { month: 'Jan', planned: 10, actual: 9 },
    { month: 'Feb', planned: 22, actual: 20 },
    { month: 'Mar', planned: 35, actual: 30 },
    { month: 'Apr', planned: 48, actual: 40 },
    { month: 'May', planned: 60, actual: 51 },
    { month: 'Jun', planned: 75, actual: 64.5 },
  ];

  const kpis = summary?.kpis || {};

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" /> Real-Time Construction Digital Twin
          </h2>
          <p className="text-xs text-gray-400">Physical site telemetry, AI health score & delay prediction pipeline</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={openWhatIf} className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all">
            <Sliders className="w-4 h-4" /> Run What-If Simulation
          </button>
          <button onClick={openDailySummary} className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-600/30 transition-all">
            <FileText className="w-4 h-4" /> View Daily AI Brief
          </button>
        </div>
      </div>

      {/* FEATURE 3: AI EARLY WARNING SYSTEM BANNER */}
      <div className="p-4 bg-gradient-to-r from-rose-950/80 via-amber-950/60 to-gray-900 border border-rose-800/80 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/50 flex items-center justify-center shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800 uppercase tracking-wider">🚨 AI EARLY WARNING</span>
              <h4 className="text-xs font-bold text-white">Project: Highway Expansion NH-44</h4>
            </div>
            <p className="text-xs text-gray-200 mt-1">
              Current progress is <strong className="text-rose-400">45.5%</strong> vs Expected <strong className="text-cyan-400">58.0%</strong>. Current trend projects <strong className="text-rose-400 font-bold">12 Days Delay</strong>.
            </p>
            <p className="text-[11px] text-amber-300 mt-0.5">
              💡 <strong>AI Recommendation:</strong> Increase workforce by 12% & reassign 1 Bulldozer to Sector 2 within 24h.
            </p>
          </div>
        </div>
        <button onClick={() => onNavigate('predictions')} className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shrink-0 shadow-md">
          Take Corrective Action →
        </button>
      </div>

      {/* FEATURE 1: AI PROJECT HEALTH SCORE & FEATURE 10: BUDGET OVERRUN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI PROJECT HEALTH SCORE CARD (SCORE 74/100) */}
        <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white heading-font">🧠 AI Project Health Score</h3>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">REAL-TIME INDEX</span>
          </div>

          <div className="flex items-center justify-between bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
            <div>
              <div className="text-3xl font-black text-amber-400 heading-font">74<span className="text-sm font-bold text-gray-400">/100</span></div>
              <div className="text-[11px] font-bold text-amber-300 mt-0.5">🟡 Moderate Risk Status</div>
            </div>
            <div className="text-right space-y-1 text-[11px]">
              <div className="flex items-center justify-end gap-1.5"><span className="text-emerald-400 font-bold">🟢 Progress:</span> 82</div>
              <div className="flex items-center justify-end gap-1.5"><span className="text-amber-400 font-bold">🟡 Resources:</span> 68</div>
              <div className="flex items-center justify-end gap-1.5"><span className="text-emerald-400 font-bold">🟢 Equipment:</span> 87</div>
              <div className="flex items-center justify-end gap-1.5"><span className="text-rose-400 font-bold">🔴 Safety:</span> 54</div>
              <div className="flex items-center justify-end gap-1.5"><span className="text-amber-400 font-bold">🟡 Schedule:</span> 65</div>
            </div>
          </div>

          <div className="p-3 bg-amber-950/30 border border-amber-800/60 rounded-xl text-xs space-y-1 text-amber-200">
            <div className="font-bold flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" /> Why is the score 74/100?
            </div>
            <p className="text-[11px] leading-relaxed">
              1. <strong>Safety Score (54)</strong> penalized due to 2 helmet violations in Zone B.
              <br />
              2. <strong>Resources (68)</strong> affected by TMT Steel stock exhaustion risk in 4 days.
            </p>
          </div>
        </div>

        {/* FEATURE 2: AI DELAY PREDICTION BREAKDOWN */}
        <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white heading-font">🔮 AI Delay Forecasting</h3>
            </div>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800 animate-pulse">78% PROBABILITY</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Delay Risk</span>
              <div className="text-xl font-black text-rose-400 mt-1">78%</div>
              <div className="text-[10px] text-rose-300">High Slippage Likelihood</div>
            </div>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Expected Delay</span>
              <div className="text-xl font-black text-amber-400 mt-1">12 Days</div>
              <div className="text-[10px] text-amber-300">+2 Days Monsoon Impact</div>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Main Contributing Factors</span>
            <FactorBar label="Manpower Shortage" pct={32} color="bg-rose-500" />
            <FactorBar label="Equipment Downtime" pct={27} color="bg-amber-500" />
            <FactorBar label="Material Shortage" pct={23} color="bg-cyan-500" />
            <FactorBar label="Low Execution Progress" pct={18} color="bg-purple-500" />
          </div>
        </div>

        {/* FEATURE 10: BUDGET OVERRUN PREDICTION */}
        <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white heading-font">💰 Budget Overrun Prediction</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">FINANCIAL AI</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
              <span className="text-gray-400">Planned Budget:</span>
              <span className="font-bold text-white">₹10.0 Crore</span>
            </div>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
              <span className="text-gray-400">Spent to Date:</span>
              <span className="font-bold text-cyan-400">₹6.8 Crore</span>
            </div>
            <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-800 flex justify-between items-center">
              <span className="text-rose-300 font-bold">Expected Final Cost:</span>
              <span className="font-black text-rose-400 text-sm">₹11.4 Crore</span>
            </div>
          </div>

          <div className="p-3 bg-rose-950/30 border border-rose-800/60 rounded-xl text-xs flex items-center justify-between">
            <div>
              <div className="text-[10px] text-rose-400 font-extrabold uppercase">⚠ PREDICTED COST OVERRUN</div>
              <div className="text-lg font-black text-rose-400">₹1.4 Crore (+14.0%)</div>
            </div>
            <button onClick={openWhatIf} className="px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-800 rounded-lg text-[10px] font-bold hover:bg-purple-900">
              Mitigate Overrun →
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard title="Total Projects" value={kpis.total_projects?.toString() || "5"} sub="Across 4 States" icon={<Building2 className="w-4 h-4 text-blue-400" />} />
        <KPICard title="Active Projects" value={kpis.active_projects?.toString() || "4"} sub="1 Completed" icon={<Activity className="w-4 h-4 text-emerald-400" />} />
        <KPICard title="Delayed / At Risk" value={kpis.delayed_projects?.toString() || "2"} sub="Requires Action" icon={<AlertTriangle className="w-4 h-4 text-rose-400" />} highlight />
        <KPICard title="Overall Progress" value={`${kpis.overall_progress || 65.4}%`} sub="-9.6% Schedule Var." icon={<TrendingUp className="w-4 h-4 text-cyan-400" />} />
        <KPICard title="Total Manpower" value={`${kpis.total_manpower || 44} Workers`} sub="Productivity 3.69 u/hr" icon={<Users className="w-4 h-4 text-purple-400" />} />
        <KPICard title="Total Machine Power" value={kpis.total_machine_power || "14,850 HP"} sub="12,400 HP Active" icon={<Zap className="w-4 h-4 text-amber-400" />} highlightGold />
        <KPICard title="Active Heavy Fleet" value={`${kpis.active_equipment || 6} / ${kpis.total_equipment || 7} Units`} sub="Util Rate: 83.5%" icon={<HardHat className="w-4 h-4 text-amber-400" />} />
        <KPICard title="Critical Alerts" value={`${kpis.critical_alerts || 3} Unresolved`} sub="2 Safety Violations" icon={<ShieldAlert className="w-4 h-4 text-rose-400" />} />
        <KPICard title="Avg Safety Score" value={`${kpis.average_safety_score || 88.5}/100`} sub="YOLO Camera Active" icon={<ShieldCheck className="w-4 h-4 text-emerald-400" />} />
        <KPICard title="Overall Risk Index" value={`${kpis.overall_risk_score || 56.4}/100`} sub="Moderate-High" icon={<Cpu className="w-4 h-4 text-indigo-400" />} />
      </div>

      {/* Progress Chart */}
      <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-white heading-font">Planned vs Actual S-Curve Execution Trend</h3>
            <p className="text-[11px] text-gray-400">Aggregated execution velocity across active site infrastructure</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Planned S-Curve</span>
            <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Actual Velocity</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={11} />
              <YAxis stroke="#6B7280" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', fontSize: '12px' }} />
              <Area type="monotone" dataKey="planned" stroke="#3B82F6" fillOpacity={0.15} fill="#3B82F6" strokeWidth={2} />
              <Area type="monotone" dataKey="actual" stroke="#06B6D4" fillOpacity={0.25} fill="#06B6D4" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function FactorBar({ label, pct, color }: { label: string, pct: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px]">
        <span className="text-gray-300">{label}</span>
        <span className="font-bold text-white">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}

function KPICard({ title, value, sub, icon, highlight, highlightGold }: { title: string, value: string, sub: string, icon: React.ReactNode, highlight?: boolean, highlightGold?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${
      highlight ? 'bg-rose-950/30 border-rose-800/60 shadow-lg' : 
      highlightGold ? 'bg-amber-950/30 border-amber-700/60 shadow-lg' : 
      'bg-[#111827] border-gray-800'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-gray-400 truncate">{title}</span>
        {icon}
      </div>
      <div className="text-xl font-extrabold text-white heading-font">{value}</div>
      <div className="text-[10px] text-gray-400 mt-1 font-medium">{sub}</div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 4. WORKFORCE PRODUCTIVITY INTELLIGENCE (FEATURE 4)
// --------------------------------------------------------------------------
function ManpowerPage() {
  const [workers, setWorkers] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [workerSearch, setWorkerSearch] = useState<string>('');
  const [showSingleModal, setShowSingleModal] = useState<boolean>(false);
  const [showExcelModal, setShowExcelModal] = useState<boolean>(false);
  const [excelPasteText, setExcelPasteText] = useState<string>('');

  const [newWorker, setNewWorker] = useState({
    name: '',
    worker_id: '',
    role: 'Labour',
    shift: 'Morning',
    status: 'Active',
    productivity: 85
  });

  const fetchWorkers = () => {
    let url = `${API_BASE}/manpower?`;
    if (statusFilter !== 'All') url += `status=${statusFilter}&`;
    if (workerSearch) url += `search=${encodeURIComponent(workerSearch)}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.workers)) {
          setWorkers(data.workers);
        }
      })
      .catch(() => {
        const mock = [
          { id: 1, worker_id: "WRK-1001", name: "Ananya Verma", role: "Site Engineer", shift: "Morning", status: "Active", productivity: 92 },
          { id: 2, worker_id: "WRK-1002", name: "Ramesh Patel", role: "Supervisor", shift: "Morning", status: "Active", productivity: 88 },
          { id: 3, worker_id: "WRK-1003", name: "Suresh Kumar", role: "Operator", shift: "Morning", status: "Active", productivity: 85 },
          { id: 4, worker_id: "WRK-1004", name: "Dinesh Chand", role: "Mason", shift: "Night", status: "Active", productivity: 78 },
          { id: 5, worker_id: "WRK-1005", name: "Vikram Singh", role: "Safety Officer", shift: "Morning", status: "Active", productivity: 95 },
          { id: 6, worker_id: "WRK-1006", name: "Mahesh Babu", role: "Labour", shift: "Night", status: "Absent", productivity: 0 },
        ];
        let filtered = mock;
        if (statusFilter === 'Present') filtered = mock.filter(w => w.status === 'Active');
        if (statusFilter === 'Absent') filtered = mock.filter(w => w.status === 'Absent');
        if (workerSearch) filtered = filtered.filter(w => w.name.toLowerCase().includes(workerSearch.toLowerCase()) || w.worker_id.toLowerCase().includes(workerSearch.toLowerCase()));
        setWorkers(filtered);
      });
  };

  useEffect(() => {
    fetchWorkers();
  }, [statusFilter, workerSearch]);

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${API_BASE}/manpower`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWorker)
    })
      .then(res => res.json())
      .then(() => {
        setShowSingleModal(false);
        fetchWorkers();
      })
      .catch(() => {
        setWorkers(prev => [...prev, { ...newWorker, id: Date.now() }]);
        setShowSingleModal(false);
      });
  };

  const handleExcelImportSubmit = () => {
    const lines = excelPasteText.trim().split('\n');
    const parsedWorkers: any[] = [];

    lines.forEach((line, idx) => {
      const parts = line.split(/[\t,]/);
      if (parts.length >= 2) {
        parsedWorkers.push({
          name: parts[0].trim(),
          worker_id: parts[1] ? parts[1].trim() : `WRK-${1050 + idx}`,
          role: parts[2] ? parts[2].trim() : "Labour",
          shift: parts[3] ? parts[3].trim() : "Morning",
          status: parts[4] && parts[4].toLowerCase().includes('absent') ? "Absent" : "Active",
          productivity: 85.0
        });
      }
    });

    if (parsedWorkers.length === 0) {
      parsedWorkers.push(
        { name: "Rahul Sharma", worker_id: "WRK-1041", role: "Electrician", shift: "Morning", status: "Active", productivity: 90 },
        { name: "Sunil Verma", worker_id: "WRK-1042", role: "Mason", shift: "Night", status: "Active", productivity: 82 },
        { name: "Amit Yadav", worker_id: "WRK-1043", role: "Labour", shift: "Morning", status: "Absent", productivity: 0 }
      );
    }

    fetch(`${API_BASE}/manpower/excel-import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedWorkers)
    })
      .then(res => res.json())
      .then(() => {
        setShowExcelModal(false);
        setExcelPasteText('');
        fetchWorkers();
      })
      .catch(() => {
        setWorkers(prev => [...prev, ...parsedWorkers]);
        setShowExcelModal(false);
        setExcelPasteText('');
      });
  };

  const presentCount = workers.filter(w => w.status === 'Active').length;
  const absentCount = workers.filter(w => w.status === 'Absent').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" /> Workforce Productivity Intelligence & Roster
          </h2>
          <p className="text-xs text-gray-400">Calculates Work Completed / Man-Hours (3.69 units/hr), absent/present status & Excel import</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setShowExcelModal(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" /> Import Excel / CSV Roster
          </button>
          <button 
            onClick={() => setShowSingleModal(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all"
          >
            <UserPlus className="w-4 h-4" /> Add Worker
          </button>
        </div>
      </div>

      {/* FEATURE 4: PRODUCTIVITY INTELLIGENCE BANNER */}
      <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
          <span className="text-gray-400 font-bold">Overall Site Productivity</span>
          <div className="text-2xl font-black text-cyan-400">3.69 <span className="text-xs font-normal text-gray-400">units / man-hour</span></div>
          <p className="text-[10px] text-emerald-400 font-semibold">Formula: 1,240 Work Units / 336 Man-Hours</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
          <span className="text-gray-400 font-bold">High Productivity Teams</span>
          <div className="text-sm font-bold text-emerald-400">Steel Fixing & Rebar Team (4.2 u/hr)</div>
          <p className="text-[10px] text-gray-400">+12% over benchmark rate</p>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
          <span className="text-gray-400 font-bold">Low Productivity Teams</span>
          <div className="text-sm font-bold text-rose-400">Earthwork & Pier Excavation (2.1 u/hr)</div>
          <p className="text-[10px] text-rose-300">⚠ Manpower Shortage Deficit (15% below target)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Roster Workers" value={`${workers.length} Workers`} sub="Assigned Across Shifts" icon={<Users className="w-4 h-4 text-purple-400" />} />
        <KPICard title="Present On-Shift" value={`${presentCount} Active`} sub="Shift Attendance Rate" icon={<CheckCircle className="w-4 h-4 text-emerald-400" />} />
        <KPICard title="Absent Workers" value={`${absentCount} Absent`} sub="Shift Deficit Warning" icon={<AlertTriangle className="w-4 h-4 text-rose-400" />} highlight={absentCount > 0} />
        <KPICard title="Avg Site Productivity" value="3.69 u/hr" sub="+2.8% vs Last Shift" icon={<TrendingUp className="w-4 h-4 text-cyan-400" />} />
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-[#111827] border border-gray-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-gray-900 p-1 rounded-xl border border-gray-800">
          <span className="text-[11px] font-bold text-gray-500 px-2">Status:</span>
          {['All', 'Present', 'Absent'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                statusFilter === st 
                  ? (st === 'Absent' ? 'bg-rose-600 text-white shadow-md' : 'bg-blue-600 text-white shadow-md')
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {st === 'Present' ? 'Present / Active' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search worker by name or ID (e.g. WRK-1001)..." 
            value={workerSearch}
            onChange={(e) => setWorkerSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Worker Table */}
      <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white heading-font">On-Site Worker Roster & Live Attendance ({workers.length} Displayed)</h3>
          <span className="text-[11px] text-gray-400 font-medium">Filtered by: <strong className="text-cyan-400">{statusFilter}</strong></span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-900 text-gray-400 uppercase border-b border-gray-800 font-semibold">
              <tr>
                <th className="p-3">Worker ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Shift</th>
                <th className="p-3">Productivity Score</th>
                <th className="p-3 text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              {workers.map((w, idx) => (
                <tr key={idx} className="hover:bg-gray-900/40 transition-colors">
                  <td className="p-3 font-bold text-gray-400">{w.worker_id}</td>
                  <td className="p-3 font-bold text-white">{w.name}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-gray-900 text-cyan-300 border border-gray-800">{w.role}</span></td>
                  <td className="p-3">{w.shift}</td>
                  <td className="p-3 font-bold text-cyan-400">{w.productivity}% ({ (w.productivity * 0.04).toFixed(2) } u/hr)</td>
                  <td className="p-3 text-right">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      w.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
                    }`}>
                      {w.status === 'Active' ? 'Present / Active' : 'Absent'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showExcelModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white heading-font">Bulk Import Excel / CSV Worker Roster</h3>
              </div>
              <button onClick={() => setShowExcelModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-gray-300">
                Paste contents from an <strong>Excel (.xlsx)</strong> sheet or <strong>CSV file</strong> (Columns: <code>Name, Worker_ID, Role, Shift, Status</code>):
              </p>
              
              <textarea
                rows={6}
                placeholder={`Example paste format:\nRahul Sharma, WRK-1051, Electrician, Morning, Present\nSunil Verma, WRK-1052, Mason, Night, Present\nAmit Yadav, WRK-1053, Labour, Morning, Absent`}
                value={excelPasteText}
                onChange={(e) => setExcelPasteText(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white font-mono focus:outline-none focus:border-emerald-500"
              />

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-[11px] text-emerald-300">
                💡 Instant CSV / Excel parser automatically creates records and updates the manpower telemetry.
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowExcelModal(false)} className="flex-1 py-2 bg-gray-800 text-gray-300 font-bold rounded-xl">Cancel</button>
                <button type="button" onClick={handleExcelImportSubmit} className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30">
                  Parse & Import Excel Roster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSingleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white heading-font">Add Single Construction Worker</h3>
              <button onClick={() => setShowSingleModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddWorker} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Worker Full Name</label>
                <input required type="text" placeholder="e.g. Ramesh Patel" value={newWorker.name} onChange={e => setNewWorker({...newWorker, name: e.target.value})} className="w-full p-2 bg-gray-900 border border-gray-800 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Worker ID</label>
                <input required type="text" placeholder="e.g. WRK-1060" value={newWorker.worker_id} onChange={e => setNewWorker({...newWorker, worker_id: e.target.value})} className="w-full p-2 bg-gray-900 border border-gray-800 rounded-xl text-white" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Role / Trade</label>
                <select value={newWorker.role} onChange={e => setNewWorker({...newWorker, role: e.target.value})} className="w-full p-2 bg-gray-900 border border-gray-800 rounded-xl text-white">
                  <option value="Engineer">Site Engineer</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Operator">Operator</option>
                  <option value="Mason">Mason</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Labour">Labour</option>
                  <option value="Safety Officer">Safety Officer</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Shift</label>
                <select value={newWorker.shift} onChange={e => setNewWorker({...newWorker, shift: e.target.value})} className="w-full p-2 bg-gray-900 border border-gray-800 rounded-xl text-white">
                  <option value="Morning">Morning Shift</option>
                  <option value="Night">Night Shift</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Attendance Status</label>
                <select value={newWorker.status} onChange={e => setNewWorker({...newWorker, status: e.target.value})} className="w-full p-2 bg-gray-900 border border-gray-800 rounded-xl text-white">
                  <option value="Active">Present / Active</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowSingleModal(false)} className="flex-1 py-2 bg-gray-800 text-gray-300 font-bold rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30">
                  Register Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 5. EQUIPMENT UTILIZATION & IDLE DETECTION (FEATURE 5)
// --------------------------------------------------------------------------
function EquipmentPage() {
  const machinery = [
    { id: "EQ-EX-201", name: "Excavator CAT 320D", location: "Sector 2 Excavation", util: 43, hp: "285 HP", status: "Idle", idleHours: 4, maint: "Good" },
    { id: "EQ-CR-101", name: "Tower Crane Liebherr 280", location: "Bridge Pier 4", util: 86, hp: "450 HP", status: "Active", idleHours: 0, maint: "Good" },
    { id: "EQ-BD-109", name: "Bulldozer Komatsu D65", location: "Equipment Yard A", util: 45, hp: "210 HP", status: "Maintenance", idleHours: 0, maint: "Overhaul Due" },
    { id: "EQ-TR-102", name: "Dump Truck Volvo FMX", location: "Substation Block 1", util: 72, hp: "420 HP", status: "Active", idleHours: 0.5, maint: "Good" },
    { id: "EQ-MX-302", name: "Concrete Batching Truck M-30", location: "Metro Pier 12", util: 76, hp: "340 HP", status: "Active", idleHours: 0, maint: "Good" },
    { id: "EQ-LD-501", name: "Front Wheel Loader WA380", location: "Staging Yard", util: 30, hp: "190 HP", status: "Idle", idleHours: 2, maint: "Inspection Due" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Equipment Utilization & Idle Detection Telematics
          </h2>
          <p className="text-xs text-gray-400">Tracks mechanical Horsepower (HP), real-time utilization % & idle alerts</p>
        </div>
        <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-bold">
          14,850 HP Total Engine Capacity
        </span>
      </div>

      {/* FEATURE 5: IDLE DETECTION ALERT BANNER */}
      <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-extrabold text-amber-300">🚨 IDLE MACHINERY ALERT: Excavator E-201 (CAT 320D)</span> has been idle for <strong>4 hours</strong> in Sector 2.
            <div className="text-[11px] text-gray-300 mt-0.5">Reassign to Pier 4 earthwork to eliminate equipment rental wastage.</div>
          </div>
        </div>
        <button className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs">
          Reassign Asset
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Engine Capacity" value="14,850 HP" sub="Heavy Machinery Fleet" icon={<Zap className="w-4 h-4 text-amber-400" />} highlightGold />
        <KPICard title="Active Operating Power" value="12,400 HP" sub="83.5% Fleet Power Utilized" icon={<Activity className="w-4 h-4 text-emerald-400" />} />
        <KPICard title="Active Heavy Units" value="6 / 7 Fleet" sub="1 Unit in Servicing" icon={<HardHat className="w-4 h-4 text-cyan-400" />} />
        <KPICard title="Maintenance Alert" value="1 Unit Overdue" sub="Bulldozer Komatsu D65" icon={<Wrench className="w-4 h-4 text-rose-400" />} highlight />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {machinery.map((m, idx) => (
          <div key={idx} className={`p-5 bg-[#111827] border rounded-2xl space-y-3 ${m.idleHours >= 4 ? 'border-amber-700/80 shadow-lg shadow-amber-950/30' : 'border-gray-800'}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-500">{m.id}</span>
              <span className="px-2 py-0.5 rounded text-xs font-black text-amber-400 bg-amber-950 border border-amber-800">{m.hp}</span>
            </div>
            <h3 className="text-sm font-bold text-white heading-font">{m.name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-500" /> {m.location}</p>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Utilization Rate:</span>
                <span className={`font-bold ${m.util < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{m.util}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className={`h-full ${m.util < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${m.util}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                m.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                m.status === 'Idle' ? 'bg-amber-950 text-amber-400 border-amber-800 animate-pulse' :
                'bg-rose-950 text-rose-400 border-rose-800'
              }`}>
                {m.status} {m.idleHours > 0 && `(${m.idleHours}h Idle)`}
              </span>
              <span className="text-[11px] text-gray-400">{m.maint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. PREDICTIVE MATERIAL SHORTAGE (FEATURE 6)
// --------------------------------------------------------------------------
function ResourcesPage() {
  const materials = [
    { name: "Portland Cement (Grade 53)", stock: "1,200 Bags", dailyBurn: "180 Bags/day", daysLeft: 6.6, shortageIn: "7 Days", status: "Warning", recOrder: "2,500 Bags" },
    { name: "16mm TMT Reinforcement Steel", stock: "45 Tons", dailyBurn: "12 Tons/day", daysLeft: 3.7, shortageIn: "4 Days", status: "Critical", recOrder: "80 Tons" },
    { name: "Coarse Aggregates (20mm)", stock: "4,500 Cu.m", dailyBurn: "300 Cu.m/day", daysLeft: 15.0, shortageIn: "15 Days", status: "Optimal", recOrder: "N/A" },
    { name: "Readymix Concrete M35", stock: "320 Cu.m", dailyBurn: "85 Cu.m/day", daysLeft: 3.76, shortageIn: "4 Days", status: "Critical", recOrder: "500 Cu.m" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-400" /> Predictive Material Shortage & Resource Optimization
          </h2>
          <p className="text-xs text-gray-400">Forecasts stockout dates based on consumption velocity and provides 1-click reordering</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((mat, idx) => (
          <div key={idx} className={`p-5 bg-[#111827] border rounded-2xl space-y-4 ${mat.status === 'Critical' ? 'border-rose-800/80 shadow-lg shadow-rose-950/30' : 'border-gray-800'}`}>
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-white heading-font">{mat.name}</h3>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                mat.status === 'Critical' ? 'bg-rose-950 text-rose-400 border-rose-800 animate-pulse' :
                mat.status === 'Warning' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                'bg-emerald-950 text-emerald-400 border-emerald-800'
              }`}>
                Shortage predicted in {mat.shortageIn}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Current Stock</span>
                <div className="font-black text-white text-sm mt-0.5">{mat.stock}</div>
              </div>
              <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Daily Velocity</span>
                <div className="font-bold text-cyan-400 text-sm mt-0.5">{mat.dailyBurn}</div>
              </div>
              <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Estimated Days</span>
                <div className={`font-black text-sm mt-0.5 ${mat.daysLeft <= 5 ? 'text-rose-400' : 'text-emerald-400'}`}>{mat.daysLeft} Days</div>
              </div>
            </div>

            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-gray-400">Recommended Reorder:</span>
                <div className="font-bold text-emerald-400">{mat.recOrder}</div>
              </div>
              {mat.recOrder !== 'N/A' && (
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md">
                  1-Click Auto Reorder
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 7. AI CONSTRUCTION SAFETY VISION (YOLO + OPENCV - FEATURE 7)
// --------------------------------------------------------------------------
function SafetyVisionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" /> AI Construction Safety Vision (YOLOv8 + OpenCV)
          </h2>
          <p className="text-xs text-gray-400">Live CCTV stream processing for PPE compliance (helmets, vests) and restricted area enforcement</p>
        </div>
        <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold">
          Safety Score: 71/100
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Stream Simulation */}
        <div className="lg:col-span-2 p-5 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <h3 className="text-sm font-bold text-white">LIVE CAM-04: Highway Sector 2 Pier Construction</h3>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">1080p @ 30 FPS</span>
          </div>

          <div className="relative aspect-video bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 flex items-center justify-center">
            {/* Visual simulation canvas box */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            
            <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur rounded-xl text-xs space-y-1 text-gray-200">
              <div>Detected Workers: <strong className="text-white">8</strong></div>
              <div>Helmet Violations: <strong className="text-rose-400">2 🚨</strong></div>
              <div>Safety Vest Violations: <strong className="text-amber-400">1 ⚠️</strong></div>
              <div>Restricted Zone Entry: <strong className="text-rose-400">1 🔴</strong></div>
            </div>

            {/* Bounding box visual representation */}
            <div className="absolute top-1/4 left-1/3 w-24 h-36 border-2 border-rose-500 rounded p-1">
              <span className="bg-rose-600 text-white text-[9px] font-bold px-1 rounded absolute -top-4 left-0">NO HELMET #24</span>
            </div>

            <div className="absolute top-1/3 right-1/4 w-24 h-36 border-2 border-emerald-500 rounded p-1">
              <span className="bg-emerald-600 text-white text-[9px] font-bold px-1 rounded absolute -top-4 left-0">HELMET OK #25</span>
            </div>

            <div className="text-center space-y-2 z-10">
              <Shield className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <p className="text-xs font-bold text-gray-300">YOLOv8 Real-Time Visual Inspection Stream Active</p>
            </div>
          </div>
        </div>

        {/* Safety Violation Log */}
        <div className="p-5 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-white heading-font">Live Safety Trigger Log</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-1">
              <div className="flex justify-between font-bold text-rose-300">
                <span>🚨 Worker without Hardhat</span>
                <span>10m ago</span>
              </div>
              <p className="text-[11px] text-gray-300">Zone B Pier Structure — Worker #WRK-1006</p>
            </div>
            <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-xl space-y-1">
              <div className="flex justify-between font-bold text-amber-300">
                <span>⚠️ Missing High-Vis Vest</span>
                <span>45m ago</span>
              </div>
              <p className="text-[11px] text-gray-300">Material Storage Area — Operator</p>
            </div>
            <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-1">
              <div className="flex justify-between font-bold text-rose-300">
                <span>🔴 Crane Swing Zone Intrusion</span>
                <span>1h ago</span>
              </div>
              <p className="text-[11px] text-gray-300">Restricted Zone A — Unauthorized Entry</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 8. INTERACTIVE SITE MAP DIGITAL TWIN (FEATURE 8)
// --------------------------------------------------------------------------
function SiteMapPage() {
  const [selectedSite, setSelectedSite] = useState<any>({
    id: 1,
    name: "Highway Expansion NH-44",
    code: "PRJ-NH44-01",
    location: "Nagpur - Hyderabad Corridor (Sector 2)",
    latitude: 21.1458,
    longitude: 79.0882,
    google_maps_url: "https://maps.google.com/?q=21.1458,79.0882",
    embed_map_src: "https://maps.google.com/maps?q=21.1458,79.0882&z=15&output=embed",
    status: "At Risk",
    progress: 45.5,
    risk_score: 78.5,
    safety_score: 71.0,
    active_workers: 18,
    active_equipment: "Tower Crane C-101 (450 HP), Excavator E-201 (285 HP)",
    geofence_status: "RESTRICTED ZONE ACTIVE",
    violations_count: 2
  });

  const [mapLayerMode, setMapLayerMode] = useState<'satellite' | 'gis' | 'heatmap' | 'hazard'>('satellite');

  // FROM and TO Route Search State
  const [fromLocation, setFromLocation] = useState<string>("Nagpur Material Yard (21.1458, 79.0882)");
  const [toLocation, setToLocation] = useState<string>("Highway Expansion Sector 2 Pier Construction");
  const [routeDetails, setRouteDetails] = useState<any>({
    distance: "14.8 km",
    duration: "26 mins",
    fuel: "9.2 Liters Diesel",
    traffic_risk: "Moderate Monsoon Traffic",
    directions_url: "https://www.google.com/maps/dir/?api=1&origin=21.1458,79.0882&destination=21.1600,79.1000",
    embed_route_src: "https://maps.google.com/maps?saddr=21.1458,79.0882&daddr=21.1600,79.1000&output=embed"
  });
  const [showRouteResult, setShowRouteResult] = useState<boolean>(false);

  const gisSites = [
    {
      id: 1,
      name: "Highway Expansion NH-44",
      code: "PRJ-NH44-01",
      location: "Nagpur - Hyderabad Corridor",
      latitude: 21.1458,
      longitude: 79.0882,
      google_maps_url: "https://maps.google.com/?q=21.1458,79.0882",
      embed_map_src: "https://maps.google.com/maps?q=21.1458,79.0882&z=15&output=embed",
      status: "At Risk",
      progress: 45.5,
      risk_score: 78.5,
      safety_score: 71.0,
      active_workers: 18,
      active_equipment: "Tower Crane C-101 (450 HP), Excavator E-201",
      geofence_status: "RESTRICTED DANGER ZONE",
      violations_count: 2
    },
    {
      id: 2,
      name: "Mumbai Metro Station Expansion Line 3",
      code: "PRJ-MM3-02",
      location: "BKC Station Complex, Mumbai",
      latitude: 19.0657,
      longitude: 72.8687,
      google_maps_url: "https://maps.google.com/?q=19.0657,72.8687",
      embed_map_src: "https://maps.google.com/maps?q=19.0657,72.8687&z=15&output=embed",
      status: "In Progress",
      progress: 68.2,
      risk_score: 52.0,
      safety_score: 89.0,
      active_workers: 24,
      active_equipment: "Tunnel Boring Machine TBM-1",
      geofence_status: "SAFE GEOFENCE",
      violations_count: 0
    },
    {
      id: 3,
      name: "Bangalore Tech Park Substation",
      code: "PRJ-BLR-03",
      location: "Whitefield Substation, Bangalore",
      latitude: 12.9698,
      longitude: 77.7500,
      google_maps_url: "https://maps.google.com/?q=12.9698,77.7500",
      embed_map_src: "https://maps.google.com/maps?q=12.9698,77.7500&z=15&output=embed",
      status: "Completed",
      progress: 100.0,
      risk_score: 12.0,
      safety_score: 96.0,
      active_workers: 2,
      active_equipment: "Inspection Van",
      geofence_status: "COMMISSIONED",
      violations_count: 0
    },
    {
      id: 4,
      name: "Coastal Road Suspension Bridge Pier",
      code: "PRJ-CBR-04",
      location: "Marine Drive Coastal Viaduct, Mumbai",
      latitude: 18.9440,
      longitude: 72.8230,
      google_maps_url: "https://maps.google.com/?q=18.9440,72.8230",
      embed_map_src: "https://maps.google.com/maps?q=18.9440,72.8230&z=15&output=embed",
      status: "Delayed",
      progress: 32.0,
      risk_score: 84.0,
      safety_score: 64.0,
      active_workers: 15,
      active_equipment: "Barge Crane Marine-01, Dump Truck",
      geofence_status: "HIGH WAVE DANGER GEOFENCE",
      violations_count: 3
    }
  ];

  const handleRouteSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromLocation.trim() || !toLocation.trim()) return;

    const fromClean = encodeURIComponent(fromLocation);
    const toClean = encodeURIComponent(toLocation);

    setRouteDetails({
      distance: "18.4 km",
      duration: "32 mins",
      fuel: "11.5 Liters Diesel",
      traffic_risk: "Monsoon Heavy Vehicle Route",
      active_sites_on_route: [
        {
          km: "Km 4.2",
          name: "NH-44 Sector 2 Pier Sub-Structure",
          activity: "Rebar Binding & Foundation Pouring Active",
          machinery: "Tower Crane C-101 (450 HP), CAT Excavator 320D",
          workers: 18,
          progress: 45.5,
          satellite_obs: "High earthwork movement detected via satellite change index."
        },
        {
          km: "Km 12.8",
          name: "Flyover Junction Flyover Ramp",
          activity: "Asphalt Laying & Beam Launching Active",
          machinery: "Dump Truck Volvo FMX, Loader WA380",
          workers: 12,
          progress: 38.0,
          satellite_obs: "Road lane diversion active. Reduced heavy vehicle speed."
        }
      ],
      directions_url: `https://www.google.com/maps/dir/?api=1&origin=${fromClean}&destination=${toClean}`,
      embed_route_src: `https://maps.google.com/maps?saddr=${fromClean}&daddr=${toClean}&output=embed`
    });
    setShowRouteResult(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" /> Interactive Google Maps GIS Site Digital Twin & Route Inspector
          </h2>
          <p className="text-xs text-gray-400">Live Satellite imagery GPS tracking, From-To transit route calculation & active construction zone detection</p>
        </div>

        <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-xl border border-gray-800 text-xs font-bold">
          <button 
            onClick={() => { setMapLayerMode('satellite'); setShowRouteResult(false); }}
            className={`px-3 py-1 rounded-lg transition-all ${mapLayerMode === 'satellite' && !showRouteResult ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            📡 Satellite 3D
          </button>
          <button 
            onClick={() => setMapLayerMode('heatmap')}
            className={`px-3 py-1 rounded-lg transition-all ${mapLayerMode === 'heatmap' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            🔥 Worker Density
          </button>
          <button 
            onClick={() => setMapLayerMode('hazard')}
            className={`px-3 py-1 rounded-lg transition-all ${mapLayerMode === 'hazard' ? 'bg-rose-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            🚨 Danger Geofences
          </button>
        </div>
      </div>

      {/* FROM - TO ROUTE SEARCH BOX */}
      <div className="p-5 bg-[#111827] border border-gray-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Google Maps Route & Satellite Construction Scanner (FROM ➔ TO)</h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            📡 SATELLITE SCANNER READY
          </span>
        </div>

        <form onSubmit={handleRouteSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-gray-400 font-semibold text-[11px]">FROM (Origin Warehouse / Site):</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input 
                type="text" 
                placeholder="e.g. Nagpur Central Material Yard" 
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="block text-gray-400 font-semibold text-[11px]">TO (Destination Sector / Pier):</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-rose-400" />
              <input 
                type="text" 
                placeholder="e.g. Highway Expansion NH-44 Sector 2" 
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-rose-500 font-medium"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button 
              type="submit" 
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all h-[38px]"
            >
              <Search className="w-4 h-4" /> Scan Route Construction
            </button>
          </div>
        </form>

        {showRouteResult && (
          <div className="space-y-4 pt-2">
            <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div className="p-2.5 bg-gray-950 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Transit Distance</span>
                <div className="font-black text-cyan-400 text-sm mt-0.5">{routeDetails.distance}</div>
              </div>
              <div className="p-2.5 bg-gray-950 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Est Transit Time</span>
                <div className="font-bold text-emerald-400 text-sm mt-0.5">{routeDetails.duration}</div>
              </div>
              <div className="p-2.5 bg-gray-950 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Fuel Consumption</span>
                <div className="font-bold text-amber-400 text-sm mt-0.5">{routeDetails.fuel}</div>
              </div>
              <div className="p-2.5 bg-gray-950 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-[10px]">Route Hazard Risk</span>
                <div className="font-bold text-rose-400 text-[11px] mt-0.5">{routeDetails.traffic_risk}</div>
              </div>
              <div className="flex items-center">
                <a 
                  href={routeDetails.directions_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  Google Directions <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* SATELLITE ACTIVE CONSTRUCTION ZONES FOUND ALONG ROUTE */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-800/80 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-bounce" />
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    📡 Satellite Intelligence: Ongoing Construction Activity Detected Along Route
                  </h4>
                </div>
                <span className="text-[10px] text-cyan-300 font-bold">2 Work Zones Detected</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {routeDetails.active_sites_on_route.map((site: any, sIdx: number) => (
                  <div key={sIdx} className="p-3 bg-[#111827] rounded-xl border border-gray-800 space-y-2">
                    <div className="flex justify-between font-bold text-white">
                      <span>🚧 Location: {site.km}</span>
                      <span className="text-cyan-400">{site.progress}% Complete</span>
                    </div>
                    <div className="font-bold text-indigo-300">{site.name}</div>
                    <p className="text-[11px] text-gray-300">⚡ <strong>Activity:</strong> {site.activity}</p>
                    <div className="text-[10px] text-gray-400">🚜 <strong>Machinery:</strong> {site.machinery}</div>
                    <div className="p-2 bg-gray-950 rounded-lg text-[10px] text-cyan-300">
                      👁️ <strong>Satellite Observation:</strong> {site.satellite_obs}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MAIN MAP VIEWER & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Google Map Viewer */}
        <div className="lg:col-span-2 p-5 bg-[#111827] border border-gray-800 rounded-3xl space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <div>
                <h3 className="text-sm font-bold text-white heading-font">
                  {showRouteResult ? `Route: ${fromLocation} ➔ ${toLocation}` : selectedSite.name}
                </h3>
                <p className="text-[10px] font-mono text-cyan-400">
                  {showRouteResult ? `Distance: ${routeDetails.distance}` : `GPS: ${selectedSite.latitude}° N, ${selectedSite.longitude}° E`}
                </p>
              </div>
            </div>
            <a 
              href={showRouteResult ? routeDetails.directions_url : selectedSite.google_maps_url} 
              target="_blank" 
              rel="noreferrer"
              className="px-3 py-1 bg-blue-950 border border-blue-800 text-blue-300 hover:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
            >
              Open Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-800 shadow-inner bg-gray-950">
            {/* Live Embedded Google Maps Iframe */}
            <iframe 
              title="Construction Site GIS Map"
              src={showRouteResult ? routeDetails.embed_route_src : selectedSite.embed_map_src} 
              className="w-full h-full border-0 filter contrast-110 saturate-120"
              loading="lazy"
            ></iframe>

            {/* Floating Telemetry Badge Overlay */}
            <div className="absolute bottom-4 left-4 p-3 bg-black/80 backdrop-blur-md rounded-2xl border border-gray-800 text-xs space-y-1 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span className="font-bold text-white">{showRouteResult ? `${fromLocation} to ${toLocation}` : selectedSite.location}</span>
              </div>
              <div className="text-[10px] text-gray-300">Active Machinery: <strong>{selectedSite.active_equipment}</strong></div>
              <div className="text-[10px] text-amber-400 font-bold">Geofence: {selectedSite.geofence_status}</div>
            </div>
          </div>
        </div>

        {/* Site Directory Selector */}
        <div className="p-5 bg-[#111827] border border-gray-800 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white heading-font border-b border-gray-800 pb-2">Active Construction Sites ({gisSites.length})</h3>
          
          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {gisSites.map((site) => (
              <div 
                key={site.id} 
                onClick={() => { setSelectedSite(site); setShowRouteResult(false); setFromLocation(site.name); }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  selectedSite.id === site.id && !showRouteResult
                    ? 'bg-blue-950/80 border-blue-500 shadow-lg shadow-blue-950/50' 
                    : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-gray-400">{site.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                    site.status === 'At Risk' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                    site.status === 'Delayed' ? 'bg-rose-950 text-rose-400 border-rose-800' :
                    site.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                    'bg-cyan-950 text-cyan-400 border-cyan-800'
                  }`}>
                    {site.status}
                  </span>
                </div>

                <h4 className="font-bold text-white text-xs leading-snug">{site.name}</h4>
                <p className="text-[10px] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3 text-indigo-400" /> {site.location}</p>
                
                <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px]">
                  <div className="p-1.5 bg-gray-950 rounded-lg text-center">
                    <span className="text-gray-500">Progress</span>
                    <div className="font-bold text-cyan-400">{site.progress}%</div>
                  </div>
                  <div className="p-1.5 bg-gray-950 rounded-lg text-center">
                    <span className="text-gray-500">Risk Score</span>
                    <div className={`font-bold ${site.risk_score > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{site.risk_score}</div>
                  </div>
                  <div className="p-1.5 bg-gray-950 rounded-lg text-center">
                    <span className="text-gray-500">Workers</span>
                    <div className="font-bold text-purple-400">{site.active_workers}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 11. WHAT-IF SIMULATOR PAGE & MODAL (FEATURE 11)
// --------------------------------------------------------------------------
function WhatIfSimulatorPage() {
  const [manpowerBoost, setManpowerBoost] = useState<number>(15);
  const [equipmentBoost, setEquipmentBoost] = useState<number>(1);
  const [materialBoost, setMaterialBoost] = useState<number>(20);
  const [simulatedDelay, setSimulatedDelay] = useState<number>(5);

  const handleRunSim = () => {
    // Dynamic recalculation
    const reduction = Math.round((manpowerBoost * 0.3) + (equipmentBoost * 2.5) + (materialBoost * 0.2));
    setSimulatedDelay(Math.max(2, 12 - reduction));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" /> What-If Scenario Decision Support Simulator
          </h2>
          <p className="text-xs text-gray-400">Simulate manpower, equipment & material adjustments to evaluate delay reduction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#111827] border border-gray-800 rounded-3xl space-y-5 text-xs">
          <h3 className="text-sm font-bold text-white heading-font border-b border-gray-800 pb-2">Simulation Input Sandbox</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-gray-300">Increase Manpower Workforce:</span>
              <span className="text-cyan-400">+{manpowerBoost}%</span>
            </div>
            <input type="range" min="0" max="40" value={manpowerBoost} onChange={e => setManpowerBoost(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-gray-300">Deploy Heavy Machinery:</span>
              <span className="text-amber-400">+{equipmentBoost} Units</span>
            </div>
            <input type="range" min="0" max="4" value={equipmentBoost} onChange={e => setEquipmentBoost(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-gray-300">Material Stock Buffer:</span>
              <span className="text-emerald-400">+{materialBoost}%</span>
            </div>
            <input type="range" min="0" max="50" value={materialBoost} onChange={e => setMaterialBoost(Number(e.target.value))} className="w-full accent-emerald-500" />
          </div>

          <button onClick={handleRunSim} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-xl shadow-lg shadow-purple-600/30">
            [ RUN AI SIMULATION ]
          </button>
        </div>

        <div className="p-6 bg-[#111827] border border-gray-800 rounded-3xl space-y-5 text-xs flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white heading-font border-b border-gray-800 pb-2">Simulation Forecast Outcome</h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between">
              <span className="text-gray-400">Current Predicted Delay:</span>
              <span className="font-bold text-rose-400">12 Days</span>
            </div>
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl flex justify-between">
              <span className="text-emerald-300 font-bold">Post-Simulation Delay:</span>
              <span className="font-black text-emerald-400 text-sm">{simulatedDelay} Days</span>
            </div>
            <div className="p-3 bg-purple-950/40 border border-purple-800 rounded-xl flex justify-between">
              <span className="text-purple-300 font-bold">Potential Schedule Gain:</span>
              <span className="font-black text-purple-400 text-sm">+{12 - simulatedDelay} Days Improvement</span>
            </div>
          </div>

          <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 text-[11px] text-gray-300">
            💡 Decision Support Recommendation: Deploying 1 additional excavator and increasing rebar workforce by {manpowerBoost}% successfully mitigates monsoon delay risk.
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIfSimulatorModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        <WhatIfSimulatorPage />
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 14. SITE PROGRESS PHOTO ANALYZER (FEATURE 14)
// --------------------------------------------------------------------------
function SitePhotoAnalyzerPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-400" /> Site Progress Photo Analyzer
          </h2>
          <p className="text-xs text-gray-400">Upload site imagery to perform computer-vision progress observation & safety audits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#111827] border border-gray-800 rounded-3xl space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white heading-font border-b border-gray-800 pb-2">Upload Site Inspection Image</h3>
          
          <div className="border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-2xl p-8 text-center space-y-2 cursor-pointer bg-gray-900/50">
            <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
            <div className="font-bold text-gray-200">Drag & Drop Construction Site Photo</div>
            <div className="text-[10px] text-gray-500">Supports JPG, PNG (Max 15MB)</div>
          </div>

          <button onClick={() => { setAnalyzing(true); setTimeout(() => setAnalyzing(false), 1200); }} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30">
            {analyzing ? 'Analyzing Image via YOLO...' : 'Run Vision AI Analysis'}
          </button>
        </div>

        {analyzed && (
          <div className="p-6 bg-[#111827] border border-gray-800 rounded-3xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white heading-font border-b border-gray-800 pb-2">AI Detection Results</h3>
            
            <div className="space-y-2">
              <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800 flex justify-between">
                <span className="text-gray-400">Project:</span>
                <span className="font-bold text-white">Bridge Construction Sector 2</span>
              </div>
              <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800 flex justify-between">
                <span className="text-gray-400">Objects Detected:</span>
                <span className="font-bold text-cyan-400">12 Workers, 3 Vehicles, 4 Equipments</span>
              </div>
              <div className="p-2.5 bg-rose-950/40 border border-rose-800 rounded-xl flex justify-between">
                <span className="text-rose-300 font-bold">Safety Issues:</span>
                <span className="font-bold text-rose-400">2 Hardhat Violations</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 border border-indigo-800 rounded-xl text-[11px] text-indigo-200">
              👁️ <strong>AI Progress Observation:</strong> Structural pier work active. Rebar reinforcement arrangement compliant at 45.5% milestone completion.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 15. AUTOMATIC DAILY AI SUMMARY (FEATURE 15)
// --------------------------------------------------------------------------
function DailySummaryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 w-full max-w-xl relative space-y-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        
        <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
          <FileText className="w-6 h-6 text-cyan-400" />
          <div>
            <h3 className="text-base font-extrabold text-white heading-font">AUTOMATIC DAILY AI EXECUTIVE SUMMARY</h3>
            <p className="text-[10px] text-gray-400">Generated: 11 Sept 2026 | Site Telemetry Digest</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Daily Progress</span>
              <div className="text-lg font-black text-cyan-400">+3.2%</div>
            </div>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Active Workforce</span>
              <div className="text-lg font-black text-purple-400">48 Workers</div>
            </div>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
              <span className="text-gray-400">Equipment Status</span>
              <div className="text-lg font-black text-amber-400">8 Active / 2 Idle</div>
            </div>
            <div className="p-3 bg-rose-950/40 border border-rose-800">
              <span className="text-rose-300 font-bold">Safety Score</span>
              <div className="text-lg font-black text-rose-400">71/100 (2 Violations)</div>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-800 rounded-xl space-y-1 text-amber-200">
            <span className="font-bold">⚠️ Critical Risk Factor:</span>
            <p className="text-[11px]">16mm TMT Steel Stock will exhaust in 4 days. Reorder required immediately.</p>
          </div>

          <div className="p-3 bg-blue-950/40 border border-blue-800 rounded-xl space-y-1 text-blue-200">
            <span className="font-bold">🤖 Top AI Action Recommendation:</span>
            <p className="text-[11px]">Increase manpower by 12% in Sector 2 and approve steel reorder quantity of 80 Tons.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// OTHER PAGES (ASSISTANT, PREDICTIONS, RISK, ALERTS, REPORTS, SETTINGS)
// --------------------------------------------------------------------------
function AIAssistantPage() {
  const [messages, setMessages] = useState<any[]>([
    { 
      sender: 'ai', 
      text: "👋 **Hello! I am BuildVision AI Decision Assistant.**\n\nI continuously monitor your construction projects, equipment telematics, safety vision streams, and resource velocities. Ask me any question or click a quick shortcut below!",
      actions: ["Check Immediate Priorities", "Run Delay Forecast", "Inspect Safety Feed"]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "🚨 Which project needs immediate attention?",
    "🔮 Why is Highway Expansion delayed?",
    "🚜 Which equipment is underutilized?",
    "📦 Which material will run out first?",
    "🛡️ What are today's safety issues?",
    "💰 What is the budget overrun forecast?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    fetch(`${API_BASE}/assistant/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: query, message: query })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        const replyText = data.reply || data.answer || "BuildVision AI has processed your request.";
        const actions = data.suggested_actions || [];
        setMessages(prev => [...prev, { sender: 'ai', text: replyText, actions, context: data.data_context }]);
      })
      .catch(() => {
        setLoading(false);
        let fallbackReply = `🤖 **BuildVision AI Analysis for: "${query}"**\n\n`;
        const q = query.toLowerCase();
        if (q.includes("immediate") || q.includes("attention") || q.includes("risk")) {
          fallbackReply += "🚨 **Highway Expansion NH-44** requires immediate attention.\n• Risk Score: **78.5/100**\n• Predicted Delay: **12 Days** (78% Probability)\n• Critical Factors: Steel stock outage in 3.7 days, Excavator E-201 idle 4h, 2 hardhat violations.";
        } else if (q.includes("delayed") || q.includes("why")) {
          fallbackReply += "🔮 **Delay Root Cause Analysis**:\n• Manpower Shortage: **32%**\n• Equipment Downtime: **27%**\n• Material Shortage: **23%**\n• Monsoon Rain Impact: **+2 Days**";
        } else if (q.includes("equipment") || q.includes("idle")) {
          fallbackReply += "🚜 **Equipment Telematics**:\n• Excavator E-201 idle for 4 hours (43% utilization).\n• Front Loader WA380 idle (30% utilization).\n• Total Operating Capacity: **12,400 HP / 14,850 HP**.";
        } else if (q.includes("material") || q.includes("run out")) {
          fallbackReply += "📦 **Resource Outage Forecast**:\n• 16mm TMT Steel Reinforcement: Stockout in **3.7 Days** (45 Tons left).\n• Portland Cement: Stockout in **6.6 Days** (1,200 Bags left).";
        } else if (q.includes("safety") || q.includes("ppe")) {
          fallbackReply += "🛡️ **YOLO Safety Stream**:\n• Safety Index: **71/100**\n• Violations: 2 Workers without Hardhat in Zone B Pier Work.";
        } else {
          fallbackReply += "📊 **Portfolio Telemetry Snapshot**:\n• Monitored Projects: 5 (1 Completed, 4 Active)\n• Active Manpower: 44 Workers (3.69 u/hr productivity)\n• Active Fleet Power: 14,850 HP Total Capacity.";
        }
        setMessages(prev => [...prev, { sender: 'ai', text: fallbackReply, actions: ["Run What-If Simulation", "View Site Map"] }]);
      });
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Bot className="w-6 h-6 text-purple-400" /> BuildVision AI Intelligence & Decision Assistant
          </h2>
          <p className="text-xs text-gray-400">Ask any site question — natural language construction telemetry & decision support</p>
        </div>
        <span className="px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 rounded-full text-xs font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> NLP AI Engine Active
        </span>
      </div>

      <div className="flex-1 bg-[#111827] border border-gray-800 rounded-3xl p-5 overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-xl text-xs space-y-2 ${
              m.sender === 'user' 
                ? 'bg-blue-600 text-white font-medium shadow-md' 
                : 'bg-gray-900 border border-gray-800 text-gray-200 shadow-xl'
            }`}>
              <div className="whitespace-pre-line leading-relaxed">
                {m.text}
              </div>

              {m.actions && m.actions.length > 0 && (
                <div className="pt-2 border-t border-gray-800/80 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-gray-500 font-bold w-full uppercase tracking-wider">Suggested Actions:</span>
                  {m.actions.map((act: string, aIdx: number) => (
                    <button key={aIdx} onClick={() => handleSend(act)} className="px-2.5 py-1 bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 text-[10px] font-bold rounded-lg transition-all">
                      ⚡ {act}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl bg-gray-900 border border-gray-800 text-xs text-cyan-400 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-purple-400" /> BuildVision AI is querying database telemetry...
            </div>
          </div>
        )}
      </div>

      {/* Quick Question Chips */}
      <div className="space-y-2">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ask Quick Question (Click to Run):</div>
        <div className="flex flex-wrap gap-1.5">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 text-gray-300 hover:text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input 
          type="text" 
          placeholder="Ask AI: e.g. Why is Project A delayed? Which material runs out first?" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 p-3.5 bg-gray-900 border border-gray-800 rounded-2xl text-xs text-white focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
        />
        <button 
          onClick={() => handleSend()} 
          disabled={loading || !input.trim()}
          className="px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-600/30 transition-all"
        >
          Send to AI
        </button>
      </div>
    </div>
  );
}

function PredictionsPage({ projectId, openWhatIf }: { projectId: number, openWhatIf: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-white heading-font">AI Delay Prediction & Early Warning Engine</h2>
        <button onClick={openWhatIf} className="px-3.5 py-1.5 bg-purple-600 text-white font-bold text-xs rounded-xl">Launch What-If Simulator</button>
      </div>
      <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white">Highway Expansion NH-44: 78% Delay Risk (+12 Days)</h3>
        <p className="text-xs text-gray-300">Random Forest regression model trained on 1,500 milestone telemetry datapoints.</p>
      </div>
    </div>
  );
}

function RiskAnalysisPage({ projectId }: { projectId: number }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white heading-font">Construction Risk Score Breakdown (0-100 Gauge)</h2>
      <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl">
        <div className="text-3xl font-black text-amber-400">74 / 100 Risk Score</div>
      </div>
    </div>
  );
}

function AlertsPage({ alerts }: { alerts: any[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white heading-font">Centralized Intelligent Alert Center</h2>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="p-4 bg-[#111827] border border-gray-800 rounded-2xl flex justify-between items-center text-xs">
            <span className="font-bold text-white">{a.title}</span>
            <span className="text-rose-400 font-extrabold">{a.priority || "High"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPage({ openDailySummary }: { openDailySummary: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-white heading-font">Reports & Executive Audits</h2>
        <button onClick={openDailySummary} className="px-3.5 py-1.5 bg-cyan-600 text-white font-bold text-xs rounded-xl">View Daily AI Executive Summary</button>
      </div>
      <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl">
        <p className="text-xs text-gray-300">Exportable executive PDF / CSV audits with delay forecast & safety compliance matrices.</p>
      </div>
    </div>
  );
}

function SettingsPage({ user }: { user: UserInfo }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white heading-font">Settings & RBAC Governance</h2>
      <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl text-xs space-y-2">
        <div>Logged in User: <strong className="text-white">{user.full_name}</strong></div>
        <div>Role: <strong className="text-cyan-400">{user.role}</strong></div>
      </div>
    </div>
  );
}

function ProjectsPage({ onSelectProject }: { onSelectProject: (id: number) => void }) {
  const projectsList = [
    {
      id: 1,
      code: "PRJ-NH44-01",
      name: "Highway Expansion NH-44",
      location: "Nagpur - Hyderabad Corridor (Sector 2)",
      manager: "Rajesh Iyer",
      status: "At Risk",
      progress: 45.5,
      planned_progress: 58.0,
      budget: "₹10.0 Cr",
      spent: "₹6.8 Cr",
      risk_score: 78.5,
      safety_score: 71.0,
      workers: 18,
      equipment_hp: "735 HP (2 Units)"
    },
    {
      id: 2,
      code: "PRJ-MM3-02",
      name: "Mumbai Metro Station Expansion Line 3",
      location: "BKC Station Complex, Mumbai",
      manager: "Ananya Verma",
      status: "In Progress",
      progress: 68.2,
      planned_progress: 70.0,
      budget: "₹18.0 Cr",
      spent: "₹11.2 Cr",
      risk_score: 52.0,
      safety_score: 89.0,
      workers: 24,
      equipment_hp: "1,200 HP (3 Units)"
    },
    {
      id: 3,
      code: "PRJ-BLR-03",
      name: "Bangalore Tech Park Substation",
      location: "Whitefield Industrial Substation, Bangalore",
      manager: "Vikramaditya Sharma",
      status: "Completed",
      progress: 100.0,
      planned_progress: 100.0,
      budget: "₹8.0 Cr",
      spent: "₹7.9 Cr",
      risk_score: 12.0,
      safety_score: 96.0,
      workers: 2,
      equipment_hp: "190 HP (1 Unit)"
    },
    {
      id: 4,
      code: "PRJ-CBR-04",
      name: "Coastal Road Suspension Bridge Pier",
      location: "Marine Drive Coastal Viaduct, Mumbai",
      manager: "Suresh Patel",
      status: "Delayed",
      progress: 32.0,
      planned_progress: 48.0,
      budget: "₹25.0 Cr",
      spent: "₹9.5 Cr",
      risk_score: 84.0,
      safety_score: 64.0,
      workers: 15,
      equipment_hp: "870 HP (2 Units)"
    },
    {
      id: 5,
      code: "PRJ-SLR-05",
      name: "Solar Power Generation Plant Sector 4",
      location: "Thar District, Rajasthan",
      manager: "Amitabh Sen",
      status: "In Progress",
      progress: 55.0,
      planned_progress: 58.0,
      budget: "₹12.0 Cr",
      spent: "₹6.2 Cr",
      risk_score: 42.0,
      safety_score: 91.0,
      workers: 20,
      equipment_hp: "540 HP (2 Units)"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white heading-font flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" /> Infrastructure Projects Portfolio Directory
          </h2>
          <p className="text-xs text-gray-400">Monitoring {projectsList.length} active state & national infrastructure construction projects</p>
        </div>
        <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-bold">
          {projectsList.length} Integrated Sites
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((p) => (
          <div 
            key={p.id} 
            onClick={() => onSelectProject(p.id)}
            className={`p-5 bg-[#111827] border rounded-3xl cursor-pointer hover:border-cyan-500/60 transition-all space-y-4 shadow-xl ${
              p.status === 'Delayed' ? 'border-rose-800/80 shadow-rose-950/30' :
              p.status === 'At Risk' ? 'border-amber-800/80 shadow-amber-950/30' :
              'border-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-gray-400">{p.code}</span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                p.status === 'At Risk' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                p.status === 'Delayed' ? 'bg-rose-950 text-rose-400 border-rose-800 animate-pulse' :
                p.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                'bg-cyan-950 text-cyan-400 border-cyan-800'
              }`}>
                {p.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm leading-snug">{p.name}</h3>
              <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5 text-gray-500" /> {p.location}</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Actual vs Planned:</span>
                <span className="font-bold text-cyan-400">{p.progress}% <span className="text-gray-500 font-normal">(Target: {p.planned_progress}%)</span></span>
              </div>
              <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                <div className={`h-full ${p.progress < p.planned_progress - 5 ? 'bg-amber-500' : 'bg-cyan-400'}`} style={{ width: `${p.progress}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div className="p-2 bg-gray-900 rounded-xl border border-gray-800 text-center">
                <span className="text-gray-500 text-[10px]">Budget</span>
                <div className="font-bold text-white mt-0.5">{p.budget}</div>
              </div>
              <div className="p-2 bg-gray-900 rounded-xl border border-gray-800 text-center">
                <span className="text-gray-500 text-[10px]">Risk Index</span>
                <div className={`font-bold mt-0.5 ${p.risk_score > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{p.risk_score}</div>
              </div>
              <div className="p-2 bg-gray-900 rounded-xl border border-gray-800 text-center">
                <span className="text-gray-500 text-[10px]">Workers</span>
                <div className="font-bold text-purple-400 mt-0.5">{p.workers}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-800/80">
              <span>PM: <strong className="text-gray-200">{p.manager}</strong></span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">View Telemetry →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailPage({ projectId, onBack }: { projectId: number, onBack: () => void }) {
  const projectMap: Record<number, any> = {
    1: { name: "Highway Expansion NH-44", code: "PRJ-NH44-01", location: "Nagpur - Hyderabad Corridor", status: "At Risk", progress: 45.5, planned: 58.0, risk: 78.5, safety: 71.0, budget: "₹10.0 Cr", spent: "₹6.8 Cr", workers: 18, delay: "12 Days" },
    2: { name: "Mumbai Metro Station Expansion Line 3", code: "PRJ-MM3-02", location: "BKC Complex, Mumbai", status: "In Progress", progress: 68.2, planned: 70.0, risk: 52.0, safety: 89.0, budget: "₹18.0 Cr", spent: "₹11.2 Cr", workers: 24, delay: "2 Days" },
    3: { name: "Bangalore Tech Park Substation", code: "PRJ-BLR-03", location: "Whitefield, Bangalore", status: "Completed", progress: 100.0, planned: 100.0, risk: 12.0, safety: 96.0, budget: "₹8.0 Cr", spent: "₹7.9 Cr", workers: 2, delay: "0 Days" },
    4: { name: "Coastal Road Suspension Bridge Pier", code: "PRJ-CBR-04", location: "Marine Drive, Mumbai", status: "Delayed", progress: 32.0, planned: 48.0, risk: 84.0, safety: 64.0, budget: "₹25.0 Cr", spent: "₹9.5 Cr", workers: 15, delay: "16 Days" },
    5: { name: "Solar Power Generation Plant Sector 4", code: "PRJ-SLR-05", location: "Thar District, Rajasthan", status: "In Progress", progress: 55.0, planned: 58.0, risk: 42.0, safety: 91.0, budget: "₹12.0 Cr", spent: "₹6.2 Cr", workers: 20, delay: "3 Days" }
  };

  const p = projectMap[projectId] || projectMap[1];

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="px-3 py-1.5 bg-gray-900 border border-gray-800 text-xs text-gray-300 hover:text-white rounded-xl flex items-center gap-1.5">
        ← Back to Projects Portfolio
      </button>

      <div className="p-6 bg-[#111827] border border-gray-800 rounded-3xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">{p.code}</span>
            <h2 className="text-xl font-extrabold text-white heading-font">{p.name}</h2>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5 text-indigo-400" /> {p.location}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
            p.status === 'At Risk' ? 'bg-amber-950 text-amber-400 border-amber-800' :
            p.status === 'Delayed' ? 'bg-rose-950 text-rose-400 border-rose-800 animate-pulse' :
            'bg-emerald-950 text-emerald-400 border-emerald-800'
          }`}>
            Status: {p.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
            <span className="text-gray-400">Progress</span>
            <div className="text-lg font-black text-cyan-400 mt-0.5">{p.progress}%</div>
            <div className="text-[10px] text-gray-500">Planned: {p.planned}%</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
            <span className="text-gray-400">Predicted Delay</span>
            <div className="text-lg font-black text-amber-400 mt-0.5">{p.delay}</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
            <span className="text-gray-400">Risk Score</span>
            <div className={`text-lg font-black mt-0.5 ${p.risk > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{p.risk}/100</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
            <span className="text-gray-400">Safety Index</span>
            <div className="text-lg font-black text-emerald-400 mt-0.5">{p.safety}/100</div>
          </div>
          <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
            <span className="text-gray-400">Disbursed Budget</span>
            <div className="text-lg font-black text-white mt-0.5">{p.spent}</div>
            <div className="text-[10px] text-gray-500">Total: {p.budget}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressPage({ projectId }: { projectId: number }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-white heading-font">Real-Time Progress & Schedule Variance</h2>
    </div>
  );
}
