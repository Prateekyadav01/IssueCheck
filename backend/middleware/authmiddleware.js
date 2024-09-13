
// const jwt = require('jsonwebtoken');

// const userToken = async (req, res, next) => {
//     try {
//         const token = req.cookies?.token || req.headers['authorization'];

//         if (!token) {
//             return res.status(401).json({
//                 message: "Token not provided",
//                 data: [],
//                 success: false,
//                 error: true
//             });
//         }

//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({
//                     message: "Invalid or expired token",
//                     data: [],
//                     success: false,
//                     error: true
//                 });
//             }
//             req.user = { id: decoded._id }; // Attach the user ID to the request object
//             next(); // Pass control to the next middleware or route handler
//         });
//     } catch (e) {
//         res.status(400).json({
//             message: "An error occurred",
//             data: [],
//             success: false,
//             error: true
//         });
//     }
// };

// module.exports = userToken;



const jwt = require('jsonwebtoken');

const userToken = async (req, res, next) => {
    try {
        // Extract token from cookies or authorization header
        console.log(req.cookies);
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                message: "Token not provided",
                data: [],
                success: false,
                error: true
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired token",
                    data: [],
                    success: false,
                    error: true
                });
            }

            // Attach decoded user information to request object
            req.user = decoded; // Attach the full decoded token if more information is needed
            next(); // Proceed to the next middleware or route handler
        });
    } catch (e) {
        console.error("Error in userToken middleware:", e.message);
        res.status(400).json({
            message: "An error occurred",
            data: [],
            success: false,
            error: true
        });
    }
};

module.exports = userToken;

