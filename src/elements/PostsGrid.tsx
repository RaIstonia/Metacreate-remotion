import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

type PostTile = {
  kind: "post" | "work" | "team" | "recruit" | "code";
  author?: { name: string; initials: string; variant: "flame" | "violet" | "cosmos" };
  body?: string;
  hue?: number;
  hue2?: number;
  badge?: string;
  meta?: string;
};

const AVATAR_GRAD: Record<string, string> = {
  flame: "linear-gradient(145deg, #FF6B35 0%, #FFA559 100%)",
  violet: "linear-gradient(145deg, #1E2A5E 0%, #845EC2 100%)",
  cosmos: "linear-gradient(145deg, #0A0E27 0%, #1E2A5E 100%)",
};
const AVATAR_TEXT: Record<string, string> = {
  flame: "rgba(255,255,255,0.95)",
  violet: "#C4AEED",
  cosmos: "#A8B4E0",
};

const SLOT_TILES: (PostTile | null)[] = [
  {
    kind: "post",
    author: { name: "Yuki Tanaka", initials: "YT", variant: "flame" },
    body: "刚把生成式星云的交互层搭好了 — 现在它能跟着鼠标节奏呼吸。",
    badge: "动态",
    meta: "47 ♡  ·  8 💬",
  },
  null,
  {
    kind: "work",
    author: { name: "Yuki Tanaka", initials: "YT", variant: "flame" },
    body: "Algorithmic Dreamweaving",
    hue: 280,
    hue2: 320,
    badge: "作品",
    meta: "AI / Art",
  },
  {
    kind: "recruit",
    author: { name: "Sofia Reyes", initials: "SR", variant: "violet" },
    body: "想找搞声音设计的伙伴一起做沉浸版",
    badge: "招募",
    meta: "梦想家",
  },
  {
    kind: "team",
    body: "AI Collective · 3/5",
    badge: "队伍",
    meta: "招募:建造者",
    hue: 30,
  },
  {
    kind: "code",
    body: "Three.js 生成式星云 demo",
    hue: 100,
    hue2: 160,
    badge: "Code",
    meta: "64 line",
  },
  {
    kind: "post",
    author: { name: "Arjun Mehta", initials: "AM", variant: "cosmos" },
    body: "推荐花 30 分钟写一个一页纸的产品假设。不是 PRD,只是把不确定的问题写下来。",
    badge: "动态",
    meta: "89 ♡  ·  24 💬",
  },
  null,
  {
    kind: "work",
    author: { name: "Sofia Reyes", initials: "SR", variant: "violet" },
    body: "Spatial Poetry",
    hue: 320,
    hue2: 340,
    badge: "作品",
    meta: "空间装置",
  },
];

const TileBg: React.FC<{ tile: PostTile }> = ({ tile }) => {
  if (tile.hue !== undefined) {
    const hue2 = tile.hue2 ?? (tile.hue + 30) % 360;
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, hsl(${tile.hue}, 45%, 36%) 0%, hsl(${hue2}, 38%, 22%) 100%)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 35%, hsla(${tile.hue}, 70%, 60%, 0.4) 0%, transparent 60%)`,
          }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, rgba(25,76,178,0.10) 0%, rgba(255,107,53,0.06) 100%), rgba(255,255,255,0.025)",
      }}
    />
  );
};

const TileCard: React.FC<{
  tile: PostTile;
  startFrame: number;
  index: number;
}> = ({ tile, startFrame, index }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lift = interpolate(frame, [startFrame, startFrame + 26], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const breathPhase = index * 1.7;
  const breathSpeed = 0.05 + (index % 3) * 0.015;
  const breath = Math.sin(frame * breathSpeed + breathPhase) * 0.012 + 1;

  const glowPhase = index * 0.9;
  const glowPulse = (Math.sin(frame * 0.06 + glowPhase) + 1) / 2;
  const glowAlpha = 0.18 + glowPulse * 0.12;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid rgba(255,255,255,${0.08 + glowPulse * 0.04})`,
        boxShadow: `0 6px 18px rgba(0,0,0,0.3), 0 0 ${20 * glowPulse}px rgba(255,107,53,${glowAlpha * 0.3})`,
        opacity: enter,
        transform: `translateY(${lift}px) scale(${breath})`,
      }}
    >
      <TileBg tile={tile} />

      <div
        style={{
          position: "relative",
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {tile.badge && (
            <span
              style={{
                padding: "3px 9px",
                borderRadius: 9,
                background: `rgba(255,107,53,${glowAlpha})`,
                border: "0.5px solid rgba(255,107,53,0.4)",
                color: "#FFA559",
                fontFamily: theme.fonts.sans,
                fontSize: 10.5,
                fontWeight: 500,
              }}
            >
              {tile.badge}
            </span>
          )}
          {tile.meta && (
            <span
              style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: theme.fonts.sans,
                fontSize: 10,
              }}
            >
              {tile.meta}
            </span>
          )}
        </div>

        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.45,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {tile.body}
        </div>

        {tile.author && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: AVATAR_GRAD[tile.author.variant],
                color: AVATAR_TEXT[tile.author.variant],
                fontFamily: theme.fonts.sans,
                fontWeight: 600,
                fontSize: 8.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {tile.author.initials}
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontFamily: theme.fonts.sans,
                fontSize: 10.5,
              }}
            >
              {tile.author.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const GridTitle: React.FC<{
  text: string;
  en: string;
  startFrame: number;
}> = ({ text, en, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const chars = [...text];

  const enRevealStart = chars.length * 6 + 4;
  const enOpacity = interpolate(local, [enRevealStart, enRevealStart + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.songti,
          fontWeight: 700,
          fontSize: 96,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1,
          display: "flex",
        }}
      >
        {chars.map((ch, i) => {
          const charStart = i * 6;
          const charOpacity = interpolate(
            local,
            [charStart, charStart + 14],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charScale = spring({
            frame: local - charStart,
            fps,
            config: { damping: 14, stiffness: 200, mass: 0.55 },
            durationInFrames: 22,
          });
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: charOpacity,
                transform: `scale(${0.6 + 0.4 * charScale})`,
                color: "rgba(255,255,255,0.96)",
                fontFamily: theme.fonts.songti,
                fontWeight: 700,
                textShadow: `0 4px 24px rgba(0,0,0,0.55)`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.sans,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          opacity: enOpacity,
          paddingLeft: "0.5em",
        }}
      >
        {en}
      </div>
    </div>
  );
};

export const PostsGrid: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const cellW = 240;
  const cellH = 200;
  const gap = 16;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `${cellW}px ${cellW}px ${cellW}px`,
        gridTemplateRows: `${cellH}px ${cellH}px ${cellH}px`,
        gap: gap,
      }}
    >
      {SLOT_TILES.map((tile, i) => {
        const slotIndex = i;
        const isTitleSlot = slotIndex === 1 || slotIndex === 7;
        if (isTitleSlot) {
          return (
            <div key={i}>
              <GridTitle
                text={slotIndex === 1 ? "帖子" : "动态"}
                en={slotIndex === 1 ? "POSTS" : "FEED"}
                startFrame={startFrame + (slotIndex === 1 ? 0 : 30)}
              />
            </div>
          );
        }
        if (tile === null) return <div key={i} />;
        return (
          <TileCard
            key={i}
            tile={tile}
            startFrame={startFrame + 12 + i * 4}
            index={i}
          />
        );
      })}
    </div>
  );
};
