import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { ActOpener } from "../elements/ActOpener";
import { ProfileHeader } from "../elements/ProfileHeader";
import { AICoachCard } from "../elements/AICoachCard";
import { ManualSection } from "../elements/ManualSection";
import { FeatureLabel } from "../elements/FeatureLabel";

const PROFILE_TAGS = [
  { label: "Tsinghua", revealAt: 48 },
  { label: "Beijing", revealAt: 58 },
  { label: "赛道: 人工智能与机器学习", revealAt: 70 },
];

const VIEWPORT_W = 740;
const VIEWPORT_H = 920;

const COACH_START = 78;
const HEADER_BANNER_START = 290;
const GEN_INDICATOR_START = 296;
const MANUAL_BIO_START = 318;
const MANUAL_SKILLS_START = 348;

export const FindYourselfScene: React.FC = () => {
  const frame = useCurrentFrame();

  const viewportEnter = interpolate(frame, [36, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const viewportLift = interpolate(frame, [36, 60], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const scrollY = interpolate(
    frame,
    [40, 78, 100, 280, 296, 360, 388, 456],
    [0, 0, -76, -76, -340, -360, -360, -360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const sceneFade = interpolate(frame, [440, 456], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pushIn = interpolate(frame, [36, 410], [0.97, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const finalGlow = interpolate(frame, [340, 396], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const tagsPulse = interpolate(
    frame,
    [GEN_INDICATOR_START - 4, GEN_INDICATOR_START + 12, GEN_INDICATOR_START + 36],
    [0, 1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const indicatorOpacity = interpolate(
    frame,
    [GEN_INDICATOR_START, GEN_INDICATOR_START + 14, MANUAL_SKILLS_START + 36, MANUAL_SKILLS_START + 50],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const bannerEnter = interpolate(
    frame,
    [HEADER_BANNER_START, HEADER_BANNER_START + 18],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const bannerLift = interpolate(
    frame,
    [HEADER_BANNER_START, HEADER_BANNER_START + 22],
    [12, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
        opacity: sceneFade,
      }}
    >
      <ActOpener
        en="Find Yourself."
        emberWord="Find"
        zh="找到自己"
        index={0}
      />

      <FeatureLabel
        zh="探索自我"
        en="DEEP DIALOGUE"
        startFrame={88}
        duration={66}
      />

      <FeatureLabel
        zh="用户说明书"
        en="YOUR MANIFESTO"
        startFrame={296}
        duration={88}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: viewportEnter,
          transform: `translateY(${viewportLift}px) scale(${pushIn})`,
        }}
      >
        <div
          style={{
            width: VIEWPORT_W,
            height: VIEWPORT_H,
            position: "relative",
            borderRadius: 26,
            overflow: "hidden",
            background: "rgba(10,14,39,0.55)",
            border: "1px solid rgba(168,180,224,0.08)",
            boxShadow: `0 32px 100px rgba(0,0,0,0.6), 0 0 ${60 * finalGlow}px rgba(255,107,53,${finalGlow * 0.18})`,
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transform: `translateY(${scrollY}px)`,
              padding: "8px 0 40px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <ProfileHeader
              name="Creator0"
              initial="C"
              tags={PROFILE_TAGS}
              width={VIEWPORT_W}
            />

            <div
              style={{
                position: "relative",
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontFamily: theme.fonts.sans,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                个人说明书
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                {["保存长图", "自己写", "✨ 重新生成"].map((label, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "5px 12px",
                      borderRadius: 10,
                      background: i === 2 ? "rgba(255,107,53,0.16)" : "rgba(255,255,255,0.04)",
                      border: i === 2 ? "1px solid rgba(255,107,53,0.45)" : "1px solid rgba(255,255,255,0.08)",
                      color: i === 2 ? "#FF6B35" : "rgba(255,255,255,0.7)",
                      fontFamily: theme.fonts.sans,
                      fontSize: 11.5,
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                padding: "0 28px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "rgba(168,180,224,0.55)",
                fontFamily: theme.fonts.sans,
                fontSize: 12,
              }}
            >
              <span>正在参与</span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: `rgba(132,94,194,${0.18 + tagsPulse * 0.18})`,
                  border: `1px solid rgba(132,94,194,${0.45 + tagsPulse * 0.4})`,
                  color: "#C4AEED",
                  fontWeight: 500,
                  boxShadow: tagsPulse > 0 ? `0 0 ${16 * tagsPulse}px rgba(132,94,194,${tagsPulse * 0.6})` : "none",
                }}
              >
                🪐 天外家园
              </span>
            </div>

            <div style={{ padding: "0 28px" }}>
              <AICoachCard startFrame={COACH_START} width={VIEWPORT_W - 56} />
            </div>

            <div
              style={{
                padding: "0 28px",
                opacity: bannerEnter,
                transform: `translateY(${bannerLift}px)`,
              }}
            >
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: 16,
                  background:
                    "linear-gradient(180deg, rgba(255,107,53,0.10) 0%, rgba(255,107,53,0.04) 100%), rgba(10,14,39,0.6)",
                  border: "1px solid rgba(255,107,53,0.30)",
                  boxShadow: `0 4px 24px rgba(255,107,53,0.12)`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 14 }}>📜</span>
                  <span
                    style={{
                      color: "white",
                      fontFamily: theme.fonts.sans,
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.01em",
                    }}
                  >
                    用户说明书
                  </span>
                  <span
                    style={{
                      padding: "2px 9px",
                      borderRadius: 999,
                      background: "rgba(255,107,53,0.18)",
                      border: "1px solid rgba(255,107,53,0.4)",
                      color: "#FFA559",
                      fontFamily: theme.fonts.sans,
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✨ AI 探索自我 · 对话生成
                  </span>
                </div>
                <div
                  style={{
                    color: "rgba(168,180,224,0.65)",
                    fontFamily: theme.fonts.sans,
                    fontSize: 11.5,
                    lineHeight: 1.5,
                  }}
                >
                  从你的 onboarding 资料 + 2 轮对话提炼,你不必再写一句自我介绍。
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "0 28px",
                opacity: indicatorOpacity,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: "rgba(255,107,53,0.10)",
                  border: "1px solid rgba(255,107,53,0.3)",
                  color: "#FFA559",
                  fontFamily: theme.fonts.sans,
                  fontSize: 11,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>✨</span>
                <span>正在结合资料生成</span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  fontFamily: theme.fonts.sans,
                  fontSize: 10.5,
                  color: "rgba(168,180,224,0.5)",
                }}
              >
                <span>· Tsinghua</span>
                <span>· Beijing</span>
                <span>· AI 赛道</span>
                <span>· 2 轮对话</span>
              </div>
            </div>

            <div style={{ padding: "0 28px" }}>
              <ManualSection
                emoji="👋"
                title="快速认识我"
                body="我是 Creator0,一个在北京的全栈 Builder。做 AI/ML 也做 UX,写代码也做数据分析。"
                startFrame={MANUAL_BIO_START}
                width={VIEWPORT_W - 56}
              />
            </div>

            <div style={{ padding: "0 28px" }}>
              <ManualSection
                emoji="😄"
                title="我擅长的"
                chips={[
                  "从数据中提取 actionable insights",
                  "搭建端到端的 ML pipeline",
                  "做 0-1 产品原型开发",
                  "跨团队沟通技方案",
                  "快速学习新工具并落地",
                ]}
                body="能从数据里挖出模式,也能把模型塞进前端界面。"
                startFrame={MANUAL_SKILLS_START}
                width={VIEWPORT_W - 56}
              />
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              background: "linear-gradient(180deg, rgba(10,14,39,0.95) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 70,
              background: "linear-gradient(0deg, rgba(10,14,39,0.95) 0%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 5,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
