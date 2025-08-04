"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        alert("Failed to send message. Try again later.");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-300">
            Have a project in mind or want to collaborate? Let’s talk!
          </p>
        </motion.div>

        <motion.div
          className="rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-black/40 backdrop-blur-xl shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Send me a message
              </h3>

              {submitSuccess && (
                <motion.div
                  className="mb-6 p-3 rounded-lg text-green-500 bg-green-200/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Message sent successfully!
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-black/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 border-none"
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-black/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 border-none"
                  />
                </div>

                <div>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What would you like to discuss?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-black/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-400 border-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:brightness-110 transition-all"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaPaperPlane /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
