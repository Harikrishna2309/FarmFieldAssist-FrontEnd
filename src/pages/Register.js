import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import apiConfig from "../config/apiConfig";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    alter_phone: 0,
    cost: 0,
    age: 0,
    role: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${apiConfig.apiHost}/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(t("register.success")); // Show success alert
      console.log(response.data);

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      alert(t("register.error")); // Show error alert
      console.error(error.response.data);
    }
  };

  return (
    <div id="register-page">
      <div className="register">
        <h2>{t("register.title")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("register.name")}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.password")}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.phone")}</label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t("register.alter_phone")}</label>
            <input
              type="number"
              name="alter_phone"
              value={formData.alter_phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("register.cost")}</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("register.age")}</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>{t("register.role")}</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">{t("register.select_role")}</option>
              <option value="1">{t("register.farmer")}</option>
              <option value="2">{t("register.labourer")}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t("register.image")}</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>

          <button type="submit">{t("register.submit")}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
