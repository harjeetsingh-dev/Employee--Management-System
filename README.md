# 👨‍💼 Employee Management System

A full-stack Employee Management System built using 
**HTML5, CSS3, JavaScript, Tailwind CSS, Node.js, Express.js, MongoDB, Mongoose, and EJS** following the **MVC architecture pattern**.

This application provides secure employee management with authentication, role-based authorization (RBAC),session management , server-side validation ,and complete employee CRUD functionality.

--------------------------------------------------

## 🚀 Features

### 🔐 Authentication & Security
- User registration and login system
- Secure password hashing using bcrypt
- Session-based authentication using Express Session
- Persistent session storage with MongoDB using connect-mongo
- HTTP-only cookies for improved session security

### 👥 Role-Based Access Control (RBAC)
- Admin and Employee role management
- Protected routes using custom middleware
- Admin access for employee management operations
- Employee access to personal profile information

### 👨‍💻 Employee Management
- Create new employee records
- View employee information
- Update employee details
- Delete employee records
- Employee profile management

### 🛡️ Validation & Error Handling
- Server-side request validation using Joi
- Mongoose schema validation
- Duplicate email prevention
- Centralized error page handling

--------------------------------------------------

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- Tailwind CSS
- JavaScript
- EJS Template Engine

### Backend
- Node.js
- Express.js
- Express Router
- RESTful Routing

### Database
- MongoDB
- Mongoose ODM
- MongoDB Atlas

### Authentication & Security
- bcrypt
- express-session
- connect-mongo
- Joi Validation
- dotenv
  
## Deployment:
- Render
  
--------------------------------------------------
## 🏗️ Project Architecture

This project follows the MVC (Model View Controller) architecture.

```text
Employee-Management-System/

├── controllers/
│   └── Business logic

├── models/
│   └── Mongoose schemas

├── routes/
│   └── Application routes

├── middleware/
│   └── Authentication, authorization & validation

├── views/
│   └── EJS templates

├── public/
│   └── Static files

├── Screenshots/
│   └── Project screenshots

├── index.js
├── package.json
└── README.md
```
--------------------------------------------------

## 🔐 Authentication Flow
User Login
     ↓
Validate Credentials
     ↓
bcrypt Password Verification
     ↓
Create Express Session
     ↓
Store Session in MongoDB
     ↓
Access Protected Routes


## 🔑 Authorization Flow
Incoming Request
        ↓
Check Authentication
        ↓
Check User Role
        ↓
Admin / Employee Permission
        ↓
Access Resource

## 🗄️ Database Design

### User Model
User:
- username
- email
- password
- role
- employee reference


### Employee Model
- username
- email
- department
- position
- salary

### Relationship:
User Collection

       ↓ ObjectId Reference

Employee Collection

--------------------------------------------------

## 🔑 Environment Variables
```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000
```
----------------------------------------
## Installation
```bash
npm install
```
----------------------------------------

## Run Application

```bash
npm start
```
----------------------------------------
## 📸 Screenshots
[Login](Screenshots/login.png)
[Dashboard](Screenshots/dashboard.png)
[Profile](Screenshots/profile.png)

----------------------------------------

```text
## 🚀 Deployment Architecture

GitHub Repository
        |
        ↓
Render Cloud Server
        |
        ↓
Node.js + Express Application
        |
        ↓
MongoDB Atlas Database

```
----------------------------------------
## 🚀 Deployment

- Application deployed on Render
- Database hosted on MongoDB Atlas
- Environment variables configured securely
- Production mode enabled

----------------------------------------

## Live Demo

🔗 https://employee-management-system-m8uw.onrender.com/home


----------------------------------------
## ✨ Features

- Secure User Authentication
- Role-Based Access Control (Admin & Employee)
- Password Hashing using bcrypt
- Express Session Authentication
- Sessions Management using MongoDB Store
- Employee CRUD Management
- Protected Routes using Middleware
- Data Validation using Joi
- MVC Architecture
- MongoDB Atlas Cloud Database
- Production Deployment on Render
--------------------------------------------------

## 👨‍💻 Author

**Harjeet Singh**

- Full Stack Developer
- MERN Stack Enthusiast
