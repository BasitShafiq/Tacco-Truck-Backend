import nodemailer from "nodemailer";
import db from "../models/index.js"
const { User, Skill } = db.db;
import jwt from 'jsonwebtoken';

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const secret = process.env.SECRET_KEY + oldUser.password;
        console.log(secret)
        const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
            expiresIn: "5m",
        });
        console.log("LINKIS ", process.env.FRONTEND_URL)
        const link = `${process.env.FRONTEND_URL}${oldUser.id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        console.log(oldUser.email)
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
                console.log("Email sent: " + info.response);
            }
        });
    } catch (error) { }
}

export {
    forgotPassword
}
