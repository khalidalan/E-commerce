import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import WishList from "./Pages/WishList";
import ContactPage from "./Pages/ContactPage";
import Error from "./Pages/Error";
import Details from "./Pages/Details";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";
import { WishlistProvider } from "./contexts/WishlistContext";
import CartProvider from "./contexts/CartContext";
import PaymentDetails from "./Pages/payment-details";
import CategoryPage from "./Pages/Category";
import SearchPage from "./Pages/SearchPage";
import AuthProvider from "./contexts/AuthContext";
import Account from "./Pages/Account";
import ForgotPassword from "./Pages/ForgotPassword";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/product/:id" element={<Details />} />
            <Route path="*" element={<Error />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
