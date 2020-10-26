import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Startup from "./components/pages";

// Actions
import { loadUser } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";

// Redux
import { Provider } from "react-redux";
import store from "./store";

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
        <Startup />
      </Router>
    </Provider>
  );
};

export default App;
