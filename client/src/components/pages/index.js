import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import Footer from "../layout/Footer";
import Notification from "../layout/Notification";
import Spinner from "../layout/Spinner";
import Login from "./user/Login";
import Register from "./user/Register";
import EditPassword from "./user/EditPassword";
import Profile from "./user/Profile";
import DocHome from "./form/DocHome";
import Landing from "./landing/Landing";
import About from "./about/About";
import PrivateRoute from "../routing/PrivateRoute";

const Startup = ({ loading }) => {
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Header />
      <Container fluid={true}>
        <Notification />
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Row className="mt-5">
            <Col sm={2} xs={2} className="my-2 mx-auto">
              <SideBar />
            </Col>
            <Col sm={10} xs={10} className="mx-auto">
              <Card className="bg-secondary">
                <Card.Body>
                  <Route exact path="/about" component={About} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute
                    exact
                    path="/profile/pw"
                    component={EditPassword}
                  />
                  <PrivateRoute exact path="/documents" component={DocHome} />
                  <PrivateRoute
                    exact
                    path="/documents/create"
                    component={DocHome}
                  />
                  <PrivateRoute
                    exact
                    path="/documents/upload"
                    component={DocHome}
                  />
                  <PrivateRoute
                    exact
                    path="/documents/stats"
                    component={DocHome}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Switch>
      </Container>
      <Footer />
    </>
  );
};

Startup.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.user.loading,
});

export default connect(mapStateToProps, {})(Startup);