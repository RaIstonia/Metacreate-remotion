import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

type Post = {
  authorName: string;
  authorInitials: string;
  authorVariant: "flame" | "cosmos" | "violet";
  role: string;
  time: string;
  body: string;
  imageHue?: number;
  imageTitle?: string;
  likes: number;
  comments: number;
};

const AVATAR_GRAD: Record<string, string> = {
  flame: "linear-gradient(145deg, #FF6B35 0%, #FFA559 100%)",
  cosmos: "linear-gradient(145deg, #0A0E27 0%, #1E2A5E 100%)",
  violet: "linear-gradient(145deg, #1E2A5E 0%, #845EC2 100%)",
};
const AVATAR_TEXT: Record<string, string> = {
  flame: "rgba(255,255,255,0.95)",
  cosmos: "#A8B4E0",
  violet: "#C4AEED",
};

const POSTS: Post[] = [
  {
    authorName: "Yuki Tanaka",
    authorInitials: "YT",
    authorVariant: "flame",
    role: "建造者",
    time: "2 小时前",
    body: "刚把生成式星云的交互层搭好了 — 现在它能跟着鼠标节奏\"呼吸\"。下一步想找个搞声音设计的伙伴一起做沉浸版。",
    imageHue: 280,
    imageTitle: "Generative Nebula · 交互预览",
    likes: 47,
    comments: 8,
  },
  {
    authorName: "Sofia Reyes",
    authorInitials: "SR",
    authorVariant: "violet",
    role: "梦想家",
    time: "5 小时前",
    body: "今天去了 798 看到一个闲置的工业空间,想把它变成一个临时的\"创作者驿站\"。有没有人对策展感兴趣?",
    likes: 23,
    comments: 12,
  },
  {
    authorName: "Arjun Mehta",
    authorInitials: "AM",
    authorVariant: "cosmos",
    role: "策略家",
    time: "1 天前",
    body: "如果你正在做 0-1 项目,推荐花 30 分钟写一个一页纸的\"产品假设\"。不是 PRD,只是把你最不确定的那个问题写出来。",
    likes: 89,
    comments: 24,
  },
];

const PostCard: React.FC<{ post: Post; startFrame: number }> = ({ post, startFrame }) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [startFrame, startFrame + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lift = interpolate(frame, [startFrame, startFrame + 26], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: 18,
        background:
          "linear-gradient(180deg, rgba(25,76,178,0.10) 0%, rgba(255,107,53,0.06) 100%), rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        opacity: enter,
        transform: `translateY(${lift}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: AVATAR_GRAD[post.authorVariant],
            color: AVATAR_TEXT[post.authorVariant],
            fontFamily: theme.fonts.sans,
            fontWeight: 600,
            fontSize: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {post.authorInitials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <div
              style={{
                color: "white",
                fontFamily: theme.fonts.sans,
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              {post.authorName}
            </div>
            <div
              style={{
                color: "#FFA559",
                fontFamily: theme.fonts.sans,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {post.role}
            </div>
          </div>
          <div
            style={{
              color: "rgba(168,180,224,0.5)",
              fontFamily: theme.fonts.sans,
              fontSize: 10.5,
              marginTop: 1,
            }}
          >
            {post.time}
          </div>
        </div>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.84)",
          fontFamily: theme.fonts.sans,
          fontSize: 12.5,
          lineHeight: 1.55,
        }}
      >
        {post.body}
      </div>

      {post.imageHue !== undefined && (
        <div
          style={{
            height: 140,
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            background: `linear-gradient(135deg, hsl(${post.imageHue}, 42%, 38%) 0%, hsl(${(post.imageHue + 30) % 360}, 36%, 22%) 100%)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 30% 40%, hsl(${post.imageHue}, 65%, 55%, 0.4) 0%, transparent 60%)`,
            }}
          />
          {post.imageTitle && (
            <div
              style={{
                position: "absolute",
                left: 12,
                bottom: 10,
                color: "rgba(255,255,255,0.78)",
                fontFamily: theme.fonts.sans,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              {post.imageTitle}
            </div>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginTop: 2,
          color: "rgba(168,180,224,0.55)",
          fontFamily: theme.fonts.sans,
          fontSize: 11.5,
        }}
      >
        <span>♡ {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span style={{ marginLeft: "auto", color: "#FFA559" }}>分享</span>
      </div>
    </div>
  );
};

export const PostsFeed: React.FC<{
  startFrame?: number;
  width?: number;
}> = ({ startFrame = 0, width = 540 }) => {
  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingBottom: 4,
          color: "rgba(168,180,224,0.6)",
          fontFamily: theme.fonts.sans,
          fontSize: 12,
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ color: "#FFA559", fontWeight: 600 }}>动态</span>
        <span>作品</span>
        <span>招募</span>
        <span style={{ marginLeft: "auto" }}>📡 实时</span>
      </div>
      {POSTS.map((p, i) => (
        <PostCard key={i} post={p} startFrame={startFrame + i * 12} />
      ))}
    </div>
  );
};
