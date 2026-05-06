import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";
import { Starfield } from "../elements/Starfield";
import { Wordmark } from "../elements/Wordmark";
import { EmberParticles } from "../elements/EmberParticles";

const FlameBodyPath: React.FC<{
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
  withEyes?: boolean;
  flicker?: number;
}> = ({ scaleX = 1, scaleY = 1, opacity = 1, withEyes = false, flicker = 0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.18) * flicker;
  const breath = Math.sin(frame * 0.08) * 0.015 * flicker;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scaleX * (1 + breath)}, ${scaleY * (1 - breath)}) skewX(${sway}deg)`,
        transformOrigin: "center bottom",
        filter: `drop-shadow(0 0 ${30 + flicker * 20}px ${theme.colors.ember}aa) drop-shadow(0 0 ${100 + flicker * 40}px ${theme.colors.emberWarm}55)`,
      }}
    >
      <svg width="280" height="402" viewBox="0 0 117 168" fill="none">
        <path
          d="M58.5 167.7C26.1913 167.7 0 141.508 0 109.2C0 92.4004 7.08131 77.2551 18.422 66.5855C28.8914 56.7352 54.6 38.9962 50.7 0C97.5 31.2 120.9 62.4 74.1 109.2C81.9 109.2 93.6 109.2 113.1 89.9309C115.204 95.965 117 102.449 117 109.2C117 141.508 90.8084 167.7 58.5 167.7Z"
          fill="url(#mfBrandGrad)"
        />
        {withEyes && (
          <path
            d="M69.3066 134.397C71.8035 132.516 73.7631 129.96 74.915 127C77.4364 128.957 79.5843 131.371 81.2354 134.119C79.5047 136.999 77.2292 139.515 74.5488 141.52C73.4741 138.691 71.6453 136.235 69.3066 134.397ZM37 134.119C38.651 131.371 40.7998 128.957 43.3213 127C44.4731 129.96 46.4322 132.516 48.9287 134.397C46.5904 136.235 44.7621 138.692 43.6875 141.52C41.0071 139.515 38.7307 136.999 37 134.119Z"
            fill="#000"
          />
        )}
        <defs>
          <linearGradient
            id="mfBrandGrad"
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

export const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotOpacity = interpolate(frame, [0, 12, 22], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotSize = interpolate(frame, [0, 18], [1, 5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotFade = interpolate(frame, [22, 34], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pillarHeight = interpolate(frame, [18, 48], [0, 36], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pillarOpacity = interpolate(frame, [16, 26, 56, 64], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillarSway = Math.sin(frame * 0.22) * 4;

  const abstractScaleX = interpolate(frame, [48, 96], [0.05, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const abstractScaleY = interpolate(frame, [48, 96], [0.42, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const abstractOpacity = interpolate(frame, [44, 60, 110, 124], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const abstractFlicker = interpolate(frame, [48, 96, 124], [1, 0.6, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalOpacity = interpolate(frame, [108, 132], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const finalScale = interpolate(frame, [108, 144], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const eyesPop = spring({
    frame: frame - 132,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
    durationInFrames: 18,
  });

  const particleIntensity = interpolate(frame, [40, 60, 156, 180], [0, 1, 1, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const starExpand = interpolate(frame, [120, 168], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const wordmarkOpacity = interpolate(frame, [144, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const radialBg = `radial-gradient(circle at center, ${theme.colors.voidDeep} 0%, ${theme.colors.voidBlack} 80%)`;

  const FLAME_BASE_Y = 0;

  return (
    <AbsoluteFill style={{ background: radialBg }}>
      <Starfield expandProgress={starExpand} />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            backgroundColor: theme.colors.ember,
            opacity: dotOpacity * dotFade,
            boxShadow: `0 0 24px ${theme.colors.ember}, 0 0 60px ${theme.colors.emberWarm}aa, 0 0 140px ${theme.colors.emberWarm}55`,
            transform: `translateY(${FLAME_BASE_Y}px)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 3,
            height: pillarHeight,
            background: `linear-gradient(180deg, ${theme.colors.emberCool} 0%, ${theme.colors.emberWarm} 100%)`,
            opacity: pillarOpacity,
            borderRadius: 3,
            transformOrigin: "bottom center",
            transform: `translateY(${FLAME_BASE_Y - pillarHeight / 2}px) skewX(${pillarSway}deg)`,
            boxShadow: `0 0 20px ${theme.colors.ember}cc, 0 0 60px ${theme.colors.emberWarm}88`,
          }}
        />

        <div
          style={{
            position: "absolute",
            opacity: abstractOpacity,
            transform: `translateY(${FLAME_BASE_Y - 100}px)`,
          }}
        >
          <FlameBodyPath
            scaleX={abstractScaleX}
            scaleY={abstractScaleY}
            withEyes={false}
            flicker={abstractFlicker}
          />
        </div>

        <div
          style={{
            position: "absolute",
            opacity: finalOpacity,
            transform: `translateY(${FLAME_BASE_Y - 100}px) scale(${finalScale})`,
          }}
        >
          <FlameBodyPath
            scaleX={1}
            scaleY={1}
            withEyes={false}
            flicker={0.3}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: eyesPop,
              transform: `scale(${0.9 + eyesPop * 0.1})`,
              transformOrigin: "center 134px",
            }}
          >
            <svg width="280" height="402" viewBox="0 0 117 168" fill="none">
              <path
                d="M69.3066 134.397C71.8035 132.516 73.7631 129.96 74.915 127C77.4364 128.957 79.5843 131.371 81.2354 134.119C79.5047 136.999 77.2292 139.515 74.5488 141.52C73.4741 138.691 71.6453 136.235 69.3066 134.397ZM37 134.119C38.651 131.371 40.7998 128.957 43.3213 127C44.4731 129.96 46.4322 132.516 48.9287 134.397C46.5904 136.235 44.7621 138.692 43.6875 141.52C41.0071 139.515 38.7307 136.999 37 134.119Z"
                fill="#000"
              />
            </svg>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
          }}
        >
          <EmberParticles
            count={12}
            centerX={0}
            centerY={-FLAME_BASE_Y - 80}
            startFrame={36}
            intensity={particleIntensity}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 140,
        }}
      >
        <Wordmark opacity={wordmarkOpacity} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
