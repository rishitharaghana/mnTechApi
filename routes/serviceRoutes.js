const express = require("express");
const router = express.Router();
const serviceController = require('../controllers/serviceController')

router.post("/service", serviceController.createService);
router.get('/service', serviceController.getAllServices); 
router.put('/service/:id', serviceController.updateService); 
router.delete('/service/:id', serviceController.deleteService); 

router.get('/service/:id/service-item/:itemId', serviceController.getServiceItem); 
router.post('/service/:id/service-item', serviceController.createServiceItem); 
router.put('/service/:id/service-item/:itemId', serviceController.updateServiceItem); 
router.delete('/service/:id/service-item/:itemId', serviceController.deleteServiceItem); 


router.get('/serviceSection', serviceController.getServiceSection);
router.post('/serviceSection', serviceController.createServiceSection);
router.put('/serviceSection/:id', serviceController.updateServiceSection);
router.delete('/serviceSection/:id', serviceController.deleteServiceSection);

router.get('/serviceSection/:id/:type/:itemId', serviceController.getSectionItem);
router.post('/serviceSection/:id/:type', serviceController.createSectionItem);
router.put('/serviceSection/:id/:type/:itemId', serviceController.updateSectionItem);
router.delete('/serviceSection/:id/:type/:itemId', serviceController.deleteSectionItem);

module.exports=router;