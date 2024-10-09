import { Calendar, MapPin } from "lucide-react";
import React from "react";

const Blogs = () => {
  return (
    <>
      <div className="w-full p-2 md:p-4">
        <div className="w-full font-bold flex items-center justify-center text-lg uppercase space-x-2 md:text-2xl mb-4">
          <p> Our Location</p> <MapPin size={20} />
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.7759796510247!2d-90.22322888465077!3d38.65533767961188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87df4dd34e5a2f97%3A0x61059d79e92e43ce!2sThe%20Food%20Gallery!5e0!3m2!1sen!2sus!4v1625125123456!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      <div className="w-full p-2 md:p-4">
        <div className="w-full font-bold flex items-center justify-center text-lg uppercase space-x-2 md:text-2xl mb-4">
          <p>Our Timings</p> <Calendar size={20} />
        </div>
        <div className="w-full bg-gray-200 rounded-md p-2 sm:p-3 md:p-4 lg:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <p className={"font-semibold opacity-50 "}>Monday, Closed</p>
          <p className={"font-semibold opacity-50"}>Tuesday, Closed</p>
          <p className={"font-semibold "}>Wednesday, 11 am–7 pm</p>
          <p className={"font-semibold "}>Thursday, 11 am–7 pm</p>
          <p className={"font-semibold "}>Friday, 11 am–8 pm</p>
          <p className={"font-semibold"}>Saturday, 11 am–8 pm</p>
          <p className={"font-semibold"}>Sunday, 11 am–6 pm</p>
        </div>
      </div>
    </>
  );
};

export default Blogs;
