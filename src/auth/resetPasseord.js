import { findOne, update } from "../services/user.service.js"
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

export const resetPassword = async (req, res) => {

    try {
        const { token } = req.params;
        const { password, confirm_password } = req.body;
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid or expired token" });
        }
        const { id, email } = decodedToken;
        if (password !== confirm_password) {
            return res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "Password and Confirm Password do not match" });
        }
        const oldUser = await findOne('id', id);
        if (!oldUser) {
            return res.status(httpStatus.NOT_FOUND).json({ success: false, message: "User Not Found" });
        }
        await update(id, { password: req.body.password });
        res.status(httpStatus.CREATED).json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ success: true, message: "An error occured" });

    }
};