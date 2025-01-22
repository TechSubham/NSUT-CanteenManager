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
import { Plus, Minus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const categories = ['All', 'Meals', 'Snacks', 'Beverages'];

const Menu = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      const mappedData = data.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        selling_price: item.selling_price,
        image_url: item.image_url,
        item_type: item.item_type
      }));
      setInventory(mappedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Update quantity in backend
  const updateQuantity = async (id, change) => {
    const itemToUpdate = inventory.find((item) => item.id === id);
    if (!itemToUpdate) return;

    const newQuantity = Math.max(0, itemToUpdate.quantity + change);

    try {
      const response = await fetch(`https://nsut-canteenmanagerbackend.onrender.com/menu-items/${id}/quantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      // Update local state after successful backend update
      const updatedItem = await response.json();
      setInventory(
        inventory.map((item) =>
          item.id === id ? { ...item, quantity: updatedItem.quantity } : item
        )
      );
      alert(`Successfully updated quantity for ${itemToUpdate.name}`);
    } catch (error) {
      console.error("Update error:", error);
      alert(`Error updating quantity: ${error.message}`);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://nsut-canteenmanagerbackend.onrender.com/menu-items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInventory(inventory.filter(item => item.id !== id));
        setDeleteDialogOpen(false);
        setItemToDelete(null);
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert(`Error deleting item: ${error.message}`);
    }
  };

  // Filter inventory based on category and search
  const filteredInventory = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || 
      item.item_type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center mt-28">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center mt-28">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-28 pb-16 px-4 md:px-6 lg:px-8">
        <div className="mb-6 ml-16 mx-auto flex gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-emerald-600 hover:bg-emerald-50"
              } transition-colors`}
            >
              {category}
            </button>
          ))}
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
                        src={item.image_url}
                        className="w-20 h-20 rounded-full object-cover"
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.item_type?.charAt(0).toUpperCase() + item.item_type?.slice(1)}
                  </TableCell>
                  <TableCell>₹{item.selling_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateQuantity(item.id, -1)}
                        variant="outline"
                        size="sm"
                        className="bg-amber-300 hover:bg-amber-200"
                        disabled={item.quantity <= 0}
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
                        onClick={() => {
                          setItemToDelete(item);
                          setDeleteDialogOpen(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="bg-red-300 hover:bg-red-200"
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {currentItems.length > 0 && (
          <div className="flex justify-between items-center px-4 mt-4">
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Are you sure you want to delete {itemToDelete?.name}?
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => itemToDelete && handleDelete(itemToDelete.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;