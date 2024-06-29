import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";
import authUser from "../services/authServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { authUser } from "../services/authServices";

const OTPValidationPage = () => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const {userId} = useUserContext();

  const navigate= useNavigate()

  const inputRefs = useRef([]);
  console.log("User ID : ", userId)
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numeric digits

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Move to the next input box automatically if a digit is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otpDigits[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otp = otpDigits.join("");
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    // Call a function to handle OTP verification
    handleOTPVerification(otp);
  };
  const handleOTPVerification = async (otp) => {
    console.log(otp)
    try {
      const data = await authUser("verify", { otp, _id: userId });
      console.log("Verify : ", data);
      console.log("user id: ", userId)
      toast.success(data.message, {
        duration: 900,
      });
      setTimeout(() => {
        localStorage.setItem("token", data.data.token);
        dispatch(setIsAuthenticated(true));
        dispatch(checkAuthStatus({ dispatch, navigate }));
      }, 900);
    } catch (error) {
      console.log("Error : ", error);
      if (error.response.data.message == "User is not verified") {
        toast.error(error.response.data.message);
        localStorage.setItem("token", error.response.data.data);
        setTimeout(() => {
          navigate("/verify");
        }, 900);
      } else {
        toast.error(error.response.data.message, {
          duration: 900,
        });
      }
    }
  }

  return (
    <section className="h-cover flex items-center justify-center flex-col">
      <Toaster/>
      <h1 className="text-3xl font-bold mb-6 text-center font-lato">
        Enter OTP
      </h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="flex justify-center mb-4 space-x-2">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="text-3xl w-16 h-16 bg-white border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Verify OTP
        </button>
      </form>
      <button className="btn-dark center" onClick={handleSubmit}>
        Verify OTP
      </button>
        Want to use different email?
        <Link to="/register" className="underline text-black text-xl ml-1">
          Register
        </Link>
    </section>
  );
};

export default OTPValidationPage;
