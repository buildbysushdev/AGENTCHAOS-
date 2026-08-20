"use client";

import React from "react";
import { Cpu, ArrowRight, MessageSquare, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ExecutionGraphProps {
  trace: any;
  onClose?: () => void;
}

export default function ExecutionGraph({ trace, onClose }: ExecutionGraphProps) {
  if (!trace) return null;

  const steps = trace.steps || [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <h3 className="font-semibold text-zinc-100 text-base">Node Execution Flow</h3>
          <span className="text-xs bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded font-mono-code">
            {trace.scenario_id || "Trace View"}
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 bg-zinc-800 rounded border border-zinc-700 transition-colors"
          >
            Close Graph
          </button>
        )}
      </div>

      {/* Node Flow Diagram */}
      <div className="flex flex-col gap-4 overflow-x-auto py-2">
        {/* Node 0: User Input */}
        <div className="flex items-center gap-3">
          <div className="min-w-[220px] p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-blue-400 mb-1">
              <MessageSquare className="w-3.5 h-3.5" /> USER INPUT NODE
            </div>
            <p className="text-zinc-300 font-mono-code truncate">{trace.scenario_id}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
        </div>

        {/* Dynamic Step Nodes */}
        {steps.map((step: any, idx: number) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {/* Step / Thought Node */}
              <div className="min-w-[260px] max-w-[320px] p-3.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-zinc-300 font-medium">
                  <span>STEP {step.iteration || idx + 1}: LLM THOUGHT</span>
                  <span className="text-[10px] text-zinc-500 font-mono-code">Iter {step.iteration}</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed italic">
                  "{step.thought || "Processing assistant request..."}"
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />

              {/* Tool Execution Nodes */}
              {step.tool_calls && step.tool_calls.length > 0 ? (
                <div className="flex items-center gap-3">
                  {step.tool_calls.map((tc: any, tIdx: number) => (
                    <React.Fragment key={tIdx}>
                      <div className="min-w-[240px] p-3.5 rounded-lg bg-zinc-950 border border-amber-500/30 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-amber-400">
                          <Wrench className="w-3.5 h-3.5" /> TOOL: {tc.tool_name}
                        </div>
                        <pre className="text-[11px] font-mono-code text-amber-200/90 bg-black/40 p-2 rounded max-h-20 overflow-auto border border-zinc-800">
                          {typeof tc.arguments === "string" ? tc.arguments : JSON.stringify(tc.arguments)}
                        </pre>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}

        {/* Final Response Node */}
        <div className="flex items-center gap-3">
          <div className={`min-w-[260px] p-4 rounded-lg border text-xs ${
            trace.final_response 
              ? "bg-zinc-950 border-emerald-500/30" 
              : "bg-zinc-950 border-rose-500/30"
          }`}>
            <div className="flex items-center gap-1.5 font-semibold mb-1">
              {trace.final_response ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">FINAL ASSISTANT OUTPUT</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400">TERMINATED / EXHAUSTED</span>
                </>
              )}
            </div>
            <p className="text-zinc-300 font-mono-code text-xs max-h-24 overflow-auto">
              {trace.final_response || "Sandbox execution terminated without returning final response."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
