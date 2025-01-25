import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Search,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  PackageCheck,
  PackageX,
  Calendar,
  Tag,
  User,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const OrdersManagementTable = () => {
  const [initialOrders] = useState([
    {
      id: "ORD-2024-003",
      items: [
        { name: "Vegetarian Pizza", quantity: 2 },
        { name: "Caesar Salad", quantity: 1 },
        { name: "Iced Tea", quantity: 2 },
      ],
      orderStatus: "pending",
      customerName: "Mike Johnson",
      price: 52.75,
      orderDate: "2024-01-14",
    },
    {
      id: "ORD-2024-004",
      items: [
        { name: "BBQ Chicken Pizza", quantity: 1 },
        { name: "Wings", quantity: 2 },
        { name: "Beer", quantity: 2 },
      ],
      orderStatus: "completed",
      customerName: "Sarah Wilson",
      price: 63.25,
      orderDate: "2024-01-14",
    },
    {
      id: "ORD-2024-005",
      items: [
        { name: "Hawaiian Pizza", quantity: 1 },
        { name: "Cheesy Bread", quantity: 1 },
        { name: "Lemonade", quantity: 2 },
      ],
      orderStatus: "completed",
      customerName: "David Brown",
      price: 35.99,
      orderDate: "2024-01-14",
    },
    {
      id: "ORD-2024-001",
      items: [
        { name: "Margherita Pizza", quantity: 2 },
        { name: "Coca Cola", quantity: 3 },
        { name: "Garlic Bread", quantity: 1 },
      ],
      orderStatus: "completed",
      customerName: "John Doe",
      price: 45.99,
      orderDate: "2024-01-15",
    },
    {
      id: "ORD-2024-002",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Sprite", quantity: 2 },
      ],
      orderStatus: "pending",
      customerName: "Jane Smith",
      price: 28.5,
      orderDate: "2024-01-15",
    },
    {
      id: "ORD-2024-006",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Sprite", quantity: 2 },
      ],
      orderStatus: "pending",
      customerName: "Jane Smith",
      price: 28.5,
      orderDate: "2024-01-15",
    },
    {
      id: "ORD-2024-007",
      items: [
        { name: "Pepperoni Pizza", quantity: 1 },
        { name: "Sprite", quantity: 2 },
      ],
      orderStatus: "pending",
      customerName: "Jane Smith",
      price: 28.5,
      orderDate: "2024-01-15",
    },
  ]);

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState({ type: "", message: "" });
  const [filters, setFilters] = useState({
    orderId: "",
    customerName: "",
    orderStatus: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [undeliveredItems, setUndeliveredItems] = useState([]);
  const [fullOrderItems, setFullOrderItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);

  const ordersPerPage = 6;

  const handleOrderIdClick = (order) => {
    if (order.orderStatus === "pending") {
      setSelectedOrderDetails(order);
      setUndeliveredItems([...order.items]);
      setFullOrderItems([...order.items]);
      setOrderDetailsOpen(true);
    }
  };

  const handleItemDelivery = (item) => {
    setDeliveredItems((prevDeliveredItems) => {
      const isAlreadyDelivered = prevDeliveredItems.some(
        (deliveredItem) => deliveredItem.name === item.name
      );

      return isAlreadyDelivered
        ? prevDeliveredItems.filter(
            (deliveredItem) => deliveredItem.name !== item.name
          )
        : [...prevDeliveredItems, item];
    });
  };

  const handleConfirmOrder = () => {
    if (deliveredItems.length === undeliveredItems.length) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrderDetails.id
            ? { ...order, orderStatus: "completed" }
            : order
        )
      );
      setDeliveredItems([]);
      setOrderDetailsOpen(false);
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium";
      case "pending":
        return "text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full font-medium";
      default:
        return "";
    }
  };

  const handleFilter = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (orderId, checked) => {
    if (checked) {
      setSelectedOrders((prev) => [...prev, orderId]);
      setDialogOpen(true);
    } else {
      setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
      setDialogOpen(false);
    }
  };

  const showAlert = (type, orderId) => {
    const content = {
      type,
      title:
        type === "success" ? "Order Completed Successfully!" : "Order Pending",
      message:
        type === "success"
          ? `Order ${orderId} has been marked as completed.`
          : `Order ${orderId} has been marked as pending.`,
      icon: type === "success" ? CheckCircle2 : XCircle,
      className: type === "success" ? "text-green-500" : "text-yellow-500",
    };
    setAlertContent(content);
    setAlertOpen(true);

    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  };

  const handleOrderStatus = (status) => {
    if (status === 'success') {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          selectedOrders.includes(order.id)
            ? { ...order, orderStatus: 'completed' }
            : order
        )
      );
    } else {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          selectedOrders.includes(order.id)
            ? { ...order, orderStatus: 'pending' }
            : order
        )
      );
    }
    setDialogOpen(false);
    setSelectedOrders([]);
  };

  const filteredOrders = orders.filter((order) => {
    return (
      order.id.toLowerCase().includes(filters.orderId.toLowerCase()) &&
      order.customerName
        .toLowerCase()
        .includes(filters.customerName.toLowerCase()) &&
      (filters.orderStatus === "all" ||
        order.orderStatus.toLowerCase() === filters.orderStatus.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      <Navbar />
      <Card className="w-full mt-20">
        <CardContent className="p-6">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Orders Management</h2>
            <Button variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" /> Refresh
            </Button>
          </div>

          {/* Filters section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Order ID..."
                value={filters.orderId}
                onChange={(e) => handleFilter("orderId", e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Customer Name..."
                value={filters.customerName}
                onChange={(e) => handleFilter("customerName", e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={filters.orderStatus}
              onValueChange={(value) => handleFilter("orderStatus", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table section */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedOrders.length === orders.length &&
                        orders.length > 0
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOrders(orders.map((order) => order.id));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead className="min-w-[200px]">Ordered Items</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(order.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">
                      {order.orderStatus === "pending" ? (
                        <span
                          onClick={() => handleOrderIdClick(order)}
                          className="cursor-pointer"
                        >
                          {order.id}
                        </span>
                      ) : (
                        <span>{order.id}</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm truncate">
                            {item.name}{" "}
                            <span className="text-gray-500">
                              × {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 whitespace-nowrap">
                      {order.orderDate}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={getOrderStatusColor(order.orderStatus)}>
                        {order.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap">
                      ₹{order.price.toFixed(2)}
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
                {selectedOrders.length} of {filteredOrders.length} row(s)
                selected
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
        </CardContent>
      </Card>

      {/* Status Dialog */}
      {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              className="flex items-center gap-2"
              onClick={() => handleOrderStatus("success")}
              variant="outline"
            >
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Mark as Completed
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => handleOrderStatus("pending")}
              variant="outline"
            >
              <XCircle className="h-5 w-5 text-yellow-500" />
              Mark as Pending
            </Button>
          </div>
        </DialogContent>
      </Dialog> */}
      
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="w-full max-w-5xl max-h-[90vh] flex flex-col p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 overflow-auto">
            <div className="md:border-r md:pr-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <PackageX className="text-red-500" />
                  Undelivered Items
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto">
                {undeliveredItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    <Checkbox
                      id={`item-${index}`}
                      className="mr-3"
                      checked={deliveredItems.some(
                        (deliveredItem) => deliveredItem.name === item.name
                      )}
                      onCheckedChange={() => handleItemDelivery(item)}
                    />
                    <label
                      htmlFor={`item-${index}`}
                      className="flex-grow cursor-pointer text-sm sm:text-base"
                    >
                      {item.name}
                    </label>
                    <span className="text-gray-500 font-semibold text-sm sm:text-base">
                      × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:pl-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingCart className="text-blue-500" />
                  Order Details
                </DialogTitle>
              </DialogHeader>
              {selectedOrderDetails && (
                <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Tag className="text-gray-500" size={18} />
                      <span className="font-medium text-sm sm:text-base">
                        Order ID:
                      </span>
                      <span className="text-sm sm:text-base">
                        {selectedOrderDetails.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="text-gray-500" size={18} />
                      <span className="font-medium text-sm sm:text-base">
                        Customer:
                      </span>
                      <span className="text-sm sm:text-base">
                        {selectedOrderDetails.customerName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-500" size={18} />
                      <span className="font-medium text-sm sm:text-base">
                        Order Date:
                      </span>
                      <span className="text-sm sm:text-base">
                        {selectedOrderDetails.orderDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageCheck className="text-green-500" size={18} />
                      <span className="font-medium text-sm sm:text-base">
                        Total Price:
                      </span>
                      <span className="text-sm sm:text-base">
                        ₹{selectedOrderDetails.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <ShoppingCart className="text-gray-500" size={18} />
                      All Items
                    </h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {fullOrderItems.map((item, index) => {
                        const isDelivered = deliveredItems.some(
                          (deliveredItem) => deliveredItem.name === item.name
                        );
                        return (
                          <div
                            key={index}
                            className={`p-2 rounded text-sm sm:text-base ${
                              isDelivered
                                ? "bg-green-50 text-gray-500 line-through"
                                : "bg-gray-100"
                            }`}
                          >
                            {item.name} × {item.quantity}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={handleConfirmOrder}
              disabled={deliveredItems.length !== undeliveredItems.length}
              className="w-full"
            >
              Confirm Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog for notifications */}
      {/* <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {alertContent.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-yellow-500" />
              )}
              {alertContent.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alertContent.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog> */}
      <Footer />
    </>
  );
};

export default OrdersManagementTable;
