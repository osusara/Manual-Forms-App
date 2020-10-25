import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Notification from "./components/layout/Notification";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";
import Profile from "./components/pages/user/Profile";
import DocHome from "./components/pages/form/DocHome";
import Landing from "./components/pages/landing/Landing";
// import QuestionLayout from "./components/pages/form/QuestionLayout/QuestionLayout"

// Actions
import { loadUser } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";

// Styles
import "./App.css";

// Check if user logged in
if (localStorage.token)
  setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container fluid={true}>
          <Notification />
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/documents" component={DocHome} />
            {/* <PrivateRoute exact path="/form" component={QuestionLayout} /> */}
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
