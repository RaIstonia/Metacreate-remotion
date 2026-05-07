import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const MetaFire: React.FC<{
  scale?: number;
  glow?: number;
}> = ({ scale = 1, glow = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const breath = Math.sin((frame / fps) * 2 * Math.PI * 0.4) * 0.025 + 1;
  const finalScale = scale * breath;

  return (
    <div
      style={{
        transform: `scale(${finalScale})`,
        filter: `drop-shadow(0 0 ${40 * glow}px ${theme.colors.ember}aa) drop-shadow(0 0 ${140 * glow}px ${theme.colors.emberWarm}55)`,
      }}
    >
      <svg width="280" height="402" viewBox="0 0 117 168" fill="none">
        <path
          d="M58.5 167.7C26.1913 167.7 0 141.508 0 109.2C0 92.4004 7.08131 77.2551 18.422 66.5855C28.8914 56.7352 54.6 38.9962 50.7 0C97.5 31.2 120.9 62.4 74.1 109.2C81.9 109.2 93.6 109.2 113.1 89.9309C115.204 95.965 117 102.449 117 109.2C117 141.508 90.8084 167.7 58.5 167.7Z"
          fill="url(#mfGrad)"
        />
        <path
          d="M69.3066 134.397C71.8035 132.516 73.7631 129.96 74.915 127C77.4364 128.957 79.5843 131.371 81.2354 134.119C79.5047 136.999 77.2292 139.515 74.5488 141.52C73.4741 138.691 71.6453 136.235 69.3066 134.397ZM37 134.119C38.651 131.371 40.7998 128.957 43.3213 127C44.4731 129.96 46.4322 132.516 48.9287 134.397C46.5904 136.235 44.7621 138.692 43.6875 141.52C41.0071 139.515 38.7307 136.999 37 134.119Z"
          fill="#000"
        />
        <defs>
          <linearGradient
            id="mfGrad"
            x1="58.5"
            y1="0"
            x2="58.5"
            y2="167.7"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={theme.colors.emberCool} />
            <stop offset="1" stopColor={theme.colors.emberWarm} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
