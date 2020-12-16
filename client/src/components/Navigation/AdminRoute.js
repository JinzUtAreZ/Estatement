import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { useAuth } from "../auth/auth";
//IMPORTANT: uncomment to for testing

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    return true;
  };

  const isAuthRole = () => {
    const role = 1;
    return role;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuthRole() === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
