import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoFitnessSharp } from "react-icons/io5";
import { useUserContext } from "../contexts/userContext";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  // this state will tell if user is authenticated or not
  const authStates = useSelector((state) => state.authReducer.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user } = useUserContext();

  return (
    <>
      <nav className="navbar font-lato font-semibold">
        <Link className="flex items-center gap-2" to="/">
          <span>
            <IoFitnessSharp className="text-xl  md:text-2xl lg:text-4xl xl:text-5xl" />
          </span>
          <span className="text-xl  md:text-2xl lg:text-3xl xl:text-4xl">
            FitTracker
          </span>
        </Link>
        {isLoggedIn && (
          <div className="flex md:hidden">
            <HiOutlineMenuAlt2
              size={30}
              onClick={() => {
                console.log("menu clicked");
              }}
            />
          </div>
        )}
        <div className="hidden md:flex md:w-2/3 justify-end items-center gap-8">
          {isLoggedIn ? (
            <>
              <Link to="/ask-questions" className="text-xl">
                Ask a Question
              </Link>
              <UserDropdown />
            </>
          ) : (
            <button
              className="btn-dark"
              onClick={() => {
                navigate("/login");
              }}
            >
              {window.location.href === "/login" ? "register" : "login"}
            </button>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
