/* eslint-disable @next/next/no-img-element */
"use client";
import { constants } from "@/util/constants";
import React, { Fragment } from "react";

const MenuPage = () => {
  const [search, setSearch] = React.useState("");
  const filteredMenu = constants.menu.filter((category) =>
    category.items.some((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="w-full h-full px-2 md:px-4 lg:px-8">
      <div className="w-full flex items-center justify-center mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="py-3 px-4 block w-full md:w-2/3 lg:w-1/2 xl:w-2/3 border border-black rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none"
          type="search"
          placeholder="Filter for Ramens, Bowls, Lamb Chops...."
        />
      </div>
      <div className="w-full">
        {filteredMenu.length === 0 && Boolean(search) ? (
          <div className="w-full flex items-center justify-center">
            <p className="text-2xl font-bold">No results found</p>
          </div>
        ) : (
          filteredMenu.map((category, i) => {
            return (
              <Fragment key={i}>
                <div className="w-full mb-5">
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
                          key={i}
                          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                        >
                          <img
                            className=" md:p-4 p-2 object-cover h-40 md:h-60 lg:h-80 w-full rounded-md"
                            src={item.images[0].src}
                            alt="product image"
                          />
                          <div className="px-5 pb-5">
                            <div className="lg:text-2xl md:text-xl font-semibold tracking-tight text-gray-900">
                              {item.name}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900">
                                ${item.price}
                              </span>
                              <button className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center">
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MenuPage;
