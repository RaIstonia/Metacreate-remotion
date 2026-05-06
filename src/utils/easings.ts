// src/utils/easings.ts
// 高级感动画曲线集合

import { Easing } from 'remotion';

// Apple/Linear 标准曲线(必背)
export const EASE = {
  // Apple 主推:expo-out,适用于元素入场
  expoOut: Easing.bezier(0.16, 1, 0.3, 1),

  // 元素出场
  expoIn: Easing.bezier(0.7, 0, 0.84, 0),

  // 双向(缩放、淡入淡出)
  expoInOut: Easing.bezier(0.87, 0, 0.13, 1),

  // 柔和入场(对话气泡、卡片)
  softOut: Easing.bezier(0.22, 1, 0.36, 1),

  // 强力出场(转场)
  hardIn: Easing.bezier(0.64, 0, 0.78, 0),

  // 反弹入场(品牌瞬间)
  backOut: Easing.bezier(0.34, 1.56, 0.64, 1),

  // 极平缓(镜头推近、长时间运动)
  smoothInOut: Easing.bezier(0.45, 0, 0.55, 1),

  // 强烈拉锯(光扫、转场冲击)
  sharpOut: Easing.bezier(0.33, 1, 0.68, 1),
} as const;

// Spring 配置预设
export const SPRING = {
  // 弹性入场(标签、徽章)
  bouncy: { damping: 10, mass: 1, stiffness: 100 },

  // 柔和入场(气泡、卡片)
  soft: { damping: 14, mass: 1, stiffness: 80 },

  // 紧致(按钮、小元素)
  snappy: { damping: 18, mass: 0.8, stiffness: 120 },

  // 沉重(品牌字、大元素)
  heavy: { damping: 20, mass: 1.5, stiffness: 60 },
} as const;

// 通用 stagger 工具函数:计算第 i 个元素延迟出现
export const stagger = (i: number, gap: number = 4) => i * gap;
