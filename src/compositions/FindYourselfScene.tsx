import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { ActOpener } from "../elements/ActOpener";
import { AICoachCard } from "../elements/AICoachCard";
import { TypewriterPanel } from "../elements/TypewriterPanel";
import { ManualSection } from "../elements/ManualSection";

const CARD_WIDTH = 660;

const COACH_START = 60;
const SHIFT_START = 196;
const SHIFT_END = SHIFT_START + 28;
const RIGHT_REVEAL_START = SHIFT_START;

const MANUAL_APPEAR = 280;
const MANUAL_BIO_START = MANUAL_APPEAR + 14;
const MANUAL_SKILLS_START = MANUAL_APPEAR + 70;

const ZOOM_START = 348;
const ZOOM_END = ZOOM_START + 36;

const CHAT_X_LEFT = 110;
const CHAT_X_CENTER = (1920 - CARD_WIDTH * 1.25) / 2;
const CHAT_HEIGHT_BIG = 720;
const CHAT_Y_CENTER = (1080 - CHAT_HEIGHT_BIG) / 2;
const CHAT_Y_LEFT = 96;

const MANUAL_TOP_REST = 470;
const MANUAL_TOP_ZOOM = 220;

export const FindYourselfScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneFade = interpolate(frame, [440, 456], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chatScale = interpolate(
    frame,
    [0, SHIFT_START, SHIFT_END],
    [1.25, 1.25, 0.92],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const chatX = interpolate(
    frame,
    [SHIFT_START, SHIFT_END],
    [CHAT_X_CENTER, CHAT_X_LEFT],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const chatY = interpolate(
    frame,
    [0, SHIFT_START, SHIFT_END, 316, 340],
    [CHAT_Y_CENTER, CHAT_Y_CENTER, CHAT_Y_LEFT, CHAT_Y_LEFT, -360],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const chatOpacity = interpolate(frame, [316, 340], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showManual = frame >= MANUAL_APPEAR - 8;
  const manualEnter = interpolate(
    frame,
    [MANUAL_APPEAR, MANUAL_APPEAR + 24],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const manualLift = interpolate(
    frame,
    [MANUAL_APPEAR, MANUAL_APPEAR + 28],
    [22, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const manualScale = interpolate(
    frame,
    [320, 360],
    [1, 1.18],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const manualY = interpolate(
    frame,
    [320, 360],
    [MANUAL_TOP_REST, 320],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const TAGLINE1_FADE = 340;
  const TAGLINE2_FADE = 364;

  const tagline1Opacity = interpolate(
    frame,
    [TAGLINE1_FADE, TAGLINE1_FADE + 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const tagline1Lift = interpolate(
    frame,
    [TAGLINE1_FADE, TAGLINE1_FADE + 32],
    [14, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const tagline2Opacity = interpolate(
    frame,
    [TAGLINE2_FADE, TAGLINE2_FADE + 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const tagline2Lift = interpolate(
    frame,
    [TAGLINE2_FADE, TAGLINE2_FADE + 32],
    [10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const rightVisible = frame >= RIGHT_REVEAL_START - 8;
  const taglineVisible = frame >= TAGLINE1_FADE - 8;

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

      <div
        style={{
          position: "absolute",
          left: chatX,
          top: chatY,
          width: CARD_WIDTH,
          transform: `scale(${chatScale})`,
          transformOrigin: "left top",
          opacity: chatOpacity,
        }}
      >
        <AICoachCard startFrame={COACH_START} width={CARD_WIDTH} />
      </div>

      {showManual && (
        <div
          style={{
            position: "absolute",
            left: CHAT_X_LEFT,
            top: manualY,
            width: CARD_WIDTH,
            transform: `scale(${manualScale}) translateY(${manualLift}px)`,
            transformOrigin: "left top",
            opacity: manualEnter,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 18,
              background:
                "linear-gradient(180deg, rgba(255,107,53,0.10) 0%, rgba(255,107,53,0.04) 100%), rgba(10,14,39,0.72)",
              border: "1px solid rgba(255,107,53,0.30)",
              boxShadow:
                "0 8px 32px rgba(255,107,53,0.10), 0 12px 40px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>📜</span>
              <span
                style={{
                  color: "white",
                  fontFamily: theme.fonts.sans,
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                用户说明书
              </span>
              <span
                style={{
                  padding: "3px 10px",
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
                ✨ AI 探索自我·对话生成
              </span>
            </div>

            <ManualSection
              emoji="👋"
              title="快速认识我"
              body="我是 Creator0,一个在北京的全栈 Builder。做 AI/ML 也做 UX,写代码也做数据分析。"
              startFrame={MANUAL_BIO_START}
              width={CARD_WIDTH - 40}
            />
            <ManualSection
              emoji="😄"
              title="我擅长的"
              body="能从数据里挖出模式,也能把模型塞进前端界面。"
              chips={[
                "从数据中提取 actionable insights",
                "搭建端到端 ML pipeline",
                "做 0-1 产品原型",
                "跨团队沟通技方案",
                "快速学习新工具",
              ]}
              startFrame={MANUAL_SKILLS_START}
              width={CARD_WIDTH - 40}
            />
          </div>
        </div>
      )}

      {taglineVisible && (
        <>
          <div
            style={{
              position: "absolute",
              left: CHAT_X_LEFT,
              top: 130,
              width: 900,
              fontFamily: theme.fonts.songti,
              fontWeight: 600,
              fontSize: 56,
              color: "rgba(255,255,255,0.96)",
              letterSpacing: "0.04em",
              lineHeight: 1.25,
              opacity: tagline1Opacity,
              transform: `translateY(${tagline1Lift}px)`,
              textShadow: "0 4px 24px rgba(0,0,0,0.7)",
              pointerEvents: "none",
            }}
          >
            AI 职业教练帮你说清楚你是谁
          </div>
          <div
            style={{
              position: "absolute",
              left: CHAT_X_LEFT,
              top: 230,
              width: 900,
              fontFamily: theme.fonts.songti,
              fontWeight: 500,
              fontSize: 34,
              color: theme.colors.ember,
              letterSpacing: "0.1em",
              lineHeight: 1.3,
              opacity: tagline2Opacity,
              transform: `translateY(${tagline2Lift}px)`,
              textShadow: `0 0 18px ${theme.colors.ember}66`,
              pointerEvents: "none",
            }}
          >
            把自己清晰展现
          </div>
        </>
      )}

      {rightVisible && (
        <TypewriterPanel
          startFrame={RIGHT_REVEAL_START}
          title="个人说明书"
          titleEn="PERSONAL MANUAL"
          subtitle="用交流 找到自我"
          subtitleEn="DIALOGUE TO DISCOVER"
        />
      )}
    </AbsoluteFill>
  );
};
