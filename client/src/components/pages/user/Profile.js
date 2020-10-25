import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { update } from "../../../actions/user";
import PropTypes from 'prop-types'

const Profile = ({ update, user: { isAuthenticated, data }, history }) => {
  const [formData, setFormData] = useState({
    firstname: data ? data.firstname : "",
    lastname: data ? data.lastname : "",
    email: data ? data.email : ""
  });

  const { firstname, lastname, email } = formData;

  const [isEditable, setIsEditable] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    update(formData, history);
  };

  if(!isAuthenticated)
    return <Redirect to="/login" />

  return (
    <Container fluid={true}>
      <Row className="my-4">
        <Col lg={4} md={8} sm={10} xs={12} className="m-auto">
          <Card className="bg-light shadow-sm p-3">
            <Card.Body className="text-center">
              <Card.Title className="text-dark">
                <h2>User Account</h2>
                <hr className="hr-width mx-auto" />
              </Card.Title>
              {isEditable ? (
                <>
                  <Form onSubmit={(e) => onSubmit(e)}>
                    <Form.Group>
                      <Form.Control
                        className="shadow-sm text-center text-dark"
                        placeholder="First Name"
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => onChange(e)}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        className="shadow-sm text-center text-dark"
                        placeholder="Last Name"
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => onChange(e)}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Control
                        className="shadow-sm text-center"
                        placeholder="Email Address"
                        type="email"
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
                      <Button
                        variant="primary"
                        type="submit"
                        className="shadow-sm mr-2"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditable(false)}
                      >
                        Cancel
                      </Button>
                    </Form.Group>
                  </Form>
                </>
              ) : (
                <div className="text-left">
                  <div className="my-1">
                    First Name
                    <h3>{formData.firstname}</h3>
                  </div>
                  <div className="my-1">
                    Last Name
                    <h3>{formData.lastname}</h3>
                  </div>
                  <div className="my-1">
                    Email
                    <h3>{formData.email}</h3>
                  </div>
                  <Button
                    className="my-2"
                    variant="secondary"
                    onClick={() => setIsEditable(true)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
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
  user: state.user
});

export default connect(mapStateToProps, { update })(Profile); 
