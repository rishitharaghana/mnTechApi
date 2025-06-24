const express = require("express");
const { subscribeToNewsletter, getAllSubscribers } = require("../controllers/newsLetterController");

const router = express.Router();

router.post("/create", subscribeToNewsletter);
router.get("/all",getAllSubscribers)

module.exports = router;
