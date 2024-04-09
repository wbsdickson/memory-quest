"use client";

import "@/styles/linking-game.scss";
import GameBar from "@/components/linking-game/game-bar";
import GameBody from "@/components/linking-game/game-body";
import { WordPair } from "@/lib/types";
import { useState } from "react";

const wordPairs: Array<WordPair> = [
  { eng: "Hello", fr: "Bonjour" },
  { eng: "Goodbye", fr: "Au revoir" },
  { eng: "Please", fr: "S'il vous plaît" },
  { eng: "Thank you", fr: "Merci" },
  { eng: "Yes", fr: "Oui" },
  { eng: "No", fr: "Non" },
  { eng: "Excuse me", fr: "Excusez-moi" },
  { eng: "Sorry", fr: "Désolé" }
];

export function Index() {
  const [answer, setAnswer] = useState<{ from: string; to: string }[]>([]);

  const resetAnswer = () => {
    setAnswer([]);
  };

  return (
    <>
      <GameBody answer={answer} setAnswer={setAnswer} wordPairs={wordPairs} />
      <GameBar answer={answer} resetAnswer={resetAnswer} />
    </>
  );
}
