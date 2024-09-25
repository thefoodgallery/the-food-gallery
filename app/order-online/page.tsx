/* eslint-disable @next/next/no-img-element */
"use client";
import { useStateContext } from "@/context/StateContext";
import useIsRestaurantOpen from "@/hooks/useIsRestaurantOpen";
import { constants } from "@/util/constants";
import { Minus, Plus } from "lucide-react";
import React, { Fragment, useCallback } from "react";
interface FoodOptions {
  name: string;
  price: number;
}

interface FoodItem {
  name: string;
  images: { src: string }[];
  price: number;
}

const MenuPage = () => {
  const [search, setSearch] = React.useState("");
  const { selectedFood, handleRemoveItem, handleSelectFood } =
    useStateContext();
  const isRestaurantActive = useIsRestaurantOpen();
  // console.log(isRestaurantActive);
  const filteredMenu = constants.menu.map((category) => {
    const items = category.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return { ...category, items };
  });

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
      <div className="w-full">
        {filteredMenu.map((category, i) => {
          return (
            <Fragment key={i + 10}>
              <div key={i} className="w-full mb-5">
                <p className="lg:text-3xl md:text-xl text-lg font-bold md:ml-5 mb-2 ">
                  {category.category}
                </p>
                <div
                  key={`${i + 1}`}
                  className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
                >
                  {category.items.map((item, i) => {
                    return (
                      <div
                        key={i + 1}
                        className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                      >
                        <img
                          className="md:p-4 p-2 object-cover h-40 md:h-60 lg:h-80 w-full rounded-md"
                          src={item.images[0].src}
                          alt="product image"
                        />
                        <div className="px-5 pb-5">
                          <div className="lg:text-2xl md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {item.name}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 dark:text-white">
                              ${item.price}
                            </span>
                            {selectedFood.some(
                              (fd) => fd.name === item.name
                            ) ? (
                              <div className="flex items-center">
                                <button
                                  onClick={() => {
                                    handleRemoveItem(item);
                                  }}
                                  className="text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center"
                                >
                                  <Minus size={15} />
                                </button>
                                <div className="mx-2 text-gray-500 text-lg md:text-xl px-2 py-1 text-center">
                                  {
                                    selectedFood.filter(
                                      (fd) => fd.name === item.name
                                    ).length
                                  }
                                </div>
                                <button
                                  onClick={() => {
                                    handleSelectFood(item);
                                  }}
                                  className="text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>
                            ) : (
                              <button
                                disabled={!isRestaurantActive}
                                onClick={() => {
                                  handleSelectFood(item);
                                }}
                                className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Add to cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;
