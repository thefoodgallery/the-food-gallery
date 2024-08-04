/* eslint-disable @next/next/no-img-element */
import {
  Home,
  Menu,
  MessageSquareCode,
  Phone,
  Pizza,
  Search,
  ShoppingCart,
  Star,
  User,
  Utensils,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data, status } = useSession();
  return (
    <div className="w-full px-2 flex md:grid md:grid-cols-4 md:px-6 py-3">
      <div className="w-full flex items-center justify-start sm:hidden">
        <button
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="hs-offcanvas-example"
          data-hs-overlay="#hs-offcanvas-example"
          className="bg-black rounded-full h-10 w-10 flex items-center justify-center"
        >
          <Menu size={15} color="white" />
        </button>
        <div
          id="hs-offcanvas-example"
          className="hs-overlay hs-overlay-open:translate-x-0 fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64"
          role="dialog"
          tabIndex={1}
          aria-labelledby="hs-offcanvas-example-label"
        >
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-black uppercase "
          >
            The Food Gallery
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center "
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <Home size={20} />
                  <span className="ms-3">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <Utensils size={20} />
                  <span className="ms-3">Menu</span>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <Pizza size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <Star size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Blogs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <MessageSquareCode size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Testimonals
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <Phone size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    +1 3142609407
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hidden md:w-full md:flex md:space-x-2 md:items-center md:col-span-1 xl:space-x-4">
        <div className="flex md:w-8 md:h-8 lg:w-12 lg:h-12 items-center justify-center bg-black text-white rounded-full xl:p-3">
          <Phone size={20} />
        </div>
        <p className="font-bold md:text-sm lg:text-2xl xl:text-2xl">
          +1 3142609407
        </p>
      </div>
      <div className="w-full flex items-center justify-center md:col-span-2">
        <div className="h-20 w-20 items-center justify-center rounded-full lg:h-36 lg:w-36 xl:w-48 xl:flex xl:h-48 xl:col-span-2">
          <img
            src={"/images/assets/logo.png"}
            alt="logo"
            className="h-full w-48"
          />
        </div>
      </div>
      <div className="w-full sm:hidden flex justify-end items-center">
        {status === "loading" ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full "
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : status === "authenticated" ? (
          <div className="hs-tooltip [--trigger:click] [--placement:bottom] inline-block">
            <button
              type="button"
              className="hs-tooltip-toggle w-8 h-8 rounded-full cursor-pointer"
            >
              <img
                className="w-full h-full rounded-full cursor-pointer"
                src={data.user?.image || "/images/profiles/default-profile.jpg"}
                alt="User dropdown"
              />
            </button>

            <div
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible transition-opacity opacity-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
              role="tooltip"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>{data.user?.name}</div>
                <div className="font-medium truncate">{data.user?.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="avatarButton"
              >
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Refer
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  onClick={() => {
                    signOut();
                  }}
                  type="button"
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google");
            }}
            className="flex items-center justify-center h-10 w-10 bg-black text-white rounded-full"
          >
            <User size={15} />
          </button>
        )}
      </div>
      <div className="hidden justify-end items-center md:flex md:space-x-4 md:col-span-1">
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <Search size={20} />
        </button>
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <ShoppingCart size={20} />
        </button>
        {status === "loading" ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full "
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : status === "authenticated" ? (
          <div className="hs-tooltip [--trigger:click] [--placement:bottom] inline-block">
            <button
              type="button"
              className="hs-tooltip-toggle md:w-10 md:h-10 w-12 h-12 rounded-full cursor-pointer"
            >
              <img
                className="w-full h-full rounded-full cursor-pointer"
                src={data.user?.image || "/images/profiles/default-profile.jpg"}
                alt="User dropdown"
              />
            </button>

            <div
              role="tooltip"
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible transition-opacity opacity-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>{data.user?.name}</div>
                <div className="font-medium truncate">{data.user?.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="avatarButton"
              >
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                    Refer
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  onClick={() => {
                    signOut();
                  }}
                  type="button"
                  className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              signIn("google");
            }}
            className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 "
          >
            <User size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
