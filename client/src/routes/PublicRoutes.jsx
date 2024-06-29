import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserContext } from "../contexts/userContext";

function PublicRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const {isLoggedIn} = useUserContext()

  return !isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}

export default PublicRoute;
