const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/auth');

// Login and generate a JWT
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        const token = jwt.sign({ username, role: "admin" }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({ token });
    }

    res.status(401).json({ error: "Invalid username or password" });
};
