import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";

const Header = () => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ta" : "en");
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>FarmField</h1>
        <nav>
          <button>{t("header.login")}</button>
          <button>{t("header.register")}</button>
          <button onClick={switchLanguage}>{t("header.switch_language")}</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
