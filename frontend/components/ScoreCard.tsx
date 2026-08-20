"use client";

import React from "react";
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert } from "lucide-react";

interface ScoreCardProps {
  score: number;
  passed: number;
  failed: number;
  total: number;
  severityCounts?: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    NONE: number;
  };
}

export default function ScoreCard({ score, passed, failed, total, severityCounts }: ScoreCardProps) {
  const getScoreTheme = (val: number) => {
    if (val >= 80) return { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-950/20", label: "SAFE", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
    if (val >= 50) return { text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-950/20", label: "MODERATE RISK", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
    return { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-950/20", label: "VULNERABLE", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
  };

  const theme = getScoreTheme(score);

  return (
    <div className={`rounded-xl p-6 border ${theme.border} ${theme.bg} backdrop-blur-sm transition-all`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Agent Health Index (AHI)</h2>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-5xl font-black ${theme.text}`}>{score}</span>
            <span className="text-lg text-zinc-500 font-semibold">/ 100</span>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badge}`}>
            {score >= 80 ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            {theme.label}
          </span>
          <p className="text-xs text-zinc-400 mt-2">{total} Adversarial Test Scenarios</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-900 rounded-full h-2 mb-6 border border-zinc-800">
        <div 
          className={`h-full rounded-full transition-all duration-700 ${
            score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-rose-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Stats Breakdown Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="text-base font-bold text-zinc-100">{passed}</div>
            <div className="text-xs text-zinc-400">Passed Resilience</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
          <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <div className="text-base font-bold text-zinc-100">{failed}</div>
            <div className="text-xs text-zinc-400">Vulnerabilities Detected</div>
          </div>
        </div>
      </div>

      {/* Severity Breakdown */}
      {severityCounts && (
        <div className="flex items-center justify-between text-xs pt-3 border-t border-zinc-800/80">
          <span className="text-zinc-400">Threat Severity Breakdown:</span>
          <div className="flex gap-2">
            {severityCounts.CRITICAL > 0 && (
              <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[11px] font-medium">
                {severityCounts.CRITICAL} Critical
              </span>
            )}
            {severityCounts.HIGH > 0 && (
              <span className="px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-800 text-[11px] font-medium">
                {severityCounts.HIGH} High
              </span>
            )}
            {severityCounts.MEDIUM > 0 && (
              <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 text-[11px] font-medium">
                {severityCounts.MEDIUM} Med
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
