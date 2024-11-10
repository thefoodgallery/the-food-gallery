import { ICategories, IMenu } from "@/app/admin/page";
import { FileInput, Label, Modal, Select } from "flowbite-react";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const NewMenuModal = ({
  openMenuModal,
  handleCloseMenuModal,
  menuItem,
  handleRefreshMenuItems,
  categories,
  catId = "",
}: {
  openMenuModal: boolean;
  handleCloseMenuModal: () => void;
  handleRefreshMenuItems: () => void;
  menuItem: any;
  categories: ICategories[];
  catId?: string;
}) => {
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<File | null>(null);
  const [menu, setMenu] = React.useState<IMenu | null>(null);

  useEffect(() => {
    if (catId) {
      setCategoryId(catId);
    }
    if (menuItem) {
      //   console.log(menuItem);
      const imagesData = JSON.parse(menuItem.images);
      const menuImage = imagesData[0].src;
      const imageurl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${menuImage}`;
      setMenu(menuItem);
      setName(menuItem.name);
      setPrice(menuItem.price);
      setCategoryId(menuItem.categoryId);
      setPreviewSrc(imageurl);
    }
  }, [menuItem, catId]);

  const handleCreateNewMenu = async () => {
    setLoading(true);
    if (menu && menu._id) {
      try {
        const formData = new FormData();
        if (name) formData.append("name", name);
        if (price && price > 0) formData.append("price", price.toString());
        if (categoryId) formData.append("categoryId", categoryId);
        if (image) {
          formData.append("image", image);
        }
        const res = await fetch(`/api/menu/${menu._id}`, {
          method: "PUT",
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          toast.success("Menu updated successfully");
          setName("");
          setPrice(0);
          setCategoryId("");
          setPreviewSrc(null);
          setImage(null);
          handleRefreshMenuItems();
          handleCloseModal();
        } else {
          toast.error("An error occurred while updating the menu");
        }
      } catch (error) {
        toast.error("An error occurred while updating the menu");
      } finally {
        setLoading(false);
      }
    } else {
      if (!name || !image || !categoryId || price <= 0) {
        toast.error("Menu name, image, price & category are required!");
        return;
      }
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("categoryId", categoryId);
        if (image) {
          formData.append("image", image);
        }

        const res = await fetch("/api/menu", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          toast.success("Menu added successfully");
          setName("");
          setPrice(0);
          setCategoryId("");
          setPreviewSrc(null);
          setImage(null);
          handleRefreshMenuItems();
          handleCloseModal();
        } else {
          toast.error("An error occurred while adding the menu");
        }
      } catch (error) {
        toast.error("An error occurred while adding the menu");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setMenu(null);
    setName("");
    setPrice(0);
    setCategoryId("");
    setPreviewSrc(null);
    setImage(null);
    setLoading(false);
    handleCloseMenuModal();
  };

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setPreviewSrc(null);
    setImage(null);
  };

  return (
    <Modal
      size={"xl"}
      dismissible
      show={openMenuModal}
      onClose={handleCloseModal}
    >
      <Modal.Header>Add a new Menu item</Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <div className="mb-1 block">
            <Label htmlFor="name" value="Menu Item Name" />
          </div>
          <input
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
            type="text"
            id="name"
            placeholder="Burger, Pizza,.."
            required
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3">
          <div className="mb-1 block">
            <Label htmlFor="price" value="Menu Item Price ($)" />
          </div>
          <input
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
            type="number"
            id="price"
            placeholder="20.00"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(parseFloat(e.target.value))
            }
            value={price}
          />
        </div>
        <div className="mb-3">
          {!previewSrc ? (
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-300 bg-gray-50 hover:bg-blue-100 hover:text-blue-500"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm ">
                    <span className="font-semibold">
                      Click to upload the menu image
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs ">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput
                  value={previewSrc || ""}
                  id="dropzone-file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleImageInput}
                />
              </Label>
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="relative flex items-center w-64 h-64 justify-center">
                <img
                  className="rounded-md object-contain w-64 h-64"
                  src={previewSrc || ""}
                  alt="categorythumbnail"
                />
                <button
                  onClick={handleDelete}
                  className="absolute flex items-center justify-center top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                >
                  <Trash2 size={20} color="#FFF" />
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mb-3">
          <div className="mb-1 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <Select
            className="focus:ring-blue-500 focus:border-blue-500 w-full  border-gray-300 rounded-md"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            id="category"
            required
          >
            {categories.map((cat) => {
              return (
                <option
                  disabled={cat.status === "inactive"}
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              );
            })}
          </Select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-green-500 hover:bg-green-700 px-3 py-2 flex items-center justify-center text-sm text-white rounded-md"
          onClick={handleCreateNewMenu}
        >
          {loading && menu?._id
            ? "Updating..."
            : loading && !menu?._id
            ? "Creating..."
            : !loading && menu?._id
            ? "Update"
            : "Add"}
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 px-3 py-2 flex items-center justify-center text-sm text-white rounded-md"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewMenuModal;
