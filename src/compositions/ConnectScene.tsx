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

const QUERY = "3D modeler · 北京";

const SEARCH_START = 24;
const SEARCH_ZOOM_IN_END = 48;
const QUERY_TYPE_START = 50;
const QUERY_TYPE_END = 92;
const ZOOM_OUT_START = 100;
const ZOOM_OUT_END = 124;
const FILTERS_START = 118;
const SIDE_LABELS_START = 110;
const CARDS_START = 134;
const LIST_HOLD_END = 222;
const LIST_FADE_END = 244;

const SWIPE_START = 244;
const SLIDE_TITLE_START = 264;
const FAN_OUT_START = 296;
const FAN_OUT_END = 326;
const TOP_SLIDE_START = 326;
const TOP_SLIDE_END = 360;

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
  {
    name: "Sofia Reyes",
    role: { zh: "梦想家", en: "Visionary" },
    manifesto: "空间是慢的算法,在边角写诗。",
    buildingTitle: "Spatial Poetry: 装置叙事实验",
    skills: ["空间装置", "Storytelling", "Blender"],
    lookingFor: ["协作者"],
    school: "CAFA",
    city: "北京",
    matchScore: 78,
    initials: "SR",
    avatarHue: 280,
    coverHue: 320,
  },
];

const typeQuery = (frame: number) => {
  const perChar = (QUERY_TYPE_END - QUERY_TYPE_START) / QUERY.length;
  const charsRevealed = Math.max(
    0,
    Math.min(QUERY.length, Math.floor((frame - QUERY_TYPE_START) / perChar))
  );
  return QUERY.slice(0, charsRevealed);
};

const VerticalSideTitle: React.FC<{
  text: string;
  en: string;
  startFrame: number;
  exitFrame: number;
  position: "left-upper" | "right-lower";
}> = ({ text, en, startFrame, exitFrame, position }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const chars = [...text];

  if (frame > exitFrame || frame < startFrame - 6) return null;

  const enter = interpolate(local, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(frame, [exitFrame - 14, exitFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = enter * exit;

  const baseStyle: React.CSSProperties =
    position === "left-upper"
      ? {
          position: "absolute",
          left: 160,
          top: "32%",
          transform: "translateY(-50%)",
          alignItems: "flex-start",
        }
      : {
          position: "absolute",
          right: 160,
          top: "68%",
          transform: "translateY(-50%)",
          alignItems: "flex-end",
        };

  return (
    <div
      style={{
        ...baseStyle,
        display: "flex",
        flexDirection: "column",
        opacity,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: position === "left-upper" ? "flex-start" : "flex-end",
          gap: 4,
        }}
      >
        {chars.map((ch, i) => {
          const charStart = i * 8;
          const charO = interpolate(local, [charStart, charStart + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const charLift = interpolate(
            local,
            [charStart, charStart + 18],
            [16, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          return (
            <span
              key={i}
              style={{
                fontFamily: theme.fonts.songti,
                fontWeight: 700,
                fontSize: 110,
                lineHeight: 1,
                color: "rgba(255,255,255,0.96)",
                opacity: charO,
                transform: `translateY(${charLift}px)`,
                textShadow: "0 4px 24px rgba(0,0,0,0.55)",
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: theme.fonts.sans,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          paddingLeft: position === "left-upper" ? "0.4em" : 0,
        }}
      >
        {en}
      </div>
    </div>
  );
};

const SwipeTitle: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const text = "滑动发现";
  const chars = [...text];
  const enRevealStart = chars.length * 8 + 8;
  const enO = interpolate(local, [enRevealStart, enRevealStart + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 110,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.songti,
          fontWeight: 700,
          fontSize: 100,
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1,
          display: "flex",
          gap: 10,
          textShadow: "0 4px 24px rgba(0,0,0,0.55)",
        }}
      >
        {chars.map((ch, i) => {
          const charStart = i * 8;
          const charO = interpolate(local, [charStart, charStart + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <span
              key={i}
              style={{ opacity: charO, display: "inline-block" }}
            >
              {ch}
            </span>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.sans,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(255,165,89,0.78)",
          opacity: enO,
          paddingLeft: "0.5em",
        }}
      >
        SWIPE TO MEET
      </div>
    </div>
  );
};

export const ConnectScene: React.FC = () => {
  const frame = useCurrentFrame();

  const listOpacity = interpolate(
    frame,
    [SEARCH_START - 4, SEARCH_START + 12, LIST_HOLD_END, LIST_FADE_END],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const searchScale = interpolate(
    frame,
    [SEARCH_START, SEARCH_ZOOM_IN_END, QUERY_TYPE_END + 4, ZOOM_OUT_END],
    [0.55, 1.45, 1.45, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const searchOpacity = interpolate(
    frame,
    [SEARCH_START, SEARCH_START + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const searchTopPx = interpolate(
    frame,
    [ZOOM_OUT_START, ZOOM_OUT_END],
    [540, 168],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const queryText = typeQuery(frame);
  const cursorOn =
    frame > QUERY_TYPE_START - 4 &&
    frame < QUERY_TYPE_END + 8 &&
    Math.floor(frame / 8) % 2 === 0;

  const filters = [
    {
      label: "角色: 建造者",
      visible: interpolate(
        frame,
        [FILTERS_START, FILTERS_START + 14],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      ),
    },
    {
      label: "技能: Blender",
      visible: interpolate(
        frame,
        [FILTERS_START + 6, FILTERS_START + 20],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      ),
    },
    {
      label: "可参与",
      visible: interpolate(
        frame,
        [FILTERS_START + 12, FILTERS_START + 26],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      ),
    },
  ];

  const cards = CREATORS.map((c, i) => {
    const slideStart = CARDS_START + i * 14;
    const slideOpacity = interpolate(
      frame,
      [slideStart, slideStart + 22],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const slideLift = interpolate(
      frame,
      [slideStart, slideStart + 26],
      [44, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const scoreReveal = interpolate(
      frame,
      [slideStart + 18, slideStart + 56],
      [0, 1],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic),
      }
    );
    const scorePulse = interpolate(
      frame,
      [slideStart + 50, slideStart + 60, slideStart + 80],
      [0, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { creator: c, slideOpacity, slideLift, scoreReveal, scorePulse };
  });

  const swipeOpacity = interpolate(
    frame,
    [SWIPE_START, SWIPE_START + 18, 366, 384],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const fanProgress = interpolate(
    frame,
    [FAN_OUT_START, FAN_OUT_END],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const topDragX = interpolate(
    frame,
    [TOP_SLIDE_START, TOP_SLIDE_END],
    [0, 1920],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );
  const topRotation = interpolate(
    frame,
    [TOP_SLIDE_START, TOP_SLIDE_END],
    [0, 28],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
      }}
    >
      <ActOpener
        en="Connect."
        emberWord="Connect"
        zh="连接同路人"
        index={1}
      />

      <AbsoluteFill style={{ opacity: listOpacity }}>
        <VerticalSideTitle
          text="搜索"
          en="DISCOVER"
          startFrame={SIDE_LABELS_START}
          exitFrame={LIST_FADE_END}
          position="left-upper"
        />
        <VerticalSideTitle
          text="匹配"
          en="MATCH"
          startFrame={SIDE_LABELS_START + 26}
          exitFrame={LIST_FADE_END}
          position="right-lower"
        />

        <div
          style={{
            position: "absolute",
            top: searchTopPx,
            left: "50%",
            transform: `translate(-50%, -50%) scale(${searchScale})`,
            opacity: searchOpacity,
            transformOrigin: "center center",
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
                transform: `translateY(${c.slideLift}px) scale(${
                  1 + c.scorePulse * 0.025
                })`,
                filter:
                  c.scorePulse > 0
                    ? `drop-shadow(0 0 ${c.scorePulse * 22}px rgba(255,107,53,${c.scorePulse * 0.45}))`
                    : "none",
              }}
            >
              <CreatorCardMock
                creator={c.creator}
                scoreReveal={c.scoreReveal}
                width={520}
              />
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          opacity: swipeOpacity,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SwipeTitle startFrame={SLIDE_TITLE_START} />

        <div
          style={{
            position: "relative",
            width: 420,
            height: 580,
            marginTop: 40,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${-32 * fanProgress}px, ${-14 * fanProgress}px) rotate(${-12 * fanProgress}deg)`,
              transformOrigin: "center bottom",
              zIndex: 1,
            }}
          >
            <SwipeCard
              profile={SWIPE_PROFILES[2]}
              dragX={0}
              rotation={0}
              scale={0.92}
              translateY={0}
              zIndex={1}
              isTop={false}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate(${-16 * fanProgress}px, ${-7 * fanProgress}px) rotate(${-6 * fanProgress}deg)`,
              transformOrigin: "center bottom",
              zIndex: 2,
            }}
          >
            <SwipeCard
              profile={SWIPE_PROFILES[1]}
              dragX={0}
              rotation={0}
              scale={0.96}
              translateY={0}
              zIndex={2}
              isTop={false}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
            }}
          >
            <SwipeCard
              profile={SWIPE_PROFILES[0]}
              dragX={topDragX}
              rotation={topRotation}
              scale={1}
              translateY={0}
              zIndex={3}
              isTop={true}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
