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
import Beverage from "./Admin/Beverage/page";
import Meal from "./Admin/Meals/page";
import Snack from "./Admin/Snacks/page"; 
import Dashboard from './Pages/Dashboard/main'
import BeverageTable from "./Admin/Table/beveragetable";
import SnackTable from "./Admin/Table/Snackstable";
import MealTable from "./Admin/Table/mealtable";
import AddSnackPage from "./components/ui/AddSnackPage";
import InventoryPage from "./components/ui/InventoryPage";
import { InventoryProvider } from "./contexts/authContext/InventoryContext";
import Navbar from "./components/ui/Navbar";
import CompletedOrders from "./Admin/Orders/CompletedOrders";
import ReceiptPopup from "./Admin/Orders/ReceiptPopup";
import { FoodProvider } from "./contexts/BackendContext/FoodContext";
import OrdersTable from "./Pages/OrderList/page";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FoodProvider>
        <Navbar />
        {/* <Navbar/> */}
        <InventoryProvider>
          <Routes >
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
              path="/Beverage"
              element={
                <PrivateRoute>
                  <Beverage />
                </PrivateRoute>
              }
            />
            <Route
              path="/Meals"
              element={
                <PrivateRoute>
                  <Meal />
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
              path="/BeverageTable"
              element={
                <PrivateRoute>
                  <BeverageTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/Snackstable"
              element={
                <PrivateRoute>
                  <SnackTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/mealtable"
              element={
                <PrivateRoute>
                  <MealTable />
                </PrivateRoute>
              }
            />

            <Route
              path="/AddSnack"
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
              path="/OrderList"
              element={
                <PrivateRoute>
                  <OrdersTable />
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