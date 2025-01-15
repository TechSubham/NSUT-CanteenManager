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
        const beverageResponse = await fetch('http://localhost:8080/beverages');
        const beverageData = await beverageResponse.json();
        setBeverages(beverageData);

        const snackResponse = await fetch('http://localhost:8080/snacks');
        const snackData = await snackResponse.json();
        setSnacks(snackData);

        const mealResponse = await fetch('http://localhost:8080/meals');
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

  const addBeverage = async (newBeverage) => {
    try {
      const response = await fetch('http://localhost:8080/beverages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBeverage),
      });
      console.log("Response in api is ",response);

      if (response.ok) {
        const addedBeverage = await response.json();
        setBeverages((prevBeverages) => [...prevBeverages, addedBeverage]);
      } else {
        setError('Failed to add beverage');
      }
    } catch (err) {
      console.error('Error adding beverage:', err);
      setError('Failed to add beverage');
    }
  };

  const addMeal = async (newMeal) => {
    try {
      const response = await fetch('http://localhost:8080/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeal),
      });

      if (response.ok) {
        const addedMeal = await response.json();
        setMeals((prevMeals) => [...prevMeals, addedMeal]);
      } else {
        setError('Failed to add meal');
      }
    } catch (err) {
      console.error('Error adding meal:', err);
      setError('Failed to add meal');
    }
  };

  const addSnack = async (newSnack) => {
    try {
      const response = await fetch('http://localhost:8080/snacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSnack),
      });

      if (response.ok) {
        const addedSnack = await response.json();
        setSnacks((prevSnacks) => [...prevSnacks, addedSnack]);
      } else {
        setError('Failed to add snack');
      }
    } catch (err) {
      console.error('Error adding snack:', err);
      setError('Failed to add snack');
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
    addBeverage,
    addMeal,
    addSnack,
    deleteBeverage,
    deleteMeal,
    deleteSnack,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}
