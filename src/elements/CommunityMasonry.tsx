import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Work = {
  title: string;
  category: string;
  author: string;
  authorInitials: string;
  authorVariant: "flame" | "cosmos" | "violet";
  height: number;
  hue: number;
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
    height: 230,
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
    title: "算法织梦：当代码遇见水墨",
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
    height: 250,
    hue: 320,
  },
  {
    title: "DMV Sprint Redesign",
    category: "Workshop",
    author: "Arjun Mehta",
    authorInitials: "AM",
    authorVariant: "cosmos",
    height: 210,
    hue: 220,
  },
  {
    title: "Generative Nebula Demo",
    category: "WebGL",
    author: "Luna Xu",
    authorInitials: "LX",
    authorVariant: "flame",
    height: 230,
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
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        opacity: enter,
        transform: `translateY(${lift}px)`,
        breakInside: "avoid",
        display: "block",
      }}
    >
      <div
        style={{
          height: work.height - 76,
          position: "relative",
          background: `linear-gradient(135deg, hsl(${work.hue}, 42%, 38%) 0%, hsl(${
            (work.hue + 30) % 360
          }, 36%, 22%) 100%)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 30% 35%, hsl(${work.hue}, 70%, 60%, 0.45) 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "3px 10px",
            borderRadius: 10,
            background: "rgba(255,107,53,0.12)",
            border: "0.5px solid rgba(255,107,53,0.35)",
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontSize: 10.5,
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

export const CommunityMasonry: React.FC<{
  startFrame?: number;
  width?: number;
}> = ({ startFrame = 0, width = 720 }) => {
  return (
    <div
      style={{
        width,
        display: "flex",
        gap: 14,
      }}
    >
      <div style={{ flex: 1 }}>
        {COLUMN_LEFT.map((w, i) => (
          <WorkCard key={i} work={w} startFrame={startFrame + i * 8} />
        ))}
      </div>
      <div style={{ flex: 1, paddingTop: 36 }}>
        {COLUMN_RIGHT.map((w, i) => (
          <WorkCard key={i} work={w} startFrame={startFrame + i * 8 + 4} />
        ))}
      </div>
    </div>
  );
};
