"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Pencil,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Play,
  Plus,
  Zap,
  List,
  Code,
  Loader2,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ToolNode({ id, data, isConnectable }) {
  // State management
  const [toolName, setToolName] = useState(data?.toolName || "");
  const [toolDescription, setToolDescription] = useState(
    data?.toolDescription || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("config");
  const [parameters, setParameters] = useState(data?.parameters || []);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(data?.output || null);
  const [showSettings, setShowSettings] = useState(false);

  // React to external changes
  useEffect(() => {
    if (data?.toolName) setToolName(data.toolName);
    if (data?.toolDescription) setToolDescription(data.toolDescription);
    if (data?.parameters) setParameters(data.parameters);
    if (data?.output) setOutput(data.output);
  }, [data]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleUpdate = useCallback(() => {
    setIsEditing(false);
    data?.onUpdateNode?.(id, {
      toolName,
      toolDescription,
      parameters,
      output,
    });
  }, [data, id, toolName, toolDescription, parameters, output]);

  const handleRunTool = useCallback(async () => {
    setIsRunning(true);
    try {
      // Simulate tool execution
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockOutput = {
        status: "success",
        result: `Executed ${toolName} with ${parameters.length} parameters`,
        timestamp: new Date().toISOString(),
      };

      setOutput(mockOutput);
      data?.onUpdateNode?.(id, { output: mockOutput });
      data?.onSendData?.(mockOutput);
      toast.success("Tool executed successfully");
    } catch (err) {
      toast.error("Tool execution failed");
    } finally {
      setIsRunning(false);
    }
  }, [data, id, toolName, parameters]);

  const addParameter = useCallback(() => {
    setParameters((prev) => [
      ...prev,
      { name: `param${prev.length + 1}`, type: "string", value: "" },
    ]);
  }, []);

  const removeParameter = useCallback((index) => {
    setParameters((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const hasInputs = data?.inputs && Object.keys(data.inputs).length > 0;

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
              <h3 className="text-gray-400">Inputs</h3>
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
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg shadow-md">
            <Wrench className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                Tool Node
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className={`text-gray-400 hover:text-blue-300 transition-colors ${
                    showSettings ? "text-blue-400" : ""
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

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mt-3">
              <button
                onClick={() => setActiveTab("config")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "config"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                Config
              </button>
              <button
                onClick={() => setActiveTab("params")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "params"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                Params
              </button>
              <button
                onClick={() => setActiveTab("output")}
                className={`px-3 py-2 text-xs font-medium flex items-center gap-1 ${
                  activeTab === "output"
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Output
              </button>
            </div>

            {/* Main Content */}
            <div className="mt-3">
              {activeTab === "config" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">
                      Tool Name:
                    </label>
                    {isEditing ? (
                      <input
                        value={toolName}
                        onChange={(e) => setToolName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter tool name"
                      />
                    ) : (
                      <div
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 cursor-pointer"
                      >
                        {toolName || "Untitled Tool"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">
                      Description:
                    </label>
                    {isEditing ? (
                      <textarea
                        value={toolDescription}
                        onChange={(e) => setToolDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                        placeholder="Describe what this tool does"
                      />
                    ) : (
                      <div
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 min-h-[80px] cursor-pointer whitespace-pre-wrap"
                      >
                        {toolDescription || "No description provided"}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "params" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs text-gray-400 font-medium">
                      Parameters
                    </h4>
                    <button
                      onClick={addParameter}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>

                  {parameters.length > 0 ? (
                    <div className="space-y-2">
                      {parameters.map((param, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 grid grid-cols-3 gap-2 bg-gray-900/50 p-2 rounded border border-gray-700">
                            <input
                              type="text"
                              value={param.name}
                              onChange={(e) => {
                                const newParams = [...parameters];
                                newParams[index].name = e.target.value;
                                setParameters(newParams);
                              }}
                              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                              placeholder="Name"
                            />
                            <select
                              value={param.type}
                              onChange={(e) => {
                                const newParams = [...parameters];
                                newParams[index].type = e.target.value;
                                setParameters(newParams);
                              }}
                              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                            >
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="boolean">Boolean</option>
                              <option value="object">Object</option>
                            </select>
                            <input
                              type="text"
                              value={param.value}
                              onChange={(e) => {
                                const newParams = [...parameters];
                                newParams[index].value = e.target.value;
                                setParameters(newParams);
                              }}
                              className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                              placeholder="Value"
                            />
                          </div>
                          <button
                            onClick={() => removeParameter(index)}
                            className="text-gray-500 hover:text-red-400 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 text-xs py-4">
                      No parameters configured
                    </div>
                  )}
                </div>
              )}

              {activeTab === "output" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs text-gray-400 font-medium">
                      Execution Results
                    </h4>
                    <button
                      onClick={handleRunTool}
                      disabled={isRunning}
                      className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white flex items-center gap-1"
                    >
                      {isRunning ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      Run
                    </button>
                  </div>

                  {output ? (
                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-xs max-h-40 overflow-y-auto">
                      <pre className="text-gray-300 whitespace-pre-wrap break-words">
                        {JSON.stringify(output, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 text-xs py-4">
                      No execution results yet
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
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleUpdate}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </motion.button>
                )}
              </div>
            </div>
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
