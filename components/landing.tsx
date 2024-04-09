import React from 'react';
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {cn} from "@/lib/utils";

interface Props {
    onPlay: () => void
}

const Landing = ({onPlay}: Props) => {
    return (
        <div className={cn("h-screen w-screen place-content-center space-y-20 grid")}>
            <Image
                className="flex items-center"
                placeholder="empty"
                priority
                height={300}
                width={300}
                alt="logo"
                src="/logo.png"
            />
            <Button onClick={onPlay}>Go</Button>
        </div>
    );
};

export default Landing;