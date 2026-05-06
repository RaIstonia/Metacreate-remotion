import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { ActOpener } from "../elements/ActOpener";
import { SearchBar } from "../elements/SearchBar";
import {
  CreatorCardMock,
  type CreatorMock,
} from "../elements/CreatorCardMock";
import { SwipeCard, type SwipeProfile } from "../elements/SwipeCard";
import { CosmicBackdrop } from "../elements/CosmicBackdrop";
import { SolarSystem } from "../elements/SolarSystem";
import { FeatureLabel } from "../elements/FeatureLabel";

const QUERY = "3D modeler · 北京";

const CREATORS: CreatorMock[] = [
  {
    name: "Yuki Tanaka",
    subtitle: "建造者 · 北京 · Tsinghua",
    initials: "YT",
    avatarHue: 30,
    skills: ["Blender", "Three.js", "生成式 AI"],
    tag: "Sci-Fi-Architect",
    matchScore: 94,
    works: [
      { title: "Algorithmic Dreamweaving", hue: 280 },
      { title: "Generative Nebula Demo", hue: 220 },
    ],
  },
  {
    name: "Sofia Reyes",
    subtitle: "梦想家 · 北京 · CAFA",
    initials: "SR",
    avatarHue: 200,
    skills: ["空间设计", "Blender", "Storytelling"],
    tag: "Quiet-Worldbuilder",
    matchScore: 88,
    works: [
      { title: "Spatial Poetry", hue: 320 },
      { title: "Ink Meets Code", hue: 100 },
    ],
  },
  {
    name: "Arjun Mehta",
    subtitle: "策略家 · Remote · NYU",
    initials: "AM",
    avatarHue: 280,
    skills: ["3D Modeling", "产品策略", "Unity"],
    tag: "Marathon-Runner",
    matchScore: 81,
    works: [
      { title: "DMV Sprint Redesign", hue: 30 },
      { title: "Public Feedback Box", hue: 200 },
    ],
  },
];

const SWIPE_PROFILES: SwipeProfile[] = [
  {
    name: "Lily Shi",
    role: { zh: "梦想家", en: "Visionary" },
    manifesto: "A city is a slow algorithm. Let's rewrite a few lines.",
    buildingTitle: "City as Code: 参数化公共空间生成器",
    skills: ["Architecture", "Rhino + Grasshopper", "Spatial Design"],
    lookingFor: ["协作者"],
    school: "Suzhou University",
    city: "Suzhou",
    matchScore: 44,
    initials: "LS",
    avatarHue: 30,
    coverHue: 200,
  },
  {
    name: "Yuki Tanaka",
    role: { zh: "建造者", en: "Builder" },
    manifesto: "我把想象做成可以摸到的东西。",
    buildingTitle: "Generative Nebula: 实时交互星云",
    skills: ["Blender", "Three.js", "WebGL"],
    lookingFor: ["声音设计", "策展人"],
    school: "Tsinghua",
    city: "北京",
    matchScore: 92,
    initials: "YT",
    avatarHue: 0,
    coverHue: 280,
  },
];

const typeQuery = (frame: number) => {
  const start = 48;
  const perChar = 2.4;
  const charsRevealed = Math.max(
    0,
    Math.min(QUERY.length, Math.floor((frame - start) / perChar))
  );
  return QUERY.slice(0, charsRevealed);
};

export const ConnectScene: React.FC = () => {
  const frame = useCurrentFrame();

  const listOpacity = interpolate(frame, [36, 60, 156, 180], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const listScale = interpolate(frame, [156, 180], [1, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const searchOpacity = interpolate(frame, [38, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const searchLift = interpolate(frame, [38, 60], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const queryText = typeQuery(frame);
  const cursorOn = frame > 48 && frame < 130 && Math.floor(frame / 8) % 2 === 0;

  const filters = [
    { label: "角色: 建造者", visible: interpolate(frame, [82, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
    { label: "技能: Blender", visible: interpolate(frame, [92, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
    { label: "可参与", visible: interpolate(frame, [102, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) },
  ];

  const cards = CREATORS.map((c, i) => {
    const slideStart = 70 + i * 14;
    const slideOpacity = interpolate(frame, [slideStart, slideStart + 24], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const slideLift = interpolate(frame, [slideStart, slideStart + 28], [40, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    const scoreReveal = interpolate(frame, [slideStart + 18, slideStart + 50], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    return { creator: c, slideOpacity, slideLift, scoreReveal };
  });

  const swipeOpacity = interpolate(frame, [168, 198, 364, 384], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const swipeScale = interpolate(frame, [168, 198], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const cosmicOpacity = interpolate(frame, [156, 198, 364, 384], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const solarOpacity = interpolate(frame, [180, 220, 364, 384], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const solarLift = interpolate(frame, [180, 220], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const dragX = interpolate(
    frame,
    [266, 300, 312, 332],
    [0, 90, 110, 1920 * 1.6],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const cardRotation = dragX * 0.08;
  const isFlying = frame > 312;

  const nextScale = interpolate(frame, [310, 340], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const nextTranslateY = interpolate(frame, [310, 340], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const transitionFlash = interpolate(frame, [156, 174, 192], [0, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: cosmicOpacity }}>
        <CosmicBackdrop />
      </div>

      <ActOpener
        en="Connect."
        emberWord="Connect"
        zh="连接同路人"
        index={1}
      />

      <FeatureLabel
        zh="搜索 · 匹配"
        en="DISCOVER"
        startFrame={50}
        duration={86}
      />

      <FeatureLabel
        zh="快速发现"
        en="SWIPE TO MEET"
        startFrame={196}
        duration={88}
      />

      <AbsoluteFill
        style={{
          opacity: listOpacity,
          transform: `scale(${listScale})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 130,
            left: "50%",
            transform: `translate(-50%, ${searchLift}px)`,
            opacity: searchOpacity,
          }}
        >
          <SearchBar
            query={queryText}
            showCursor={cursorOn}
            filters={filters}
            width={760}
          />
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
                opacity: c.slideOpacity,
                transform: `translateY(${c.slideLift}px)`,
              }}
            >
              <CreatorCardMock
                creator={c.creator}
                scoreReveal={c.scoreReveal}
                width={500}
              />
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: swipeOpacity,
          transform: `scale(${swipeScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            opacity: solarOpacity,
            transform: `translateY(${solarLift}px)`,
            pointerEvents: "none",
            flexShrink: 0,
          }}
        >
          <SolarSystem width={1280} height={220} />
        </div>

        <div
          style={{
            position: "relative",
            width: 420,
            height: 580,
            flexShrink: 0,
          }}
        >
          <SwipeCard
            profile={SWIPE_PROFILES[1]}
            scale={nextScale}
            translateY={nextTranslateY}
            zIndex={0}
            isTop={false}
          />
          <SwipeCard
            profile={SWIPE_PROFILES[0]}
            dragX={dragX}
            rotation={isFlying ? 30 : cardRotation}
            scale={1}
            translateY={0}
            zIndex={1}
            isTop={true}
          />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, transparent 0%, ${theme.colors.ember}40 50%, transparent 100%)`,
          opacity: transitionFlash,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
