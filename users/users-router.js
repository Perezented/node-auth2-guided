const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const usersModel = require("./users-model.js");

router.get("/", restricted, checkRole("user"), (req, res) => {
    Users.find()
        .then((users) => {
            res.status(200).json({ users, decodedToken: req.decodedToken });
        })
        .catch((err) => res.send(err));
});
function checkRole(role) {
    return (req, res, next) => {
        if (req.decodedToken.role === role) {
            next();
        } else {
            res.status(403).json({ Message: "You have no power here" });
        }
    };
}
module.exports = router;
