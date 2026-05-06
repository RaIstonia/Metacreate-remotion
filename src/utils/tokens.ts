// src/utils/tokens.ts
// 单一设计来源 - 所有颜色/字号/间距/时间常量都从这里取

export const COLORS = {
  bgDeep: '#0A0E1A',          // 主背景
  bgElevated: '#131826',       // 面板背景
  bgGlass: 'rgba(19, 24, 38, 0.7)', // 玻璃面板

  accentPrimary: '#FF6B35',    // 火焰橙(关键品牌色,使用率必须 ≤15%)
  accentGlow: '#FFB088',       // 橙色高光
  accentDeep: '#3A1810',       // 深火焰红(暗处)

  textPrimary: '#F5F1EA',      // 主文字(暖白,严禁用 #FFFFFF)
  textSecondary: '#A8B5C8',    // 次文字
  textMuted: '#6B7280',        // 弱文字

  starDim: '#2A3548',          // 暗星(背景质感)
  starMid: '#5A6878',           // 中星
  starBright: '#A8B5C8',       // 亮星

  borderSubtle: 'rgba(255, 255, 255, 0.08)',
  borderHigh: 'rgba(255, 255, 255, 0.15)',
} as const;

export const FONTS = {
  display: '"Cormorant Garamond", "Source Han Serif SC", serif',  // 衬线 hero
  body: '"Inter", "Source Han Sans SC", system-ui, sans-serif',
  mono: '"JetBrains Mono", monospace',
  cnHeavy: '"Source Han Serif SC", "Songti SC", serif',
  cnSans: '"Source Han Sans SC", "PingFang SC", sans-serif',
} as const;

export const SIZES = {
  // 字号
  displayHero: 120,    // 主 hero 标题
  displayLarge: 96,    // 段落主标题
  displayMid: 80,      // 品牌字 METACREATE
  titleLarge: 48,
  titleMid: 32,
  bodyLarge: 22,
  bodyMid: 18,
  bodySmall: 14,
  caption: 12,

  // 间距(8 倍数)
  s1: 8,
  s2: 16,
  s3: 24,
  s4: 32,
  s5: 48,
  s6: 64,
  s7: 96,
  s8: 128,

  // 安全边距
  safeMargin: 96,
} as const;

// 时间常量
// 项目 fps 已确认为 24(Root.tsx 中所有 Composition 与 MasterFilm 的 MASTER_FPS 一致)
export const FPS = 24;
export const SECOND = FPS;

// 字间距(letter-spacing 的 em 值)
export const TRACKING = {
  tight: -0.02,
  normal: 0,
  wide: 0.04,
  display: 0.08,
  caps: 0.4,        // 全大写小字必须用这个间距,否则廉价
  capsWide: 0.5,
} as const;
