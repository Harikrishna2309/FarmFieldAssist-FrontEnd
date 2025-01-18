import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfileModal.css";
import apiConfig from "../config/apiConfig";
import { useTranslation } from "react-i18next";

const ProfileModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${apiConfig.apiHost}/user/?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data.data))
      .catch((err) => console.error(err));
  }, [userId, token]);

  const handleSave = () => {
    const formData = new FormData();
    for (let key in userData) {
      formData.append(key, userData[key]);
    }

    axios
      .put(
        `${apiConfig.apiHost}/updateuser?id=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        setMessage(t("profile.success"));
        setTimeout(onClose, 2000); // Close the modal after a short delay
      })
      .catch(() => setMessage(t("profile.error")));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, image: file, imageUrl });
    }
  };

  return (
    <div className="profile-modal">
      <div className="modals-content">
        {/* Profile Image Section */}
        <div className="profile-image-container">
          <img
            src={
              userData.imageUrl || userData.image || "default-profile.png"
            }
            alt={t("profile.imageAlt")}
            className="profile-image"
          />
          <label htmlFor="image-upload" className="edit-icon">
            ✎
          </label>
          <input
            type="file"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        <h2>{t("profile.title")}</h2>

        <div className="profile-form">
          <label>{t("profile.name")}</label>
          <input
            type="text"
            value={userData.name || ""}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder={t("profile.name")}
          />

          <label>{t("profile.email")}</label>
          <input
            type="email"
            value={userData.email || ""}
            placeholder={t("profile.email")}
            disabled
          />

          <label>{t("profile.phone")}</label>
          <input
            type="text"
            value={userData.phone || ""}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            placeholder={t("profile.phone")}
          />

          <label>{t("profile.alterPhone")}</label>
          <input
            type="text"
            value={userData.alter_phone || ""}
            onChange={(e) =>
              setUserData({ ...userData, alter_phone: e.target.value })
            }
            placeholder={t("profile.alterPhone")}
          />
        </div>

        {message && <p className="message">{message}</p>}

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            {t("profile.close")}
          </button>
          <button onClick={handleSave} className="save-button">
            {t("profile.update")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
