"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  Clock,
  Database,
  Network,
  Trash2,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Plus,
  Loader2,
  X,
  Search,
  Sparkles,
} from "lucide-react";
import { useState, useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AgentMemoryNode({ id, data, isConnectable }) {
  const [activeTab, setActiveTab] = useState("shortTerm");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState({
    basic: false,
    settings: false,
  });
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with real data from props
  const [memoryData, setMemoryData] = useState({
    shortTerm: data?.shortTerm || [
      { role: "user", content: "Hello, how are you?", timestamp: new Date() },
      {
        role: "agent",
        content: "I'm doing well, thanks!",
        timestamp: new Date(),
      },
    ],
    longTerm: data?.longTerm || [
      {
        content: "User prefers dark mode interfaces",
        strength: 0.85,
        lastAccessed: "2 days ago",
      },
      {
        content: "User is interested in AI ethics",
        strength: 0.72,
        lastAccessed: "1 week ago",
      },
    ],
    knowledgeGraph: data?.knowledgeGraph || {
      nodes: [
        { id: "user-123", type: "user", label: "Current User" },
        { id: "pref-456", type: "preference", label: "Dark Mode" },
      ],
      edges: [
        { source: "user-123", target: "pref-456", relationship: "prefers" },
      ],
    },
  });

  // Sync with external data
  useEffect(() => {
    if (data?.shortTerm)
      setMemoryData((prev) => ({ ...prev, shortTerm: data.shortTerm }));
    if (data?.longTerm)
      setMemoryData((prev) => ({ ...prev, longTerm: data.longTerm }));
    if (data?.knowledgeGraph)
      setMemoryData((prev) => ({
        ...prev,
        knowledgeGraph: data.knowledgeGraph,
      }));
  }, [data]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ basic: false, settings: false });
    data?.onUpdateNode?.(id, memoryData);
  }, [data, id, memoryData]);

  const searchMemory = useCallback(async () => {
    if (!searchQuery) {
      setError("Please enter a search query");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate search
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        `Found ${Math.floor(Math.random() * 5) + 1} relevant memories`
      );
    } catch (err) {
      setError(err.message);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const addMemoryItem = useCallback(() => {
    if (activeTab === "shortTerm") {
      setMemoryData((prev) => ({
        ...prev,
        shortTerm: [
          ...prev.shortTerm,
          { role: "user", content: "New message", timestamp: new Date() },
        ],
      }));
    } else if (activeTab === "longTerm") {
      setMemoryData((prev) => ({
        ...prev,
        longTerm: [
          ...prev.longTerm,
          { content: "New memory", strength: 0.5, lastAccessed: "Just now" },
        ],
      }));
    }
  }, [activeTab]);

  const clearMemory = useCallback(() => {
    if (activeTab === "shortTerm") {
      setMemoryData((prev) => ({ ...prev, shortTerm: [] }));
    } else if (activeTab === "longTerm") {
      setMemoryData((prev) => ({ ...prev, longTerm: [] }));
    }
    data?.onUpdateNode?.(id, memoryData);
  }, [activeTab, data, id, memoryData]);

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
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-md">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Memory
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
                  className={`text-gray-400 hover:text-blue-300 transition-colors ${
                    editing.settings ? "text-blue-400" : ""
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

            {/* Search Bar */}
            <div className="mt-3 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories..."
                className="w-full px-3 py-2 pl-9 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={searchMemory}
                disabled={loading}
                className="absolute right-2 top-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 p-1 rounded text-white"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Memory Tabs */}
            <div className="flex border-b border-gray-700 mt-3">
              <button
                onClick={() => setActiveTab("shortTerm")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "shortTerm"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Short-Term
              </button>
              <button
                onClick={() => setActiveTab("longTerm")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "longTerm"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Long-Term
              </button>
              <button
                onClick={() => setActiveTab("knowledge")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "knowledge"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                Knowledge
              </button>
            </div>

            {/* Memory Content */}
            <div className="mt-2 h-48 overflow-y-auto custom-scrollbar">
              {activeTab === "shortTerm" && (
                <div className="space-y-2">
                  {memoryData.shortTerm.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-900/50 p-2 rounded border border-gray-700"
                    >
                      <div className="flex justify-between text-xs">
                        <span
                          className={`font-medium ${
                            item.role === "user"
                              ? "text-blue-400"
                              : "text-cyan-400"
                          }`}
                        >
                          {item.role}
                        </span>
                        <span className="text-gray-500">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200 mt-1">
                        {item.content}
                      </p>
                    </div>
                  ))}
                  {memoryData.shortTerm.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No conversation history
                    </div>
                  )}
                </div>
              )}

              {activeTab === "longTerm" && (
                <div className="space-y-2">
                  {memoryData.longTerm.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-900/50 p-2 rounded border border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-200 flex-1">
                          {item.content}
                        </p>
                        <div className="bg-blue-900/30 text-blue-400 text-xs px-1.5 py-0.5 rounded">
                          {item.strength.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last accessed: {item.lastAccessed}
                      </div>
                    </div>
                  ))}
                  {memoryData.longTerm.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-8">
                      No long-term memories
                    </div>
                  )}
                </div>
              )}

              {activeTab === "knowledge" && (
                <div>
                  <div className="text-xs text-gray-400 mb-2">
                    Knowledge Graph ({memoryData.knowledgeGraph.nodes.length}{" "}
                    nodes, {memoryData.knowledgeGraph.edges.length} edges)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {memoryData.knowledgeGraph.nodes.slice(0, 4).map((node) => (
                      <div
                        key={node.id}
                        className="bg-gray-900/50 p-2 rounded border border-gray-700"
                      >
                        <div className="text-xs text-blue-400 font-medium">
                          {node.type}
                        </div>
                        <div className="text-sm text-gray-200 truncate">
                          {node.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {memoryData.knowledgeGraph.nodes.length > 4 && (
                    <div className="text-xs text-gray-500 mt-2">
                      +{memoryData.knowledgeGraph.nodes.length - 4} more nodes
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={() => setShowInputs(!showInputs)}
                  className="text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
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
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={addMemoryItem}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={clearMemory}
                  className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear
                </motion.button>
                {(editing.basic || editing.settings) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </motion.button>
                )}
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
          className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
