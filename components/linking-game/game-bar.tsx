import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, SendHorizontal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props {
  answer: Array<{ from: string; to: string }>;
  resetAnswer: () => void;
}

const GameBar = ({ answer, resetAnswer }: Props) => {

  const isAnsweredAll = answer.length === 8;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="p-2 bg-gradient-to-r from-yellow-600 to-red-600 fixed inset-x-0 bottom-10 h-8 w-full max-w-[500px] mx-auto flex justify-around shadow rounded-md items-center align-middle"
        key="gameBar"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: .2, delay: .2 }}
      >
        <TooltipProvider delayDuration={.2}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="w-7 h-7 p-1" onClick={resetAnswer}>
                <RotateCcw />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={!isAnsweredAll} variant="outline" className="h-7 p-1 flex gap-4">
                {answer.length} / 8
                <SendHorizontal size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grade</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


      </motion.div>


    </AnimatePresence>

  );
};

export default GameBar;
