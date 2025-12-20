"use client";

import { Handle, Position } from "reactflow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Copy,
  Settings,
  Plus,
  Sparkles,
  Code,
  ListChecks,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PromptNode({ data, isConnectable, id }) {
  const [editing, setEditing] = useState(false);
  const [promptValue, setPromptValue] = useState(data?.inputs?.prompt || "");
  const [showInputs, setShowInputs] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("prompt");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  const [variables, setVariables] = useState([]);
  const [examples, setExamples] = useState([]);
  const [optimizationSettings, setOptimizationSettings] = useState({
    clarity: true,
    conciseness: true,
    effectiveness: true,
  });

  const variableNames = useMemo(
    () => variables.map((v) => `{{${v.name}}}`).join(", "),
    [variables]
  );

  const handleDelete = useCallback(() => {
    if (data?.onDeleteNode) data.onDeleteNode(id);
  }, [data, id]);

  const handleSave = useCallback(() => {
    setEditing(false);
    const nodeData = {
      inputs: { prompt: promptValue },
      variables,
      examples,
      optimizationSettings,
    };
    if (data?.onUpdatePrompt) data.onUpdatePrompt(promptValue);
    if (data?.onSendData) data.onSendData(nodeData);
  }, [data, id, promptValue, variables, examples, optimizationSettings]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(promptValue);
    // Ensure toast is configured
    // toast.success("Prompt copied to clipboard!");
  }, [promptValue]);

  const optimizePrompt = useCallback(async () => {
    setOptimizing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const improvements = [];
      if (optimizationSettings.clarity)
        improvements.push("Simplified complex phrases");
      if (optimizationSettings.conciseness)
        improvements.push("Removed redundant words");
      if (optimizationSettings.effectiveness)
        improvements.push("Added instructional cues");

      setPromptValue((prev) => `[Optimized] ${prev}`);
      // toast.success(`Optimized: ${improvements.join(", ")}`);
    } catch {
      // toast.error("Optimization failed");
    } finally {
      setOptimizing(false);
    }
  }, [optimizationSettings]);

  const addVariable = useCallback(() => {
    setVariables((prev) => [
      ...prev,
      { name: `var${prev.length + 1}`, description: "" },
    ]);
  }, []);

  const addExample = useCallback(() => {
    setExamples((prev) => [...prev, { input: "", output: "" }]);
  }, []);

  useEffect(() => {
    setPromptValue(data?.inputs?.prompt || "");
  }, [data?.inputs?.prompt, data?._version]);

  const hasInputs = !!(data?.inputs && Object.keys(data.inputs).length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative w-[28rem] group text-gray-200"
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
            className="absolute left-[-220px] top-0 w-[200px] z-20" // Increased z-index
          >
            <Card className="border border-gray-600 bg-gray-800 shadow-lg">
              <CardHeader className="p-3 pb-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    Input Data
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInputs(false)}
                    className="text-gray-400 hover:text-gray-200 h-6 w-6 p-0"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="max-h-60 pr-2">
                  {Object.entries(data.inputs).map(([key, value]) => (
                    <div key={key} className="mb-3 last:mb-0">
                      <Label className="text-gray-300 mb-1 text-xs font-medium">
                        {key}
                      </Label>
                      <pre className="text-green-300 font-mono text-xs whitespace-pre-wrap break-words bg-gray-700/50 p-2 rounded border border-gray-600">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Node */}
      <Card className="w-full relative bg-gray-800 border border-gray-600 shadow-lg">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg" />

        <CardHeader className="p-4 pb-2">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  Prompt Engineering
                </h3>
                <div className="flex gap-2 opacity-100 group-hover:opacity-100 transition-opacity">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-purple-300 hover:bg-gray-700/50"
                        onClick={() => setSettingsOpen(!settingsOpen)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border border-gray-600 text-gray-200">
                      Settings
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-gray-200 hover:bg-gray-700/50"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border border-gray-600 text-gray-200">
                      Copy
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-red-400 hover:bg-gray-700/50"
                        onClick={handleDelete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border border-gray-600 text-gray-200">
                      Delete
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 bg-gray-700 border border-gray-600">
              <TabsTrigger
                value="prompt"
                className="text-xs h-8 data-[state=active]:bg-gray-600 data-[state=active]:text-white"
              >
                <Pencil className="w-3.5 h-3.5 mr-1" />
                Prompt
              </TabsTrigger>
              <TabsTrigger
                value="variables"
                className="text-xs h-8 data-[state=active]:bg-gray-600 data-[state=active]:text-white"
              >
                <Code className="w-3.5 h-3.5 mr-1" />
                Variables
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="text-xs h-8 data-[state=active]:bg-gray-600 data-[state=active]:text-white"
              >
                <ListChecks className="w-3.5 h-3.5 mr-1" />
                Examples
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="mt-3">
              <div className="space-y-3">
                <div className="relative">
                  {editing ? (
                    <Textarea
                      autoFocus
                      className="bg-gray-700 border border-gray-600 text-gray-200 text-sm min-h-[120px] w-full resize-none focus:ring-2 focus:ring-purple-500/50"
                      value={promptValue}
                      onChange={(e) => setPromptValue(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                          handleSave();
                        }
                      }}
                    />
                  ) : (
                    <div
                      className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-200 text-sm min-h-[120px] cursor-text w-full overflow-auto hover:border-gray-500 transition-colors"
                      onClick={() => setEditing(true)}
                    >
                      {promptValue || (
                        <span className="text-gray-400 italic">
                          Click to edit your prompt...
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-gray-400">
                      {promptValue.length} characters
                    </span>
                    {variableNames && (
                      <span className="text-purple-300 bg-purple-900/30 px-2 py-0.5 rounded-full">
                        Variables: {variableNames}
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  onClick={optimizePrompt}
                  disabled={optimizing || !promptValue}
                  className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium flex items-center justify-center gap-2 shadow"
                >
                  {optimizing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Optimize Prompt
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="variables" className="mt-3">
              <Card className="bg-gray-700 border border-gray-600">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-gray-200 font-medium">
                      Template Variables
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-purple-300 hover:text-purple-200 hover:bg-gray-600/50 gap-1"
                      onClick={addVariable}
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  {variables.length > 0 ? (
                    <div className="space-y-2">
                      {variables.map((variable, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-600/50 rounded p-2 border border-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="text-purple-300 text-xs font-mono bg-purple-900/30 px-1.5 py-0.5 rounded">
                                {`{{${variable.name}}}`}
                              </span>
                              <Input
                                type="text"
                                value={variable.description}
                                onChange={(e) => {
                                  const newVars = [...variables];
                                  newVars[index].description = e.target.value;
                                  setVariables(newVars);
                                }}
                                placeholder="Description"
                                className="bg-transparent border-none text-gray-200 text-xs h-6 px-2 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-600/50"
                            onClick={() => {
                              setVariables(
                                variables.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 text-xs py-4">
                      No variables defined
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="mt-3">
              <Card className="bg-gray-700 border border-gray-600">
                <CardHeader className="p-3 pb-0">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-gray-200 font-medium">
                      Few-Shot Examples
                    </Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-purple-300 hover:text-purple-200 hover:bg-gray-600/50 gap-1"
                      onClick={addExample}
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  {examples.length > 0 ? (
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {examples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">
                                Example {index + 1}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-600/50"
                                onClick={() => {
                                  setExamples(
                                    examples.filter((_, i) => i !== index)
                                  );
                                }}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label className="text-xs text-gray-300 mb-1 block">
                                  Input
                                </Label>
                                <Textarea
                                  value={example.input}
                                  onChange={(e) => {
                                    const newExamples = [...examples];
                                    newExamples[index].input = e.target.value;
                                    setExamples(newExamples);
                                  }}
                                  className="bg-gray-600/50 border-gray-600 text-gray-200 text-xs h-20"
                                />
                              </div>
                              <div>
                                <Label className="text-xs text-gray-300 mb-1 block">
                                  Output
                                </Label>
                                <Textarea
                                  value={example.output}
                                  onChange={(e) => {
                                    const newExamples = [...examples];
                                    newExamples[index].output = e.target.value;
                                    setExamples(newExamples);
                                  }}
                                  className="bg-gray-600/50 border-gray-600 text-gray-200 text-xs h-20"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="text-center text-gray-400 text-xs py-4">
                      No examples added
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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
                <Card className="bg-gray-700 border border-gray-600">
                  <CardHeader className="p-3">
                    <Label className="text-xs text-gray-200 font-medium">
                      Optimization Settings
                    </Label>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-2">
                    <div className="divide-y divide-gray-700/50">
                      {Object.entries(optimizationSettings).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between py-3 transition-colors hover:bg-gray-700/20 rounded-md px-2"
                          >
                            <Label className="text-sm text-gray-200 capitalize tracking-wide">
                              {key.replace(/([A-Z])/g, " $1")}
                            </Label>

                            <button
                              onClick={() =>
                                setOptimizationSettings((prev) => ({
                                  ...prev,
                                  [key]: !prev[key],
                                }))
                              }
                              className={`
    relative w-8 h-4 rounded-full transition-colors
    ${value ? "bg-purple-500" : "bg-gray-600"}
  `}
                            >
                              <span
                                className={`
      absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white
      transition-transform
      ${value ? "translate-x-4" : ""}
    `}
                              />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex justify-between items-center w-full">
            {hasInputs && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-300 hover:text-purple-300 gap-1 h-8 hover:bg-gray-700/50"
                onClick={() => setShowInputs(!showInputs)}
              >
                {showInputs ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
                {showInputs ? "Hide" : "Show"} Inputs
              </Button>
            )}

            {(editing || settingsOpen) && (
              <Button
                onClick={handleSave}
                className="gap-2 ml-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-md"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        isConnectable={isConnectable}
        className="w-3.5 h-3.5 !bg-white border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        isConnectable={isConnectable}
        className="w-3.5 h-3.5 !bg-white border-2 border-gray-800 hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      />
    </motion.div>
  );
}
