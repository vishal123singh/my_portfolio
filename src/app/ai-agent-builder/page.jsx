"use client";

import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
  Panel,
} from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowUpToLine,
  Play,
  Save,
  PlusCircle,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Info,
  GitFork,
  Cpu,
  Database,
  Code2,
  Search,
  Youtube,
  FileText,
  Gauge,
  BrainCircuit,
  UserCheck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "reactflow/dist/style.css";
import PromptNode from "@/app/components/nodes/PromptNode";
import ToolNode from "@/app/components/nodes/ToolNode";
import OutputNode from "@/app/components/nodes/OutputNode";
import { TriggerNode } from "@/app/components/nodes/TriggerNode";
import { IfElseNode } from "../components/nodes/IfElseNode";
import { SwitchNode } from "../components/nodes/SwitchNode";
import { ConnectToDBNode } from "../components/nodes/ConnectToDBNode";
import CustomEdge from "@/app/components/CustomEdge";
import LLMNode from "../components/nodes/LLMNode";
import HTTPNode from "../components/nodes/HttpNode";
import FileReaderNode from "../components/nodes/FileReaderNode";
import WebResearchNode from "../components/nodes/WebResearchNode";
import YouTubeNode from "../components/nodes/YoutubeNode";
import EvaluationNode from "../components/nodes/EvaluationNode";
import AgentMemoryNode from "../components/nodes/MemoryNode";
import { SelectViewport } from "@radix-ui/react-select";
import { SiLoop } from "react-icons/si";
import AILoopNode from "../components/nodes/AILoopNode";
import CustomerFeedbackNode from "../components/nodes/FeedbackNode";

const edgeTypes = {
  custom: CustomEdge,
};

const NODE_ICONS = {
  prompt: <Sparkles className="w-4 h-4 mr-2 text-purple-400" />,
  tool: <Cpu className="w-4 h-4 mr-2 text-blue-400" />,
  output: <ArrowUpToLine className="w-4 h-4 mr-2 text-green-400" />,
  trigger: <Zap className="w-4 h-4 mr-2 text-yellow-400" />,
  ifelse: <GitFork className="w-4 h-4 mr-2 text-cyan-400" />,
  switch: <Code2 className="w-4 h-4 mr-2 text-orange-400" />,
  connect_db: <Database className="w-4 h-4 mr-2 text-emerald-400" />,
  llm: <BrainCircuit className="w-4 h-4 mr-2 text-pink-400" />,
  http: <Gauge className="w-4 h-4 mr-2 text-red-400" />,
  file_reader: <FileText className="w-4 h-4 mr-2 text-amber-400" />,
  web_research: <Search className="w-4 h-4 mr-2 text-sky-400" />,
  youtube: <Youtube className="w-4 h-4 mr-2 text-rose-400" />,
  evaluation: <Info className="w-4 h-4 mr-2 text-indigo-400" />,
  memory: <Database className="w-4 h-4 mr-2 text-violet-400" />,
  loop: <SiLoop className="w-4 h-4 mr-2 text-violet-400" />,
  feedback: <UserCheck className="w-4 h-4 mr-2 text-violet-400" />,
};

const AVAILABLE_NODE_TYPES = [
  { type: "prompt", label: "Prompt", icon: NODE_ICONS.prompt },
  { type: "tool", label: "Tool", icon: NODE_ICONS.tool },
  { type: "output", label: "Output", icon: NODE_ICONS.output },
  { type: "trigger", label: "Trigger", icon: NODE_ICONS.trigger },
  { type: "ifelse", label: "If / Else", icon: NODE_ICONS.ifelse },
  { type: "switch", label: "Switch", icon: NODE_ICONS.switch },
  { type: "connect_db", label: "Connect to DB", icon: NODE_ICONS.connect_db },
  { type: "llm", label: "AI Agent", icon: NODE_ICONS.llm },
  { type: "http", label: "HTTP", icon: NODE_ICONS.http },
  { type: "file_reader", label: "File Reader", icon: NODE_ICONS.file_reader },
  {
    type: "web_research",
    label: "Web Research",
    icon: NODE_ICONS.web_research,
  },
  { type: "youtube", label: "YouTube", icon: NODE_ICONS.youtube },
  { type: "evaluation", label: "Evaluation", icon: NODE_ICONS.evaluation },
  { type: "memory", label: "Memory", icon: NODE_ICONS.memory },
  { type: "improvement_loop", label: "Improvement", icon: NODE_ICONS.loop },
  { type: "feedback", label: "Feedback", icon: NODE_ICONS.feedback },
];

const nodeTypes = {
  prompt: PromptNode,
  tool: ToolNode,
  output: OutputNode,
  trigger: TriggerNode,
  ifelse: IfElseNode,
  switch: SwitchNode,
  connect_db: ConnectToDBNode,
  llm: LLMNode,
  http: HTTPNode,
  file_reader: FileReaderNode,
  web_research: WebResearchNode,
  youtube: YouTubeNode,
  evaluation: EvaluationNode,
  memory: AgentMemoryNode,
  improvement_loop: AILoopNode,
  feedback: CustomerFeedbackNode,
};

function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedType, setSelectedType] = useState("prompt");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showTips, setShowTips] = useState(true);
  const { fitView } = useReactFlow();
  const edgesRef = useRef([]);

  // --- Node counts ---
  const nodeCounts = useMemo(() => {
    return nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {});
  }, [nodes]);

  useEffect(() => {
    edgesRef.current = edges;
    return () => {
      edgesRef.current = [];
    };
  }, [edges]);

  const propagateNodeData = useCallback(
    (nodeId, data) => {
      setNodes((nds) => {
        const sourceNode = nds.find((n) => n.id === nodeId);
        const outgoingEdges = edgesRef.current.filter(
          (e) => e.source === nodeId
        );

        return nds.map((node) => {
          // Check if this node is connected to our source node
          const incomingEdge = outgoingEdges.find((e) => e.target === node.id);
          if (!incomingEdge) return node;

          return {
            ...node,
            data: {
              ...node.data,
              inputs: {
                ...node.data.inputs,
                ...data, // Merge the new data
              },
              _version: Math.random(), // Force update
              sourceNodeType: sourceNode?.type, // Add source node type
            },
          };
        });
      });
    },
    [edgesRef]
  );

  // --- Delete Edge ---
  const handleEdgeDelete = useCallback((edgeId) => {
    setEdges((eds) => {
      const deletedEdge = eds.find((e) => e.id === edgeId);
      const newEdges = eds.filter((e) => e.id !== edgeId);

      if (deletedEdge) {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id !== deletedEdge.target) return node;

            const updatedInputs = { ...(node.data?.inputs || {}) };
            if (deletedEdge.sourceHandle) {
              delete updatedInputs[deletedEdge.sourceHandle];
            }

            return {
              ...node,
              data: {
                ...node.data,
                inputs: updatedInputs,
                _version: Math.random(),
              },
            };
          })
        );
      }
      return newEdges;
    });
  }, []);

  // --- On Connect ---
  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      id: `edge-${params.source}-${params.target}-${Date.now()}`,
      type: "custom",
      animated: true,
      data: { onDelete: handleEdgeDelete }, // Pass the handler here
    };

    setEdges((eds) => addEdge(newEdge, eds));

    // Immediately propagate data after connection
    setNodes((nodes) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      if (sourceNode?.data?.onSendData) {
        // Pass only the inputs, not the whole node data
        sourceNode.data.onSendData(sourceNode.data.inputs || {});
      }
      return nodes;
    });
  }, []);

  // --- Add Node ---
  const handleAddNode = (type) => {
    const id = `node-${Date.now()}-${Math.random()}`;
    const lastNode = nodes[nodes.length - 1];
    const position = lastNode
      ? { x: lastNode.position.x + 550, y: lastNode.position.y }
      : { x: 100, y: 100 };

    const commonNodeData = {
      inputs: {},
      onDeleteNode: () => {
        setNodes((prev) => prev.filter((node) => node.id !== id));
      },
      onSendData: (data) => {
        propagateNodeData(id, data);
      },
    };

    const typeSpecificData = {
      prompt: {
        inputs: { prompt: "" },
        onUpdatePrompt: (prompt) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    inputs: {
                      ...(node.data.inputs || {}),
                      prompt,
                    },
                    _version: Math.random(),
                  },
                };
              }
              return node;
            })
          );
          propagateNodeData(id, { prompt });
        },
      },
      tool: { tool: "search_google" },
      output: { output: "Final result..." },
      connect_db: {
        connectionString: "",
        query: "",
        onUpdate: (nodeId, connectionData) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === nodeId) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    ...connectionData,
                    _version: Math.random(),
                  },
                };
              }
              return node;
            })
          );
        },
      },
    };

    const newNode = {
      id,
      type,
      position,
      data: {
        ...commonNodeData,
        ...typeSpecificData[type],
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setTimeout(() => fitView({ padding: 0.5 }), 100);
  };

  // --- Node Click ---
  const handleNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  // --- Run / Save Workflow ---
  const handleRunWorkflow = useCallback(() => {
    console.log("Running workflow with nodes:", nodes);
  }, [nodes]);

  const handleSaveWorkflow = useCallback(() => {
    console.log("Saving workflow with nodes:", nodes);
  }, [nodes]);

  // --- Initial Nodes ---
  useEffect(() => {
    const id = `node-${Date.now()}`;
    setNodes([
      {
        id,
        type: "prompt",
        position: { x: window.innerWidth / 2 - 150, y: 100 },
        data: {
          inputs: { prompt: "What do you want the agent to do?" },
          onDeleteNode: () => {
            setNodes((prev) => prev.filter((node) => node.id !== id));
          },
          onUpdatePrompt: (prompt) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === id) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      inputs: {
                        ...(node.data.inputs || {}),
                        prompt,
                      },
                      _version: Math.random(),
                    },
                  };
                }
                return node;
              })
            );
            propagateNodeData(id, { prompt });
          },
          onSendData: () => {
            setNodes((currentNodes) => {
              const currentNode = currentNodes.find((n) => n.id === id);
              if (currentNode) {
                propagateNodeData(id, {
                  prompt: currentNode.data.inputs.prompt,
                });
              }
              return currentNodes;
            });
          },
        },
      },
    ]);
    setTimeout(() => fitView({ padding: 0.5 }), 100);
  }, []); // <-- only run once

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-black">
          <div className="w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        </div>

        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0, 1.5, 0],
              x: Math.random() * 2000 - 1000,
              y: Math.random() * 2000 - 1000,
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut",
            }}
            className="absolute rounded-full mix-blend-screen blur-2xl"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#60a5fa" : "#34d399"
              }, transparent 70%)`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 py-3 px-4 md:py-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            <h1 className="text-sm md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 truncate max-w-[120px] md:max-w-none">
              Agent Workflow Editor
            </h1>
            <Badge
              variant="outline"
              className="border-purple-500 text-purple-400 text-xs px-1.5 py-0 md:text-sm md:px-2"
            >
              Beta
            </Badge>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center space-x-1.5 md:space-x-3">
            {/* Run Workflow Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRunWorkflow}
                  className="relative px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 
            hover:from-purple-800 hover:via-indigo-900 hover:to-blue-950 
            text-xs md:text-sm font-semibold text-white shadow-[0_0_8px_#8b5cf680] md:shadow-[0_0_12px_#8b5cf680]
            transition duration-300 ease-in-out flex items-center space-x-1 md:space-x-2 overflow-hidden"
                >
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-lg md:blur-xl opacity-20 rounded-xl animate-pulse" />
                  <Play className="w-3 h-3 md:w-4 md:h-4 z-10 text-white" />
                  <span className="z-10 hidden sm:inline">Run Workflow</span>
                  <span className="z-10 sm:hidden">Run</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-gray-800 text-white border border-gray-700 text-xs md:text-sm"
              >
                Execute the current workflow (Ctrl+R)
              </TooltipContent>
            </Tooltip>

            {/* Save Workflow Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveWorkflow}
                  className="relative px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-700 to-emerald-800 
            hover:from-teal-700 hover:via-cyan-800 hover:to-emerald-900 
            text-xs md:text-sm font-semibold text-white shadow-[0_0_8px_#34d39980] md:shadow-[0_0_12px_#34d39980]
            transition duration-300 ease-in-out flex items-center space-x-1 md:space-x-2 overflow-hidden"
                >
                  <span className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-green-400 blur-lg md:blur-xl opacity-20 rounded-xl animate-pulse" />
                  <Save className="w-3 h-3 md:w-4 md:h-4 z-10 text-white" />
                  <span className="z-10 hidden sm:inline">Save Workflow</span>
                  <span className="z-10 sm:hidden">Save</span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-gray-800 text-white border border-gray-700 text-xs md:text-sm"
              >
                Save current workflow (Ctrl+S)
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Node type selector */}
      <Panel position="top-left" className="!relative !top-18 !left-4 z-50">
        <Select
          onValueChange={(value) => {
            setSelectedType(value);
            handleAddNode(value);
          }}
        >
          <SelectTrigger
            className="
    w-56 bg-gray-800 border border-gray-600
    text-white
    [&_[data-placeholder]]:text-white
    rounded-lg hover:border-purple-400
    focus:ring-2 focus:ring-purple-500 focus:border-transparent
    transition-all duration-200 shadow-lg
  "
            aria-label="Add node type"
          >
            <PlusCircle className="w-5 h-5 text-purple-400 mr-2" />
            <SelectValue placeholder="Add Node Type" />
          </SelectTrigger>

          <SelectContent
            className="bg-gray-800 border border-gray-600 text-white rounded-lg shadow-xl overflow-hidden"
            position="popper"
            align="start"
            sideOffset={8}
          >
            <SelectScrollUpButton className="flex items-center justify-center h-8 bg-gray-800 text-white">
              <ChevronUp className="w-5 h-5" />
            </SelectScrollUpButton>

            <SelectViewport className="p-1 max-h-[300px]">
              {AVAILABLE_NODE_TYPES.map((node) => (
                <SelectItem
                  key={node.type}
                  value={node.type}
                  className="px-3 py-2 text-sm rounded-md hover:bg-purple-600/50 focus:bg-purple-600/50 hover:text-white focus:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center">
                    {node.icon}
                    {node.label}
                    {/* <span className="ml-2">{nodeCounts[node.type] || 0}</span> */}
                  </span>
                </SelectItem>
              ))}
            </SelectViewport>

            <SelectScrollDownButton className="flex items-center justify-center h-8 bg-gray-800 text-white">
              <ChevronDown className="w-5 h-5" />
            </SelectScrollDownButton>
          </SelectContent>
        </Select>
      </Panel>

      {/* React Flow canvas */}
      <ReactFlow
        connectionRadius={30}
        isValidConnection={({ sourceHandle, targetHandle }) => {
          // Allow connections from case handles
          if (sourceHandle?.startsWith("case-")) return true;

          // Allow default case connection
          if (sourceHandle === "default-case") return true;

          // Allow any output to input connection
          if (targetHandle === "input") return true;

          // Special cases (like if/else branches)
          if (sourceHandle === "true" || sourceHandle === "false") return true;

          return false;
        }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-gradient-to-b from-black via-gray-900 to-black"
        fitViewOptions={{ padding: 0.5 }}
      >
        <Background
          variant="dots"
          gap={32}
          size={1.5}
          color="#4b5563"
          className="opacity-20"
        />
        <MiniMap
          position="top-right"
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            if (node.type === "prompt") return "#8b5cf6";
            if (node.type === "tool") return "#6366f1";
            return "#10b981";
          }}
          maskColor="rgba(17, 24, 39, 0.7)"
          style={{
            backgroundColor: "rgba(31, 41, 55, 0.8)",
            backdropFilter: "blur(4px)",
            borderRadius: "8px",
            border: "1px solid #4b5563",
          }}
        />
        <Controls
          style={{
            backgroundColor: "rgba(31, 41, 55, 0.9)",
            borderRadius: "6px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
            border: "1px solid #4b5563",
          }}
          position="top-right"
        />
      </ReactFlow>

      {/* Tip box */}
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-4 bg-gray-900/90 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-md border border-gray-800 z-50"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400 flex items-center">
                <span className="mr-2 bg-gradient-to-r from-purple-500 to-pink-500 w-3 h-3 rounded-full animate-pulse"></span>
                Tip: Drag from connection points to create relationships
              </p>
              <button
                onClick={() => setShowTips(false)}
                className="ml-4 text-gray-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-2 px-4">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>
              <span>Connected</span>
            </div>
            <span>Last saved: Just now</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              Nodes: {nodes.length} | Edges: {edges.length}
            </span>
            <div className="flex space-x-2">
              {Object.entries(nodeCounts).map(([type, count]) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="border-gray-700 text-gray-400 text-xs px-2 py-0.5"
                >
                  {AVAILABLE_NODE_TYPES.find((n) => n.type === type)?.label}:{" "}
                  {count}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ReactFlowProvider>
      <WorkflowEditor />
    </ReactFlowProvider>
  );
}
