"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  ClipboardCheck,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export default function FeedbackAnalysisNode({ id, data, isConnectable }) {
  // State
  const [rawFeedback, setRawFeedback] = useState(data?.feedback || "");
  const [report, setReport] = useState(data?.report || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [config, setConfig] = useState({
    sentimentAnalysis: true,
    topicModeling: true,
    urgencyThreshold: 7,
    visualize: true,
  });

  const handleDelete = useCallback(() => {
    data?.onDeleteNode?.(id);
  }, [data, id]);
  // Mock analysis function (replace with real API)
  const analyzeFeedback = useCallback(async () => {
    if (!rawFeedback.trim()) {
      setError("Please enter feedback data");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate mock report
      const mockReport = {
        summary: {
          totalFeedback: rawFeedback.split("\n").length,
          sentiment: {
            positive: Math.floor(Math.random() * 40) + 40,
            neutral: Math.floor(Math.random() * 30),
            negative: Math.floor(Math.random() * 30),
          },
          urgencyScore: Math.floor(Math.random() * 10),
        },
        topics: [
          {
            name: "Product Quality",
            count: Math.floor(Math.random() * 20) + 10,
          },
          {
            name: "Customer Service",
            count: Math.floor(Math.random() * 15) + 5,
          },
          { name: "Pricing", count: Math.floor(Math.random() * 10) },
        ],
        actionableInsights: [
          "3 customers reported defective products in last week",
          "Service wait times mentioned in 12% of negative feedback",
          "Pricing complaints increased 20% month-over-month",
        ],
        recommendations: [
          "Implement quality control checklist for Product X",
          "Add live chat support during peak hours",
          "Consider loyalty program for price-sensitive customers",
        ],
      };

      setReport(mockReport);
      data?.onUpdateNode?.(id, { feedback: rawFeedback, report: mockReport });
      data?.onSendData?.(mockReport);
      toast.success("Analysis complete");
    } catch (err) {
      setError("Analysis failed");
      toast.error("Failed to process feedback");
    } finally {
      setLoading(false);
    }
  }, [rawFeedback, id, data]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-[420px] bg-gray-800 border border-cyan-700 rounded-xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-800 to-teal-800 p-3 flex items-center">
        <MessageSquare className="w-5 h-5 text-cyan-300 mr-2" />
        <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
          Customer Feedback Analyzer
        </h3>
        <div className="ml-auto flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
          <button
            onClick={analyzeFeedback}
            disabled={loading}
            className="px-3 py-1 rounded-md bg-cyan-700 hover:bg-cyan-600 text-sm flex items-center gap-1"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <BarChart2 className="w-4 h-4" />
            )}
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Input Area */}
        <div className="mb-4">
          <label className="block text-xs text-cyan-300 mb-2">
            Raw Feedback Data:
          </label>
          <textarea
            value={rawFeedback}
            onChange={(e) => setRawFeedback(e.target.value)}
            className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
            placeholder="Paste customer feedback (1 per line)..."
          />
        </div>

        {/* Report Display */}
        {report && (
          <div className="mt-4 space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-700/50 p-3 rounded-lg border border-cyan-900">
                <div className="text-xs text-cyan-400">Total Feedback</div>
                <div className="text-xl font-bold text-white">
                  {report.summary.totalFeedback}
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-cyan-900">
                <div className="text-xs text-cyan-400">Urgency Score</div>
                <div
                  className={`text-xl font-bold ${
                    report.summary.urgencyScore >= config.urgencyThreshold
                      ? "text-red-400"
                      : "text-amber-400"
                  }`}
                >
                  {report.summary.urgencyScore}/10
                </div>
              </div>
              <div className="bg-gray-700/50 p-3 rounded-lg border border-cyan-900">
                <div className="text-xs text-cyan-400">Sentiment</div>
                <div className="text-sm text-white">
                  <span className="text-green-400">
                    {report.summary.sentiment.positive}% +
                  </span>{" "}
                  /
                  <span className="text-gray-400">
                    {" "}
                    {report.summary.sentiment.neutral}% ~
                  </span>{" "}
                  /
                  <span className="text-red-400">
                    {" "}
                    {report.summary.sentiment.negative}% -
                  </span>
                </div>
              </div>
            </div>

            {/* Top Topics */}
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <div className="flex items-center text-xs text-cyan-300 mb-2">
                <TrendingUp className="w-4 h-4 mr-1" />
                Key Topics
              </div>
              <div className="space-y-2">
                {report.topics.map((topic, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-24 text-sm text-gray-300 truncate">
                      {topic.name}
                    </div>
                    <div className="flex-1 ml-2">
                      <div
                        className="h-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full"
                        style={{ width: `${Math.min(100, topic.count * 3)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 ml-2 w-8 text-right">
                      {topic.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Insights */}
            <div className="bg-gray-900/50 p-3 rounded-lg border border-amber-800/50">
              <div className="flex items-center text-xs text-amber-300 mb-2">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Critical Issues
              </div>
              <ul className="text-sm space-y-1.5">
                {report.actionableInsights.map((insight, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-amber-400 mr-1">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-900/50 p-3 rounded-lg border border-green-800/50">
              <div className="flex items-center text-xs text-green-300 mb-2">
                <ClipboardCheck className="w-4 h-4 mr-1" />
                Recommended Actions
              </div>
              <ol className="text-sm space-y-1.5 list-decimal list-inside">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="text-green-100">
                    <span className="text-white">{rec}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        id="input"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-cyan-600 border-2 border-gray-800"
      />
      <Handle
        type="source"
        id="output"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-teal-600 border-2 border-gray-800"
      />

      {/* Error Display */}
      {error && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-900/80 text-red-100 text-xs p-2 rounded">
          {error}
        </div>
      )}
    </motion.div>
  );
}
