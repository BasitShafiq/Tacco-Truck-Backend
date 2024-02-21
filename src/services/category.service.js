
import db from '../models/index.js';
const { Category } = db.db;


const create = async (data) => {
    try {
        const category = await Category.create(data);
        return category;
    } catch (error) {
        throw error;
    }
};

export {
    create,
};