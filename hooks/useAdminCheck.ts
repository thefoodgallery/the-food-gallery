import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Assuming you use NextAuth for session management
import toast from "react-hot-toast";

const useAdminCheck = () => {
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID; // adminId from environment variables
  const { status, data } = useSession();

  const [isAdmin, setIsAdmin] = useState(false); // Whether the user is an admin
  const [isLoading, setIsLoading] = useState(true); // Whether the API request is in progress
  const [isError, setIsError] = useState(false); // Whether there was an error fetching user data

  useEffect(() => {
    const checkAdmin = async () => {
      if (status === "loading") {
        // If session is loading, set isLoading to true
        setIsLoading(true);
        setIsAdmin(false);
        setIsError(false);
        return;
      }

      if (status === "authenticated" && data?.user?.email) {
        try {
          // Making the API request to check if the user is an admin
          const res = await fetch(`/api/user/${data.user.email}`);
          const user = await res.json();

          if (res.ok && user?.id === adminId) {
            setIsAdmin(true); // Set admin state if the user is an admin
          } else {
            setIsAdmin(false); // Otherwise, not an admin
            // toast.error("You are not an admin");
          }

          setIsLoading(false); // API call is complete, loading is false
        } catch (error) {
          console.error("Error fetching user info:", error);
          setIsError(true); // Set error state on failure
          setIsLoading(false); // Stop loading
        }
      } else {
        setIsError(true); // If user is not authenticated
        setIsAdmin(false); // Not an admin if not authenticated
        setIsLoading(false); // Stop loading
        // toast.error("You are not authenticated as an admin");
      }
    };

    checkAdmin();
  }, [status, data, adminId]);

  return { isAdmin, isLoading, isError };
};

export default useAdminCheck;
