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
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

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
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div>
      <Navbar/>
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
                    src={"https://res.cloudinary.com/daa3y840x/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1735052125/i2_p4l78k.jpg"}
                    className="w-20 h-20 rounded-full" alt={item.name}
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
    <Footer/>
    </div>
  );
};

export default Menu;
