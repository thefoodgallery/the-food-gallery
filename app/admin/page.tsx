"use client";
import { deactivateCategory, getCategories, getUserInfo } from "@/app/actions";
import NewCategoryModal from "@/components/new-category-modal";
import { Spinner, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export interface ICategories {
  _id: string;
  name: string;
  status: string;
  __v: number;
}

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [categories, setCategories] = React.useState<ICategories[]>([]);
  const { data, status } = useSession();
  const router = useRouter();
  const [openNewCategoryModal, setOpenNewCategoryModal] = React.useState(false);
  const handleCloseNewCategoryModal = () => setOpenNewCategoryModal(false);
  const handleOpenNewCategoryModal = () => setOpenNewCategoryModal(true);
  const [searchCategories, setSearchCategories] = React.useState("");
  const [categoriesActivateLoading, setCategoriesActivateLoading] =
    React.useState(false);
  const [theCategory, setTheCategory] = React.useState<ICategories | null>(
    null
  );
  const handleUpdateCategory = (category: ICategories) => {
    setTheCategory(category);
    handleOpenNewCategoryModal();
  };

  const handleRefreshCategories = async () => {
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
  };

  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
  useEffect(() => {
    const checkAdmin = async () => {
      if (status !== "loading" && status === "authenticated" && data.user) {
        if (data.user?.email) {
          const res = await getUserInfo(data.user.email);
          if (res?._id === adminId) {
            setIsAdmin(true);
            handleRefreshCategories();
          } else {
            toast.error("You are not an admin");
            router.push("/");
          }
        }
      } else if (status === "loading") {
        setIsAdmin(false);
      } else {
        toast.error("You are not authenticated");
        router.push("/");
      }
    };
    checkAdmin();
  }, [data, status]);

  const handleCategory = useCallback(
    async (id: string, status: "active" | "inactive") => {
      setCategoriesActivateLoading(true);
      try {
        const res: ICategories = await deactivateCategory(id, status);
        // console.log(res);
        if (res._id) {
          if (res.status === "active") {
            toast.success("Category activated successfully");
          } else {
            toast.success("Category deactivated successfully");
          }
          handleRefreshCategories();
        } else {
          toast.error("Failed to deactivate category");
        }
      } catch (error) {
        toast.error("An error occurred while deactivating the category");
      } finally {
        setCategoriesActivateLoading(false);
      }
    },
    [setCategoriesActivateLoading, handleRefreshCategories]
  );

  const filteredCategories = useCallback(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchCategories.toLowerCase())
      ),
    [categories, searchCategories]
  )();

  return !isAdmin || status === "loading" ? (
    <div className="w-full border border-blue-500 h-[600px] flex items-center justify-center">
      <Spinner size="xl" />
    </div>
  ) : (
    <>
      <div className="w-full px-7">
        <div className="border border-gray-200 rounded-md bg-blue-50 px-5 py-5">
          <div className="w-full flex items-center justify-between mb-5 border-b border-gray-200 pb-2">
            <div className="text-xl font-semibold">
              Manage Menu & Categories
            </div>

            <div className="flex items-center space-x-2">
              <TextInput
                value={searchCategories}
                onChange={(e) => setSearchCategories(e.target.value)}
                type="search"
                placeholder="Search a category"
                className="h-10"
              />
              <button
                onClick={handleOpenNewCategoryModal}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded-md h-10"
              >
                Add Category
              </button>
            </div>
          </div>
          <div className="w-full h-[300px] overflow-y-auto">
            {filteredCategories.map((category) => {
              return (
                <div
                  key={category._id}
                  className="w-full border border-gray-200 bg-green-100 flex items-center justify-between space-x-3 rounded-md p-2 mb-2"
                >
                  <div className="text-lg font-normal">{category.name}</div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-green-500 hover:bg-green-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md">
                      Add a dish
                    </button>
                    <button
                      onClick={() => handleUpdateCategory(category)}
                      className="bg-blue-500 hover:bg-blue-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md"
                    >
                      Update
                    </button>
                    {category.status === "active" ? (
                      <button
                        onClick={() => handleCategory(category._id, "inactive")}
                        className="bg-red-500 hover:bg-red-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md"
                      >
                        {"De Activate"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCategory(category._id, "active")}
                        className="bg-green-500 hover:bg-green-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md"
                      >
                        {"Activate"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <NewCategoryModal
        theCategory={theCategory}
        handleRefreshCategories={handleRefreshCategories}
        openNewCategoryModal={openNewCategoryModal}
        handleCloseNewCategoryModal={handleCloseNewCategoryModal}
      />
    </>
  );
};

export default AdminPanel;
