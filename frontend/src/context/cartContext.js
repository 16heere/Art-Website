import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";

// Create Context
const CartContext = createContext();

// Custom hook for easier access
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const resetCartExpiry = useCallback(() => {
        if (cart.length > 0) {
            const expiryTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours from now
            localStorage.setItem("cart", JSON.stringify({ cart, expiryTime }));
        }
    }, [cart]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCartData = localStorage.getItem("cart");
        if (storedCartData) {
            const { cart: storedCart, expiryTime } = JSON.parse(storedCartData);
            if (new Date().getTime() < expiryTime) {
                setCart(storedCart);
            } else {
                localStorage.removeItem("cart"); // Remove expired cart
            }
        }
    }, []);

    // Save cart to localStorage whenever it updates
    useEffect(() => {
        if (cart.length > 0) {
            const expiryTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 hours from now
            localStorage.setItem("cart", JSON.stringify({ cart, expiryTime }));
        } else {
            localStorage.removeItem("cart"); // Clear localStorage if cart is empty
        }
    }, [cart]);

    useEffect(() => {
        const handleUserActivity = () => {
            resetCartExpiry();
        };

        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);
        window.addEventListener("click", handleUserActivity);

        return () => {
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
            window.removeEventListener("click", handleUserActivity);
        };
    }, [cart, resetCartExpiry]);

    // Function to add item to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) =>
                    item.id === product.id &&
                    item.size === product.size &&
                    item.personalization === product.personalization
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id &&
                    item.size === product.size &&
                    item.personalization === product.personalization
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    // Function to update quantity in cart
    const updateCart = (updatedItem) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === updatedItem.id &&
                item.size === updatedItem.size &&
                item.personalization === updatedItem.personalization
                    ? { ...item, quantity: updatedItem.quantity }
                    : item
            )
        );
    };

    // Function to remove item from cart
    const removeFromCart = (id, size, personalization) => {
        setCart((prevCart) =>
            prevCart.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.size === size &&
                        item.personalization === personalization
                    )
            )
        );
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateCart, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
