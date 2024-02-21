import nodemailer from "nodemailer";
import { findOne, update } from "../services/user.service.js"
import { create } from "../services/token.service.js"
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await findOne('email', email);
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.SECRET_KEY + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
            expiresIn: "5m",
        });
        let data = { userId: oldUser.id, token: token }
        await create(data);
        const link = `${process.env.FRONTEND_URL}${oldUser.id}/${token}`;
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
                console.log(error);
            } else {
                console.log("DOE");
                res.status(httpStatus.CREATED).json({ success: true, message: "Send Successfully", data: "Reset Link has beend to Email" });
            }
        });

    } catch (error) {
        console.log(error);
    }
}

export {
    forgotPassword
}



// import nodemailer from "nodemailer";
// import db from "../models/index.js";
// const { User, Token } = db.db; // Assuming you have a model named ResetToken
// import jwt from 'jsonwebtoken';

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     console.log(email)
//     try {
//         // Find the user with the provided email
//         const oldUser = await User.findOne({ where: { email: email } });
//         if (!oldUser) {
//             return res.json({ status: "User Not Exists!!" });
//         }

//         // Generate a unique token
//         const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, process.env.SECRET_KEY, {
//             expiresIn: "5m",
//         });

//         // Save the token in the database
//         await Token.create({ userId: oldUser.id, token });

//         // Construct the password reset link
//         const link = `${process.env.FRONTEND_URL}/reset-password/${oldUser.id}/${token}`;

//         // Create a transporter for sending emails
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD,
//             },
//         });

//         // Define email options
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: oldUser.email,
//             subject: "Password Reset",
//             text: `Click the following link to reset your password: ${link}`,
//         };

//         // Send the email
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ error: "Failed to send email" });
//             } else {
//                 console.log("Email sent: " + info.response);
//                 return res.status(200).json({ message: "Password reset email sent successfully" });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: "An error occurred" });
//     }
// }

// export {
//     forgotPassword
// }
