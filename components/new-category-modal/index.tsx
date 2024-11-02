import React, { use, useEffect } from "react";
import { Label, Modal, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { addNewCategory, updateCategoryName } from "@/app/actions";
import { ICategories } from "@/app/admin/page";
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

  const handleCreateNewCategory = async () => {
    setLoading(true);
    if (theCategory && theCategory._id) {
      try {
        const res: ICategories = await updateCategoryName(
          theCategory._id,
          category
        );
        if (res._id) {
          toast.success("Category updated successfully");
          setCategory("");
          handleRefreshCategories();
          handleCloseNewCategoryModal();
        } else {
          toast.error("An error occurred while updating the category");
        }
      } catch (error) {
        toast.error("An error occurred while updating the category");
      } finally {
        setLoading(false);
      }
    } else {
      if (!category) {
        toast.error("Category name is required");
      }
      try {
        await addNewCategory(category);
        toast.success("Category added successfully");
        setCategory("");
        handleRefreshCategories();
        handleCloseNewCategoryModal();
      } catch (error) {
        toast.error("An error occurred while adding the category");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setCategory(theCategory?.name || "");
  }, [theCategory]);

  return (
    <Modal
      dismissible
      show={openNewCategoryModal}
      onClose={handleCloseNewCategoryModal}
    >
      <Modal.Header>Add a new Category</Modal.Header>
      <Modal.Body>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="" />
          </div>
          <TextInput
            autoFocus
            onChange={(e) => setCategory(e.target.value)}
            id="category"
            type="text"
            placeholder="Burgers, Barbeques, Pizzas,.."
            required
            value={category}
          />
        </div>
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
          onClick={handleCloseNewCategoryModal}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCategoryModal;
