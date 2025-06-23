const express = require("express");
const { subscribeToNewsletter } = require("../controllers/newsLetterController");

const router = express.Router();

router.post("/create", subscribeToNewsletter);

module.exports = router;
