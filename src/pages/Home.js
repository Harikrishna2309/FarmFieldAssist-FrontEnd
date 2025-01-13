import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Home.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h2>{t("home.title")}</h2>
      <p>{t("home.description")}</p>
      <p>{t("home.details")}</p>
    </div>
  );
};

export default Home;
