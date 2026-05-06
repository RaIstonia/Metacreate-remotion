import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Track = {
  emoji: string;
  zh: string;
  en: string;
  desc: string;
  fg: string;
  border: string;
  bg: string;
};

const TRACKS: Track[] = [
  {
    emoji: "⚙️",
    zh: "工程",
    en: "Engineering",
    desc: "Build systems, tools, and infrastructure for the next frontier.",
    fg: "#93C5FD",
    border: "rgba(59,130,246,0.30)",
    bg: "rgba(59,130,246,0.08)",
  },
  {
    emoji: "🎨",
    zh: "设计",
    en: "Design",
    desc: "Craft experiences, visuals, and interactions worth living in.",
    fg: "#D8B4FE",
    border: "rgba(168,85,247,0.30)",
    bg: "rgba(168,85,247,0.08)",
  },
  {
    emoji: "🔬",
    zh: "科学",
    en: "Science",
    desc: "Research and prototype at the edge of what we know.",
    fg: "#86EFAC",
    border: "rgba(34,197,94,0.30)",
    bg: "rgba(34,197,94,0.08)",
  },
  {
    emoji: "🎭",
    zh: "艺术",
    en: "Art",
    desc: "Make meaning, not just things — for people who want to feel.",
    fg: "#F9A8D4",
    border: "rgba(236,72,153,0.30)",
    bg: "rgba(236,72,153,0.08)",
  },
];

export const EventTracks: React.FC<{
  startFrame?: number;
  width?: number;
}> = ({ startFrame = 0, width = 1280 }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}
    >
      <div
        style={{
          padding: "8px 18px",
          borderRadius: 999,
          background: "rgba(231,119,15,0.15)",
          border: "1px solid rgba(231,119,15,0.30)",
          color: "#f5a623",
          fontFamily: theme.fonts.sans,
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        📅 May 9–11, 2026 · Columbia University + Remote
      </div>

      <div style={{ textAlign: "center" }}>
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Space Base Challenge 2026
        </div>
        <div
          style={{
            color: "#f5a623",
            fontFamily: theme.fonts.serif,
            fontSize: 22,
            fontStyle: "italic",
            fontWeight: 400,
            marginTop: 14,
            letterSpacing: "0.01em",
          }}
        >
          Build for the next frontier. · 为下一个前沿而造。
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
        {TRACKS.map((t, i) => {
          const enter = interpolate(
            frame,
            [startFrame + i * 6, startFrame + i * 6 + 22],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const lift = interpolate(
            frame,
            [startFrame + i * 6, startFrame + i * 6 + 24],
            [28, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          return (
            <div
              key={t.en}
              style={{
                width: 240,
                padding: "22px 20px",
                borderRadius: 18,
                background: t.bg,
                border: `1px solid ${t.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                opacity: enter,
                transform: `translateY(${lift}px)`,
              }}
            >
              <div style={{ fontSize: 32 }}>{t.emoji}</div>
              <div
                style={{
                  color: t.fg,
                  fontFamily: theme.fonts.sans,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                }}
              >
                {t.zh}
              </div>
              <div
                style={{
                  color: `${t.fg}aa`,
                  fontFamily: theme.fonts.sans,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: -4,
                }}
              >
                {t.en}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: theme.fonts.sans,
                  fontSize: 12,
                  lineHeight: 1.5,
                  marginTop: 4,
                }}
              >
                {t.desc}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 8,
                  color: t.fg,
                  fontFamily: theme.fonts.sans,
                  fontSize: 11.5,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                寻找队友 →
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
