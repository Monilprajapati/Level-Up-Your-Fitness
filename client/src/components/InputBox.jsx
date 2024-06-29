// InputBox.js
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const renderIcon = () => {
    switch (icon) {
      case "email":
        return <MdOutlineMailOutline className="text-gray-400" />;
      case "password":
        return <RiLockPasswordFill className="text-gray-400" />;
      case "age":
        return <span className="text-gray-400">🎂</span>;
      case "gender":
        return <span className="text-gray-400">♂️♀️</span>;
      case "weight":
        return <span className="text-gray-400">⚖️</span>;
      case "height":
        return <span className="text-gray-400">📏</span>;
      case "goals":
        return <span className="text-gray-400">🎯</span>;
      case "health":
        return <span className="text-gray-400">🩺</span>;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full mb-4">
      <div className="absolute inset-y-0 left-0 pl-3 ml-1 flex items-center pointer-events-none">
        {renderIcon()}
      </div>
      <input
        id={id}
        name={name}
        type={
          type === "password"
            ? id === "password"
              ? showPassword
                ? "text"
                : "password"
              : confirmPassword
              ? "text"
              : "password"
            : type
        }
        value={value}
        placeholder={placeholder}
        className="pl-10 w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
      />
      {type === "password" && (
        <div
          className="text-gray-400 absolute inset-y-0 right-3 flex items-center cursor-pointer"
          onClick={
            id === "password"
              ? () => setShowPassword(!showPassword)
              : () => setConfirmPassword(!confirmPassword)
          }
        >
          {/* {id === "password" ? (
            showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )
          ) : confirmPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )} */}
        </div>
      )}
    </div>
  );
};

export default InputBox;
