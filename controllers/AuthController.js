const bcrypt = require('bcrypt');
const User = require('../models/user');

// Render Signup Form
module.exports.renderSignupForm = (req, res) => {
  res.render("Auth/signup");
};

//User Register Route
module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check admin already created
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      return res.redirect("/login")
    }
    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("Error", { message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: "admin"
    });

    await newUser.save();
    res.redirect("/Allemployee");
  }
  catch (err) {
    res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

//Render Login Form
module.exports.renderLoginForm = (req, res) => {
  res.render("Auth/login");
};

//User Login Route
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // check user exist or not in  database
    if (!user) {
      return res.render("Error", { message: "User Not found" });
    }
    //check password and compare with hashed password in database
    const ismatch = await bcrypt.compare(password, user.password);

    // if password does not match return error
    if (!ismatch) {
     return res.render("Error", { message: "Invalid Email and password" });
    }
    // Set session data.
    req.session.userId = user._id;
    req.session.userName = user.username;
    req.session.userRole = user.role;

    if (user.role === "admin") {
      return res.redirect("/Allemployee");
    }
    res.redirect("/profile")
  } catch (err) {
    return  res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select("-password").populate("employee", "-updatedAt -__v");
    return res.render("profile", { user });
  }
  catch (err) {
    return res.render("Error", { message: "Something went wrong. Please try again." });
  }
}

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render("Error", { message: 'Logout failed' });
    }
  });
  res.clearCookie("connect.sid");
  res.redirect("/home")
};