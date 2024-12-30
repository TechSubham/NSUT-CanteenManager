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
import Beverage from "./Pages/Beverage/page"
import Meal from "./Pages/Meals/page"
import Snack from "./Pages/Snacks/page"
import BeverageTable from "./Pages/Table/beveragetable";
import SnackTable from "./Pages/Table/Snackstable";
import MealTable from "./Pages/Table/mealtable";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
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
                <Snack />
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
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
