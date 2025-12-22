import { NextResponse } from "next/server";
import {
  globalLimiter,
  vivalimiter,
  contactLimiter,
  agentLimiter,
} from "./lib/rateLimit";

export default async function middleware(req) {
  // Apply only to API routes
  if (!req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  // Determine which limiter to use based on route
  let limiter = globalLimiter;

  if (req.nextUrl.pathname.startsWith("/api/youtube")) {
    limiter = agentLimiter;
  } else if (req.nextUrl.pathname.startsWith("/api/ask")) {
    limiter = vivalimiter;
  } else if (req.nextUrl.pathname.startsWith("/api/send-email")) {
    limiter = contactLimiter;
  } else if (req.nextUrl.pathname.startsWith("/api/google-search")) {
    limiter = agentLimiter;
  } else if (req.nextUrl.pathname.startsWith("/api/nodes")) {
    limiter = agentLimiter;
  }

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return new NextResponse(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.toString(),
        "X-RateLimit-Remaining": remaining.toString(),
        "X-RateLimit-Reset": reset.toString(),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
