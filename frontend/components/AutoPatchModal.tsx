"use client";

import React, { useState } from "react";
import { Wrench, Copy, Check, Sparkles, X, ShieldCheck } from "lucide-react";

interface AutoPatchModalProps {
  originalPrompt: string;
  patchedPrompt: string;
  fixesCount: number;
  onClose: () => void;
  onApplyPatchedPrompt: (newPrompt: string) => void;
}

export default function AutoPatchModal({
  originalPrompt,
  patchedPrompt,
  fixesCount,
  onClose,
  onApplyPatchedPrompt,
}: AutoPatchModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(patchedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                Auto-Patched System Prompt <Sparkles className="w-4 h-4 text-emerald-400" />
              </h2>
              <p className="text-xs text-zinc-400">
                Applied {fixesCount} automated safety guardrails for detected threat vectors.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-800/60 hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content: Side-by-side prompt comparison */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1 font-mono-code text-xs">
          {/* Original Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-sans font-medium text-xs">
              <span>Original Vulnerable Prompt</span>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 text-zinc-400 whitespace-pre-wrap leading-relaxed h-[360px] overflow-auto">
              {originalPrompt}
            </div>
          </div>

          {/* Hardened Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-emerald-400 font-sans font-medium text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Hardened Safety Prompt
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-sans text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Text"}
              </button>
            </div>
            <div className="bg-zinc-950 p-4 rounded-lg border border-emerald-500/30 text-emerald-200/90 whitespace-pre-wrap leading-relaxed h-[360px] overflow-auto">
              {patchedPrompt}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <span className="text-xs text-zinc-500 font-sans">
            Ready for live re-testing with updated prompt guardrails.
          </span>
          <div className="flex gap-2.5 font-sans text-xs">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg font-medium"
            >
              Dismiss
            </button>
            <button
              onClick={() => {
                onApplyPatchedPrompt(patchedPrompt);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> Apply Patched Prompt to Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
