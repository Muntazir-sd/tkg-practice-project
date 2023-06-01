const Joi = require("joi")

const middleware = Joi.object().keys({
    user: Joi.string().min(4).max(15).alphanum().messages({
        "string.min": "User must be at least 4 characters long",
        "string.max": "User must be at most 15 characters long",
        "string.alphanum": "User must be alphanumeric"
    }),
    email: Joi.string().email().lowercase().required().messages({
        "string.email": "Email must be a valid email address",
        "string.lowercase": "Email must be lowercase"
    }),
    password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).messages({
        "string.required": "Password is required",
        "string.pattern.base": "Password must be at least 8 characters long, and must contain at least 1 uppercase, 1 lowercase, and 1 number"
    }),
    confirmpassword: Joi.string().valid(Joi.ref('password')).required().strict().messages({
        "string.valid.any.ref": "Passwords do not match",
        "string.required": "Confirm password is required"
    })
})


const signup = Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
        "string.email": "Email must be a valid email address",
        "string.lowercase": "Email must be lowercase"
    }),
     password: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).messages({
        "string.required": "Password is required",
        "string.pattern.base": "Password must be at least 8 characters long, and must contain at least 1 uppercase, 1 lowercase, and 1 number"
    })
})

exports.middleware = (req, res, next) => {
    const { error } = middleware.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next()
}
exports.signup = (req, res, next) => {
    const { error } = signup.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next()
}


