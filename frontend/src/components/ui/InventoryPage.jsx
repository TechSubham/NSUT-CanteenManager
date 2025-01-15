import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, Package, Edit2 } from 'lucide-react';

const initialInventory = [
  // Meals
  { id: 1, name: 'Rice Plate', category: 'Meals', quantity: 2, unit: 'plates', price: 60 },
  { id: 2, name: 'Dal Fry', category: 'Meals', quantity: 2, unit: 'plates', price: 40 },
  { id: 3, name: 'Chole Bhature', category: 'Meals', quantity: 4, unit: 'plates', price: 50 },
  { id: 4, name: 'Veg Thali', category: 'Meals', quantity: 5, unit: 'plates', price: 80 },
  { id: 5, name: 'Paneer Butter Masala', category: 'Meals', quantity: 3, unit: 'plates', price: 90 },
  
  // Snacks
  { id: 6, name: 'Samosa', category: 'Snacks', quantity: 30, unit: 'pieces', price: 15 },
  { id: 7, name: 'Vada Pav', category: 'Snacks', quantity: 4, unit: 'pieces', price: 20 },
  { id: 8, name: 'Masala Dosa', category: 'Snacks', quantity: 12, unit: 'pieces', price: 40 },
  { id: 9, name: 'French Fries', category: 'Snacks', quantity: 25, unit: 'plates', price: 50 },
  { id: 10, name: 'Veg Sandwich', category: 'Snacks', quantity: 18, unit: 'pieces', price: 30 },
  
  // Beverages
  { id: 11, name: 'Tea', category: 'Beverages', quantity: 40, unit: 'cups', price: 12 },
  { id: 12, name: 'Coffee', category: 'Beverages', quantity: 2, unit: 'cups', price: 15 },
  { id: 13, name: 'Cold Coffee', category: 'Beverages', quantity: 8, unit: 'glasses', price: 40 },
  { id: 14, name: 'Mango Lassi', category: 'Beverages', quantity: 15, unit: 'glasses', price: 35 },
  { id: 15, name: 'Fresh Lime Soda', category: 'Beverages', quantity: 20, unit: 'glasses', price: 25 },
  { id: 16, name: 'Masala Chai', category: 'Beverages', quantity: 4, unit: 'cups', price: 15 },
  
  
  { id: 17, name: 'Maggi', category: 'Snacks', quantity: 5, unit: 'plates', price: 30 },
  { id: 18, name: 'Poha', category: 'Snacks', quantity: 3, unit: 'plates', price: 25 },
  { id: 19, name: 'Upma', category: 'Snacks', quantity: 1, unit: 'plates', price: 25 },
  { id: 20, name: 'Pav Bhaji', category: 'Snacks', quantity: 1, unit: 'plates', price: 45 }
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');


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

  const InventoryCard = ({ item, isLowStock }) => {
    const isEditing = editingId === item.id;
    
    return (
      <div className={`${isLowStock ? 'bg-white border border-red-200' : 'bg-gray-50'} p-4 rounded-lg shadow`}>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <span className="text-sm text-gray-500">{item.category}</span>
          </div>
          <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-emerald-600'}`}>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                  min="0"
                />
                <button
                  onClick={() => handleEdit(item.id)}
                  className="text-sm bg-emerald-100 px-2 py-1 rounded hover:bg-emerald-200"
                >
                  Save
                </button>
              </div>
            ) : (
              `${item.quantity} ${item.unit}`
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">₹{item.price}/{item.unit}</span>
          <div className="flex gap-2">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className={`p-1 rounded ${
                isLowStock ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
            >
              <Minus size={16} className={isLowStock ? 'text-red-600' : ''} />
            </button>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 transition-colors"
            >
              <Plus size={16} className="text-emerald-600" />
            </button>
            {!isEditing && (
              <button
                onClick={() => startEditing(item.id, item.quantity)}
                className="p-1 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <Edit2 size={16} className="text-blue-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-20">
      {lowStockItems.length > 0 && (
        <div className="mb-8 bg-red-50 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" />
            <h2 className="text-2xl font-bold text-red-800">Low Stock Alert</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map(item => (
              <InventoryCard key={item.id} item={item} isLowStock={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;