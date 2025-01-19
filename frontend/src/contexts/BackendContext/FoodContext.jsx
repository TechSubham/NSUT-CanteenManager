import React, { createContext, useState, useEffect, useContext } from 'react';

const FoodContext = createContext();

export function useFood() {
  return useContext(FoodContext);
}

export function FoodProvider({ children }) {
  const [beverages, setBeverages] = useState([]);
  const [meals, setMeals] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const beverageResponse = await fetch('http://localhost:8080/menu-items?type=Beverages');
        const beverageData = await beverageResponse.json();
        setBeverages(beverageData);

        const snackResponse = await fetch('http://localhost:8080/menu-items?type=Snacks');
        const snackData = await snackResponse.json();
        setSnacks(snackData);

        const mealResponse = await fetch('http://localhost:8080/menu-items?type=Meals');
        const mealData = await mealResponse.json();
        setMeals(mealData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
}, []);

  const addItem = async (itemData) => {
    try {
      const formattedData = {
        snackName: itemData.snackName,
        quantity: parseInt(itemData.quantity),
        wholesalePrice: parseFloat(itemData.wholesalePrice),
        sellPrice: parseFloat(itemData.sellPrice),
        image: itemData.image,
        category: itemData.category,
        availability: true
      };
  
      const response = await fetch('http://localhost:8080/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to add ${itemData.category.toLowerCase()}`);
      }
  
      const addedItem = await response.json();
   
      switch (itemData.category) {
        case 'Beverages':
          setBeverages(prev => [...prev, addedItem]);
          break;
        case 'Meals':
          setMeals(prev => [...prev, addedItem]);
          break;
        case 'Snacks':
          setSnacks(prev => [...prev, addedItem]);
          break;
      }
  
      return addedItem;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  };

  const deleteBeverage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/beverages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBeverages((prevBeverages) =>
          prevBeverages.filter((beverage) => beverage.id !== id)
        );
      } else {
        setError('Failed to delete beverage');
      }
    } catch (err) {
      console.error('Error deleting beverage:', err);
      setError('Failed to delete beverage');
    }
  };

  const deleteMeal = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/meals/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMeals((prevMeals) =>
          prevMeals.filter((meal) => meal.id !== id)
        );
      } else {
        setError('Failed to delete meal');
      }
    } catch (err) {
      console.error('Error deleting meal:', err);
      setError('Failed to delete meal');
    }
  };

  const deleteSnack = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/snacks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSnacks((prevSnacks) =>
          prevSnacks.filter((snack) => snack.id !== id)
        );
      } else {
        setError('Failed to delete snack');
      }
    } catch (err) {
      console.error('Error deleting snack:', err);
      setError('Failed to delete snack');
    }
  };

  const value = {
    beverages,
    meals,
    snacks,
    loading,
    error,
    deleteBeverage,
    deleteMeal,
    deleteSnack,
    addItem
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}