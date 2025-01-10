import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";


const BeverageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    wholesale_price: "",
    selling_price: "",
    rating: "",
    availability: true,
    image_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("Beverage created:", data);
      setFormData({
        name: "",
        description: "",
        wholesale_price: "",
        selling_price: "",
        rating: "",
        availability: true,
        image_url: "",
      });
    } catch (error) {
      console.error("Error submitting beverage:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Beverage</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Wholesale Price
            </label>
            <Input
              type="number"
              step="0.01"
              name="wholesale_price"
              value={formData.wholesale_price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Selling Price
            </label>
            <Input
              type="number"
              step="0.01"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
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
            Add Beverage
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BeverageForm;
