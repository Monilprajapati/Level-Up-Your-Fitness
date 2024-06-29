import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, TOKEN_EXPIRY } from "../config/serverConfig.js";
import { type } from "os";

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
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRound = 10;
    this.password = await bcrypt.hash(this.password, saltRound);
    next();
});

// Method to compare given password with the hashed password in the database
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// Method to generate a JWT token for the user
userSchema.methods.generateToken = async function () {
    return await jwt.sign(
        {
            _id: this.id,
            email: this.email
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY
        }
    );
}

export const User = model("User", userSchema);
