"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlaySquare,
  Trash2,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Search,
  ListVideo,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import getMappedValues from "@/app/utils/targetNodeInputSchemaAndValidation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function YouTubeNode({ id, data, isConnectable }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({
    basic: false,
    settings: false,
  });
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [config, setConfig] = useState({
    maxResults: 3,
    includeTranscript: false,
    sortBy: "relevance",
    contentType: "video",
  });
  // Add this near your other state declarations
  const [selectedOutput, setSelectedOutput] = useState("finalOutput");
  const [apiResponse, setApiResponse] = useState(null);
  const [hasOutputs, setHasOutputs] = useState(false); // Add this line

  // Keep state synced with external data
  useEffect(() => {
    console.log("data", data);
    if (data?.inputs) {
      const mapped = getMappedValues(
        data.sourceNodeType,
        "youtube",
        data.inputs
      );
      setQuery(mapped.query || "");
    }
  }, [data?._version]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ basic: false, settings: false });
    data?.onUpdateNode?.(id, { query, results, config });
  }, [data, id, query, results, config]);

  const searchYouTube = useCallback(async () => {
    if (!query.trim()) {
      setError("Please enter a search query");
      toast.error("Please enter a search query");
      return;
    }

    setLoading(true);
    setError("");
    toast.info("Searching YouTube...");

    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, maxResults: config.maxResults }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Unknown API error");
      }

      console.log("API response", responseData);
      setApiResponse(responseData);
      setResults(responseData.finalOutput);
      setHasOutputs(true); // Add this line to enable outputs panel
      data?.onUpdateNode?.(id, {
        query,
        results: responseData.finalOutput,
        config,
      });
      data?.onSendData?.({ results: responseData.finalOutput });
    } catch (err) {
      setError(err.message);
      toast.error("YouTube search failed");
    } finally {
      setLoading(false);
    }
  }, [query, config, id, data]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError("");
    data?.onUpdateNode?.(id, { query: "", results: [] });
    toast.info("Cleared YouTube search");
  }, [data, id]);

  const toggleInputsPanel = useCallback((e) => {
    e.stopPropagation();
    setShowInputs((prev) => !prev);
  }, []);

  const toggleOutputsPanel = useCallback((e) => {
    e.stopPropagation();
    setShowOutputs((prev) => !prev);
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
              <h3 className="text-gray-100">Inputs</h3>
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

      {/* Output Panel */}
      <AnimatePresence>
        {showOutputs && apiResponse && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-[-240px] top-0 w-[220px] bg-gray-800 border border-gray-700 rounded-md p-3 text-xs shadow-lg z-10"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-100">Outputs</h3>
              <button
                onClick={toggleOutputsPanel}
                className="text-gray-500 hover:text-gray-300"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-2">
              <label className="text-gray-400 text-xs block mb-1">View:</label>
              <select
                value={selectedOutput}
                onChange={(e) => setSelectedOutput(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white text-xs px-2 py-1 rounded mb-2"
              >
                {Object.keys(apiResponse).map((key) => (
                  <option key={key} value={key}>
                    {key === "finalOutput"
                      ? "Results"
                      : key === "executionLog"
                      ? "Execution Log"
                      : key === "optimizedPrompt"
                      ? "Optimized Prompt"
                      : key === "toolPlan"
                      ? "Tool Plan"
                      : key === "userQuery"
                      ? "User Query"
                      : key}
                  </option>
                ))}
              </select>
            </div>

            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div className="mb-3">
                <div className="text-gray-400 mb-1 font-medium capitalize">
                  {selectedOutput === "finalOutput"
                    ? "Results"
                    : selectedOutput === "executionLog"
                    ? "Execution Log"
                    : selectedOutput === "optimizedPrompt"
                    ? "Optimized Prompt"
                    : selectedOutput === "toolPlan"
                    ? "Tool Plan"
                    : selectedOutput === "userQuery"
                    ? "User Query"
                    : selectedOutput}
                </div>
                <pre className="text-blue-400 font-mono text-xs whitespace-pre-wrap break-words bg-gray-900/50 p-2 rounded">
                  {typeof apiResponse[selectedOutput] === "string"
                    ? apiResponse[selectedOutput]
                    : JSON.stringify(apiResponse[selectedOutput], null, 2)}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Node Container */}
      <div className="relative w-[28rem] bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-2 rounded-lg shadow-md">
            <PlaySquare className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-rose-300">
                YouTube Node
              </h3>
              {/* <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"> */}

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setEditing((prev) => ({
                      ...prev,
                      settings: !prev.settings,
                    }))
                  }
                  className={`text-gray-300 hover:text-gray-100 transition-colors ${
                    editing.settings ? "text-gray-300" : ""
                  }`}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1.5">YouTube Query:</div>
              {editing.basic ? (
                <div className="flex gap-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Search YouTube..."
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                      title="Clear"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <motion.div
                  whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-wrap cursor-pointer"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, basic: true }))
                  }
                >
                  {query || (
                    <span className="text-gray-500 italic">
                      Click to edit YouTube query...
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
                  className="mt-3 overflow-hidden"
                >
                  <Card className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xs text-gray-400 mb-2 font-medium">
                        YouTube Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">
                          Max results:
                        </Label>
                        <Select
                          value={config.maxResults.toString()}
                          onValueChange={(value) =>
                            setConfig({
                              ...config,
                              maxResults: parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger className="w-[100px] h-8 bg-gray-700 border border-gray-600 text-white text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border border-gray-700">
                            {[1, 3, 5, 10].map((num) => (
                              <SelectItem
                                key={num}
                                value={num.toString()}
                                className="text-xs"
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">
                          Content type:
                        </Label>
                        <Select
                          value={config.contentType}
                          onValueChange={(value) =>
                            setConfig({
                              ...config,
                              contentType: value,
                            })
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8 bg-gray-700 border border-gray-600 text-white text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border border-gray-700">
                            {["video", "channel", "playlist"].map((type) => (
                              <SelectItem
                                key={type}
                                value={type}
                                className="text-xs"
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">
                          Include transcript:
                        </Label>
                        <Switch
                          checked={config.includeTranscript}
                          onCheckedChange={(checked) =>
                            setConfig({
                              ...config,
                              includeTranscript: checked,
                            })
                          }
                          className="data-[state=checked]:bg-red-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">
                          Sort by:
                        </Label>
                        <Select
                          value={config.sortBy}
                          onValueChange={(value) =>
                            setConfig({ ...config, sortBy: value })
                          }
                        >
                          <SelectTrigger className="w-[120px] h-8 bg-gray-700 border border-gray-600 text-white text-xs">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border border-gray-700">
                            {["relevance", "date", "viewCount", "rating"].map(
                              (sort) => (
                                <SelectItem
                                  key={sort}
                                  value={sort}
                                  className="text-xs"
                                >
                                  {sort === "viewCount"
                                    ? "Views"
                                    : sort === "rating"
                                    ? "Rating"
                                    : sort.charAt(0).toUpperCase() +
                                      sort.slice(1)}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {/* In your action buttons section */}
              <div className="flex gap-2">
                {hasInputs && (
                  <button
                    onClick={toggleInputsPanel}
                    className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
                  >
                    {showInputs ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    Inputs
                  </button>
                )}
                {hasOutputs && ( // Changed from results.length to hasOutputs
                  <button
                    onClick={toggleOutputsPanel}
                    className="text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
                  >
                    {showOutputs ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    Outputs
                  </button>
                )}
              </div>

              <div className="flex gap-2 ml-auto">
                {(editing.basic || editing.settings) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-3 py-1 rounded-full bg-green-600 hover:bg-green-700 text-white text-xs flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Save
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={searchYouTube}
                  disabled={loading || !query}
                  className={`px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-medium flex items-center gap-2 shadow-md ${
                    loading || !query
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-red-500 hover:to-rose-500"
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  {loading ? "Searching..." : "Search YouTube"}
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
          className="w-3 h-3 bg-gradient-to-r from-red-600 to-rose-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-red-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-red-600 to-rose-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-red-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
