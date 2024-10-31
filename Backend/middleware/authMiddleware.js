
const jwt = require('jsonwebtoken');

const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access Forbidden' });
            }
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = authMiddleware;
