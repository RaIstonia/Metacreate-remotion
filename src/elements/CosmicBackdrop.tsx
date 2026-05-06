import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

const SEED = 17;
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + SEED) * 43758.5453;
  return x - Math.floor(x);
};

type Star = { x: number; y: number; size: number; phase: number };
const STARS: Star[] = Array.from({ length: 70 }).map((_, i) => ({
  x: rand(i * 2) * 1920,
  y: rand(i * 2 + 1) * 1080,
  size: rand(i * 3) * 1.6 + 0.5,
  phase: rand(i * 4) * 10,
}));

const PLANETS = [
  {
    cx: 280,
    cy: 760,
    r: 220,
    grad: ["#1E3A8A", "#0A0E27"],
    rim: "rgba(255,107,53,0.35)",
    blur: 1,
  },
  {
    cx: 1700,
    cy: 220,
    r: 160,
    grad: ["#4C1D95", "#1E1B4B"],
    rim: "rgba(196,174,237,0.3)",
    blur: 1,
  },
  {
    cx: 1820,
    cy: 950,
    r: 320,
    grad: ["#7C2D12", "#0A0E27"],
    rim: "rgba(255,165,89,0.25)",
    blur: 2,
  },
];

export const CosmicBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 50%, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
      }}
    >
      {STARS.map((s, i) => {
        const twinkle = 0.4 + Math.sin(frame * 0.05 + s.phase) * 0.25;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: theme.colors.starlight,
              opacity: twinkle,
              boxShadow: `0 0 ${s.size * 4}px ${theme.colors.starlight}aa`,
            }}
          />
        );
      })}

      {PLANETS.map((p, i) => {
        const drift = Math.sin(frame * 0.012 + i * 2) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.cx - p.r,
              top: p.cy - p.r + drift,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${p.grad[0]} 0%, ${p.grad[1]} 70%)`,
              boxShadow: `inset -${p.r * 0.15}px -${p.r * 0.15}px ${p.r * 0.5}px rgba(0,0,0,0.6), 0 0 ${p.r * 0.4}px ${p.rim}`,
              filter: `blur(${p.blur}px)`,
              opacity: 0.85,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(2,4,16,0.55) 80%)`,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
