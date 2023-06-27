const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function to authenticate the JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                req.user = decodedToken; // Add the decoded token to the request object

                const userRole = decodedToken.roles; // Corrected property name

                if (userRole === 'admin') {
                    // Allow access for admins
                    next();
                } else if (userRole === 'user') {
                    // Restrict access for users
                    const allowedFunctions = ['/borrow', '/books/books', '/members/books-borrowed', '/member/book-borrow', '/return', '/books'];
                    const requestedFunction = req.originalUrl; // Assuming the function name is provided in the request body
                    console.log(requestedFunction)



                    if (allowedFunctions.includes(requestedFunction)) {
                        // Allow access for specific functions
                        next();
                    } else {
                        return res.status(403).json({ message: 'Access denied' });
                    }
                }
            }
        });
    } else {
        return res.status(401).json({ error: 'Authentication token required' });
    }
};

module.exports = { authenticateToken };