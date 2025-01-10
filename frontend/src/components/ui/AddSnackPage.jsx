import { useState } from "react";
import { useInventory } from "../../contexts/authContext/InventoryContext";

export default function AddSnackPage() {
  const { addSnack } = useInventory(); 
  const [snackName, setSnackName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSnack = {
      snackName,
      quantity,
      wholesalePrice,
      sellPrice,
      image,
    };

    // Add the new snack to the inventory
    addSnack(newSnack);

    // Show the popup after submitting
    setShowPopup(true);

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Reset form fields
    setSnackName("");
    setQuantity("");
    setWholesalePrice("");
    setSellPrice("");
    setImage(null);
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center border-4 border-green-500">
            <div className="text-green-500 text-6xl mb-4">
              <span role="img" aria-label="check mark">
                ✔️
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Snack Added</h2>
            <p className="text-gray-600">The snack has been successfully added to the inventory.</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Add New Snack</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg overflow-hidden flex"
      >
        {}
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

        {/* Input Fields */}
        <div className="w-2/3 p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Snack Name
            </label>
            <input
              type="text"
              value={snackName}
              onChange={(e) => setSnackName(e.target.value)}
              placeholder="Enter snack name"
              className="w-full border rounded-md px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full border rounded-md px-3 py-2 shadow-sm"
              required
            />
          </div>

          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">
                Wholesale Price (INR)
              </label>
              <input
                type="number"
                value={wholesalePrice}
                onChange={(e) => setWholesalePrice(e.target.value)}
                placeholder="Enter wholesale price"
                className="w-full border rounded-md px-3 py-2 shadow-sm"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-semibold mb-2">
                Selling Price (INR)
              </label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="Enter selling price"
                className="w-full border rounded-md px-3 py-2 shadow-sm"
                required
              />
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
