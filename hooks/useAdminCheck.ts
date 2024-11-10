import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Assuming you use NextAuth for session management
import toast from "react-hot-toast";
import { getUserInfo } from "@/app/actions";

const useAdminCheck = () => {
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
  const { status, data } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (status !== "loading" && status === "authenticated" && data?.user) {
        if (data.user?.email) {
          const res = await getUserInfo(data.user.email);
          if (res?._id === adminId) {
            setIsAdmin(true);
            // You can call other functions here if necessary
          } else {
            toast.error("You are not an admin");
          }
        }
      } else if (status === "loading") {
        setIsAdmin(false);
      } else {
        toast.error("You are not authenticated");
      }
    };

    checkAdmin();
  }, [status, data, adminId]);

  return isAdmin;
};

export default useAdminCheck;
