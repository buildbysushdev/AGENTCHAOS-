"use client";

import React, { useState } from "react";
import { GitBranch, Copy, Check, X, Download } from "lucide-react";

interface CicdExporterProps {
  yamlContent: string;
  filename: string;
  onClose: () => void;
}

export default function CicdExporter({ yamlContent, filename, onClose }: CicdExporterProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([yamlContent], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-3xl w-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-100">GitHub Actions CI/CD Integration</h2>
              <p className="text-xs text-zinc-400">
                Automated pre-deploy AI red-teaming workflow configuration.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-code">
            <span>.github/workflows/{filename}</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-zinc-200 flex items-center gap-1 font-sans text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy YAML"}
              </button>
              <button
                onClick={handleDownload}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center gap-1 font-sans text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" /> Download File
              </button>
            </div>
          </div>

          <pre className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 font-mono-code text-xs text-zinc-300 overflow-auto max-h-[380px] leading-relaxed">
            {yamlContent}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
