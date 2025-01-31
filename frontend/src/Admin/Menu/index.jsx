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
import { ShoppingCart, Plus, Minus, Trash, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // const [editDialogOpen, setEditDialogOpen] = useState(false);
  // const [itemToEdit, setItemToEdit] = useState(null);
  const itemsPerPage = isMobile ? 5 : 10;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // const handleEdit = async () => {
  //   try {
  //     const response = await fetch(`https://nsut-canteenmanagerbackend.onrender.com/menu-items/${itemToEdit.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(itemToEdit),
  //     });
  //     if (response.ok) {
  //       setInventory(inventory.map(item => (item.id === itemToEdit.id ? itemToEdit : item)));
  //       setEditDialogOpen(false);
  //       setItemToEdit(null);
  //     } else {
  //       throw new Error('Failed to update item');
  //     }
  //   } catch (err) {
  //     console.error('Error updating item:', err);
  //   }
  // };

  // const handleQuantityChange = async (id, action) => {
  //   const item = inventory.find(item => item.id === id);
  //   if (item) {
  //     const updatedQuantity = action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
  //     const response = await fetch(`https://nsut-canteenmanagerbackend.onrender.com/menu-items/${id}/quantity`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ ...item, quantity: updatedQuantity }),
  //     });
  //     if (response.ok) {
  //       setInventory(inventory.map(i => (i.id === id ? { ...i, quantity: updatedQuantity } : i)));
  //     }
  //   }
  // };

const MobileCard = ({ item }) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={item.image_url}
            className="w-16 h-16 rounded-full object-cover"
            alt={item.name}
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {item.item_type?.charAt(0).toUpperCase() + item.item_type?.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Price: ₹{item.selling_price}</p>
            <p className="text-sm">Quantity: {item.quantity}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => handleQuantityChange(item.id, 'decrease')}
              variant="outline"
              size="sm"
              className="p-1 text-sm text-gray-600 hover:bg-gray-100"
              disabled={item.quantity <= 0}
            >
              <Minus size={16} />
            </Button>
            <input
              type="number"
              value={item.quantity}
              readOnly
              className="w-12 text-center border border-gray-300 rounded-md text-sm py-1"
            />
            <Button
              onClick={() => handleQuantityChange(item.id, 'increase')}
              variant="outline"
              size="sm"
              className="p-1 text-sm text-gray-600 hover:bg-gray-100"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
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
          <Button
            // onClick={() => {
              // setItemToEdit(item);
              // setEditDialogOpen(true);
            // }}
            variant="outline"
            size="sm"
            className="bg-blue-300 hover:bg-blue-200"
          >
          <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-300 hover:bg-green-200"
          >
            <ShoppingCart size={16}/>
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-28 pb-16 px-2 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap justify-center gap-2 md:gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-full ${selectedCategory === category ? "bg-emerald-600 text-white" : "bg-white text-emerald-600 hover:bg-emerald-50"} transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="mb-4 flex justify-center px-4">
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2"
          />
        </div>

        <div className="mt-6 border rounded-lg p-2 md:p-6 mx-auto max-w-[95%] md:max-w-[90%]">
          {isMobile ? (
            <div className="space-y-4">
              {currentItems.map((item) => (
                <MobileCard key={item.id} item={item} />
              ))}
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
                  <TableHead>Buy</TableHead>
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
                        <div className="flex items-center gap-2">
                          <Button
                            // onClick={() => handleQuantityChange(item.id, 'decrease')}
                            variant="outline"
                            size="sm"
                            className="p-1 text-sm text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 0}
                          >
                            <Minus size={16} />
                          </Button>
                          <input
                            type="number"
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border border-gray-300 rounded-md text-sm py-1"
                          />
                          <Button
                            // onClick={() => handleQuantityChange(item.id, 'increase')}
                            variant="outline"
                            size="sm"
                            className="p-1 text-sm text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
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
                        <Button
                          onClick={() => {
                            setItemToEdit(item);
                            setEditDialogOpen(true);
                          }}
                          variant="outline"
                          size="sm"
                          className="bg-blue-300 hover:bg-blue-200"
                        >
                          <Edit size={16} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                      <Button
                          onClick={() => {
                            // Handle the buy logic
                            console.log("Buy button clicked for item:", item);
                          }}
                          variant="outline"
                          size="sm"
                          className="bg-green-300 hover:bg-green-200"
                      >
                          <ShoppingCart size={16} />
                      </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {currentItems.length > 0 && (
          <div className="flex flex-col md:flex-row justify-between items-center px-4 mt-4 gap-2">
            <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
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
        {/* <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {itemToEdit && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit();
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                    <Input
                      id="name"
                      value={itemToEdit.name}
                      onChange={(e) => setItemToEdit({ ...itemToEdit, name: e.target.value })}
                      className="mt-2"
                      required
                      aria-describedby="name-error"
                    />
                    {!itemToEdit.name && <p id="name-error" className="text-red-500 text-xs mt-1">Name is required</p>}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="selling_price" className="block text-sm font-medium">Price</label>
                    <Input
                      id="selling_price"
                      type="number"
                      value={itemToEdit.selling_price}
                      onChange={(e) => setItemToEdit({ ...itemToEdit, selling_price: +e.target.value })}
                      className="mt-2"
                      required
                      min={0}
                      aria-describedby="price-error"
                    />
                    {itemToEdit.selling_price <= 0 && (
                      <p id="price-error" className="text-red-500 text-xs mt-1">Price must be a positive number</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
                    <Input
                      id="quantity"
                      type="number"
                      value={itemToEdit.quantity}
                      onChange={(e) => setItemToEdit({ ...itemToEdit, quantity: +e.target.value })}
                      className="mt-2"
                      required
                      min={0}
                      aria-describedby="quantity-error"
                    />
                    {itemToEdit.quantity < 0 && (
                      <p id="quantity-error" className="text-red-500 text-xs mt-1">Quantity cannot be negative</p>
                    )}
                  </div>
                </form>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={handleEdit}
                disabled={loading || !itemToEdit.name || itemToEdit.selling_price <= 0 || itemToEdit.quantity < 0}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>    */}
    </div>
      <Footer />
    </div>
  );
};

export default Menu;
