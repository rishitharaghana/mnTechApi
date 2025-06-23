const express = require("express");
const router = express.Router();
const reachController = require("../controllers/reachController");

router.post("/create_reach_us", reachController.createReachUS);
router.get("/getAllReachUs", reachController.getAllReachUS);
module.exports = router;
