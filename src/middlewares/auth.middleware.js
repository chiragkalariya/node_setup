const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;
    const token = req.cookies?.token || bearerToken;

    if (!token) {
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        const err = new Error('Invalid or expired token');
        err.statusCode = 401;
        next(err);
    }
};
