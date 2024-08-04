/* eslint-disable @next/next/no-img-element */
import React from "react";
import FaceBookIcon from "@/public/svg/facebook-svgrepo-com.svg";
import InstagramIcon from "@/public/svg/instagram-svgrepo-com.svg";
import TwitterIcon from "@/public/svg/twitter-svgrepo-com.svg";
import YoutubeIcon from "@/public/svg/youtube-circle-logo-svgrepo-com.svg";

const PageFooter = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img
                src="/images/assets/logo.png"
                className="h-10 me-3"
                alt="Logo"
              />
              <span className="self-center text-2xl md:text-xl font-semibold whitespace-nowrap">
                The Food Gallery
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Resources
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Menu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Order Online
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Youtube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                About
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Testimonals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="#" className="hover:underline">
              The Food Gallery™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900 h-5 w-5">
              <FaceBookIcon />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 ms-5 h-5 w-5"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 ms-5 h-5 w-5"
            >
              <TwitterIcon />

              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 ms-5 h-5 w-5"
            >
              <YoutubeIcon />
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
