// pages/blogs/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiLinkedin, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";
import LoginModal from "../components/Modals/LoginModal";
import { Send, Share2 } from "lucide-react"; // replace FiLinkedin with Lucide icons

const TiptapEditor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) setShowEditor(true);
    else setShowLogin(true);

    // Fetch blogs
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to load blogs", err));
  }, []);

  const handlePost = async () => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setBlogs([data.blog, ...blogs]);
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
    <div className="min-h-screen text-white py-16 px-6">
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
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">
          My Blogs
        </h1>
        <p className="text-base text-slate-400">
          Thoughts, tutorials, and technical deep dives from my journey.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setShowLogin(true);
              } else {
                setShowEditor(!showEditor);
              }
            }}
            className="flex items-center gap-2 text-sm bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-full font-medium transition shadow"
          >
            <img
              src="/images/writing.png"
              alt="Write Icon"
              width={20}
              height={20}
              loading="lazy"
              className="w-5 h-5"
            />
            {showEditor ? "Cancel" : "Write Blog"}
          </button>
        </div>
      </div>
      {showEditor && (
        <motion.div
          className="bg-slate-800 p-6 rounded-xl max-w-4xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            placeholder="Blog Title"
            className="w-full mb-4 p-2 bg-slate-700 text-white rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="h-64">
            <TiptapEditor
              immediatelyRender={false}
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val })}
            ></TiptapEditor>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `https://yourdomain.com/blogs/${form.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )}`;
                window.open(url, "_blank");
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-100 bg-blue-600 hover:bg-blue-500 transition rounded-full shadow-md"
            >
              <Share2 size={16} /> Share
            </button>

            <button
              onClick={handlePost}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 transition rounded-full shadow-md"
            >
              <Send size={16} /> Publish
            </button>
          </div>
        </motion.div>
      )}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => {
          const imgMatch = blog.content.match(/<img[^>]+src="([^">]+)"/);
          const imageUrl = imgMatch?.[1];

          return (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-400 transition duration-300 shadow-md backdrop-blur-sm group"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition">
                {blog.title}
              </h2>
              <p className="text-sm text-slate-400 mb-1">{blog.date}</p>
              <p className="text-sm text-slate-300">{blog.summary}</p>
            </Link>
          );
        })}
      </div>{" "}
    </div>
  );
}
