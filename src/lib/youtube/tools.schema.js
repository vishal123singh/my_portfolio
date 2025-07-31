// Tool Definitions
const YOUTUBE_SEARCH_TOOL = {
  name: "youtube_search_videos",
  description: "Search for YouTube videos by keyword",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search term for videos",
        minLength: 1,
      },
      maxResults: {
        type: "number",
        description: "Number of results to return",
        default: 5,
        minimum: 1,
        maximum: 50,
      },
    },
    required: ["query"],
  },
};

const YOUTUBE_VIDEO_DETAILS_TOOL = {
  name: "youtube_video_details",
  description: "Get details of a YouTube video by ID",
  inputSchema: {
    type: "object",
    properties: {
      videoId: {
        type: "string",
        description: "YouTube video ID",
        pattern: "^[a-zA-Z0-9_-]{11}$", // Basic YouTube ID pattern
      },
    },
    required: ["videoId"],
  },
};

const YOUTUBE_TOOLS = [YOUTUBE_SEARCH_TOOL, YOUTUBE_VIDEO_DETAILS_TOOL];

export default { YOUTUBE_TOOLS };
