"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

// ShadCN UI components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [processedContent, setProcessedContent] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");

  useEffect(() => {
    if (slug) {
      fetch(`/api/blogs/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setBlog(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));

      fetch(`/api/blogs/${slug}/comments`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setComments(data);
        });
    }
  }, [slug]);

  useEffect(() => {
    if (!processedContent) return;
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [processedContent]);

  useEffect(() => {
    if (!blog?.content) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, "text/html");
    doc.querySelectorAll("img").forEach((img) => {
      if (img.parentElement?.classList.contains("img-container")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "img-container-blog";
      img.replaceWith(wrapper);
      wrapper.appendChild(img);
    });
    setProcessedContent(doc.body.innerHTML);
    hljs.highlightAll();
  }, [blog?.content]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, content: newComment }),
      });
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data]);
        setNewComment("");
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyContent("");
    setReplyName("");
    setReplyEmail("");
  };

  const handleSubmitReply = async (e, parentId) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/blogs/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: replyName,
          email: replyEmail,
          content: replyContent,
          parentId,
        }),
      });
      if (response.ok) {
        const updated = await response.json();
        setComments((prev) =>
          prev.map((c) => (c._id === updated._id ? updated : c)),
        );
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "var(--gradient-matte)" }}
      >
        <div className="relative">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!processedContent) return null;

  if (!blog) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen text-center px-4"
        style={{
          background: "var(--gradient-matte)",
          color: "var(--text-primary)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white/90">
          404 — Not Found
        </h1>
        <p className="text-white/50 mb-4">We couldn't find that blog.</p>
        <Link
          href="/blogs"
          className="px-4 py-2 rounded-full transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2"
          style={{
            background:
              "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
            color: "var(--accent)",
          }}
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 py-10 max-w-5xl mx-auto pt-24"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Back Button */}
      <div className="mb-10">
        <Link
          href="/blogs"
          className="cursor-pointer inline-flex items-center gap-2 text-sm transition-colors hover:text-white/80"
          style={{ color: "var(--accent)" }}
        >
          ← Back to Blogs
        </Link>
      </div>

      {/* Blog Header */}
      <h1 className="text-2xl sm:text-4xl font-light mb-2 break-words text-white/90">
        {blog.title}
      </h1>

      <p
        className="text-sm text-white/40 italic border-l-4 pl-3 mb-6"
        style={{ borderLeftColor: "var(--accent)" }}
      >
        Published on {blog.date}
      </p>

      {/* Blog Content */}
      <div
        className="rounded-3xl p-4 sm:p-6 mb-10"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
        }}
      >
        <article
          className="prose max-w-none 
            prose-pre:overflow-x-auto 
            prose-pre:whitespace-pre 
            prose-pre:bg-[#0f0f0f]
            prose-pre:text-white/90 
            prose-pre:rounded-xl 
            prose-pre:p-4 
            prose-pre:shadow 
            prose-code:text-sm 
            prose-code:text-white/80
            prose-a:text-[var(--accent)]
            prose-a:no-underline
            prose-a:hover:underline
            prose-strong:text-white/90
            prose-blockquote:text-white/60
            prose-blockquote:border-l-white/20
            prose-img:rounded-xl
            prose-img:shadow-lg
            break-words"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>

      {/* Comments Section */}
      <div
        className="rounded-3xl p-4 sm:p-6 mb-10"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
        }}
      >
        <h2 className="text-xl sm:text-2xl font-light mb-6 text-white/90">
          Comments ({comments.length})
        </h2>

        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="rounded-xl p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <h3 className="font-medium text-sm text-white/80">
                    {comment.name}
                  </h3>
                  <span className="text-xs text-white/30">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-white/60">{comment.content}</p>
                <button
                  className="mt-2 text-xs transition-colors hover:text-white/80"
                  style={{ color: "var(--accent)" }}
                  onClick={() => handleReply(comment._id)}
                >
                  Reply
                </button>

                {comment.replies?.length > 0 && (
                  <div
                    className="ml-2 sm:ml-4 mt-4 pl-2 sm:pl-4 space-y-3"
                    style={{ borderLeft: "2px solid rgba(255,255,255,0.1)" }}
                  >
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="p-3 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                          <span className="font-medium text-sm text-white/70">
                            {reply.name}
                          </span>
                          <span className="text-xs text-white/30">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-white/50">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment._id && (
                  <form
                    className="mt-4 ml-2 sm:ml-4 p-4 rounded-xl space-y-2"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onSubmit={(e) => handleSubmitReply(e, comment._id)}
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        required
                        placeholder="Your name"
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                      />
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={replyEmail}
                        onChange={(e) => setReplyEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                      />
                    </div>
                    <Textarea
                      required
                      rows={2}
                      placeholder="Your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-4 py-2 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm font-medium disabled:opacity-50"
                        style={{
                          background:
                            "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
                          color: "var(--accent)",
                        }}
                      >
                        {isSubmitting ? "Replying..." : "Post Reply"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium text-white/60 hover:text-white/80"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/40 italic">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* New Comment Form */}
      <div
        className="rounded-3xl p-4 sm:p-6"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
        }}
      >
        <h2
          className="text-xl sm:text-2xl font-light mb-4"
          style={{ color: "var(--accent)" }}
        >
          Join the Discussion
        </h2>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30 focus:border-white/30"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30 focus:border-white/30"
            />
          </div>
          <Textarea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            placeholder="Share your thoughts..."
            className="bg-white/5 border-white/10 text-white/90 placeholder:text-white/30 focus:border-white/30"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] text-sm font-medium disabled:opacity-50"
            style={{
              background:
                "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.8)",
              color: "var(--accent)",
            }}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
