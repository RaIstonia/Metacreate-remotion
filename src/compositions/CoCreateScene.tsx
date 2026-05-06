import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { theme } from "../theme";
import { ActOpener } from "../elements/ActOpener";
import { TeamCardMock } from "../elements/TeamCardMock";
import { EventTracks } from "../elements/EventTracks";
import { PostsFeed } from "../elements/PostsFeed";
import { CommunityMasonry } from "../elements/CommunityMasonry";
import { FeatureLabel } from "../elements/FeatureLabel";

type StageWindow = {
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
};

const STAGE1: StageWindow = { enterStart: 36, enterEnd: 60, exitStart: 92, exitEnd: 108 };
const STAGE2: StageWindow = { enterStart: 92, enterEnd: 116, exitStart: 158, exitEnd: 174 };
const STAGE3: StageWindow = { enterStart: 158, enterEnd: 182, exitStart: 224, exitEnd: 240 };
const STAGE4: StageWindow = { enterStart: 224, enterEnd: 248, exitStart: 296, exitEnd: 312 };

const animA = (frame: number, w: StageWindow, exiting = true) => {
  const ease = Easing.inOut(Easing.cubic);
  const x = exiting
    ? interpolate(
        frame,
        [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
        [1920, 0, 0, -1920],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }
      )
    : interpolate(frame, [w.enterStart, w.enterEnd], [1920, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: ease,
      });
  return { transform: `translateX(${x}px)` };
};

const animB = (frame: number, w: StageWindow, exiting = true) => {
  const ease = Easing.inOut(Easing.cubic);
  const y = exiting
    ? interpolate(
        frame,
        [w.enterStart, w.enterEnd, w.exitStart, w.exitEnd],
        [1080, 0, 0, -1080],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease }
      )
    : interpolate(frame, [w.enterStart, w.enterEnd], [1080, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: ease,
      });
  return { transform: `translateY(${y}px)` };
};

export const CoCreateScene: React.FC = () => {
  const frame = useCurrentFrame();

  const sceneFade = interpolate(frame, [296, 312], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const teamScoreReveal = interpolate(frame, [50, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const teamCardEnter = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const teamCardLift = interpolate(frame, [40, 70], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const stage1Style = animA(frame, STAGE1);
  const stage2Style = animB(frame, STAGE2);
  const stage3Style = animA(frame, STAGE3);
  const stage4Style = animB(frame, STAGE4, false);

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

      <FeatureLabel
        zh="组队"
        en="FORM A TEAM"
        startFrame={48}
        duration={50}
      />
      <FeatureLabel
        zh="Hackathon"
        en="EVENTS"
        startFrame={114}
        duration={50}
      />
      <FeatureLabel
        zh="社区动态"
        en="COMMUNITY"
        startFrame={180}
        duration={50}
      />
      <FeatureLabel
        zh="作品瀑布"
        en="WORKS GALLERY"
        startFrame={246}
        duration={56}
      />

      <AbsoluteFill style={{ ...stage1Style, alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: teamCardEnter,
            transform: `translateY(${teamCardLift}px)`,
          }}
        >
          <TeamCardMock matchScore={87} scoreReveal={teamScoreReveal} width={620} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ ...stage2Style, alignItems: "center", justifyContent: "center" }}>
        <EventTracks startFrame={108} width={1180} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          ...stage3Style,
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 60px 60px",
        }}
      >
        <PostsFeed startFrame={172} width={620} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          ...stage4Style,
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 60px 60px",
        }}
      >
        <CommunityMasonry startFrame={238} width={780} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
