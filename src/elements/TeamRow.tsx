import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Team = {
  name: string;
  members: number;
  max: number;
  category: string;
  description: string;
  matchScore: number;
  initials: string;
  recruitRoles: string[];
  memberAvatars: { initials: string; variant: "flame" | "violet" | "cosmos" }[];
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

const TEAMS: Team[] = [
  {
    name: "AI Collective",
    members: 3,
    max: 5,
    category: "AI / ML",
    description: "把 prompt 变成可交互的 3D 作品",
    matchScore: 87,
    initials: "AC",
    recruitRoles: ["建造者"],
    memberAvatars: [
      { initials: "YT", variant: "flame" },
      { initials: "SR", variant: "violet" },
      { initials: "AM", variant: "cosmos" },
    ],
  },
  {
    name: "City as Code",
    members: 2,
    max: 4,
    category: "建筑 · 算法",
    description: "用参数化生成公共空间设计",
    matchScore: 82,
    initials: "CC",
    recruitRoles: ["策略家", "建造者"],
    memberAvatars: [
      { initials: "LS", variant: "flame" },
      { initials: "NX", variant: "violet" },
    ],
  },
  {
    name: "Sound Lab 7",
    members: 4,
    max: 6,
    category: "Audio / 媒介",
    description: "为生成式星云配上沉浸声场",
    matchScore: 76,
    initials: "S7",
    recruitRoles: ["梦想家"],
    memberAvatars: [
      { initials: "EL", variant: "violet" },
      { initials: "PK", variant: "cosmos" },
      { initials: "RM", variant: "flame" },
      { initials: "JW", variant: "violet" },
    ],
  },
];

const TeamMini: React.FC<{ team: Team; startFrame: number }> = ({
  team,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lift = interpolate(frame, [startFrame, startFrame + 26], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scoreReveal = interpolate(
    frame,
    [startFrame + 18, startFrame + 50],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        width: 360,
        padding: 18,
        borderRadius: 20,
        background:
          "linear-gradient(180deg, rgba(132,94,194,0.16) 0%, rgba(25,76,178,0.16) 100%), rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: enter,
        transform: `translateY(${lift}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.85)",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {team.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "white",
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {team.name}
          </div>
          <div
            style={{
              color: "#bfbfbf",
              fontFamily: theme.fonts.sans,
              fontSize: 11.5,
              marginTop: 2,
            }}
          >
            {team.members} / {team.max} · {team.category}
          </div>
        </div>
        <div
          style={{
            padding: "4px 10px",
            borderRadius: 10,
            background: "rgba(255,107,53,0.15)",
            border: "1px solid rgba(255,107,53,0.5)",
            color: "#FF6B35",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 11,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(team.matchScore * scoreReveal)}%
        </div>
      </div>

      <div
        style={{
          color: "#bfbfbf",
          fontFamily: theme.fonts.sans,
          fontSize: 12,
          lineHeight: 1.5,
          minHeight: 36,
        }}
      >
        {team.description}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: theme.fonts.sans,
            fontSize: 9.5,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          招募中
        </span>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {team.recruitRoles.map((r) => (
            <span
              key={r}
              style={{
                padding: "3px 10px",
                borderRadius: 12,
                background: "rgba(115,27,209,0.20)",
                border: "1px solid rgba(115,27,209,0.50)",
                color: "#b98de8",
                fontFamily: theme.fonts.sans,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 4,
        }}
      >
        <div style={{ display: "flex", flex: 1 }}>
          {team.memberAvatars.map((m, i) => (
            <div
              key={i}
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: AVATAR_GRAD[m.variant],
                border: "2px solid #1b2548",
                color: AVATAR_TEXT[m.variant],
                fontFamily: theme.fonts.sans,
                fontWeight: 600,
                fontSize: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: i === 0 ? 0 : -7,
                zIndex: 10 - i,
              }}
            >
              {m.initials}
            </div>
          ))}
        </div>
        <button
          style={{
            padding: "5px 14px",
            borderRadius: 14,
            background: "rgba(0,201,167,0.12)",
            border: "1px solid rgba(0,201,167,0.30)",
            color: "#00C9A7",
            fontFamily: theme.fonts.sans,
            fontSize: 11.5,
            fontWeight: 500,
          }}
        >
          加入
        </button>
      </div>
    </div>
  );
};

export const TeamRow: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {TEAMS.map((team, i) => (
        <TeamMini key={team.name} team={team} startFrame={startFrame + i * 8} />
      ))}
    </div>
  );
};
