import React from "react";
import { Navbar, Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/user";
import brandLogo from "../../assets/images/allset_logo.png";

const Header = ({ logout, user: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Nav className="ml-auto" style={{ justifyContent: "space-around" }}>
      <Link className="text-light nav-link my-auto mx-3" to="/documents">
        <h4 className="m-auto">
          My <b>Document</b>
        </h4>
      </Link>
      <Link className="text-light nav-link my-auto mx-3" to="/about">
        <h4 className="m-auto">About</h4>
      </Link>
      <Link className="text-light nav-link my-auto mx-3" to="/profile">
        <h4 className="m-auto">
          User <b>Settings</b>
        </h4>
      </Link>
      <Link
        className="nav-link text-light my-auto mx-3"
        to="/login"
        onClick={logout}
      >
        <h4 className="m-auto">
          <i className="fas fa-power-off"></i>
        </h4>
      </Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Link className="text-light nav-link my-auto mx-3" to="/about">
        <h4 className="m-auto">About</h4>
      </Link>
      <Link className="text-light nav-link my-auto mx-3" to="/login">
        <h4 className="m-auto">
          <b>Login</b>
        </h4>
      </Link>
      <Link className="nav-link text-light my-auto mx-3" to="/register">
        <h4 className="m-auto">
          <b>Sign Up</b>
        </h4>
      </Link>
    </Nav>
  );

  return loading ? ("") : (
    <Navbar expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <div className="mx-auto text-center">
          <img
            src={brandLogo}
            alt="Manual Form Generator"
            className="mx-auto"
            style={{ width: "65%" }}
          />
        </div>
      </Navbar.Brand>
      <Card className="bg-primary" style={{ width: "100%" }}>
        <Card.Body>
          <Navbar.Toggle className="btn" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
          </Navbar.Collapse>
        </Card.Body>
      </Card>
    </Navbar>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Header);
