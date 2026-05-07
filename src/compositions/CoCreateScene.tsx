import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { ActOpener } from "../elements/ActOpener";
import { PostsGrid } from "../elements/PostsGrid";
import { WorksWaterfall } from "../elements/WorksWaterfall";

type StageWindow = {
  enterStart: number;
  enterEnd: number;
  exitStart?: number;
  exitEnd?: number;
};

const STAGE1: StageWindow = {
  enterStart: 36,
  enterEnd: 60,
  exitStart: 130,
  exitEnd: 146,
};
const STAGE2: StageWindow = {
  enterStart: 130,
  enterEnd: 154,
  exitStart: 210,
  exitEnd: 226,
};
const STAGE3: StageWindow = { enterStart: 210, enterEnd: 234 };

const SCENE_FADE_START = 438;
const SCENE_FADE_END = 454;

const animSlideX = (frame: number, w: StageWindow) => {
  const ease = Easing.inOut(Easing.cubic);
  const x =
    w.exitStart !== undefined && w.exitEnd !== undefined
      ? interpolate(
          frame,
          [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
          [1920, 0, 0, -1920],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }
        )
      : interpolate(frame, [w.enterStart, w.enterEnd], [1920, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
  return { transform: `translateX(${x}px)` };
};

const animSlideY = (frame: number, w: StageWindow) => {
  const ease = Easing.inOut(Easing.cubic);
  const y =
    w.exitStart !== undefined && w.exitEnd !== undefined
      ? interpolate(
          frame,
          [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
          [1080, 0, 0, -1080],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }
        )
      : interpolate(frame, [w.enterStart, w.enterEnd], [1080, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ease,
        });
  return { transform: `translateY(${y}px)` };
};

const PostsTagline: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const segments = [
    { text: "想法", isEmber: false },
    { text: "作品", isEmber: false },
    { text: "活动", isEmber: false },
    { text: "都在这里", isEmber: true },
  ];
  const capsO = interpolate(local, [56, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
        {segments.map((seg, i) => {
          const charStart = i * 12;
          const o = interpolate(local, [charStart, charStart + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const lift = interpolate(
            local,
            [charStart, charStart + 22],
            [12, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            }
          );
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <span
                  style={{
                    fontFamily: theme.fonts.songti,
                    fontSize: 30,
                    color: "rgba(255,255,255,0.35)",
                    opacity: o,
                  }}
                >
                  ·
                </span>
              )}
              <span
                style={{
                  fontFamily: theme.fonts.songti,
                  fontWeight: seg.isEmber ? 700 : 600,
                  fontSize: seg.isEmber ? 38 : 34,
                  color: seg.isEmber
                    ? theme.colors.ember
                    : "rgba(255,255,255,0.95)",
                  letterSpacing: "0.06em",
                  opacity: o,
                  transform: `translateY(${lift}px)`,
                  textShadow: seg.isEmber
                    ? `0 0 22px ${theme.colors.ember}aa`
                    : "0 4px 16px rgba(0,0,0,0.5)",
                  lineHeight: 1,
                }}
              >
                {seg.text}
              </span>
            </React.Fragment>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: theme.fonts.sans,
          fontWeight: 600,
          fontSize: 11,
          color: "rgba(255,165,89,0.62)",
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          paddingLeft: "0.5em",
          opacity: capsO,
        }}
      >
        Ideas · Works · Events · All Here
      </div>
    </div>
  );
};

const WorksTagline: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const items = [
    { text: "发布作品", isEmber: false },
    { text: "加入活动", isEmber: false },
    { text: "被对的人看见", isEmber: true },
  ];
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 100,
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 28,
        pointerEvents: "none",
      }}
    >
      {items.map((item, i) => {
        const itemStart = i * 16;
        const o = interpolate(local, [itemStart, itemStart + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const x = interpolate(local, [itemStart, itemStart + 26], [-32, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: o,
              transform: `translateX(${x}px)`,
            }}
          >
            <span
              style={{
                width: item.isEmber ? 28 : 14,
                height: 1.5,
                background: item.isEmber
                  ? theme.colors.ember
                  : "rgba(255,255,255,0.4)",
                boxShadow: item.isEmber
                  ? `0 0 8px ${theme.colors.ember}`
                  : "none",
              }}
            />
            <span
              style={{
                fontFamily: theme.fonts.songti,
                fontWeight: item.isEmber ? 700 : 500,
                fontSize: item.isEmber ? 32 : 26,
                color: item.isEmber
                  ? theme.colors.ember
                  : "rgba(255,255,255,0.92)",
                letterSpacing: "0.08em",
                textShadow: item.isEmber
                  ? `0 0 22px ${theme.colors.ember}aa`
                  : "0 4px 16px rgba(0,0,0,0.5)",
                lineHeight: 1,
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const SandwichTitle: React.FC<{
  topText: string;
  bottomText: string;
  en: string;
  startFrame: number;
}> = ({ topText, bottomText, en, startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const topO = interpolate(local, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const bottomO = interpolate(local, [16, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const enO = interpolate(local, [30, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const topLift = interpolate(local, [4, 24], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const bottomLift = interpolate(local, [16, 38], [-18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const titleStyle: React.CSSProperties = {
    fontFamily: theme.fonts.songti,
    fontWeight: 700,
    fontSize: 110,
    color: "rgba(255,255,255,0.96)",
    lineHeight: 1,
    textShadow: "0 4px 24px rgba(0,0,0,0.55)",
    letterSpacing: "0.04em",
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            ...titleStyle,
            opacity: topO,
            transform: `translateY(${topLift}px)`,
          }}
        >
          {topText}
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
          {en}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            ...titleStyle,
            opacity: bottomO,
            transform: `translateY(${bottomLift}px)`,
          }}
        >
          {bottomText}
        </div>
      </div>
    </>
  );
};

const PLANETS = [
  {
    dx: -580,
    dy: -280,
    color: "#4A6FA5",
    glow: "rgba(74,111,165,0.55)",
    zh: "工程",
    en: "ENGINEERING",
  },
  {
    dx: 580,
    dy: -280,
    color: "#8B5A8C",
    glow: "rgba(139,90,140,0.55)",
    zh: "设计",
    en: "DESIGN",
  },
  {
    dx: -580,
    dy: 280,
    color: "#5A9080",
    glow: "rgba(90,144,128,0.55)",
    zh: "科学",
    en: "SCIENCE",
  },
  {
    dx: 580,
    dy: 280,
    color: "#D4823A",
    glow: "rgba(212,130,58,0.65)",
    zh: "艺术",
    en: "ART",
  },
];

const HackathonFinale: React.FC<{ stageEnter: number }> = ({ stageEnter }) => {
  const frame = useCurrentFrame();
  const local = frame - stageEnter;
  const cx = 1920 / 2;
  const cy = 1080 / 2;

  const PLANET_EMERGE = 0;
  const BADGE_APPEAR = 12;
  const BEAM_CONVERGE_START = 36;
  const BEAM_CONVERGE_END = 48;
  const BURST_START = 46;
  const BURST_PEAK = 54;
  const BURST_END = 64;
  const HACK_TITLE = 48;
  const HACK_CAPS = 72;
  const DATE_CHIP = 60;
  const MAIN_TITLE = 72;
  const SUB_TITLE = 92;
  const BREATH_END = 132;
  const EXIT_START = 132;
  const SILENCE_START = 144;
  const CTA_SHOW = 152;
  const END = 204;

  const hackathonExitO = interpolate(
    local,
    [EXIT_START, SILENCE_START],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    }
  );

  const ctaO = interpolate(local, [CTA_SHOW, CTA_SHOW + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaTracking = interpolate(
    local,
    [CTA_SHOW, CTA_SHOW + 18],
    [0.6, 0.3],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const burstO = interpolate(
    local,
    [BURST_START, BURST_PEAK, BURST_END],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const burstScale = interpolate(local, [BURST_START, BURST_END], [0.4, 2.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const mainTitleO = interpolate(
    local,
    [MAIN_TITLE, MAIN_TITLE + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const mainTitleTracking = interpolate(
    local,
    [MAIN_TITLE, MAIN_TITLE + 24],
    [0.4, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <>
      <AbsoluteFill style={{ opacity: hackathonExitO, pointerEvents: "none" }}>
        {PLANETS.map((p, i) => {
          const enterStart = PLANET_EMERGE + i * 4;
          const enterEnd = enterStart + 24;
          const popScale = interpolate(local, [enterStart, enterEnd], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const posProg = popScale;
          const px = cx + p.dx * posProg;
          const py = cy + p.dy * posProg;
          const t = local / 24;
          const ambientPulse = 0.85 + 0.15 * Math.sin(t * Math.PI * 0.7 + i);
          const rotation = (t / 6) * 360 * (i % 2 ? -1 : 1);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px - 44,
                top: py - 44,
                width: 88,
                height: 88,
                transform: `scale(${popScale})`,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -36,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${p.glow}, transparent 70%)`,
                  opacity: ambientPulse * 0.6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), ${p.color} 38%, ${p.color}cc 70%, ${p.color}55 100%)`,
                  boxShadow: `0 0 32px ${p.glow}, 0 0 72px ${p.glow}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -16,
                  borderRadius: "50%",
                  border: `0.5px solid ${p.color}aa`,
                  opacity: 0.4,
                  transform: `rotate(${rotation}deg) skewY(${
                    50 * Math.sin(t * 0.4)
                  }deg)`,
                }}
              />
            </div>
          );
        })}

        {PLANETS.map((p, i) => {
          const enterStart = BADGE_APPEAR + i * 3;
          const px = cx + p.dx;
          const py = cy + p.dy;
          const badgeO = interpolate(
            local,
            [enterStart, enterStart + 14],
            [0, 0.92],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={`badge-${i}`}
              style={{
                position: "absolute",
                left: px,
                top: py + 68,
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: badgeO,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: theme.fonts.songti,
                  fontWeight: 700,
                  fontSize: 22,
                  color: "rgba(255,255,255,0.94)",
                  letterSpacing: "0.04em",
                  marginBottom: 6,
                  textShadow: `0 0 12px ${p.color}cc, 0 2px 12px rgba(0,0,0,0.6)`,
                  lineHeight: 1,
                }}
              >
                {p.zh}
              </div>
              <div
                style={{
                  fontFamily: theme.fonts.sans,
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: p.color,
                  paddingLeft: "0.42em",
                  lineHeight: 1,
                }}
              >
                {p.en}
              </div>
            </div>
          );
        })}

        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {PLANETS.map((p, i) => {
            const beamProg = interpolate(
              local,
              [BEAM_CONVERGE_START, BEAM_CONVERGE_END],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );
            const beamO = interpolate(
              local,
              [
                BEAM_CONVERGE_START,
                BEAM_CONVERGE_START + 6,
                BEAM_CONVERGE_END - 4,
                BURST_END,
              ],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const x1 = cx + p.dx;
            const y1 = cy + p.dy;
            const x2 = cx + p.dx * (1 - beamProg);
            const y2 = cy + p.dy * (1 - beamProg);
            return (
              <line
                key={`beam-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={p.color}
                strokeWidth={1.0}
                opacity={beamO * 0.85}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            left: cx - 80,
            top: cy - 80,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,180,136,0.5) 30%, transparent 65%)",
            opacity: burstO,
            transform: `scale(${burstScale})`,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 280,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              fontFamily: theme.fonts.songti,
              fontWeight: 700,
              fontSize: 96,
              color: "rgba(255,255,255,0.96)",
              lineHeight: 1,
              textShadow:
                "0 0 32px rgba(255,176,136,0.4), 0 4px 22px rgba(0,0,0,0.55)",
              letterSpacing: "0.04em",
            }}
          >
            {[..."黑客松"].map((ch, i) => {
              const charStart = HACK_TITLE + i * 8;
              const o = interpolate(
                local,
                [charStart, charStart + 18],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const blur = interpolate(
                local,
                [charStart, charStart + 14],
                [12, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const scale = interpolate(
                local,
                [charStart, charStart + 20],
                [0.6, 1],
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
                    display: "inline-block",
                    opacity: o,
                    filter: `blur(${blur}px)`,
                    transform: `scale(${scale})`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.5em",
              fontFamily: theme.fonts.sans,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(168,180,224,0.65)",
              paddingLeft: "0.5em",
            }}
          >
            {[..."HACKATHON"].map((c, i) => {
              const charStart = HACK_CAPS + i * 2;
              const o = interpolate(
                local,
                [charStart, charStart + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <span key={i} style={{ opacity: o }}>
                  {c}
                </span>
              );
            })}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 460,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(
              local,
              [DATE_CHIP, DATE_CHIP + 18],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              fontFamily: theme.fonts.sans,
              fontSize: 12,
              fontWeight: 500,
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.06em",
            }}
          >
            🗓 May 9–11, 2026 · Columbia + Remote
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 510,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: mainTitleO,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: theme.fonts.serif,
              fontWeight: 400,
              fontSize: 56,
              color: "rgba(245,241,234,0.94)",
              letterSpacing: `${mainTitleTracking}em`,
              textShadow: "0 4px 16px rgba(0,0,0,0.4)",
              whiteSpace: "nowrap",
              maxWidth: 720,
            }}
          >
            Space Base Challenge 2026
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 590,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(
              local,
              [SUB_TITLE, SUB_TITLE + 18],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: theme.fonts.songti,
              fontStyle: "italic",
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(168,180,224,0.7)",
              letterSpacing: "0.3em",
              paddingLeft: "0.3em",
            }}
          >
            为下一个前沿而造
          </span>
        </div>
      </AbsoluteFill>

      {local >= CTA_SHOW && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            opacity: ctaO,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: theme.fonts.serif,
              fontWeight: 400,
              fontSize: 44,
              fontStyle: "italic",
              color: "rgba(245,241,234,0.96)",
              letterSpacing: `${ctaTracking}em`,
              textShadow: "0 0 24px rgba(255,176,136,0.25)",
            }}
          >
            Join the Constellation.
          </div>
          <div
            style={{
              fontFamily: theme.fonts.songti,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.4em",
              color: "rgba(168,180,224,0.65)",
            }}
          >
            加入这片星座
          </div>
        </AbsoluteFill>
      )}
    </>
  );
};

export const CoCreateScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneFade = interpolate(
    frame,
    [SCENE_FADE_START, SCENE_FADE_END],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const stage1Style = animSlideX(frame, STAGE1);
  const stage2Style = animSlideY(frame, STAGE2);
  const stage3Style = animSlideY(frame, STAGE3);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`,
        opacity: sceneFade,
      }}
    >
      <ActOpener
        en="Co-Create."
        emberWord="Co-Create"
        zh="共创可能"
        index={2}
      />

      <AbsoluteFill style={stage1Style}>
        <PostsTagline startFrame={STAGE1.enterStart + 12} />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "180px 60px 60px",
          }}
        >
          <PostsGrid startFrame={STAGE1.enterStart + 28} />
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={stage2Style}>
        <WorksTagline startFrame={STAGE2.enterStart + 12} />
        <AbsoluteFill
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <WorksWaterfall startFrame={STAGE2.enterStart + 24} />
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill style={stage3Style}>
        <HackathonFinale stageEnter={STAGE3.enterEnd} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
