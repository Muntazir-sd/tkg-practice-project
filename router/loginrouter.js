const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { handleAsync } = require('../middleware/error/error');
const jwtsecret = process.env.jwt
const validation = require("../middleware/validation");
const Login = require("../schema/login");
let router = express.Router();

router.use(express.json())
// <--  ***  /api/login/ *** GET -->
router.get(("/"), handleAsync(async (req, res) => {
    // fetching all the user document  from login collection
    const login = await Login.find({})
    res.status(200).json(login)
}));

// <--  ***  /api/login/loginuser *** POST -->
router.post(("/loginuser"), validation.middleware, handleAsync(async (req, res) => {
    // login route for a new user in login collection
    const { email } = req.body;
    let checkuser = await Login.findOne({ email });
    if (checkuser) return res.status(400).send("User with this email already registered.");
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const user = await Login.create({
        user: req.body.user,
        email: req.body.email,
        password: hashedpassword
    });
    const payload = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(payload, jwtsecret)
    res.status(200).json({ authtoken });
}));

// <--  ***  /api/login/signupuser *** POST -->
router.post(("/signupuser"), validation.signup, handleAsync(async (req, res) => {
    // signup route for a new user in login collection
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    if (!user) return res.status(400).send("Invalid Username or Password!");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid Username or Password!");
    const payload = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(payload, jwtsecret)
    res.status(200).json({ authtoken });
}))

// <--  ***  /api/login/ *** DELETE -->
// router.delete("/", handleAsync(async (req, res) => {
//         await Login.deleteMany();
//         res.json('All Data successfully deleted');
// }))
module.exports = router;


