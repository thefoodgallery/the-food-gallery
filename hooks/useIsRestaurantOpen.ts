import { useState, useEffect } from "react";
import moment from "moment-timezone";

const useIsRestaurantOpen = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = moment().tz("America/Chicago");
      const day = now.format("dddd");
      const currentTime = now.format("HH:mm");

      // Restaurant schedule
      const timings: { [key: string]: { open: string; close: string } } = {
        Saturday: { open: "11:00", close: "20:00" },
        Sunday: { open: "11:00", close: "18:00" },
        Monday: { open: "00:00", close: "00:00" },
        Tuesday: { open: "00:00", close: "00:00" },
        Wednesday: { open: "11:00", close: "19:00" },
        Thursday: { open: "11:00", close: "19:00" },
        Friday: { open: "11:00", close: "20:00" },
      };

      const todaySchedule = timings[day];
      const isWithinHours =
        currentTime >= todaySchedule.open && currentTime <= todaySchedule.close;

      setIsOpen(isWithinHours);
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // Recheck every minute

    return () => clearInterval(interval);
  }, []);

  return isOpen;
};

export default useIsRestaurantOpen;
