import React from "react";
import { theme } from "../theme";

export const SearchBar: React.FC<{
  query: string;
  showCursor: boolean;
  width?: number;
  filters?: Array<{ label: string; visible: number }>;
}> = ({ query, showCursor, width = 720, filters = [] }) => (
  <div style={{ width, display: "flex", flexDirection: "column", gap: 14 }}>
    <div
      style={{
        height: 56,
        padding: "0 22px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        backdropFilter: "blur(12px)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke={`${theme.colors.starlight}80`}
          strokeWidth="1.5"
        />
        <path
          d="M20 20L16.5 16.5"
          stroke={`${theme.colors.starlight}80`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          flex: 1,
          color: theme.colors.starlight,
          fontFamily: theme.fonts.sans,
          fontSize: 17,
          letterSpacing: "0.005em",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>{query}</span>
        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 22,
              backgroundColor: theme.colors.ember,
              marginLeft: 2,
              opacity: 0.9,
            }}
          />
        )}
        {!query && (
          <span style={{ color: "rgba(168,180,224,0.4)" }}>
            Search for creators…
          </span>
        )}
      </div>
    </div>

    {filters.length > 0 && (
      <div style={{ display: "flex", gap: 8 }}>
        {filters.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "7px 14px",
              borderRadius: 999,
              background: "rgba(255,107,53,0.12)",
              border: "1px solid rgba(255,107,53,0.35)",
              color: "#FFA559",
              fontFamily: theme.fonts.sans,
              fontSize: 12.5,
              fontWeight: 500,
              opacity: f.visible,
              transform: `translateY(${(1 - f.visible) * 8}px)`,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ opacity: 0.6 }}>×</span>
            {f.label}
          </div>
        ))}
      </div>
    )}
  </div>
);
