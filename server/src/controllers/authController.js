import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendMail } from "../utils/mailer.js";
import { User } from "../models/userModel.js";
import { OtpVerification } from "../models/otpModel.js";

const register = asyncHandler(
    async (req, res) => {
        const { firstname, lastname, email, password } = req.body;

        if ([firstname, lastname, email, password].some(field => field?.trim() === ''))
            throw new ApiError(400, 'Please provide all required fields');

        const isUserExist = await User.findOne({ email });
        if (isUserExist)
            throw new ApiError(409, "User with email already exists");

        const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            verified: false
        });

        const isUserCreated = await User.findById(user._id).select("-firstname -lastname -password -verified -role -fitnessGoals -healthConditions");
        if (!isUserCreated)
            throw new ApiError(500, "Something went wrong while registering user");

        console.log(isUserCreated);

        const token = await user.generateToken();

        await sendMail(user._id, email, res);

        return res.status(200).json(
            new ApiResponse(200, { token, isUserCreated }, "User registered successfully")
        );
    }
);

const verify = asyncHandler(
    async (req, res) => {
        const { otp, _id } = req.body;
        console.log("__idddddddd:" + _id);
        if (!_id || !otp)
            throw new ApiError(400, "Empty OTP details are not allowed!");

        const OtpVerificationRecords = await OtpVerification.findOne({ userId: _id });
        console.log("sadasdasdfa: " + OtpVerificationRecords.otp);
        // if (!OtpVerificationRecords.length)
        //     throw new ApiError(400, "Account record doesn't exist or has been verified already. Please sign up or log in!");

        // const { expiresAt, otp: storedOtp } = OtpVerificationRecords[0];

        if (OtpVerificationRecords.expiresAt < Date.now()) {
            await OtpVerification.deleteMany({ _id });
            throw new ApiError(400, "Code has expired, please try again!");
        }

        if (otp === OtpVerificationRecords.otp) {
            const user = await User.findById(_id);
            if (!user) throw new ApiError(400, "User not found");

            const token = user.generateToken();

            await User.updateOne({ _id: _id }, { verified: true });
            await OtpVerification.deleteOne({ _id });

            const options = {
                httpOnly: true,
                secure: true,
            };

            return res
                .status(200)
                .cookie("token", token, options)
                .json(new ApiResponse(200, {}, "Cookie sent & user verified"));
        }

        throw new ApiError(400, "Invalid code passed!");
    }
);


const login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if ([email, password].some(field => field?.trim() === ""))
            throw new ApiError(400, 'Please provide all required fields');

        const user = await User.findOne({ email });
        if (!user)
            throw new ApiError(404, "User with email does not exist");

        if (!user.verified) {
            sendMail(email, await user.generateToken())
            throw new ApiError(401, "User is not verified", await user.generateToken())
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect)
            throw new ApiError(401, "Password is incorrect");

        const loggedInUser = await User.findById(user._id).select("-firstname -lastname -password");

        const token = await user.generateToken();

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("token", token, options)
            .json(new ApiResponse(200, { loggedInUser, token }, "User logged in successfully"));
    }
);

const logout = asyncHandler(
    async (req, res) => {
        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
            .status(200)
            .clearCookie("token", options)
            .json(new ApiResponse(200, {}, "User logged out successfully"))
    }
);

export {
    register,
    verify,
    login,
    logout
};
