// app/api/blogs/[slug]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    await connectDB();
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
