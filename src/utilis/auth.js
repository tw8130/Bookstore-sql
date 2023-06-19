// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// // Middleware function to authenticate the JWT token
// const authenticateToken = (req, res, next) => {

//     const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];

//     if (token) {
//         jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Invalid token' });
//             } else {
//                 req.user = decodedToken; // Add the decoded token to the request object
//                 next();
//             }
//         });
//     } else {
//         return res.status(401).json({ error: 'Authentication token required' });
//     }
// };

// module.exports = { authenticateToken };