import { Language } from "@/components/linking-game/game-body";

export type WordPair = {
  eng: string;
  fr: string;
};

export type Answer = Record<Language, string>;