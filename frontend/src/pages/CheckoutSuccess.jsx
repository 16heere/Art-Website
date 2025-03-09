import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../styles/checkoutsuccess.css"; // Ensure you link this CSS file

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [dots, setDots] = useState("");

    useEffect(() => {
        // Retrieve stored order details
        const orderDetails = JSON.parse(sessionStorage.getItem("orderDetails"));

        if (orderDetails) {
            console.log("✅ Sending order confirmation emails...");

            // ✅ Send customer email
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/api/send-customer-email`,
                    {
                        customerEmail: orderDetails.customerEmail,
                        customerAddress: orderDetails.customerAddress,
                        orderDetails: orderDetails.cart,
                    }
                )
                .then(() => console.log("✅ Customer email sent"))
                .catch((error) =>
                    console.error("❌ Error sending customer email:", error)
                );

            // ✅ Send admin email
            axios
                .post(`${process.env.REACT_APP_API_URL}/api/send-admin-email`, {
                    customerEmail: orderDetails.customerEmail,
                    customerAddress: orderDetails.customerAddress,
                    orderDetails: orderDetails.cart,
                })
                .then(() => console.log("✅ Admin email sent"))
                .catch((error) =>
                    console.error("❌ Error sending admin email:", error)
                );

            // ✅ Clear sessionStorage after sending emails
            sessionStorage.removeItem("orderDetails");
        }

        // ✅ Animate dots in the "Redirecting" message
        const dotsInterval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
        }, 500);

        // ✅ Redirect to shop after 5 seconds
        const timer = setTimeout(() => {
            clearCart();
            navigate("/");
        }, 5000);

        return () => {
            clearTimeout(timer);
            clearInterval(dotsInterval);
        };
    }, [navigate, clearCart]);

    return (
        <div className="checkout-success-container">
            <h1>Thank you for your purchase!</h1>
            <p>Your order has been successfully processed.</p>
            <p>You will receive a confirmation email shortly.</p>
            <p className="redirecting-text">
                Redirecting you back to the shop{dots}
            </p>
        </div>
    );
};

export default CheckoutSuccess;
