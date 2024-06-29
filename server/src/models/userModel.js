import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, TOKEN_EXPIRY } from "../config/serverConfig.js";

const fitnessGoalSchema = new Schema({
    goal: {
        type: String,
        enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general_health'],
        required: true
    },
    targetDate: {
        type: Date,
        required: true
    }
}, { _id: false });

const healthConditionSchema = new Schema({
    condition: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        required: true
    }
}, { _id: false });

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    weight: Number,
    height: Number,
    fitnessGoals: [fitnessGoalSchema],
    healthConditions: [healthConditionSchema],
    role: {
        type: String,
        enum: ['user', 'trainer', 'admin'],
        default: 'user'
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY
        }
    );
}

export const User = model("User", userSchema);
