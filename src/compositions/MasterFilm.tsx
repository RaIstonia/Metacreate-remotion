import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { BrandIntro } from "./BrandIntro";
import { FindYourselfScene } from "./FindYourselfScene";
import { ConnectScene } from "./ConnectScene";
import { CoCreateScene } from "./CoCreateScene";
import { BrandOutro } from "./BrandOutro";
import { theme } from "../theme";

export const MASTER_FPS = 24;

export const INTRO_DURATION = 192;
export const ACT1_DURATION = 456;
export const ACT2_DURATION = 384;
export const ACT3_DURATION = 312;
export const OUTRO_DURATION = 150;

export const MASTER_DURATION =
  INTRO_DURATION +
  ACT1_DURATION +
  ACT2_DURATION +
  ACT3_DURATION +
  OUTRO_DURATION;

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
  </AbsoluteFill>
);
