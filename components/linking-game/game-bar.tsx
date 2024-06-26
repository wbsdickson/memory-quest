import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Home,
  Pause,
  Play,
  RotateCcw,
  SendHorizontal,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTimer } from "react-timer-hook";
import { Answer } from "@/lib/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import WordPairsSetup from "@/components/word-pairs-setup";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props {
  answers: Array<Answer>;
  onResetAnswer: () => void;
  onGrade: () => void;
  onAutoFill: () => void;
  onReturnLanding: () => void;
  disabled: boolean;
}

const GAME_DURATION = 90; //seconds

const GameBar = ({
  disabled,
  answers,
  onAutoFill,
  onResetAnswer,
  onGrade,
  onReturnLanding,
}: Props) => {
  const getNewTimer = () => {
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + GAME_DURATION);
    return expiryTimestamp;
  };

  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
    autoStart: true,
    expiryTimestamp: getNewTimer(),
    onExpire: () => onGrade(),
  });

  const isAnsweredAll = answers.length === 20;

  const onReset = () => {
    onResetAnswer();
    restart(getNewTimer());
  };

  const onPauseOrResume = () => {
    if (isRunning) {
      toast("🧐What can you do while the clock is paused?");
      pause();
    } else {
      resume();
    }
  };

  const timeRemaining = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <TooltipProvider delayDuration={0.2}>
      <AnimatePresence mode="wait">
        <motion.div
          className="fixed inset-x-0 bottom-4 mx-auto flex h-8 w-full items-center justify-between rounded-md bg-gradient-to-r from-yellow-600 to-red-600 px-1 shadow md:w-[550px]"
          key="gameBar"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <div className="flex space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 p-1"
                  onClick={onReturnLanding}
                >
                  <Home />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>

            <Drawer>
              <DrawerTrigger className="h-7">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 p-1"
                    >
                      <Settings />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Construct your own dictionary</DrawerTitle>
                </DrawerHeader>
                <WordPairsSetup />
              </DrawerContent>
            </Drawer>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isAnsweredAll || disabled}
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 p-1"
                  onClick={onAutoFill}
                >
                  <Bot />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI Assistant</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="mx-1 flex h-7 flex-grow items-center justify-center rounded-md bg-gray-300 p-1 text-center">
            <Tooltip>
              <TooltipTrigger>{timeRemaining}</TooltipTrigger>
              <TooltipContent>
                <p>Time Remaining</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={disabled}
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 p-1"
                  onClick={onPauseOrResume}
                >
                  <AnimatePresence mode="wait">
                    {isRunning ? (
                      <motion.div
                        key="pause"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Pause className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Play className="h-5 w-5" />
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
                <Button
                  disabled={disabled}
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 p-1"
                  onClick={onReset}
                >
                  <RotateCcw />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restart</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!isAnsweredAll || disabled}
                  variant="outline"
                  className={cn(
                    "flex h-7 w-[90px] gap-4 p-1",
                    isAnsweredAll && "bg-green-600 text-white",
                  )}
                  onClick={() => {
                    pause();
                    onGrade();
                  }}
                >
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
