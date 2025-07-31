"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Wand2,
  Database,
  Copy,
  Loader2,
  Sparkles,
  ChevronDown,
  X,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const DB_TYPES = [
  { value: "mongodb", label: "MongoDB" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlserver", label: "SQL Server" },
];

export default function AIQueryBuilder({
  dbInfo,
  onQueryGenerated,
  data,
  queryAIPrompt,
  setQueryAIPrompt,
}) {
  const [generatedQuery, setGeneratedQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [activeTab, setActiveTab] = useState("read");
  const [showSchema, setShowSchema] = useState(false);

  useEffect(() => {
    if (data?.inputs && data.inputs.query) {
      const inputQuery = data?.inputs?.query || "";
      console.log("Updated input query:", inputQuery);
      setQueryAIPrompt(inputQuery);
    }
  }, [data?.inputs, data?.inputs?.query, data?._version]);

  const clearInputs = () => {
    setQueryAIPrompt("");
    setGeneratedQuery("");
  };

  const generateQuery = async () => {
    if (!dbInfo?.dbType) {
      toast.info("Please select a database connection first");
      return;
    }

    if (!queryAIPrompt.trim()) {
      toast.info("Please describe what you're looking for");
      return;
    }

    setIsGenerating(true);
    setGeneratedQuery("");

    try {
      const response = await fetch("/api/nodes/generate-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dbType: dbInfo.dbType,
          operation: activeTab, // Use the active tab value
          prompt: queryAIPrompt,
          schema: dbInfo.schema,
          tables: dbInfo.tables,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      let finalQuery =
        typeof data.query === "string"
          ? data.query
          : JSON.stringify(data.query, null, 2);
      setGeneratedQuery(
        finalQuery.replace(/^\s*```[a-z]*\n?|```$/g, "").trim()
      );
      console.log("Generated query:", typeof data.query, data.query);
      onQueryGenerated(finalQuery);
      toast.success("Query generated successfully");
    } catch (error) {
      console.error("Error generating query:", error);
      toast.error(error.message || "Failed to generate query");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedQuery) return;

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generatedQuery);
      toast.success("Query copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy query");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex flex-wrap items-center justify-between gap-4 px-4 py-3 rounded-xl border border-gray-700/50 bg-black/30 backdrop-blur-md shadow-inner">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex gap-2 bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-gray-700 rounded-md px-2 py-1 shadow-sm">
            <TabsTrigger
              value="read"
              className="data-[state=active]:text-cyan-400 text-sm text-gray-300 hover:text-cyan-300 transition data-[state=active]:bg-gray-800 data-[state=active]:border-cyan-400"
            >
              Read
            </TabsTrigger>
            <TabsTrigger
              value="write"
              className="data-[state=active]:text-cyan-400 text-sm text-gray-300 hover:text-cyan-300 transition data-[state=active]:bg-gray-800 data-[state=active]:border-cyan-400"
            >
              Write
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* DB Info */}
        {dbInfo && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-700 bg-gradient-to-br from-[#111] to-[#1a1a1a] shadow-sm text-sm text-gray-300">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="tracking-wide font-mono">
              {DB_TYPES.find((t) => t.value === dbInfo.dbType)?.label ||
                "Unknown"}
            </span>
          </div>
        )}
      </div>

      {dbInfo && (
        <Collapsible open={showSchema} onOpenChange={setShowSchema}>
          <CollapsibleTrigger className="flex items-center text-sm text-gray-400 hover:text-gray-200 mb-2">
            <ChevronDown
              className={`w-4 h-4 mr-1 transition-transform ${
                showSchema ? "rotate-180" : ""
              }`}
            />
            {showSchema ? "Hide" : "Show"} Database Schema
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-gray-800/30 p-3 rounded border border-gray-700 mb-4">
              <h4 className="text-xs font-medium text-gray-400 mb-2">
                Database Structure
              </h4>
              <pre className="text-xs text-gray-300 overflow-auto max-h-60">
                {JSON.stringify(dbInfo, null, 2)}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-gray-300">
            Describe your query in natural language
          </label>
          {queryAIPrompt && (
            <button
              onClick={clearInputs}
              className="text-xs text-gray-400 hover:text-gray-200 flex items-center"
            >
              <X className="w-3 h-3 mr-1" /> Clear
            </button>
          )}
        </div>
        <Textarea
          placeholder={
            activeTab === "read"
              ? "e.g. Get all active users with more than 5 orders, sorted by name"
              : "e.g. Add a new user with name 'John Doe', email 'john@example.com', and age 30"
          }
          value={queryAIPrompt}
          onChange={(e) => setQueryAIPrompt(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={generateQuery}
          disabled={isGenerating || !dbInfo?.dbType || !queryAIPrompt.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4 mr-2" />
          )}
          Generate {activeTab === "read" ? "Query" : "Command"}
        </Button>

        {generatedQuery && (
          <Button
            className={
              "bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-gray-100"
            }
            variant="outline"
            onClick={copyToClipboard}
            disabled={isCopying}
          >
            {isCopying ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            Copy
          </Button>
        )}
      </div>

      {generatedQuery ? (
        <div className="mt-4 border border-gray-700 rounded-lg overflow-hidden">
          <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              AI-Generated {activeTab === "read" ? "Query" : "Command"}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8"
                disabled={isCopying}
              >
                {isCopying ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <pre className="p-4 bg-gray-900 text-sm text-green-400 overflow-auto max-h-64">
            {generatedQuery}
          </pre>
        </div>
      ) : (
        <div className="text-xs text-gray-500 mt-4">
          <p>
            Tip: Describe what you need in plain English. The AI understands:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Table/collection names and relationships</li>
            <li>Field names and data types</li>
            <li>Filtering, sorting, and aggregation needs</li>
            <li>Read vs write operations</li>
          </ul>
        </div>
      )}
    </div>
  );
}
