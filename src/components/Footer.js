import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t("footer.copyright")}</p>
        <p>{t("footer.developedBy")}</p>
      </div>
    </footer>
  );
};

export default Footer;
