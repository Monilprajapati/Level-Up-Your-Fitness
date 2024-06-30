import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { sendMail } from "../utils/mailer.js";
import { User } from "../models/userModel.js";

const logActivity = asyncHandler(
    async (req, res) => {

    }
)
const getActivitySummary = asyncHandler(
    async (req, res) => {

    }
)

export {
    logActivity,
    getActivitySummary
}