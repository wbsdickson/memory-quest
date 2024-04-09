import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { shuffleArray } from "@/lib/utils";
import { Answer, WordPair } from "@/lib/types";


export enum Language {
  ENG = "eng",
  FR = "fr",
}


interface Props {
  wordPairs: Array<WordPair>;
  answers: Array<Answer>;
  setAnswers: Dispatch<SetStateAction<Array<Answer>>>;
}

const GameBody = ({ wordPairs, answers, setAnswers }: Props) => {

  const padding = 30;
  const [isMount, setIsMount] = useState(false);
  const [svgSize, setSVGSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [newLineSource, setNewLineSource] = useState<{ word: string; language: Language } | null>(null);
  const [shuffledEngWords, setShuffledEngWords] = useState<string[]>([]);
  const [shuffledFrWords, setShuffledFrWords] = useState<string[]>([]);

  useEffect(() => {
    const updateSVGSize = () => {
      setSVGSize({
        width: Math.max(window.innerWidth - 2 * padding, 500),
        height: wordPairs.length * 50 + 100
      });
    };
    updateSVGSize();
    const resizeListener = () => updateSVGSize();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [wordPairs, padding]);

  useEffect(() => {
    const engWords = wordPairs.map(pair => pair.eng);
    const frWords = wordPairs.map(pair => pair.fr);
    setShuffledEngWords(shuffleArray(engWords));
    setShuffledFrWords(shuffleArray(frWords));

    setIsMount(true);
  }, [wordPairs]);

  if (!isMount) return null;
  const handleWordOrDotClick = (word: string, language: Language) => {
    // Check if the word is already linked
    const isAlreadyLinked = answers.some(line => line[Language.ENG] === word || line[Language.FR] === word);
    if (isAlreadyLinked) return; // Prevent linking more than once


    if (!newLineSource) {
      setNewLineSource({ word, language });
      return;
    }
    if (newLineSource.word === word) {
      setNewLineSource(null); // Reset for unselection
    }
    if (newLineSource.language !== language) {

      setAnswers([...answers,
        {
          [Language.ENG]: "",
          [Language.FR]: "",
          [newLineSource.language]: newLineSource.word,
          [language]: word

        }]);
      setNewLineSource(null); // Reset after linking
    }
  };

  const handleLineClick = (index: number) => {
    setAnswers(answers.filter((_, idx) => idx !== index));
  };
  return (
    <>
      <svg width={svgSize.width} height={svgSize.height}
           className="m-auto pb-6">


        {shuffledEngWords.map((engWord, index) => {
          const frWord = shuffledFrWords[index];
          const yPosition = 130 + 40 * index;
          const englishXPosition = padding; // Leftmost position for English
          const frenchXPosition = svgSize.width - padding - 150; // Rightmost position for French
          const isSelected = (id: string) => newLineSource && newLineSource.word === id ? "selected" : "";
          const isEngAlreadyLinked = answers.some(line => line[Language.ENG] === engWord) ? "linked" : "";
          const isFrAlreadyLinked = answers.some(line => line[Language.FR] === frWord) ? "linked" : "";

          return (
            <g key={index}>
              {index === 0 && (
                <>
                  <foreignObject
                    x={englishXPosition} y={10} width="170" height="70"
                    className="w-[550px] m-auto flex justify-between py-4 text-2xl font-mono border-b ">
                    <text>English</text>
                  </foreignObject>

                  <foreignObject
                    x={frenchXPosition} y={10} width="170" height="70"
                    className="w-[550px] m-auto flex justify-between py-4 text-2xl font-mono border-b ">
                    <text>French</text>
                  </foreignObject>
                </>
              )}
              <foreignObject
                x={englishXPosition} y={yPosition - 20} width="170" height="40"
                className={`text-container en ${isSelected(engWord)} ${isEngAlreadyLinked}`}
                onClick={() => handleWordOrDotClick(engWord, Language.ENG)}
              >
                <text
                  alignmentBaseline="middle"
                >
                  {engWord}
                </text>
              </foreignObject>
              <circle
                cx={englishXPosition + 150}
                cy={yPosition}
                r="5"
                fill="black"
              />
              <foreignObject x={frenchXPosition - 40} y={yPosition - 20} width="170" height="40"
                             className={`text-container fr ${isSelected(frWord)} ${isFrAlreadyLinked}`}
                             onClick={() => handleWordOrDotClick(frWord, Language.FR)}
              >
                <text
                  x={frenchXPosition + 100}
                  alignmentBaseline="middle"

                >
                  {frWord}
                </text>
              </foreignObject>
              <circle
                cx={frenchXPosition - 25}
                cy={yPosition}
                r="5"
                fill="black"
              />
            </g>
          );
        })}
        {answers.map((line, idx) => {
          const sourceWord = line[Language.ENG];
          const targetWord = line[Language.FR];
          const sourceIndex = shuffledEngWords.findIndex(word => sourceWord === word);
          const targetIndex = shuffledFrWords.findIndex(word => targetWord === word);
          const sourcePosition = sourceIndex !== -1 ? {
            x: padding + 150,
            y: 130 + 40 * sourceIndex
          } : null;
          const targetPosition = targetIndex !== -1 ? {
            x: svgSize.width - padding - 175,
            y: 130 + 40 * targetIndex
          } : null;
          return sourcePosition && targetPosition ? (
            <line
              className="line"
              key={`${line[Language.ENG]}-${line[Language.FR]}`}
              x1={sourcePosition.x}
              y1={sourcePosition.y}
              x2={targetPosition.x}
              y2={targetPosition.y}
              strokeWidth="3"
              onClick={() => handleLineClick(idx)}
            />
          ) : null;
        })}
      </svg>
    </>
  );
};

export default GameBody;