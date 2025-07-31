"use client";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import {
  Database,
  Trash2,
  PlayCircle,
  Pencil,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DBConnectModal from "../Modals/DBConnectModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AIQueryBuilder from "../AIQueryBuilder";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const QUERY_TIMEOUT = 100000; // 100 seconds

export function ConnectToDBNode({ data, isConnectable, id }) {
  const [open, setOpen] = useState(false);
  const [uri, setUri] = useState("");
  const [dbName, setDbName] = useState("");
  const [dbType, setDbType] = useState("mongodb");
  const [customQuery, setCustomQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [collections, setCollections] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [queryAIPrompt, setQueryAIPrompt] = useState("");
  const [isDynamic, setIsDynamic] = useState(data?.isDynamic || false);

  const isConnected = !!uri;
  const dbInfo = useMemo(() => {
    if (!isConnected) return null;
    return {
      dbType,
      schema: dbName,
      tables: collections.map((col) => ({ name: col })),
    };
  }, [isConnected, dbType, dbName, collections]);

  useEffect(() => {
    const inputQuery = data?.inputs?.query || "";
  }, [data.inputs, data.inputs?.query, data._version]);

  const handleDelete = () => {
    data?.onDeleteNode?.(id);
  };

  const handleSave = (connectionData) => {
    setUri(connectionData.uri);
    setDbName(connectionData.dbName);
    setDbType(connectionData.dbType);
    setCollections(connectionData.collections || []);
    data.onUpdate?.(id, connectionData);
    setOpen(false);
    toast.success("Database connection saved");
  };

  const validateQuery = (query) => {
    if (!query.trim()) {
      throw new Error("Please enter a query to execute");
    }

    if (dbType === "mongodb") {
      try {
        JSON.parse(query);
      } catch (e) {
        console.error("Invalid MongoDB query format:", e);
        throw new Error("Invalid MongoDB query format. Expected valid JSON.");
      }
    }
  };

  const handleExecute = async () => {
    if (!isConnected) {
      setError("Please configure database connection first");
      return;
    }

    setLoading(true);
    setError("");
    setShowResults(true);
    try {
      const queryInput = customQuery.trim();
      validateQuery(queryInput);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), QUERY_TIMEOUT);

      const res = await axios.post(
        "/api/nodes/execute-query",
        {
          uri,
          dbName,
          dbType,
          query: dbType === "mongodb" ? JSON.parse(queryInput) : queryInput,
        },
        {
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      if (res.data.error) throw new Error(res.data.error);

      const output = res.data.result;
      const formattedResult = JSON.stringify(output, null, 2);
      setResult(formattedResult);
      data.onOutput?.(id, output);
      toast.success("Query executed successfully");
    } catch (e) {
      const errorMsg =
        e.name === "AbortError"
          ? "Query timed out (10s)"
          : e?.response?.data?.error || e.message;

      setError(errorMsg);
      toast.error(errorMsg);
      console.error("Execution error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryGenerated = (generatedQuery) => {
    try {
      // Handle both direct queries and the { query: "..." } format
      const parsed = JSON.parse(generatedQuery);
      const finalQuery = parsed?.query
        ? JSON.stringify(parsed.query, null, 2)
        : JSON.stringify(parsed, null, 2);

      setCustomQuery(finalQuery);
      toast.success("Query generated successfully");
    } catch (e) {
      // If not JSON, use as-is
      setCustomQuery(generatedQuery);
      toast.success("Query generated successfully");
    }
  };

  return (
    <motion.div
      key={data._version}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      //whileHover={{ scale: 1.02 }}
      className="relative flex"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-green-600 rounded-xl blur-[2px] opacity-70"></div>

      {/* Input Display (Left Side) */}
      {data?.inputs && Object.keys(data.inputs).length > 0 && (
        <div className="absolute left-[-220px] top-0 w-[200px] bg-[#111827] border border-[#2c2c2c] rounded-md p-3 text-xs shadow-md z-10">
          <h3 className="text-gray-400 mb-2">Inputs</h3>
          {Object.entries(data.inputs).map(([key, value]) => (
            <div key={key} className="mb-2">
              <div className="text-gray-400 mb-1">{key}</div>
              <pre className="text-green-400 font-mono whitespace-pre-wrap break-words">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Main Node Content */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-l-xl shadow-xl p-4 w-80 z-10">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-tl-xl" />

        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-2 rounded-lg">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">
                  Database Query
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        isConnected
                          ? "bg-green-900/50 text-green-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {isConnected ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      {isConnected ? "Connected" : "Not Configured"}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border border-gray-700 text-xs">
                    {isConnected
                      ? `Connected to ${dbType} database`
                      : "Click configure to set up connection"}
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setOpen(true)}
                      className="text-gray-400 hover:text-cyan-400"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border border-gray-700">
                    Configure connection
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleDelete}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border border-gray-700">
                    Delete node
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1 truncate">
              {dbType.toUpperCase()} | {dbName || "No database selected"}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {/* {isConnected && dbInfo && (
            <AIQueryBuilder
              dbInfo={dbInfo}
              onQueryGenerated={handleQueryGenerated}
              data={data}
              queryAIPrompt={queryAIPrompt}
              setQueryAIPrompt={setQueryAIPrompt}
            />
          )} */}
          {/* Dynamic Toggle */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <span>Dynamic Mode</span>
            <Switch
              checked={isDynamic}
              onCheckedChange={(checked) => {
                setIsDynamic(checked);
                data?.onUpdateNode?.(id, {
                  prompt: queryPrompt,
                  query: generatedQuery,
                  isDynamic: checked,
                });
              }}
            />
          </div>
          <AIQueryBuilder
            dbInfo={dbInfo}
            onQueryGenerated={handleQueryGenerated}
            data={data}
            queryAIPrompt={queryAIPrompt}
            setQueryAIPrompt={setQueryAIPrompt}
          />
          <Button
            size="sm"
            onClick={handleExecute}
            disabled={!isConnected || loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Executing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                Execute Query
              </span>
            )}
          </Button>

          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded p-2 text-xs text-red-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Handles */}

        <Handle
          type="target"
          position={Position.Left}
          id="input"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-cyan-600 border-2 border-gray-800"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          isConnectable={isConnectable}
          className="w-3 h-3 bg-cyan-600 border-2 border-gray-800"
        />
      </div>

      {/* Results Panel */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: showResults ? 300 : 0 }}
        className="relative bg-gray-900 border-t border-r border-b border-gray-700 rounded-r-xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-3 border-b border-gray-700">
            <h3 className="text-sm font-medium text-teal-300 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" />
              Query Results
            </h3>
            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-cyan-400">
              {result && Array.isArray(JSON.parse(result))
                ? `${JSON.parse(result).length} items`
                : "Object"}
            </span>
          </div>

          {result ? (
            <pre className="flex-1 p-3 text-xs text-green-200 overflow-auto bg-black/20">
              {result}
            </pre>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <p className="text-gray-500 text-sm text-center">
                {loading
                  ? "Executing query..."
                  : "Execute a query to see results"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <DBConnectModal
        open={open}
        setOpen={setOpen}
        initialData={{ dbType, uri, dbName }}
        handleSave={handleSave}
        collections={collections}
        setCollections={setCollections}
      />
    </motion.div>
  );
}
