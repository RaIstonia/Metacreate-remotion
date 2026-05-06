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
          d="M58.5 168C26 168 0 141 0 109C0 88 12 65 30 46C42 30 52 14 58.5 0C65 14 75 30 87 46C105 65 117 88 117 109C117 141 91 168 58.5 168Z"
          fill="url(#mfGrad)"
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
