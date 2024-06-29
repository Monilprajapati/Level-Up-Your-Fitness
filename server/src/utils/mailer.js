import nodemailer from "nodemailer";
import { ADMIN_EMAIL, ADMIN_PASSWORD, DOMAIN_NAME } from "../config/serverConfig.js";
import { error } from "console";
import { userVerification } from "../models/userVerificationModel.js";

const sendMail = async (userId, userEmail, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: ADMIN_EMAIL,
            pass: ADMIN_PASSWORD
        }
    })

    const hostUrl = `http://${DOMAIN_NAME}/`;

    const mailOptions = {
        from: ADMIN_EMAIL,
        to: userEmail,
        subject: 'Welcome to Connectiify - Verify Your Email',
        html: `
            <div style="background-color: #f1f1f1; padding: 20px;">
            <h2 style="color: #333333; font-family: Arial, sans-serif;">Welcome to Connectiify!</h2>
            <p style="color: #555555; font-family: Arial, sans-serif;">Thank you for signing up. To complete your registration, please click the following link to verify your email:</p>
            <p style="margin: 20px 0;">
              <a href=${hostUrl + "api/v1/auth/verify/" + userId} style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: #ffffff; text-decoration: none; font-family: Arial, sans-serif;">Verify Email</a>
            </p>
            <p style="color: #555555; font-family: Arial, sans-serif;">Once verified, you'll be able to access all the features of Connectiify.</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">If you did not sign up for Connectiify, please ignore this email.</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">Best regards,</p>
            <p style="color: #555555; font-family: Arial, sans-serif;">The Connectiify Team</p>
          </div>
        `
    };

    const newVerification = await userVerification.create({
        userId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 21600000
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log("Email Send Successfully to " + userEmail)
        }
    });

    transporter.verify((error, success) => {
        if (error) console.log(error);
        console.log("Ready for messages");
        console.log(success);
    })
}

export {
    sendMail
}