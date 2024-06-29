import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

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
  return (
    <>
      <div className="relative w-full mb-4 flex items-center">
        <div className="input-icon">
          {(() => {
            switch (icon) {
              case "email":
                return <MdOutlineMailOutline className="text-gray-400" />;
              case "password":
                return <RiLockPasswordFill className="text-gray-400" />;
              default:
                return null;
            }
          })()}
        </div>
        <input
          id={id}
          name={name}
          type={
            type == "password"
              ? id == "password"
                ? showPassword
                  ? "text"
                  : "password"
                : confirmPassword
                ? "text"
                : "password"
              : type
          }
          defaultValue={value}
          placeholder={placeholder}
          className="input-box"
          onChange={handleChange}
        />
        {type == "password" ? (
          <div
            className="text-gray-400 input-icon left-[auto] right-3 p-3 cursor-pointer h-full flex items-center justify-center"
            onClick={
              id == "password"
                ? () => setShowPassword(!showPassword)
                : () => setConfirmPassword(!confirmPassword)
            }
          >
            {id == "password" ? (
              showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )
            ) : confirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default InputBox;
