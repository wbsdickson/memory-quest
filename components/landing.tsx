import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Page } from "@/app/page";

interface Props {
  toPage: (page: Page) => void;
}

const Landing = ({ toPage }: Props) => {
  return (
    <div className={cn("grid h-screen w-screen place-content-center")}>
      <Image
        className="flex items-center"
        placeholder="empty"
        priority
        height={300}
        width={300}
        alt="logo"
        src="/logo.png"
      />
      <div className="mt-20 flex flex-col space-y-6">
        <Button
          className="bg-gradient-to-r from-yellow-600 to-red-600"
          onClick={() => {
            toPage("linkingGame");
          }}
        >
          Go
        </Button>
        <Button
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
