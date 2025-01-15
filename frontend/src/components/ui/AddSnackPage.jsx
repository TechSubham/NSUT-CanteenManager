import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFood } from "@/contexts/BackendContext/FoodContext";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function AddSnackPage() {
  const navigate=useNavigate();
  const { addBeverage, addMeal, addSnack } = useFood();
  const [image, setImage] = useState(null);
  const [showDialog, setShowDialog] = useState(false); // Controls the alert dialog
  const category = ["Beverages", "Meals", "Snacks"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (data) => {
    const newSnack = { ...data, image };
    toast.loading("Adding item...");
    try {
      let response;
      if (newSnack.category === "Beverages") {
        response = await addBeverage(newSnack);
      } else if (newSnack.category === "Meals") {
        response = await addMeal(newSnack);
      } else if (newSnack.category === "Snacks") {
        response = await addSnack(newSnack);
      }
      if(response.status==200 || response.status==201){
      toast.dismiss();
      toast.success("Item added successfully!");
    }
      console.log("Item added:", response);

      setShowDialog(true); 
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to add the item. Please try again.");
      console.log("Error is ",error);
      console.error("Error adding item:", err);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setImage(null);
    }
  }, [isSubmitSuccessful, reset]);
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto px-4 mt-20 py-8">
      {showDialog && (
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Item Added Successfully</AlertDialogTitle>
              <AlertDialogDescription>
                The item has been successfully added to the menu!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
  Add another item
</AlertDialogCancel>
<AlertDialogCancel onClick={() => navigate('/homepage')}>
  Go to inventory page
</AlertDialogCancel>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex"
      >
        {/* Image Upload */}
        <div className="w-1/3 bg-gray-100 p-4 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Item Preview"
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
              <span className="text-gray-500 font-bold">
                Upload Item Image
              </span>
            </label>
          )}
        </div>

        {/* Form Fields */}
        <div className="w-2/3 p-6">
          <div className="mb-4">
            <label htmlFor="snackName" className="block text-gray-700 font-semibold mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="snackName"
              placeholder="Enter item name"
              className="w-full border rounded-md px-3 py-2 shadow-sm"
              {...register("snackName", { required: "Item name is required" })}
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
            Add Item
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </div>
  );
}
