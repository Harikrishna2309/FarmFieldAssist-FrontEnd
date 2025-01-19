import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../styles/LabourHome.css";
import apiConfig from "../config/apiConfig";

const LabourHome = () => {
  const { t } = useTranslation();
  const [acceptedWorks, setAcceptedWorks] = useState([]);
  const [otherWorks, setOtherWorks] = useState([]);
  const [allWorks, setAllWorks] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const labourId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${apiConfig.apiHost}/interestbyuser?labourId=${labourId}`,
          { headers }
        );
        const { data } = response.data;

        const accepted = data.filter((work) => work.status === "accepted");
        const others = data.filter((work) => work.status !== "accepted");

        setAcceptedWorks(accepted);
        setOtherWorks(others);
        setLoading(false);
      } catch (err) {
        setError(t("labourHome.errorLoading"));
        setLoading(false);
      }
    };

    fetchWorks();
  }, [labourId, token, t]);

  const handleSearchWork = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${apiConfig.apiHost}/allworks`, { headers });
      setAllWorks(response.data.data || []);
      setShowSearch(true);
      setLoading(false);
    } catch (err) {
      setError(t("labourHome.errorLoadingAllWorks"));
      setLoading(false);
    }
  };

  const handleShowInterest = async (workId) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(
        `${apiConfig.apiHost}/express?id=${labourId}&workid=${workId}`,
        null,
        { headers }
      );
      alert(t("labourHome.interestSuccess"));
    } catch (err) {
      alert(t("labourHome.interestFailure"));
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h2>{t("labourHome.title")}</h2>
        <button className="search-work-button" onClick={handleSearchWork}>
          {t("labourHome.searchWork")}
        </button>
      </header>

      {loading ? (
        <p>{t("labourHome.loading")}</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          {!showSearch ? (
            <>
              <section className="work-section">
                <h3>{t("labourHome.acceptedWorks")}</h3>
                {acceptedWorks.length > 0 ? (
                  <ul className="work-list">
                    {acceptedWorks.map(({ work }) => (
                      <li key={work.id} className="work-item">
                        <h4>{work.title}</h4>
                        <p>{work.description}</p>
                        <p>
                          <strong>{t("labourHome.location")}:</strong> {work.location}
                        </p>
                        <a href={work.direction} target="_blank" rel="noopener noreferrer">
                          {t("labourHome.direction")}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("labourHome.noAcceptedWorks")}</p>
                )}
              </section>

              <section className="work-section">
                <h3>{t("labourHome.otherWorks")}</h3>
                {otherWorks.length > 0 ? (
                  <ul className="work-list">
                    {otherWorks.map(({ work }) => (
                      <li key={work.id} className="work-item">
                        <h4>{work.title}</h4>
                        <p>{work.description}</p>
                        <p>
                          <strong>{t("labourHome.location")}:</strong> {work.location}
                        </p>
                        <a href={work.direction} target="_blank" rel="noopener noreferrer">
                          {t("labourHome.direction")}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("labourHome.noOtherWorks")}</p>
                )}
              </section>
            </>
          ) : (
            <section className="work-section">
              <h3>{t("labourHome.allWorks")}</h3>
              {allWorks.length > 0 ? (
                <ul className="work-list">
                  {allWorks.map((work) => (
                    <li key={work.id} className="work-item">
                      <h4>{work.title}</h4>
                      <p>{work.description}</p>
                      <p>
                        <strong>{t("labourHome.location")}:</strong> {work.location}
                      </p>
                      <a href={work.direction} target="_blank" rel="noopener noreferrer">
                        {t("labourHome.direction")}
                      </a>
                      <button
                        className="interest-button"
                        onClick={() => handleShowInterest(work.id)}
                      >
                        {t("labourHome.showInterest")}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t("labourHome.noAllWorks")}</p>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default LabourHome;
