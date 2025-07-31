import get from "lodash.get";

export default function resolveArguments(argSpecs, prompt, resultsSoFar) {
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
