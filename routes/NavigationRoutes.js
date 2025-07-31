const express = require("express");
const router = express.Router();
const NavigationController = require('../controllers/NavigationController')

router.post("/navigation", NavigationController.createNavigation);
router.get("/navigation", NavigationController.getNavigation);
router.put("/navigation/:id", NavigationController.updateNavigation);
router.delete("/navigation/:id", NavigationController.deleteNavigation);


module.exports=router;