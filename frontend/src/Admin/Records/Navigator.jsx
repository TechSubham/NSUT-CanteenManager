import React from 'react';

export const Navigator = ({ activePage, setActivePage }) => (
  <div className="bg-emerald-800 text-white p-4">
    <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
      {/* <h1 className="text-2xl font-bold">  Dashboard</h1> */}
      <div className="flex gap-4">
        <button 
          onClick={() => setActivePage('dashboard')}
          className={`px-4 py-2 rounded ${activePage === 'dashboard' ? 'bg-emerald-600' : 'hover:bg-emerald-700'}`}
        >
          Aggregates
        </button>
        <button 
          onClick={() => setActivePage('beverages')}
          className={`px-4 py-2 rounded ${activePage === 'beverages' ? 'bg-emerald-600' : 'hover:bg-emerald-700'}`}
        >
          Beverages
        </button>
        <button 
          onClick={() => setActivePage('meals')}
          className={`px-4 py-2 rounded ${activePage === 'meals' ? 'bg-emerald-600' : 'hover:bg-emerald-700'}`}
        >
          Meals
        </button>
        <button 
          onClick={() => setActivePage('snacks')}
          className={`px-4 py-2 rounded ${activePage === 'snacks' ? 'bg-emerald-600' : 'hover:bg-emerald-700'}`}
        >
          Snacks
        </button>
      </div>
    </div>
  </div>
);
