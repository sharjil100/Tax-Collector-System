import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            console.log(res.data);
            alert("Logged in successfully");
        } catch (error) {
            console.error(error);
            setError("Error logging in");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <p>
                Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>

        </form>
    );
};

export default Login;
