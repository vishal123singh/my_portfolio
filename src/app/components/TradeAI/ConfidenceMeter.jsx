// components/ConfidenceMeter.tsx
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ConfidenceMeter({ value }) {
  return (
    <div className="w-24 h-24">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textColor: "#00ffcc",
          pathColor: "#00f5ff",
          trailColor: "#222",
        })}
      />
    </div>
  );
}
