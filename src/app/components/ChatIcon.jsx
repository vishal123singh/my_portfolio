export const ChatBotIcon = ({ size = 64, color = "var(--accent)" }) => (
  <div className="group w-fit relative">
    {/* Subtle halo */}
    <div
      className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-35 transition duration-500"
      style={{
        background: `radial-gradient(circle, ${color}25, transparent 70%)`,
      }}
    />

    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className="relative z-10"
    >
      <g transform="translate(12, 14)">
        {/* Head */}
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          rx="8"
          fill="url(#headGradient)"
          stroke="rgba(255,255,255,0.06)"
          className="transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
        />

        {/* Eyes track */}
        <rect
          x="12"
          y="16"
          width="16"
          height="4"
          rx="2"
          fill="rgba(0,0,0,0.25)"
        />

        {/* Scan (ONLY accent usage here) */}
        <rect
          x="12"
          y="16"
          width="16"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.6)"
        >
          <animate
            attributeName="width"
            values="0;16;0"
            dur="2.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0"
            dur="2.6s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Mouth */}
        <path
          d="M16 26 Q20 30 24 26"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Antenna (no accent now, just neutral) */}
        <circle cx="20" cy="4" r="2" fill="rgba(255,255,255,0.6)">
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <line
          x1="20"
          y1="6"
          x2="20"
          y2="10"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Bubble (no border, softer glass) */}
      <g transform="translate(38, 6)">
        <path
          d="M16 6H4C1.8 6 0 7.8 0 10V16C0 18.2 1.8 20 4 20H12L16 24V20H20C22.2 20 24 18.2 24 16V10C24 7.8 22.2 6 20 6H16Z"
          fill="url(#bubbleGradient)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -2; 0 0"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </path>

        <text
          x="12"
          y="14"
          textAnchor="middle"
          fill="rgba(255,255,255,0.85)"
          fontSize="6"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          Hi
        </text>
      </g>

      <defs>
        <linearGradient id="headGradient" x1="0" y1="0" x2="0" y2="32">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>

        <linearGradient id="bubbleGradient" x1="0" y1="0" x2="0" y2="24">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
