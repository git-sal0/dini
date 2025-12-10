import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import MissionImage from "./Login.jpg";
import "./Login.css";

function LogIn() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = "Le nom d'utilisateur est requis";
        }
        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis";
        } else if (formData.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Here you would typically make an API call to authenticate
        console.log("Login attempt:", formData);
        
        // For now, just navigate to home page
        // In a real app, you'd check the response and handle errors
        navigate("/Acceuil");
    };

    return (
        <div className="Login-Page" style={{backgroundImage: `url(${MissionImage})`}}>
            <div className="Login-Overlay"></div>
            <div className="Login-Container">
                <div className="Login-Card">
                    <div className="Login-Header">
                        <FaLock className="Login-Icon" />
                        <h1 className="Login-Title">Se conecter</h1>
                    </div>

                    <form className="Login-Form" onSubmit={handleSubmit}>
                        <div className="Form-Group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Nom d'utilisateur"
                                value={formData.username}
                                onChange={handleChange}
                                className={`Login-Input ${errors.username ? "Input-Error" : ""}`}
                                aria-label="Username"
                            />
                            {errors.username && (
                                <span className="Error-Message">{errors.username}</span>
                            )}
                        </div>

                        <div className="Form-Group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mot de pass"
                                value={formData.password}
                                onChange={handleChange}
                                className={`Login-Input ${errors.password ? "Input-Error" : ""}`}
                                aria-label="Password"
                            />
                            {errors.password && (
                                <span className="Error-Message">{errors.password}</span>
                            )}
                        </div>

                        <button type="submit" className="Login-Button">
                            Se connecter
                        </button>
                    </form>

                    <div className="Login-Footer">
                        <p className="Register-Link">
                            pas de compte <Link to="/Signin" className="Link-Register">Creer un compte</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;