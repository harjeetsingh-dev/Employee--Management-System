require('dotenv').config({ override: true, quiet: true });
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const ejs = require('ejs');

app.use(methodOverride("_method"));

// Models
const Employee = require('./models/Employee');
const User = require('./models/user');

// Routes
const userRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

//express session and connect-mongo
const session = require('express-session');
const { MongoStore } = require("connect-mongo");

//Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`server Running on port ${port}`);
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");


// Express-Session configuration

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,

  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  }),

  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}
app.use(session(sessionOptions));

// Static files
app.use(express.static('public'));

// User Routes
app.use("/", userRoutes);

//Employee Routes
app.use("/", employeeRoutes);

// Home route

app.get('/home', async (req, res) => {
  adminExist = await User.findOne({ role: "admin" })
  res.render('home', { showSignup: !adminExist });
});


