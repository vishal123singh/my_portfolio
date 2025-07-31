"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gauge,
  Trash2,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Star,
  AlertCircle,
  Plus,
  Loader2,
  X,
} from "lucide-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getMappedValues from "@/app/utils/targetNodeInputSchemaAndValidation";

export default function EvaluationNode({ id, data, isConnectable }) {
  const [input, setInput] = useState("");
  const [criteria, setCriteria] = useState([
    { name: "Accuracy", weight: 0.3, score: 0 },
    { name: "Relevance", weight: 0.25, score: 0 },
    { name: "Clarity", weight: 0.2, score: 0 },
    { name: "Creativity", weight: 0.15, score: 0 },
    { name: "Usefulness", weight: 0.1, score: 0 },
  ]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({
    basic: false,
    settings: false,
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate overall score
  const overallScore = useMemo(() => {
    return criteria
      .reduce((sum, criterion) => {
        return sum + criterion.score * criterion.weight;
      }, 0)
      .toFixed(2);
  }, [criteria]);

  // Sync with external data
  useEffect(() => {
    if (data?.input) {
      const { sourceNodeType, inputs } = data;
      setInput(inputs);
    }
  }, [data?._version, data?.inputs]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ basic: false, settings: false });
    data?.onUpdateNode?.(id, { input, criteria, results });
  }, [data, id, input, criteria, results]);

  const evaluateContent = useCallback(async () => {
    if (!input) {
      setError("Please provide input to evaluate");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate evaluation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const evaluationResults = {
        score: overallScore,
        feedback:
          "This content meets most criteria but could improve in clarity and creativity.",
        strengths: [
          "High factual accuracy",
          "Relevant to target audience",
          "Well-structured presentation",
        ],
        weaknesses: [
          "Could be more innovative",
          "Some sections are overly technical",
        ],
        suggestions: [
          "Add more examples for clarity",
          "Include alternative perspectives",
        ],
      };

      setResults(evaluationResults);
      data?.onUpdateNode?.(id, { input, criteria, results: evaluationResults });
      data?.onSendData?.({ evaluation: evaluationResults });
      toast.success("Evaluation completed");
    } catch (err) {
      setError(err.message);
      toast.error("Evaluation failed");
    } finally {
      setLoading(false);
    }
  }, [input, criteria, overallScore, id, data]);

  const updateCriterionScore = useCallback((index, score) => {
    setCriteria((prev) => {
      const newCriteria = [...prev];
      newCriteria[index].score = parseFloat(score);
      return newCriteria;
    });
  }, []);

  const updateCriterionWeight = useCallback((index, weight) => {
    setCriteria((prev) => {
      const newCriteria = [...prev];
      newCriteria[index].weight = parseFloat(weight);
      return newCriteria;
    });
  }, []);

  const addCriterion = useCallback(() => {
    setCriteria((prev) => [
      ...prev,
      { name: "New Criterion", weight: 0.1, score: 0 },
    ]);
  }, []);

  const removeCriterion = useCallback((index) => {
    setCriteria((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearEvaluation = useCallback(() => {
    setInput("");
    setResults(null);
    setError("");
    setCriteria((prev) => prev.map((c) => ({ ...c, score: 0 })));
    data?.onUpdateNode?.(id, { input: "", results: null });
  }, [data, id]);

  const toggleInputsPanel = useCallback((e) => {
    e.stopPropagation();
    setShowInputs((prev) => !prev);
  }, []);

  const hasInputs = data?.inputs && Object.keys(data.inputs).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative w-[28rem] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inputs Panel */}
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
                onClick={toggleInputsPanel}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(data.inputs).map(([key, value]) => (
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
      <div className="w-[28rem] relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-2 rounded-lg shadow-md">
            <Gauge className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-300">
                Evaluation Node
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setEditing((prev) => ({
                      ...prev,
                      settings: !prev.settings,
                    }))
                  }
                  className={`text-gray-300 hover:text-purple-300 transition-colors ${
                    editing.settings ? "text-purple-400" : ""
                  }`}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Content to Evaluate */}
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1.5">
                Content to Evaluate:
              </div>
              {editing.basic ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none min-h-[60px]"
                  placeholder="Paste content to evaluate..."
                />
              ) : (
                <motion.div
                  whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-wrap cursor-pointer min-h-[60px]"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, basic: true }))
                  }
                >
                  {input || (
                    <span className="text-gray-500 italic">
                      Click to edit evaluation content...
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* Evaluation Criteria Settings */}
            <AnimatePresence>
              {editing.settings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs text-gray-400 font-medium">
                        Evaluation Criteria
                      </h4>
                      <button
                        onClick={addCriterion}
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    </div>

                    <div className="space-y-3">
                      {criteria.map((criterion, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={criterion.name}
                              onChange={(e) => {
                                const newCriteria = [...criteria];
                                newCriteria[index].name = e.target.value;
                                setCriteria(newCriteria);
                              }}
                              className="bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded flex-1 mr-2"
                            />
                            <button
                              onClick={() => removeCriterion(index)}
                              className="text-gray-500 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-400 w-16">Weight:</span>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={criterion.weight}
                              onChange={(e) =>
                                updateCriterionWeight(index, e.target.value)
                              }
                              className="flex-1 accent-purple-500"
                            />
                            <span className="text-purple-400 w-8 text-right">
                              {criterion.weight.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-400 w-16">Score:</span>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={criterion.score}
                              onChange={(e) =>
                                updateCriterionScore(index, e.target.value)
                              }
                              className="flex-1 accent-purple-500"
                            />
                            <span className="text-purple-400 w-8 text-right">
                              {criterion.score.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Display */}
            {results && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-400">
                    Evaluation Results:
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">
                      {overallScore}/1.0
                    </span>
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-xs space-y-2">
                  <div>
                    <div className="text-purple-400 font-medium">Feedback:</div>
                    <p className="text-gray-300">{results.feedback}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-green-400 font-medium">
                        Strengths:
                      </div>
                      <ul className="list-disc list-inside text-gray-300">
                        {results.strengths.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-red-400 font-medium">
                        Weaknesses:
                      </div>
                      <ul className="list-disc list-inside text-gray-300">
                        {results.weaknesses.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {results.suggestions && (
                    <div>
                      <div className="text-blue-400 font-medium">
                        Suggestions:
                      </div>
                      <ul className="list-disc list-inside text-gray-300">
                        {results.suggestions.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={() => setShowInputs(!showInputs)}
                  className="text-xs text-gray-500 hover:text-purple-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
                >
                  {showInputs ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                  Inputs
                </button>
              )}

              <div className="flex gap-2 ml-auto">
                {results && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={clearEvaluation}
                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </motion.button>
                )}
                {(editing.basic || editing.settings) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4 bg-dark-green" />
                    Save
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={evaluateContent}
                  disabled={loading || !input}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Gauge className="w-4 h-4" />
                  )}
                  {loading ? "Evaluating..." : "Evaluate"}
                </motion.button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2 bg-red-900/20 border border-red-700 rounded p-2 text-xs text-red-400 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
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
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-violet-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-violet-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
