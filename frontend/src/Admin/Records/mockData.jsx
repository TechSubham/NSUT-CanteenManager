import {Coffee,Utensils,Cookie} from 'lucide-react'
export const weeklyData = [
    { day: 'Mon', snacks: 450, meals: 780, beverages: 320 },
    { day: 'Tue', snacks: 520, meals: 890, beverages: 350 },
    { day: 'Wed', snacks: 600, meals: 750, beverages: 400 },
    { day: 'Thu', snacks: 480, meals: 810, beverages: 380 },
    { day: 'Fri', snacks: 750, meals: 920, beverages: 420 },
  ];
  
  export const monthlyData = [
    { week: 'Week 1', snacks: 2800, meals: 4150, beverages: 1870 },
    { week: 'Week 2', snacks: 3100, meals: 4300, beverages: 1920 },
    { week: 'Week 3', snacks: 2900, meals: 4250, beverages: 1850 },
    { week: 'Week 4', snacks: 3200, meals: 4400, beverages: 2100 },
  ];
  
  export const yearlyData = [
    { month: 'Jan', snacks: 12000, meals: 18000, beverages: 8000 },
    { month: 'Feb', snacks: 11500, meals: 17500, beverages: 7800 },
    { month: 'Mar', snacks: 13000, meals: 19000, beverages: 8500 },
    { month: 'Apr', snacks: 12800, meals: 18500, beverages: 8200 },
  ];
  
  export const categoryData = {
    beverages: {
      items: ['Coffee', 'Tea', 'Juice', 'Soda', 'Water'],
      icon: Coffee,
      color: '#047857'
    },
    meals: {
      items: ['Breakfast', 'Lunch', 'Dinner', 'Combos', 'Specials'],
      icon: Utensils,
      color: '#059669'
    },
    snacks: {
      items: ['Chips', 'Sandwiches', 'Fruits', 'Cookies', 'Nuts'],
      icon: Cookie,
      color: '#34d399'
    }
  };