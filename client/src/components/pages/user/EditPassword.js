import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { editPassword } from "../../../actions/user";
import { setAlert } from "../../../actions/alert";
import userImg from "../../../assets/images/user.png";

const EditPassword = ({ setAlert, editPassword, user: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    currentPw: "",
    newPw: "",
    verifyPw: "",
  });

  const { currentPw, newPw, verifyPw } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPw === verifyPw) {
      editPassword(formData);
    } else {
      setAlert("New password does not match with verification", "danger");
    }

    return <Redirect to="/login" />;
  };

  if (!isAuthenticated)
    return <Redirect to="/login" />;

  return (
    <Container fluid={true}>
      <h2 className="text-dark">
        Change <b>Password</b>
      </h2>
      <Row className="my-4">
        <Col lg={6} md={8} sm={10} xs={12} className="m-auto">
          <div className="my-5 mx-auto text-center">
            <img src={userImg} alt="User Profile" />
          </div>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center text-dark my-2"
                placeholder="Current Password"
                type="password"
                name="currentPw"
                size="lg"
                value={currentPw}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center text-dark my-2"
                placeholder="New Password"
                type="password"
                name="newPw"
                size="lg"
                value={newPw}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="shadow-sm text-center text-dark my-2"
                placeholder="Verify Password"
                type="password"
                name="verifyPw"
                size="lg"
                value={verifyPw}
                onChange={(e) => onChange(e)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                type="submit"
                className="btn-primary shadow-sm mr-3 px-4 py-3"
              >
                <h5 className="my-auto">Save</h5>
              </Button>
              <Link to="/profile" className="btn btn-secondary px-4 py-3">
                <h5 className="my-auto">Discard</h5>
              </Link>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

EditPassword.protoType = {
  editPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { editPassword, setAlert })(EditPassword);
