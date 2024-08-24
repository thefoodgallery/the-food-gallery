/* eslint-disable @next/next/no-img-element */

import cn from "@/util/cn";
import { Carousel } from "flowbite-react";

export function Slider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 z-10">
      <Carousel slideInterval={5000}>
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gray-200",
            "sm:p-3",
            "md:p-4",
            "lg:p-5"
          )}
        >
          <q className={cn("text-xs", "sm:text-lg", "lg:text-2xl")}>
            ...The food was very good. Customer service was great. The sauce on
            the burger was delicious. The buffalo wings were delicious and the
            fries were really good.
          </q>
          <p className={cn("mt-2 text-lg", "sm:text-xl", "lg:text-3xl")}>
            - Brandie Riddle
          </p>
        </div>
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gray-200",
            "sm:p-3",
            "md:p-4",
            "lg:p-5"
          )}
        >
          <q className={cn("textxs", "sm:text-lg", "lg:text-2xl")}>
            ...OMG! The wings and burger are delicious. On my next visit, I will
            try the noodles.
          </q>
          <p className={cn("mt-2 text-lg", "sm:text-xl", "lg:text-3xl")}>
            - Rechelle Hatley
          </p>
        </div>
        <div
          className={cn(
            "w-full h-full flex flex-col items-center justify-center text-center p-2 bg-gray-200",
            "sm:p-3",
            "md:p-4",
            "lg:p-5"
          )}
        >
          <q className={cn("text-xs", "sm:text-lg", "lg:text-2xl")}>
            ...Simple amazing! Peaceful atmosphere and amazing good. Staff was
            pleasant and knowledgeable
          </q>
          <p className={cn("mt-2 text-lg", "sm:text-xl", "lg:text-3xl")}>
            - Jasmine Hemingway
          </p>
        </div>
      </Carousel>
    </div>
  );
}
