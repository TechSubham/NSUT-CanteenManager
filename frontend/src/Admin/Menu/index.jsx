import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Edit2, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  { id: 17, name: 'Maggi', category: 'Snacks', quantity: 5, unit: 'plates', price: 30 },
  { id: 18, name: 'Poha', category: 'Snacks', quantity: 3, unit: 'plates', price: 25 },
  { id: 19, name: 'Upma', category: 'Snacks', quantity: 1, unit: 'plates', price: 25 },
  { id: 20, name: 'Pav Bhaji', category: 'Snacks', quantity: 1, unit: 'plates', price: 45 }
];

const categories = ['All', 'Meals', 'Snacks', 'Beverages'];

const Menu = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Update filtered inventory based on category and search term
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 whenever filters or categories change
  }, [selectedCategory, searchTerm]);

  const updateQuantity = (id, change) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const startEditing = (id, currentQuantity) => {
    setEditingId(id);
    setEditValue(currentQuantity.toString());
  };

  const saveEdit = (id) => {
    const newQuantity = parseInt(editValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setInventory(
        inventory.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
    setEditingId(null);
    setEditValue("");
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="mt-28">
      <div className="mb-6 ml-16 mx-auto flex gap-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-emerald-600 hover:bg-emerald-50'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
        <Button
          onClick={() => navigate('/add')}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          Add New Item
        </Button>
      </div>
      <div className="mb-4 flex justify-center">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
      </div>
      <div className="mt-6 border max-w-[90%] mx-auto rounded-lg p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                    className="w-20 h-20 rounded-full" alt={item.name}
                    src={`data:image/jpeg;base64,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`}
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>₹{item.price}/{item.unit}</TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20"
                    />
                  ) : (
                    `${item.quantity} ${item.unit}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Button onClick={() => saveEdit(item.id)} variant="outline" size="sm">
                      Save
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateQuantity(item.id, -1)}
                        variant="outline"
                        size="sm"
                        className="bg-amber-300 hover:bg-amber-200"
                      >
                        <Minus size={16} />
                      </Button>
                      <Button
                        onClick={() => updateQuantity(item.id, 1)}
                        variant="outline"
                        size="sm"
                        className="bg-emerald-300 hover:bg-emerald-200"
                      >
                        <Plus size={16} />
                      </Button>
                      <Button
                        onClick={() => startEditing(item.id, item.quantity)}
                        variant="outline"
                        size="sm"
                        className="bg-purple-300 hover:bg-purple-200"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="bg-rose-300 hover:bg-rose-200"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex ml-16 mr-16 justify-between items-center mt-4 py-2">
        <div className="text-sm text-gray-500">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
