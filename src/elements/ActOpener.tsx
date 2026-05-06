import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const HERO_END = 36;
const SHRINK_END = 60;

export const ActOpener: React.FC<{
  en: string;
  emberWord: string;
  zh: string;
  index: 0 | 1 | 2;
}> = ({ en, emberWord, zh, index }) => {
  const frame = useCurrentFrame();

  const heroEnter = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const heroLift = interpolate(frame, [0, 24], [16, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const heroFade = interpolate(frame, [HERO_END, SHRINK_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelFade = interpolate(frame, [SHRINK_END - 6, SHRINK_END + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const restOfEn = en.slice(emberWord.length);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: heroFade,
        }}
      >
        <div
          style={{
            opacity: heroEnter,
            transform: `translateY(${heroLift}px)`,
            fontFamily: theme.fonts.serif,
            fontSize: 96,
            fontWeight: 300,
            letterSpacing: "-0.01em",
            color: theme.colors.starlight,
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          <span style={{ color: theme.colors.ember, fontStyle: "italic" }}>
            {emberWord}
          </span>
          <span style={{ opacity: 0.92 }}>{restOfEn}</span>
        </div>

        <div
          style={{
            marginTop: 36,
            fontFamily: theme.fonts.sans,
            fontSize: 26,
            letterSpacing: "0.36em",
            color: theme.colors.starlight,
            opacity: heroEnter * 0.6,
            fontWeight: 300,
          }}
        >
          {zh}
        </div>

        <div
          style={{
            marginTop: 60,
            display: "flex",
            gap: 8,
            opacity: heroEnter * 0.7,
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
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 56,
          left: 64,
          opacity: labelFade,
          display: "flex",
          alignItems: "baseline",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: theme.fonts.serif,
            fontSize: 22,
            fontWeight: 300,
            color: theme.colors.starlight,
          }}
        >
          <span style={{ color: theme.colors.ember, fontStyle: "italic" }}>
            {emberWord}
          </span>
          <span style={{ opacity: 0.85 }}>{restOfEn}</span>
        </div>
        <div
          style={{
            fontFamily: theme.fonts.sans,
            fontSize: 12,
            letterSpacing: "0.32em",
            color: `${theme.colors.starlight}80`,
            fontWeight: 300,
          }}
        >
          {zh}
        </div>
        <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === index ? 14 : 4,
                height: 2,
                borderRadius: 2,
                backgroundColor:
                  i === index ? theme.colors.ember : `${theme.colors.starlight}25`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
