import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/productpage.css";
import { useCart } from "../context/cartContext";

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("A4");
    const [personalization, setPersonalization] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedPrice, setSelectedPrice] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products`
            );
            const selectedProduct = response.data.products.find(
                (item) => item.id === id
            );
            setProduct(selectedProduct);
            setSelectedPrice(selectedProduct.prices["A4"]);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSize(newSize);
        setSelectedPrice(product.prices[newSize]);
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            size,
            personalization,
            quantity,
            price: selectedPrice,
        });
    };

    return (
        <div className="product-page-container">
            <img
                className="product-image"
                src={product.image}
                alt={product.title}
            />
            <div className="product-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>Price: ${selectedPrice}</p>

                <label>Size:</label>
                <select value={size} onChange={handleSizeChange}>
                    {Object.keys(product.prices).map((sizeOption) => (
                        <option key={sizeOption} value={sizeOption}>
                            {sizeOption}
                        </option>
                    ))}
                </select>

                <label>Personalization:</label>
                <input
                    type="text"
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    placeholder="Enter custom text"
                />

                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value)))
                    }
                    min="1"
                />

                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductPage;
