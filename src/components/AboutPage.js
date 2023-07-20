import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AboutPage.css";
import Header from "./Header";
import Footer from "./Foodter";

const AboutPage = () => {
  return (
    <Container>
        
         <Header />
        
      <Row>
        <Col md={6}>
          <h2>About LENINNSKATESHOP</h2>
          <p>
            Founded in 2011, LENINNSKATESHOP is a skateboarding equipment store
            based in Hanoi. Our name "Leninn" is inspired by a statue in Hanoi
            that represents the street culture from the late 90s until now.
            "n" represents the community, which is why we are called "Leninn".
            We are not individuals; we are founded by the community!
          </p>
          <p>
            After 9 years of being a distributor, we felt that it was too
            monotonous, so we decided to become an independent manufacturer. We
            always connect with street culture in general and skateboarding in
            particular. We seek and develop promising individuals within the
            community.
          </p>
          <p>Visit us at:</p>
          <p>123 Street, Hanoi, Vietnam</p>
        </Col>
        <Col md={6}>
          <img
            src="https://fastly.4sqi.net/img/general/600x600/4884992_yRn-nqwkchQvltL23phNH4ROtriYrSOQVH5CflfA6pk.jpg?fbclid=IwAR2hx-iDuZAXSVH6XOwzpFEOxj7gMJM_5D48DPXYN-UCPon1Ag89RikPk24"
            alt="LENINNSKATESHOP Logo"
            className="logo-img"
          />
        </Col>
      </Row>
      <Footer /> 
    </Container>
  );
};

export default AboutPage;