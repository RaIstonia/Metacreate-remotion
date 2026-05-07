import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

type Work = {
  title: string;
  category: string;
  author: string;
  authorInitials: string;
  authorVariant: "flame" | "cosmos" | "violet";
  height: number;
  hue: number;
  hue2?: number;
};

const AVATAR_GRAD: Record<string, string> = {
  flame: "linear-gradient(145deg, #FF6B35 0%, #FFA559 100%)",
  cosmos: "linear-gradient(145deg, #0A0E27 0%, #1E2A5E 100%)",
  violet: "linear-gradient(145deg, #1E2A5E 0%, #845EC2 100%)",
};
const AVATAR_TEXT: Record<string, string> = {
  flame: "rgba(255,255,255,0.95)",
  cosmos: "#A8B4E0",
  violet: "#C4AEED",
};

const WORKS_LEFT: Work[] = [
  { title: "Algorithmic Dreamweaving", category: "AI / Art", author: "Yuki Tanaka", authorInitials: "YT", authorVariant: "flame", height: 240, hue: 280 },
  { title: "Public Feedback: From Box to Bridge", category: "Service Design", author: "Nina Xie", authorInitials: "NX", authorVariant: "violet", height: 200, hue: 30 },
  { title: "算法织梦:当代码遇见水墨", category: "媒介实验", author: "Sam Gao", authorInitials: "SG", authorVariant: "cosmos", height: 220, hue: 200 },
  { title: "Generative Nebula Demo", category: "WebGL", author: "Luna Xu", authorInitials: "LX", authorVariant: "flame", height: 220, hue: 100 },
  { title: "City as Code", category: "建筑·算法", author: "Lily Shi", authorInitials: "LS", authorVariant: "violet", height: 240, hue: 220 },
  { title: "Quiet Worldbuilder", category: "空间叙事", author: "Mira Chen", authorInitials: "MC", authorVariant: "cosmos", height: 200, hue: 320 },
];

const WORKS_RIGHT: Work[] = [
  { title: "Spatial Poetry", category: "空间装置", author: "Sofia Reyes", authorInitials: "SR", authorVariant: "violet", height: 220, hue: 320 },
  { title: "DMV Sprint Redesign", category: "Workshop", author: "Arjun Mehta", authorInitials: "AM", authorVariant: "cosmos", height: 240, hue: 220 },
  { title: "Sound Lab 7", category: "Audio", author: "Eli Lee", authorInitials: "EL", authorVariant: "violet", height: 200, hue: 180 },
  { title: "Ink Meets Code", category: "媒介", author: "Yuki Tanaka", authorInitials: "YT", authorVariant: "flame", height: 220, hue: 100 },
  { title: "Bridge Lab", category: "策略", author: "Arjun Mehta", authorInitials: "AM", authorVariant: "cosmos", height: 200, hue: 30 },
  { title: "Nebula Score", category: "声音 + AI", author: "PK", authorInitials: "PK", authorVariant: "flame", height: 240, hue: 280 },
];

const WorkCard: React.FC<{ work: Work; gap: number }> = ({ work, gap }) => {
  const hue2 = work.hue2 ?? (work.hue + 30) % 360;
  return (
    <div
      style={{
        width: "100%",
        marginBottom: gap,
        borderRadius: 14,
        overflow: "hidden",
        background:
          "linear-gradient(160deg, rgba(255,107,53,0.05) 0%, rgba(255,255,255,0.025) 100%), rgba(255,255,255,0.018)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          height: work.height - 64,
          position: "relative",
          background: `linear-gradient(135deg, hsl(${work.hue}, 45%, 38%) 0%, hsl(${hue2}, 38%, 22%) 100%)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 35%, hsla(${work.hue}, 70%, 60%, 0.45) 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "3px 9px",
            borderRadius: 9,
            background: "rgba(255,107,53,0.14)",
            border: "0.5px solid rgba(255,107,53,0.4)",
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontSize: 10,
            fontWeight: 500,
          }}
        >
          {work.category}
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {work.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: AVATAR_GRAD[work.authorVariant],
              color: AVATAR_TEXT[work.authorVariant],
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {work.authorInitials}
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: theme.fonts.sans,
              fontSize: 10.5,
            }}
          >
            {work.author}
          </span>
        </div>
      </div>
    </div>
  );
};

const FlowingColumn: React.FC<{
  works: Work[];
  direction: "up" | "down";
  startFrame: number;
}> = ({ works, direction, startFrame }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);
  const gap = 14;

  const tripled = [...works, ...works, ...works];
  const cardSpan = (w: Work) => w.height + gap;
  const blockHeight = works.reduce((s, w) => s + cardSpan(w), 0);

  const speed = 1.4;
  const distance = local * speed;

  const offset =
    direction === "up"
      ? -((distance % blockHeight))
      : -blockHeight + ((distance % blockHeight));

  return (
    <div
      style={{
        width: 280,
        height: 800,
        overflow: "hidden",
        position: "relative",
        maskImage:
          "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          transform: `translateY(${offset}px)`,
        }}
      >
        {tripled.map((w, i) => (
          <WorkCard key={i} work={w} gap={gap} />
        ))}
      </div>
    </div>
  );
};

const VerticalTitle: React.FC<{ startFrame: number; text: string; en: string }> = ({
  startFrame,
  text,
  en,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const chars = [...text];

  const enRevealStart = chars.length * 8 + 6;
  const enOpacity = interpolate(local, [enRevealStart, enRevealStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {chars.map((ch, i) => {
          const charStart = i * 8;
          const charOpacity = interpolate(
            local,
            [charStart, charStart + 14],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charScale = spring({
            frame: local - charStart,
            fps,
            config: { damping: 13, stiffness: 200, mass: 0.55 },
            durationInFrames: 22,
          });
          return (
            <span
              key={i}
              style={{
                fontFamily: theme.fonts.songti,
                fontWeight: 700,
                fontSize: 104,
                lineHeight: 1,
                color: "rgba(255,255,255,0.96)",
                opacity: charOpacity,
                transform: `scale(${0.55 + 0.45 * charScale})`,
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
          marginTop: 22,
          fontFamily: theme.fonts.sans,
          fontWeight: 600,
          fontSize: 17,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          opacity: enOpacity,
          paddingLeft: "0.42em",
        }}
      >
        {en}
      </div>
    </div>
  );
};

export const WorksWaterfall: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 36,
        alignItems: "center",
        justifyContent: "center",
        width: 1280,
      }}
    >
      <FlowingColumn
        works={WORKS_LEFT}
        direction="up"
        startFrame={startFrame}
      />

      <div
        style={{
          flexShrink: 0,
        }}
      >
        <VerticalTitle startFrame={startFrame + 4} text="作品瀑布" en="WORKS GALLERY" />
      </div>

      <FlowingColumn
        works={WORKS_RIGHT}
        direction="down"
        startFrame={startFrame + 6}
      />
    </div>
  );
};
