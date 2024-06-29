import React, { useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";
import { IoFitnessSharp } from "react-icons/io5";

const Navbar = () => {
  // this state will tell if user is authenticated or not
  const authStates = useSelector((state) => state.authReducer.isAuthenticated);
  return (
    <>
      <nav className="navbar font-lato font-semibold">
        <Link className="flex items-center gap-2" to="/">
          <span>
            <IoFitnessSharp className="text-xl  md:text-2xl lg:text-4xl xl:text-5xl"/>
          </span>
          <span className="text-xl  md:text-2xl lg:text-3xl xl:text-4xl">
            FitTracker
          </span>
        </Link>
        {authStates && (
          <div className="flex md:hidden">
            <HiOutlineMenuAlt2
              size={30}
              onClick={() => {
                console.log("menu clicked");
              }}
            />
          </div>
        )}
        {authStates && (
          <div className="hidden md:flex md:w-2/3 justify-end items-center gap-4">
          {/* <SearchInput /> */}
         
          <Dropdown />
          </div>
          // <div className="hidden md:flex md:w-full">
          //   {/* <SearchInput /> */}
          // </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
