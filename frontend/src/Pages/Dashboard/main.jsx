import React, { useState,useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

Chart.register(...registerables);

const CanteenDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  const [currentChart, setCurrentChart] = useState("beverages");

  const beveragesData = [
    { item: "Coca Cola", quantity: 40, price: 50 },
    { item: "Pepsi", quantity: 30, price: 45 },
    { item: "Mirinda", quantity: 43, price: 48 },
    { item: "Cold Coffee", quantity: 43, price: 60 },
    { item: "Hot Coffee", quantity: 45, price: 55 },
    { item: "Chai", quantity: 32, price: 20 },
  ];

  const mealsData = [
    { item: "Burger", quantity: 50, price: 80 },
    { item: "Pizza", quantity: 30, price: 150 },
    { item: "Pasta", quantity: 25, price: 120 },
    { item: "Biryani", quantity: 40, price: 200 },
    { item: "Salad", quantity: 15, price: 60 },
  ];

  const snacksData = [
    { item: "Chips", quantity: 70, price: 20 },
    { item: "Cookies", quantity: 40, price: 50 },
    { item: "Samosa", quantity: 35, price: 15 },
    { item: "Popcorn", quantity: 25, price: 30 },
    { item: "Fries", quantity: 45, price: 60 },
  ];

  const chartData =
    currentChart === "beverages"
      ? beveragesData
      : currentChart === "meals"
      ? mealsData
      : snacksData;

  const totalItemsSold = chartData.reduce((sum, item) => sum + item.quantity, 0);
  const totalProfitGenerated = chartData.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const generatePieData = (data, key) => ({
    labels: data.map((item) => item.item),
    datasets: [
      {
        data: data.map((item) =>
          key === "profit" ? item.quantity * item.price : item[key]
        ),
        backgroundColor: data.map(
          () =>
            `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`
        ),
      },
    ],
  });

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-100 mt-20">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-emerald-500 mb-6 text-center">
          Canteen Dashboard
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["beverages", "meals", "snacks"].map((type) => (
            <button
              key={type}
              onClick={() => setCurrentChart(type)}
              className={cn(
                "rounded-md px-5 py-2 text-lg font-semibold transition-all duration-200 shadow-md w-full sm:w-auto",
                currentChart === type
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-emerald-500 border border-emerald-500 hover:bg-emerald-600 hover:text-white"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold text-emerald-600 mb-4 text-center">
              Items Sold
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Total Items Sold: {totalItemsSold}
            </p>
            <div className="relative mx-auto aspect-square">
              <Pie data={generatePieData(chartData, "quantity")} options={options} />
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold text-emerald-600 mb-4 text-center">
              Profits Generated
            </h2>
            <p className="text-center text-gray-700 mb-4">
              Total Profit: ₹{totalProfitGenerated}
            </p>
            <div className="relative mx-auto aspect-square">
              <Pie data={generatePieData(chartData, "profit")} options={options} />
            </div>
          </div>
        </div>

        <div className="mt-8">
        
          <div>
            <h2 className="text-2xl font-semibold text-emerald-500 mb-6 text-center">
              {currentChart.charAt(0).toUpperCase() + currentChart.slice(1)} Details
            </h2>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200 bg-white text-left">
                <thead className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-4 text-sm font-bold tracking-wide uppercase"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-sm font-bold tracking-wide uppercase"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-sm font-bold tracking-wide uppercase"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-4 text-sm font-bold tracking-wide uppercase"
                    >
                      Profit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chartData.map((item, index) => (
                    <tr
                      key={index}
                      className={cn(
                        "transition-all duration-200 hover:bg-gray-100 hover:shadow-inner",
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      )}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      Total
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      {totalItemsSold}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      -
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      ₹{totalProfitGenerated}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
</div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default CanteenDashboard;
