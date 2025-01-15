import React, { useState,useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import InventoryCard from './InventoryCard';
import { AlertTriangle } from 'lucide-react';
import Footer from '@/components/ui/Footer';
const initialInventory = [
  { id: 1, name: 'Rice Plate', category: 'Meals', quantity: 2, unit: 'plates', price: 60 },
  { id: 2, name: 'Dal Fry', category: 'Meals', quantity: 2, unit: 'plates', price: 40 },
  { id: 3, name: 'Chole Bhature', category: 'Meals', quantity: 4, unit: 'plates', price: 50 },
  { id: 4, name: 'Veg Thali', category: 'Meals', quantity: 5, unit: 'plates', price: 80 },
  { id: 5, name: 'Paneer Butter Masala', category: 'Meals', quantity: 3, unit: 'plates', price: 90 },
  { id: 6, name: 'Samosa', category: 'Snacks', quantity: 30, unit: 'pieces', price: 15 },
  { id: 7, name: 'Vada Pav', category: 'Snacks', quantity: 4, unit: 'pieces', price: 20 },
  { id: 8, name: 'Masala Dosa', category: 'Snacks', quantity: 12, unit: 'pieces', price: 40 },
  { id: 9, name: 'French Fries', category: 'Snacks', quantity: 25, unit: 'plates', price: 50 },
  { id: 10, name: 'Veg Sandwich', category: 'Snacks', quantity: 18, unit: 'pieces', price: 30 },
  { id: 11, name: 'Tea', category: 'Beverages', quantity: 40, unit: 'cups', price: 12 },
  { id: 12, name: 'Coffee', category: 'Beverages', quantity: 2, unit: 'cups', price: 15 },
  { id: 13, name: 'Cold Coffee', category: 'Beverages', quantity: 8, unit: 'glasses', price: 40 },
  { id: 14, name: 'Mango Lassi', category: 'Beverages', quantity: 15, unit: 'glasses', price: 35 },
  { id: 15, name: 'Fresh Lime Soda', category: 'Beverages', quantity: 20, unit: 'glasses', price: 25 },
  { id: 16, name: 'Masala Chai', category: 'Beverages', quantity: 4, unit: 'cups', price: 15 },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const lowStockItems = inventory.filter(item => item.quantity < 5);

  const updateQuantity = (id, change) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity < 0) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const startEditing = (id, currentQuantity) => {
    setEditingId(id);
    setEditValue(currentQuantity.toString());
  };

  const handleEdit = (id) => {
    const newQuantity = parseInt(editValue);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setInventory(inventory.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-8 mt-20">
        {lowStockItems.length > 0 && (
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
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default InventoryPage;
