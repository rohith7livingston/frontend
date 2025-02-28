import { useState } from "react";
import "./../stylesheet/Register.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To navigate after successful registration

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmpassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/posting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration Successful!");
                navigate("/login"); // Redirect to login page
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("The server is on high load Please try again later!");
        }
    };

    return (
        <div className="hai">
            <div className="container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input 
                        value={formData.name} 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your full name" 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="email">Email</label>
                    <input 
                        value={formData.email} 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        value={formData.password} 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Create a password" 
                        onChange={handleChange} 
                        required 
                    />

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input 
                        value={formData.confirmpassword} 
                        type="password" 
                        id="confirmpassword" 
                        name="confirmpassword" 
                        placeholder="Confirm your password" 
                        onChange={handleChange} 
                        required 
                    />

                    {error && <p className="error">{error}</p>}

                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
