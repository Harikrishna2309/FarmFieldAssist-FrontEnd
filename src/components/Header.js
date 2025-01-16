import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <nav>
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
        <h1>{t("header.title")}</h1>

        <div className="auth-buttons">
          <button className="auth-button">{t("header.login")}</button>
          <button className="auth-button" onClick={() => navigate("/register")}>
            {t("header.register")}
          </button>{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
