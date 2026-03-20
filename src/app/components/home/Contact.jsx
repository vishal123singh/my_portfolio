"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const contactMethodsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1200);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
      );

      gsap.fromTo(
        ".contact-method",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: contactMethodsRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        formRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactMethods = [
    {
      type: "EMAIL",
      value: "bs08081997@gmail.com",
      icon: Mail,
      description: "Best for project inquiries",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24"
      style={{
        background: "var(--gradient-matte)",
        color: "var(--text-primary)",
      }}
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at top, rgba(255,255,255,0.03), transparent 60%),
              linear-gradient(var(--bg-dark), var(--bg-darker))
            `,
          }}
        />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <span className="text-white/60 text-sm tracking-[0.3em]">
            <span
              className="inline-block w-12 h-px mr-4"
              style={{ background: "var(--accent)" }}
            />
            CONNECT
          </span>

          <h2 className="text-5xl md:text-6xl mt-6">
            <span className="font-medium">Let's</span>
            <span className="ml-4 text-white/40">Talk</span>
          </h2>

          <p className="text-white/70 max-w-2xl mt-6">
            Have a project in mind or want to collaborate? Let’s create
            something exceptional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* LEFT */}
          <div ref={contactMethodsRef} className="space-y-6">
            {contactMethods.map((method) => (
              <div
                key={method.type}
                className="contact-method group rounded-2xl p-6 transition-all"
                style={{
                  background: "linear-gradient(145deg, #2a2a2a, #1a1a1a)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.06),
                    0 10px 25px rgba(0,0,0,0.8)
                  `,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <method.icon className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="flex-1">
                    <div className="text-white/50 text-xs tracking-wider">
                      {method.type}
                    </div>
                    <div className="text-white text-lg">{method.value}</div>
                    <div className="text-white/50 text-sm">
                      {method.description}
                    </div>
                  </div>

                  <ArrowRight className="text-white/40 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - FORM */}
          <div ref={formRef}>
            <div
              className="rounded-3xl p-8"
              style={{
                background:
                  "linear-gradient(145deg, #2a2a2a, #1a1a1a 40%, #0f0f0f)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.06),
                  0 15px 40px rgba(0,0,0,0.8)
                `,
              }}
            >
              <h3 className="text-2xl text-white mb-6">Send a message</h3>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl text-white/70 border border-white/10">
                  Message sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email"].map((field) => (
                  <input
                    key={field}
                    name={field}
                    placeholder={`Your ${field}`}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-primary)",
                    }}
                  />
                ))}

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--text-primary)",
                  }}
                />

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(145deg, #e6e6e6, #999)",
                    color: "#000",
                    boxShadow: `
                      inset 0 1px 0 rgba(255,255,255,0.5),
                      0 5px 20px rgba(255,255,255,0.15)
                    `,
                  }}
                >
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
