import React, { createContext, useState, useContext } from 'react';


const InventoryContext = createContext();


export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  const addSnack = (snack) => {
    setInventory((prevInventory) => [...prevInventory, snack]);
  };

  return (
    <InventoryContext.Provider value={{ inventory, addSnack }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  return useContext(InventoryContext);
};
