/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Caveat } from "next/font/google";
import cn from "@/utils/cn";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
});
const Blogs = () => {
  return (
    <div className={cn("w-full p-2", "sm:p-3", "md:p-4")}>
      <div className="w-full flex items-center justify-center text-lg md:text-xl lg:text-2xl font-bold uppercase mb-4">
        <p>Our Story</p>
      </div>
      <div
        className={cn(
          caveat.className,
          "grid grid-cols-1 w-full",
          "sm:grid-cols-2",
          "md:grid-cols-2"
        )}
      >
        <div
          className={cn(
            "w-full col-span-1 h-96",
            "lg:h-[600px]",
            "xl:h-[800px]"
          )}
        >
          <img
            src="/images/assets/owners.jpg"
            className={cn("h-full w-full object-cover")} // Added mx-auto to center the image
            alt=""
          />
        </div>
        <div
          className={cn(
            "col-span-1 flex items-center justify-center text-center p-2",
            "sm:p-3 sm:text-lg",
            "md:p-4 md:text-xl",
            "lg:p-5 lg:text-2xl"
          )}
        >
          Business owners and childhood friends Terrence Dickerson and Roger
          Kelly grew up in North St. Louis, where quality food options were
          scarce. While fish and chicken spots and corner stores were available
          at almost every turn, they say a dine-in restaurant offering a variety
          of fresh food was hard to come by. When it came time to open their own
          place, they had numerous location options, but they chose to set up
          shop where they first noticed the food shortage. Now open on North
          Grand Boulevard, The Food Gallery offers a diverse menu and promises
          top-notch hospitality to the residents of North St. Louis.
        </div>

        <div
          className={cn(
            "col-span-1 flex items-center justify-center text-center p-2 order-2", // Default order on mobile
            "sm:p-3 sm:text-lg",
            "md:p-4 md:text-xl",
            "lg:order-1 lg:p-5 lg:text-2xl"
          )}
        >
          Kelly, an avid home cook and the mind behind the business aspects of
          The Food Gallery, notes that they wanted to bring a new sort of
          establishment to the neighborhood. “The area I grew up in, I didn’t
          have anything like this, as a kid to walk to,” he says. “Every corner
          you can get fish and chicken, and we’re kind of burnt out on that.” It
          was the lack of variety that first inspired the duo when creating
          their restaurant concept, and what led them to land in North St.
          Louis. Dickerson, who serves as co-owner and head chef, adds that it
          made sense to stay close to their roots with the concept. “We had
          other spots available that we potentially wanted to get, but when we
          really thought on it and talked about it, it was like, why not be in
          north city? North St. Louis is where we grew up,” he says.
        </div>
        <div
          className={cn(
            "w-full col-span-1 h-full order-1",
            "sm:order-2",
            "md:order-2",
            "lg:h-[600px] lg:order-2"
          )}
        >
          <img
            src="/images/assets/ramen.jpg"
            className={cn("h-full w-full object-cover")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
