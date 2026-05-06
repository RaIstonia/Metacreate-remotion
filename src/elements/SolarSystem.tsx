import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Planet = {
  x: number;
  size: number;
  hue: number;
  hue2: number;
  ring?: boolean;
  ringTilt?: number;
};

const PLANETS: Planet[] = [
  { x: -480, size: 24, hue: 35, hue2: 60, ring: false },
  { x: -370, size: 38, hue: 285, hue2: 320, ring: false },
  { x: -240, size: 56, hue: 200, hue2: 240, ring: true, ringTilt: -8 },
  { x: -50, size: 100, hue: 150, hue2: 280, ring: true, ringTilt: 12 },
  { x: 130, size: 48, hue: 95, hue2: 180, ring: true, ringTilt: -6 },
  { x: 250, size: 30, hue: 220, hue2: 280, ring: false },
  { x: 340, size: 36, hue: 50, hue2: 30, ring: false },
  { x: 430, size: 24, hue: 305, hue2: 340, ring: false },
];

const STAR_SEED = 7;
const starRand = (i: number) => {
  const x = Math.sin(i * 12.9898 + STAR_SEED) * 43758.5453;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 50 }).map((_, i) => ({
  x: starRand(i * 2) * 1280 - 640,
  y: starRand(i * 2 + 1) * 240 - 80,
  size: starRand(i * 3) * 1.4 + 0.4,
  phase: starRand(i * 4) * 10,
}));

export const SolarSystem: React.FC<{
  width?: number;
  height?: number;
}> = ({ width = 1280, height = 220 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: width / 2,
          top: height / 2,
          width: 0,
          height: 0,
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
                opacity: twinkle * 0.7,
                boxShadow: `0 0 ${s.size * 3}px ${theme.colors.starlight}88`,
              }}
            />
          );
        })}

        {PLANETS.map((p, i) => {
          const drift = Math.sin(frame * 0.013 + i * 1.3) * 4;
          const ringRotate = frame * 0.05 + i * 30;
          return (
            <React.Fragment key={i}>
              {p.ring && (
                <div
                  style={{
                    position: "absolute",
                    left: p.x - p.size * 1.4,
                    top: p.size * 0.32 + drift - p.size * 0.05,
                    width: p.size * 2.8,
                    height: p.size * 0.5,
                    border: `1.2px solid hsla(${p.hue2}, 50%, 60%, 0.32)`,
                    borderRadius: "50%",
                    transform: `rotate(${(p.ringTilt ?? 0) + Math.sin(ringRotate * 0.01) * 2}deg)`,
                    pointerEvents: "none",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  left: p.x - p.size / 2,
                  top: -p.size / 2 + drift,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 30% 30%, hsl(${p.hue}, 55%, 55%) 0%, hsl(${p.hue2}, 45%, 30%) 70%)`,
                  boxShadow: `inset -${p.size * 0.18}px -${p.size * 0.18}px ${p.size * 0.4}px rgba(0,0,0,0.55), 0 0 ${p.size * 0.4}px hsla(${p.hue}, 60%, 50%, 0.25)`,
                }}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
