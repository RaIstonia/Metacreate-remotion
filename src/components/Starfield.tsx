// src/components/Starfield.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, random } from 'remotion';
import { COLORS } from '../utils/tokens';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: 'far' | 'mid' | 'near';
}

interface StarfieldProps {
  count?: number;
  parallaxOffset?: number;  // 视差偏移(由父组件传入)
  seed?: string;
}

export const Starfield: React.FC<StarfieldProps> = ({
  count = 200,
  parallaxOffset = 0,
  seed = 'starfield-default',
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 关键:用 useMemo + remotion random 保证星星位置稳定
  const stars = useMemo<Star[]>(() => {
    const arr: Star[] = [];
    for (let i = 0; i < count; i++) {
      const r = random(`${seed}-${i}`);
      const r2 = random(`${seed}-${i}-2`);
      const r3 = random(`${seed}-${i}-3`);
      const r4 = random(`${seed}-${i}-4`);

      // 分层:90% 远景暗星,8% 中景,2% 近景亮星
      let layer: Star['layer'];
      let size: number;
      let baseOpacity: number;
      if (r < 0.9) {
        layer = 'far';
        size = 1;
        baseOpacity = 0.15 + r2 * 0.2;
      } else if (r < 0.98) {
        layer = 'mid';
        size = 1.5;
        baseOpacity = 0.4 + r2 * 0.3;
      } else {
        layer = 'near';
        size = 2;
        baseOpacity = 0.7 + r2 * 0.3;
      }

      arr.push({
        x: r2 * width,
        y: r3 * height,
        size,
        baseOpacity,
        twinkleSpeed: 1 + r4 * 3,        // 1–4 秒一周期
        twinklePhase: r * Math.PI * 2,   // 错峰起始相位
        layer,
      });
    }
    return arr;
  }, [count, width, height, seed]);

  return (
    <AbsoluteFill style={{ background: COLORS.bgDeep, pointerEvents: 'none' }}>
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', inset: 0 }}
      >
        {stars.map((star, i) => {
          // 视差:不同层走不同速度
          const parallaxFactor =
            star.layer === 'far' ? 0.3 :
            star.layer === 'mid' ? 0.6 : 1.0;
          const px = star.x + parallaxOffset * parallaxFactor;

          // 闪烁(只对中近景星星生效,远景静态保留质感)
          let opacity = star.baseOpacity;
          if (star.layer !== 'far') {
            const t = (frame / fps) / star.twinkleSpeed + star.twinklePhase;
            const twinkle = (Math.sin(t * Math.PI * 2) + 1) / 2; // 0–1
            opacity = star.baseOpacity * (0.5 + 0.5 * twinkle);
          }

          const color =
            star.layer === 'far' ? COLORS.starDim :
            star.layer === 'mid' ? COLORS.starMid : COLORS.starBright;

          return (
            <circle
              key={i}
              cx={px % width}
              cy={star.y}
              r={star.size}
              fill={color}
              opacity={opacity}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
