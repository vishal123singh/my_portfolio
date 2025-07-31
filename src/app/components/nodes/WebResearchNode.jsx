"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function WebResearchNode({ id, data, isConnectable }) {
  const [query, setQuery] = useState(data?.query || "");
  const [results, setResults] = useState(data?.results || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({
    basic: false,
    settings: false,
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchConfig, setSearchConfig] = useState({
    numResults: 5,
    summarize: true,
    recent: true,
  });

  // Keep internal state synced with external data
  useEffect(() => {
    if (data?.query) setQuery(data.query);
    if (data?.results) setResults(data.results);
  }, [data?.query, data?.results, data?._version]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ basic: false, settings: false });
    data?.onUpdateNode?.(id, { query, results });
  }, [data, id, query, results]);

  const performSearch = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/google-search?q=${encodeURIComponent(query)}`
      );
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Search failed");
      }

      const fetchedResults = json.results.slice(0, searchConfig.numResults);

      const resultsWithSummary = fetchedResults.map((item, i) => ({
        ...item,
        summary: searchConfig.summarize
          ? `Summary of result ${i + 1} about ${query}`
          : null,
      }));

      setResults(resultsWithSummary);
      data?.onUpdateNode?.(id, { query, results: resultsWithSummary });
      data?.onSendData?.({ results: resultsWithSummary });
      toast.success("Search completed");
    } catch (err) {
      setError(err.message);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  }, [query, searchConfig, id, data]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError("");
    data?.onUpdateNode?.(id, { query: "", results: [] });
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
      className="relative w-fit group"
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
      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-lg shadow-md">
            <Globe className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 flex-col items-start justify-between">
            {/* Header */}
            <div className="flex justify-between items-start mr-4">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Web Research
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
                  className={`text-gray-400 hover:text-amber-300 transition-colors ${
                    editing.settings ? "text-amber-400" : ""
                  }`}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
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

            {/* Search Input */}
            <div className="mt-3 mr-4">
              <div className="text-xs text-gray-400 mb-1.5">Search Query:</div>
              {editing.basic ? (
                <div className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter research topic..."
                  />
                </div>
              ) : (
                <motion.div
                  whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-wrap break-words overflow-hidden max-h-32 mb-2 overflow-y-auto cursor-pointer"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, basic: true }))
                  }
                >
                  {query || (
                    <span className="text-gray-500 italic">
                      Click to edit search query...
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
              {editing.settings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 mr-4 overflow-hidden"
                >
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">
                      Search Settings
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Number of results:
                        </label>
                        <select
                          value={searchConfig.numResults}
                          onChange={(e) =>
                            setSearchConfig({
                              ...searchConfig,
                              numResults: parseInt(e.target.value),
                            })
                          }
                          className="bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded"
                        >
                          {[3, 5, 10].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Summarize results:
                        </label>
                        <input
                          type="checkbox"
                          checked={searchConfig.summarize}
                          onChange={(e) =>
                            setSearchConfig({
                              ...searchConfig,
                              summarize: e.target.checked,
                            })
                          }
                          className="h-4 w-4 accent-amber-500"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-gray-400">
                          Recent results only:
                        </label>
                        <input
                          type="checkbox"
                          checked={searchConfig.recent}
                          onChange={(e) =>
                            setSearchConfig({
                              ...searchConfig,
                              recent: e.target.checked,
                            })
                          }
                          className="h-4 w-4 accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Preview */}
            {results.length ? (
              <div className="mr-4 bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-xs text-gray-300 max-h-40 overflow-y-auto space-y-2">
                {results.slice(0, 2).map((result, index) => (
                  <div key={index}>
                    <div className="text-amber-400 font-medium break-words">
                      {result.title}
                    </div>
                    <div className="text-gray-500 text-[11px] break-all">
                      {result.url}
                    </div>
                  </div>
                ))}
                {results.length > 2 && (
                  <div className="text-gray-500 text-xs mt-1">
                    + {results.length - 2} more results
                  </div>
                )}
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="mt-4 flex-1 justify-between items-center">
              {hasInputs && (
                <button
                  onClick={toggleInputsPanel}
                  className="mb-2 text-xs text-gray-500 hover:text-amber-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
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
                {(editing.basic || editing.settings) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={performSearch}
                  disabled={loading || !query}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {loading ? "Searching..." : "Search"}
                </motion.button>
              </div>
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
          className="w-3 h-3 bg-gradient-to-r from-amber-600 to-orange-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-amber-600 to-orange-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
