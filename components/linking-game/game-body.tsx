import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn, shuffleArray } from "@/lib/utils";
import { WordPair } from "@/lib/types";


enum Language {
  ENG = "ENG",
  FR = "FR",
}


interface Props {
  wordPairs: Array<WordPair>;
  answer: { from: string, to: string }[];
  setAnswer: Dispatch<SetStateAction<{ from: string, to: string }[]>>;
}

const GameBody = ({ wordPairs, answer, setAnswer }: Props) => {
  const padding = 30;
  const [isMount, setIsMount] = useState(false);
  const [svgSize, setSVGSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [newLineSource, setNewLineSource] = useState<{ id: string; language: Language } | null>(null);
  const [shuffledEngWords, setShuffledEngWords] = useState<string[]>([]);
  const [shuffledFrWords, setShuffledFrWords] = useState<string[]>([]);

  useEffect(() => {
    const updateSVGSize = () => {
      console.log("update to", Math.max(window.innerWidth - 2 * padding, 700));
      setSVGSize({
        width: Math.max(window.innerWidth - 2 * padding, 500),
        height: wordPairs.length * 60 + 100
      });
    };
    updateSVGSize();
    const resizeListener = () => updateSVGSize();
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [padding]);

  useEffect(() => {
    const engWords = wordPairs.map(pair => pair.eng);
    const frWords = wordPairs.map(pair => pair.fr);
    setShuffledEngWords(shuffleArray(engWords));
    setShuffledFrWords(shuffleArray(frWords));

    setIsMount(true);
  }, []);

  if (!isMount) return null;

  const handleWordOrDotClick = (word: string, language: Language) => {
    const id = `${language}-${word}`;
    // Check if the word is already linked
    const isAlreadyLinked = answer.some(line => line.from === id || line.to === id);
    if (isAlreadyLinked) return; // Prevent linking more than once


    if (!newLineSource) {
      setNewLineSource({ id, language });
      return;
    }
    if (newLineSource.id === id) {
      setNewLineSource(null); // Reset for unselection
    }
    if (newLineSource.language !== language) {
      setAnswer([...answer, { from: newLineSource.id, to: id }]);
      setNewLineSource(null); // Reset after linking
    }
  };

  const handleLineClick = (index: number) => {
    setAnswer(answer.filter((_, idx) => idx !== index));
  };
  return (
    <>
      <svg width={svgSize.width} height={svgSize.height}
           className={cn("m-auto")}>


        {shuffledEngWords.map((engWord, index) => {
          const frWord = shuffledFrWords[index];
          const yPosition = 130 + 40 * index;
          const englishXPosition = padding; // Leftmost position for English
          const frenchXPosition = svgSize.width - padding - 150; // Rightmost position for French
          const engId = `ENG-${(engWord)}`;
          const frId = `FR-${(frWord)}`;
          const isSelected = (id: string) => newLineSource && newLineSource.id === id ? "selected" : "";
          const isEngAlreadyLinked = answer.some(line => line.from === engId || line.to === engId) ? "linked" : "";
          const isFrAlreadyLinked = answer.some(line => line.from === frId || line.to === frId) ? "linked" : "";

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
                className={`text-container en ${isSelected(engId)} ${isEngAlreadyLinked}`}
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
                             className={`text-container fr ${isSelected(frId)} ${isFrAlreadyLinked}`}
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
        {answer.map((line, idx) => {
          const sourceWord = line.from.substring(line.from.indexOf("-") + 1);
          const targetWord = line.to.substring(line.to.indexOf("-") + 1);
          const sourceIndex = shuffledEngWords.findIndex(word => sourceWord === word || sourceWord === shuffledFrWords[shuffledEngWords.indexOf(word)]);
          const targetIndex = shuffledEngWords.findIndex(word => targetWord === word || targetWord === shuffledFrWords[shuffledEngWords.indexOf(word)]);
          const sourcePosition = sourceIndex !== -1 ? {
            x: line.from.startsWith(Language.ENG) ? padding + 150 : svgSize.width - padding - 175,
            y: 130 + 40 * sourceIndex
          } : null;
          const targetPosition = targetIndex !== -1 ? {
            x: line.to.startsWith(Language.FR) ? svgSize.width - padding - 175 : padding + 150,
            y: 130 + 40 * targetIndex
          } : null;
          return sourcePosition && targetPosition ? (
            <line
              className="line"
              key={`${line.from}-${line.to}`}
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