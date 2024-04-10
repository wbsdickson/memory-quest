import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const todayDate = format(new Date(), "MMM dd, yyyy");

interface Props {
  name: string;
  score: string;
  className?: string;
  id?: string;
}

const CertificateCard = React.forwardRef<HTMLDivElement, Props>(
  ({ name, score, className, id }: Props, ref) => {
    return (
      <div ref={ref} id={id}>
        <CardContainer className="inter-var" containerClassName="p-2">
          <CardBody className="group/card relative h-[400px] w-[400px] rounded-xl  border border-black/[0.1] bg-gray-50 p-6 pt-64 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl  dark:hover:shadow-emerald-500/[0.1]">
            <CardItem
              rotateX={20}
              rotateZ={-10}
              className="absolute inset-0 -z-10 w-full"
            >
              <Image
                src="/certificate-bg.jpg"
                height="400"
                width="240"
                className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>

            <CardItem className="absolute inset-10 top-8 grid h-16 place-content-center rounded-2xl text-3xl font-bold text-white">
              Memory Quest
            </CardItem>
            <CardItem className="absolute inset-10 top-28 text-2xl font-bold text-black">
              <div>{name}</div>
              <span className="text-lg font-normal text-gray-400">
                {todayDate}
              </span>
            </CardItem>
            <CardItem className="absolute inset-0 top-52 mx-auto grid h-16 w-11/12 place-content-center rounded-2xl bg-black text-3xl font-bold text-white">
              {score}
            </CardItem>

            <CardItem className="z-20 mt-12 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
              Congratulations on conquering Memory Quest! This certificate
              honors your achievement and the wisdom you&apos;ve gained. Keep
              exploring and learning!
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    );
  },
);

CertificateCard.displayName = "CertificateCard";

export default CertificateCard;
