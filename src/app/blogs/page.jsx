// pages/blogs/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import LoginModal from "../components/Modals/LoginModal";
import { Trash, FilePenLineIcon, Send, Share2, PenLine } from "lucide-react";

const TiptapEditor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    // if (loggedIn) setIsLoggedIn(true);
    // else setShowLogin(true);

    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blogs", err);
        setLoading(false);
      });
  }, []);

  const handlePost = async () => {
    try {
      const existing = blogs.find((b) => b.title === form.title);
      const isEdit = !!existing;
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `/api/blogs/${existing._id}` : "/api/blogs";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        const updatedList = isEdit
          ? blogs.map((b) => (b._id === data.blog._id ? data.blog : b))
          : [data.blog, ...blogs];
        setBlogs(updatedList);
        setForm({ title: "", content: "" });
        setShowEditor(false);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen text-white py-16 px-6 relative overflow-hidden">
      <div className="relative z-10">
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
              setShowEditor(true);
            }}
          />
        )}

        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
          >
            My Cosmic Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-purple-100/80"
          >
            Thoughts, tutorials, and technical deep dives from across the
            universe
          </motion.p>

          {!showEditor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowLogin(true);
                  } else {
                    setShowEditor(!showEditor);
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 text-sm bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:brightness-110 rounded-full font-medium transition-all shadow-lg hover:shadow-purple-500/30"
              >
                <PenLine size={16} className="text-white" />
                <span className="relative z-10">Compose Stellar Entry</span>
              </button>
            </motion.div>
          )}
        </div>

        {showEditor && (
          <motion.div
            className="bg-slate-900/70 border border-purple-500/20 p-6 rounded-xl max-w-4xl mx-auto mb-10 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <input
              placeholder="Cosmic Title..."
              className="w-full mb-4 p-3 bg-slate-800/70 border border-purple-500/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <div className="h-[60vh] mb-6">
              <TiptapEditor
                immediatelyRender={false}
                value={form.content}
                onChange={(val) => setForm({ ...form, content: val })}
                onClose={() => setShowEditor(false)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `https://yourdomain.com/blogs/${form.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )}`;
                  window.open(url, "_blank");
                }}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-indigo-700/90 hover:bg-indigo-600 transition-all rounded-full shadow-md border border-indigo-500/30"
              >
                <Share2 size={16} /> Broadcast
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 transition-all rounded-full shadow-md"
              >
                <Send size={16} /> Launch Into Orbit
              </motion.button>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-purple-500/70 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogs.map((blog) => {
              const imgMatch = blog.content.match(/<img[^>]+src=\"([^">]+)\"/);
              const imageUrl = imgMatch?.[1];

              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="relative  border border-purple-500/20 rounded-xl p-6 hover:border-violet-400/50 transition-all duration-300 shadow-lg backdrop-blur-sm group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <Link href={`/blogs/${blog._id}`} className="relative z-10">
                    {imageUrl ? (
                      <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                        <img
                          src={imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-slate-800/50 rounded-lg mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-galaxy text-purple-500/50"
                        >
                          <path d="M12 2a10 10 0 0 1 8 16" />
                          <path d="M12 2a10 10 0 0 0-8 16" />
                          <path d="M8 8a10 10 0 0 1 8 8" />
                          <path d="M8 8a10 10 0 0 0 8 8" />
                        </svg>
                      </div>
                    )}

                    <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-purple-200/70 mb-3">
                      {blog.date}
                    </p>
                    <p className="text-sm text-purple-100/80 line-clamp-2">
                      {blog.summary}
                    </p>
                  </Link>

                  {isLoggedIn && (
                    <div className="absolute top-0 right-0 flex gap-2 z-50">
                      {/* Edit Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setForm({ title: blog.title, content: blog.content });
                          setShowEditor(true);
                        }}
                        className="p-1.5 rounded-full bg-white/10 hover:bg-purple-600/20 transition-colors backdrop-blur"
                      >
                        <FilePenLineIcon
                          size={16}
                          className="text-purple-300 hover:text-purple-100 drop-shadow-sm"
                        />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          const confirmed = confirm(
                            "Are you sure you want to delete this cosmic entry?"
                          );
                          if (confirmed) {
                            await fetch(`/api/blogs/${blog._id}`, {
                              method: "DELETE",
                            });
                            setBlogs(blogs.filter((b) => b._id !== blog._id));
                          }
                        }}
                        className="p-1.5 rounded-full bg-slate-900/80 hover:bg-rose-600/20 transition-colors backdrop-blur"
                      >
                        <Trash
                          size={16}
                          className="text-rose-400 hover:text-rose-200 drop-shadow-sm"
                        />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
