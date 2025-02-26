const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { createClient } = require("contentful");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

const app = express();

const corsOptions = {
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

// CORS Middleware
app.use(cors(corsOptions));

// Handle Preflight Requests
app.options("*", cors(corsOptions));
app.use(express.json());

// Contentful client setup
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Fetch products from Contentful
app.get("/api/products", async (req, res) => {
    try {
        const entries = await client.getEntries({
            content_type: "artProducts",
        });
        const products = entries.items.map((item) => ({
            id: item.sys.id,
            name: item.fields.productName,
            prices: item.fields.prices,
            image: item.fields.productImage
                ? item.fields.productImage.fields.file.url
                : "",
        }));
        res.json({ products: products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
});

// Stripe checkout session
app.post("/api/checkout", async (req, res) => {
    try {
        const { cartItems, customerAddress, customerEmail } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cartItems.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name || "Unknown Item",
                    },
                    unit_amount: (item.price || 0) * 100, // Convert price to cents
                },
                quantity: item.quantity || 1,
            })),
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({
            message: "Error creating Stripe session",
            error: error.message,
        });
    }
});

app.get("/api/google-places", async (req, res) => {
    try {
        const { input } = req.query;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
            {
                params: {
                    input: input,
                    key: process.env.GOOGLE_PLACES_API_KEY,
                    types: "address",
                    language: "en", // Change to "navigator.language" if needed
                },
            }
        );

        res.json(response.data); // Send response back to frontend
    } catch (error) {
        console.error("Google Places API Error:", error);
        res.status(500).json({
            message: "Error fetching places",
            error: error.message,
        });
    }
});

app.get("/api/google-place-details", async (req, res) => {
    const { place_id } = req.query;
    try {
        const response = await axios.get(
            "https://maps.googleapis.com/maps/api/place/details/json",
            {
                params: {
                    place_id,
                    key: process.env.GOOGLE_MAPS_API_KEY,
                    fields: "formatted_address",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch place details" });
    }
});

app.post("/api/validate-address", async (req, res) => {
    const { address } = req.body;

    try {
        const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/search`,
            {
                params: {
                    text: address, // User input
                    apiKey: process.env.GEOAPIFY_API_KEY,
                    limit: 1, // Get only 1 best match
                },
            }
        );

        if (!response.data.features.length) {
            return res.json({ valid: false, message: "Invalid address." });
        }

        // Extract address details
        const bestMatch = response.data.features[0].properties;
        const formattedAddress = bestMatch.formatted;

        // Ensure address has a house number
        const streetNumber = bestMatch.housenumber; // Geoapify returns this field

        if (!streetNumber) {
            return res.json({
                valid: false,
                message: "Please enter a full address with a house number.",
            });
        }

        res.json({
            valid: true,
            correctedAddress: formattedAddress,
            message: "Valid and standardized address.",
        });
    } catch (error) {
        console.error(
            "Error validating address:",
            error.response?.data || error.message
        );
        return res
            .status(400)
            .json({ error: "Invalid address format or API request failed." });
    }
});

// Email confirmation (using Nodemailer)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateCustomerEmailHTML = (orderDetails) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #333;">Thank You for Your Order!</h2>
            <p style="font-size: 16px; color: #555;">We appreciate your purchase. Here are your order details:</p>
            
            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                ${orderDetails
                    .map(
                        (item) => `
                    <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        <img src="https:${item.image}" alt="${
                            item.name
                        }" style="width: 80px; height: auto; border-radius: 5px; margin-right: 15px;">
                        <div>
                            <p style="margin: 0; font-weight: bold; color: #333;">${
                                item.name
                            } - ${item.size}</p>
                            <p style="margin: 2px 0; color: #777;">Quantity: ${
                                item.quantity
                            }</p>
                            <p style="margin: 2px 0; color: #777;">Personalization: ${
                                item.personalization || "None"
                            }</p>
                            <p style="margin: 2px 0; font-weight: bold; color: #000;">£${item.price.toFixed(
                                2
                            )}</p>
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>

            <p style="text-align: center; margin-top: 20px; font-size: 16px; color: #444;">We hope you enjoy your purchase!</p>
        </div>
    `;
};

const generateAdminEmailHTML = (
    customerEmail,
    customerAddress,
    orderDetails
) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #d9534f;">New Order Received</h2>
            <p style="font-size: 16px; color: #555;">Customer Email: <strong>${customerEmail}</strong></p>
            <p style="font-size: 16px; color: #555;">Shipping Address: <strong>${customerAddress}</strong></p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                ${orderDetails
                    .map(
                        (item) => `
                    <div style="display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                        <img src="https:${item.image}" alt="${
                            item.name
                        }" style="width: 80px; height: auto; border-radius: 5px; margin-right: 15px;">
                        <div>
                            <p style="margin: 0; font-weight: bold; color: #333;">${
                                item.name
                            } - ${item.size}</p>
                            <p style="margin: 2px 0; color: #777;">Quantity: ${
                                item.quantity
                            }</p>
                            <p style="margin: 2px 0; color: #777;">Personalization: ${
                                item.personalization || "None"
                            }</p>
                            <p style="margin: 2px 0; font-weight: bold; color: #000;">£${item.price.toFixed(
                                2
                            )}</p>
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>
        </div>
    `;
};

app.post("/api/send-customer-email", async (req, res) => {
    const { customerEmail, customerAddress, orderDetails } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Order Confirmation",
        html: generateCustomerEmailHTML(orderDetails),
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.log("Error sending email: " + error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.post("/api/send-admin-email", async (req, res) => {
    const { customerEmail, customerAddress, orderDetails } = req.body;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Order!",
        html: generateAdminEmailHTML(
            customerEmail,
            customerAddress,
            orderDetails
        ),
    };
    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
