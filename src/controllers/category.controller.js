import httpStatus from 'http-status';
import * as errors from '../utils/api-error.js';
import * as response from '../middlewares/response-handler.js';
import { create } from '../services/category.service.js';

const responseHandler = response.default;
const { NotFoundError } = errors.default;

const createCategory = async (req, res) => {

    const imageName = req.file ? req.file.filename : null;
    const categoryDetail = await create({ ...req.body, image: imageName });
    res.status(httpStatus.CREATED).json({ success: true, message: "Category Registered Successfully", data: categoryDetail });
};

export {
    createCategory
};
