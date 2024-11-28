const jwt = require('jsonwebtoken');
const secretKey = "your_secret_key"; 

// Middleware to validate JWT
const authenticate = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized access. Token is missing or invalid." });
    }

    const token = authToken.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token." });
        }
        req.user = user; // Attach user data to the request object
        next();
    });
};

module.exports = { authenticate, secretKey };
