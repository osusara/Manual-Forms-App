import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import "./styles.css";
import logo from "../../assets/images/allset.png";

const Footer = () => {
  return (
    <Container fluid={true} className="text-center p-0 m-0 mt-4">
      <Image
        src={logo}
        alt="logo"
        width="211.8px"
        height="54px"
        className="mx-auto mb-4"
      />
      <div className="footer-box py-4">
        <span className="footer-title my-4">
          <b>You are good to go..</b>{" "}
          <Button className="btn-secondary">BACK TO TOP</Button>
        </span>
      </div>
    </Container>
  );
};

export default Footer;
