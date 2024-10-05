
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./auth/Signup/Signup";
import Login from "./auth/Login";
import TierSection from "./pages/TierSection";
import CheckoutPage from "./pages/PaymentPage";

const App = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <main className="flex-grow">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tiers" element={<TierSection />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
