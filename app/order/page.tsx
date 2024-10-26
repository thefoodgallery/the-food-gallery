"use client";
import cn from "@/util/cn";
import { constants } from "@/util/constants";
import React from "react";

const Order = () => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("");
  const categories = constants.menu.map((category) => category.category);
  //   console.log(categories);

  return (
    <div className="w-full h-full px-2 md:px-4 lg:px-8">
      <div className="w-full flex items-center justify-center mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="md:w-2/3 w-full rounded-md"
          placeholder="Ramen Bowls, Spicy Sausage Bowl, Polish, Spicy Sausage....."
        />
      </div>
      <div className="w-full p-3 flex items-center justify-start sm:justify-center overflow-x-auto space-x-3">
        {categories.map((category, i) => {
          return (
            <div
              onClick={() => setSelected(category)}
              style={{
                backgroundImage: `url("/category/${category}.jpg")`,
                backgroundSize: "100% 100%", // Stretching the background image to cover the div
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding background color with opacity
                backgroundBlendMode: "overlay", // Blending the background image with the color
                userSelect: "none", // Disabling text selection
              }}
              key={i}
              className={cn(
                "cursor-pointer leading-[20px]",
                "p-2 border border-gray-200 rounded-lg h-14 min-w-14 w-14 text-[10px] flex items-end justify-center md:text-base lg:h-36 lg:w-28 md:h-32 md:w-28 sm:h-20 sm:w-20 sm:text-start text-center sm:items-end sm:justify-start text-white font-extrabold",
                selected === category ? "border-4 border-blue-500" : ""
              )}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div className="w-full border border-green-500 mt-5"></div>
    </div>
  );
};

export default Order;
