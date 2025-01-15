import React, { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import Chef from "../../assets/Chief.jpg";

const NavbarLinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Menu", path: "/menu" },
  { title: "Orders", path: "/orders" },
  { title: "Order History", path: "/orderHistory" },
  { title: "Records", path: "/records" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-emerald-500 to-green-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="h-14 w-14 overflow-hidden rounded-full">
              <img 
                src={Chef} 
                alt="Canteen Logo"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-white group-hover:text-green-200 transition-colors duration-200">
                Canteen Hub
              </span>
              
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 justify-end w-full">
            {NavbarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path || "#"}
                className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-200 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.title}
              </Link>
            ))}
            
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-200 hover:bg-green-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-200"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-emarald-700`}
      >
        <div className="px-4 py-3 space-y-2">
          {NavbarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path || "#"}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-200 hover:bg-green-800 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
