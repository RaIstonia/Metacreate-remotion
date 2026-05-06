import React from "react";
import { theme } from "../theme";

export type SwipeProfile = {
  name: string;
  role: { zh: string; en: string };
  manifesto: string;
  buildingTitle: string;
  skills: string[];
  lookingFor: string[];
  school: string;
  city: string;
  matchScore: number;
  initials: string;
  avatarHue: number;
  coverHue: number;
};

const ROLE_ACCENT: Record<string, string> = {
  梦想家: "#FFA559",
  建造者: "#FF6B35",
  策略家: "#7DD3FC",
  连接者: "#C4AEED",
};

export const SwipeCard: React.FC<{
  profile: SwipeProfile;
  dragX?: number;
  rotation?: number;
  scale?: number;
  translateY?: number;
  zIndex?: number;
  isTop?: boolean;
}> = ({
  profile,
  dragX = 0,
  rotation = 0,
  scale = 1,
  translateY = 0,
  zIndex = 0,
  isTop = false,
}) => {
  const connectOpacity = isTop ? Math.max(0, Math.min(1, dragX / 60)) : 0;
  const skipOpacity = isTop ? Math.max(0, Math.min(1, -dragX / 60)) : 0;
  const accent = ROLE_ACCENT[profile.role.zh] || theme.colors.ember;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 420,
        height: 580,
        marginLeft: -210,
        marginTop: -290,
        borderRadius: 24,
        background: "linear-gradient(180deg, rgba(20,30,60,0.85) 0%, rgba(10,14,39,0.92) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        zIndex,
        transform: `translate(${dragX}px, ${translateY}px) rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: "center center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          padding: "6px 12px",
          borderRadius: 10,
          border: "3.5px solid #FF4444",
          color: "#FF4444",
          fontFamily: theme.fonts.sans,
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: "0.05em",
          transform: "rotate(-18deg)",
          opacity: skipOpacity,
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        跳过
      </div>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          padding: "6px 12px",
          borderRadius: 10,
          border: "3.5px solid #00D48F",
          color: "#00D48F",
          fontFamily: theme.fonts.sans,
          fontWeight: 900,
          fontSize: 20,
          letterSpacing: "0.05em",
          transform: "rotate(18deg)",
          opacity: connectOpacity,
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        连接
      </div>

      <div
        style={{
          position: "relative",
          height: 200,
          background: `linear-gradient(135deg, hsl(${profile.coverHue}, 35%, 28%) 0%, hsl(${(profile.coverHue + 30) % 360}, 30%, 16%) 100%)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 30% 35%, hsla(${profile.coverHue}, 55%, 55%, 0.35) 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 18px, rgba(255,255,255,0.02) 18px, rgba(255,255,255,0.02) 19px), repeating-linear-gradient(0deg, transparent 0px, transparent 18px, rgba(255,255,255,0.02) 18px, rgba(255,255,255,0.02) 19px)`,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 50,
            color: "white",
            fontFamily: theme.fonts.sans,
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.005em",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            maxWidth: 260,
            lineHeight: 1.25,
          }}
        >
          {profile.buildingTitle}
        </div>
        <div
          style={{
            position: "absolute",
            left: 18,
            bottom: 28,
            display: "flex",
            gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? 16 : 5,
                height: 5,
                borderRadius: 5,
                background: i === 0 ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #FF6B35 0%, #FFA559 100%)",
            border: "2px solid rgba(255,255,255,0.25)",
            color: "white",
            fontFamily: theme.fonts.sans,
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(255,107,53,0.5)",
            zIndex: 5,
          }}
        >
          {profile.matchScore}%
        </div>
      </div>

      <div
        style={{
          padding: "16px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: `linear-gradient(145deg, hsl(${profile.avatarHue}, 50%, 48%), hsl(${(profile.avatarHue + 30) % 360}, 55%, 38%))`,
              color: "rgba(255,255,255,0.95)",
              fontFamily: theme.fonts.sans,
              fontWeight: 700,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              flexShrink: 0,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "white",
                fontFamily: theme.fonts.sans,
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {profile.name}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
              <span
                style={{
                  padding: "2px 9px",
                  borderRadius: 999,
                  background: `${accent}24`,
                  border: `1px solid ${accent}55`,
                  color: accent,
                  fontFamily: theme.fonts.sans,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {profile.role.zh}
              </span>
              <span
                style={{
                  padding: "2px 9px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: theme.fonts.sans,
                  fontSize: 11,
                }}
              >
                {profile.school}
              </span>
              <span
                style={{
                  padding: "2px 9px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: theme.fonts.sans,
                  fontSize: 11,
                }}
              >
                {profile.city}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div
            style={{
              color: "rgba(168,180,224,0.55)",
              fontFamily: theme.fonts.sans,
              fontSize: 11,
              letterSpacing: "0.04em",
              marginBottom: 6,
            }}
          >
            正在构建
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: theme.fonts.sans,
              fontSize: 13,
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            {profile.manifesto}
          </div>
        </div>

        <div>
          <div
            style={{
              color: "rgba(168,180,224,0.55)",
              fontFamily: theme.fonts.sans,
              fontSize: 11,
              letterSpacing: "0.04em",
              marginBottom: 8,
            }}
          >
            技能
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {profile.skills.map((s, i) => {
              const palette = [
                { bg: "rgba(0,201,167,0.14)", fg: "#5EEAD4", border: "rgba(0,201,167,0.35)" },
                { bg: "rgba(34,211,238,0.14)", fg: "#7DD3FC", border: "rgba(34,211,238,0.35)" },
                { bg: "rgba(132,94,194,0.14)", fg: "#C4AEED", border: "rgba(132,94,194,0.35)" },
              ][i % 3];
              return (
                <span
                  key={s}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 8,
                    background: palette.bg,
                    border: `0.5px solid ${palette.border}`,
                    color: palette.fg,
                    fontFamily: theme.fonts.sans,
                    fontSize: 11.5,
                    fontWeight: 500,
                  }}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <div
            style={{
              color: "rgba(168,180,224,0.55)",
              fontFamily: theme.fonts.sans,
              fontSize: 11,
              letterSpacing: "0.04em",
              marginBottom: 8,
            }}
          >
            正在寻找
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {profile.lookingFor.map((r) => (
              <span
                key={r}
                style={{
                  padding: "4px 11px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.78)",
                  fontFamily: theme.fonts.sans,
                  fontSize: 11.5,
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
            justifyContent: "flex-end",
            marginTop: "auto",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              fontFamily: theme.fonts.sans,
              fontSize: 12,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>👁</span>
            查看资料
          </div>
        </div>
      </div>
    </div>
  );
};
