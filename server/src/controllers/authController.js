import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendMail } from "../utils/mailer.js";
import { User } from "../models/userModel.js";
import { userVerification } from "../models/userVerificationModel.js";

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

        const isUserCreated = await User.findById(user._id).select("-firstname -lastname -password");
        if (!isUserCreated)
            throw new ApiError(500, "Something went wrong while registering user");

        const token = await user.generateToken();

        sendMail(user._id, email, res);

        return res.status(200).json(
            new ApiResponse(200, { token }, "User registered successfully")
        );
    }
);

const verify = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const userVerificationRecord = await userVerification.findOne({ userId });

    if (!userVerificationRecord) {
        throw new ApiError(400, "Invalid verification request");
    }

    if (userVerificationRecord.expiresAt < Date.now()) {
        await userVerification.deleteOne({ userId });
        await User.deleteOne({ _id: userId });
        throw new ApiError(400, "Verification link has expired");
    }

    await User.updateOne({ _id: userId }, { verified: true });
    await userVerification.deleteOne({ userId });

    return res.status(200).json(new ApiResponse(200, {}, "Email verified successfully"));
});

const login = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        if ([email, password].some(field => field?.trim() === ""))
            throw new ApiError(400, 'Please provide all required fields');

        const user = await User.findOne({ email });
        if (!user)
            throw new ApiError(404, "User with email does not exist");

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

export {
    register,
    verify,
    login
};
