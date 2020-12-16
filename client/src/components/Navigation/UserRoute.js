import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { useAuth } from "../auth/auth";
//IMPORTANT: uncomment to for testing

const ClientRoute = ({ component: Component, ...rest }) => {
  const isAuth = () => {
    return true;
  };

  const isAuthRole = () => {
    const role = 2;
    return role;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() && isAuthRole() === 2 ? (
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

export default ClientRoute;
