import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../../actions/user";
import signInImg from "../../../assets/images/signinpageimg.png";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if(isAuthenticated)
    return <Redirect to="/" />

  return (
    <Container fluid={true}>
      <Row className="my-4">
        <Col lg={4} md={8} sm={10} xs={12} className="m-auto text-center">
          <div className="my-5 mx-auto text-center">
            <img src={signInImg} alt="Sign In" />
          </div>
        </Col>
        <Col lg={4} md={8} sm={10} xs={12} className="m-auto text-center">
          <h2 className="text-dark mb-3">
            Sign <b>In</b>
          </h2>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="Email Address"
                type="email"
                name="email"
                value={email}
                size="lg"
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="New Password"
                type="password"
                name="password"
                value={password}
                size="lg"
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="shadow-sm px-4 py-3"
              >
                <h5 className="m-auto">Sign In</h5>
              </Button>
              <p className="mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-dark px-4 py-3">
                  <h5>Sign Up</h5>
                </Link>
              </p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
