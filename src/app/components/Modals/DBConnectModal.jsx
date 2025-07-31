"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { AlertCircle, CheckCircle2, Database, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const connectionSteps = [
  { id: 1, name: "Select Database Type" },
  { id: 2, name: "Enter Connection Details" },
  { id: 3, name: "Test Connection" },
];

export default function DBConnectModal({
  open,
  setOpen,
  initialData,
  handleSave,
  collections,
  setCollections,
}) {
  const [dbType, setDbType] = useState(initialData.dbType || "mongodb");
  const [uri, setUri] = useState(initialData.uri || "");
  const [dbName, setDbName] = useState(initialData.dbName || "");
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const dbPlaceholders = {
    mongodb: "mongodb+srv://user:pass@cluster.mongodb.net/",
    postgres: "postgresql://user:pass@host:port/dbname",
    mysql: "mysql://user:pass@host:port/dbname",
  };

  const sampleQueries = {
    mongodb: `{
  "collection": "users",
  "filter": {"status": "active"},
  "projection": {"name": 1, "email": 1},
  "limit": 10
}`,
    postgres: "SELECT * FROM users WHERE status = 'active' LIMIT 10;",
    mysql: "SELECT name, email FROM users WHERE status = 'active' LIMIT 10;",
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setConnectionStatus("");

    try {
      const res = await axios.post("/api/nodes/test-db", {
        uri,
        dbName,
        dbType,
      });

      if (res.data.error) throw new Error(res.data.error);

      const results = res.data.tables || res.data.collections || [];
      setCollections(results);
      setConnectionStatus(
        `Success! Found ${results.length} collections/tables`
      );
      setCurrentStep(3);
    } catch (err) {
      setConnectionStatus(err.response?.data?.error || err.message);
    } finally {
      setTesting(false);
    }
  };

  const handleSubmit = () => {
    handleSave({ dbType, uri, dbName });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl rounded-xl p-6 w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 text-lg font-semibold">
            Database Connection
          </DialogTitle>
          <div className="flex items-center gap-2 pt-2">
            {connectionSteps.map((step) => (
              <Badge
                key={step.id}
                variant={currentStep >= step.id ? "default" : "secondary"}
                className="text-xs flex items-center gap-1"
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <Database className="w-3 h-3" />
                )}
                {step.name}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Select
                value={dbType}
                onValueChange={(value) => {
                  setDbType(value);
                  setCurrentStep(2);
                }}
              >
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-white">
                  <SelectValue placeholder="Select Database Type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                  <SelectItem value="mongodb">MongoDB</SelectItem>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                </SelectContent>
              </Select>

              <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                <h4 className="text-xs text-cyan-400 mb-2">Sample Query</h4>
                <pre className="text-xs text-gray-300 overflow-auto">
                  {sampleQueries[dbType]}
                </pre>
              </div>
            </div>
          )}

          {currentStep >= 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Connection URI
                </label>
                <Input
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500"
                  placeholder={dbPlaceholders[dbType]}
                  value={uri}
                  onChange={(e) => setUri(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Database Name
                </label>
                <Input
                  className="bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500"
                  placeholder="my_database"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep >= 2 && (
            <div className="flex gap-3 items-center">
              <Button
                className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-md"
                onClick={handleTestConnection}
                disabled={testing || !uri || !dbName}
              >
                {testing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Testing...
                  </span>
                ) : (
                  "Test Connection"
                )}
              </Button>

              {connectionStatus && (
                <div
                  className={`flex items-center gap-2 text-xs ${
                    connectionStatus.includes("Success")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {connectionStatus.includes("Success") ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>{connectionStatus}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <div className="flex justify-between w-full">
            {currentStep > 1 && (
              <Button
                className="bg-gray-800 text-white hover:bg-cyan-700 hover:text-white"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </Button>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                className="bg-gray-800 text-white hover:bg-cyan-700 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-md"
                onClick={
                  currentStep < 3
                    ? () => setCurrentStep(currentStep + 1)
                    : handleSubmit
                }
                disabled={
                  currentStep === 3 && !connectionStatus.includes("Success")
                }
              >
                {currentStep < 3 ? "Next" : "Save Connection"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
