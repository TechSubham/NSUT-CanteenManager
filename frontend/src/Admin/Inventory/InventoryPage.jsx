import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import InventoryCard from './InventoryCard';
import { AlertTriangle } from 'lucide-react';
import Footer from '@/components/ui/Footer';
import toast from 'react-hot-toast';
import { useFood } from "@/contexts/BackendContext/FoodContext";

const initialInventory = [
  { id: 1, name: 'Rice Plate', category: 'Meals', quantity: 2, unit: 'plates', price: 60 },
];

const InventoryPage = () => {
  const { menuItems, loading, error } = useFood();
  const [inventory, setInventory] = useState(menuItems.menu || initialInventory);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loading) {
      toast.loading("Loading menu items...");
    }
  }, [loading]);

  useEffect(() => {
    if (menuItems.menu) {
      setInventory(menuItems.menu);
      toast.dismiss(); 
    }
  }, [menuItems]);

  const lowStockItems = inventory.filter(item => item.quantity < 10);

  const updateQuantity = async (id, change) => {
    const itemToUpdate = inventory.find((item) => item.id === id);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(0, itemToUpdate.quantity + change);
    try {
      const response = await fetch(`http://localhost:8080/menu-items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      const data = await response.json();
      console.log("Update response:", data);
      
      if (response.ok) {
        setInventory(
          inventory.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        toast.success("Quantity updated successfully!");
      } else {
        throw new Error(data.message || "Failed to update quantity.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message);
    }
  };

  const startEditing = (id, currentQuantity) => {
    setEditingId(id);
    setEditValue(currentQuantity.toString());
  };

  const handleEdit = async (id) => {
    const newQuantity = parseInt(editValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      try {
        const response = await fetch(`http://localhost:8080/menu-items/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        
        const data = await response.json();
        console.log("Save edit response:", data);
        
        if (response.ok) {
          setInventory(
            inventory.map((item) =>
              item.id === id ? { ...item, quantity: newQuantity } : item
            )
          );
          toast.success("Quantity updated successfully!");
        } else {
          throw new Error(data.message || "Failed to update quantity.");
        }
      } catch (error) {
        console.error("Save edit error:", error);
        toast.error(error.message);
      }
    } else {
      toast.error("Invalid quantity. Please enter a valid number.");
    }
    setEditingId(null);
    setEditValue("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-20">
        {lowStockItems.length > 0 ? (
          <div className="mb-8 bg-red-50 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-red-500" />
              <h2 className="text-2xl font-bold text-red-800">Low Stock Alert</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockItems.map(item => (
                <InventoryCard
                  key={item.id}
                  item={item}
                  isLowStock={true}
                  updateQuantity={updateQuantity}
                  startEditing={startEditing}
                  handleEdit={handleEdit}
                  editingId={editingId}
                  editValue={editValue}
                  setEditValue={setEditValue}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-green-50 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-800">Stock is Full</h2>
            <p>No items are running low on stock.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InventoryPage;
