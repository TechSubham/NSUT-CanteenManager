import { useState } from "react";
import { Link } from "react-router-dom";
import ReceiptPopup from "./ReceiptPopup"; 
import Navbar from "@/components/ui/Navbar";

const CompletedOrders = () => {
  const [filter, setFilter] = useState("last-week");
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const orders = [
    { orderNumber: "001", date: "2024-12-01", total: "$25", customerName: "Arvind Kejriwal", items: [{ name: "Liquor", price: "$20" }, { name: "Aalo bhujiya", price: "$5" }] },
    { orderNumber: "002", date: "2025-12-05", total: "$25", customerName: "Jonathan Jaat", items: [{ name: "Burger", price: "$15" }, { name: "Fries", price: "$5" }, { name: "Soda", price: "$5" }] },
    { orderNumber: "003", date: "2024-12-10", total: "$3", customerName: "Narendra Modi", items: [{ name: "Tea", price: "$1" }, { name: "Water", price: "$2" }] },
  ];

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null); 
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const now = new Date();
    const diffTime = now - orderDate;
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (filter === "last-week") {
      return diffDays <= 7;
    } else if (filter === "last-month") {
      return diffDays <= 30;
    } else if (filter === "last-year") {
      return diffDays <= 365;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-emerald-600 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">CanteenPro</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link to="/homepage" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:underline">Orders</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header> */}
      <Navbar/>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-8">Completed Orders</h1>

          <div className="mb-6 flex justify-between items-center">
            <div>
              <label className="text-emerald-600 font-semibold mr-2">Filter by:</label>
              <select
                className="bg-white text-gray-700 py-2 px-4 rounded-md"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="last-week" className={`font-semibold ${filter === "last-week" ? "text-green-600" : "text-gray-600"} hover:text-green-600`}>
                  Last Week
                </option>
                <option value="last-month" className={`font-semibold ${filter === "last-month" ? "text-green-600" : "text-gray-600"} hover:text-green-600`}>
                  Last Month
                </option>
                <option value="last-year" className={`font-semibold ${filter === "last-year" ? "text-green-600" : "text-gray-600"} hover:text-green-600`}>
                  Last Year
                </option>
              </select>
            </div>
          </div>

          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Order Number</th>
                <th className="py-3 px-6 text-left">Date of Purchase</th>
                <th className="py-3 px-6 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-6 cursor-pointer text-blue-500 hover:underline" onClick={() => handleOrderClick(order)}>
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-6">{order.date}</td>
                    <td className="py-3 px-6">{order.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-6 text-center text-gray-500">
                    No orders found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {isModalOpen && <ReceiptPopup order={selectedOrder} closeModal={closeModal} />}
      </main>
    </div>
  );
};

export default CompletedOrders;
