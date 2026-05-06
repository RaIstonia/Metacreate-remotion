import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Tag = { label: string; revealAt: number };

export const ProfileHeader: React.FC<{
  name: string;
  initial: string;
  tags: Tag[];
  width?: number;
}> = ({ name, initial, tags, width = 720 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        padding: "26px 28px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          color: theme.colors.starlight,
          fontFamily: theme.fonts.serif,
          fontSize: 22,
          fontStyle: "italic",
          fontWeight: 300,
          opacity: 0.9,
        }}
      >
        我的
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #FF6B35 0%, #FFA559 100%)",
            border: "1px solid rgba(255,107,53,0.4)",
            color: "rgba(255,255,255,0.95)",
            fontFamily: "'Sora','Noto Sans SC',sans-serif",
            fontWeight: 700,
            fontSize: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(255,107,53,0.35)`,
            flexShrink: 0,
          }}
        >
          {initial}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              color: "white",
              fontFamily: theme.fonts.sans,
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map((t, i) => {
              const enter = interpolate(
                frame,
                [t.revealAt, t.revealAt + 16],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                }
              );
              const lift = interpolate(
                frame,
                [t.revealAt, t.revealAt + 18],
                [10, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                }
              );
              return (
                <span
                  key={i}
                  style={{
                    padding: "5px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: theme.fonts.sans,
                    fontSize: 13,
                    fontWeight: 500,
                    opacity: enter,
                    transform: `translateY(${lift}px)`,
                  }}
                >
                  {t.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
