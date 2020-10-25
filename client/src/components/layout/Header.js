import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/user";

const Header = ({ logout, user: { isAuthenticated, loading } }) => {
  const authLinks = (
    <Nav className="ml-auto">
      <Link className="text-light nav-link my-auto" to="/documents">
        <h4 className="mx-3">My Document</h4>
      </Link>
      <Link className="text-light nav-link my-auto" to="/about">
        <h4 className="mx-3">About</h4>
      </Link>
      <Link className="text-light nav-link my-auto" to="/help">
        <h4 className="mx-3">Help</h4>
      </Link>
      <Link className="text-light nav-link my-auto" to="/profile">
        <h4 className="mx-3"><i className="fas fa-user"></i></h4>
      </Link>
      <Link className="nav-link text-light" to="/login" onClick={logout}>
        <h4 className="mx-3"><i className="fas fa-power-off"></i></h4>
      </Link>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Link className="text-light nav-link" to="/login">
        <b>Login</b>
      </Link>
      <Link className="nav-link text-light" to="/register">
        <b>Sign Up</b>
      </Link>
    </Nav>
  );

  return (
    <Navbar expand="lg" variant="dark" className="header-bg shadow-sm">
      <Navbar.Brand href="/">
        <h1>Manual Form Generator</h1>
      </Navbar.Brand>
      <Navbar.Toggle className="btn" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
      </Navbar.Collapse>
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
