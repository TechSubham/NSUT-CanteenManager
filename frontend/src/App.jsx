import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import Login from "./Pages/Login/page";
import HomePage from "./Pages/HomePage/page";
import PrivateRoute from "./contexts/authContext/PrivateRoute";
import Dashboard from "./Pages/Dashboard/main";
import AddSnackPage from "./components/ui/AddSnackPage";
import InventoryPage from "./Admin/Inventory/InventoryPage";
import { InventoryProvider } from "./contexts/authContext/InventoryContext";
import CompletedOrders from "./Admin/Orders/CompletedOrders";
import { FoodProvider } from "./contexts/BackendContext/FoodContext";
import OrdersTable from "./Pages/OrderList/page";
import Menu from "./Admin/Menu/index";
import Records from "./Admin/Records/main";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import React, { useEffect } from "react";
import { messaging } from "./firebase/firebase";
import { getToken, onMessage } from "firebase/messaging";

const App = () => {
  async function requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BCClyLmX0MzHcCFdSvQsfq4JDXodhjXxpd2PhUzTAyRlWYssYeli3IMHY6_CA20ZZHjufQvo4wbCEJzqQxN9ztM",
        });
        if (token) {
          console.log("FCM Token:", token);
        } else {
          console.error("Failed to generate FCM token.");
        }
      } else {
        alert("Notification permission denied.");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  }

  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      const { title, body, image } = payload.notification || {};
      new Notification(title || "New Notification", {
        body: body || "You have a new message!",
        icon: image || "/default-icon.png",
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      
      <Router>
        <AuthProvider>
          <FoodProvider>
            {/* <Navbar/> */}
            <InventoryProvider>
              <Routes>
                {/* Route for Login */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                  path="/homepage"
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orderHistory"
                  element={
                    <PrivateRoute>
                      <CompletedOrders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/menu"
                  element={
                    <PrivateRoute>
                      <Menu />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <OrdersTable />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/add"
                  element={
                    <PrivateRoute>
                      <AddSnackPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Inventory"
                  element={
                    <PrivateRoute>
                      <InventoryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/records"
                  element={
                    <PrivateRoute>
                      <Navbar />
                      <div className="mt-20">
                        <Records />
                      </div>
                      <Footer />
                    </PrivateRoute>
                  }
                />

                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </InventoryProvider>
          </FoodProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
