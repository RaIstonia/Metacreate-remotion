import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { Wordmark } from "../elements/Wordmark";
import { MetaFire } from "../elements/MetaFire";

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
  delay: 44 + Math.floor(rand(i * 5) * 56),
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

const SPARK_COUNT = 28;
const sparkRand = (i: number) => {
  const x = Math.sin(i * 23.71 + 11.7) * 7919.5;
  return x - Math.floor(x);
};

export const BrandOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const flameScale = interpolate(
    frame,
    [0, 33, 56, 80],
    [0.0, 1.0, 1.0, 0.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const flameOpacity = interpolate(frame, [0, 20, 58, 80], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flameGlow = interpolate(frame, [0, 33, 56, 80], [0.4, 1.0, 1.0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const burstFlash = interpolate(
    frame,
    [44, 56, 62, 78],
    [0, 0.55, 0.55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cameraScale = interpolate(frame, [11, 111], [1.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cosmicReveal = interpolate(frame, [44, 89], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const wordmarkOpacity = interpolate(frame, [98, 131], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandNameOpacity = interpolate(frame, [127, 158], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brandNameLift = interpolate(frame, [127, 162], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const line1Opacity = interpolate(frame, [151, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Lift = interpolate(frame, [151, 184], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const line2Opacity = interpolate(frame, [173, 202], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2Lift = interpolate(frame, [173, 207], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const sceneFade = interpolate(frame, [222, 262], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scrollerStart = 67;
  const scrollerEnd = 247;
  const scrollerX = interpolate(
    frame,
    [scrollerStart, scrollerEnd],
    [1920, 80],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.linear,
    }
  );
  const scrollerOpacity = interpolate(
    frame,
    [scrollerStart, scrollerStart + 24, scrollerEnd - 18, scrollerEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const radialBg = `radial-gradient(circle at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 70%)`;

  return (
    <AbsoluteFill style={{ background: radialBg, opacity: sceneFade }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          transformOrigin: "center",
          opacity: cosmicReveal,
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

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: flameOpacity,
          pointerEvents: "none",
        }}
      >
        <MetaFire scale={flameScale} glow={flameGlow} />
      </AbsoluteFill>

      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {[...Array(SPARK_COUNT)].map((_, i) => {
          const spawnDelay = 40 + (i % 12) * 1.8;
          const lifetime = 56;
          const localT = frame - spawnDelay;
          if (localT < 0 || localT > lifetime) return null;
          const t = localT / lifetime;
          const angle = sparkRand(i) * Math.PI * 2;
          const distance = 80 + sparkRand(i + 100) * 380;
          const dx = Math.cos(angle) * distance * t;
          const dy = Math.sin(angle) * distance * t - 30 * t;
          const size = 1.4 + sparkRand(i + 200) * 2.6;
          const opacity =
            Math.sin(Math.min(1, t * 1.4) * Math.PI) *
            (1 - Math.max(0, t - 0.7) * 3);
          return (
            <div
              key={`spark-${i}`}
              style={{
                position: "absolute",
                left: `calc(50% + ${dx}px)`,
                top: `calc(50% + ${dy}px)`,
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: theme.colors.ember,
                boxShadow: `0 0 ${size * 6}px ${theme.colors.ember}, 0 0 ${size * 14}px ${theme.colors.emberWarm}aa`,
                opacity: Math.max(0, opacity),
              }}
            />
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,210,150,0.85), rgba(255,107,53,0.4) 25%, transparent 60%)",
          opacity: burstFlash,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 0,
          pointerEvents: "none",
        }}
      >
        <Wordmark opacity={wordmarkOpacity} size="xl" />

        <div
          style={{
            marginTop: 32,
            fontFamily: theme.fonts.songti,
            fontWeight: 700,
            fontSize: 42,
            color: theme.colors.ember,
            letterSpacing: "0.42em",
            paddingLeft: "0.42em",
            opacity: brandNameOpacity,
            transform: `translateY(${brandNameLift}px)`,
            textShadow: `0 0 26px ${theme.colors.ember}aa`,
            lineHeight: 1,
          }}
        >
          元创星球
        </div>

        <div
          style={{
            marginTop: 34,
            fontFamily: theme.fonts.songti,
            fontWeight: 500,
            fontSize: 31,
            color: "rgba(245,241,234,0.92)",
            letterSpacing: "0.08em",
            opacity: line1Opacity,
            transform: `translateY(${line1Lift}px)`,
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
            lineHeight: 1.3,
          }}
        >
          专为创造者打造的交互网络。
        </div>

        <div
          style={{
            marginTop: 12,
            fontFamily: theme.fonts.songti,
            fontWeight: 500,
            fontSize: 31,
            color: "rgba(245,241,234,0.85)",
            letterSpacing: "0.08em",
            opacity: line2Opacity,
            transform: `translateY(${line2Lift}px)`,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            lineHeight: 1.3,
          }}
        >
          找到与你共鸣的人,一起把脑子里那件事做出来。
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          height: 84,
          overflow: "hidden",
          opacity: scrollerOpacity,
          pointerEvents: "none",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          style={{
            transform: `translateX(${scrollerX}px)`,
            whiteSpace: "nowrap",
            display: "inline-block",
            fontFamily: theme.fonts.sans,
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            paddingLeft: "0.45em",
            lineHeight: "84px",
            textShadow: "0 2px 10px rgba(0,0,0,0.55)",
          }}
        >
          PKU&nbsp;&nbsp;&middot;&nbsp;&nbsp;TSINGHUA&nbsp;&nbsp;&middot;&nbsp;&nbsp;COLUMBIA&nbsp;&nbsp;&middot;&nbsp;&nbsp;HKU&nbsp;&nbsp;&middot;&nbsp;&nbsp;YALE&nbsp;&nbsp;&middot;&nbsp;&nbsp;NUS
        </div>
      </div>
    </AbsoluteFill>
  );
};
