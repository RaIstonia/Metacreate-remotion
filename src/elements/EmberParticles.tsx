import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

const SEED = 33;
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + SEED) * 43758.5453;
  return x - Math.floor(x);
};

type Particle = {
  spawnDelay: number;
  cycle: number;
  startXOffset: number;
  driftX: number;
  riseY: number;
  size: number;
  hueShift: number;
};

const buildParticles = (count: number): Particle[] =>
  Array.from({ length: count }).map((_, i) => ({
    spawnDelay: Math.floor(rand(i * 2) * 60),
    cycle: 60 + Math.floor(rand(i * 3) * 40),
    startXOffset: (rand(i * 5) - 0.5) * 14,
    driftX: (rand(i * 7) - 0.5) * 50,
    riseY: 90 + rand(i * 11) * 70,
    size: 2 + rand(i * 13) * 3,
    hueShift: rand(i * 17),
  }));

export const EmberParticles: React.FC<{
  count?: number;
  centerX?: number;
  centerY?: number;
  startFrame?: number;
  intensity?: number;
}> = ({
  count = 10,
  centerX = 0,
  centerY = 0,
  startFrame = 0,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const particles = React.useMemo(() => buildParticles(count), [count]);
  const local = frame - startFrame;
  if (local < 0 || intensity <= 0) return null;

  return (
    <>
      {particles.map((p, i) => {
        const t = ((local - p.spawnDelay) % p.cycle + p.cycle) % p.cycle;
        if (local < p.spawnDelay) return null;
        const progress = t / p.cycle;
        const yOffset = -progress * p.riseY;
        const xOffset =
          p.startXOffset + Math.sin(progress * Math.PI * 1.2) * p.driftX * 0.3;
        const opacity =
          progress < 0.15
            ? progress / 0.15
            : progress > 0.7
              ? Math.max(0, 1 - (progress - 0.7) / 0.3)
              : 1;
        const color = p.hueShift > 0.5 ? theme.colors.ember : theme.colors.emberWarm;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: centerX + xOffset,
              top: centerY + yOffset,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: opacity * intensity,
              boxShadow: `0 0 ${p.size * 4}px ${color}cc, 0 0 ${p.size * 10}px ${color}66`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};
