"use client";
import { getUserInfo } from "@/app/actions";
import NewCategoryModal from "@/components/new-category-modal";
import { Spinner, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { Shield } from "lucide-react";
import NewMenuModal from "@/components/new-menu-modal";

export interface ICategories {
  _id: string;
  name: string;
  status: string;
  image: string;
  __v: number;
}

export interface IMenu {
  _id: string;
  name: string;
  images: { src: string; alt: string }[];
  price: number;
  categoryId: string;
  status: string;
  __v: number;
}

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [categories, setCategories] = React.useState<ICategories[]>([]);
  const { data, status } = useSession();
  const router = useRouter();
  const [openNewCategoryModal, setOpenNewCategoryModal] = React.useState(false);
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
  const handleCloseNewCategoryModal = () => {
    setTheCategory(null);
    setOpenNewCategoryModal(false);
  };

  const handleRefreshCategories = useCallback(async () => {
    const updatedCategories = await fetch("/api/categories", { method: "GET" });
    if (updatedCategories.ok) {
      const data = await updatedCategories.json();
      setCategories(data);
    }
  }, [setCategories]);

  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
  useEffect(() => {
    const checkAdmin = async () => {
      if (status !== "loading" && status === "authenticated" && data.user) {
        if (data.user?.email) {
          const res = await getUserInfo(data.user.email);
          if (res?._id === adminId) {
            setIsAdmin(true);
            handleRefreshCategories();
            handleRefreshMenuItems();
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
  }, [data, status, handleRefreshCategories, adminId, router]);

  const handleCategory = useCallback(
    async (id: string, status: "active" | "inactive") => {
      try {
        const formData = new FormData();
        formData.append("status", status);
        const res = await fetch(`/api/categories/${id}`, {
          method: "PUT",
          body: formData,
        });
        // console.log(res);
        if (res.ok) {
          const result = await res.json();
          // console.log(result);
          if (result?.data?.status === "active") {
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
      }
    },
    [handleRefreshCategories]
  );

  const filteredCategories = useCallback(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchCategories.toLowerCase())
      ),
    [categories, searchCategories]
  )();
  const [menu, setMenu] = React.useState<IMenu[] | null>([]);
  const [openMenuModal, setOpenMenuModal] = React.useState(false);
  const [menuItem, setMenuItem] = React.useState<IMenu | null>(null);
  const handleOpenMenuModal = () => setOpenMenuModal(true);
  const handleCloseMenuModal = () => setOpenMenuModal(false);
  const [searchMenu, setSearchMenu] = React.useState("");

  const handleRefreshMenuItems = useCallback(async () => {
    const updatedMenuItems = await fetch("/api/menu", { method: "GET" });
    if (updatedMenuItems.ok) {
      const data = await updatedMenuItems.json();
      setMenu(data);
    }
  }, []);

  const handleUpdateMenuItem = (menu: IMenu) => {
    setMenuItem(menu);
    handleOpenMenuModal();
  };

  const filteredMenuItems = useCallback(
    () =>
      menu?.filter((menuItem) =>
        menuItem.name.toLowerCase().includes(searchMenu.toLowerCase())
      ),
    [menu, searchMenu]
  )();

  const handleMenu = useCallback(
    async (id: string, status: "active" | "inactive") => {
      try {
        // console.log(id);
        const formData = new FormData();
        formData.append("status", status);
        const res = await fetch(`/api/menu/${id}`, {
          method: "PUT",
          body: formData,
        });
        // console.log(res);
        if (res.ok) {
          const result = await res.json();
          // console.log(result);
          if (result?.data?.status === "active") {
            toast.success("Menu activated successfully");
          } else {
            toast.success("Menu deactivated successfully");
          }
          handleRefreshMenuItems();
        } else {
          toast.error("Failed to deactivate menu");
        }
      } catch (error) {
        toast.error("An error occurred while deactivating the menu");
      } finally {
      }
    },
    [handleRefreshMenuItems]
  );

  return !isAdmin || status === "loading" ? (
    <div className="w-full h-[600px] flex items-center justify-center">
      <Spinner size="xl" />
    </div>
  ) : (
    <>
      <div className="w-full px-7">
        <div className="w-full flex items-center justify-center space-x-2 mb-5 border-b text-green-500 border-gray-200 pb-2">
          <Shield size={25} />{" "}
          <div className="text-xl font-semibold">Admin Panel</div>
        </div>
        <div className="border border-gray-200 rounded-md bg-gray-50 px-5 py-5 mb-3">
          <div className="w-full flex items-center justify-between mb-5 border-b border-gray-200 pb-2">
            <div className="text-xl font-semibold">Manage Categories</div>

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
                  className="w-full border border-gray-200 bg-gray-100 flex items-center justify-between space-x-3 rounded-md p-2 mb-2"
                >
                  <div className="text-sm font-normal">{category.name}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={category.status === "inactive"}
                      className="bg-green-500 hover:bg-green-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md disabled:opacity-50"
                    >
                      Add a dish
                    </button>
                    <button
                      disabled={category.status === "inactive"}
                      onClick={() => handleUpdateCategory(category)}
                      className="bg-blue-500 hover:bg-blue-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md disabled:opacity-50"
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
        <div className="border border-gray-200 rounded-md bg-gray-50 px-5 py-5">
          <div className="w-full flex items-center justify-between mb-5 border-b border-gray-200 pb-2">
            <div className="text-xl font-semibold">Manage Menu Items</div>

            <div className="flex items-center space-x-2">
              <TextInput
                value={searchMenu}
                onChange={(e) => setSearchMenu(e.target.value)}
                type="search"
                placeholder="Search a menu item"
                className="h-10"
              />
              <button
                onClick={handleOpenMenuModal}
                className="bg-green-500 text-white text-sm px-3 py-1 rounded-md h-10"
              >
                Add menu item
              </button>
            </div>
          </div>
          <div className="w-full h-[300px] overflow-y-auto">
            {filteredMenuItems?.map((menu) => {
              return (
                <div
                  key={menu._id}
                  className="w-full border border-gray-200 bg-gray-100 flex items-center justify-between space-x-3 rounded-md p-2 mb-2"
                >
                  <div className="text-sm font-normal">{menu.name}</div>
                  <div className="flex items-center space-x-2">
                    {/* <button
                      disabled={menu.status === "inactive"}
                      className="bg-green-500 hover:bg-green-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md disabled:opacity-50"
                    >
                      Add a dish
                    </button> */}
                    <button
                      disabled={menu.status === "inactive"}
                      onClick={() => handleUpdateMenuItem(menu)}
                      className="bg-blue-500 hover:bg-blue-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md disabled:opacity-50"
                    >
                      Update
                    </button>
                    {menu.status === "active" ? (
                      <button
                        onClick={() => handleMenu(menu._id, "inactive")}
                        className="bg-red-500 hover:bg-red-700 px-2 py-1 flex items-center justify-center text-xs text-white rounded-md"
                      >
                        {"De Activate"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMenu(menu._id, "active")}
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
      <NewMenuModal
        openMenuModal={openMenuModal}
        handleCloseMenuModal={handleCloseMenuModal}
        categories={filteredCategories}
        handleRefreshMenuItems={handleRefreshMenuItems}
        menuItem={menuItem}
      />
    </>
  );
};

export default AdminPanel;
