import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, AlertTriangle, ShieldCheck, HardHat, Info } from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { api } from '../services/api';
import { SiteMapMarker } from '../types';

export const SiteMapPage: React.FC = () => {
  const [markers, setMarkers] = useState<SiteMapMarker[]>([]);
  const [activeMarker, setActiveMarker] = useState<SiteMapMarker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await api.getSiteMapMarkers();
      setMarkers(data);
      if (data.length > 0) setActiveMarker(data[0]);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner label="Rendering Digital Twin Geospatial Site Map..." />;

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <MapPin className="w-6 h-6 text-cyan-400" />
          Interactive Geospatial Site Map & Digital Twin
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Visual GIS mapping with project location pins, restricted zone perimeters, equipment telemetry, and safety alert hotspots.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visual Box */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-3xl border border-slate-800 relative h-[520px] bg-slate-950 overflow-hidden shadow-2xl flex items-center justify-center">
          {/* Simulated Dark Satellite Map Background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Grid Blueprint Lines */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/20 via-transparent to-blue-950/20 pointer-events-none"></div>

          {/* Render Map Markers */}
          {markers.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveMarker(m)}
              style={{ left: `${m.coordinates.x}%`, top: `${m.coordinates.y}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full shadow-2xl transition-all duration-300 group ${
                activeMarker?.id === m.id ? 'scale-125 z-20 ring-4 ring-cyan-400' : 'hover:scale-110 z-10'
              } ${
                m.status === 'Critical'
                  ? 'bg-rose-600 text-white shadow-glow-rose animate-bounce'
                  : m.status === 'Warning'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-amber'
                  : 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
              }`}
            >
              {m.type === 'Project Site' && <MapPin className="w-5 h-5 fill-current" />}
              {m.type === 'Restricted Zone' && <AlertTriangle className="w-5 h-5" />}
              {m.type === 'Equipment Pin' && <HardHat className="w-5 h-5" />}
              {m.type === 'Safety Alert' && <ShieldCheck className="w-5 h-5" />}

              {/* Tooltip on hover */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#0d1322] border border-cyan-500/40 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-xl">
                {m.title}
              </div>
            </button>
          ))}

          {/* Map Controls Overlay */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-cyan-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>GPS RTK ACCURACY: ± 2 cm • SECTOR METRO-4</span>
          </div>
        </div>

        {/* Selected Marker Detail Card */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
          {activeMarker ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  Selected Hotspot Telematics
                </span>
                <StatusBadge status={activeMarker.status} size="sm" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{activeMarker.title}</h3>
                <p className="text-xs text-slate-400 mt-1">Category: <strong className="text-slate-200">{activeMarker.type}</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  Live Sector Activity Log
                </div>
                <p className="text-slate-300 leading-relaxed">{activeMarker.details}</p>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                Coordinates: <span className="font-mono text-cyan-400 font-bold">{activeMarker.coordinates.x}° N, {activeMarker.coordinates.y}° W</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500 text-xs">Click a map pin to inspect telematics.</div>
          )}

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-300 mb-1">Map Legend</div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span> Project Site Pin
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Warning Zone / Telematics Alert
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Restricted Breach Hotspot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
