import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const PersonalityTag: React.FC<{
  label: string;
  startFrame: number;
}> = ({ label, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - startFrame;
  if (local < -2) return null;

  const enterScale = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.6 },
    durationInFrames: 22,
  });
  const opacity = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const glowPulse =
    local > 0 ? Math.max(0, 1 - local / 30) : 0;

  return (
    <div
      style={{
        padding: "7px 16px",
        borderRadius: 9999,
        background: "rgba(132,94,194,0.20)",
        border: "1px solid rgba(132,94,194,0.40)",
        color: "#C4AEED",
        fontFamily: theme.fonts.sans,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.01em",
        opacity,
        transform: `scale(${0.85 + 0.15 * enterScale})`,
        boxShadow: `0 0 ${20 * glowPulse}px rgba(132,94,194,${0.5 * glowPulse})`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};
