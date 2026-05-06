import React from "react";
import { theme } from "../theme";

const ROLE_PURPLE = {
  bg: "rgba(115,27,209,0.20)",
  border: "rgba(115,27,209,0.50)",
  fg: "#b98de8",
};

const MEMBER_AVATARS = [
  { initials: "YT", variant: "flame" as const },
  { initials: "SR", variant: "violet" as const },
  { initials: "AM", variant: "cosmos" as const },
];

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

export const TeamCardMock: React.FC<{
  matchScore?: number;
  scoreReveal?: number;
  width?: number;
}> = ({ matchScore = 87, scoreReveal = 1, width = 540 }) => {
  const displayedScore = Math.round(matchScore * scoreReveal);
  return (
    <div
      style={{
        width,
        padding: 22,
        borderRadius: 22,
        background:
          "linear-gradient(180deg, rgba(132,94,194,0.16) 0%, rgba(25,76,178,0.16) 100%), rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.85)",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          AC
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: "white",
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 17,
            }}
          >
            AI Collective
          </div>
          <div
            style={{
              color: "#bfbfbf",
              fontFamily: theme.fonts.sans,
              fontSize: 12.5,
              marginTop: 2,
            }}
          >
            3 / 5 members · AI / Machine Learning
          </div>
        </div>
        <div
          style={{
            padding: "5px 12px",
            borderRadius: 12,
            background: "rgba(255,107,53,0.15)",
            border: "1px solid rgba(255,107,53,0.5)",
            color: "#FF6B35",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayedScore}%
        </div>
      </div>

      <div
        style={{
          color: "#bfbfbf",
          fontFamily: theme.fonts.sans,
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        探索生成式 AI 在创作场景中的可能。我们正在做一个把 prompt 变成 3D
        作品的实验。
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "2px -2px" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: theme.fonts.sans,
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          招募中
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["建造者", "策略家"].map((role) => (
            <span
              key={role}
              style={{
                padding: "4px 12px",
                borderRadius: 14,
                background: ROLE_PURPLE.bg,
                border: `1px solid ${ROLE_PURPLE.border}`,
                color: ROLE_PURPLE.fg,
                fontFamily: theme.fonts.sans,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
        <div
          style={{
            color: "#e88dba",
            fontFamily: theme.fonts.sans,
            fontSize: 12,
            fontStyle: "italic",
            flex: 1,
          }}
        >
          → 团队需要一位 建造者
        </div>
        <button
          style={{
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(0,201,167,0.12)",
            border: "1px solid rgba(0,201,167,0.30)",
            color: "#00C9A7",
            fontFamily: theme.fonts.sans,
            fontSize: 12.5,
            fontWeight: 500,
          }}
        >
          查看队伍
        </button>
        <button
          style={{
            padding: "7px 16px",
            borderRadius: 14,
            background: "rgba(255,107,53,0.15)",
            border: "1px solid rgba(255,107,53,0.45)",
            color: "#FF6B35",
            fontFamily: theme.fonts.sans,
            fontSize: 12.5,
            fontWeight: 500,
          }}
        >
          加入
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 4,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.55)",
            fontFamily: theme.fonts.sans,
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          现成员
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.78)",
            fontFamily: theme.fonts.sans,
            fontSize: 12,
            flex: 1,
          }}
        >
          梦想家 ×1 · 策略家 ×1 · 连接者 ×1
        </div>
        <div style={{ display: "flex" }}>
          {MEMBER_AVATARS.map((m, i) => (
            <div
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: AVATAR_GRAD[m.variant],
                border: "2px solid #1b2548",
                color: AVATAR_TEXT[m.variant],
                fontFamily: theme.fonts.sans,
                fontWeight: 600,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: i === 0 ? 0 : -8,
                zIndex: 10 - i,
              }}
            >
              {m.initials}
            </div>
          ))}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
              border: "2px dashed rgba(255,107,53,0.4)",
              color: "rgba(255,107,53,0.6)",
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: -8,
              zIndex: 6,
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};
