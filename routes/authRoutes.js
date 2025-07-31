const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register", authController.registerUser);       
router.get("/users", authController.getAllUsers);            
router.delete("/users/:id", authController.deleteUser);      
router.post("/login", authController.loginUser);             
router.get("/stats/counts", authController.getAllCounts);    

module.exports = router;