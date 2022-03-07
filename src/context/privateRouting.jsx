import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useAuth();

  return (
    <Route
      {...rest}
      render={(restProps) =>
        !! currentUser ? (
          <RouteComponent {...restProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;