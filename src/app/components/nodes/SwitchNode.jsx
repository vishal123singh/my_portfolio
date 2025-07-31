"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListTree,
  ChevronUp,
  ChevronDown,
  Copy,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SwitchNode({ id, data, isConnectable }) {
  const [cases, setCases] = useState(data?.cases || []);
  const [defaultCase, setDefaultCase] = useState(data?.defaultCase || "");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDynamic, setIsDynamic] = useState(data?.isDynamic || false);
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);

  const hasInputs = data?.inputs && Object.keys(data.inputs).length > 0;
  const executedCase = data?.executedCase || "";

  useEffect(() => {
    if (data?.cases) setCases(data.cases);
    if (data?.defaultCase) setDefaultCase(data.defaultCase);
    if (typeof data?.isDynamic === "boolean") setIsDynamic(data.isDynamic);
  }, [data]);

  // 🔁 Dynamic generation on every run
  useEffect(() => {
    const generateDynamicCases = async () => {
      if (!isDynamic || !prompt.trim()) return;

      setIsLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 500));
        const generated = ["Admin", "User", "Guest"];
        setCases(generated);
        data?.onUpdateNode?.(id, { cases: generated });
      } catch {
        toast.error("Failed to generate dynamic cases.");
      } finally {
        setIsLoading(false);
      }
    };

    generateDynamicCases();
  }, [data?.inputs, isDynamic]);

  const handleGenerateCases = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt is required");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); // mock delay

      const mockCases = ["Admin", "User", "Guest"];
      setCases(mockCases);
      data?.onUpdateNode?.(id, { cases: mockCases });
      toast.success("Cases generated!");
    } catch (err) {
      toast.error("Failed to generate cases.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(cases, null, 2));
    toast.success("Cases copied");
  }, [cases]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative w-fit group"
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
              <h3 className="text-gray-200">Inputs</h3>
              <button
                onClick={() => setShowInputs(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(data.inputs).map(([key, value]) => (
                <div key={key} className="mb-3 last:mb-0">
                  <div className="text-gray-400 mb-1 font-medium">{key}</div>
                  <pre className="text-blue-400 font-mono text-xs whitespace-pre-wrap break-words bg-gray-900/50 p-2 rounded">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OUTPUT PANEL */}
      <AnimatePresence>
        {showOutputs && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[-240px] top-0 w-[220px] bg-gray-800 border border-gray-700 rounded-md p-3 text-xs shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-200">Executed Case</h3>
              <button
                onClick={() => setShowOutputs(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm text-green-400 font-mono">
              {executedCase || "No case executed"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NODE BOX */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80">
        <motion.div
          animate={{ opacity: 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl blur-[6px] pointer-events-none"
        />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl" />

        <div className="relative z-10 flex items-start gap-3">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg shadow-md">
            <ListTree className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 mb-2">
              Switch Node
            </h3>

            {/* Prompt Input */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="Describe switch logic to generate cases..."
              className="w-full mb-2 px-3 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded resize-none"
            />

            {/* Generate Button */}
            <Button
              onClick={handleGenerateCases}
              className="w-full text-xs mb-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-1" />
                  Generate Cases
                </>
              )}
            </Button>

            {/* Dynamic Toggle */}
            <label className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={isDynamic}
                onChange={(e) => {
                  setIsDynamic(e.target.checked);
                  data?.onUpdateNode?.(id, { isDynamic: e.target.checked });
                }}
                className="form-checkbox accent-blue-500"
              />
              <span>Generate dynamically on each run</span>
            </label>

            {/* Display Generated Cases */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 max-h-40 overflow-y-auto text-xs">
              {cases.length > 0 ? (
                <ul className="space-y-1">
                  {cases.map((c, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500">No cases yet</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-3 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={() => setShowInputs(!showInputs)}
                  className="text-xs text-gray-200 hover:text-blue-400 flex items-center gap-1"
                >
                  {showInputs ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  Inputs
                </button>
              )}
              <button
                onClick={() => setShowOutputs(!showOutputs)}
                className="text-xs text-gray-200 hover:text-indigo-400 flex items-center gap-1"
              >
                {showOutputs ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                Output
              </button>
              <button
                onClick={handleCopy}
                className="text-xs text-gray-400 hover:text-gray-200"
                title="Copy Cases"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Handles */}
        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-blue-600 border-2 border-gray-800"
        />
        {cases.map((c, i) => (
          <Handle
            key={`case-${c}`}
            type="source"
            position={Position.Right}
            id={`case-${c.replace(/\s+/g, "-").toLowerCase()}`}
            isConnectable={isConnectable}
            style={{ top: `${40 + i * 22}px` }}
          />
        ))}
        {defaultCase && (
          <Handle
            type="source"
            position={Position.Bottom}
            id="default-case"
            isConnectable={isConnectable}
            className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 border-2 border-gray-800"
          />
        )}
      </div>
    </motion.div>
  );
}
