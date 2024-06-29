import React from "react";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "../pages/UserAuthForm";
import Home from "../pages/Home";
import OTPValidationPage from "../pages/VerifyOTP";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import ExerciseDetail from "../components/ExerciseDetail";
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
        <Route path={`/exercise/:id`} element={<ExerciseDetail />} />

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

        <Route path="/verify" element={<OTPValidationPage />} />

        <Route
          path="/forgot-password"
          element={<UserAuthForm type="forgot-password" />}
        />
      </Routes>
    </>
  );
}
