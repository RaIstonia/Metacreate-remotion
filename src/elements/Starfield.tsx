import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../theme";

const SEED = 42;
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + SEED) * 43758.5453;
  return x - Math.floor(x);
};

type Star = {
  x: number;
  y: number;
  size: number;
  twinkle: number;
  delay: number;
};

const STARS: Star[] = Array.from({ length: 90 }).map((_, i) => ({
  x: rand(i * 2) * 1920,
  y: rand(i * 2 + 1) * 1080,
  size: rand(i * 3) * 1.8 + 0.6,
  twinkle: rand(i * 4) * 10,
  delay: Math.floor(rand(i * 5) * 24),
}));

export const Starfield: React.FC<{
  expandFrom?: { x: number; y: number };
  expandProgress: number;
}> = ({ expandFrom = { x: 960, y: 540 }, expandProgress }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {STARS.map((s, i) => {
        const visible = frame >= s.delay && expandProgress > 0;
        if (!visible) return null;
        const px = expandFrom.x + (s.x - expandFrom.x) * expandProgress;
        const py = expandFrom.y + (s.y - expandFrom.y) * expandProgress;
        const twinkle = 0.55 + Math.sin(frame * 0.06 + s.twinkle) * 0.25;
        const opacity = twinkle * Math.min(1, expandProgress * 1.4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              backgroundColor: theme.colors.starlight,
              opacity,
              boxShadow: `0 0 ${s.size * 5}px ${theme.colors.starlight}cc`,
            }}
          />
        );
      })}
    </div>
  );
};
