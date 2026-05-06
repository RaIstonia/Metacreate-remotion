import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { Wordmark } from "../elements/Wordmark";

const SEED = 99;
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + SEED) * 43758.5453;
  return x - Math.floor(x);
};

type Planet = { x: number; y: number; size: number; delay: number };

const PLANETS: Planet[] = Array.from({ length: 55 }).map((_, i) => ({
  x: 220 + rand(i * 2) * 1480,
  y: 140 + rand(i * 2 + 1) * 800,
  size: rand(i * 3) * 2.6 + 1.4,
  delay: Math.floor(rand(i * 5) * 60),
}));

const CONNECTIONS: Array<[number, number]> = [];
PLANETS.forEach((p, i) => {
  const nearest = PLANETS.map((q, j) => ({
    j,
    d: Math.hypot(p.x - q.x, p.y - q.y),
  }))
    .filter(({ j }) => j !== i)
    .sort((a, b) => a.d - b.d)
    .slice(0, 2);
  nearest.forEach(({ j }) => {
    if (i < j) CONNECTIONS.push([i, j]);
  });
});

export const BrandOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 84], [1.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const wordmarkOpacity = interpolate(frame, [78, 114], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [102, 138], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const radialBg = `radial-gradient(circle at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 70%)`;

  return (
    <AbsoluteFill style={{ background: radialBg }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          transformOrigin: "center",
        }}
      >
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", inset: 0 }}
        >
          {CONNECTIONS.map(([a, b], i) => {
            const pa = PLANETS[a];
            const pb = PLANETS[b];
            const lineDelay = Math.max(pa.delay, pb.delay) + 14;
            const lineOpacity = interpolate(
              frame,
              [lineDelay, lineDelay + 30],
              [0, 0.16],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <line
                key={i}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={theme.colors.ember}
                strokeWidth={0.6}
                opacity={lineOpacity}
              />
            );
          })}
        </svg>

        {PLANETS.map((p, i) => {
          const opacity = interpolate(
            frame,
            [p.delay, p.delay + 18],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x - p.size / 2,
                top: p.y - p.size / 2,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: theme.colors.ember,
                opacity,
                boxShadow: `0 0 ${p.size * 6}px ${theme.colors.ember}, 0 0 ${p.size * 14}px ${theme.colors.emberWarm}77`,
              }}
            />
          );
        })}
      </div>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Wordmark
          opacity={wordmarkOpacity}
          showTagline
          taglineOpacity={taglineOpacity}
          size="xl"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
