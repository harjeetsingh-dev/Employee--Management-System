// Employee Controller
const Employee = require('../models/Employee');
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Render New Employee Form
module.exports.newEmployee = (req, res) => {
  res.render("employee/new");
};

// Create Employee
module.exports.createEmployee = async (req, res) => {
  try {
    const { username, email, position, department, salary } = req.body;

    //Check Employee already Exist or not with Same email
    
    const existingEmployee = await Employee.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingEmployee) {
      return res.render("Error", { message: "Employee already Exist with Same email" });
    }

    const newEmployee = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      position: position.trim(),
      department: department.trim(),
      salary: salary
    }
    const New_empployee = new Employee(newEmployee);

    await New_empployee.save();

    //  Create User

    let password = email.substr(0, 5);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      employee: New_empployee._id
    });

    await newUser.save()
    res.redirect("/Allemployee");
  }
  catch (err) {
    res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

// Get All Employees
module.exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.render("employee/index", { employees });
  }
  catch (err) {
    return res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

// Edit Employee form with pre-filled data.

module.exports.editEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.json({ message: 'Employee not found' });
    }
    return res.render("employee/edit", { employee });
  }
  catch (err) {
    res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

// Update Employee

module.exports.updateEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const { username, email, position, department, salary } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      username: username,
      email: email.toLowerCase(),
      position: position,
      department: department,
      salary: salary
    },
      { runValidators: true, new: true }
    );
    res.redirect("/Allemployee");
  } catch (err) {
    return res.render("Error", { message: "Something went wrong. Please try again." });
  }
};

// Delete Employee
module.exports.deleteEmployee = async (req, res) => {
  let id = req.params.id;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.json({ message: 'Employee not found' });
    }
    await User.deleteOne({ employee: id });
    return res.redirect("/Allemployee");
  } catch (err) {
    return res.render("Error", { message: "Something went wrong. Please try again." });
  }
}
