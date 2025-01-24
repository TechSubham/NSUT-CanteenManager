import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const OrdersManagementTable = () => {
  const [initialOrders] = useState([
    // Example initial data (can be replaced with real data)
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Order Inquiry",
      message: "When will my order arrive?",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Payment Issue",
      message: "I was charged twice for my order.",
    },
  ]);

  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  const handleFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      order.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      order.subject.toLowerCase().includes(filters.subject.toLowerCase())
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      <Navbar />
      <div className="w-full mt-20">
        <div className="p-6">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <Button variant="outline" className="gap-2">
              Refresh
            </Button>
          </div>

          {/* Filters section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Search Name..."
              value={filters.name}
              onChange={(e) => handleFilter('name', e.target.value)}
            />
            <Input
              placeholder="Search Email..."
              value={filters.email}
              onChange={(e) => handleFilter('email', e.target.value)}
            />
            <Input
              placeholder="Search Subject..."
              value={filters.subject}
              onChange={(e) => handleFilter('subject', e.target.value)}
            />
          </div>

          {/* Table section */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">
                      {order.name}
                    </TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">
                      {order.email}
                    </TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">
                      {order.subject}
                    </TableCell>
                    <TableCell className="text-gray-600 max-w-[300px] truncate">
                      {order.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination section */}
          <div className="flex justify-between items-center mt-4 py-2">
            <div className="text-sm text-gray-500">
              <span>
                Showing {currentOrders.length} of {filteredOrders.length} row(s)
              </span>
              <span className="ml-4">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersManagementTable;