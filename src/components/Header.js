import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";
import ProfileModal from "../pages/ProfileModal";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/"); // Navigate to home on logout
  };

  const handleHomeClick = () => {
    if (isLoggedIn) {
      navigate("/userhome"); // Navigate to "userhome" if logged in
    } else {
      navigate("/"); // Navigate to home if logged out
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Language Buttons */}
        <div>
          <nav className="d-flex">
            <button
              className="language-button"
              onClick={() => switchLanguage("en")}
            >
              English
            </button>
            <button
              className="language-button"
              onClick={() => switchLanguage("ta")}
            >
              தமிழ்
            </button>
          </nav>
        </div>

        {/* Title */}
        <h1>{t("header.title")}</h1>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <button className="home-button" onClick={handleHomeClick}>
            🏠︎
          </button>
          {isLoggedIn ? (
            <>
              <button
                className="auth-button"
                onClick={() => setShowProfileModal(true)}
              >
                {t("header.profile")}
              </button>
              <button className="auth-button" onClick={handleLogout}>
                {t("header.logout")}
              </button>
            </>
          ) : (
            <>
              <button
                className="auth-button"
                onClick={() => navigate("/login")}
              >
                {t("header.login")}
              </button>
              <button
                className="auth-button"
                onClick={() => navigate("/register")}
              >
                {t("header.register")}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </header>
  );
};

export default Header;
