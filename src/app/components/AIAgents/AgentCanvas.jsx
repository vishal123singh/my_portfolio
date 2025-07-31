"use client";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import { useCallback } from "react";
import { useAgentStore } from "@/app/store/useAgentStore";

export default function AgentCanvas() {
  const { nodes, setNodes, edges, setEdges } = useAgentStore();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ flexGrow: 1, height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
