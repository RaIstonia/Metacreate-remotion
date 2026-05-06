import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";
import { SearchBar } from "../elements/SearchBar";
import { CreatorCardMock, type CreatorMock } from "../elements/CreatorCardMock";

const QUERY = "3D modeler · Beijing";

const CREATORS: CreatorMock[] = [
  {
    name: "Yuki Tanaka",
    subtitle: "Builder · Beijing · Tsinghua",
    initials: "YT",
    avatarHue: 30,
    skills: ["Blender", "Three.js", "Generative AI"],
    tag: "Sci-Fi-Architect",
    matchScore: 94,
  },
  {
    name: "Sofia Reyes",
    subtitle: "Visionary · Beijing · CAFA",
    initials: "SR",
    avatarHue: 200,
    skills: ["Spatial Design", "Blender", "Storytelling"],
    tag: "Quiet-Worldbuilder",
    matchScore: 88,
  },
  {
    name: "Arjun Mehta",
    subtitle: "Strategist · Remote · NYU",
    initials: "AM",
    avatarHue: 280,
    skills: ["3D Modeling", "Product Strategy", "Unity"],
    tag: "Marathon-Runner",
    matchScore: 81,
  },
];

const typeQuery = (frame: number) => {
  const start = 18;
  const perChar = 2.2;
  const charsRevealed = Math.max(
    0,
    Math.min(QUERY.length, Math.floor((frame - start) / perChar))
  );
  return QUERY.slice(0, charsRevealed);
};

export const SearchMatchScene: React.FC = () => {
  const frame = useCurrentFrame();

  const navOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const searchOpacity = interpolate(frame, [6, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const searchLift = interpolate(frame, [6, 24], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const queryText = typeQuery(frame);
  const cursorOn = frame > 18 && Math.floor(frame / 8) % 2 === 0;

  const filters = [
    { label: "Role: Builder", visible: interpolate(frame, [78, 96], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
    { label: "Skill: Blender", visible: interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
    { label: "Available", visible: interpolate(frame, [98, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
  ];

  const cards = CREATORS.map((c, i) => {
    const slideStart = 120 + i * 22;
    const slideOpacity = interpolate(
      frame,
      [slideStart, slideStart + 28],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const slideLift = interpolate(
      frame,
      [slideStart, slideStart + 32],
      [44, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const scoreReveal = interpolate(
      frame,
      [slideStart + 24, slideStart + 60],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const highlightStart = 234;
    const highlight =
      i === 0
        ? interpolate(frame, [highlightStart, highlightStart + 20, 280, 288], [0, 1, 1, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 0;
    const cardFadeOut = interpolate(frame, [276, 288], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { creator: c, slideOpacity, slideLift, scoreReveal, highlight, cardFadeOut };
  });

  const overlayOpacity = interpolate(frame, [220, 244, 270, 282], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 1200px 800px at 50% 30%, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: navOpacity,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            color: theme.colors.starlight,
            fontFamily: theme.fonts.sans,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          MetaCreate
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Explore", "Teams", "Events", "Me"].map((t, i) => (
            <div
              key={t}
              style={{
                color: i === 0 ? theme.colors.ember : "rgba(168,180,224,0.55)",
                fontFamily: theme.fonts.sans,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 130,
          left: "50%",
          transform: `translate(-50%, ${searchLift}px)`,
          opacity: searchOpacity,
        }}
      >
        <SearchBar query={queryText} showCursor={cursorOn} filters={filters} />
      </div>

      <div
        style={{
          position: "absolute",
          top: 320,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              opacity: c.slideOpacity * c.cardFadeOut,
              transform: `translateY(${c.slideLift}px)`,
            }}
          >
            <CreatorCardMock
              creator={c.creator}
              scoreReveal={c.scoreReveal}
              highlight={c.highlight}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 358,
          left: "50%",
          transform: "translateX(280px)",
          opacity: overlayOpacity,
          fontFamily: theme.fonts.sans,
          color: theme.colors.starlight,
          maxWidth: 280,
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(168,180,224,0.55)",
            marginBottom: 6,
          }}
        >
          Why 94%
        </div>
        <div
          style={{
            fontFamily: theme.fonts.serif,
            fontSize: 19,
            fontWeight: 300,
            lineHeight: 1.4,
            fontStyle: "italic",
            color: `${theme.colors.starlight}dd`,
          }}
        >
          Skills complement.
          <br />
          Roles complete each other.
        </div>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            fontSize: 11.5,
            color: "rgba(168,180,224,0.7)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Skill complement</span>
            <span style={{ color: theme.colors.ember }}>96 / 100</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Role complement</span>
            <span style={{ color: theme.colors.ember }}>100 / 100</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Interest overlap</span>
            <span style={{ color: theme.colors.ember }}>88 / 100</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
