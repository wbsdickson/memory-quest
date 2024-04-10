import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Page } from "@/app/page";

interface Props {
  toPage: (page: Page) => void;
}

const About = ({ toPage }: Props) => {
  return (
    <div className="h-screen bg-[url('/about-bg.png')] bg-cover  py-12 lg:py-24 xl:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Memory Quest
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Memory Quest is an engaging game for learning English and French
                vocabulary by matching words under a time limit. Players can
                customize their vocab list and earn a beautifully designed
                certificate card upon completion, making language learning a
                thrilling adventure.
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  toPage("linkingGame");
                }}
                className="w-28"
              >
                Play now
              </Button>{" "}
              <Button
                onClick={() => {
                  toPage("landing");
                }}
                className="w-28"
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  window.open(
                    "https://github.com/wbsdickson/memory-quest",
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="w-28"
              >
                Github
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <img
                alt="Avatar"
                className="rounded-full"
                height="64"
                src="https://avatars.githubusercontent.com/u/44679344?v=4"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width="64"
              />
              <div className="mt-10 space-y-2">
                <h3 className="text-xl font-semibold">Dickson Wu</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full Stack Developer | Mobile App Developer | Associate
                  Financial Technologist
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    className="padding-2.5 grid h-8 w-8 translate-y-0.5 place-content-center items-center rounded-full border border-gray-200 bg-white shadow-sm "
                    href="https://www.linkedin.com/in/wu-dickson/"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    className="padding-2.5 grid h-8 w-8 translate-y-0.5 place-content-center items-center rounded-full border border-gray-200 bg-white shadow-sm "
                    href="https://github.com/wbsdickson"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid items-center">
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="420"
              src="/logo.png"
              width="700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
