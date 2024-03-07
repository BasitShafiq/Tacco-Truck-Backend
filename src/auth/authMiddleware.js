import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Access denied. No token provided." });
    }

    const [bearer, token] = tokenHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid Token format" });

    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Invalid or expired token" });

        }
        req.userId = decoded.userId;
        next();
    });
};


export { verifyToken };