const AVAILABLE_NODE_TYPES = [
  {
    type: "prompt",
    inputSchema: { query: "string" },
    outputSchema: { prompt: "string" },
  },
  {
    type: "youtube",
    inputSchema: { query: "string" },
    outputSchema: {
      result: [
        {
          title: "string",
          videoId: "string",
          channel: "string",
          url: "string",
        },
      ],
    },
  },
  {
    type: "llm",
    inputSchema: { prompt: "string" },
    outputSchema: { response: "string" },
  },
  {
    type: "tool",
    inputSchema: { query: "string" },
    outputSchema: { result: "any" },
  },
  {
    type: "http",
    inputSchema: {},
    outputSchema: {},
  },
  { type: "file_reader", inputSchema: {}, outputSchema: {} },
  {
    type: "web_research",
    inputSchema: {},
    outputSchema: {},
  },
  { type: "evaluation", inputSchema: { input: "string" }, outputSchema: {} },

  { type: "memory", inputSchema: {}, outputSchema: {} },

  { type: "improvement_loop", inputSchema: {}, outputSchema: {} },

  { type: "feedback", inputSchema: {}, outputSchema: {} },

  { type: "trigger", inputSchema: {}, outputSchema: {} },

  { type: "ifelse", inputSchema: {}, outputSchema: {} },

  { type: "switch", inputSchema: {}, outputSchema: {} },

  { type: "connect_db", inputSchema: {}, outputSchema: {} },
];

const getMappedValues = (sourceNodeType, targetNodeType, inputs) => {
  try {
    switch (sourceNodeType) {
      case "prompt": {
        const { prompt = "" } = inputs;
        switch (targetNodeType) {
          case "youtube":
            return { query: prompt };
          default:
            return inputs;
        }
      }
      default:
        return inputs;
    }
  } catch (error) {
    console.error("getMappedValues error:", error);
    return inputs;
  }
};

export default getMappedValues;
