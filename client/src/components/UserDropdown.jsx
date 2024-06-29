import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../app/slices/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useUserContext } from "../contexts/userContext";
import { CiUser } from "react-icons/ci";


const UserDropdown = ({mobile}) => {
  const [open, setOpen] = useState(false);
    const {user, setLoggedIn} = useUserContext();
    const navigate = useNavigate();
//   const user = useSelector((state) => state.authReducer.user);
  // console.log(user);
  const links = [
    {
      id: 1,
      text: "Profile",
      url: `/profile`,
    },
  ];
  // console.log(open);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="">
        <Toaster />
        <div className="relative">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className={` text-black focus:outline-none font-medium rounded-md text-md px-2 py-1.5 flex items-center ${mobile ? "w-full border border-black bg-white" : "bg-whitesmoke"} justify-between gap-2`}
            type="button"
            onClick={() => setOpen(!open)}
          >
            <span className="flex gap-1.5 items-center">
                <CiUser className="w-6 h-6 rounded-full" />
              <span className="font-medium">{user?.firstname}</span>
            </span>
            <div>
              {open ? (
                <MdOutlineKeyboardArrowUp className="text-lg" />
              ) : (
                <MdKeyboardArrowDown className="text-lg" />
              )}
            </div>
          </button>
          {/* Dropdown menu */}
          {open && (
            <div
              id="dropdown"
              className={`z-10 absolute mt-2  opacity-0 bg-white text-black divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 ${
                open && `opacity-100`
              }`}
            >
              <ul className="px-2 font-bold">
                {links.map((link) => {
                  const { id, text, url } = link;
                  return (
                    <>
                      <Link
                        key={id}
                        to={url}
                        onClick={() => setOpen(false)}
                        className="flex px-3 py-2 text-md font-medium border-b border-black border-opacity-40 last:border-none"
                      >
                        {text}
                      </Link>
                    </>
                  );
                })}
                <button
                  className="md:flex px-3 py-2 text-md font-medium hidden"
                  onClick={() => {
                    toast.success("Logged out successfully");
                    setTimeout(() => {
                    //   dispatch(logOutUser());
                    setLoggedIn(false);
                    localStorage.removeItem("token");
                    navigate("/login");
                    }, 1000);
                  }}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
