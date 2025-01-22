import React, { createContext, useContext, useState, useEffect } from 'react';

const FoodContext = createContext();


export function useFood() {
  return useContext(FoodContext);
}

export function FoodProvider({ children }) {
  const [menuItems, setMenuItems] = useState({
    beverages: [],
    meals: [],
    snacks: [],
    menu:[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuResponse = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items');
        const menu = await menuResponse.json();
        console.log("Mennu are ",menu);
        const mealsResponse = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items?type=Meals');
        const meals = await mealsResponse.json();
        console.log("Meals are ",meals)
        const snacksResponse = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items?type=Snacks');
        const snacks = await snacksResponse.json();
        console.log("Snacks are ",snacks)
        const beveragesResponse = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items?type=Beverages');
        const beverages = await beveragesResponse.json();

        setMenuItems({ beverages, meals, snacks,menu});
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const addMenuItem = async (itemData) => {
    try {
      const response = await fetch('https://nsut-canteenmanagerbackend.onrender.com/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add menu item');
      }

      const newItem = await response.json();
      setMenuItems((prev) => {
        const updated = { ...prev };
        updated[itemData.category.toLowerCase()] = [...prev[itemData.category.toLowerCase()], newItem];
        return updated;
      });
    } catch (err) {
      console.error('Error adding menu item:', err);
      setError('Failed to add menu item');
    }
  };

  const deleteMenuItem = async (id, category) => {
    try {
      const response = await fetch(`https://nsut-canteenmanagerbackend.onrender.com/${category.toLowerCase()}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMenuItems((prev) => {
          const updated = { ...prev };
          updated[category.toLowerCase()] = prev[category.toLowerCase()].filter((item) => item.id !== id);
          return updated;
        });
      } else {
        throw new Error('Failed to delete menu item');
      }
    } catch (err) {
      console.error('Error deleting menu item:', err);
      setError('Failed to delete menu item');
    }
  };
  const editMenuItem=async(id,category)=>{
    try{
      const response=await fetch(`https://nsut-canteenmanagerbackend.onrender.com/${category.toLowerCase()}/${id}`,{
        method:'UPDATE',
      })
      if(response.ok){
        setMenuItems((prev)=>{
          const updated={...prev};
          updated[category.toLowerCase()]=prev[category.toLowerCase()].filter((item)=>item.id!==id);
        })
      }
    }
    catch(error){

    }
  }
  const contextValue = {
    menuItems,
    loading,
    error,
    addMenuItem,
    deleteMenuItem,
  };

  return <FoodContext.Provider value={contextValue}>{children}</FoodContext.Provider>;
}
