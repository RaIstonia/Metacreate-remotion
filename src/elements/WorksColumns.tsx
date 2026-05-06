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

const COLUMN_LEFT: Work[] = [
  {
    title: "Algorithmic Dreamweaving",
    category: "AI / Art",
    author: "Yuki Tanaka",
    authorInitials: "YT",
    authorVariant: "flame",
    height: 240,
    hue: 280,
  },
  {
    title: "Public Feedback: From Box to Bridge",
    category: "Service Design",
    author: "Nina Xie",
    authorInitials: "NX",
    authorVariant: "violet",
    height: 200,
    hue: 30,
  },
  {
    title: "算法织梦:当代码遇见水墨",
    category: "媒介实验",
    author: "Sam Gao",
    authorInitials: "SG",
    authorVariant: "cosmos",
    height: 220,
    hue: 200,
  },
];

const COLUMN_RIGHT: Work[] = [
  {
    title: "Spatial Poetry",
    category: "空间装置",
    author: "Sofia Reyes",
    authorInitials: "SR",
    authorVariant: "violet",
    height: 220,
    hue: 320,
  },
  {
    title: "DMV Sprint Redesign",
    category: "Workshop",
    author: "Arjun Mehta",
    authorInitials: "AM",
    authorVariant: "cosmos",
    height: 240,
    hue: 220,
  },
  {
    title: "Generative Nebula Demo",
    category: "WebGL",
    author: "Luna Xu",
    authorInitials: "LX",
    authorVariant: "flame",
    height: 200,
    hue: 100,
  },
];

const WorkCard: React.FC<{ work: Work; startFrame: number }> = ({
  work,
  startFrame,
}) => {
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
  const hue2 = work.hue2 ?? (work.hue + 30) % 360;

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 14,
        borderRadius: 16,
        overflow: "hidden",
        background:
          "linear-gradient(160deg, rgba(255,107,53,0.05) 0%, rgba(255,255,255,0.025) 100%), rgba(255,255,255,0.018)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        opacity: enter,
        transform: `translateY(${lift}px)`,
        breakInside: "avoid",
      }}
    >
      <div
        style={{
          height: work.height - 76,
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
            inset: 0,
            background: `radial-gradient(circle at 70% 70%, hsla(${hue2}, 65%, 60%, 0.3) 0%, transparent 50%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "3px 10px",
            borderRadius: 10,
            background: "rgba(255,107,53,0.14)",
            border: "0.5px solid rgba(255,107,53,0.4)",
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {work.category}
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 13.5,
            fontWeight: 600,
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
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
            gap: 8,
            marginTop: 10,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: AVATAR_GRAD[work.authorVariant],
              color: AVATAR_TEXT[work.authorVariant],
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {work.authorInitials}
          </div>
          <div
            style={{
              flex: 1,
              color: "rgba(255,255,255,0.5)",
              fontFamily: theme.fonts.sans,
              fontSize: 11,
            }}
          >
            {work.author}
          </div>
          <div
            style={{
              padding: "3px 10px",
              borderRadius: 9999,
              background: "rgba(0,201,167,0.10)",
              border: "0.5px solid rgba(0,201,167,0.25)",
              color: "#00C9A7",
              fontFamily: theme.fonts.sans,
              fontSize: 10.5,
              fontWeight: 500,
            }}
          >
            联系
          </div>
        </div>
      </div>
    </div>
  );
};

const VerticalTitle: React.FC<{ startFrame: number; text: string }> = ({
  startFrame,
  text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;
  const chars = [...text];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
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
        const isEmber = i === 0;
        return (
          <span
            key={i}
            style={{
              fontFamily: isEmber ? theme.fonts.serif : theme.fonts.sans,
              fontStyle: isEmber ? "italic" : "normal",
              fontWeight: isEmber ? 400 : 800,
              fontSize: 96,
              lineHeight: 0.95,
              color: isEmber ? theme.colors.ember : "rgba(255,255,255,0.96)",
              opacity: charOpacity,
              transform: `scale(${0.55 + 0.45 * charScale})`,
              textShadow: isEmber
                ? `0 0 32px ${theme.colors.ember}cc`
                : `0 4px 24px rgba(0,0,0,0.55)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

export const WorksColumns: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        justifyContent: "center",
        width: 1280,
      }}
    >
      <div style={{ width: 320 }}>
        {COLUMN_LEFT.map((w, i) => (
          <WorkCard key={i} work={w} startFrame={startFrame + i * 8} />
        ))}
      </div>

      <div
        style={{
          flexShrink: 0,
          paddingTop: 60,
        }}
      >
        <VerticalTitle startFrame={startFrame + 8} text="作品瀑布" />
      </div>

      <div style={{ width: 320, paddingTop: 30 }}>
        {COLUMN_RIGHT.map((w, i) => (
          <WorkCard key={i} work={w} startFrame={startFrame + i * 8 + 4} />
        ))}
      </div>
    </div>
  );
};
