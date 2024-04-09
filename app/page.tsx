"use client";

import { Index } from "@/components/linking-game";
import Landing from "@/components/landing";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [isLandingShow, setIsLandingShow] = useState(true);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isLandingShow ? (
          <motion.div
            key="landing"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Landing onPlay={() => setIsLandingShow(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="linkingGame"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Index />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}
