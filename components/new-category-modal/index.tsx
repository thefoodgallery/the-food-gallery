/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Label, Modal, FileInput } from "flowbite-react";
import toast from "react-hot-toast";
import { ICategories } from "@/app/admin/page";
import { Trash2 } from "lucide-react";

const NewCategoryModal = ({
  openNewCategoryModal,
  handleCloseNewCategoryModal,
  handleRefreshCategories,
  theCategory,
}: {
  openNewCategoryModal: boolean;
  handleCloseNewCategoryModal: () => void;
  handleRefreshCategories: () => void;
  theCategory: ICategories | null;
}) => {
  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);
  const [image, setImage] = React.useState<File | null>(null);

  const handleCreateNewCategory = async () => {
    setLoading(true);
    if (theCategory && theCategory._id) {
      try {
        const formData = new FormData();
        formData.append("name", category);
        if (image) {
          formData.append("image", image);
        }
        const res = await fetch(`/api/categories/${theCategory._id}`, {
          method: "PUT",
          body: formData,
        });

        if (res.ok) {
          const result = await res.json();
          toast.success("Category updated successfully");
          setCategory("");
          handleRefreshCategories();
          handleCloseModal();
        } else {
          toast.error("An error occurred while updating the category");
        }
      } catch (error) {
        toast.error("An error occurred while updating the category");
      } finally {
        setLoading(false);
      }
    } else {
      if (!category || !image) {
        toast.error("Category name & image are required!");
        return;
      }
      try {
        const formData = new FormData();

        formData.append("name", category);
        if (image) {
          formData.append("image", image);
        }

        const response = await fetch("/api/categories", {
          method: "POST",
          body: formData,
        });

        // console.log(response);
        if (response.ok) {
          toast.success("Category added successfully");
          setCategory("");
          handleRefreshCategories();
          handleCloseModal();
        } else {
          toast.error("An API error occurred while adding the category");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while adding the category");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setCategory(theCategory?.name || "");
    const imageurl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${theCategory?.image}`;
    setPreviewSrc(imageurl);
  }, [theCategory]);

  const handleImageInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrc(reader.result as string | null);
      };
    }
  };

  const handleDelete = () => {
    setImage(null);
    setPreviewSrc(null);
  };

  const handleCloseModal = () => {
    setCategory("");
    setPreviewSrc(null);
    setImage(null);
    handleCloseNewCategoryModal();
  };
  return (
    <Modal
      size={"lg"}
      dismissible
      show={openNewCategoryModal}
      onClose={handleCloseModal}
    >
      <Modal.Header>Add a new Category</Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <div className="mb-2 block">
            <Label htmlFor="category" value="" />
          </div>
          <input
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg"
            type="text"
            id="category"
            placeholder="Burgers, Barbeques, Pizzas,.."
            required
            autoFocus
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
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
                    Click to upload the category image
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
      </Modal.Body>
      <Modal.Footer>
        <button
          className="bg-green-500 hover:bg-green-700 px-3 py-2 flex items-center justify-center text-sm text-white rounded-md"
          onClick={handleCreateNewCategory}
        >
          {loading && theCategory?._id
            ? "Updating..."
            : loading && !theCategory?._id
            ? "Creating..."
            : !loading && theCategory?._id
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

export default NewCategoryModal;
