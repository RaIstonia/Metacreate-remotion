import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

type Props = {
  startFrame: number;
  title: string;
  subtitle: string;
  titleEn?: string;
  subtitleEn?: string;
  subtitleDelay?: number;
};

export const TypewriterPanel: React.FC<Props> = ({
  startFrame,
  title,
  subtitle,
  titleEn,
  subtitleEn,
  subtitleDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  if (local < -8) return null;

  const titleStepFrames = 7;
  const titleSettleFrames = 14;
  const titleChars = [...title];
  const titleEndFrame = titleChars.length * titleStepFrames;

  const titleEnStartFrame = titleEndFrame + 6;
  const titleEnRevealFrames = 16;

  const subtitleStartFrame = titleEnStartFrame + 18 + subtitleDelay;
  const subtitleStepFrames = 6;
  const subtitleSettleFrames = 12;
  const subtitleChars = [...subtitle];
  const subtitleEndFrame = subtitleStartFrame + subtitleChars.length * subtitleStepFrames;

  const subtitleEnStartFrame = subtitleEndFrame + 4;

  const panelEnter = interpolate(local, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const panelLift = interpolate(local, [0, 26], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cursorBlink =
    local > -2 && Math.floor(local / 7) % 2 === 0 ? 1 : 0.15;

  const titleVisibleCount = Math.max(
    0,
    Math.min(titleChars.length, Math.floor(local / titleStepFrames) + 1)
  );
  const titleAllShown = titleVisibleCount >= titleChars.length;

  const subtitleLocal = local - subtitleStartFrame;
  const subtitleVisibleCount = Math.max(
    0,
    Math.min(
      subtitleChars.length,
      Math.floor(subtitleLocal / subtitleStepFrames) + 1
    )
  );
  const subtitleAllShown = subtitleVisibleCount >= subtitleChars.length;

  const showTitleCursor = !titleAllShown && local >= 0;
  const showSubtitleCursor =
    titleAllShown && !subtitleAllShown && local >= subtitleStartFrame;

  const titleEnOpacity = interpolate(
    local,
    [titleEnStartFrame, titleEnStartFrame + titleEnRevealFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleEnOpacity = interpolate(
    local,
    [subtitleEnStartFrame, subtitleEnStartFrame + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const visibleTitleChars = titleChars.slice(0, titleVisibleCount);
  const visibleSubtitleChars = subtitleChars.slice(0, subtitleVisibleCount);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 760,
        paddingRight: 80,
        paddingLeft: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        opacity: panelEnter,
        transform: `translateY(${panelLift}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.songti,
          fontWeight: 700,
          fontSize: 104,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.05,
          display: "flex",
          alignItems: "baseline",
        }}
      >
        {visibleTitleChars.map((ch, i) => {
          const charStart = i * titleStepFrames;
          const charScale = spring({
            frame: local - charStart,
            fps,
            config: { damping: 14, stiffness: 200, mass: 0.55 },
            durationInFrames: titleSettleFrames,
          });
          const charOpacity = interpolate(
            local,
            [charStart, charStart + 8],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: charOpacity,
                transform: `scale(${0.6 + 0.4 * charScale})`,
                color: "rgba(255,255,255,0.96)",
                fontFamily: theme.fonts.songti,
                fontWeight: 700,
                textShadow: `0 4px 24px rgba(0,0,0,0.5)`,
                marginRight: ch === " " ? "0.3em" : 0,
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          );
        })}
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 90,
            backgroundColor: theme.colors.ember,
            opacity: showTitleCursor ? cursorBlink : 0,
            marginLeft: 8,
            boxShadow: `0 0 12px ${theme.colors.ember}aa`,
            transform: "translateY(-8px)",
          }}
        />
      </div>

      {titleEn && (
        <div
          style={{
            marginTop: 12,
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            opacity: titleEnOpacity,
          }}
        >
          {titleEn}
        </div>
      )}

      <div
        style={{
          marginTop: 36,
          fontFamily: theme.fonts.songti,
          fontWeight: 500,
          fontSize: 36,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.78)",
          lineHeight: 1.4,
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        {visibleSubtitleChars.map((ch, i) => {
          const charStart = subtitleStartFrame + i * subtitleStepFrames;
          const charScale = spring({
            frame: local - charStart,
            fps,
            config: { damping: 14, stiffness: 220, mass: 0.5 },
            durationInFrames: subtitleSettleFrames,
          });
          const charOpacity = interpolate(
            local,
            [charStart, charStart + 6],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: charOpacity,
                transform: `scale(${0.7 + 0.3 * charScale})`,
                marginRight: ch === " " ? "0.25em" : 0,
                textShadow: `0 2px 8px rgba(0,0,0,0.4)`,
              }}
            >
              {ch}
            </span>
          );
        })}
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: 36,
            backgroundColor: "rgba(255,255,255,0.5)",
            opacity: showSubtitleCursor ? cursorBlink : 0,
            marginLeft: 6,
            transform: "translateY(-2px)",
          }}
        />
      </div>

      {subtitleEn && (
        <div
          style={{
            marginTop: 10,
            fontFamily: theme.fonts.sans,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.42)",
            opacity: subtitleEnOpacity,
          }}
        >
          {subtitleEn}
        </div>
      )}
    </div>
  );
};
