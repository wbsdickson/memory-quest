"use client";

import { Index } from "@/components/linking-game";
import Landing from "@/components/landing";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [showPage, setShowPage] = useState<"landing" | "linkingGame">(
    "landing",
  );

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        {showPage === "landing" && (
          <motion.div
            key="landing"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Landing onPlay={() => setShowPage("linkingGame")} />
          </motion.div>
        )}

        {showPage === "linkingGame" && (
          <motion.div
            key="linkingGame"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Index
              returnLanding={() => {
                setShowPage("landing");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
