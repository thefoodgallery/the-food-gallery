/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronDown, ChevronUp, LogOut, Receipt, Soup, X } from "lucide-react";
import React, { useState } from "react";
import { Drawer } from "flowbite-react";
import { Menu, useStateContext } from "@/context/StateContext";

export default function MenuPageLayour({
  children,
}: {
  children: React.ReactNode;
}) {
  const { selectedFood, setSelectedFood } = useStateContext();
  const countedItems = selectedFood.reduce((acc, item) => {
    acc[item.name] = acc[item.name]
      ? { ...acc[item.name], count: acc[item.name].count + 1 }
      : { ...item, count: 1 };
    return acc;
  }, {} as Record<string, Menu & { count: number }>);

  const uniqueItemsWithCounts = Object.values(countedItems);

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const total = selectedFood
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  const handlePlaceOrder = async () => {};
  return (
    <main>
      {children}
      {/* <>
        <div className="flex min-h-[30vh] sticky bottom-0 items-center justify-center">
          <button
            className="bg-black text-white items-center flex justify-center space-x-2 hover:bg-black px-3 py-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <LogOut size={20} />
            <p>Checkout</p>
          </button>
        </div>
        <Drawer
          edge
          open={isOpen}
          onClose={handleClose}
          position="bottom"
          className="p-0 rounded-t-md"
        >
          <Drawer.Header
            closeIcon={() => {
              return isOpen ? <ChevronDown /> : <ChevronUp />;
            }}
            title={`Total: $${total}`}
            titleIcon={() => <Receipt />}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer mb-0 px-4 pt-4 bg-gray-50 rounded-t-md hover:bg-gray-100 border-2 border-gray-200"
          />
          <Drawer.Items className="px-4 pt-4 pb-0 rounded-t-md">
            <div className="block p-1 md:px-4 max-h-[300px] overflow-auto">
              {uniqueItemsWithCounts.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 items-center justify-center  mb-1 bg-gray-50 rounded-md "
                >
                  <div className="col-span-3 flex items-center space-x-2">
                    <img
                      className="w-12 h-12 rounded-md"
                      src={item.images[0].src}
                      alt="product image"
                    />
                    <p className="text-sm md:text-lg max-w-20 overflow-hidden truncate md:w-auto md:overflow-visible font-semibold">
                      {item.name}
                    </p>
                  </div>
                  <p className="text-sm md:text-lg font-semibold col-span-2">
                    ${item.price}{" "}
                    <span className="text-gray-400">x{item.count}</span>
                  </p>
                  <div className="w-full col-span-1 flex items-center justify-start">
                    <button
                      onClick={() => {
                        setSelectedFood(
                          selectedFood.filter((fd) => fd.name !== item.name)
                        );
                      }}
                      className=" text-white bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex w-full items-center justify-center p-1 border border-gray-500 rounded-md">
                <button className="text-sm md:text-lg text-gray-500 ">
                  Total Amount : ${total}
                </button>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pb-1 pt-3">
              <button
                onClick={handlePlaceOrder}
                type="button"
                className="flex items-center justify-center space-x-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <Soup size={20} /> <p>Place Order</p>
              </button>
            </div>
          </Drawer.Items>
        </Drawer>
      </> */}
    </main>
  );
}
