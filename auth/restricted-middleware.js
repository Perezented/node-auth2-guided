const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

module.exports = (req, res, next) => {
    // add code here to verify users are logged in

    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, constants.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    Message:
                        "The token is invalid. Please provide the correct token information in the headers.",
                });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({
            Message: "Please provide credentials to access this resource.",
        });
    }
    // next();
};
