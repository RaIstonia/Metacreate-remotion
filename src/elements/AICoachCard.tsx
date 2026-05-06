import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const QUICK_REPLIES = [
  { emoji: "⭐", label: "聊聊我最近在做的项目" },
  { emoji: "🤔", label: "聊聊我最看重的事" },
  { emoji: "✨", label: "聊聊我有过的特别经历" },
  { emoji: "💬", label: "让 AI 自由发挥" },
];

const SELECTED_INDEX = 0;

const typed = (text: string, startFrame: number, frame: number, perChar = 1.5) => {
  const chars = Math.max(0, Math.min(text.length, Math.floor((frame - startFrame) / perChar)));
  return text.slice(0, chars);
};

const TIMINGS = {
  cardEnter: 0,
  greetingStart: 16,
  optionsStart: 30,
  optionsHoldEnd: 90,
  cursorMoveStart: 90,
  cursorClickAt: 124,
  collapseStart: 132,
  userBubble1Start: 144,
  aiResponse1Start: 162,
  userBubble2Start: 224,
};

export const AICoachCard: React.FC<{
  startFrame: number;
  width?: number;
}> = ({ startFrame, width = 660 }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const cardEnter = interpolate(local, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cardLift = interpolate(local, [0, 24], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const greetingTyped = typed(
    "嘿 Creator0,今天想从哪里聊起?",
    startFrame + TIMINGS.greetingStart,
    frame,
    1.5
  );

  const cursorTargetX = 100;
  const cursorTargetY = 152;
  const cursorStartX = width - 80;
  const cursorStartY = 50;

  const cursorX = interpolate(
    local,
    [TIMINGS.cursorMoveStart, TIMINGS.cursorClickAt],
    [cursorStartX, cursorTargetX],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const cursorY = interpolate(
    local,
    [TIMINGS.cursorMoveStart, TIMINGS.cursorClickAt],
    [cursorStartY, cursorTargetY],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const cursorOpacity = interpolate(
    local,
    [
      TIMINGS.cursorMoveStart - 10,
      TIMINGS.cursorMoveStart - 4,
      TIMINGS.cursorClickAt + 4,
      TIMINGS.cursorClickAt + 12,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const optionsCollapse = interpolate(
    local,
    [TIMINGS.collapseStart, TIMINGS.userBubble1Start],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const userBubble1Enter = interpolate(
    local,
    [TIMINGS.userBubble1Start, TIMINGS.userBubble1Start + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const aiResponse1Typed = typed(
    "很有意思 — 数据 + 界面,这是建造者里的稀有组合。",
    startFrame + TIMINGS.aiResponse1Start + 8,
    frame,
    1.5
  );

  const userBubble2Enter = interpolate(
    local,
    [TIMINGS.userBubble2Start, TIMINGS.userBubble2Start + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const userBubble2Text = typed(
    "对,想找人一起把它做出来。",
    startFrame + TIMINGS.userBubble2Start + 4,
    frame,
    1.4
  );

  return (
    <div
      style={{
        width,
        padding: "20px 22px",
        borderRadius: 20,
        background:
          "linear-gradient(180deg, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0.02) 100%), rgba(10,14,39,0.7)",
        border: "1px solid rgba(255,107,53,0.18)",
        boxShadow: "0 4px 24px rgba(255,107,53,0.08), 0 12px 40px rgba(0,0,0,0.35)",
        opacity: cardEnter,
        transform: `translateY(${cardLift}px)`,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingBottom: 14,
          borderBottom: "1px solid rgba(255,107,53,0.08)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FF6B35",
            boxShadow: "0 0 8px #FF6B35aa",
          }}
        />
        <div
          style={{
            color: "white",
            fontFamily: theme.fonts.sans,
            fontSize: 14.5,
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
        >
          AI 职业教练
        </div>
        <div
          style={{
            color: "rgba(168,180,224,0.5)",
            fontFamily: theme.fonts.sans,
            fontSize: 11.5,
            marginLeft: 4,
          }}
        >
          · 已云端保存
        </div>
        <div
          style={{
            marginLeft: "auto",
            color: "#FFA559",
            fontFamily: theme.fonts.sans,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          结束并生成
        </div>
      </div>

      <div style={{ paddingTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(255,107,53,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 14,
            }}
          >
            ✨
          </div>
          <div
            style={{
              padding: "10px 16px",
              borderRadius: "12px 12px 12px 4px",
              background: "rgba(255,107,53,0.08)",
              border: "1px solid rgba(255,107,53,0.15)",
              color: "rgba(255,255,255,0.92)",
              fontFamily: theme.fonts.sans,
              fontSize: 14,
              lineHeight: 1.45,
              maxWidth: 420,
            }}
          >
            {greetingTyped}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            opacity: optionsCollapse,
            maxHeight: optionsCollapse * 280,
            overflow: "hidden",
          }}
        >
          {QUICK_REPLIES.map((q, i) => {
            const start = TIMINGS.optionsStart + i * 5;
            const enter = interpolate(local, [start, start + 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            const lift = interpolate(local, [start, start + 18], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });
            const isSelected = i === SELECTED_INDEX;
            const selectGlow = isSelected
              ? interpolate(
                  local,
                  [
                    TIMINGS.cursorClickAt - 2,
                    TIMINGS.cursorClickAt + 6,
                    TIMINGS.cursorClickAt + 14,
                  ],
                  [0, 1, 0.35],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                )
              : 0;
            return (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: `rgba(255,107,53,${0.04 + selectGlow * 0.12})`,
                  border: `1px solid rgba(255,107,53,${0.18 + selectGlow * 0.45})`,
                  boxShadow:
                    selectGlow > 0
                      ? `0 0 ${24 * selectGlow}px rgba(255,107,53,${selectGlow * 0.55})`
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: enter,
                  transform: `translateY(${lift}px)`,
                }}
              >
                <span style={{ fontSize: 16 }}>{q.emoji}</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: theme.fonts.sans,
                    fontSize: 13.5,
                    fontWeight: 400,
                  }}
                >
                  {q.label}
                </span>
              </div>
            );
          })}
        </div>

        {local >= TIMINGS.userBubble1Start - 4 && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              flexDirection: "row-reverse",
              opacity: userBubble1Enter,
              transform: `translateY(${(1 - userBubble1Enter) * 12}px)`,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #1E2A5E, #845EC2)",
                color: "#C4AEED",
                fontFamily: theme.fonts.sans,
                fontWeight: 600,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              我
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "12px 12px 4px 12px",
                background: "linear-gradient(180deg, rgba(132,94,194,0.18), rgba(25,76,178,0.12))",
                border: "1px solid rgba(132,94,194,0.25)",
                color: "rgba(255,255,255,0.92)",
                fontFamily: theme.fonts.sans,
                fontSize: 13.5,
                maxWidth: 360,
              }}
            >
              ⭐ 聊聊我最近在做的项目
            </div>
          </div>
        )}

        {local >= TIMINGS.aiResponse1Start - 4 && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "rgba(255,107,53,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 14,
              }}
            >
              ✨
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "12px 12px 12px 4px",
                background: "rgba(255,107,53,0.08)",
                border: "1px solid rgba(255,107,53,0.15)",
                color: "rgba(255,255,255,0.92)",
                fontFamily: theme.fonts.sans,
                fontSize: 13.5,
                lineHeight: 1.5,
                maxWidth: 460,
              }}
            >
              {aiResponse1Typed}
            </div>
          </div>
        )}

        {local >= TIMINGS.userBubble2Start - 4 && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              flexDirection: "row-reverse",
              opacity: userBubble2Enter,
              transform: `translateY(${(1 - userBubble2Enter) * 10}px)`,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #1E2A5E, #845EC2)",
                color: "#C4AEED",
                fontFamily: theme.fonts.sans,
                fontWeight: 600,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              我
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: "12px 12px 4px 12px",
                background: "linear-gradient(180deg, rgba(132,94,194,0.18), rgba(25,76,178,0.12))",
                border: "1px solid rgba(132,94,194,0.25)",
                color: "rgba(255,255,255,0.92)",
                fontFamily: theme.fonts.sans,
                fontSize: 13.5,
                maxWidth: 360,
              }}
            >
              {userBubble2Text}
            </div>
          </div>
        )}

      </div>

      <div
        style={{
          position: "absolute",
          left: cursorX,
          top: cursorY,
          width: 18,
          height: 18,
          opacity: cursorOpacity,
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M2 1.5L2 12.5L5 9.5L7 13L9 12L7 8.5L11.5 8.5L2 1.5Z"
            fill="white"
            stroke="black"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
};
