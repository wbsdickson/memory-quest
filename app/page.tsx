"use client";

import { Index } from "@/components/linking-game";
import Landing from "@/components/landing";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import About from "@/components/about";

export type Page = "landing" | "linkingGame" | "about";
export default function App() {
  const [showPage, setShowPage] = useState<"landing" | "linkingGame" | "about">(
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
            <Landing toPage={(page: Page) => setShowPage(page)} />
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
            <Index toPage={(page: Page) => setShowPage(page)} />
          </motion.div>
        )}

        {showPage === "about" && (
          <motion.div
            key="about"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <About toPage={(page: Page) => setShowPage(page)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
