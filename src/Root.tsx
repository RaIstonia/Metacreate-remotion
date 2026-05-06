import React from "react";
import { Composition } from "remotion";
import { BrandIntro } from "./compositions/BrandIntro";
import { BrandOutro } from "./compositions/BrandOutro";
import { ManifestoScene } from "./compositions/ManifestoScene";
import { SearchMatchScene } from "./compositions/SearchMatchScene";
import { FindYourselfScene } from "./compositions/FindYourselfScene";
import { ConnectScene } from "./compositions/ConnectScene";
import { CoCreateScene } from "./compositions/CoCreateScene";
import { MasterFilm, MASTER_DURATION, MASTER_FPS } from "./compositions/MasterFilm";

export const Root: React.FC = () => (
  <>
    <Composition
      id="BrandIntro"
      component={BrandIntro}
      durationInFrames={192}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="ManifestoScene"
      component={ManifestoScene}
      durationInFrames={288}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="SearchMatchScene"
      component={SearchMatchScene}
      durationInFrames={288}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="FindYourselfScene"
      component={FindYourselfScene}
      durationInFrames={456}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="ConnectScene"
      component={ConnectScene}
      durationInFrames={384}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="CoCreateScene"
      component={CoCreateScene}
      durationInFrames={528}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="BrandOutro"
      component={BrandOutro}
      durationInFrames={150}
      fps={24}
      width={1920}
      height={1080}
    />
    <Composition
      id="MasterFilm"
      component={MasterFilm}
      durationInFrames={MASTER_DURATION}
      fps={MASTER_FPS}
      width={1920}
      height={1080}
    />
  </>
);
