import React from "react";
import { theme } from "../theme";

export const Wordmark: React.FC<{
  opacity?: number;
  showTagline?: boolean;
  taglineOpacity?: number;
  size?: "lg" | "xl";
}> = ({ opacity = 1, showTagline = false, taglineOpacity = 0, size = "lg" }) => {
  const titleSize = size === "xl" ? 88 : 68;
  return (
    <div
      style={{
        textAlign: "center",
        color: theme.colors.starlight,
        fontFamily: theme.fonts.sans,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: titleSize,
          fontWeight: 200,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        MetaCreate
      </div>
      {showTagline && (
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            fontFamily: theme.fonts.serif,
            fontStyle: "italic",
            letterSpacing: "0.04em",
            opacity: taglineOpacity,
            color: `${theme.colors.starlight}cc`,
          }}
        >
          From Meta-Point, To Infinite Possibilities.
        </div>
      )}
    </div>
  );
};
