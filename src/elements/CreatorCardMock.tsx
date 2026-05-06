import React from "react";
import { theme } from "../theme";

const CHIP_COLORS = [
  { bg: "rgba(107,79,187,0.18)", fg: "#B89AFF", border: "rgba(107,79,187,0.35)" },
  { bg: "rgba(0,201,167,0.16)", fg: "#5EEAD4", border: "rgba(0,201,167,0.35)" },
  { bg: "rgba(34,211,238,0.16)", fg: "#7DD3FC", border: "rgba(34,211,238,0.35)" },
  { bg: "rgba(255,107,53,0.16)", fg: "#FFA559", border: "rgba(255,107,53,0.35)" },
];

export type WorkPreview = {
  title: string;
  hue: number;
};

export type CreatorMock = {
  name: string;
  subtitle: string;
  initials: string;
  avatarHue: number;
  skills: string[];
  tag: string;
  matchScore: number;
  works?: WorkPreview[];
};

export const CreatorCardMock: React.FC<{
  creator: CreatorMock;
  scoreReveal?: number;
  highlight?: number;
  width?: number;
}> = ({ creator, scoreReveal = 1, highlight = 0, width = 460 }) => {
  const displayedScore = Math.round(creator.matchScore * scoreReveal);
  const rimGlow = highlight;

  return (
    <div
      style={{
        width,
        padding: 18,
        borderRadius: 22,
        background: `linear-gradient(180deg, rgba(25,76,178,0.18) 0%, rgba(255,107,53,0.18) 100%), rgba(255,255,255,0.05)`,
        border: `1px solid rgba(255,255,255,${0.08 + rimGlow * 0.25})`,
        boxShadow: `0 4px 32px rgba(0,0,0,0.35)${
          rimGlow > 0
            ? `, 0 0 ${40 * rimGlow}px ${theme.colors.ember}${Math.floor(
                rimGlow * 80
              )
                .toString(16)
                .padStart(2, "0")}`
            : ""
        }`,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        backdropFilter: "blur(12px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `conic-gradient(from ${creator.avatarHue}deg, ${theme.colors.emberCool}, ${theme.colors.violet}, ${theme.colors.emberWarm}, ${theme.colors.emberCool})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: `inset 0 0 0 2px rgba(255,255,255,0.08)`,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: theme.colors.voidDeep,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.colors.starlight,
              fontFamily: theme.fonts.sans,
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: "0.05em",
            }}
          >
            {creator.initials}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              color: theme.colors.starlight,
              fontFamily: theme.fonts.sans,
              fontWeight: 600,
              fontSize: 19,
              letterSpacing: "-0.005em",
            }}
          >
            {creator.name}
          </div>
          <div
            style={{
              color: "rgba(168,180,224,0.65)",
              fontFamily: theme.fonts.sans,
              fontSize: 13,
              marginTop: 3,
              fontWeight: 400,
            }}
          >
            {creator.subtitle}
          </div>
        </div>

        <div
          style={{
            padding: "6px 12px",
            borderRadius: 12,
            background: `rgba(255,107,53,${0.12 + rimGlow * 0.08})`,
            border: `0.5px solid rgba(255,107,53,${0.4 + rimGlow * 0.3})`,
            boxShadow: `0 0 ${12 + rimGlow * 16}px rgba(255,107,53,${
              0.2 + rimGlow * 0.2
            })`,
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 14,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayedScore}%
        </div>
      </div>

      <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
        {creator.skills.map((s, i) => {
          const c = CHIP_COLORS[i % CHIP_COLORS.length];
          return (
            <span
              key={s}
              style={{
                padding: "4px 10px",
                borderRadius: 9,
                background: c.bg,
                border: `0.5px solid ${c.border}`,
                color: c.fg,
                fontFamily: theme.fonts.sans,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {s}
            </span>
          );
        })}
      </div>

      {creator.works && creator.works.length > 0 && (
        <div style={{ display: "flex", gap: 6 }}>
          {creator.works.slice(0, 2).map((w, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 66,
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                background: `linear-gradient(135deg, hsl(${w.hue}, 38%, 38%) 0%, hsl(${
                  (w.hue + 30) % 360
                }, 32%, 22%) 100%), rgba(255,255,255,0.04)`,
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 30% 40%, hsl(${w.hue}, 60%, 55%, 0.45) 0%, transparent 60%)`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "10px 8px 6px",
                  background: "linear-gradient(transparent, rgba(10,14,39,0.92))",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.78)",
                    margin: 0,
                    lineHeight: 1.2,
                    fontFamily: theme.fonts.sans,
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {w.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            flex: 1,
            color: "#F093C8",
            fontFamily: theme.fonts.sans,
            fontSize: 12.5,
            fontStyle: "italic",
          }}
        >
          → {creator.tag}
        </div>
        <button
          style={{
            padding: "7px 18px",
            borderRadius: 999,
            background: `rgba(255,255,255,${0.08 + rimGlow * 0.06})`,
            border: `1px solid rgba(255,255,255,${0.14 + rimGlow * 0.2})`,
            color: theme.colors.starlight,
            fontFamily: theme.fonts.sans,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          连接
        </button>
      </div>
    </div>
  );
};
