import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(httpStatus.UNAUTHORIZED).send('Access denied. No token provided.');
    }

    const [bearer, token] = tokenHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(httpStatus.UNAUTHORIZED).send('Invalid token format.');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(httpStatus.UNAUTHORIZED).send('Invalid token.');
        }
        req.userId = decoded.userId;
        next();
    });
};


export { verifyToken };