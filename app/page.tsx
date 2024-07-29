/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Philosopher } from "next/font/google";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <div className="p-2 md:p-4 lg:p-8">
        <video
          autoPlay
          controls={false}
          muted
          loop
          className="w-full h-auto"
          src="/videos/intro.mp4"
        ></video>
      </div>
      {/*  */}
      <div className="p-2 w-full flex h-48 sm:h-auto md:p-4 lg:p-8">
        <img
          className="w-1/3 object-cover"
          src="/images/assets/owners.jpg"
          alt="owners"
        />
        <div
          style={{
            fontFamily: philosopher.className,
            background:
              "linear-gradient(221deg, rgba(233,234,236,1) 0%, rgba(8,10,14,1) 53%)",
          }}
          className="w-2/3 flex justify-center items-center"
        >
          <div className="w-full block p-2">
            <div className="w-full flex items-center justify-center mb-1 md:mb-2 lg:mb-4">
              <p className="text-xs md:text-lg lg:text-2xl text-white font-bold uppercase">
                welcome
              </p>
            </div>
            <div className="w-full flex items-center justify-center mb-1 md:mb-2 lg:mb-4">
              <p className="text-sm md:text-2xl lg:text-4xl text-white font-bold uppercase">
                taste the adventure
              </p>
            </div>
            <div className="w-full flex items-center justify-center md:mb-1">
              <p className="text-xs text-center md:text-lg lg:text-2xl text-white font-bold uppercase">
                embark on a culinary journey with the
              </p>
            </div>
            <div className="w-full flex items-center justify-center md:mb-1">
              <p className="text-xs text-center md:text-lg lg:text-2xl text-white font-bold uppercase">
                bold flavors and exotic dishes at
              </p>
            </div>
            <div className="w-full flex items-center justify-center md:mb-1">
              <p className="text-xs text-center  md:text-lg lg:text-2xl text-white font-bold uppercase">
                the food gallery
              </p>
            </div>
            <div className="w-full flex items-center justify-center mt-1 md:mt-2 lg:mt-4">
              <button className="text-xs md:text-lg lg:text-2xl font-bold uppercase rounded-full p-1 md:p-2 lg:p-5 bg-white text-black">
                make reservation
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-full p-2 block md:flex md:space-x-2 lg:space-x-5 md:p-4 lg:p-8">
        <div className="w-full md:w-1/3">
          <p className="w-full font-bold text-center flex justify-center uppercase text-sm md:text-lg lg:text-2xl mb-2">
            experience the food gallery
          </p>
          <img
            className="object-cover w-full"
            src="/images/assets/bowlcrablamb.jpg"
          />
        </div>
        <div className="w-full mt-2 md:mt-0 md:w-2/3 md:px-2 lg:px-6 flex items-center text-center">
          <div>
            <p className="text-xl font-bold lg:text-2xl md:mb-3 lg:mb-5">
              Our Philosophy
            </p>
            <p className="text-sm md:text-lg md:px-1 lg:text-xl lg:px-6">
              At Food Gallery, we believe that great food and great company go
              hand in hand. Our mission is to create memorable dining
              experiences by providing exceptional services and delecius
              cuisine. We are committed to using only the fresh ingredients and
              supporting local farmers and suppliers.
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-full text-center tracking-normal text-sm flex items-center font-semibold md:font-light justify-center md:text-lg lg:text-2xl md:tracking-wide lg:tracking-widest uppercase p-4">
        a picture is worth a thousand bites: explore the foodgallery&apos;s
        culinary delights
      </div>
      <div className="grid grid-cols-3 gap-2 p-2 md:gap-5 md:p-4 lg:p-8">
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/burger.jpg" alt="" />
        </div>
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/lambchops.jpg" alt="" />
        </div>
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/bowlcrablamb.jpg" alt="" />
        </div>
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/ramen.jpg" alt="" />
        </div>
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/crab.jpg" alt="" />
        </div>
        <div className="cols-span-1 h-full w-full">
          <img src="/images/assets/buffet.jpg" alt="" />
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Dropdown button
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}
