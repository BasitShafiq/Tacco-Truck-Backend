
import db from '../models/index.js';
const { Token } = db.db;

const create = async data => Token.create(data);


const findOne = async (id, authToken) => {
    try {
        const token = await Token.findOne({
            where: {
                userId: id,
                token: authToken,
            }
        });
        return token;
    } catch (error) {
        throw error;
    }
};

const deleteToken = async (id, authToken) => {
    try {
        const token = await Token.findOne({
            where: {
                userId: id,
                token: authToken,
            }
        });
        if (token) {
            await token.destroy();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export {
    create,
    findOne,
    deleteToken
};
