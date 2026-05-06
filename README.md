# MetaCreate Promo Film — Remotion

v13 brand promo,1710 帧 / 71.25s @ 24fps,5 段叙事弧。

## 渲染最终版(4K)

```bash
cd remotion
npm install
npm run render:final
```

输出:`out/metacreate-promo-v13-final-4k.mp4`,3840×2160,~40 MB,~7 分钟(双核并发)。

---

## 前置要求

| 工具 | 版本 |
|---|---|
| Node.js | ≥ 18(本仓库测试在 v20.20) |
| npm | 随 Node 自带 |
| Chromium | Remotion 自动下载,无需手动装 |

首次 `npm install` 会同时安装 Remotion 内置的 Chromium(~150 MB),需要时间。

---

## 渲染脚本

| 命令 | 输出 | 用途 |
|---|---|---|
| `npm run studio` | n/a(开发用) | 启动 Remotion Studio,浏览器调试 |
| `npm run render:final` | `out/metacreate-promo-v13-final-4k.mp4` | **4K 最终版**(`--scale=2 --jpeg-quality=100 --crf=14`) |
| `npm run render:master` | `out/metacreate-promo.mp4` | 1080p 快测,默认参数 |
| `npm run render:intro` | `out/brand-intro.mp4` | 单段:BrandIntro(8s) |
| `npm run render:findyourself` | `out/act1-findyourself.mp4` | 单段:Find Yourself(19s) |
| `npm run render:connect` | `out/act2-connect.mp4` | 单段:Connect(16s) |
| `npm run render:cocreate` | `out/act3-cocreate.mp4` | 单段:Co-Create(22s) |
| `npm run render:outro` | `out/brand-outro.mp4` | 单段:BrandOutro(6.25s) |

### 参数解释

`render:final` 使用 `npx remotion render` 加 3 个 flag:

- `--scale=2` — Chromium 以 2× DPR 渲染,1920×1080 composition 输出 3840×2160
- `--jpeg-quality=100` — 渲染中间帧用最高质量 JPEG(默认 80)
- `--crf=14` — H.264 Constant Rate Factor,**低=高质量**(默认 18,我们用 14 接近无损)

---

## Composition 结构

| ID | durationInFrames | fps | 分辨率 | 文件 |
|---|---|---|---|---|
| BrandIntro | 192 | 24 | 1920×1080 | `src/compositions/BrandIntro.tsx` |
| FindYourselfScene | 456 | 24 | 1920×1080 | `src/compositions/FindYourselfScene.tsx` |
| ConnectScene | 384 | 24 | 1920×1080 | `src/compositions/ConnectScene.tsx` |
| CoCreateScene | 528 | 24 | 1920×1080 | `src/compositions/CoCreateScene.tsx` |
| BrandOutro | 150 | 24 | 1920×1080 | `src/compositions/BrandOutro.tsx` |
| **MasterFilm** | **1710** | **24** | **1920×1080** | `src/compositions/MasterFilm.tsx`(以上 5 段串接) |

外加 `ManifestoScene` 和 `SearchMatchScene` 两个独立注册的 Composition,**不在 MasterFilm 里**,仅供单独渲染调试。

### 时间常量来源

`src/compositions/MasterFilm.tsx` 集中导出所有段时长,改动单段时长**必须**同步:
- 该段 Composition 的 `durationInFrames` (`src/Root.tsx`)
- `MasterFilm.tsx` 的对应 `INTRO_DURATION` / `ACT1_DURATION` / `ACT2_DURATION` / `ACT3_DURATION` / `OUTRO_DURATION`

否则 master 会拼错时间窗。

---

## 文件树

```
remotion/
├── package.json
├── remotion.config.ts        # JPEG 默认 / 并发 2 / 覆盖输出
├── tsconfig.json
└── src/
    ├── index.ts              # registerRoot
    ├── Root.tsx              # 注册 8 个 Composition
    ├── theme.ts              # 颜色 + 字体(含 songti fallback)
    ├── compositions/
    │   ├── MasterFilm.tsx    # 5 段 Series.Sequence 串接
    │   ├── BrandIntro.tsx    # 火苗成 logo + 燃烧特效
    │   ├── FindYourselfScene.tsx  # AI 教练分屏 + 用户说明书
    │   ├── ConnectScene.tsx       # 搜索 + 候选 + 扇形 swipe
    │   ├── CoCreateScene.tsx      # 4 stage:队伍 / 帖子 / 瀑布 / 黑客松收束
    │   ├── BrandOutro.tsx         # 火苗散成星座 + wordmark
    │   ├── ManifestoScene.tsx     # (独立,不在 master)
    │   ├── SearchMatchScene.tsx   # (独立,不在 master)
    │   └── PullQuoteScene.tsx     # (3 个金句 PullQuote 包装)
    └── elements/             # Scene 用到的可复用积木
        ├── ActOpener.tsx     # 段首 hero/角标双形态
        ├── AICoachCard.tsx   # 对话气泡面板(含光标点击)
        ├── CommunityGrid.tsx
        ├── CosmicBackdrop.tsx
        ├── CommunityMasonry.tsx
        ├── CreatorCardMock.tsx
        ├── EmberParticles.tsx
        ├── EventTracks.tsx
        ├── FeatureLabel.tsx  # 段内副标(含 animateChars 开关)
        ├── ManualSection.tsx # 用户说明书内容块(含 chips)
        ├── MetaFire.tsx      # 单尖泪滴火苗 SVG
        ├── MetaFireBubble.tsx
        ├── PersonalityTag.tsx
        ├── PostsFeed.tsx
        ├── PostsGrid.tsx     # 3×3 网格,内置帖子/动态标题
        ├── ProfileHeader.tsx
        ├── PullQuote.tsx
        ├── RoleCard.tsx
        ├── SearchBar.tsx
        ├── SolarSystem.tsx   # (act2 老星图,新版 swipe 段已不用)
        ├── Starfield.tsx     # BrandIntro 的扩散星点
        ├── SwipeCard.tsx
        ├── TeamCardMock.tsx
        ├── TeamRow.tsx       # 3 张队伍卡横排
        ├── TypewriterPanel.tsx  # 右侧打字机面板(含 subtitleDelay)
        ├── Wordmark.tsx      # MetaCreate 品牌字
        ├── WorksColumns.tsx
        └── WorksWaterfall.tsx   # 双列流动 + 中心垂排标题
```

---

## 修改与重渲

### 调整单段长度

例:把 BrandIntro 从 8s 改到 10s(192f → 240f):

1. `src/Root.tsx` → `BrandIntro` Composition 的 `durationInFrames` 改 `240`
2. `src/compositions/MasterFilm.tsx` → `INTRO_DURATION` 改 `240`
3. `src/compositions/BrandIntro.tsx` 内部 timeline 节点根据需要重排

不改 (1) 会让 master 串接出错;不改 (2) 会让 master 该段时间窗不对应;不改 (3) 内容只会延展空白尾部。

### Studio 调试

```bash
npm run studio
```

打开 `http://localhost:3000`,左栏选 Composition,可拖动时间轴定位每帧;改代码热更新。

---

## 性能 / 输出参考

在双核并发(`remotion.config.ts` 里 `Config.setConcurrency(2)`)下:

| 命令 | 帧数 | 实测渲染时长 | 输出大小 |
|---|---|---|---|
| `render:final`(4K) | 1710 | ~7 min | 40 MB |
| `render:master`(1080p) | 1710 | ~3-4 min | ~10 MB |
| `render:cocreate`(单段 1080p) | 528 | ~1-2 min | ~3 MB |

更高并发可在 `remotion.config.ts` 调 `setConcurrency`,但 4K 渲染会显著吃内存。

---

## 已知约束

- 字体走系统 fallback(`theme.fonts.songti` 解析顺序:Source Han Serif → Songti SC → Noto Serif CJK)。不同机器渲染,Chinese 衬线可能轻微不同,在 macOS / Ubuntu 下经测试视觉接近。
- BrandOutro 的 `MetaFire` 与 BrandIntro 的 `FlameBodyPath` 共用同一 SVG path(`elements/MetaFire.tsx`),改路径需同步两处。
- ACT3 的 `HackathonFinale` 是 inline 子组件(在 `CoCreateScene.tsx` 内),时间锚点全部相对 `STAGE4.enterEnd = 308`(在 scene 帧坐标里 = 308)展开。
