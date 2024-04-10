import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Page } from "@/app/page";
import { motion } from "framer-motion";

interface Props {
  toPage: (page: Page) => void;
}

const Landing = ({ toPage }: Props) => {
  return (
    <div className={cn("grid h-screen w-screen place-content-center")}>
      <motion.div
        initial={{ y: 20, scale: 1.2, rotate: -20 }}
        animate={{ y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <Image
          placeholder="empty"
          priority
          height={300}
          width={300}
          alt="logo"
          src="/logo.png"
        />
      </motion.div>
      <div className="mt-20 flex flex-col space-y-6">
        <Button
          className="bg-gradient-to-r from-yellow-600 to-red-600 transition delay-100 duration-200 hover:scale-110"
          onClick={() => {
            toPage("linkingGame");
          }}
        >
          Go
        </Button>
        <Button
          className="transition delay-100 duration-200 hover:scale-110"
          onClick={() => {
            toPage("about");
          }}
        >
          About
        </Button>
      </div>
    </div>
  );
};

export default Landing;
