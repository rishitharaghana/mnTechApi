const express = require("express");
const router = express.Router();
const footerController = require("../controllers/footerController");


router.post("/serviceFooter", footerController.createServiceFooter);//createservicefooter
router.get("/serviceFooter", footerController.getServiceFooter);//getserviceFooter
router.put("/serviceFooter/:id", footerController.updateServiceFooter);//upadte servicefooter
router.delete("/serviceFooter/:id", footerController.deleteServiceFooter);//deleteserviceFooter

router.post("/footer", footerController.createFooter);
router.get("/footer", footerController.getFooter);
router.put("/footer/:id", footerController.updateFooter);
router.delete("/footer/:id", footerController.deleteFooter)


module.exports = router;