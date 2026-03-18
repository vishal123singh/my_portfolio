import { NextResponse } from "next/server";
import {
  globalLimiter,
  vivalimiter,
  contactLimiter,
  agentLimiter,
} from "./lib/rateLimit";

export default async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Only apply to API routes (optional)
  if (!pathname.startsWith("/api")) return NextResponse.next();

  // Get IP
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  // Determine limiter
  let limiter = globalLimiter;
  if (pathname.startsWith("/api/youtube")) limiter = agentLimiter;
  else if (pathname.startsWith("/api/ask")) limiter = vivalimiter;
  else if (pathname.startsWith("/api/send-email")) limiter = contactLimiter;
  else if (
    pathname.startsWith("/api/google-search") ||
    pathname.startsWith("/api/nodes")
  )
    limiter = agentLimiter;

  try {
    const { success, limit, remaining, reset } = await limiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        },
      );
    }
  } catch (err) {
    console.error("Rate limiter error:", err);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
