"use client";

import { useEffect, useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Trash2,
  Pencil,
  Check,
  Send,
  ChevronDown,
  ChevronUp,
  Settings,
  Key,
  TestTube2,
} from "lucide-react";

// Model configurations
const MODEL_PROVIDERS = {
  OpenAI: {
    models: ["gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"],
    requiresKey: true,
    keyLabel: "OpenAI API Key",
    keyPlaceholder: "sk-...",
  },
  Anthropic: {
    models: ["claude-3-opus", "claude-3-sonnet", "claude-2.1"],
    requiresKey: true,
    keyLabel: "Anthropic API Key",
    keyPlaceholder: "sk-ant-...",
  },
  Mistral: {
    models: ["mistral-large", "mistral-medium", "mistral-small"],
    requiresKey: false,
  },
  Local: {
    models: ["llama-3", "mistral-7b", "phi-2"],
    requiresKey: false,
  },
};

export default function LLMNode({ id, data, isConnectable }) {
  const [provider, setProvider] = useState(data?.provider || "OpenAI");
  const [model, setModel] = useState(data?.model || "gpt-4-turbo");
  const [apiKey, setApiKey] = useState(data?.apiKey || "");
  const [systemInstruction, setSystemInstruction] = useState(
    data?.systemInstruction || "You are a helpful AI assistant."
  );
  const [temperature, setTemperature] = useState(data?.temperature ?? 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens ?? 1000);
  const [prompt, setPrompt] = useState(data?.prompt || "");

  const [editing, setEditing] = useState({
    model: false,
    prompt: false,
    settings: false,
    credentials: false,
  });

  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  // Keep internal state synced with external data
  useEffect(() => {
    if (data?.provider) setProvider(data.provider);
    if (data?.model) setModel(data.model);
    if (data?.apiKey) setApiKey(data.apiKey);
    if (data?.systemInstruction) setSystemInstruction(data.systemInstruction);
    if (data?.temperature) setTemperature(data.temperature);
    if (data?.maxTokens) setMaxTokens(data.maxTokens);
    if (data?.prompt) setPrompt(data.prompt);
  }, [data]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const saveSettings = useCallback(() => {
    data?.onUpdateNode?.(id, {
      provider,
      model,
      apiKey,
      systemInstruction,
      temperature,
      maxTokens,
      prompt,
    });
    setEditing((prev) => ({
      ...prev,
      settings: false,
      credentials: false,
      model: false,
      prompt: false,
    }));
  }, [
    data,
    id,
    provider,
    model,
    apiKey,
    systemInstruction,
    temperature,
    maxTokens,
    prompt,
  ]);

  const handleSend = useCallback(() => {
    data?.onSendData?.({
      provider,
      model,
      apiKey: MODEL_PROVIDERS[provider].requiresKey ? apiKey : undefined,
      systemInstruction,
      temperature,
      maxTokens,
      prompt,
      triggeredAt: new Date().toISOString(),
    });
  }, [
    data,
    provider,
    model,
    apiKey,
    systemInstruction,
    temperature,
    maxTokens,
    prompt,
  ]);

  const toggleInputsPanel = useCallback((e) => {
    e.stopPropagation();
    setShowInputs((prev) => !prev);
  }, []);

  const testConnection = useCallback(async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      // Simulate API test (in a real app, you would call your API here)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Random success/failure for demo
      const isSuccess = Math.random() > 0.3;
      setTestResult({
        success: isSuccess,
        message: isSuccess
          ? "Connection successful! Model is ready."
          : "Connection failed. Check your API key.",
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error.message || "Connection failed",
      });
    } finally {
      setIsTesting(false);
    }
  }, []);

  const hasInputs = data?.inputs && Object.keys(data.inputs).length > 0;
  const currentProviderConfig =
    MODEL_PROVIDERS[provider] || MODEL_PROVIDERS["OpenAI"];

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
        {/* Glow Effect (only on hover) */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon with pulse animation when active */}
          <motion.div
            animate={{
              scale: data?.isActive ? [1, 1.1, 1] : 1,
            }}
            transition={{
              repeat: data?.isActive ? Infinity : 0,
              duration: 1.5,
            }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-md"
          >
            <Bot className="w-5 h-5 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                AI Agent
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
                  className={`text-gray-400 hover:text-indigo-300 transition-colors ${
                    editing.settings ? "text-indigo-400" : ""
                  }`}
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
                {currentProviderConfig.requiresKey && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setEditing((prev) => ({
                        ...prev,
                        credentials: !prev.credentials,
                      }))
                    }
                    className={`text-gray-400 hover:text-indigo-300 transition-colors ${
                      editing.credentials ? "text-indigo-400" : ""
                    }`}
                    title="Credentials"
                  >
                    <Key className="w-4 h-4" />
                  </motion.button>
                )}
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
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">
                      Model Configuration
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Provider
                        </label>
                        <select
                          value={provider}
                          onChange={(e) => {
                            setProvider(e.target.value);
                            // Reset to first model when provider changes
                            setModel(MODEL_PROVIDERS[e.target.value].models[0]);
                          }}
                          className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                          {Object.keys(MODEL_PROVIDERS).map((provider) => (
                            <option key={provider} value={provider}>
                              {provider}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Model
                        </label>
                        <select
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        >
                          {currentProviderConfig.models.map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          System Instruction
                        </label>
                        <textarea
                          rows={2}
                          value={systemInstruction}
                          onChange={(e) => setSystemInstruction(e.target.value)}
                          className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                          placeholder="You are a helpful AI assistant..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">
                            Temperature: {temperature}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={temperature}
                            onChange={(e) =>
                              setTemperature(parseFloat(e.target.value))
                            }
                            className="w-full accent-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">
                            Max Tokens
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="4000"
                            value={maxTokens}
                            onChange={(e) =>
                              setMaxTokens(parseInt(e.target.value))
                            }
                            className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Credentials Panel */}
            <AnimatePresence>
              {editing.credentials && currentProviderConfig.requiresKey && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                    <h4 className="text-xs text-gray-400 mb-2 font-medium">
                      API Credentials
                    </h4>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          {currentProviderConfig.keyLabel}
                        </label>
                        <input
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder={currentProviderConfig.keyPlaceholder}
                          className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={testConnection}
                          disabled={isTesting}
                          className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs flex items-center gap-1"
                        >
                          {isTesting ? "Testing..." : "Test Connection"}
                          <TestTube2 className="w-3 h-3" />
                        </motion.button>

                        {testResult && (
                          <div
                            className={`text-xs ${
                              testResult.success
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {testResult.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prompt Section */}
            <div className="mt-3">
              <label className="text-xs text-gray-400 mb-1 block">Prompt</label>
              {editing.prompt ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                    placeholder="Enter your prompt..."
                  />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-wrap min-h-[80px] cursor-pointer"
                  onClick={() =>
                    setEditing((prev) => ({ ...prev, prompt: true }))
                  }
                >
                  {prompt || (
                    <span className="text-gray-500 italic">
                      Click to edit prompt...
                    </span>
                  )}
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between items-center">
              {hasInputs && (
                <button
                  onClick={toggleInputsPanel}
                  className="text-xs text-gray-500 hover:text-indigo-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700/50"
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
                {(editing.settings ||
                  editing.credentials ||
                  editing.prompt) && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={saveSettings}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    Save
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSend}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-medium flex items-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Run
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Handles with better styling */}
        <Handle
          type="target"
          id="input"
          position={Position.Left}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
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
