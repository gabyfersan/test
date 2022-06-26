import React from "react";
import { Route , Navigate} from "react-router-dom";
//import { isLogin } from "./utils";
const isLogin= false;
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? (
              <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};
export default PublicRoute;
