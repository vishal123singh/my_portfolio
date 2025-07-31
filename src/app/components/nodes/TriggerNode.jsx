"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Trash2,
  Pencil,
  Check,
  ChevronDown,
  ChevronUp,
  Settings,
  Copy,
  Zap,
  Timer,
  Clock,
  Plus,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export function TriggerNode({ data, isConnectable, id }) {
  // State management
  const [triggerLabel, setTriggerLabel] = useState(data?.label || "Start Flow");
  const [isEditing, setIsEditing] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [triggerType, setTriggerType] = useState(data?.triggerType || "manual");
  const [triggerPayload, setTriggerPayload] = useState(
    data?.triggerPayload || {}
  );
  const [isTriggering, setIsTriggering] = useState(false);
  const [lastTriggered, setLastTriggered] = useState(
    data?.lastTriggered || null
  );

  // Sync with external changes
  useEffect(() => {
    if (data?.label) setTriggerLabel(data.label);
    if (data?.triggerType) setTriggerType(data.triggerType);
    if (data?.triggerPayload) setTriggerPayload(data.triggerPayload);
    if (data?.lastTriggered) setLastTriggered(data.lastTriggered);
  }, [data]);

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    data?.onUpdateNode?.(id, {
      label: triggerLabel,
      triggerType,
      triggerPayload,
    });
    toast.success("Trigger settings saved");
  }, [data, id, triggerLabel, triggerType, triggerPayload]);

  const handleTrigger = useCallback(async () => {
    setIsTriggering(true);
    try {
      // Simulate trigger processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      const triggerData = {
        trigger: true,
        type: triggerType,
        timestamp: new Date().toISOString(),
        label: triggerLabel,
        payload: triggerPayload,
      };

      setLastTriggered(new Date().toISOString());
      data?.onUpdateNode?.(id, { lastTriggered: new Date().toISOString() });
      data?.onSendData?.(triggerData);
      toast.success("Flow triggered successfully");
    } catch (err) {
      toast.error("Trigger failed");
    } finally {
      setIsTriggering(false);
    }
  }, [data, id, triggerLabel, triggerType, triggerPayload]);

  const addPayloadField = useCallback(() => {
    setTriggerPayload((prev) => ({
      ...prev,
      [`field_${Object.keys(prev).length + 1}`]: "",
    }));
  }, []);

  const updatePayloadField = useCallback((key, value) => {
    setTriggerPayload((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const removePayloadField = useCallback(
    (key) => {
      const newPayload = { ...triggerPayload };
      delete newPayload[key];
      setTriggerPayload(newPayload);
    },
    [triggerPayload]
  );

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
                  <pre className="text-yellow-400 font-mono text-xs whitespace-pre-wrap break-words bg-gray-900/50 p-2 rounded">
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
          className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-2 rounded-lg shadow-md">
            <Play className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Trigger Node
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSettingsOpen(!settingsOpen)}
                  className={`text-gray-400 hover:text-yellow-300 transition-colors ${
                    settingsOpen ? "text-yellow-400" : ""
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

            {/* Settings Panel */}
            <AnimatePresence>
              {settingsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <h4 className="text-xs text-gray-400 font-medium mb-2">
                      Trigger Settings
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 mb-1 block">
                          Trigger Type:
                        </label>
                        <select
                          value={triggerType}
                          onChange={(e) => setTriggerType(e.target.value)}
                          className="w-full px-2 py-1 rounded bg-gray-700 border border-gray-600 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        >
                          <option value="manual">Manual</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="event">Event-based</option>
                          <option value="api">API Call</option>
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs text-gray-400">
                            Payload:
                          </label>
                          <button
                            onClick={addPayloadField}
                            className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Field
                          </button>
                        </div>
                        {Object.keys(triggerPayload).length > 0 ? (
                          <div className="space-y-2">
                            {Object.entries(triggerPayload).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    value={key}
                                    onChange={(e) => {
                                      const newKey = e.target.value;
                                      const newPayload = { ...triggerPayload };
                                      newPayload[newKey] = newPayload[key];
                                      delete newPayload[key];
                                      setTriggerPayload(newPayload);
                                    }}
                                    className="w-24 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                  />
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) =>
                                      updatePayloadField(key, e.target.value)
                                    }
                                    className="flex-1 px-2 py-1 rounded bg-gray-700 border border-gray-600 text-xs text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
                                  />
                                  <button
                                    onClick={() => removePayloadField(key)}
                                    className="text-gray-500 hover:text-red-400 p-1"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center text-gray-500 text-xs py-2">
                            No payload fields
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trigger Label */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs text-gray-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1.5" />
                  Trigger Label:
                </label>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-yellow-400 hover:text-yellow-300 flex items-center gap-1"
                >
                  {isEditing ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Pencil className="w-3 h-3" />
                  )}
                  {isEditing ? "Done" : "Edit"}
                </button>
              </div>

              {isEditing ? (
                <input
                  value={triggerLabel}
                  onChange={(e) => setTriggerLabel(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              ) : (
                <div
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-200 cursor-pointer"
                >
                  {triggerLabel}
                </div>
              )}
            </div>

            {/* Trigger Button */}
            <div className="mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleTrigger}
                disabled={isTriggering}
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-md"
              >
                {isTriggering ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                {isTriggering ? "Triggering..." : "Trigger Flow"}
              </motion.button>
            </div>

            {/* Last Triggered */}
            {lastTriggered && (
              <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last triggered: {new Date(lastTriggered).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Handles */}
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-orange-600 to-yellow-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-orange-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
