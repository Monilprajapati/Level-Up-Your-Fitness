import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute({ children }) {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export default PublicRoute;
