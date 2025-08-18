const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");


router.post("/serviceFooter", footerController.createServiceFooter);
router.get("/serviceFooter", footerController.getServiceFooter);
router.put("/serviceFooter/:id", footerController.updateServiceFooter);
router.delete("/serviceFooter/:id", footerController.deleteServiceFooter);

router.post("/footer", footerController.createFooter);
router.get("/footer", footerController.getFooter);
router.put("/footer/:id", footerController.updateFooter);
router.delete("/footer/:id", footerController.deleteFooter)


module.exports = router;