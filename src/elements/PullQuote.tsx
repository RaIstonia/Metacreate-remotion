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
  zh: string;
  en: string;
  emberFirstChar?: boolean;
  duration: number;
};

export const PullQuote: React.FC<Props> = ({
  zh,
  en,
  emberFirstChar = true,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const decorationStart = 4;
  const charStaggerOffset = 16;
  const charPerStep = 4;

  const subtitleStartRaw = charStaggerOffset + zh.length * charPerStep + 10;
  const subtitleStart = Math.min(subtitleStartRaw, duration - 28);
  const lineStart = Math.min(subtitleStart + 4, duration - 24);

  const sceneOpacity = interpolate(
    frame,
    [0, 8, duration - 14, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const haloOpacity = interpolate(
    frame,
    [0, 24, duration - 18, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const decorationOpacity = interpolate(
    frame,
    [decorationStart, decorationStart + 14, duration - 12, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const decorationScale = spring({
    frame: frame - decorationStart,
    fps,
    config: { damping: 12, stiffness: 180 },
    durationInFrames: 22,
  });

  const subtitleFadeInEnd = Math.min(subtitleStart + 12, duration - 20);
  const subtitleOpacity = interpolate(
    frame,
    [subtitleStart, subtitleFadeInEnd, duration - 16, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const lineFadeInEnd = Math.min(lineStart + 22, duration - 18);
  const lineWidth = interpolate(
    frame,
    [lineStart, lineFadeInEnd, duration - 16, duration],
    [0, 280, 280, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: sceneOpacity,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse at center, ${theme.colors.ember}26 0%, transparent 60%)`,
          filter: "blur(60px)",
          opacity: haloOpacity * 0.7,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          opacity: decorationOpacity,
          transform: `scale(${decorationScale})`,
          marginBottom: 56,
          color: theme.colors.ember,
          fontSize: 24,
          textShadow: `0 0 18px ${theme.colors.ember}aa`,
        }}
      >
        ✦
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          fontFamily: theme.fonts.sans,
          fontWeight: 700,
          fontSize: 132,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.05,
        }}
      >
        {[...zh].map((ch, i) => {
          const charStart = charStaggerOffset + i * charPerStep;
          const charEnter = interpolate(
            frame,
            [charStart, charStart + 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charLift = interpolate(
            frame,
            [charStart, charStart + 22],
            [40, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const charBlur = interpolate(
            frame,
            [charStart, charStart + 22],
            [12, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charScale = spring({
            frame: frame - charStart,
            fps,
            config: { damping: 14, stiffness: 160, mass: 0.7 },
            durationInFrames: 26,
          });
          const exitFade = interpolate(
            frame,
            [duration - 18, duration],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const isEmber = emberFirstChar && i === 0;
          return (
            <span
              key={i}
              style={{
                opacity: charEnter * exitFade,
                transform: `translateY(${charLift}px) scale(${0.6 + 0.4 * charScale})`,
                color: isEmber ? theme.colors.ember : "rgba(255,255,255,0.96)",
                fontFamily: isEmber ? theme.fonts.serif : theme.fonts.sans,
                fontStyle: isEmber ? "italic" : "normal",
                fontWeight: isEmber ? 400 : 700,
                display: "inline-block",
                filter: `blur(${charBlur}px)`,
                textShadow: isEmber
                  ? `0 0 32px ${theme.colors.ember}cc`
                  : `0 4px 24px rgba(0,0,0,0.5)`,
                marginRight: ch === " " ? "0.3em" : 0,
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 32,
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${theme.colors.ember} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${theme.colors.ember}aa`,
          maxWidth: "60%",
        }}
      />

      <div
        style={{
          marginTop: 28,
          fontFamily: theme.fonts.sans,
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: "0.6em",
          textTransform: "uppercase",
          color: "rgba(255,165,89,0.78)",
          opacity: subtitleOpacity,
          paddingLeft: "0.6em",
        }}
      >
        {en}
      </div>
    </div>
  );
};
