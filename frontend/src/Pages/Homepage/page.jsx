import React, { useState } from 'react';
import { ClipboardList, IndianRupee, ShoppingCart, Users, Utensils, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '@/components/ui/Navbar';

const GradientCard = ({ children }) => (
  <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
    {children}
  </div>
);

const NavItem = ({ text, dropdownLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-600 transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <span>{text}</span>
        {dropdownLinks && <ChevronDown size={16} />}
      </button>
      
      {dropdownLinks && isOpen && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {dropdownLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block px-4 py-2 text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const navItems = [
    { text: 'Dashboard' },
    { 
      text: 'Menu',
      dropdownLinks: [
        { to: "/Snacks", text: "Add Snack" },
        { to: "/Inventory", text: "Check Inventory" },
      ]
    },
    { 
      text: 'Orders',
      dropdownLinks: [
        { to: "/orders", text: "Track Completed Orders" },
        { to: "/PendingOrders", text: "View Pending Orders" },
      ]
    },
    { text: 'Reports' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Navbar/>

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent mb-6">
              Cateen Pro
            </h1>
            <p className="text-xl text-emerald-700 mb-10">
              Revolutionize your canteen operations with our intelligent management system
            </p>
            <button className="bg-gradient-to-r from-emerald-500 to-green-400 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Smart Menu Control",
                description: "AI-powered menu optimization and real-time inventory tracking",
                links: [
                  { to: "/Snacks", text: "Add Snack" },
                  { to: "/Inventory", text: "Check Inventory" },
                ]
              },
              {
                icon: ShoppingCart,
                title: "Seamless Orders",
                description: "Lightning-fast order processing with instant notifications",
                links: [
                  { to: "/orders", text: "Track Orders" },
                ]
              },
              {
                icon: IndianRupee,
                title: "Financial Insights",
                description: "Advanced analytics and predictive revenue forecasting"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <GradientCard>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-emerald-400 to-green-300 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-emerald-700">
                      {feature.description}
                    </p>
                  </div>
                </GradientCard>
                {feature.links && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {feature.links.map((link, i) => (
                      <Link
                        key={i}
                        to={link.to}
                        className="block px-4 py-2 text-emerald-700 hover:bg-emerald-50 transition-colors"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-500 to-green-400 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Utensils, value: "1,000+", label: "Daily Meals" },
              { icon: Users, value: "500+", label: "Active Users" },
              { icon: ShoppingCart, value: "50+", label: "Menu Items" },
              { icon: IndianRupee, value: "₹10k+", label: "Daily Revenue" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <stat.icon size={32} className="mx-auto mb-4" />
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Utensils size={24} />
              <span className="text-2xl font-bold">CanteenPro</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {['Privacy', 'Terms', 'Support', 'Contact'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-sm opacity-75">
            © 2025 CanteenPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}