"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BubbleSortFullLesson() {
  const initialArray = [5, 3, 8, 4, 2];
  const [array, setArray] = useState([...initialArray]);
  const [originalArray, setOriginalArray] = useState([...initialArray]);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [stepExplanation, setStepExplanation] = useState("");
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [swapCount, setSwapCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [currentPass, setCurrentPass] = useState(1);
  const [swapping, setSwapping] = useState(false);
  const [optimizedMode, setOptimizedMode] = useState(false);
  const [noSwapsInPass, setNoSwapsInPass] = useState(false);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCode, setShowCode] = useState(false);
  const timerRef = useRef(null);

  // Optimized bubble sort with early termination
  const stepForward = useCallback(() => {
    if (done) return;

    let arr = [...array];
    let explanation = "";
    let swapped = false;

    if (j < arr.length - i - 1) {
      const left = arr[j];
      const right = arr[j + 1];

      setComparisonCount((prev) => prev + 1);
      setHighlightedIndices([j, j + 1]);
      explanation = `Compare ${left} and ${right}`;

      if (left > right) {
        setSwapping(true);
        setTimeout(() => {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray(arr);
          setSwapCount((prev) => prev + 1);
          setSwapping(false);

          // Save to history
          setHistory((prev) => [
            ...prev.slice(0, historyIndex + 1),
            {
              array: [...arr],
              i,
              j: j + 1,
              swapCount: swapCount + 1,
              comparisonCount: comparisonCount + 1,
              pass: currentPass,
            },
          ]);
          setHistoryIndex((prev) => prev + 1);
        }, 150);

        explanation += ` ❌ ${left} > ${right}, so SWAP them!`;
        swapped = true;
      } else {
        explanation += ` ✅ ${left} ≤ ${right}, so no swap needed`;
        // Save to history even for non-swaps
        setTimeout(() => {
          setHistory((prev) => [
            ...prev.slice(0, historyIndex + 1),
            {
              array: [...arr],
              i,
              j: j + 1,
              swapCount,
              comparisonCount: comparisonCount + 1,
              pass: currentPass,
            },
          ]);
          setHistoryIndex((prev) => prev + 1);
        }, 50);
      }

      setStepExplanation(explanation);
      setJ(j + 1);
    } else {
      // End of current pass
      const newSortedIndices = [...sortedIndices];
      newSortedIndices[arr.length - i - 1] = arr[arr.length - i - 1];
      setSortedIndices(newSortedIndices);

      // Check if any swaps occurred in this pass
      if (optimizedMode && !swapped && j === arr.length - i - 1) {
        setStepExplanation(
          `🎯 Optimization Triggered! 🎯\n\n` +
            `Pass ${i + 1} had no swaps - array is fully sorted!\n` +
            `Early termination saved ${((arr.length - i - 2) * (arr.length - i - 1)) / 2} comparisons.`,
        );
        setDone(true);
        setIsPlaying(false);
        setNoSwapsInPass(true);
        return;
      }

      if (i + 1 >= arr.length - 1) {
        setStepExplanation(
          `🎉 Sorting Complete! 🎉\n\n` +
            `📊 Performance Statistics:\n` +
            `• Total Passes: ${i + 1}\n` +
            `• Total Comparisons: ${comparisonCount}\n` +
            `• Total Swaps: ${swapCount}\n` +
            `• Efficiency: ${((swapCount / comparisonCount) * 100).toFixed(1)}% swap rate\n\n` +
            `✨ The largest elements "bubbled up" to their correct positions!\n` +
            `${optimizedMode ? "🎯 Optimized mode detected early completion!" : ""}`,
        );
        setDone(true);
        setIsPlaying(false);
      } else {
        setCurrentPass(i + 2);
        setStepExplanation(
          `✅ Pass ${i + 1} Complete! (${arr.length - i - 1} comparisons in this pass)\n` +
            `📌 Largest element ${arr[arr.length - i - 1]} bubbled to position ${arr.length - i}\n` +
            `🔄 Starting Pass ${i + 2}...\n` +
            `${optimizedMode ? "💡 Tip: If no swaps occur next pass, sorting will terminate early!" : ""}`,
        );
        setJ(0);
        setI(i + 1);
        setHighlightedIndices([]);
      }
    }
  }, [
    array,
    done,
    i,
    j,
    sortedIndices,
    comparisonCount,
    swapCount,
    currentPass,
    optimizedMode,
    historyIndex,
  ]);

  // Auto-play with cleanup
  useEffect(() => {
    if (isPlaying && !done) {
      timerRef.current = setTimeout(() => {
        stepForward();
      }, speed);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, done, stepForward, speed]);

  const resetArray = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setArray([...originalArray]);
    setI(0);
    setJ(0);
    setStepExplanation("");
    setDone(false);
    setIsPlaying(false);
    setSwapCount(0);
    setComparisonCount(0);
    setSortedIndices([]);
    setCurrentPass(1);
    setSwapping(false);
    setHighlightedIndices([]);
    setNoSwapsInPass(false);
    setHistory([]);
    setHistoryIndex(-1);
  }, [originalArray]);

  const generateRandomArray = () => {
    const newArray = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 9) + 1,
    );
    setOriginalArray([...newArray]);
    setArray([...newArray]);
    resetArray();
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      setArray(prevState.array);
      setI(prevState.i);
      setJ(prevState.j);
      setSwapCount(prevState.swapCount);
      setComparisonCount(prevState.comparisonCount);
      setCurrentPass(prevState.pass);
      setHistoryIndex((prev) => prev - 1);
      setStepExplanation("↩️ Undid last step");
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setArray(nextState.array);
      setI(nextState.i);
      setJ(nextState.j);
      setSwapCount(nextState.swapCount);
      setComparisonCount(nextState.comparisonCount);
      setCurrentPass(nextState.pass);
      setHistoryIndex((prev) => prev + 1);
      setStepExplanation("↪️ Redid step");
    }
  };

  const getBarColor = (index, value) => {
    if (swapping && (index === j || index === j + 1)) return "#ff4757";
    if (sortedIndices.includes(value)) return "#2ed573";
    if (highlightedIndices.includes(index)) return "#ffa502";
    if (index === j) return "#1e90ff";
    if (index === j + 1) return "#ff6b81";
    return "#70a1ff";
  };

  const getBarHeight = (value) => {
    const maxValue = Math.max(...array, 9);
    return (value / maxValue) * 200;
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            style={{
              fontSize: "3rem",
              marginBottom: "0.5rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🫧 Bubble Sort Visualizer
          </motion.h1>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            Interactive learning with optimization & real-time analytics
          </p>
        </div>

        {/* Stats Panel - Enhanced */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: "15px",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Current Pass", value: currentPass, icon: "🔄" },
            { label: "Comparisons", value: comparisonCount, icon: "🔍" },
            { label: "Swaps", value: swapCount, icon: "🔄" },
            {
              label: "Swap Rate",
              value: `${((swapCount / (comparisonCount || 1)) * 100).toFixed(1)}%`,
              icon: "📊",
            },
            { label: "Array Size", value: array.length, icon: "📏" },
            {
              label: "Progress",
              value: `${Math.floor((sortedIndices.filter((v) => v !== undefined).length / array.length) * 100)}%`,
              icon: "📈",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              style={{
                textAlign: "center",
                background: "white",
                padding: "1rem",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#666",
                  marginTop: "0.5rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#667eea",
                }}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Array Visualization - Enhanced */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "1rem",
            margin: "3rem 0",
            padding: "2rem",
            background: "#f8f9fa",
            borderRadius: "15px",
            minHeight: "350px",
            position: "relative",
          }}
        >
          <AnimatePresence>
            {array.map((value, index) => (
              <motion.div
                key={`${index}-${value}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <motion.div
                  animate={{
                    height: getBarHeight(value),
                    backgroundColor: getBarColor(index, value),
                    scale: highlightedIndices.includes(index) ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 70,
                    borderRadius: "10px 10px 0 0",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  >
                    {value}
                  </span>
                </motion.div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    fontWeight: "500",
                  }}
                >
                  [{index}]
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Control Panel - Enhanced */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={stepForward}
            disabled={done}
            style={buttonStyle(done ? "#ccc" : "#3498db")}
          >
            ⏯️ Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={done}
            style={buttonStyle(
              done ? "#ccc" : isPlaying ? "#e74c3c" : "#2ecc71",
            )}
          >
            {isPlaying ? "⏸️ Pause" : "▶️ Auto"}
          </button>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            style={buttonStyle(historyIndex <= 0 ? "#ccc" : "#95a5a6")}
          >
            ↩️ Undo
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            style={buttonStyle(
              historyIndex >= history.length - 1 ? "#ccc" : "#95a5a6",
            )}
          >
            ↪️ Redo
          </button>
          <button onClick={resetArray} style={buttonStyle("#95a5a6")}>
            🔄 Reset
          </button>
          <button onClick={generateRandomArray} style={buttonStyle("#9b59b6")}>
            🎲 Random
          </button>
          <button
            onClick={() => setOptimizedMode(!optimizedMode)}
            style={buttonStyle(optimizedMode ? "#f39c12" : "#3498db")}
          >
            {optimizedMode ? "⚡ Optimized ON" : "🐢 Standard Mode"}
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            style={buttonStyle("#34495e")}
          >
            {showCode ? "📖 Hide Code" : "💻 Show Code"}
          </button>
        </div>

        {/* Speed Control */}
        {isPlaying && !done && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span>⚡ Speed:</span>
            <input
              type="range"
              min="200"
              max="1500"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              style={{ width: "200px" }}
            />
            <span>{speed}ms</span>
          </div>
        )}

        {/* Code Display */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "#1e1e1e",
              color: "#d4d4d4",
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              overflowX: "auto",
            }}
          >
            <pre
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: "0.9rem",
              }}
            >
              {`function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  ${optimizedMode ? "// Optimized with early termination" : "// Standard bubble sort"}
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    ${optimizedMode ? "// If no swaps, array is sorted" : ""}
    ${optimizedMode ? "if (!swapped) break;" : ""}
  }
  return arr;
}`}
            </pre>
          </motion.div>
        )}

        {/* Explanation Panel - Enhanced */}
        <div
          style={{
            maxWidth: "800px",
            margin: "2rem auto",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "15px",
            color: "white",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            📖 Algorithm Explanation
          </h3>
          <p
            style={{
              lineHeight: "1.6",
              whiteSpace: "pre-line",
              fontSize: "1rem",
            }}
          >
            {stepExplanation ||
              "✨ Ready to learn Bubble Sort? Click Step Forward or Auto-Play to begin!"}
          </p>

          {!done && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "10px",
                fontSize: "0.9rem",
                backdropFilter: "blur(10px)",
              }}
            >
              💡 <strong>Pro Tip:</strong>{" "}
              {optimizedMode
                ? "Optimized mode stops early when the array is sorted, saving unnecessary comparisons!"
                : "Try switching to Optimized Mode to see how early termination works!"}
            </div>
          )}
        </div>

        {/* Complexity Information - Enhanced */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
            marginTop: "2rem",
            padding: "1.5rem",
            background: "#ecf0f1",
            color: "black",
            borderRadius: "15px",
          }}
        >
          <div>
            <h4 style={{ color: "#2c3e50" }}>⏱️ Time Complexity</h4>
            <p>
              <strong>Best:</strong> O(n) - Already sorted
              {optimizedMode ? " (with optimization)" : ""}
              <br />
              <strong>Average:</strong> O(n²)
              <br />
              <strong>Worst:</strong> O(n²) - Reverse sorted
            </p>
          </div>
          <div>
            <h4 style={{ color: "#2c3e50" }}>💾 Space Complexity</h4>
            <p>O(1) - In-place sorting algorithm</p>
            <h4 style={{ color: "#2c3e50", marginTop: "1rem" }}>
              📊 Stability
            </h4>
            <p>✅ Stable - Equal elements maintain relative order</p>
          </div>
          <div>
            <h4 style={{ color: "#2c3e50" }}>🎯 Key Insights</h4>
            <p>
              • Largest elements "bubble" to the end
              <br />
              • Each pass reduces comparison count by 1<br />•{" "}
              {optimizedMode
                ? "Optimized version can finish in O(n) on sorted data"
                : "Can be optimized with early termination"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = (bgColor) => ({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  background: bgColor,
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  fontWeight: "500",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});
