"use client";

import { useEffect, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Split,
  Copy,
  Zap,
  ChevronDown,
  ChevronUp,
  TestTube2,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function IfElseNode({ id, data, isConnectable }) {
  const [condition, setCondition] = useState(data?.condition || "");
  const [inputs, setInputs] = useState(data?.inputs || {});
  const [outputPath, setOutputPath] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDynamic, setIsDynamic] = useState(data?.isDynamic ?? false);
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputPanel, setShowOutputPanel] = useState(false);

  const safeInputs =
    typeof inputs === "object" && inputs !== null ? inputs : {};
  const hasInputs = Object.keys(safeInputs).length > 0;

  const evaluateCondition = useCallback((expr, inputData) => {
    try {
      const func = new Function(
        "input",
        `try { return ${expr}; } catch { return false; }`
      );
      return func(inputData);
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const runEvaluation = async () => {
      let currentCondition = condition;

      if (isDynamic && prompt.trim()) {
        // Simulate API call
        await new Promise((res) => setTimeout(res, 500));
        currentCondition = "input.value > 10 && input.status === 'active'";
        setCondition(currentCondition);
        data?.onUpdateNode?.(id, { condition: currentCondition });
      }

      const result = evaluateCondition(currentCondition, safeInputs);
      setOutputPath(result ? "true" : "false");
      data?.onConditionChange?.(id, currentCondition, result);
    };

    runEvaluation();
  }, [inputs, condition, isDynamic]);

  useEffect(() => {
    if (data?.condition) setCondition(data.condition);
    if (data?.inputs) setInputs(data.inputs);
    if (typeof data?.isDynamic === "boolean") setIsDynamic(data.isDynamic);
  }, [data]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt is required");
      return;
    }
    setIsGenerating(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const mockCondition = "input.value > 10 && input.status === 'active'";
      setCondition(mockCondition);
      data?.onUpdateNode?.(id, { condition: mockCondition });
      toast.success("Condition generated!");
    } catch {
      toast.error("Failed to generate condition");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCondition = useCallback(() => {
    navigator.clipboard.writeText(condition);
    toast.success("Condition copied");
  }, [condition]);

  const testCondition = useCallback(() => {
    const testInput = safeInputs;
    const res = evaluateCondition(condition, testInput);
    toast.success(`Test result: ${res ? "TRUE" : "FALSE"}`);
  }, [condition, safeInputs, evaluateCondition]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative max-w-[28rem] group"
    >
      {/* INPUT PANEL */}
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
              <h3 className="text-gray-400">Inputs</h3>
              <button
                onClick={() => setShowInputs(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(safeInputs).map(([k, v]) => (
                <div key={k} className="mb-3 last:mb-0">
                  <div className="text-gray-400 mb-1 font-medium">{k}</div>
                  <pre className="text-purple-400 font-mono text-xs whitespace-pre-wrap break-words bg-gray-900/50 p-2 rounded">
                    {JSON.stringify(v, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OUTPUT PANEL */}
      <AnimatePresence>
        {showOutputPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[-220px] top-0 w-[200px] bg-gray-800 border border-gray-700 rounded-md p-3 text-xs shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-200">Evaluation Output</h3>
              <button
                onClick={() => setShowOutputPanel(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm font-mono">
              {outputPath === null ? (
                "Not evaluated yet"
              ) : outputPath === "true" ? (
                <span className="text-green-400">TRUE</span>
              ) : (
                <span className="text-red-400">FALSE</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NODE UI */}
      <div className="relative max-w-[28rem] bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        <motion.div
          animate={{ opacity: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-[6px] pointer-events-none"
        />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow-md">
            <Split className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-2">
              Conditional Branch
            </h3>

            {/* Prompt Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Describe logic to generate condition..."
              className="w-full mb-2 px-3 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded resize-none font-mono"
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full mb-2 px-3 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs flex items-center justify-center gap-1"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {isGenerating ? "Generating…" : "Generate Condition"}
            </button>

            {/* Dynamic Toggle */}
            <label className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={isDynamic}
                onChange={(e) => {
                  setIsDynamic(e.target.checked);
                  data?.onUpdateNode?.(id, { isDynamic: e.target.checked });
                }}
                className="form-checkbox accent-pink-500"
              />
              <span>Generate dynamically on each run</span>
            </label>

            {/* Current Condition */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 font-mono text-xs">
              {condition || "No condition yet"}
            </div>

            {/* Toolbar */}
            <div className="mt-3 flex justify-between items-center text-xs">
              <button
                onClick={copyCondition}
                className="text-gray-400 hover:text-gray-200"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={testCondition}
                className="text-gray-400 hover:text-pink-300 flex items-center gap-1"
              >
                <TestTube2 className="w-4 h-4" /> Test
              </button>
              <button
                onClick={() => setShowInputs(!showInputs)}
                className="text-gray-200 hover:text-purple-400 flex items-center gap-1"
              >
                {showInputs ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
                Inputs
              </button>
              <button
                onClick={() => setShowOutputPanel(!showOutputPanel)}
                className="text-gray-200 hover:text-pink-400 flex items-center gap-1"
              >
                {showOutputPanel ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                Output
              </button>
            </div>
          </div>
        </div>

        {/* React Flow Handles */}
        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 border-2"
        />
        <Handle
          type="source"
          id="true"
          position={Position.Right}
          isConnectable={isConnectable}
          style={{ top: "30%" }}
          className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 border-2"
        />
        <Handle
          type="source"
          id="false"
          position={Position.Right}
          isConnectable={isConnectable}
          style={{ top: "70%" }}
          className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 border-2"
        />
      </div>
    </motion.div>
  );
}
