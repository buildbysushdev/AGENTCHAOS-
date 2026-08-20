"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, AlertCircle, ShieldAlert, Cpu, Terminal, Flame } from "lucide-react";

interface FailureTimelineProps {
  results: any[];
  onSelectScenarioForGraph?: (trace: any) => void;
}

export default function FailureTimeline({ results, onSelectScenarioForGraph }: FailureTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-rose-950/80 text-rose-300 border border-rose-800 font-medium";
      case "HIGH":
        return "bg-orange-950/80 text-orange-300 border border-orange-800 font-medium";
      case "MEDIUM":
        return "bg-amber-950/80 text-amber-300 border border-amber-800 font-medium";
      default:
        return "bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-medium";
    }
  };

  const getAttackIcon = (type: string) => {
    switch (type) {
      case "DESTRUCTIVE_ACTION": return <Flame className="w-4 h-4 text-rose-400" />;
      case "GASLIGHTING": return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case "TOOL_LOOP": return <Cpu className="w-4 h-4 text-zinc-400" />;
      default: return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-zinc-900/60 rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <h3 className="font-semibold text-base text-zinc-100">Red-Team Attack Scenarios & Timeline</h3>
        </div>
        <span className="text-xs text-zinc-500">{results.length} Scenarios Executed</span>
      </div>

      <div className="space-y-3">
        {results.map((res: any, idx: number) => {
          const isPass = res.classification.status === "PASS";
          const isExpanded = expandedIndex === idx;
          const attackType = res.scenario.attack_type || "UNKNOWN";
          const severity = res.classification.severity || "NONE";

          return (
            <div
              key={idx}
              className={`rounded-lg border transition-all overflow-hidden ${
                isPass 
                  ? "bg-zinc-950/60 border-emerald-500/20 hover:border-emerald-500/40" 
                  : "bg-zinc-950/60 border-rose-500/20 hover:border-rose-500/40"
              }`}
            >
              {/* Timeline Header Row */}
              <div
                onClick={() => toggleExpand(idx)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
                  {isPass ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  )}

                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
                      {getAttackIcon(attackType)}
                      {attackType}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono-code">({res.scenario.scenario_id})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[11px] ${getSeverityBadge(severity)}`}>
                    {severity}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  )}
                </div>
              </div>

              {/* Expandable Trace Drawer */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-3 border-t border-zinc-800/60 bg-black/40 space-y-3">
                  <div>
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Adversarial User Input</span>
                    <p className="text-xs font-mono-code text-zinc-300 bg-zinc-900 p-3 rounded border border-zinc-800 mt-1">
                      {res.scenario.user_message}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wider">Expected Safe Behavior</span>
                    <p className="text-xs text-zinc-400 mt-0.5">{res.scenario.expected_safe_behavior}</p>
                  </div>

                  {res.classification.failure_modes.length > 0 && (
                    <div>
                      <span className="text-[11px] font-medium text-rose-400 uppercase tracking-wider">Detected Vulnerabilities</span>
                      <div className="space-y-1.5 mt-1">
                        {res.classification.failure_modes.map((fm: any, fIdx: number) => (
                          <div key={fIdx} className="bg-rose-950/30 border border-rose-900/50 p-2.5 rounded text-xs">
                            <span className="font-semibold text-rose-300">{fm.type}: </span>
                            <span className="text-zinc-300">{fm.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Evaluator Reasoning</span>
                    <p className="text-xs text-zinc-400 italic mt-0.5">{res.classification.reasoning}</p>
                  </div>

                  {/* Visual Trace Graph Trigger Button */}
                  {onSelectScenarioForGraph && (
                    <div className="pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectScenarioForGraph(res.trace);
                        }}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-xs font-medium text-zinc-200 transition-all flex items-center gap-1.5"
                      >
                        <Cpu className="w-3.5 h-3.5 text-blue-400" /> Visualize Node Execution Graph
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
