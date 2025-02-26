import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import { useCart } from "../context/cartContext";

const Navbar = () => {
    const { cart } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Firebird Art</Link>
                <p>Creativity, Connection, Mental Health</p>
            </div>
            <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/mental-health"
                        onClick={() => setMenuOpen(false)}
                    >
                        Mental Health
                    </Link>
                </li>
                <li className="cart-icon">
                    <Link
                        to="/cart"
                        className="full-click"
                        onClick={() => setMenuOpen(false)}
                    >
                        Cart ({cartCount})
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
