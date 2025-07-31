import { NextResponse } from "next/server";
import promptOptimizerAgent from "@/lib/youtube/promptOptimizerAgent.js";
import toolCallPlannerAgent from "@/lib/youtube/toolCallPlannerAgent.js";
import { TOOL_REGISTRY } from "@/lib/youtube/tools.js";
import get from "lodash.get";

function resolveArguments(argSpecs, prompt, resultsSoFar) {
  const resolved = {};

  for (const arg of argSpecs) {
    if (arg.source === "prompt") {
      resolved[arg.name] = prompt;
    } else {
      const prevResult = resultsSoFar[arg.source];
      if (!prevResult)
        throw new Error(`No result found for tool: ${arg.source}`);
      resolved[arg.name] = arg.path ? get(prevResult, arg.path) : prevResult;
    }
  }

  return resolved;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const userQuery = body.query;

    if (!userQuery) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // Step 1: Optimize prompt
    const optimized = await promptOptimizerAgent(userQuery);
    console.log("Optimized prompt", optimized);
    if (!optimized || !optimized.prompt) {
      return NextResponse.json(
        { error: "Failed to optimize prompt" },
        { status: 500 }
      );
    }

    // Step 2: Get tool execution plan
    const toolPlan = await toolCallPlannerAgent(optimized.prompt);
    if (!toolPlan || toolPlan.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate tool plan" },
        { status: 500 }
      );
    }

    // Step 3: Execute tools sequentially
    const executionLog = [];
    const resultsSoFar = {};
    let lastOutput = null;

    for (const step of toolPlan) {
      const toolFn = TOOL_REGISTRY[step.tool_name];

      if (!toolFn) {
        executionLog.push({
          tool: step.tool_name,
          error: "Tool not implemented",
        });
        continue;
      }

      const args = resolveArguments(
        step.tool_arguments,
        userQuery,
        resultsSoFar
      );
      const output = await toolFn(args.query || args.videoId || args);

      resultsSoFar[step.tool_name] = output;
      executionLog.push({ tool: step.tool_name, input: args, output });

      lastOutput = output;
    }

    // Step 4: Return final result + trace
    return NextResponse.json({
      userQuery,
      optimizedPrompt: optimized.prompt,
      toolPlan,
      finalOutput: lastOutput,
      executionLog,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
