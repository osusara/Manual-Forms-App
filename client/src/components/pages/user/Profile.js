import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { update } from "../../../actions/user";
import userImg from "../../../assets/images/user.png"

const Profile = ({ update, user: { isAuthenticated, data } }) => {
  const [formData, setFormData] = useState({
    firstname: data ? data.firstname : "",
    lastname: data ? data.lastname : "",
    email: data ? data.email : "",
  });

  const { firstname, lastname, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    update(formData);
  };

  if (!isAuthenticated)
    return <Redirect to="/login" />;

  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        User <b>Settings</b>
      </h2>
      <Row className="my-4">
        <Col lg={8} md={10} sm={10} xs={12} className="m-auto">
          <div className="my-5 mx-auto text-center">
            <img src={userImg} alt="User Profile" />
          </div>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Row>
                <Col md={3} xs={12} className="my-auto">
                  <Form.Label>First Name</Form.Label>
                </Col>
                <Col md={9} xs={12}>
                  <Form.Control
                    className="shadow-sm text-center text-dark my-2"
                    placeholder="First Name"
                    type="text"
                    name="firstname"
                    size="lg"
                    value={firstname}
                    onChange={(e) => onChange(e)}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={3} xs={12} className="my-auto">
                  <Form.Label>Last Name</Form.Label>
                </Col>
                <Col md={9} xs={12}>
                  <Form.Control
                    className="shadow-sm text-center text-dark my-2"
                    placeholder="Last Name"
                    type="text"
                    name="lastname"
                    size="lg"
                    value={lastname}
                    onChange={(e) => onChange(e)}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row>
                <Col md={3} xs={12} className="my-auto">
                  <Form.Label>Email address</Form.Label>
                </Col>
                <Col md={9} xs={12}>
                  <Form.Control
                    className="shadow-sm text-center text-dark my-2"
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    size="lg"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                type="submit"
                className="btn-primary shadow-sm mr-3 px-4 py-3"
              >
                <h5 className="my-auto">Save</h5>
              </Button>
              <Link to="/profile/pw" className="btn btn-secondary px-4 py-3">
                <h5 className="my-auto">Change Password</h5>
              </Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

Profile.protoType = {
  update: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { update })(Profile);
