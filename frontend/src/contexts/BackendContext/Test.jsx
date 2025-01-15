import React from 'react';
import { useFood } from './FoodContext.jsx';

const Test = () => {
  const { beverages, loading, addBeverage, deleteBeverage, error } = useFood();

  const handleDelete = (id) => {
    deleteBeverage(id);
  };

  const handleAdd = () => {
    const newBeverage = {
      name: 'Citrus Blast',                   
      description: 'A refreshing citrus-flavored drink with a hint of sweetness.',
      wholesale_price: 2.0,                
      selling_price: 5.0,                   
      rating: 4.5,                            
      availability: true,                    
      image_url: 'https://example.com/citrus-blast.jpg'
    };
  
    const response = addBeverage(newBeverage);
    console.log(response);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log("Aaman");
  return (
    <div className='text-red-700'>
        <div>Aman Pandey</div>
      <h1>Beverages</h1>
      <button onClick={handleAdd}>Add Beverage</button>
      <ul>
        {beverages.map((beverage) => (
          <li key={beverage.id}>
            {beverage.name} - ${beverage.price}
            <button onClick={() => handleDelete(beverage.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
