"use client";

import "@/styles/linking-game.scss";
import GameBar from "@/components/linking-game/game-bar";
import GameBody from "@/components/linking-game/game-body";
import { Answer, WordPair } from "@/lib/types";
import { useEffect, useState } from "react";
import { delay, shuffleArray } from "@/lib/utils";
import { getCookie, setCookie } from "cookies-next";
import { wordPairs } from "@/constants/word-pairs";
import ResultModal from "@/components/result-modal";

export function Index() {
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [storedWordPairs, setStoredWordPairs] = useState<Array<WordPair>>([]);
  const [isGameBarDisabled, setIsGameBarDisabled] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [score, setScore] = useState("");

  const initStoredWordPairs = () => {
    const cookieWordPairs = getCookie("word_pairs");
    if (!cookieWordPairs) {
      const randomWordPairs =
        wordPairs.length > 20
          ? shuffleArray(wordPairs).slice(0, 20)
          : wordPairs;
      setCookie("word_pairs", JSON.stringify(randomWordPairs));
      setStoredWordPairs(randomWordPairs);
    } else {
      const storedPairs = JSON.parse(cookieWordPairs);
      const selectedWordPairs =
        storedPairs.length > 20
          ? shuffleArray(storedPairs).slice(0, 20)
          : storedPairs;
      setStoredWordPairs(selectedWordPairs);
    }
  };
  useEffect(() => {
    initStoredWordPairs();
  }, []);

  const onResetAnswer = () => {
    setAnswers([]);
    initStoredWordPairs();
  };

  const onAutoFill = async () => {
    setAnswers([]);
    setIsGameBarDisabled(true);
    const pairsToAnswer = shuffleArray(storedWordPairs); // Shuffle wordPairs to get random order

    for (let index = 0; index < pairsToAnswer.length; index++) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          eng: pairsToAnswer[index].eng,
          fr: pairsToAnswer[index].fr,
        },
      ]);
      await delay(200);
    }
    setIsGameBarDisabled(false);
  };
  const onGrade = () => {
    let correctCount = 0;

    const correctMap = new Map(
      storedWordPairs.map((pair) => [pair.eng, pair.fr]),
    );

    answers.forEach((answer) => {
      if (correctMap.get(answer.eng) === answer.fr) {
        correctCount++;
      }
    });

    const scorePercentage =
      ((correctCount / storedWordPairs.length) * 100).toFixed(2) + "%";
    setScore(scorePercentage);
    setIsShowResult(true);
  };

  return (
    <div className="h-screen w-screen">
      <GameBody
        answers={answers}
        setAnswers={setAnswers}
        wordPairs={storedWordPairs}
      />
      <GameBar
        disabled={isGameBarDisabled}
        answers={answers}
        onAutoFill={onAutoFill}
        onResetAnswer={onResetAnswer}
        onGrade={onGrade}
      />
      <ResultModal
        open={isShowResult}
        resetAnswer={onResetAnswer}
        setOpen={setIsShowResult}
        score={score}
      />
    </div>
  );
}
