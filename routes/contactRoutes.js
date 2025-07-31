const express = require("express");
const router= express.Router()
const contactController = require("../controllers/contactController")

router.post("/contact_us",contactController.createContact);
router.get("/contact_us", contactController.getContact);
router.put("/contact_us/:id", contactController.updateContact);
router.delete("/contact_us/:id", contactController.deleteContact)
router.get("/getAllContacted", contactController.getAllContacted);
module.exports= router;


