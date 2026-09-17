import React from 'react';

interface BBox {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

interface DetectionCanvasProps {
  imageUrl: string;
  bboxes?: BBox[];
}

export const DetectionCanvas: React.FC<DetectionCanvasProps> = ({ imageUrl, bboxes = [] }) => {
  return (
    <div className="relative w-full h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center group shadow-xl">
      <img
        src={imageUrl}
        alt="Construction Site Safety Frame"
        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition duration-300"
      />

      {/* Render Simulated Bounding Boxes */}
      {bboxes.map((box, idx) => (
        <div
          key={idx}
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.w}%`,
            height: `${box.h}%`,
          }}
          className="absolute border-2 border-rose-500 bg-rose-500/10 rounded pointer-events-none shadow-glow-rose transition-all animate-pulse"
        >
          <span className="absolute -top-6 left-0 px-2 py-0.5 text-[10px] font-extrabold bg-rose-600 text-white rounded shadow-md whitespace-nowrap">
            ⚠️ {box.label}
          </span>
        </div>
      ))}

      {/* Live AI Overlay Stamp */}
      <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg border border-slate-700/60 text-[10px] font-mono text-cyan-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>YOLOv8x INFERENCE RUNNING • FPS: 29.8</span>
      </div>
    </div>
  );
};
