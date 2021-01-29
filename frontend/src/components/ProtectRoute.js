import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <props.component {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    </Route>
  );
}
export default ProtectedRoute;
