import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges } from "react-flow-renderer";

export const useAgentStore = create((set) => ({
  nodes: [],
  edges: [],
  setNodes: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  setEdges: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
}));
