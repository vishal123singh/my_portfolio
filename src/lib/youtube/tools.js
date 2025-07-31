import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
if (!YOUTUBE_API_KEY) {
  throw new Error("Missing YOUTUBE_API_KEY in .env");
}

// Tool Handlers
async function searchYouTube(query, maxResults = 5) {
  try {
    const url = "https://www.googleapis.com/youtube/v3/search";

    const { data } = await axios.get(url, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: Math.min(maxResults, 50),
        key: YOUTUBE_API_KEY,
      },
    });

    const videos = (data.items || []).map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.default?.url,
    }));

    return { result: videos };
  } catch (error) {
    console.error(
      "YouTube Search Error:",
      error.response?.data?.error || error.message
    );
    return {
      error: `YouTube Search Error: ${
        error.response?.data?.error?.message || error.message
      }`,
      details: error.response?.data?.error || null,
    };
  }
}

async function youTubeVideoDetails(videoId) {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return {
      error: `Invalid YouTube video ID format: ${videoId}`,
      suggestion:
        "YouTube video IDs should be 11 characters long and contain letters, numbers, underscores, or hyphens",
    };
  }

  try {
    const url = "https://www.googleapis.com/youtube/v3/videos";

    const { data } = await axios.get(url, {
      params: {
        part: "snippet,statistics,contentDetails",
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    });

    if (!data.items || data.items.length === 0) {
      return {
        error: `No details found for video ID ${videoId}`,
        suggestion:
          "Please verify the video ID is correct and the video is publicly available",
      };
    }

    const video = data.items[0];
    const info = {
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      viewCount: video.statistics.viewCount,
      likeCount: video.statistics.likeCount,
      commentCount: video.statistics.commentCount,
      duration: video.contentDetails.duration,
      thumbnails: video.snippet.thumbnails,
      channelTitle: video.snippet.channelTitle,
      tags: video.snippet.tags || [],
    };

    return { result: info };
  } catch (error) {
    console.error(
      "YouTube Video Details Error:",
      error.response?.data?.error || error.message
    );
    return {
      error: `YouTube API Error: ${
        error.response?.data?.error?.message || error.message
      }`,
      details: error.response?.data?.error || null,
    };
  }
}

export const TOOL_REGISTRY = {
  youtube_search_videos: searchYouTube,
  youtube_video_details: youTubeVideoDetails,
};
