import React from 'react'
import { Card, Container } from "react-bootstrap";
import "./style.css";
import allsetLogo from "../../../assets/images/allset.png";

const About = () => {
    return (
      <Container className="mx-auto my-4">
        <Card className="bg-secondary mx-5">
          <Card.Body>
            <h2 className="text-dark">
              <b>About</b>
            </h2>
            <div className="mx-auto text-center">
              <img className="mx-auto my-5" alt=".allset" src={allsetLogo} />
            </div>
            <Card>
              <Card.Body>
                <h3 className="text-center">
                  <span className="text-primary">MANUAL FORM</span>{" "}
                  <span className="text-dark">APPLICATION</span>
                </h3>
                <p className="text-center mx-4">
                  manual form application is a web-based system, devised to
                  provide statistical feedback on manually filled forms. through
                  this tool where users can log onto the system through the
                  internet to create, view statistics or submit the scanned copy
                  of the manually filled forms.this fuses a wide range of
                  existing components.
                </p>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
    );
}

export default About;