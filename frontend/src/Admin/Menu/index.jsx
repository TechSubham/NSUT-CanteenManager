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
import { useFood } from "@/contexts/BackendContext/FoodContext";
import toast from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";

const categories = ['All', 'Meals', 'Snacks', 'Beverages'];

const Menu = () => {
  const { menuItems, loading, error } = useFood();
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [isMobileView,setIsMobileView]=useState(window.innerWidth<768)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (menuItems && Array.isArray(menuItems)) {
      setInventory(menuItems);
    } else if (menuItems && menuItems.menu && Array.isArray(menuItems.menu)) {
      setInventory(menuItems.menu);
    }
  }, [menuItems]);

  useEffect(() => {
    console.log("Raw menuItems:", menuItems);
    console.log("Current inventory:", inventory);
  }, [menuItems, inventory]);

  const filteredInventory = inventory.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || 
      item.item_type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

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

  const saveEdit = async (id) => {
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

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/menu-items/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setInventory(inventory.filter((item) => item.id !== id));
        toast.success("Item deleted successfully!");
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    }
    setDeleteId(null);
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
  const MobileCardView = ({ item }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={item.image_url}
            className="w-16 h-16 rounded-full object-cover"
            alt={item.name}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.item_type}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p>₹{item.selling_price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            {editingId === item.id ? (
              <Input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20"
                min="0"
              />
            ) : (
              <p>{item.quantity}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {editingId === item.id ? (
            <Button onClick={() => saveEdit(item.id)} variant="outline" size="sm" className="w-full">
              Save
            </Button>
          ) : (
            <>
              <Button
                onClick={() => updateQuantity(item.id, -1)}
                variant="outline"
                size="sm"
                className="bg-amber-300 hover:bg-amber-200 flex-1"
                disabled={item.quantity <= 0}
              >
                <Minus size={16} />
              </Button>
              <Button
                onClick={() => updateQuantity(item.id, 1)}
                variant="outline"
                size="sm"
                className="bg-emerald-300 hover:bg-emerald-200 flex-1"
              >
                <Plus size={16} />
              </Button>
              <Button
                onClick={() => startEditing(item.id, item.quantity)}
                variant="outline"
                size="sm"
                className="bg-purple-300 hover:bg-purple-200 flex-1"
              >
                <Edit2 size={16} />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-rose-300 hover:bg-rose-200 flex-1"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%] mx-auto">
                  <DialogHeader>
                    Are you sure you want to delete this item?
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setDeleteId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteItem(deleteId)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
          <Button
            onClick={() => navigate("/add")}
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
          {currentItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items found matching your criteria.
            </div>
          ) : (
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
                    <TableCell>
                      {editingId === item.id ? (
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20"
                          min="0"
                        />
                      ) : (
                        `${item.quantity}`
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
                            onClick={() => startEditing(item.id, item.quantity)}
                            variant="outline"
                            size="sm"
                            className="bg-purple-300 hover:bg-purple-200"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-rose-300 hover:bg-rose-200"
                                onClick={() => setDeleteId(item.id)}
                              >
                                <Trash size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                Are you sure you want to delete this item?
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setDeleteId(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => deleteItem(deleteId)}
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {currentItems.length > 0 && (
          <div className="flex flex-col md:flex-row ml-16 mr-16 justify-between items-center px-4 mt-4 py-2">
            <div className="text-sm order-2 md:order-1 text-gray-500">
              <span>
                Page {currentPage} of {totalPages}
              </span>
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Menu;