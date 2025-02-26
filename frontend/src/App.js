import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/ShopPage";
import Cart from "./pages/CartPage";
import About from "./pages/AboutPage";
import MentalHealth from "./pages/MentalHealthPage";
import ProductPage from "./pages/ProductPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Navbar from "./components/Navbar";
import "./App.css";
import { CartProvider } from "./context/cartContext";
import PasswordProtection from "./components/PasswordProtection";

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("authenticated") === "true") {
            setAuthenticated(true);
        }
    }, []);

    if (!authenticated) {
        return <PasswordProtection onUnlock={() => setAuthenticated(true)} />;
    }

    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mental-health" element={<MentalHealth />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/success" element={<CheckoutSuccess />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
