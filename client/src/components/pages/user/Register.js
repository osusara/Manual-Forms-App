import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/user";
import signUpImg from "../../../assets/images/signup.png"

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    verify: "",
  });

  const { firstname, lastname, email, password, verify } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== verify) {
      setAlert("Password doesn't match", "danger");
    } else {
      register({ firstname, lastname, email, password });
    }
  };

  if(isAuthenticated)
    return <Redirect to="/documents" />

  return (
    <Container fluid={true}>
      <Row className="my-4">
        <Col lg={4} md={8} sm={10} xs={12} className="m-auto text-center">
          <div className="my-5 mx-auto text-center">
            <img src={signUpImg} alt="Sign Up" />
          </div>
        </Col>
        <Col lg={4} md={8} sm={10} xs={12} className="m-auto text-center">
          <h2 className="text-dark mb-3">
            Sign <b>Up</b>
          </h2>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="First Name"
                size="lg"
                type="text"
                name="firstname"
                value={firstname}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="Last Name"
                type="text"
                size="lg"
                name="lastname"
                value={lastname}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="Email Address"
                type="email"
                size="lg"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
              <Form.Text className="text-light">
                Your confidential data are totaly safe
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="New Password"
                type="password"
                name="password"
                size="lg"
                value={password}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center my-4"
                placeholder="Confirm Password"
                type="password"
                name="verify"
                size="lg"
                value={verify}
                onChange={(e) => onChange(e)}
                required
                minLength="6"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="shadow-sm px-4 py-3"
              >
                <h5 className="m-auto">Sign Up</h5>
              </Button>
              <p className="mt-2">
                Already have an account?
                <Link to="/login" className="text-dark px-4 py-3">
                  <h5>Login</h5>
                </Link>
              </p>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Register.protoType = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
