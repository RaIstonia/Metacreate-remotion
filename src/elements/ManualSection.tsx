import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const CHIP_PALETTES = [
  { bg: "rgba(132,94,194,0.18)", fg: "#C4AEED", border: "rgba(132,94,194,0.40)" },
  { bg: "rgba(0,201,167,0.14)", fg: "#5EEAD4", border: "rgba(0,201,167,0.35)" },
  { bg: "rgba(255,107,53,0.14)", fg: "#FFA559", border: "rgba(255,107,53,0.40)" },
  { bg: "rgba(132,94,194,0.18)", fg: "#C4AEED", border: "rgba(132,94,194,0.40)" },
  { bg: "rgba(255,107,53,0.14)", fg: "#FFA559", border: "rgba(255,107,53,0.40)" },
];

const typed = (text: string, startFrame: number, frame: number, perChar = 1.6) => {
  const chars = Math.max(0, Math.min(text.length, Math.floor((frame - startFrame) / perChar)));
  return text.slice(0, chars);
};

export const ManualSection: React.FC<{
  emoji: string;
  title: string;
  body?: string;
  chips?: string[];
  startFrame: number;
  width?: number;
}> = ({ emoji, title, body, chips, startFrame, width = 660 }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const cardEnter = interpolate(local, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardLift = interpolate(local, [0, 24], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const bodyTyped = body ? typed(body, startFrame + 18, frame, 1.4) : "";

  return (
    <div
      style={{
        width,
        padding: "18px 22px 20px",
        borderRadius: 20,
        background: "rgba(10,14,39,0.6)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        opacity: cardEnter,
        transform: `translateY(${cardLift}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span style={{ fontSize: 17 }}>{emoji}</span>
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 14.5,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {chips && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {chips.map((c, i) => {
              const palette = CHIP_PALETTES[i % CHIP_PALETTES.length];
              const chipStart = 14 + i * 6;
              const chipEnter = interpolate(local, [chipStart, chipStart + 18], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });
              const chipScale = interpolate(local, [chipStart, chipStart + 20], [0.85, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });
              return (
                <span
                  key={i}
                  style={{
                    padding: "6px 13px",
                    borderRadius: 9999,
                    background: palette.bg,
                    border: `1px solid ${palette.border}`,
                    color: palette.fg,
                    fontFamily: theme.fonts.sans,
                    fontSize: 12.5,
                    fontWeight: 500,
                    opacity: chipEnter,
                    transform: `scale(${chipScale})`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </span>
              );
            })}
          </div>
        )}
        {body && (
          <div
            style={{
              color: "rgba(255,255,255,0.78)",
              fontFamily: theme.fonts.sans,
              fontSize: 13.5,
              lineHeight: 1.6,
            }}
          >
            {bodyTyped}
          </div>
        )}
      </div>
    </div>
  );
};
