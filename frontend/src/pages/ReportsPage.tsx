import React, { useState } from 'react';
import { FileSpreadsheet, Download, FileText, CheckCircle2, ShieldCheck, HardHat, Users, BrainCircuit } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const ReportsPage: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const reports = [
    { id: 'rep-1', title: 'Executive Project Performance Summary', category: 'Executive KPI', format: 'PDF & CSV', size: '2.4 MB', date: '2026-09-10', icon: FileSpreadsheet },
    { id: 'rep-2', title: 'Workforce Utilization & Shift Audit Report', category: 'Manpower', format: 'Excel (XLSX)', size: '1.8 MB', date: '2026-09-10', icon: Users },
    { id: 'rep-3', title: 'Heavy Equipment Telematics & Fuel Audit', category: 'Equipment', format: 'PDF & CSV', size: '3.1 MB', date: '2026-09-09', icon: HardHat },
    { id: 'rep-4', title: 'YOLO Safety Incident & OSHA Compliance Log', category: 'Safety Vision', format: 'PDF Document', size: '4.5 MB', date: '2026-09-09', icon: ShieldCheck },
    { id: 'rep-5', title: 'AI Delay Prediction & Risk Mitigation Brief', category: 'Delay Risk', format: 'PDF & JSON', size: '1.2 MB', date: '2026-09-08', icon: BrainCircuit },
  ];

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-cyan-400" />
          Automated Reports & Export Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Export verified telematics reports, safety audit compliance documentation, and financial summaries.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{report.title}</h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span>Category: <strong className="text-cyan-400">{report.category}</strong></span>
                    <span>•</span>
                    <span>Format: <strong className="text-slate-200">{report.format}</strong></span>
                    <span>•</span>
                    <span>Generated: {report.date}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(report.id)}
                disabled={downloading === report.id}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-glow-cyan hover:opacity-95 transition flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                {downloading === report.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Exporting File...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Export Report ({report.size})</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
