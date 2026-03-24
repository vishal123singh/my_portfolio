"use client";

import { useEffect, useRef } from "react";

export default function SwaggerDocsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const addScript = (src) =>
      new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    const addLink = (href) => {
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    };

    addLink("https://unpkg.com/swagger-ui-dist@5/swagger-ui.css");

    let cancelled = false;

    (async () => {
      try {
        await addScript("https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js");
        await addScript("https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js");
        if (cancelled) return;
        // eslint-disable-next-line no-undef
        window.SwaggerUIBundle({
          url: "/api/docs",
          domNode: containerRef.current,
          presets: [window.SwaggerUIBundle.presets.apis, window.SwaggerUIStandalonePreset],
          layout: "StandaloneLayout",
          deepLinking: true
        });
      } catch (e) {
        if (containerRef.current) {
          containerRef.current.innerHTML =
            "<p style='color:#b91c1c'>Failed to load Swagger UI.</p>";
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div ref={containerRef} />
    </div>
  );
}
 
