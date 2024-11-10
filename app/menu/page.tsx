/* eslint-disable @next/next/no-img-element */
"use client";
import { Category, useStateContext } from "@/context/StateContext";
import cn from "@/utils/cn";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import menuLoadingAnimation from "@/public/lottie-animations/order-food.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const MenuPage = () => {
  const [search, setSearch] = React.useState("");
  const { selectedFood, handleRemoveItem, handleSelectFood } =
    useStateContext();
  const [selected, setSelected] = React.useState<string | null>(null);
  const [categoryData, setCategories] = useState<Category[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  // console.log(categoryData);
  // const categories = constants.menu.map((category) => category.category);
  const categories = categoryData.map((category) => ({
    id: category._id,
    name: category.name,
    image: category.image,
  }));
  // console.log(categories);

  const categoryFiltertedMenu = selected
    ? categoryData.filter((category) => category._id === selected)
    : categoryData;

  // console.log(categoryFiltertedMenu);

  const filteredMenu = categoryFiltertedMenu.map((category) => {
    const items = category.items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return { category: category.name, items };
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoadingMenu(true);
        const res = await fetch("/api/categories/menu");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching menu items");
      } finally {
        setLoadingMenu(false);
      }
    };

    fetchMenuItems();
  }, [setLoadingMenu, setCategories]);

  return (
    <>
      {loadingMenu ? (
        <div className="w-full h-full px-2 md:px-4 lg:px-8">
          <div className="w-full flex items-center justify-center">
            <Lottie
              autoPlay
              className="h-96 w-96"
              animationData={menuLoadingAnimation}
              loop
            />
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="content-container"
        >
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
            <div className="w-full sticky top-0 p-3 flex items-center justify-start sm:justify-center overflow-x-auto space-x-3">
              {categories.map((category, i) => {
                const thumbnail = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${category?.image}`;
                return (
                  <div
                    onClick={() =>
                      setSelected(selected === category.id ? null : category.id)
                    }
                    style={{
                      backgroundImage: `url("${thumbnail}")`,
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
                      selected === category.id ? "border-4 border-blue-500" : ""
                    )}
                  >
                    {category.name}
                  </div>
                );
              })}
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
                          const imagesData = JSON.parse(item.images);
                          const menuImage = imagesData[0].src;
                          const imageurl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${menuImage}`;

                          return (
                            <div
                              key={i + 1}
                              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow"
                            >
                              <img
                                className="md:p-4 p-2 object-cover h-40 md:h-60 lg:h-80 w-full rounded-md"
                                src={imageurl}
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
                                  {/* {selectedFood.some(
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
                                onClick={() => {
                                  handleSelectFood(item);
                                }}
                                className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center"
                              >
                                Add to cart
                              </button>
                            )} */}
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
        </motion.div>
      )}
    </>
  );
};

export default MenuPage;
