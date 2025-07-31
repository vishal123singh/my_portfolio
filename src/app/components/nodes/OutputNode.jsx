"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  Download,
  Expand,
  Shrink,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function OutputNode({ id, data, isConnectable }) {
  // State management
  const [output, setOutput] = useState(data?.output || null);
  const [inputs, setInputs] = useState(data?.inputs || {});
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRaw, setShowRaw] = useState(false);
  const [activeTab, setActiveTab] = useState("output");

  // React to external changes
  useEffect(() => {
    if (data?.output) setOutput(data.output);
    if (data?.inputs) setInputs(data.inputs);
  }, [data]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const copyToClipboard = useCallback(() => {
    const content = activeTab === "output" ? output : inputs;
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    toast.success("Copied to clipboard!");
  }, [activeTab, output, inputs]);

  const downloadOutput = useCallback(() => {
    const content = activeTab === "output" ? output : inputs;
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [activeTab, output, inputs]);

  const renderDataBlock = (content) => {
    if (!content) return null;

    const stringContent =
      typeof content === "string" ? content : JSON.stringify(content, null, 2);

    return (
      <div
        className={`bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-gray-200 text-sm whitespace-pre-wrap break-words ${
          isExpanded ? "h-[300px]" : "h-[120px]"
        } overflow-auto custom-scrollbar`}
      >
        {stringContent}
      </div>
    );
  };

  const hasInputs = Object.keys(inputs).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      //whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative w-fit group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Input Data Panel */}
      <AnimatePresence>
        {showInputs && hasInputs && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-[-220px] top-0 w-[200px] bg-gray-800 border border-gray-700 rounded-md p-3 text-xs shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-400">Input Details</h3>
              <button
                onClick={() => setShowInputs(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key} className="mb-3 last:mb-0">
                  <div className="text-gray-400 mb-1 font-medium">{key}</div>
                  <pre className="text-green-400 font-mono text-xs whitespace-pre-wrap break-words bg-gray-900/50 p-2 rounded">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Container */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg shadow-md">
            <Terminal className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                Output Node
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadOutput}
                  className="text-gray-400 hover:text-emerald-300 transition-colors"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mt-3">
              <button
                onClick={() => setActiveTab("output")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "output"
                    ? "text-green-400 border-b-2 border-green-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Output
              </button>
              {hasInputs && (
                <button
                  onClick={() => setActiveTab("inputs")}
                  className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                    activeTab === "inputs"
                      ? "text-green-400 border-b-2 border-green-500"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Inputs
                </button>
              )}
            </div>

            {/* Content */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1.5">
                <div className="text-xs text-gray-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                  {activeTab === "output" ? "Final Output" : "Node Inputs"}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRaw(!showRaw)}
                    className="text-xs text-gray-500 hover:text-emerald-400 flex items-center gap-1"
                    title={showRaw ? "Show formatted" : "Show raw"}
                  >
                    {showRaw ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-gray-500 hover:text-emerald-400 flex items-center gap-1"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <Shrink className="w-3 h-3" />
                    ) : (
                      <Expand className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {activeTab === "output"
                ? renderDataBlock(
                    showRaw ? output : JSON.stringify(output, null, 2)
                  )
                : renderDataBlock(
                    showRaw ? inputs : JSON.stringify(inputs, null, 2)
                  )}

              {!output && activeTab === "output" && (
                <div className="text-center text-gray-500 text-xs py-4">
                  No output data received yet
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={() => setShowInputs(!showInputs)}
                  className="text-xs text-gray-500 hover:text-green-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
                >
                  {showInputs ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  Input Details
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Handle */}
        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-green-500/30 transition-all"
        />
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 2px;
        }
      `}</style>
    </motion.div>
  );
}
