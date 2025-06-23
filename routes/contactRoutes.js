const express = require("express");
const router= express.Router()
const contactController = require("../controllers/contactController")
router.post("/contact_us",contactController.contactUS);
router.get("/contact_us", contactController.contactUS);
router.put("/contact_us/:id", contactController.contactUS);
router.delete("/contact_us/:id", contactController.contactUS)
router.get("/getAllContacted", contactController.getAllContacted);
module.exports= router;


