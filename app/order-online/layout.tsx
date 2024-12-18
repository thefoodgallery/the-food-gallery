/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronDown, ChevronUp, LogOut, Receipt, Soup, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Drawer } from "flowbite-react";
import { Menu, useStateContext } from "@/context/StateContext";
import { getSession, signIn, useSession } from "next-auth/react";
import { placeOrder } from "../actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useIsRestaurantOpen from "@/hooks/useIsRestaurantOpen";
import Link from "next/link";
import CheckoutModal from "@/components/checkout-modal";
import { Session } from "next-auth";
import loadingAnimation from "@/public/lottie-animations/searching-food.json";
import Lottie from "lottie-react";

export default function MenuPageLayour({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, status } = useSession();
  const { selectedFood, setSelectedFood } = useStateContext();
  const isRestaurantActive = useIsRestaurantOpen();
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);
  const handleCheckoutModalClose = () => setOpenCheckoutModal(false);
  const handleCheckoutModalOpen = () => setOpenCheckoutModal(true);
  // console.log(isRestaurantActive);
  const [uniqueItemsWithCounts, setUniqueItemsWithCounts] = useState<
    (Menu & { count: number })[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const [total, setTotal] = useState<number | string>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stashedItems = localStorage.getItem("order-items");
      if (stashedItems) {
        const parsedItems: (Menu & { count: number })[] =
          JSON.parse(stashedItems);

        const total = parsedItems
          .reduce((acc: number, item) => acc + item.price * item.count, 0)
          .toFixed(2);

        setTotal(total);
        setIsOpen(true);
        setUniqueItemsWithCounts(parsedItems);
        setTimeout(() => {
          localStorage.removeItem("order-items");
        }, 0);
      } else {
        const countedItems = selectedFood.reduce((acc, item) => {
          acc[item.name] = acc[item.name]
            ? { ...acc[item.name], count: acc[item.name].count + 1 }
            : { ...item, count: 1 };
          return acc;
        }, {} as Record<string, Menu & { count: number }>);

        if (Object.values(countedItems).length > 0) {
          const total = selectedFood
            .reduce((acc, item) => acc + item.price, 0)
            .toFixed(2);
          setTotal(total);
          setUniqueItemsWithCounts(Object.values(countedItems));
        } else {
          setUniqueItemsWithCounts([]);
          setTotal(0);
        }
      }
    }
  }, [selectedFood]);

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (payOnline: boolean | null) => {
    setLoading(true);

    try {
      localStorage.setItem(
        "order-items",
        JSON.stringify(uniqueItemsWithCounts)
      );
      if (status === "unauthenticated") {
        await signIn("google", { callbackUrl: window.location.href });
        return;
      }

      // const session = await getSession();
      // console.log(uniqueItemsWithCounts);
      if (uniqueItemsWithCounts.length === 0) {
        setUniqueItemsWithCounts(uniqueItemsWithCounts);
      } else {
        const stashedData = localStorage.getItem("order-items");
        if (stashedData) {
          setUniqueItemsWithCounts(JSON.parse(stashedData));
        }
      }

      if (data?.user && !payOnline) {
        // await placeOrder({
        //   email: session?.user?.email || "",
        //   items: uniqueItemsWithCounts,
        // });

        // localStorage.clear();
        // setIsOpen(false);
        // setUniqueItemsWithCounts([]);
        // setTotal(0);
        // toast.success("Order Placed Successfully!!");
        // router.push("/my-orders");
        await dispatchOrder(data, false);
      } else {
        handleCheckoutModalOpen();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error placing order please ty again later");
    } finally {
      setLoading(false);
    }
  };

  const dispatchOrder = async (
    session: Session | null,
    onlinePaid: boolean,
    paymentData?: any | null
  ) => {
    await placeOrder({
      email: session?.user?.email || "",
      items: uniqueItemsWithCounts,
      onlinePaid,
      paymentData,
    });

    localStorage.clear();
    setIsOpen(false);
    setUniqueItemsWithCounts([]);
    setTotal(0);
    toast.success("Order Placed Successfully!!");
    router.push("/my-orders");
  };

  const handleOpenCheckOut = () => {
    // console.log(selectedFood);
    if (selectedFood.length > 0) {
      setIsOpen(true);
    } else {
      toast.error("Please select some items to checkout");
    }
  };

  const handleCheckoutDrawerOpen = () => {
    if (uniqueItemsWithCounts.length > 0 && !isOpen) {
      setIsOpen(true);
    } else if (uniqueItemsWithCounts.length > 0 && isOpen) {
      setIsOpen(false);
    } else {
      toast.error("Please select some items to checkout");
    }
  };

  return (
    <main>
      {!isRestaurantActive && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex flex-col items-center justify-center z-50 backdrop-blur-sm">
          <div className="w-full h-auto flex items-center justify-center">
            <Lottie
              animationData={loadingAnimation}
              className="h-48 w-48 md:h-96 md:w-96"
              autoPlay
              loop
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-orange-500 text-center drop-shadow-lg">
            Sorry, We Are Currently Closed!
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-yellow-400 text-center animate-pulse">
            We’ll be open soon. Check our operating hours and visit us again!
          </p>

          <Link
            href="/"
            className="mt-6 px-6 py-3  bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Go Back to Home
          </Link>
        </div>
      )}

      {children}
      <>
        {/* <div className="flex min-h-[30vh] sticky bottom-0 items-center justify-center">
          <button
            disabled={!isRestaurantActive}
            className="bg-black text-white items-center flex justify-center space-x-2 hover:bg-black px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleOpenCheckOut}
          >
            <LogOut size={20} />
            <p>Checkout</p>
          </button>
        </div> */}
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
            title={`Total: $${total} ${
              !isOpen && selectedFood.length > 0
                ? "Click here to checkout!!"
                : ""
            }`}
            titleIcon={() => <Receipt />}
            onClick={handleCheckoutDrawerOpen}
            className="cursor-pointer mb-0 px-4 pt-4 bg-gray-50 rounded-t-md hover:bg-gray-100 border-2 border-gray-200"
          />
          <Drawer.Items className="px-4 pt-4 pb-0 rounded-t-md">
            <div className="block p-1 md:px-4 max-h-[300px] overflow-auto">
              {uniqueItemsWithCounts.map((item, index) => {
                const imagesData = JSON.parse(item.images);
                const menuImage = imagesData[0].src;
                const imageurl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${menuImage}`;

                return (
                  <div
                    key={index}
                    className="grid grid-cols-6 items-center justify-center  mb-1 bg-gray-50 rounded-md "
                  >
                    <div className="col-span-3 flex items-center space-x-2">
                      <img
                        className="w-12 h-12 rounded-md"
                        src={imageurl}
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
                );
              })}
              <div className="flex w-full items-center justify-center p-1 border border-gray-500 rounded-md">
                <button className="text-sm md:text-lg text-gray-500 ">
                  Total Amount : ${total}
                </button>
              </div>
            </div>
            <div className="flex w-full items-center justify-center space-x-3 pb-1 pt-3">
              {/* <button
                disabled={!isRestaurantActive}
                onClick={() => handlePlaceOrder(false)}
                type="button"
                className="flex items-center justify-center space-x-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 sm:py-2.5 sm:px-5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Soup size={20} /> <p>Place Order</p>{" "}
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="hidden sm:inline sm:w-4 sm:h-4 sm:me-3 sm:text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button> */}
              <button
                disabled={!isRestaurantActive}
                onClick={() => handlePlaceOrder(true)}
                type="button"
                className="flex items-center justify-center space-x-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 sm:py-2.5 sm:px-5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Soup size={20} /> <p>Pay Online and Place order</p>{" "}
                {loading && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="hidden sm:inline sm:w-4 sm:h-4 sm:me-3 sm:text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>
          </Drawer.Items>
        </Drawer>
        <CheckoutModal
          dispatchOrder={dispatchOrder}
          total={total}
          handleClose={handleCheckoutModalClose}
          open={openCheckoutModal}
        />
      </>
    </main>
  );
}
