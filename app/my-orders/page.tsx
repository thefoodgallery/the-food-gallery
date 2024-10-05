/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getMyOrders } from "../actions";
import moment from "moment-timezone";
import { Check, Soup } from "lucide-react";
import Link from "next/link";

const MyOrders = () => {
  interface OrderItemImage {
    src: string;
    alt: string;
  }

  interface OrderItem {
    images: OrderItemImage[];
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
        console.log(orders);
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
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
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
                Order Placed -{" "}
                {moment(order.orderDate)
                  .tz(moment.tz.guess())
                  .format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div key={order._id} className="block p-1 md:px-6 mb-4">
                {order.items.map((item, index) => (
                  <>
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
                        <button className=" text-white bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-2 py-1 md:px-3 md:py-1.5 lg:px-5 lg:py-2.5 text-center">
                          <Check size={15} />
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                <div className="flex w-full items-center justify-center p-1 border border-gray-500 rounded-md">
                  <button className="text-sm md:text-lg text-gray-500 ">
                    Total Amount : ${order.totalAmount}
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
