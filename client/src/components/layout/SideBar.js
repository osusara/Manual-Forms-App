import React from "react";
import { Link } from "react-router-dom";
import { Nav, Card } from "react-bootstrap";

const SideBar = () => {
  return (
    <Card className="bg-dark">
      <Card.Body>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Link to="/documents" className="nav text-center bg-dark py-5">
              <h1 className="display-3 m-auto text-light">
                <i className="fas fa-bars"></i>
              </h1>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/documents/create"
              className="nav text-center bg-dark py-5"
            >
              <h1 className="display-3 m-auto text-light">
                <i className="fas fa-plus-square"></i>
              </h1>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/documents/upload"
              className="nav text-center bg-dark py-5"
            >
              <h1 className="display-3 m-auto text-light">
                <i className="fas fa-file-upload"></i>
              </h1>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              to="/documents/stats"
              className="nav text-center bg-dark py-5"
            >
              <h1 className="display-3 m-auto text-light">
                <i className="fas fa-chart-bar"></i>
              </h1>
            </Link>
          </Nav.Item>
        </Nav>
      </Card.Body>
    </Card>
  );
};

export default SideBar;
