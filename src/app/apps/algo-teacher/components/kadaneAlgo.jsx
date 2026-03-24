"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Dice5,
  Gauge,
  CheckCircle2,
  Circle,
  Target,
  TrendingUp,
  ArrowRight,
  Info,
  BarChart3,
  FileText,
  Zap,
  Eye,
  Clock,
  Trophy,
  Flame,
  Activity,
  ChevronRight,
  AlertCircle,
  Star,
  Hash,
  Percent,
  Layers,
} from "lucide-react";

/**
 * MAXIMUM SUBARRAY SUM (KADANE'S ALGORITHM)
 * ==========================================
 *
 * WHAT IT DOES:
 * Finds the contiguous subarray with the largest sum.
 *
 * HOW IT WORKS:
 * At each position, we decide:
 *   "Is it better to continue the current subarray,
 *    or start fresh from this element?"
 *
 * RULE: If current sum becomes negative, start over!
 *
 * Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 *
 * Step 1: Start with -2 (current = -2, max = -2)
 * Step 2: At 1 → current was -2 (negative), so start fresh: current = 1, max = 1
 * Step 3: At -3 → current is positive (1), add it: current = -2, max still 1
 * Step 4: At 4 → current was -2 (negative), start fresh: current = 4, max = 4
 * Step 5: At -1 → current positive (4), add it: current = 3, max still 4
 * Step 6: At 2 → current positive (3), add it: current = 5, max = 5
 * Step 7: At 1 → current positive (5), add it: current = 6, max = 6
 * Step 8: At -5 → current positive (6), add it: current = 1, max still 6
 * Step 9: At 4 → current positive (1), add it: current = 5, max still 6
 *
 * ANSWER: Subarray [4, -1, 2, 1] with sum 6
 */

export default function MaxSubarrayVisualizer() {
  // ========== DATA ==========
  const initialArray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const [array, setArray] = useState([...initialArray]);

  // ========== ALGORITHM STATE ==========
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSum, setCurrentSum] = useState(array[0]);
  const [maxSum, setMaxSum] = useState(array[0]);
  const [currentStart, setCurrentStart] = useState(0);
  const [bestStart, setBestStart] = useState(0);
  const [bestEnd, setBestEnd] = useState(0);

  // ========== UI STATE ==========
  const [stepLog, setStepLog] = useState([
    `📌 Starting at index 0: value = ${array[0]}`,
  ]);
  const [isFinished, setIsFinished] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1000);
  const [showStats, setShowStats] = useState(true);

  const logEndRef = useRef(null);

  // Auto-scroll to latest log message
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepLog]);

  // Auto-play functionality
  useEffect(() => {
    let timer;
    if (isAutoPlaying && !isFinished) {
      timer = setTimeout(() => stepForward(), playSpeed);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentIndex, currentSum, isFinished]);

  const stepForward = () => {
    if (isFinished) return;

    const n = array.length;

    if (currentIndex === 0) {
      setStepLog([
        `📌 Start at index 0: current sum = ${array[0]}, max sum = ${array[0]}`,
      ]);
      setCurrentIndex(1);
      return;
    }

    const currentValue = array[currentIndex];
    let newCurrentSum = currentSum;
    let newCurrentStart = currentStart;
    let newMaxSum = maxSum;
    let newBestStart = bestStart;
    let newBestEnd = bestEnd;

    let explanation = "";

    if (currentSum < 0) {
      newCurrentSum = currentValue;
      newCurrentStart = currentIndex;
      explanation = `⚠️ Current sum (${currentSum}) is negative! Starting fresh at index ${currentIndex} with value ${currentValue}`;
    } else {
      newCurrentSum = currentSum + currentValue;
      explanation = `➕ Adding ${currentValue} to current sum (${currentSum}) = ${newCurrentSum}`;
    }

    if (newCurrentSum > maxSum) {
      newMaxSum = newCurrentSum;
      newBestStart = newCurrentStart;
      newBestEnd = currentIndex;

      const bestSubarray = array.slice(newBestStart, newBestEnd + 1);
      explanation += ` ✨ NEW MAXIMUM! Sum = ${newMaxSum} (subarray: [${bestSubarray.join(", ")}])`;
    }

    setCurrentSum(newCurrentSum);
    setCurrentStart(newCurrentStart);
    setMaxSum(newMaxSum);
    setBestStart(newBestStart);
    setBestEnd(newBestEnd);

    setStepLog((prev) => [
      ...prev,
      `📍 Index ${currentIndex} (value: ${currentValue}): ${explanation}`,
    ]);

    if (currentIndex + 1 >= n) {
      setIsFinished(true);
      const bestSubarray = array.slice(newBestStart, newBestEnd + 1);
      setStepLog((prev) => [
        ...prev,
        `\n✅ FINISHED! Maximum subarray sum = ${newMaxSum}`,
        `📊 Best subarray: [${bestSubarray.join(", ")}] (indices ${newBestStart} to ${newBestEnd})`,
      ]);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reset = () => {
    setArray([...initialArray]);
    setCurrentIndex(0);
    setCurrentSum(initialArray[0]);
    setMaxSum(initialArray[0]);
    setCurrentStart(0);
    setBestStart(0);
    setBestEnd(0);
    setStepLog([`📌 Starting at index 0: value = ${initialArray[0]}`]);
    setIsFinished(false);
    setIsAutoPlaying(false);
  };

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 9 },
      () => Math.floor(Math.random() * 11) - 5,
    );
    setArray(newArray);
    setCurrentIndex(0);
    setCurrentSum(newArray[0]);
    setMaxSum(newArray[0]);
    setCurrentStart(0);
    setBestStart(0);
    setBestEnd(0);
    setStepLog([
      `📌 New random array! Starting at index 0: value = ${newArray[0]}`,
    ]);
    setIsFinished(false);
    setIsAutoPlaying(false);
  };

  const getBarColor = (index) => {
    if (index >= bestStart && index <= bestEnd) return "#2ecc71";
    if (index >= currentStart && index < currentIndex) return "#f39c12";
    if (index === currentIndex) return "#e74c3c";
    return "#3498db";
  };

  // Calculate additional statistics
  const bestSubarray = array.slice(bestStart, bestEnd + 1);
  const averageValue = (
    array.reduce((a, b) => a + b, 0) / array.length
  ).toFixed(2);
  const positiveCount = array.filter((v) => v > 0).length;
  const negativeCount = array.filter((v) => v < 0).length;

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <Zap size={32} color="#f39c12" />
          <h1 style={{ fontSize: "2rem", margin: 0 }}>
            Maximum Subarray Sum Visualizer
          </h1>
          <TrendingUp size={32} color="#2ecc71" />
        </div>
        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <Target size={18} />
          Understanding Kadane's Algorithm - Finding the contiguous subarray
          with the largest sum
        </p>
      </div>

      {/* MAIN CONTENT: two columns */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT COLUMN: Array + Step Log */}
        <div
          style={{
            flex: "2 1 600px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* ARRAY VISUALIZATION */}
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <BarChart3 size={20} />
              <h3 style={{ margin: 0, color: "white" }}>Array Visualization</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "0.75rem",
                minHeight: "250px",
                padding: "1rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            >
              {array.map((value, index) => (
                <motion.div
                  key={index}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    width: "60px",
                    height: `${Math.max(40, Math.abs(value) * 25 + 40)}px`,
                    background: getBarColor(index),
                    borderRadius: "8px 8px 0 0",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      marginBottom: "6px",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-22px",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    [{index}]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* STEP LOG */}
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              background: "#1e1e1e",
              color: "#d4d4d4",
              padding: "1rem",
              borderRadius: "8px",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
                color: "#fff",
              }}
            >
              <FileText size={18} />
              <h3 style={{ margin: 0, color: "#fff" }}>
                Step-by-Step Explanation
              </h3>
            </div>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {stepLog.map((step, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: "0.75rem", lineHeight: "1.5" }}
                >
                  {step}
                </li>
              ))}
            </ul>
            <div ref={logEndRef}></div>
          </div>
        </div>

        {/* RIGHT COLUMN: Controls + Status + Legend */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* STATUS */}
          <div
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              color: "white",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Activity size={18} />
              <h3 style={{ margin: 0, fontSize: "1rem" }}>Current Status</h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Hash size={16} />
                <span>Index:</span>
              </div>
              <strong>
                {currentIndex} / {array.length}
              </strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Flame size={16} color="#f39c12" />
                <span>Current Sum:</span>
              </div>
              <strong style={{ color: "#f39c12" }}>{currentSum}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Trophy size={16} color="#2ecc71" />
                <span>Best Sum:</span>
              </div>
              <strong style={{ color: "#2ecc71" }}>{maxSum}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <CheckCircle2 size={16} />
                <span>Status:</span>
              </div>
              <strong>{isFinished ? "Complete!" : "In Progress"}</strong>
            </div>
          </div>

          {/* CONTROLS */}
          <div
            style={{
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                onClick={stepForward}
                disabled={isFinished}
                style={buttonStyle}
              >
                <SkipForward size={16} />
                Next Step
              </button>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                disabled={isFinished}
                style={buttonStyle}
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                {isAutoPlaying ? "Pause" : "Auto Play"}
              </button>
              <button onClick={reset} style={buttonStyle}>
                <RotateCcw size={16} />
                Reset
              </button>
              <button onClick={generateRandomArray} style={buttonStyle}>
                <Dice5 size={16} />
                Random
              </button>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Gauge size={16} />
              <span>Speed:</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="100"
                value={playSpeed}
                onChange={(e) => setPlaySpeed(Number(e.target.value))}
                style={{ flex: 1 }}
              />
              <Clock size={14} />
              <span>{playSpeed}ms</span>
            </div>
          </div>

          {/* STATISTICS */}
          {showStats && !isFinished && (
            <div
              style={{
                padding: "1rem",
                background: "#f8f9fa",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                color: "black",
                animation: "slideIn 0.3s ease-out",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Info size={16} />
                <h3 style={{ margin: 0, fontSize: "1rem" }}>
                  Array Statistics
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>📊 Average:</span>
                <strong>{averageValue}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>👍 Positive numbers:</span>
                <strong>{positiveCount}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>👎 Negative numbers:</span>
                <strong>{negativeCount}</strong>
              </div>
            </div>
          )}

          {/* LEGEND */}
          <div
            style={{
              padding: "1rem",
              background: "#f8f9fa",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              color: "black",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Eye size={16} />
              <h3 style={{ margin: 0, fontSize: "1rem" }}>Color Legend</h3>
            </div>
            {[
              {
                color: "#2ecc71",
                label: "Best Subarray Found",
                icon: <Star size={12} />,
              },
              {
                color: "#f39c12",
                label: "Current Working Subarray",
                icon: <Activity size={12} />,
              },
              {
                color: "#e74c3c",
                label: "Currently Processing",
                icon: <AlertCircle size={12} />,
              },
              {
                color: "#3498db",
                label: "Not in Subarray",
                icon: <Circle size={12} />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    background: item.color,
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* TIP SECTION */}
          <div
            style={{
              padding: "1rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Info size={16} />
              <strong>💡 Key Insight</strong>
            </div>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: "1.4" }}>
              When current sum becomes negative, starting fresh gives a better
              result! This is the core of Kadane's Algorithm.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const buttonStyle = {
  padding: "0.5rem 1rem",
  fontSize: "0.9rem",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  background: "#3498db",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
};
