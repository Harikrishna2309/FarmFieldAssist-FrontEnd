import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/UserHome.css";
import apiConfig from "../config/apiConfig";

const UserHome = () => {
  const { t } = useTranslation();
  const [activeWorks, setActiveWorks] = useState([]);
  const [inactiveWorks, setInactiveWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch active and inactive works
  useEffect(() => {
    const farmerId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const fetchWorks = async () => {
      try {
        setLoading(true);
        const headers = {
            Authorization: `Bearer ${token}`, // Add the Bearer token
          };
        const activeResponse = await axios.get(
          `${apiConfig.apiHost}/farmer/active?farmerId=${farmerId}`,{ headers }
        );
        const inactiveResponse = await axios.get(
          `${apiConfig.apiHost}/farmer/inactive?farmerId=${farmerId}`,{ headers }
        );

        setActiveWorks(activeResponse.data.data || []);
        setInactiveWorks(inactiveResponse.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(t("home.errorLoadingWorks"));
        setLoading(false);
      }
    };

    fetchWorks();
  }, [t]);

  // Handle Add Work navigation
  const handleAddWork = () => {
    window.location.href = "/add-work"; // Replace with React Router navigation if applicable
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h2>{t("userhome.title")}</h2>
        <button className="add-work-button" onClick={handleAddWork}>
          {t("userhome.addWork")}
        </button>
      </header>

      {loading ? (
        <p>{t("userhome.loading")}</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="topdiv">
          <section className="work-section">
            <h3>{t("userhome.activeWorks")}</h3>
            {activeWorks.length > 0 ? (
              <ul className="work-list">
                {activeWorks.map((work) => (
                  <li key={work.id} className="work-item">
                    <h4>{work.title}</h4>
                    <p>{work.description}</p>
                    <p>
                      <strong>{t("userhome.location")}:</strong> {work.location}
                    </p>
                    <a href={work.direction} target="_blank" rel="noopener noreferrer">
                      {t("userhome.direction")}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("userhome.noActiveWorks")}</p>
            )}
          </section>

          <section className="work-section">
            <h3>{t("userhome.pastWorks")}</h3>
            {inactiveWorks.length > 0 ? (
              <ul className="work-list">
                {inactiveWorks.map((work) => (
                  <li key={work.id} className="work-item">
                    <h4>{work.title}</h4>
                    <p>{work.description}</p>
                    <p>
                      <strong>{t("userhome.location")}:</strong> {work.location}
                    </p>
                    <a href={work.direction} target="_blank" rel="noopener noreferrer">
                      {t("userhome.direction")}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("userhome.noPastWorks")}</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default UserHome;
