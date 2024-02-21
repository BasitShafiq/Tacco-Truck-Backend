import { findOne, update } from "../services/user.service.js"
import { findOne as findToken, deleteToken } from "../services/token.service.js"


export const resetPassword = async (req, res) => {

    try {
        const { id, token } = req.params;
        const oldUser = await findOne('id', id);
        if (!oldUser) {
            return res.json({ status: "User Not Exists!!" });
        }
        const tokenFromDB = await findToken(oldUser.id, req.params.token);
        if (!tokenFromDB) return res.status(400).send("Invalid link or expired");
        update(oldUser.id, { password: req.body.password });
        deleteToken(oldUser.id, req.params.token)

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
};