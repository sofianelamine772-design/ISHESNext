"use client";

import { useState } from "react";

interface SalesChartProps {
  monthlyData: { month: string; value: number }[];
}

export function SalesChart({ monthlyData }: SalesChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxVal = Math.max(...monthlyData.map(d => d.value), 1);
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 35;
  
  const svgWidth = 800;
  const svgHeight = 220;
  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;

  const points = monthlyData.map((item, index) => {
    const x = paddingLeft + (index / 11) * chartW;
    const y = paddingTop + chartH - (item.value / maxVal) * chartH;
    return { x, y, month: item.month, value: item.value };
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

  const linePath = getSymmetricBezierPath(points);
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartH} L ${points[0].x} ${paddingTop + chartH} Z`
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
          <h3 className="text-xl md:text-2xl ishes-heading text-ishes-dark">Aperçu des Ventes</h3>
          <p className="text-xs md:text-sm font-medium text-gray-400 mt-1">
            Visualisation interactive de vos revenus annuels. Survolez la courbe pour plus de détails.
          </p>
        </div>
        {hoveredIndex !== null && (
          <div className="bg-ishes-green/5 border border-ishes-green/20 rounded-2xl px-5 py-2.5 flex items-center gap-3 animate-fade-in self-start sm:self-center">
            <span className="text-[10px] font-black uppercase text-ishes-green tracking-widest">
              {monthlyData[hoveredIndex].month}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-ishes-green"></span>
            <span className="text-lg font-black text-ishes-dark">
              {monthlyData[hoveredIndex].value.toLocaleString()} €
            </span>
          </div>
        )}
      </div>

      {/* SVG Graphic wrapper */}
      <div className="relative w-full overflow-x-auto custom-scrollbar pb-2">
        <div className="min-w-[760px] relative">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              {/* Gradient for area fill */}
              <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008953" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#008953" stopOpacity="0.00" />
              </linearGradient>

              {/* Drop shadow for active dot */}
              <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#008953" floodOpacity="0.3" />
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
                    className="text-[9px] font-black fill-gray-400 font-mono"
                  >
                    {formatRevenue(val)}
                  </text>
                </g>
              );
            })}

            {/* Gradient Area Fill */}
            {areaPath && (
              <path d={areaPath} fill="url(#chartAreaGradient)" />
            )}

            {/* Glowing Spline Line */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="#008953"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Vertical Hover Guide & Highlighted Point */}
            {points.map((pt, idx) => {
              const isActive = hoveredIndex === idx;
              return (
                <g key={idx}>
                  {/* Vertical hover line */}
                  {isActive && (
                    <line
                      x1={pt.x}
                      y1={paddingTop}
                      x2={pt.x}
                      y2={paddingTop + chartH}
                      stroke="#008953"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      className="opacity-60"
                    />
                  )}

                  {/* Standard dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 6 : 4}
                    className="transition-all duration-200"
                    fill={isActive ? "#008953" : "#FFFFFF"}
                    stroke="#008953"
                    strokeWidth={isActive ? 3 : 2.5}
                    filter={isActive ? "url(#dotGlow)" : undefined}
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
