import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/EditWorkModal.css";

const EditWorkModal = ({ work, onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: work.title || "",
    description: work.description || "",
    location: work.location || "",
    direction: work.direction || "",
    status: work.status || "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/formfield/updatework?id=${work.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        onSave(); // Trigger refresh in parent component
        onClose(); // Close the modal
      } else {
        alert(t("editWork.errorUpdate")); // Show error message in localized language
      }
    } catch (error) {
      console.error("Error updating work:", error);
      alert(t("editWork.errorOccurred"));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{t("editWork.title")}</h3>
        <form className="edit-work-form">
          <label>
            {t("editWork.labelTitle")}:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            {t("editWork.labelDescription")}:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            {t("editWork.labelLocation")}:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            {t("editWork.labelDirection")}:
            <input
              type="text"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
            />
          </label>
          <label>
            {t("editWork.labelStatus")}:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">{t("editWork.statusActive")}</option>
              <option value="completed">{t("editWork.statusInactive")}</option>
            </select>
          </label>
        </form>
        <div className="modal-actions">
          <button onClick={handleSave}>{t("editWork.saveButton")}</button>
          <button onClick={onClose}>{t("editWork.cancelButton")}</button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkModal;