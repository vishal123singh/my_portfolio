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
          prev.map((c) => (c._id === updated._id ? updated : c))
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
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!processedContent) return null;

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">404 — Not Found</h1>
        <p className="text-slate-400 mb-4">We couldn't find that blog.</p>
        <Link
          href="/blogs"
          className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-500"
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
      className="min-h-screen px-4 py-10 max-w-4xl mx-auto text-white"
    >
      <div className="mb-10">
        <Link href="/blogs" className="text-indigo-400 hover:underline text-sm">
          ← Back to Blogs
        </Link>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold text-gradient mb-2 break-words">
        {blog.title}
      </h1>

      <p className="text-sm text-slate-400 italic border-l-4 border-indigo-500 pl-3 mb-6">
        Published on {blog.date}
      </p>

      <div className="bg-white text-black rounded-xl p-4 sm:p-6 shadow-lg mb-10">
        <article
          className="prose max-w-none 
      prose-pre:overflow-x-auto 
      prose-pre:whitespace-pre 
      prose-pre:bg-slate-900 
      prose-pre:text-white 
      prose-pre:rounded-lg 
      prose-pre:p-4 
      prose-pre:shadow 
      prose-code:text-sm 
      prose-a:text-blue-600 
      break-words"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>

      {/* Comments */}
      <div className="bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
          Comments ({comments.length})
        </h2>
        {comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-slate-700/60 rounded-xl p-4 border border-slate-600"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                  <h3 className="font-semibold text-sm">{comment.name}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-200">{comment.content}</p>
                <button
                  className="mt-2 text-xs text-purple-400 hover:underline"
                  onClick={() => handleReply(comment._id)}
                >
                  Reply
                </button>

                {comment.replies?.length > 0 && (
                  <div className="ml-2 sm:ml-4 mt-4 pl-2 sm:pl-4 border-l border-indigo-500 space-y-3">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="bg-slate-800 p-3 rounded-lg"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                          <span className="font-semibold text-sm text-gray-200">
                            {reply.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {replyingTo === comment._id && (
                  <form
                    className="mt-4 ml-2 sm:ml-4 bg-slate-800 p-4 rounded-xl space-y-2 border border-slate-600"
                    onSubmit={(e) => handleSubmitReply(e, comment._id)}
                  >
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        required
                        placeholder="Your name"
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                      />
                      <Input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={replyEmail}
                        onChange={(e) => setReplyEmail(e.target.value)}
                      />
                    </div>
                    <Textarea
                      required
                      rows={2}
                      placeholder="Your reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Replying..." : "Post Reply"}
                      </Button>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 italic">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* New Comment Form */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--accent)]">
          Join the Discussion
        </h2>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <Textarea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            placeholder="Share your thoughts..."
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={"bg-gray-500 hover:bg-gray-600"}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
