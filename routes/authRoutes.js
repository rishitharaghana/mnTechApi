const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post("/register",authController.register);
router.get("/register", authController.register)
router.delete('/register/:id',authController.register);
router.post("/login",authController.login);
router.get("/getAllCounts",authController.getAllCounts);


module.exports = router;
