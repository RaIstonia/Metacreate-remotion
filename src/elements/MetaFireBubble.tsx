import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const FlameIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size * (168 / 117)} viewBox="0 0 117 168" fill="none">
    <path
      d="M58.5 167.7C26.1913 167.7 0 141.508 0 109.2C0 92.4004 7.08131 77.2551 18.422 66.5855C28.8914 56.7352 54.6 38.9962 50.7 0C97.5 31.2 120.9 62.4 74.1 109.2C81.9 109.2 93.6 109.2 113.1 89.9309C115.204 95.965 117 102.449 117 109.2C117 141.508 90.8084 167.7 58.5 167.7Z"
      fill="url(#bubbleGrad)"
    />
    <defs>
      <linearGradient
        id="bubbleGrad"
        x1="58.5"
        y1="0"
        x2="58.5"
        y2="167.7"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={theme.colors.emberCool} />
        <stop offset="1" stopColor={theme.colors.emberWarm} />
      </linearGradient>
    </defs>
  </svg>
);

const typedText = (text: string, startFrame: number, frame: number, perChar = 2) => {
  const chars = Math.max(0, Math.min(text.length, Math.floor((frame - startFrame) / perChar)));
  return text.slice(0, chars);
};

const ThinkingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "8px 0" }}>
      {[0, 1, 2].map((i) => {
        const phase = (frame * 0.18 + i * 1.4) % (Math.PI * 2);
        const y = -Math.max(0, Math.sin(phase)) * 5;
        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: theme.colors.violet,
              transform: `translateY(${y}px)`,
              opacity: 0.55 + Math.max(0, Math.sin(phase)) * 0.45,
            }}
          />
        );
      })}
    </div>
  );
};

export const AssistantBubble: React.FC<{
  text: string;
  startFrame: number;
  thinking?: boolean;
}> = ({ text, startFrame, thinking = false }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lift = interpolate(frame, [startFrame, startFrame + 18], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame - 4) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        opacity: enter,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,107,53,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          filter: `drop-shadow(0 0 16px ${theme.colors.ember}55)`,
        }}
      >
        <FlameIcon size={18} />
      </div>
      <div
        style={{
          maxWidth: 460,
          padding: "12px 16px",
          borderRadius: "16px 16px 16px 4px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.86)",
          fontFamily: theme.fonts.sans,
          fontSize: 15,
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: "0.01em",
        }}
      >
        {thinking ? <ThinkingDots /> : typedText(text, startFrame + 8, frame, 2)}
      </div>
    </div>
  );
};

export const UserBubble: React.FC<{
  text: string;
  startFrame: number;
}> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lift = interpolate(frame, [startFrame, startFrame + 18], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < startFrame - 4) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        opacity: enter,
        transform: `translateY(${lift}px)`,
        flexDirection: "row-reverse",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #1E2A5E, #845EC2)",
          border: "1px solid rgba(168,180,224,0.15)",
          color: "#C4AEED",
          fontFamily: theme.fonts.sans,
          fontWeight: 600,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        我
      </div>
      <div
        style={{
          maxWidth: 460,
          padding: "12px 16px",
          borderRadius: "16px 16px 4px 16px",
          background: "linear-gradient(180deg, rgba(132,94,194,0.18), rgba(25,76,178,0.12))",
          border: "1px solid rgba(132,94,194,0.25)",
          color: "rgba(255,255,255,0.92)",
          fontFamily: theme.fonts.sans,
          fontSize: 15,
          fontWeight: 300,
          lineHeight: 1.5,
        }}
      >
        {typedText(text, startFrame + 8, frame, 2)}
      </div>
    </div>
  );
};
