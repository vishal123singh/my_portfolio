"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  RefreshCw,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Trash2,
  Gauge,
  Sparkles,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function AILoopNode({ id, data, isConnectable }) {
  // State
  const [input, setInput] = useState(data?.input || "");
  const [output, setOutput] = useState(data?.output || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({
    basic: false,
    settings: false,
  });
  const [showHistory, setShowHistory] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [config, setConfig] = useState({
    threshold: 80,
    maxRetries: 3,
    strategy: "improvePrompt",
    model: "gpt-4-turbo",
  });
  const [attempts, setAttempts] = useState(data?.attempts || []);

  // Syncing with external data
  useEffect(() => {
    if (data?.input) setInput(data.input);
    if (data?.output) setOutput(data.output);
    if (data?.attempts) setAttempts(data.attempts);
  }, [data?.input, data?.output, data?.attempts]);

  // Core AI Loop Logic
  const runAILoop = useCallback(async () => {
    if (!input.trim()) {
      setError("Input cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    let currentInput = input;
    let currentAttempts = [];

    try {
      for (let i = 0; i < config.maxRetries; i++) {
        // Mock LLM call - replace with your actual API
        const response = await mockLLMCall(currentInput, config.model);
        const score = evaluateOutput(response); // Your evaluation function

        currentAttempts.push({
          output: response,
          score,
          model: config.model,
          attempt: i + 1,
        });
        setAttempts([...currentAttempts]);

        if (score >= config.threshold) {
          setOutput(response);
          data?.onUpdateNode?.(id, {
            output: response,
            attempts: currentAttempts,
          });
          data?.onSendData?.({ output: response });
          toast.success(`Completed after ${i + 1} attempts`);
          break;
        }

        // Apply retry strategy
        switch (config.strategy) {
          case "improvePrompt":
            currentInput = `Improve this (score: ${score}):\n${response}`;
            break;
          case "switchModel":
            // Your model switching logic
            break;
        }
      }
    } catch (err) {
      setError(err.message);
      toast.error("AI Loop failed");
    } finally {
      setLoading(false);
    }
  }, [input, config, id, data]);

  // UI Components
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
      {/* Node Container */}
      <div className="relative bg-gray-800 border border-purple-700 rounded-xl shadow-xl p-4 w-96 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-md">
            <RefreshCw className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                Self-Improvement Loop
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setEditing((p) => ({ ...p, settings: !p.settings }))
                  }
                  className={`text-gray-400 hover:text-purple-300 ${
                    editing.settings ? "text-purple-400" : ""
                  }`}
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => data?.onDeleteNode?.(id)}
                  className="text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Input/Output Sections */}
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5">Input:</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white"
                  placeholder="Initial prompt..."
                  rows={3}
                />
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {editing.settings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 overflow-hidden"
                  >
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">
                      Loop Configuration
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Quality Threshold:
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={config.threshold}
                          onChange={(e) =>
                            setConfig((c) => ({
                              ...c,
                              threshold: e.target.value,
                            }))
                          }
                          className="w-24"
                        />
                        <span className="text-xs w-8 text-right">
                          {config.threshold}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Max Retries:
                        </label>
                        <select
                          value={config.maxRetries}
                          onChange={(e) =>
                            setConfig((c) => ({
                              ...c,
                              maxRetries: e.target.value,
                            }))
                          }
                          className="bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded"
                        >
                          {[1, 3, 5, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Strategy:
                        </label>
                        <select
                          value={config.strategy}
                          onChange={(e) =>
                            setConfig((c) => ({
                              ...c,
                              strategy: e.target.value,
                            }))
                          }
                          className="bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded"
                        >
                          <option value="improvePrompt">Improve Prompt</option>
                          <option value="switchModel">Switch Model</option>
                          <option value="adjustParams">
                            Adjust Parameters
                          </option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Attempt History */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Attempt History ({attempts.length})
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      showHistory ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {showHistory && attempts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-2 overflow-hidden"
                    >
                      {attempts.map((attempt, i) => (
                        <div
                          key={i}
                          className="p-2 bg-gray-800/50 rounded border-l-2 border-purple-500/50"
                        >
                          <div className="flex justify-between text-xs">
                            <span className="text-purple-400">
                              Attempt #{attempt.attempt}
                            </span>
                            <span
                              className={`font-mono ${
                                attempt.score >= config.threshold
                                  ? "text-green-400"
                                  : "text-amber-400"
                              }`}
                            >
                              Score: {attempt.score}
                            </span>
                          </div>
                          <div className="text-xs text-gray-300 mt-1 line-clamp-2">
                            {attempt.output}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Final Output Preview */}
              {output && (
                <div className="bg-gray-900/50 border border-green-700/50 rounded-lg p-2">
                  <div className="text-xs text-gray-400 mb-1">
                    Optimized Output:
                  </div>
                  <div className="text-sm text-gray-200 line-clamp-3">
                    {output}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={runAILoop}
                disabled={loading}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
              >
                {loading ? (
                  <Gauge className="w-4 h-4 animate-spin" />
                ) : (
                  <Cpu className="w-4 h-4" />
                )}
                {loading ? "Processing..." : "Run Loop"}
              </motion.button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2 bg-red-900/20 border border-red-700 rounded p-2 text-xs text-red-400">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Handles */}
        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30"
        />
      </div>
    </motion.div>
  );
}

// Mock functions - replace with real implementations
async function mockLLMCall(prompt, model) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `Improved output for: ${prompt}`;
}

function evaluateOutput(output) {
  // Simulate scoring
  return Math.min(100, Math.floor(Math.random() * 30) + 70);
}
