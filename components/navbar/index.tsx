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
            aria-label="Close"
            data-hs-overlay="#hs-offcanvas-example"
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
          <div className="hs-dropdown relative inline-flex">
            <button
              id="hs-dropdown-default"
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              {data.user?.name}
              <svg
                className="hs-dropdown-open:rotate-180 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-default"
            >
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Newsletter
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Purchases
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Downloads
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Team Account
              </a>
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
        {/* <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <Search size={20} />
        </button>
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <ShoppingCart size={20} />
        </button> */}
        {status === "loading" ? (
          <div
            className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full "
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : status === "authenticated" ? (
          <div className="hs-dropdown relative inline-flex">
            <button
              id="hs-dropdown-default"
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              {data.user?.name}
              <svg
                className="hs-dropdown-open:rotate-180 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-default"
            >
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Newsletter
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Purchases
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Downloads
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
              >
                Team Account
              </a>
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
