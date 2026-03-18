// app/api/ping/route.js (Next.js 13+)
import { connectDB } from "@/lib/mongoose";

export async function GET() {
  await connectDB();
  return Response.json({ ok: true });
}
