import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Pause, Play, RotateCcw, SendHorizontal, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTimer } from "react-timer-hook";
import { Answer } from "@/lib/types";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import WordPairsSetup from "@/components/word-pairs-setup";

interface Props {
  answers: Array<Answer>;
  onResetAnswer: () => void;
  onGrade: () => void;
  onAutoFill: () => void;
  disabled: boolean;
}

const GameBar = ({ disabled, answers, onAutoFill, onResetAnswer, onGrade }: Props) => {

  const getNewTimer = () => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);
    return expiryTimestamp;
  };

  const {
    seconds,
    minutes,
    isRunning,
    pause,
    resume,
    restart
  } = useTimer({ autoStart: true, expiryTimestamp: getNewTimer(), onExpire: () => onGrade() });

  const isAnsweredAll = answers.length === 20;


  const onReset = () => {
    onResetAnswer();
    restart(getNewTimer());
  };

  const onPauseOrResume = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };

  const timeRemaining = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <TooltipProvider delayDuration={.2}>
      <AnimatePresence mode="wait">
        <motion.div
          className="p-2 bg-gradient-to-r from-yellow-600 to-red-600 fixed inset-x-0 bottom-4 h-8 w-[500px] mx-auto shadow rounded-md flex items-center justify-between"
          key="gameBar"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: .2, delay: .2 }}
        >
          <div className="absolute left-0 right-0 mx-auto w-[60px] text-center"> {/* Center the timer */}
            <div className="rounded-md bg-gray-300 p-1 h-7 flex items-center justify-center">
              <Tooltip>
                <TooltipTrigger>
                  {timeRemaining}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Time Remaining</p>
                </TooltipContent>
              </Tooltip>

            </div>
          </div>

          <div className="flex space-x-2">
            <Drawer>
              <DrawerTrigger className="h-7">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="w-7 h-7 p-1">
                      <Settings />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip></DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Construct your own dictionary</DrawerTitle>
                </DrawerHeader>
                <WordPairsSetup />
              </DrawerContent>
            </Drawer>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="w-7 h-7 p-1" onClick={onAutoFill}>
                  <Bot />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI Assistant</p>
              </TooltipContent>
            </Tooltip>
          </div>


          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={disabled} variant="outline" size="icon" className="w-7 h-7 p-1"
                        onClick={onPauseOrResume}>
                  <AnimatePresence mode="wait">
                    {isRunning ? (
                      <motion.div
                        key="pause"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Pause className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pause</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={disabled} variant="outline" size="icon" className="w-7 h-7 p-1" onClick={onReset}>
                  <RotateCcw />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restart</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button disabled={!isAnsweredAll || disabled} variant="outline"
                        className="h-7 p-1 flex gap-4 w-[90px]"
                        onClick={onGrade}>
                  {answers.length} / 20
                  <SendHorizontal size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grade</p>
              </TooltipContent>
            </Tooltip>
          </div>

        </motion.div>


      </AnimatePresence>
    </TooltipProvider>
  );
};

export default GameBar;
