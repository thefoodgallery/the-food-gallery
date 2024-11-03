import { Slider } from "@/components/slider/Slider";
import cn from "@/utils/cn";
import React from "react";

const Testimonals = () => {
  return (
    <div className={cn("w-full p-2", "sm:p-3", "md:p-4", "lg:p-5")}>
      <div className={cn("w-full")}>
        <img src="/images/assets/burger.jpg" alt="" />
      </div>
      <div className={cn("w-full h-full")}>
        <Slider />
      </div>
    </div>
  );
};

export default Testimonals;
