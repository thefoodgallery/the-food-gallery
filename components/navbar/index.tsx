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

const Navbar = () => {
  return (
    <div className="w-full px-2 flex md:grid md:grid-cols-4 md:px-6 py-3">
      <div className="w-full flex items-center justify-start sm:hidden">
        <button
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
          className="bg-black rounded-full h-10 w-10 flex items-center justify-center"
        >
          <Menu size={15} color="white" />
        </button>
        <div
          id="drawer-navigation"
          className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800"
          tabIndex={1}
          aria-labelledby="drawer-navigation-label"
        >
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-black uppercase dark:text-gray-400"
          >
            The Food Gallery
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Home size={20} />
                  <span className="ms-3">Home</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <Utensils size={20} />
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Menu
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Ramens
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Bowls
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      Burgers
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Pizza size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <Star size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Blogs</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MessageSquareCode size={20} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Testimonals
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
        <button className="flex items-center justify-center h-10 w-10 bg-black text-white rounded-full">
          <User size={15} color="white" />
        </button>
      </div>
      <div className="hidden justify-end items-center md:flex md:space-x-4 md:col-span-1">
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <Search size={20} />
        </button>
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <ShoppingCart size={20} />
        </button>
        <button className="flex items-center justify-center bg-black text-white rounded-full md:p-2 lg:p-3 ">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
