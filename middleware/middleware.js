const Joi = require("joi");


// Authentication Middleware

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        return res.render("Error", { message: "Please login first" });
    }
    next()
};

// Admin Middleware 
module.exports.isAdmin = (req, res, next) => {
    if (req.session.userRole !== "admin") {
        return res.render("Error", { message: "Access denied" });
    }
    next()
};

// validate Employee  
const employeeValidationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    department: Joi.string().required(),
    position: Joi.string().required(),
    salary: Joi.number().min(0).required()
});

module.exports.validateEmployee = (req, res, next) => {
    const { error } = employeeValidationSchema.validate(req.body);

    if (error) {
        return res.render("Error", { message: error });
    }
    next();
}


// UserValidationSchema

const userValidationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
});

module.exports.validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
        return res.render("Error", { message: error });
    }
    next();
}

// UserLoginValidationSchema
const UserLoginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports.UserLoginValidation = (req, res, next) => {
    const { error } = UserLoginValidationSchema.validate(req.body);
    if (error) {
        return res.render("Error", { message: error });
    }
    next();
}