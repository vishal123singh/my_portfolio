"use client";

import { useState } from "react";
import BubbleSortFullLesson from "./components/BubbleSort";
import MaxSubarrayVisualizer from "./components/kadaneAlgo";

export default function AlgoNavigation() {
  const navItems = [
    { name: "Bubble Sort", component: <BubbleSortFullLesson /> },
    { name: "Maximum Subarray (Kadane)", component: <MaxSubarrayVisualizer /> },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // default to first tab

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {navItems.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.name}
              onClick={() => setActiveIndex(idx)}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                background: isActive ? "#3498db" : "#f0f0f0",
                color: isActive ? "white" : "#3498db",
                boxShadow: isActive ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.3s ease",
              }}
            >
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Render the selected visualizer */}
      <div>{navItems[activeIndex].component}</div>
    </div>
  );
}
