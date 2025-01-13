const jwt = require('jsonwebtoken');


class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. Token missing.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = this.usersService.findUserByEmail(decoded.email);
            if (!user) {
                return res.status(403).json({ message: 'User not found.' });
            }
            req.user = user; // Attach the user to the request
            next();
        } catch (err) {
            console.error('Token verification error:', err.message);
            return res.status(403).json({ message: 'Invalid token.' });
        }
    }

    generateToken(user) {
        return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = AuthService;


