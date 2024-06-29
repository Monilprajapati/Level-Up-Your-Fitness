import React from "react";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "../pages/UserAuthForm";
import Home from "../pages/Home";
import VerifyOTP from "../pages/VerifyOTP";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
export default function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <UserAuthForm type="register" />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <UserAuthForm type="login" />
            </PublicRoute>
          }
        />

        <Route path="/verify" element={<VerifyOTP />} />

        <Route
          path="/forgot-password"
          element={<UserAuthForm type="forgot-password" />}
        />
      </Routes>
    </>
  );
}
