"use client";

import { useEffect, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Trash2,
  Send,
  ChevronDown,
  ChevronUp,
  Settings,
  Plus,
  Check,
} from "lucide-react";

export default function HTTPNode({ id, data, isConnectable }) {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "");
  const [headers, setHeaders] = useState(data?.headers || []);
  const [editing, setEditing] = useState({ basic: false, settings: false });
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [aiPrompt, setAIPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDynamic, setIsDynamic] = useState(data?.isDynamic || false);

  const hasInputs = data?.inputs && Object.keys(data.inputs).length > 0;

  useEffect(() => {
    if (data?.method) setMethod(data.method);
    if (data?.url) setUrl(data.url);
    if (data?.headers) setHeaders(data.headers);
    if (data?.isDynamic !== undefined) setIsDynamic(data.isDynamic);
  }, [data?.method, data?.url, data?.headers, data?.isDynamic, data?._version]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ basic: false, settings: false });
    data?.onUpdateNode?.(id, { method, url, headers });
  }, [data, id, method, url, headers]);

  const handleSend = useCallback(() => {
    data?.onSendData?.({
      method,
      url,
      headers: headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {}),
      inputs: data.inputs || {},
      sentAt: new Date().toISOString(),
    });
  }, [data, method, url, headers]);

  const toggleInputsPanel = useCallback((e) => {
    e.stopPropagation();
    setShowInputs((prev) => !prev);
  }, []);

  const addHeader = () => {
    setHeaders((prev) => [...prev, { key: "", value: "" }]);
  };

  const updateHeader = (index, field, value) => {
    setHeaders((prev) => {
      const newHeaders = [...prev];
      newHeaders[index][field] = value;
      return newHeaders;
    });
  };

  const removeHeader = (index) => {
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/nodes/generate-http", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          inputs: data.inputs || {},
        }),
      });

      const result = await response.json();

      if (result?.url) setUrl(result.url);
      if (result?.method) setMethod(result.method);
      if (Array.isArray(result.headers)) setHeaders(result.headers);

      data?.onUpdateNode?.(id, {
        url: result.url,
        method: result.method,
        headers: result.headers,
      });
    } catch (e) {
      console.error("AI generation failed", e);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!isDynamic || !aiPrompt) return;
    handleAIGenerate();
  }, [JSON.stringify(data.inputs)]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative w-[28rem] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

      <div className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-[28rem] backdrop-blur-sm">
        <motion.div
          animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 rounded-xl blur-[6px] pointer-events-none"
        />
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-blue-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-2 rounded-lg shadow-md">
            <Globe className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                HTTP Node
              </h3>

              <div className="flex gap-2">
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

            <div className="mt-3">
              <div className="text-xs text-gray-400 mb-1.5">Request:</div>
              {editing.basic ? (
                <div className="flex gap-2">
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white text-sm px-3 py-1.5 rounded w-[90px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[
                      "GET",
                      "POST",
                      "PUT",
                      "DELETE",
                      "PATCH",
                      "HEAD",
                      "OPTIONS",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://api.example.com"
                  />
                </div>
              ) : (
                <motion.div
                  whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-wrap cursor-pointer"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, basic: true }))
                  }
                >
                  <span className="text-blue-400 font-bold">{method}</span>{" "}
                  {url || (
                    <span className="text-gray-500 italic">
                      Click to edit URL...
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* 💡 AI Section */}
            <div className="mt-4 space-y-2">
              <div className="text-xs text-gray-400">AI Prompt</div>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                className="w-full text-sm px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Send user info to CRM API"
              />
              <div className="flex items-center justify-between">
                <button
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt || isGenerating}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  {isGenerating ? "Generating..." : "Generate with AI"}
                </button>
                <label className="flex items-center gap-2 text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={isDynamic}
                    onChange={(e) => {
                      setIsDynamic(e.target.checked);
                      data?.onUpdateNode?.(id, { isDynamic: e.target.checked });
                    }}
                    className="accent-blue-500"
                  />
                  Dynamic
                </label>
              </div>
            </div>

            {/* Settings (Headers) */}
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
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">
                      Headers
                    </h4>
                    <div className="space-y-2">
                      {headers.map((header, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={header.key}
                            onChange={(e) =>
                              updateHeader(index, "key", e.target.value)
                            }
                            placeholder="Header name"
                            className="flex-1 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={header.value}
                            onChange={(e) =>
                              updateHeader(index, "value", e.target.value)
                            }
                            placeholder="Header value"
                            className="flex-1 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-xs text-white"
                          />
                          <button onClick={() => removeHeader(index)}>
                            <Trash2 className="w-3 h-3 text-gray-500 hover:text-red-400" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addHeader}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Header
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={toggleInputsPanel}
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
                {(editing.basic || editing.settings) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white text-sm font-medium flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-sky-600 to-blue-600 border-2 border-gray-800"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-sky-600 to-blue-600 border-2 border-gray-800"
        />
      </div>

      {/* Scrollbar styles */}
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
