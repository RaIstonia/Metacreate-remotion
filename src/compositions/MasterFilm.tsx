import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Series,
  staticFile,
  useVideoConfig,
} from "remotion";
import { BrandIntro } from "./BrandIntro";
import { FindYourselfScene } from "./FindYourselfScene";
import { ConnectScene } from "./ConnectScene";
import { CoCreateScene } from "./CoCreateScene";
import { BrandOutro } from "./BrandOutro";
import { theme } from "../theme";

export const MASTER_FPS = 30;

export const INTRO_DURATION = 240;
export const ACT1_DURATION = 456;
export const ACT2_DURATION = 414;
export const ACT3_DURATION = 498;
export const OUTRO_DURATION = 262;

export const MASTER_DURATION =
  INTRO_DURATION +
  ACT1_DURATION +
  ACT2_DURATION +
  ACT3_DURATION +
  OUTRO_DURATION;

const SoundTrack: React.FC = () => {
  const { fps } = useVideoConfig();
  const F = (sec: number) => Math.round(sec * fps);

  return (
    <>
      <Audio
        src={staticFile("audio/bgm.mp3")}
        startFrom={F(0)}
        endAt={F(62.4)}
        volume={(frame) => {
          const base = 0.5;

          if (frame < F(0.6)) {
            return (frame / F(0.6)) * base;
          }

          if (frame >= F(54.5)) {
            const t = (frame - F(54.5)) / (F(62.4) - F(54.5));
            return Math.max(0, base * (1 - t));
          }

          if (frame >= F(46.5) && frame < F(47.5)) {
            const t = (frame - F(46.5)) / (F(47.5) - F(46.5));
            return base * (1 - t * 0.3);
          }
          if (frame >= F(47.5) && frame < F(49.5)) {
            const t = (frame - F(47.5)) / (F(49.5) - F(47.5));
            return base * (0.7 + t * 0.3);
          }

          return base;
        }}
      />

      <Sequence from={F(0.5)} durationInFrames={F(2)}>
        <Audio src={staticFile("audio/flame-whoosh.mp3")} volume={0.7} />
      </Sequence>

      <Sequence from={F(22.5)} durationInFrames={F(1.5)}>
        <Audio src={staticFile("audio/cinematic-whoosh.mp3")} volume={0.4} />
      </Sequence>

      <Sequence from={F(36.3)} durationInFrames={F(1.5)}>
        <Audio src={staticFile("audio/cinematic-whoosh.mp3")} volume={0.4} />
      </Sequence>

      <Sequence from={F(45.5)} durationInFrames={F(2.5)}>
        <Audio src={staticFile("audio/riser.mp3")} volume={0.65} />
      </Sequence>

      <Sequence from={F(47.5)} durationInFrames={F(2.5)}>
        <Audio src={staticFile("audio/impact-boom.mp3")} volume={0.2} />
      </Sequence>

      <Sequence from={F(56.5)} durationInFrames={F(2.5)}>
        <Audio src={staticFile("audio/flame-whoosh.mp3")} volume={0.45} />
      </Sequence>
    </>
  );
};

export const MasterFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: theme.colors.voidBlack }}>
    <Series>
      <Series.Sequence durationInFrames={INTRO_DURATION}>
        <BrandIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={ACT1_DURATION}>
        <FindYourselfScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={ACT2_DURATION}>
        <ConnectScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={ACT3_DURATION}>
        <CoCreateScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={OUTRO_DURATION}>
        <BrandOutro />
      </Series.Sequence>
    </Series>

    <SoundTrack />
  </AbsoluteFill>
);
