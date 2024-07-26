import React from "react";
import FaceBookIcon from "@/public/svg/facebook-svgrepo-com.svg";
import InstagramIcon from "@/public/svg/instagram-svgrepo-com.svg";
import TwitterIcon from "@/public/svg/twitter-svgrepo-com.svg";
import YoutubeIcon from "@/public/svg/youtube-circle-logo-svgrepo-com.svg";
import ShareIcon from "@/public/svg/files-folder-friends-svgrepo-com.svg";

function SocialLinks() {
  return (
    <div className="fixed opacity-50 hover:opacity-100 transition-opacity top-[40%] right-0 flex flex-col p-1 space-y-1 bg-white">
      <a
        href="#"
        className="text-blue-500 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
      >
        <FaceBookIcon />
      </a>
      <a
        href="#"
        className="text-blue-500 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
      >
        <InstagramIcon />
      </a>
      <a
        href="#"
        className="text-blue-500 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
      >
        <TwitterIcon />
      </a>
      <a
        href="#"
        className="text-blue-500 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
      >
        <YoutubeIcon />
      </a>
      <a
        href="#"
        className="text-blue-500 h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
      >
        <ShareIcon />
      </a>
    </div>
  );
}

export default SocialLinks;
