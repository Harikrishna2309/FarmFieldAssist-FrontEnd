import React from "react";
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import "../styles/Home.css";
import banner from "../assets/BannerHome.jpg";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home" id="homepage">
      <Row className="d-flex justify-content-center">
        <Col lg={9} className="heading">
          <h2>{t("home.title")}</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-5">
        <Col lg={5}>
          <p className="text-align-justify">{t("home.bannercontent")}</p>
        </Col>
        <Col lg={4}>
          <img src={banner} alt="Placeholder" className="img-full-col" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col lg={4} className="d-flex justify-content-center text-center align-items-center"><h1>{t("home.secondsecheading")}</h1></Col>
        <Col lg={6} className="text-align-justify"><p>{t("home.secondseccontent")}</p></Col>
      </Row>
    </div>
  );
};

export default Home;
