const Joi = require('joi');

const customMessages = {
    'string.base': '{#label} must be a string',
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'date.base': '{#label} must be a valid date',
    'string.email': '{#label} must be a valid email',
    'number.base': '{#label} must be a number',
    'string.min': '{#label} must be at least {#limit} characters long',
    'string.max': '{#label} must not exceed {#limit} characters',
    'number.integer': '{#label} must be an integer'
};

const schema = Joi.object({
    Firstname: Joi.string().min(2).max(15).trim().required().messages(customMessages),
    Lastname: Joi.string().min(2).max(15).trim().required().messages(customMessages),
    Gender: Joi.string().valid('male', 'female').required().messages(customMessages),
    DateOfBirth: Joi.date().required().messages(customMessages),
    StudentNO: Joi.number().required().messages(customMessages),
    Email: Joi.string().email().required().messages(customMessages),
    Department: Joi.string().trim().required().messages(customMessages),
    DateOfAdmission: Joi.date().optional().messages(customMessages),
    phone: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
        ...customMessages,
        'number.min': '{#label} must be at least 10 characters',
        'number.max': '{#label} must not exceed 10 characters'
    }),
    StudentPhoto: Joi.string().messages(customMessages)
});

exports.student = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next()
}

