import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Notification from "./layout/Notification";
import Spinner from "./layout/Spinner";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Landing from "./pages/landing/Landing";
import PagesComponent from "./pages";
import PrivateRoute from "./routing/PrivateRoute";

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
          <Route exact path="/about" component={PagesComponent} />
          <PrivateRoute exact path="/profile" component={PagesComponent} />
          <PrivateRoute exact path="/profile/pw" component={PagesComponent} />
          <PrivateRoute exact path="/documents" component={PagesComponent} />
          <PrivateRoute
            exact
            path="/documents/create"
            component={PagesComponent}
          />
          <PrivateRoute
            exact
            path="/documents/upload"
            component={PagesComponent}
          />
          <PrivateRoute
            exact
            path="/documents/stats"
            component={PagesComponent}
          />
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
