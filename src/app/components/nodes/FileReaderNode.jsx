"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  X,
  Loader2,
  FileInput,
  FileUp,
  ChevronDown,
  ChevronUp,
  Settings,
  Trash2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { readCSV, readDOCX, readPDF, readTXT } from "@/app/utils/fileReaders";

export default function FileReaderNode({ id, data, isConnectable }) {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [editing, setEditing] = useState({ settings: false });

  // Supported file types
  const supportedTypes = {
    "application/pdf": "PDF",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "text/plain": "TXT",
    "text/csv": "CSV",
    "application/vnd.ms-excel": "CSV",
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!Object.keys(supportedTypes).includes(selectedFile.type)) {
      setError(`Unsupported file type: ${selectedFile.type}`);
      toast.error("Unsupported file type");
      return;
    }

    setLoading(true);
    setError("");
    setFile(selectedFile);

    try {
      let extractedContent = "";

      switch (selectedFile.type) {
        case "application/pdf":
          extractedContent = await readPDF(selectedFile);
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extractedContent = await readDOCX(selectedFile);
          break;
        case "text/plain":
          extractedContent = await readTXT(selectedFile);
          break;
        case "text/csv":
        case "application/vnd.ms-excel":
          extractedContent = await readCSV(selectedFile);
          break;
        default:
          throw new Error("Unsupported file type");
      }

      setContent(extractedContent);
      data?.onUpdateNode?.(id, {
        file: selectedFile.name,
        content: extractedContent,
      });
      data?.onSendData?.({ content: extractedContent });
      toast.success("File processed successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Error processing file");
      console.error("File processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setContent("");
    setError("");
    data?.onUpdateNode?.(id, { file: null, content: "" });
  };

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing({ settings: false });
    data?.onUpdateNode?.(id, { file: file?.name, content });
  }, [data, id, file, content]);

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
      <div className="w-[28rem] relative bg-gray-800 border border-gray-700 rounded-xl shadow-xl p-4 w-80 backdrop-blur-sm">
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0.4,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-[6px] pointer-events-none"
        />

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl" />

        <div className="flex items-start gap-3 relative z-10">
          {/* Icon */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg shadow-md">
            <FileText className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                File Reader
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing({ settings: !editing.settings })}
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

            {/* File Input */}
            <div className="mt-3">
              <label className="text-xs text-gray-400 mb-1.5 block">
                {file ? "Selected file:" : "Select a file to read:"}
              </label>

              {file ? (
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-sm text-gray-200 flex items-center justify-between">
                  <div className="truncate flex-1">
                    <FileUp className="w-4 h-4 inline mr-2" />
                    {file.name}
                    <span className="text-xs text-blue-400 ml-2">
                      ({supportedTypes[file.type] || file.type})
                    </span>
                  </div>
                  <button
                    onClick={clearFile}
                    className="text-gray-400 hover:text-red-500 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900/50 hover:bg-gray-900/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileInput className="w-6 h-6 mb-2 text-gray-400" />
                    <p className="text-xs text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOCX, TXT, CSV
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/csv,application/vnd.ms-excel"
                  />
                </label>
              )}
            </div>

            {/* Content Preview */}
            {file && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-400">
                    Content preview:
                  </span>
                  <button
                    onClick={() => setShowContent(!showContent)}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {showContent ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {showContent ? "Hide" : "Show"}
                  </button>
                </div>

                <AnimatePresence>
                  {showContent && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-2 text-xs text-gray-200 max-h-40 overflow-y-auto custom-scrollbar">
                        {loading ? (
                          <div className="flex items-center justify-center h-20">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                          </div>
                        ) : (
                          <pre className="whitespace-pre-wrap break-words font-mono">
                            {content.length > 500
                              ? `${content.substring(0, 500)}...`
                              : content || "No content extracted"}
                          </pre>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

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
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                    <h4 className="text-xs text-gray-400 font-medium mb-2">
                      File Processing Settings
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">
                          Max preview length:
                        </span>
                        <span className="text-blue-400">500 chars</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Auto-process:</span>
                        <span className="text-blue-400">Enabled</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                {editing.settings && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium flex items-center gap-2 shadow-md"
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
                <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
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
          className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        />
        <Handle
          type="source"
          id="output"
          position={Position.Right}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-gray-800 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
        />
      </div>
    </motion.div>
  );
}
