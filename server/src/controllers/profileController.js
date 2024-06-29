import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";


const getProfile = asyncHandler(
    async (req, res) => {

        const user = await User.findById(req.user.id);

        if (!user)
            res.status(500).json(new ApiError(500, 'Error fetching profile'));

        res.status(200).json(user);
    }
)

const updateProfile = asyncHandler(
    async (req, res) => {

        const { age, gender, weight, height, fitnessGoals, healthConditions } = req.body;

        const user = await User.findByIdAndUpdate(req.user.id, {
            age,
            gender,
            weight,
            height,
            fitnessGoals,
            healthConditions
        }, { new: true });

        if (!user)
            res.status(500).json(new ApiError(500, 'Error updating profile'));

        res.status(200).json(user);
    }
)

