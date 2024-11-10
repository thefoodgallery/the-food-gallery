/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getMyOrders } from "../actions";
import moment from "moment-timezone";
import { Check, Soup } from "lucide-react";
import Link from "next/link";
import foodServedAnimation from "@/public/lottie-animations/food-served.json";
import Lottie from "lottie-react";

const MyOrders = () => {
  interface OrderItemImage {
    src: string;
    alt: string;
  }

  interface OrderItem {
    images: string;
    name: string;
    price: number;
    count: number;
  }

  interface Order {
    _id: string;
    customer: string;
    items: OrderItem[];
    totalAmount: number;
    orderDate: string;
    onlinePaid?: boolean | null;
    paymentData?: string | null;
    __v: number;
  }

  const { data, status } = useSession();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number | string>(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMyOrders = async () => {
      if (status == "authenticated") {
        setLoading(true);
        const orders = await getMyOrders(data?.user?.email);
        // console.log(orders);
        setMyOrders(orders);
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [data, status]);

  return (
    <div className="w-full md:px-4 px-1">
      <div className="text-bold md:text-2xl my-4 flex w-full p-4 items-center justify-center uppercase bg-gray-200 rounded-md">
        Order History
      </div>
      {loading || status == "loading" ? (
        <div className="w-full h-[500px] flex items-center justify-center">
          <Lottie
            autoPlay
            loop
            animationData={foodServedAnimation}
            className="h-96 w-96"
          />
        </div>
      ) : myOrders.length > 0 ? (
        myOrders.map((order) => {
          return (
            <div
              key={order._id + order.__v}
              className="w-full border border-gray-200 rounded-md mb-4"
            >
              <div
                key={order.__v}
                className="w-full text-xs md:text-lg font-bold flex items-center justify-start p-4"
              >
                Order Placed - &nbsp;
                {moment(order.orderDate)
                  .tz(moment.tz.guess())
                  .format("MMMM Do YYYY, h:mm:ss a")}
                &nbsp;
                {order?.onlinePaid && (
                  <em className="text-green-500 font-semibold">
                    -&nbsp;Paid Online
                  </em>
                )}
              </div>
              <div key={order._id} className="block p-1 md:px-6 mb-4">
                {order.items.map((item, index) => {
                  const imagesData = JSON.parse(item.images);
                  const menuImage = imagesData[0].src;
                  const imageurl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${menuImage}`;

                  return (
                    <>
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
                          <button className=" text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center">
                            <Check size={15} />
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="flex w-full items-center justify-center p-1 border border-gray-500 rounded-md">
                  <button className="text-sm md:text-lg text-gray-500 ">
                    Total Amount (including 10% taxes) : $
                    {order.totalAmount + order.totalAmount * 0.1}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full h-[500px] items-center justify-center">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              No orders found
            </h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Order Now
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <Link
                href="/order-online"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <Soup size={30} className="mr-2" />
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Take me to </div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Place Order
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
