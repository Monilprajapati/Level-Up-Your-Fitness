import { Schema, model } from "mongoose";

const schema = Schema({
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date,
});

export const OtpVerification = model("OtpVerification", schema);