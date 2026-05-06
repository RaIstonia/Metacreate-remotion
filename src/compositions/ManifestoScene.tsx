import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Line = {
  emberWord: string;
  rest: string;
  emberFirst: boolean;
  startFrame: number;
};

const LINES: Line[] = [
  { emberWord: "Find", rest: " Yourself.", emberFirst: true, startFrame: 12 },
  {
    emberWord: "Connect",
    rest: " With Kindred Spirits.",
    emberFirst: true,
    startFrame: 96,
  },
  {
    emberWord: "Co-Create",
    rest: " What's Possible.",
    emberFirst: true,
    startFrame: 192,
  },
];

const SUBTITLE_ZH = [
  "找到自己。",
  "连接同路人。",
  "共创理想的产品、生活、与意义。",
];

const StanzaLine: React.FC<{
  line: Line;
  zh: string;
  index: number;
}> = ({ line, zh, index }) => {
  const frame = useCurrentFrame();
  const local = frame - line.startFrame;

  const enOpacity = interpolate(local, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enLift = interpolate(local, [0, 30], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const zhOpacity = interpolate(local, [18, 42], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(local, [66, 84], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (local < -4 || local > 84) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          opacity: enOpacity,
          transform: `translateY(${enLift}px)`,
          fontFamily: theme.fonts.serif,
          fontSize: 92,
          fontWeight: 300,
          letterSpacing: "-0.01em",
          color: theme.colors.starlight,
          lineHeight: 1.05,
          textAlign: "center",
        }}
      >
        <span style={{ color: theme.colors.ember, fontStyle: "italic" }}>
          {line.emberWord}
        </span>
        <span style={{ opacity: 0.92 }}>{line.rest}</span>
      </div>

      <div
        style={{
          marginTop: 36,
          fontFamily: theme.fonts.sans,
          fontSize: 22,
          letterSpacing: "0.32em",
          color: theme.colors.starlight,
          opacity: zhOpacity,
          fontWeight: 300,
        }}
      >
        {zh}
      </div>

      <div
        style={{
          marginTop: 56,
          display: "flex",
          gap: 8,
          opacity: enOpacity * 0.7,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === index ? 22 : 4,
              height: 2,
              borderRadius: 2,
              backgroundColor:
                i === index ? theme.colors.ember : `${theme.colors.starlight}30`,
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const ManifestoScene: React.FC = () => {
  const frame = useCurrentFrame();

  const ambientOpacity = interpolate(frame, [0, 24, 264, 288], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 70%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.colors.ember}10 0%, transparent 60%)`,
          opacity: ambientOpacity,
          filter: "blur(40px)",
        }}
      />

      {LINES.map((line, i) => (
        <StanzaLine
          key={i}
          line={line}
          zh={SUBTITLE_ZH[i]}
          index={i}
        />
      ))}
    </AbsoluteFill>
  );
};
