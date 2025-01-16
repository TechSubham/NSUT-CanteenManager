import React, { useState } from 'react';
import { Navigator } from './Navigator';
import { Dashboard } from './Dashboard';
import { CategoryPage } from './CategoryPage';

const Records = () => {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-emerald-50">
      <Navigator activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'beverages' && <CategoryPage category="beverages" />}
      {activePage === 'meals' && <CategoryPage category="meals" />}
      {activePage === 'snacks' && <CategoryPage category="snacks" />}
    </div>
  );
};

export default Records;