import nodemailer from "nodemailer";
import { findOne, update } from "../services/user.service.js"
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await findOne('email', email);
        if (!oldUser) {
            return res.json({ success: false, message: "User Not Exists!!" });
        }
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
            expiresIn: "5m",
        });
        const link = `${process.env.FRONTEND_URL}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        var mailOptions = {
            from: process.env.EMAIL_USER,
            to: oldUser.email,
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "Email not send" });

            } else {
                res.status(httpStatus.CREATED).json({ success: true, message: "Reset Link has beend to Email" });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export {
    forgotPassword
}
