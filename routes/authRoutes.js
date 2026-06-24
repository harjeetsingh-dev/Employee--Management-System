const express = require('express');
const router = express.Router();

// Controller Path
const AuthController = require('../controllers/AuthController');
// Middleware
const { isLoggedIn, isAdmin ,validateUser,UserLoginValidation } = require("../middleware/middleware");


// Render Signup Form
router.get('/signup',  AuthController.renderSignupForm);

//User Register Route 
router.post('/signup',validateUser, AuthController.signup);

//Render Login Form
router.get('/login', AuthController.renderLoginForm);

// User Login Route
router.post('/login', UserLoginValidation , AuthController.login);

//User profile Route
router.get("/profile",  isLoggedIn ,AuthController.profile);

// User Logout Route
router.post('/logout',isLoggedIn, AuthController.logout);

module.exports = router;
