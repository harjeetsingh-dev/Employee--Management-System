// Employee Routes
const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

// Middleware
const { isLoggedIn, isAdmin ,validateEmployee} = require('../middleware/middleware');


// Render New Employee Form
router.get('/employee/new', isLoggedIn, isAdmin, EmployeeController.newEmployee);

// Create Employee   
router.post('/employee', isLoggedIn,isAdmin , validateEmployee, EmployeeController.createEmployee);

// Get Employees
router.get('/Allemployee', isLoggedIn, isAdmin, EmployeeController.getAllEmployees);

// Update Employee form with pre-filled data.
router.get('/employee/:id/edit', isLoggedIn, isAdmin, EmployeeController.editEmployee); 

router.patch('/employee/:id/edit', isLoggedIn, isAdmin, validateEmployee,EmployeeController.updateEmployee);

// Delete Employee
router.delete('/employee/:id/delete', isLoggedIn, isAdmin, EmployeeController.deleteEmployee);

module.exports = router;








