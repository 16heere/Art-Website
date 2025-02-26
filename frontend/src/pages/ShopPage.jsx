import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/shop.css";

const Shop = () => {
    const [products, setProducts] = useState([]);

    //cp,,emt
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products`
            );
            setProducts(response.data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div className="shop-container">
            <div className="hero-section">
                <img
                    src="/images/mental-health.webp"
                    alt=""
                    className="hero-image"
                />
                <div className="hero-text">
                    <h1>Art for Mental Health</h1>
                    <p>
                        Every purchase you make supports mental health
                        charities. We believe in the power of art to heal,
                        inspire, and bring change. 100% of our profits go to
                        organizations dedicated to mental well-being.
                    </p>
                    <Link
                        to="/about#get-involved"
                        className="get-involved-button"
                    >
                        Donate Now
                    </Link>
                </div>
            </div>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>${product.prices["A4"]}</p>
                        <div className="product-actions">
                            <Link
                                to={`/product/${product.id}`}
                                className="view-button"
                            >
                                View
                            </Link>
                            <a
                                href={`https://www.zazzle.com/store/firebird_flow?qs=${product.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="zazzle-button"
                            >
                                Buy on Zazzle
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
