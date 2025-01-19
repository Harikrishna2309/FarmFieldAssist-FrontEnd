import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/Login.css";
import apiConfig from "../config/apiConfig";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State for form inputs and response message
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiConfig.apiHost}/login`, formData);
      if (response.data.success) {
        setMessage(t("login.success"));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("role", response.data.role);
  
        // Navigate based on role
        if (response.data.role === 0) {
          navigate("/userhome"); // Farmer home
        } else if (response.data.role === 1) {
          navigate("/labourhome"); // Labour home
        }
        window.location.reload(); 
      } else {
        setMessage(t("login.failure"));
      }
    } catch (error) {
      setMessage(t("login.failure"));
    }
  };
  

  return (
    <div className="login-page">
      <h2>{t("login.title")}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">{t("login.email")}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">{t("login.password")}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit">{t("login.submit")}</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
