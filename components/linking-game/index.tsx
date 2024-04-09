"use client";

import "@/styles/linking-game.scss";
import GameBar from "@/components/linking-game/game-bar";
import GameBody from "@/components/linking-game/game-body";
import { Answer, WordPair } from "@/lib/types";
import { useState } from "react";
import { delay, shuffleArray } from "@/lib/utils";

const wordPairs: Array<WordPair> = [
  { eng: "Hello", fr: "Bonjour" },
  { eng: "Goodbye", fr: "Au revoir" },
  { eng: "Please", fr: "S'il vous plaît" },
  { eng: "Thank you", fr: "Merci" },
  { eng: "Yes", fr: "Oui" },
  { eng: "No", fr: "Non" },
  { eng: "Excuse me", fr: "Excusez-moi" },
  { eng: "Sorry", fr: "Désolé" },
  { eng: "Bicycle", fr: "Vélo" },
  { eng: "Railroad", fr: "Chemin de fer" },
  { eng: "Folder", fr: "Dossier" },
  { eng: "Butter", fr: "Beurre" },
  { eng: "Cereal", fr: "Céréale" },
  { eng: "Hungry", fr: "Faim" },
  { eng: "Forest", fr: "Forêt" },
  { eng: "Camel", fr: "Chameau" },
  { eng: "Weekly", fr: "Hebdomadaire" },
  { eng: "Desk", fr: "Bureau" },
  { eng: "Sibling", fr: "Frère et sœur" },
  { eng: "Limestone", fr: "Calcaire" }
];


export function Index() {
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  const onResetAnswer = () => {
    setAnswers([]);
  };

  const onAutoFill = async () => {
    const pairsToAnswer = shuffleArray(wordPairs); // Shuffle wordPairs to get random order

    for (let index = 0; index < pairsToAnswer.length; index++) {
      setAnswers(prevAnswers => [...prevAnswers, {
        eng: pairsToAnswer[index].eng,
        fr: pairsToAnswer[index].fr
      }]);
      await delay(200);
    }
  };
  const onGrade = () => {
    let correctCount = 0;

    const correctMap = new Map(wordPairs.map(pair => [pair.eng, pair.fr]));

    answers.forEach(answer => {
      if (correctMap.get(answer.eng) === answer.fr) {
        correctCount++;
      }
    });

    const scorePercentage = ((correctCount / wordPairs.length) * 100).toFixed(2);
    console.log("scorePercentage = ", scorePercentage);
    return scorePercentage;
  };

  return (
    <div className="h-screen w-screen">
      <GameBody answers={answers} setAnswers={setAnswers} wordPairs={wordPairs} />
      <GameBar answers={answers} onAutoFill={onAutoFill} onResetAnswer={onResetAnswer} onGrade={onGrade} />
    </div>
  );
}
