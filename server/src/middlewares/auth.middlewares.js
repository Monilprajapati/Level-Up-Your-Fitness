import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/userModel.js";
import { TOKEN_SECRET } from "../config/serverConfig.js";

export const authMiddleware = (requiredRoles = []) => asyncHandler(
    async (req, res, next) => {
        const token = req.cookies?.token;

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, TOKEN_SECRET);
        } catch (error) {
            throw new ApiError(401, "Invalid access token");
        }

        const user = await User.findById(decodedToken?._id).select("-password -posts -channels");

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new ApiError(403, "You do not have permission to access this resource");
        }

        req.user = user;
        next();
    }
);
