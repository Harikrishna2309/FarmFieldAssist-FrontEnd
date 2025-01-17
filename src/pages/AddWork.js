import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/AddWork.css"; // Create this CSS file for responsive design
import apiConfig from "../config/apiConfig";

const AddWork = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    direction: "",
    status: "active",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const farmerId = localStorage.getItem("userId"); // Farmer ID from localStorage
    const token = localStorage.getItem("token"); // Authorization token

    try {
      const response = await axios.post(
        `${apiConfig.apiHost}/creatework`,
        { ...formData, farmerId }, // Combine formData with farmerId
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        }
      );
      if (response.data.success) {
        setSuccessMessage(t("addWork.success"));
        setFormData({
          title: "",
          description: "",
          location: "",
          direction: "",
          status: "active",
        });
      }
    } catch (err) {
      setErrorMessage(t("addWork.error"));
    }
  };

  return (
    <div className="add-work-container">
      <h2>{t("addWork.title")}</h2>
      <form className="add-work-form" onSubmit={handleSubmit}>
        <label htmlFor="title">{t("addWork.form.title")}</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">{t("addWork.form.description")}</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>

        <label htmlFor="location">{t("addWork.form.location")}</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="direction">{t("addWork.form.direction")}</label>
        <input
          type="text"
          id="direction"
          name="direction"
          value={formData.direction}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="status">{t("addWork.form.status")}</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="active">{t("addWork.status.active")}</option>
          <option value="inactive">{t("addWork.status.inactive")}</option>
        </select>

        <button type="submit" className="submit-button">
          {t("addWork.form.submit")}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddWork;
