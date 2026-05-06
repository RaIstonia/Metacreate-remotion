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
  startFrame: number;
  duration: number;
  emberFirstChar?: boolean;
};

export const FeatureLabel: React.FC<Props> = ({
  zh,
  en,
  startFrame,
  duration,
  emberFirstChar = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  if (local < -10 || local > duration + 16) return null;

  const exitStart = duration - 18;
  const exitFade = interpolate(local, [exitStart, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitScale = interpolate(local, [exitStart, duration], [1, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enChars = [...zh];
  const charStaggerEnd = enChars.length * 3 + 16;

  const subtitleOpacity = interpolate(
    local,
    [charStaggerEnd - 6, charStaggerEnd + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const subtitleLift = interpolate(
    local,
    [charStaggerEnd - 6, charStaggerEnd + 18],
    [10, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const lineWidth = interpolate(
    local,
    [charStaggerEnd - 4, charStaggerEnd + 22],
    [0, 72],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const haloOpacity = interpolate(local, [0, 24, exitStart, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: exitFade,
        transform: `scale(${exitScale})`,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 760,
          height: 200,
          background: `radial-gradient(ellipse at center, ${theme.colors.ember}22 0%, ${theme.colors.voidBlack}00 60%)`,
          filter: "blur(40px)",
          opacity: haloOpacity,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 0,
          fontFamily: theme.fonts.sans,
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        {enChars.map((ch, i) => {
          const charStart = i * 3;
          const charOpacity = interpolate(
            local,
            [charStart, charStart + 14],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const charLift = interpolate(
            local,
            [charStart, charStart + 18],
            [26, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          const charScale = spring({
            frame: local - charStart,
            fps,
            config: { damping: 14, stiffness: 180, mass: 0.6 },
            durationInFrames: 22,
          });
          const isEmber = emberFirstChar && i === 0;
          return (
            <span
              key={i}
              style={{
                opacity: charOpacity,
                transform: `translateY(${charLift}px) scale(${0.6 + 0.4 * charScale})`,
                color: isEmber ? theme.colors.ember : "rgba(255,255,255,0.96)",
                fontFamily: isEmber ? theme.fonts.serif : theme.fonts.sans,
                fontStyle: isEmber ? "italic" : "normal",
                fontWeight: isEmber ? 400 : 700,
                display: "inline-block",
                marginRight: ch === " " ? "0.3em" : 0,
                textShadow: isEmber
                  ? `0 0 24px ${theme.colors.ember}aa`
                  : `0 2px 16px rgba(0,0,0,0.45)`,
              }}
            >
              {ch === " " ? " " : ch}
            </span>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 12,
          width: lineWidth,
          height: 2,
          background: `linear-gradient(90deg, transparent 0%, ${theme.colors.ember} 50%, transparent 100%)`,
          boxShadow: `0 0 12px ${theme.colors.ember}aa`,
        }}
      />

      <div
        style={{
          marginTop: 12,
          fontFamily: theme.fonts.sans,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "#FFA559",
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleLift}px)`,
        }}
      >
        {en}
      </div>
    </div>
  );
};
