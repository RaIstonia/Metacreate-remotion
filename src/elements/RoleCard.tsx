import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export type RoleKey = "visionary" | "builder" | "strategist" | "connector";

export const ROLE_DATA: Record<
  RoleKey,
  { zh: string; en: string; tagline: string; iconPath: string; accent: string }
> = {
  visionary: {
    zh: "梦想家",
    en: "Visionary",
    tagline: "我看见远方。",
    iconPath:
      "M12 2l2.5 5L20 8l-4 3.5L17 17l-5-2.7L7 17l1-5.5L4 8l5.5-1L12 2z",
    accent: "#FFA559",
  },
  builder: {
    zh: "建造者",
    en: "Builder",
    tagline: "我把想法做出来。",
    iconPath:
      "M3 7l9-5 9 5v10l-9 5-9-5V7zm9-2.5L5 8.3v7.4l7 3.8 7-3.8V8.3l-7-3.8z",
    accent: "#FF6B35",
  },
  strategist: {
    zh: "策略家",
    en: "Strategist",
    tagline: "我知道下一步该走哪。",
    iconPath:
      "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z",
    accent: "#7DD3FC",
  },
  connector: {
    zh: "连接者",
    en: "Connector",
    tagline: "我把人和人串起来。",
    iconPath:
      "M7 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm10 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM4 18c0-2.2 2.2-4 6-4 1.4 0 2.6.3 3.6.8",
    accent: "#C4AEED",
  },
};

export const RoleCard: React.FC<{
  role: RoleKey;
  startFrame: number;
  selected?: boolean;
  selectFrame?: number;
}> = ({ role, startFrame, selected = false, selectFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const enterY = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.7 },
    durationInFrames: 24,
  });

  const opacity = interpolate(local, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const selectLocal = frame - selectFrame;
  const selectScale = selected
    ? interpolate(selectLocal, [0, 18], [1, 1.07], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      })
    : 1;
  const selectGlow = selected
    ? interpolate(selectLocal, [0, 22], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const selectDim = selected ? 0 : interpolate(selectLocal, [0, 22], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const data = ROLE_DATA[role];
  const liftPx = (1 - enterY) * 40;

  if (local < -2) return null;

  return (
    <div
      style={{
        width: 220,
        height: 260,
        padding: 22,
        borderRadius: 20,
        background: `linear-gradient(180deg, rgba(25,76,178,${0.16 + selectGlow * 0.18}) 0%, rgba(255,107,53,${0.16 + selectGlow * 0.22}) 100%), rgba(255,255,255,0.04)`,
        border: `1px solid rgba(255,${107 + selectGlow * 60},${53 + selectGlow * 30},${0.12 + selectGlow * 0.55})`,
        boxShadow: selectGlow > 0
          ? `0 4px 20px rgba(0,0,0,0.28), 0 0 ${70 * selectGlow}px ${theme.colors.ember}cc, 0 0 ${140 * selectGlow}px ${theme.colors.emberWarm}55, inset 0 0 0 1px rgba(255,107,53,${selectGlow * 0.5})`
          : "0 4px 20px rgba(0,0,0,0.28)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        opacity: opacity * (1 - selectDim),
        transform: `translateY(${liftPx}px) scale(${selectScale})`,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: `${data.accent}22`,
          border: `1px solid ${data.accent}66`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d={data.iconPath}
            stroke={data.accent}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={role === "strategist" ? `${data.accent}33` : "none"}
          />
        </svg>
      </div>

      <div>
        <div
          style={{
            color: theme.colors.starlight,
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: "0.02em",
          }}
        >
          {data.zh}
        </div>
        <div
          style={{
            color: "rgba(168,180,224,0.55)",
            fontFamily: theme.fonts.sans,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: 5,
          }}
        >
          {data.en}
        </div>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.7)",
          fontFamily: theme.fonts.sans,
          fontSize: 14,
          fontStyle: "italic",
          fontWeight: 300,
          marginTop: "auto",
          lineHeight: 1.4,
        }}
      >
        {data.tagline}
      </div>
    </div>
  );
};
