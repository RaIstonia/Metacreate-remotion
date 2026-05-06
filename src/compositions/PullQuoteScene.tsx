import React from "react";
import { AbsoluteFill } from "remotion";
import { PullQuote } from "../elements/PullQuote";

export const PullQuote1: React.FC = () => (
  <AbsoluteFill>
    <PullQuote zh="你是谁?" en="WHO ARE YOU" duration={72} />
  </AbsoluteFill>
);

export const PullQuote2: React.FC = () => (
  <AbsoluteFill>
    <PullQuote zh="你不是一个人。" en="YOU ARE NOT ALONE" duration={72} />
  </AbsoluteFill>
);

export const PullQuote3: React.FC = () => (
  <AbsoluteFill>
    <PullQuote zh="一群人,是星座。" en="WE ARE A CONSTELLATION" duration={72} />
  </AbsoluteFill>
);
