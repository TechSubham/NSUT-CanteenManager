import {
  ClipboardList,
  DollarSign,
  ShoppingCart,
  Users,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);

  const handleDropdownToggle = (dropdown) => {
    if (dropdown === "menu") {
      setIsDropdownOpen(!isDropdownOpen);
    } else if (dropdown === "order") {
      setIsOrderDropdownOpen(!isOrderDropdownOpen);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-green-600 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Utensils size={24} />
            <span className="text-xl font-bold">CanteenPro</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/dashboard" className="hover:underline">Dashboard</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Menu</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Orders</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Reports</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-green-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to CanteenPro</h1>
            <p className="text-xl mb-8">
              Streamline your canteen operations with our powerful management system
            </p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300">
              Get Started
            </button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[ 
                {
                  icon: ClipboardList,
                  title: "Menu Management",
                  description: "Easily update and organize your menu items",
                  dropdownLinks: [
                    { to: "/Snacks", text: "Add Snack" },
                    { to: "/Inventory", text: "Check Inventory" },
                  ],
                  onHover: () => handleDropdownToggle("menu"),
                  onLeave: () => handleDropdownToggle("menu"),
                },
                {
                  icon: ShoppingCart,
                  title: "Order Processing",
                  description: "Efficiently handle and track customer orders",
                  dropdownLinks: [
                    {  to: "/CompletedOrders", text: "Track Completed Orders" },
                  ],
                  onHover: () => handleDropdownToggle("order"),
                  onLeave: () => handleDropdownToggle("order"),
                },
                {
                  icon: DollarSign,
                  title: "Financial Reporting",
                  description: "Generate comprehensive financial reports",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center relative">
                  <div
                    onMouseEnter={feature.onHover}
                    onMouseLeave={feature.onLeave}
                    className="relative inline-block"
                  >
                    <feature.icon size={48} className="mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-semibold mb-2 cursor-pointer">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>

                    {(feature.title === "Menu Management" && isDropdownOpen) || (feature.title === "Order Processing" && isOrderDropdownOpen) ? (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white shadow-lg rounded-md z-10 opacity-100 transition-all duration-300 ease-in-out">
                        <ul className="py-2">
                          {feature.dropdownLinks.map((link, i) => (
                            <li key={i}>
                              <Link
                                to={link.to}
                                className="block px-4 py-2 text-gray-700 hover:bg-green-100"
                              >
                                {link.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Canteen Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[ 
                { icon: Utensils, value: "1000+", label: "Daily Meals Served" },
                { icon: Users, value: "500+", label: "Happy Customers" },
                { icon: ShoppingCart, value: "50+", label: "Menu Items" },
                { icon: DollarSign, value: "$10k+", label: "Monthly Revenue" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon size={36} className="mx-auto mb-4 text-green-600" />
                  <p className="text-2xl font-bold mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">CanteenPro</span>
              <p className="text-sm mt-2">© 2023 CanteenPro. All rights reserved.</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-green-400">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400">Contact Us</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}