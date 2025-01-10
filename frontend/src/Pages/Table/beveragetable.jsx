import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StarIcon, PlusCircle, Trash2, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const BeverageTable = () => {
  const [beverages, setBeverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    wholesale_price: "",
    selling_price: "",
    rating: "",
    availability: true,
    image_url: "",
  });

  const validateImageUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return url.match(/^https?:\/\/.+/i) !== null;
    } catch {
      return false;
    }
  };

  const ImageWithFallback = ({ src, alt, className }) => {
    const [error, setError] = useState(false);
    
    if (!src || error) {
      return (
        <div className={`${className} bg-gray-100 flex items-center justify-center`}>
          <ImageOff className="w-6 h-6 text-gray-400" />
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    );
  };

  useEffect(() => {
    fetchBeverages();
  }, []);

  const fetchBeverages = async () => {
    try {
      const response = await fetch('http://localhost:8080/beverages');
      if (!response.ok) {
        throw new Error('Failed to fetch beverages');
      }
      const data = await response.json();
      setBeverages(data);
    } catch (error) {
      console.error('Error fetching beverages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.image_url && !validateImageUrl(formData.image_url)) {
      alert('Please enter a valid image URL starting with http:// or https://');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/beverages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit beverage");
      }

      const data = await response.json();
      setFormData({
        name: "",
        description: "",
        wholesale_price: "",
        selling_price: "",
        rating: "",
        availability: true,
        image_url: "",
      });
      setIsDialogOpen(false);
      fetchBeverages();
    } catch (error) {
      console.error("Error submitting beverage:", error);
      alert('Failed to create beverage. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/beverages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete beverage');
      }
      
      fetchBeverages();
    } catch (error) {
      console.error('Error deleting beverage:', error);
      alert('Failed to delete beverage. Please try again.');
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };

  const filteredBeverages = beverages.filter(beverage =>
    beverage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`w-4 h-4 inline ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Beverages Inventory</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Add Beverage
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields remain the same */}
                <Button type="submit" className="w-full">
                  Add Beverage
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search beverages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading beverages...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Wholesale Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  {/* <TableHead>Rating</TableHead> */}
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeverages.map((beverage) => (
                  <TableRow key={beverage.id}>
                    <TableCell>
                      <ImageWithFallback
                        src={beverage.image_url}
                        alt={beverage.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{beverage.name}</TableCell>
                    <TableCell>{formatPrice(beverage.wholesale_price)}</TableCell>
                    <TableCell>{formatPrice(beverage.selling_price)}</TableCell>
                    {/* <TableCell>{renderRatingStars(beverage.rating)}</TableCell> */}
                    <TableCell className="max-w-xs truncate">
                      {beverage.description}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100">
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Beverage</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {beverage.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(beverage.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BeverageTable;