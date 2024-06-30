import nodemailer from "nodemailer";
import { ADMIN_EMAIL, ADMIN_PASSWORD, DOMAIN_NAME } from "../config/serverConfig.js";
import { OtpVerification } from "../models/otpModel.js";
import { asyncHandler } from "./asyncHandler.js";

const sendMail = asyncHandler(async (userId, email, res) => {

    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    })

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: ` <p style={{ color: "red" }}>
            <b>${otp}</b> in the app to verify your email address and complete the verification
          </p>`,
    };

    await OtpVerification.create({
        userId,
        otp: otp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000
    });

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log("Email Send Successfully to " + userEmail)
        }
    });
});

export {
    sendMail
}