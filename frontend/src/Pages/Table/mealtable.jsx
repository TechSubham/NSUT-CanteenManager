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

const MealTable = () => {
  const [meals, setMeals] = useState([]);
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
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:8080/meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error('Error fetching meals:', error);
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
      const response = await fetch("http://localhost:8080/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit meal");
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
      fetchMeals();
    } catch (error) {
      console.error("Error submitting meal:", error);
      alert('Failed to create meal. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/meals/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete meal');
      }
      
      fetchMeals();
    } catch (error) {
      console.error('Error deleting meal:', error);
      alert('Failed to delete meal. Please try again.');
    }
  };

  const filteredMeals = meals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Meals Inventory</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Wholesale Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    name="wholesale_price"
                    value={formData.wholesale_price}
                    onChange={(e) => setFormData({ ...formData, wholesale_price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Selling Price</label>
                  <Input
                    type="number"
                    step="0.01"
                    name="selling_price"
                    value={formData.selling_price}
                    onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    name="rating"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability"
                    name="availability"
                    checked={formData.availability}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, availability: checked }))
                    }
                  />
                  <label htmlFor="availability" className="text-sm font-medium">
                    Available
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Add Meal
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading meals...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Wholesale Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>
                      <ImageWithFallback
                        src={meal.image_url}
                        alt={meal.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{meal.name}</TableCell>
                    <TableCell>{formatPrice(meal.wholesale_price)}</TableCell>
                    <TableCell>{formatPrice(meal.selling_price)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {meal.description}
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
                            <AlertDialogTitle>Delete Meal</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {meal.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(meal.id)}
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

export default MealTable;