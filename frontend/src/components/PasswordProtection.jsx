import React, { useState, useEffect } from "react";

const PasswordProtection = ({ onUnlock }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if the user is already authenticated
        if (localStorage.getItem("authenticated") === "true") {
            onUnlock();
        }
    }, [onUnlock]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === process.env.REACT_APP_PASSWORD) {
            localStorage.setItem("authenticated", "true"); // Store authentication
            onUnlock(); // Unlock the site
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Enter Password to Access the Site</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                />
                <button type="submit">Unlock</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default PasswordProtection;
