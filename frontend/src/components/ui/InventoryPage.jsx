import React from 'react';
import { useInventory } from "../../contexts/authContext/InventoryContext";

const InventoryPage = () => {
  const { inventory } = useInventory();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inventory</h1>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <ul className="p-6 space-y-6">
          {inventory.map((snack, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              style={{ marginBottom: "10px" }}
            >
              <div className="flex flex-col items-center mr-6">
                <img
                  src={snack.image}
                  alt={snack.snackName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="font-semibold text-center mt-2">{snack.snackName}</div>
              </div>

              <div className="flex-1 flex justify-end items-center">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Quantity</div>
                  <div className="font-semibold">{snack.quantity}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryPage;
