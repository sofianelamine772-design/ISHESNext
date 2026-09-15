"use client";

import { useState } from "react";

interface SalesChartProps {
  monthlyData: { month: string; presentiel: number; distanciel: number }[];
}

export function SalesChart({ monthlyData }: SalesChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...monthlyData.flatMap(d => [d.presentiel, d.distanciel]), 1) * 1.1;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 35;
  
  const svgWidth = 800;
  const svgHeight = 220;
  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;

  const presentielPoints = monthlyData.map((item, index) => {
    const x = paddingLeft + (index / 11) * chartW;
    const y = paddingTop + chartH - (item.presentiel / maxVal) * chartH;
    return { x, y, month: item.month, value: item.presentiel };
  });

  const distancielPoints = monthlyData.map((item, index) => {
    const x = paddingLeft + (index / 11) * chartW;
    const y = paddingTop + chartH - (item.distanciel / maxVal) * chartH;
    return { x, y, month: item.month, value: item.distanciel };
  });

  // Generate smooth spline curve
  const getSymmetricBezierPath = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const presentielPath = getSymmetricBezierPath(presentielPoints);
  const distancielPath = getSymmetricBezierPath(distancielPoints);
  
  const presentielAreaPath = presentielPath
    ? `${presentielPath} L ${presentielPoints[presentielPoints.length - 1].x} ${paddingTop + chartH} L ${presentielPoints[0].x} ${paddingTop + chartH} Z`
    : "";

  const distancielAreaPath = distancielPath
    ? `${distancielPath} L ${distancielPoints[distancielPoints.length - 1].x} ${paddingTop + chartH} L ${distancielPoints[0].x} ${paddingTop + chartH} Z`
    : "";

  const formatRevenue = (val: number) => {
    if (val >= 1000) return (val / 1000).toFixed(1) + "K€";
    return val.toFixed(0) + "€";
  };

  return (
    <div className="relative w-full flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl ishes-heading text-ishes-blue">Aperçu des Ventes</h3>
          <p className="text-xs md:text-sm font-medium text-gray-400 mt-1">
            Visualisation interactive de vos revenus annuels. Survolez la courbe pour plus de détails.
          </p>
        </div>
        
        {/* Clean Legend - Replaces old hover box */}
        <div className="flex items-center gap-6 self-start sm:self-center bg-white/50 px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#008953]"></span>
            <span className="text-[11px] font-black uppercase text-ishes-dark tracking-widest">Présentiel</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B365D]"></span>
            <span className="text-[11px] font-black uppercase text-ishes-dark tracking-widest">Distanciel</span>
          </div>
        </div>
      </div>

      {/* Interactive Tooltip on Hover */}
      {hoveredIndex !== null && (
        <div className="absolute z-10 top-0 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl p-3 border border-gray-100 flex gap-4 pointer-events-none transition-all">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider mb-1">{monthlyData[hoveredIndex].month}</span>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-[#008953] font-bold">Présentiel</span>
                <span className="text-sm font-black">{monthlyData[hoveredIndex].presentiel.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="w-px bg-gray-100"></div>
              <div className="flex flex-col">
                <span className="text-[9px] text-[#1B365D] font-bold">Distanciel</span>
                <span className="text-sm font-black">{monthlyData[hoveredIndex].distanciel.toLocaleString('fr-FR')} €</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SVG Graphic wrapper */}
      <div className="relative w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[800px] relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Gradients for area fills */}
              <linearGradient id="chartAreaGradientPresentiel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008953" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#008953" stopOpacity="0.00" />
              </linearGradient>

              <linearGradient id="chartAreaGradientDistanciel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B365D" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1B365D" stopOpacity="0.00" />
              </linearGradient>

              {/* Drop shadows for active dots */}
              <filter id="dotGlowPresentiel" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#008953" floodOpacity="0.4" />
              </filter>
              <filter id="dotGlowDistanciel" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1B365D" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = paddingTop + chartH * pct;
              const val = maxVal - maxVal * pct;
              return (
                <g key={idx} className="opacity-40">
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={svgWidth - paddingRight}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 6"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 12}
                    y={y + 4}
                    textAnchor="end"
                    className="text-[9px] font-black fill-gray-400"
                  >
                    {formatRevenue(val)}
                  </text>
                </g>
              );
            })}

            {/* Area Fills */}
            {presentielAreaPath && <path d={presentielAreaPath} fill="url(#chartAreaGradientPresentiel)" />}
            {distancielAreaPath && <path d={distancielAreaPath} fill="url(#chartAreaGradientDistanciel)" />}

            {/* Spline Lines */}
            {distancielPath && (
              <path
                d={distancielPath}
                fill="none"
                stroke="#1B365D"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            {presentielPath && (
              <path
                d={presentielPath}
                fill="none"
                stroke="#008953"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Vertical Hover Guide & Highlighted Points */}
            {presentielPoints.map((pt, idx) => {
              const isActive = hoveredIndex === idx;
              const distPt = distancielPoints[idx];

              return (
                <g key={idx}>
                  {/* Vertical hover line */}
                  {isActive && (
                    <line
                      x1={pt.x}
                      y1={paddingTop}
                      x2={pt.x}
                      y2={paddingTop + chartH}
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="opacity-50"
                    />
                  )}

                  {/* Distanciel Dot */}
                  <circle
                    cx={distPt.x}
                    cy={distPt.y}
                    r={isActive ? 6 : 4}
                    className="transition-all duration-200"
                    fill={isActive ? "#1B365D" : "#FFFFFF"}
                    stroke="#1B365D"
                    strokeWidth={isActive ? 3 : 2.5}
                    filter={isActive ? "url(#dotGlowDistanciel)" : undefined}
                  />

                  {/* Presentiel Dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 6 : 4}
                    className="transition-all duration-200"
                    fill={isActive ? "#008953" : "#FFFFFF"}
                    stroke="#008953"
                    strokeWidth={isActive ? 3 : 2.5}
                    filter={isActive ? "url(#dotGlowPresentiel)" : undefined}
                  />

                  {/* X-Axis labels */}
                  <text
                    x={pt.x}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    className={`text-[10px] font-black uppercase transition-all duration-200 ${
                      isActive ? "fill-ishes-dark scale-105" : "fill-gray-400"
                    }`}
                  >
                    {pt.month}
                  </text>

                  {/* Invisible broad interactive hover column */}
                  <rect
                    x={pt.x - chartW / 22}
                    y={paddingTop}
                    width={chartW / 11}
                    height={chartH}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
