"use client";

import { useRef, useState, useEffect } from "react";

// Chaikin smoothing
const chaikinSmooth = (points, iterations = 2) => {
  if (points.length < 2) return points;
  let pts = [...points];
  for (let k = 0; k < iterations; k++) {
    const newPts = [];
    newPts.push(pts[0]);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      newPts.push({
        x: 0.75 * p0.x + 0.25 * p1.x,
        y: 0.75 * p0.y + 0.25 * p1.y,
      });
      newPts.push({
        x: 0.25 * p0.x + 0.75 * p1.x,
        y: 0.25 * p0.y + 0.75 * p1.y,
      });
    }
    newPts.push(pts[pts.length - 1]);
    pts = newPts;
  }
  return pts;
};

// Helper: check if stroke is closed
const isClosed = (points, threshold = 10) => {
  if (points.length < 3) return false;
  const start = points[0];
  const end = points[points.length - 1];
  const dx = start.x - end.x;
  const dy = start.y - end.y;
  return Math.sqrt(dx * dx + dy * dy) < threshold;
};

export default function CanvasBezier() {
  const canvasRef = useRef(null);
  const [strokes, setStrokes] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ff0000"); // default fill

  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const updateSize = () => {
      setCanvasSize({ width: 500, height: 300 });
      redrawCanvas();
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [strokes]);

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      const touch = e.touches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    } else {
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const redrawCanvas = (allStrokes = strokes, tempStroke = []) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    allStrokes.forEach((s) => {
      const smoothPts = chaikinSmooth(s.points, 2);
      if (!smoothPts.length) return;
      ctx.beginPath();
      ctx.moveTo(smoothPts[0].x, smoothPts[0].y);
      smoothPts.forEach((p) => ctx.lineTo(p.x, p.y));
      if (s.fillColor && s.closed) {
        ctx.fillStyle = s.fillColor;
        ctx.fill();
      }
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    });

    if (tempStroke.length > 0) {
      const smoothPts = chaikinSmooth(tempStroke, 2);
      ctx.beginPath();
      ctx.moveTo(smoothPts[0].x, smoothPts[0].y);
      smoothPts.forEach((p) => ctx.lineTo(p.x, p.y));
      if (fillColor && isClosed(tempStroke)) {
        ctx.fillStyle = fillColor;
        ctx.fill();
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    }
  };

  const startDrawing = (e) => {
    const point = getPoint(e);
    setCurrentStroke([point]);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const point = getPoint(e);
    const newStroke = [...currentStroke, point];
    setCurrentStroke(newStroke);
    redrawCanvas(strokes, newStroke);
  };

  const stopDrawing = () => {
    if (currentStroke.length > 0) {
      const closed = isClosed(currentStroke);
      setStrokes([
        ...strokes,
        {
          points: currentStroke,
          color: strokeColor,
          fillColor: closed ? fillColor : "",
          closed,
        },
      ]);
      setRedoStack([]);
      setCurrentStroke([]);
    }
    setDrawing(false);
  };

  const clearCanvas = () => {
    setStrokes([]);
    setRedoStack([]);
    setCurrentStroke([]);
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    if (!strokes.length) return;
    const last = strokes[strokes.length - 1];
    setStrokes(strokes.slice(0, -1));
    setRedoStack([last, ...redoStack]);
    redrawCanvas(strokes.slice(0, -1));
  };

  const redo = () => {
    if (!redoStack.length) return;
    const [first, ...rest] = redoStack;
    const newStrokes = [...strokes, first];
    setStrokes(newStrokes);
    setRedoStack(rest);
    redrawCanvas(newStrokes);
  };

  const exportAsPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const smoothPath = (points) => {
    if (!points.length) return "";
    const pts = chaikinSmooth(points, 2);
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`;
    if (isClosed(points)) d += " Z"; // close path in SVG
    return d;
  };

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${
    canvasSize.width
  }" height="${canvasSize.height}" viewBox="0 0 ${canvasSize.width} ${
    canvasSize.height
  }">
  ${strokes
    .map(
      (s) =>
        `<path d="${smoothPath(s.points)}" fill="${
          s.fillColor || "none"
        }" stroke="${
          s.color
        }" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
    )
    .join("\n  ")}
</svg>`;

  return (
    <div style={{ padding: 20 }}>
      <h2>Smooth Bézier Canvas with Auto Fill Closed Paths</h2>

      <div style={{ marginBottom: 10 }}>
        <label>
          Stroke Color:{" "}
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: 10 }}>
          Fill Color:{" "}
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </label>
      </div>

      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          border: "1px solid black",
          cursor: "crosshair",
          touchAction: "none",
          backgroundColor: "#fff",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undo} style={{ marginLeft: 10 }}>
          Undo
        </button>
        <button onClick={redo} style={{ marginLeft: 10 }}>
          Redo
        </button>
        <button onClick={exportAsPNG} style={{ marginLeft: 10 }}>
          Export PNG
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(svgString);
            alert("SVG copied to clipboard!");
          }}
          style={{ marginLeft: 10 }}
        >
          Copy SVG
        </button>
      </div>

      {strokes.length > 0 && (
        <>
          <h3>SVG Preview</h3>
          <svg
            width={canvasSize.width}
            height={canvasSize.height}
            viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
            style={{ border: "1px dashed gray", background: "white" }}
          >
            {strokes.map((s, idx) => (
              <path
                key={idx}
                d={smoothPath(s.points)}
                fill={s.fillColor || "none"}
                stroke={s.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          <h3>SVG Code</h3>
          <pre
            style={{
              background: "#f5f5f5",
              color: "#000",
              padding: 12,
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              height: "200px",
            }}
          >
            {svgString.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </pre>
        </>
      )}
    </div>
  );
}
