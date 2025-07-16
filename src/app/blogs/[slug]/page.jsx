"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/blogs/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setBlog(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  useEffect(() => {
    hljs.highlightAll();

    document.querySelectorAll("article img").forEach((img) => {
      if (!img.src || img.src.trim() === "") img.remove();
    });
  }, [blog]);

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">Loading blog...</div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-slate-300">
        Blog not found.
        <br />
        <Link href="/blogs" className="text-cyan-400 underline">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-slate-400 mb-6">{blog.date}</p>

      <article
        className="prose dark:prose-invert max-w-none prose-img:rounded-md prose-img:w-full prose-pre:rounded-lg prose-pre:bg-slate-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <div className="mt-10">
        <Link href="/blogs" className="text-cyan-400 underline">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}
