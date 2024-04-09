"use client"

import {LinkingGame} from "@/components/linking-game";
import Landing from "@/components/landing";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function App() {
    const [isLandingShow, setIsLandingShow] = useState(true);

    return (
        <AnimatePresence mode="wait">
            {isLandingShow ? (
                <motion.div
                    key="landing"
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: -10, opacity: 0}}
                    transition={{duration: 0.2}}
                >
                    <Landing onPlay={() => setIsLandingShow(false)}/>
                </motion.div>
            ) : (
                <motion.div
                    key="svgGrid"
                    initial={{y: 10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: -10, opacity: 0}}
                    transition={{duration: 0.2}}
                >
                    <LinkingGame/>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
