import { getBezierPath } from "reactflow";

const foreignObjectSize = 32;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  onDelete, // Add this direct prop
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (e) => {
    e.stopPropagation();
    (onDelete || data?.onDelete)?.(id);
  };

  return (
    <>
      {/* Main clickable path */}
      <path
        id={id}
        d={edgePath}
        className="react-flow__edge-path stroke-purple-400"
        strokeWidth={2}
        fill="none"
        style={style}
        markerEnd={markerEnd}
      />

      {/* Invisible interaction area */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={20}
        className="react-flow__edge-interaction"
        onClick={(e) => {
          if (e.detail >= 2) {
            // Double click to delete
            handleDelete(e);
          }
        }}
      />

      {/* Delete button */}
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
        style={{
          overflow: "visible",
          pointerEvents: "visiblePainted",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
          }}
        >
          <button
            onClick={handleDelete}
            style={{
              all: "unset",
              cursor: "pointer",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "1px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "1px solid #ef4444";
              e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
              e.currentTarget.querySelector("img").style.filter =
                "invert(26%) sepia(85%) saturate(7471%) hue-rotate(351deg) brightness(97%) contrast(105%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "1px solid black";
              e.currentTarget.style.backgroundColor = "rgba(15, 12, 12, 0.8)";
              e.currentTarget.querySelector("img").style.filter =
                "invert(100%)";
            }}
          >
            <img
              src="/images/trash.png"
              alt="Delete"
              style={{
                width: "16px",
                height: "16px",
                filter: "invert(100%)",
                pointerEvents: "none",
              }}
            />
          </button>
        </div>
      </foreignObject>
    </>
  );
}
