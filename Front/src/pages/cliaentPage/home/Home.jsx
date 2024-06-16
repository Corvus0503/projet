import React from "react";
import "../../../styles/hero-section.css";
import "../../../styles/clientS.css";
import guyImg from "../../../images/delivery-guy.png";
import { Container, Row, Col } from "reactstrap";

const Home = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h5 className="mb-3">Commande facile et Livrison rapide</h5>
              <h1 className="mb-4 hero__title">
                <span>Affamé</span> attendez votre repas juste à{" "}
                <span> votre porte</span>
              </h1>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={guyImg} alt="delivery-guy" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
