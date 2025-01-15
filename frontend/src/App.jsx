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
import Dashboard from './Pages/Dashboard/main'
import AddSnackPage from "./components/ui/AddSnackPage";
import InventoryPage from "./Admin/Inventory/InventoryPage";
import { InventoryProvider } from "./contexts/authContext/InventoryContext";
import Navbar from "./components/ui/Navbar";
import CompletedOrders from "./Admin/Orders/CompletedOrders";
import { FoodProvider } from "./contexts/BackendContext/FoodContext";
import OrdersTable from "./Pages/OrderList/page";
import Menu from './Admin/Menu/index'
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FoodProvider>
          {/* <Navbar/> */}
        <InventoryProvider>
          <Routes >
            {/* Route for Login */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/homepage"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route path="/orderHistory"
              element={
                <PrivateRoute>
                  <CompletedOrders />
                </PrivateRoute>
              }
            />
            <Route path="/menu"
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
              path="/Snacks" 
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
           

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </InventoryProvider>
        </FoodProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;