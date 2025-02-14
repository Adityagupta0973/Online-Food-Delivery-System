import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import CategoryPrivateRoute from './Categories/utils/CategoryPrivateRoute';
import { CategoryAuthProvider } from './Categories/context/CategoryAuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfile from './pages/UserProfile';
import LandingPage from './pages/LandingPage';
import ViewFoodItems from './pages/ViewFoodItems';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import CheckoutCancelPage from './pages/CheckoutCancelPage';

import CategoryHomePage from './Categories/pages/CategoryHomePage';
import CategoryLoginPage from './Categories/pages/CategoryLoginPage';
import CategoryRegisterPage from './Categories/pages/CategoryRegisterPage';
import ManageFoodItems from './Categories/pages/ManageFoodItems';
import AddFoodItem from './Categories/pages/AddFoodItem';
import ManageOrders from './Categories/pages/ManageOrders';
import EditFoodItem from './Categories/pages/EditFoodItem';
import CategoryAccountSetup from './Categories/pages/CategoryAccountSetup';
import StripeReturnUrlPage from './Categories/pages/StripeReturnUrlPage';
import StripeRefreshUrlPage from './Categories/pages/StripeRefreshUrlPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CategoryAuthProvider>
            <Routes>
              {/* General Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/category" element={<HomePage />} />

              {/* Private Routes */}
              <Route path="/my-account" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/category/:id" element={<PrivateRoute><ViewFoodItems /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
              <Route path="/checkout/success" element={<PrivateRoute><CheckoutSuccessPage /></PrivateRoute>} />
              <Route path="/checkout/cancel" element={<PrivateRoute><CheckoutCancelPage /></PrivateRoute>} />

              {/* Category Routes */}
              <Route path="/partner-with-us" element={<CategoryHomePage />} />
              <Route path="/partner-with-us/login" element={<CategoryLoginPage />} />
              <Route path="/partner-with-us/register" element={<CategoryRegisterPage />} />
              <Route path="/partner-with-us/manage-food-items" element={<CategoryPrivateRoute><ManageFoodItems /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/manage-food-items/:id" element={<CategoryPrivateRoute><EditFoodItem /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/add-food-item" element={<CategoryPrivateRoute><AddFoodItem /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/orders" element={<CategoryPrivateRoute><ManageOrders /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/account-setup" element={<CategoryPrivateRoute><CategoryAccountSetup /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/account-setup/return-url" element={<CategoryPrivateRoute><StripeReturnUrlPage /></CategoryPrivateRoute>} />
              <Route path="/partner-with-us/account-setup/refresh-url" element={<CategoryPrivateRoute><StripeRefreshUrlPage /></CategoryPrivateRoute>} />
            </Routes>
          </CategoryAuthProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
