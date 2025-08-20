const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register", authController.registerUser);       
router.get("/users", authController.getAllUsers);            
router.delete("/users/:id", authController.deleteUser);      
router.post("/login", authController.loginUser);             
router.get('/login', authController.loginUser)
router.get("/getAllCounts", authController.getAllCounts);    

module.exports = router;