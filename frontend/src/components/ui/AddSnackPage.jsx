import { useState, useEffect } from "react";
import { useInventory } from "../../contexts/authContext/InventoryContext";
import { useForm } from "react-hook-form";

export default function AddSnackPage() {
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const category = ["Beverages", "Meals", "Snacks"];
  const { addSnack } = useInventory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = (data) => {
    const newSnack = {
      ...data,
      image,
    };

    addSnack(newSnack);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setImage(null);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border-4 border-green-500">
            <div className="text-green-500 text-6xl mb-4">
              <span role="img" aria-label="check mark">
                ✔️
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Snack Added</h2>
            <p className="text-gray-600">
              The snack has been successfully added to the inventory.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Add New Snack</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex"
      >
        {/* Image Upload */}
        <div className="w-1/3 bg-gray-100 p-4 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Snack Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <label className="w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-gray-500">Upload Snack Image</span>
            </label>
          )}
        </div>

        {/* Form Fields */}
        <div className="w-2/3 p-6">
          <div className="mb-4">
            <label htmlFor="snackName" className="block text-gray-700 font-semibold mb-2">
              Snack Name
            </label>
            <input
              type="text"
              id="snackName"
              placeholder="Enter snack name"
              className="w-full border rounded-md px-3 py-2 shadow-sm"
              {...register("snackName", { required: "Snack name is required" })}
            />
            {errors.snackName && (
              <span className="text-sm text-red-500">{errors.snackName.message}</span>
            )}
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                className="w-full border rounded-md px-3 py-2 shadow-sm"
                {...register("quantity", { required: "Quantity is required" })}
              />
              {errors.quantity && (
                <span className="text-sm text-red-500">{errors.quantity.message}</span>
              )}
            </div>
            <div className="w-1/2">
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                id="category"
                className="w-full border rounded-md px-2 py-2 shadow-sm"
                {...register("category", { required: "Category is required" })}
              >
                <option value="">Select Category</option>
                {category.map((ele, i) => (
                  <option key={i} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">{errors.category.message}</span>
              )}
            </div>
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="wholesalePrice"
                className="block text-gray-700 font-semibold mb-2"
              >
                Wholesale Price (INR)
              </label>
              <input
                type="number"
                id="wholesalePrice"
                placeholder="Enter wholesale price"
                className="w-full border rounded-md px-3 py-2 shadow-sm"
                {...register("wholesalePrice", {
                  required: "Wholesale price is required",
                })}
              />
              {errors.wholesalePrice && (
                <span className="text-sm text-red-500">{errors.wholesalePrice.message}</span>
              )}
            </div>

            <div className="w-1/2">
              <label
                htmlFor="sellPrice"
                className="block text-gray-700 font-semibold mb-2"
              >
                Selling Price (INR)
              </label>
              <input
                type="number"
                id="sellPrice"
                placeholder="Enter selling price"
                className="w-full border rounded-md px-3 py-2 shadow-sm"
                {...register("sellPrice", { required: "Selling price is required" })}
              />
              {errors.sellPrice && (
                <span className="text-sm text-red-500">{errors.sellPrice.message}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full"
          >
            Add Snack
          </button>
        </div>
      </form>
    </div>
  );
}
