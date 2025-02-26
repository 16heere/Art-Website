import React, { useState } from "react";
import axios from "axios";
import "../styles/cart.css";
import { useCart } from "../context/cartContext";

const Cart = () => {
    const { cart, updateCart, removeFromCart } = useCart();
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchAddressSuggestions = async (query) => {
        if (!query || query.length < 3) return;
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/google-places`,
                {
                    params: {
                        input: query.trim(),
                        types: "address", // Ensures only addresses are suggested
                    },
                }
            );
            console.log("Google API Response from Backend:", response.data);
            setSuggestions(
                response.data.predictions.map((p) => ({
                    description: p.description,
                    place_id: p.place_id,
                }))
            );
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
        }
    };

    const fetchExactAddress = async (placeId) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/google-place-details`,
                {
                    params: { place_id: placeId },
                }
            );
            if (response.data.result) {
                setAddress(response.data.result.formatted_address);
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    const handleAddressSelect = (suggestion) => {
        setAddress(suggestion.description);
        fetchExactAddress(suggestion.place_id);
        setSuggestions([]);
    };

    const handleQuantityChange = (id, size, personalization, newQuantity) => {
        if (newQuantity < 1) return;

        updateCart({
            id,
            size,
            personalization,
            quantity: newQuantity,
        });
    };

    const handleRemove = (id, size, personalization) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this item from your cart?"
        );

        if (confirmDelete) {
            removeFromCart(id, size, personalization);
        }
    };

    const handleCheckout = async () => {
        if (!email || !address) {
            alert("Please enter your email and address before checkout.");
            return;
        }

        try {
            const validationResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/validate-address`,
                { address }
            );

            console.log(validationResponse);
            console.log(address);

            if (!validationResponse.data.valid) {
                alert(`Address Issue: ${validationResponse.data.message}`);
                return;
            }

            const finalAddress =
                validationResponse.data.correctedAddress || address;

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/checkout`,
                {
                    cartItems: cart,
                    customerEmail: email,
                    customerAddress: finalAddress,
                }
            );

            if (response.data.url) {
                sessionStorage.setItem(
                    "orderDetails",
                    JSON.stringify({
                        cart,
                        customerEmail: email,
                        customerAddress: finalAddress,
                    })
                );

                window.location.href = response.data.url;
            } else {
                console.error("Checkout URL not received");
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            alert("Error validating address. Please enter a valid address.");
        }
    };

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page-container">
            <div className="cart-container">
                <h1>Shopping Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-details">
                                    <div className="cart-details-info"></div>
                                    <h2>{item.name}</h2>
                                    <p>Size: {item.size}</p>
                                    <p>
                                        Personalization:{" "}
                                        {item.personalization || "None"}
                                    </p>
                                    <p>Price: ${item.price}</p>
                                    <div className="quantity-control">
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.size,
                                                    item.personalization,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.size,
                                                    item.personalization,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            handleRemove(
                                                item.id,
                                                item.size,
                                                item.personalization
                                            )
                                        }
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Input fields for email and address */}
                        <div className="customer-info">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />

                            <label>Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    fetchAddressSuggestions(e.target.value);
                                }}
                                placeholder="Enter your shipping address"
                            />
                            {suggestions.length > 0 && (
                                <ul className="suggestions">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                handleAddressSelect(suggestion)
                                            }
                                        >
                                            {suggestion.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <h2>Total: ${totalPrice.toFixed(2)}</h2>
                        <button
                            className="checkout-button"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
