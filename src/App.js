import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import "./App.css";
import Button from "@mui/material/Button";
import { Login } from "./components/Login";
import { Home } from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute
          restricted={false}
          component={Login}
          path="/login"
          exact
        />
        <PrivateRoute exact path={"/home"} component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
