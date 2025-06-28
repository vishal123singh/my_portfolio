'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

export default function Assistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleAsk = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setShowChat(true);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg.text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        result += chunk;

        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return [...prev.slice(0, -1), { role: 'assistant', text: result }];
          } else {
            return [...prev, { role: 'assistant', text: result }];
          }
        });
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: 'Something went wrong. Try again!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Assistant Bar Below Navbar */}
      <div
        className="ai-bar"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'rgba(15, 23, 42, 0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontWeight: 600, color: '#00f7ff', fontSize: '1rem' }}>
          Ask Buddy about me
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#1e293b',
            borderRadius: '999px',
            padding: '0.3rem 0.6rem',
            gap: '0.5rem',
            flex: 1,
            maxWidth: '600px',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="e.g. What are Vishal's skills?"
            style={{
              flex: 1,
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: '0.95rem',
            }}
          />
          <button
            onClick={handleAsk}
            style={{
              background: '#00f7ff',
              border: 'none',
              borderRadius: '999px',
              padding: '0.5rem 0.8rem',
              color: '#0f172a',
              fontWeight: 600,
              boxShadow: '0 0 10px rgba(0, 247, 255, 0.3)',
            }}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(6px)',
            }}
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#1e293b',
                borderRadius: '1rem',
                padding: '2rem',
                maxWidth: '700px',
                width: '90%',
                maxHeight: '75vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid #334155',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: '#00f7ff', fontSize: '1.25rem' }}>Chat with Vishal’s Assistant</h3>
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    color: '#f1f5f9',
                    cursor: 'pointer',
                  }}
                >
                  ✖
                </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem' }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div
                      style={{
                        background: msg.role === 'user' ? '#334155' : '#0f172a',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        color: '#f1f5f9',
                        maxWidth: '80%',
                        fontSize: '0.95rem',
                        lineHeight: '1.5',
                      }}
                    >
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <motion.p
                    style={{ color: '#94a3b8', fontStyle: 'italic' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    Vishal’s Assistant is typing...
                  </motion.p>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input inside modal */}
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#0f172a',
                  borderRadius: '999px',
                  padding: '0.4rem 0.6rem',
                  gap: '0.5rem',
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                  placeholder="Ask something..."
                  style={{
                    flex: 1,
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f1f5f9',
                    fontSize: '0.95rem',
                  }}
                />
                <button
                  onClick={handleAsk}
                  style={{
                    background: '#00f7ff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '0.5rem 0.8rem',
                    color: '#0f172a',
                    fontWeight: 600,
                    boxShadow: '0 0 10px rgba(0, 247, 255, 0.3)',
                  }}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
