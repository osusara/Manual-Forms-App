import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tab, Row, Col, Nav, Container, Card } from "react-bootstrap";

import "./style.css";
import { getForms } from "../../../actions/form";
import { getFilesByUser } from "../../../actions/file";
import Spinner from "../../layout/Spinner";
import FormBuilder from "./createForm/FormBuilder";
import FormsViewer from "./viewForm/FormsViewer";
import FormUploader from "./uploadForm/FormUploader";
import FormStatistics from "./statistics/FormStatistics";

const DocHome = ({ form, file, getForms, getFilesByUser, isAuthenticated }) => {
  useEffect(() => {
    getForms();
    getFilesByUser();
  }, [getForms, getFilesByUser]);

  // if (!isAuthenticated)
  //   return <Redirect to="/login" />;

  return (
    <Container className="my-5" fluid={true}>
      <Tab.Container defaultActiveKey="first">
        <Row>
          <Col sm={2} xs={2} className="my-2 mx-auto">
            <Card className="bg-dark">
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      className="text-center bg-dark py-5"
                      eventKey="first"
                    >
                      <h1 className="display-3 m-auto text-light">
                        <i className="fas fa-bars"></i>
                      </h1>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="text-center bg-dark py-5"
                      eventKey="second"
                    >
                      <h1 className="display-3 m-auto text-light">
                        <i className="fas fa-plus-square"></i>
                      </h1>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="text-center bg-dark py-5"
                      eventKey="third"
                    >
                      <h1 className="display-3 m-auto text-light">
                        <i className="fas fa-file-upload"></i>
                      </h1>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="text-center bg-dark py-5"
                      eventKey="forth"
                    >
                      <h1 className="display-3 m-auto text-light">
                        <i className="fas fa-chart-bar"></i>
                      </h1>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={10} xs={10} className="mx-auto">
            <Card className="bg-secondary">
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {form.loading || file.loading ? (
                      <Spinner />
                    ) : (
                      <FormsViewer forms={form.list} files={file.list} />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <FormBuilder />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    {form.loading ? (
                      <Spinner />
                    ) : (
                      <FormUploader list={form.list} />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    <FormStatistics />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

DocHome.propTypes = {
  isAuthenticated: PropTypes.bool,
  getForms: PropTypes.func.isRequired,
  getFilesByUser: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  form: state.form,
  file: state.file,
});

export default connect(mapStateToProps, { getForms, getFilesByUser })(DocHome);
