import { Schema, model } from "mongoose";

const userVerificationSchema = new Schema({
    userId: {
        type: String
    },
    // uniqueString: {
    //     type: String
    // },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    },
});

export const userVerification = model("userVerification", userVerificationSchema);