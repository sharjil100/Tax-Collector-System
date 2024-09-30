import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "individual",
        businessType: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            console.log(res.data);

            alert("Registered successfully");
        } catch (error) {
            console.error(error);
            setError("Error registering");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <div className="error-message">{error}</div>}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select name="role" onChange={handleChange} value={formData.role}>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
            </select>
            {formData.role === "business" && (
                <select
                    name="businessType"
                    onChange={handleChange}
                    value={formData.businessType}
                >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Garments">Garments</option>
                    <option value="IT">IT</option>
                    <option value="Others">Others</option>
                </select>
            )}
            <button type="submit">Sign Up</button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};

export default Signup;
