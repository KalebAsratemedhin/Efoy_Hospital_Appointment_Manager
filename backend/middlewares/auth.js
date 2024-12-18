const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
    }
};

const isAdmin = (req, res, next) => {
    console.log('admin?')
    if (req.user.role !== 'admin') {
        console.log('admin no')

        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
}; 

module.exports = { authenticateUser, isAdmin };
