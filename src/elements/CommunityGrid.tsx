import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Tile = {
  type: "post" | "work" | "team" | "recruit" | "event" | "code";
  hue: number;
  hue2?: number;
  label: string;
  subtitle: string;
  badge?: string;
  layout: "wide" | "tall" | "square";
  pattern?: "dots" | "grid" | "plain" | "wave";
};

const TILES: Tile[] = [
  {
    type: "work",
    hue: 280,
    hue2: 320,
    label: "Algorithmic Dreamweaving",
    subtitle: "Yuki Tanaka · 作品",
    badge: "AI / Art",
    layout: "wide",
    pattern: "dots",
  },
  {
    type: "post",
    hue: 200,
    hue2: 220,
    label: "想找搞声音设计的伙伴",
    subtitle: "Sofia Reyes · 动态",
    badge: "招募",
    layout: "tall",
    pattern: "wave",
  },
  {
    type: "team",
    hue: 30,
    hue2: 50,
    label: "AI Collective · 3/5",
    subtitle: "建造者 · 招募",
    badge: "队伍",
    layout: "square",
    pattern: "grid",
  },
  {
    type: "code",
    hue: 100,
    hue2: 160,
    label: "Three.js 生成式星云",
    subtitle: "代码 · 64 line",
    badge: "Code",
    layout: "square",
    pattern: "grid",
  },
  {
    type: "event",
    hue: 0,
    hue2: 30,
    label: "Space Base 2026",
    subtitle: "5/9 - 5/11",
    badge: "活动",
    layout: "wide",
    pattern: "dots",
  },
  {
    type: "recruit",
    hue: 320,
    hue2: 340,
    label: "City as Code 招建造者",
    subtitle: "Lily Shi · 招募",
    badge: "招募",
    layout: "square",
    pattern: "wave",
  },
];

const PatternOverlay: React.FC<{
  pattern: Tile["pattern"];
  hue: number;
}> = ({ pattern, hue }) => {
  if (pattern === "dots") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 25% 30%, hsla(${hue}, 60%, 60%, 0.5) 1.5px, transparent 2px)`,
          backgroundSize: "20px 20px",
          opacity: 0.4,
        }}
      />
    );
  }
  if (pattern === "grid") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
    );
  }
  if (pattern === "wave") {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={`M 0 100 Q 50 ${50} 100 100 T 200 100`}
          stroke={`hsl(${hue}, 70%, 75%)`}
          strokeWidth="0.6"
          fill="none"
          opacity="0.4"
        />
        <path
          d={`M 0 130 Q 50 ${85} 100 130 T 200 130`}
          stroke={`hsl(${hue}, 70%, 85%)`}
          strokeWidth="0.4"
          fill="none"
          opacity="0.3"
        />
      </svg>
    );
  }
  return null;
};

const TileCard: React.FC<{
  tile: Tile;
  startFrame: number;
  width: number;
  height: number;
}> = ({ tile, startFrame, width, height }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(frame, [startFrame, startFrame + 26], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const hue2 = tile.hue2 ?? (tile.hue + 30) % 360;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: `linear-gradient(135deg, hsl(${tile.hue}, 50%, 38%) 0%, hsl(${hue2}, 40%, 22%) 100%)`,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: enter,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 35%, hsla(${tile.hue}, 70%, 60%, 0.45) 0%, transparent 60%)`,
        }}
      />
      <PatternOverlay pattern={tile.pattern} hue={tile.hue} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {tile.badge && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "3px 10px",
            borderRadius: 10,
            background: "rgba(255,107,53,0.18)",
            border: "0.5px solid rgba(255,107,53,0.45)",
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {tile.badge}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
        }}
      >
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 13.5,
            lineHeight: 1.3,
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {tile.label}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: theme.fonts.sans,
            fontSize: 10.5,
            marginTop: 4,
          }}
        >
          {tile.subtitle}
        </div>
      </div>
    </div>
  );
};

export const CommunityGrid: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const tileH = 200;
  const wideH = 200;

  const layout = [
    { col: 0, row: 0, w: 280, h: 240 },
    { col: 1, row: 0, w: 220, h: 280 },
    { col: 2, row: 0, w: 220, h: 240 },
    { col: 0, row: 1, w: 220, h: 200 },
    { col: 1, row: 1, w: 280, h: 220 },
    { col: 2, row: 1, w: 220, h: 240 },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, auto)",
        gridGap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {TILES.map((tile, i) => (
        <TileCard
          key={i}
          tile={tile}
          startFrame={startFrame + i * 6}
          width={layout[i].w}
          height={layout[i].h}
        />
      ))}
    </div>
  );
};
