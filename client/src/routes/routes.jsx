import React from "react";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "../pages/UserAuthForm";
import Home from "../pages/Home";
import OTPValidationPage from "../pages/VerifyOTP";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import ExerciseDetail from "../components/ExerciseDetail";
import UserDetailsForm from "../components/UserDetail";
import AskQuestions from "../components/AskQuestions";
import ForgotPassword from "../components/ForgotPassword";
import UpdatePassword from "../components/UpdatePassword";
export default function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <PrivateRoute>
              <ExerciseDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/ask-questions"
          element={
            <PrivateRoute>
              <AskQuestions />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserDetailsForm />
            </PrivateRoute>
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

        <Route path="/verify" element={<OTPValidationPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/forgot-password"
          element={<UserAuthForm type="forgot-password" />}
        />
      </Routes>
    </>
  );
}
