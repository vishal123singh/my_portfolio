"use client";
import { useAgentStore } from "@/app/store/useAgentStore";
import { v4 as uuidv4 } from "uuid";

const components = [
  { label: "Input", type: "input" },
  { label: "Agent", type: "agent" },
  { label: "Output", type: "output" },
];

export default function Toolbox() {
  const addNode = useAgentStore((state) => state.addNode);

  const handleAdd = (type) => {
    const id = uuidv4();
    addNode({
      id,
      type: "default",
      data: { label: `${type} Node` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    });
  };

  return (
    <div style={{ width: 200, padding: 20, background: "blue" }}>
      <h3>Toolbox</h3>
      {components.map((c) => (
        <button
          key={c.type}
          onClick={() => handleAdd(c.type)}
          style={{ display: "block", margin: "10px 0" }}
        >
          Add {c.label}
        </button>
      ))}
    </div>
  );
}
