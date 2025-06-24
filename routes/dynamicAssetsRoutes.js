const express = require("express");
const router = express.Router();
const dynamicAssetsController = require("../controllers/dynamicAssets");

router.post("/navigation", dynamicAssetsController.navigation);
router.get("/navigation", dynamicAssetsController.navigation);
router.put("/navigation/:id", dynamicAssetsController.navigation);
router.delete("/navigation/:id", dynamicAssetsController.navigation);

router.post("/saasApplication", dynamicAssetsController.saasApplication);
router.get("/saasApplication", dynamicAssetsController.saasApplication);
router.put("/saasApplication/:id", dynamicAssetsController.saasApplication);
router.delete("/saasApplication/:id", dynamicAssetsController.saasApplication);

router.post("/serviceSection", dynamicAssetsController.serviceSection);
router.get("/serviceSection", dynamicAssetsController.serviceSection);
router.put("/serviceSection/:id", dynamicAssetsController.serviceSection);
router.delete("/serviceSection/:id", dynamicAssetsController.serviceSection);

router.post("/collaboration", dynamicAssetsController.collaboration);
router.get("/collaboration", dynamicAssetsController.collaboration);
router.put("/collaboration/:id", dynamicAssetsController.collaboration);
router.delete("/collaboration/:id", dynamicAssetsController.collaboration);

router.post("/review", dynamicAssetsController.review);
router.get("/review", dynamicAssetsController.review);
router.get("/review/:id", dynamicAssetsController.review);
router.put("/review/:id", dynamicAssetsController.review);
router.delete("/review/:id", dynamicAssetsController.review);

router.post("/ourSkills", dynamicAssetsController.ourSkills);
router.get("/ourSkills", dynamicAssetsController.ourSkills);
router.put("/ourSkills/:id", dynamicAssetsController.ourSkills);
router.delete("/ourSkills/:id", dynamicAssetsController.ourSkills);

router.post("/ourSkills/:id/skill", dynamicAssetsController.ourSkills); 
router.put("/ourSkills/:id/skill/:skillId", dynamicAssetsController.ourSkills); 
router.delete("/ourSkills/:id/skill/:skillId", dynamicAssetsController.ourSkills);

router.post("/latestThinking", dynamicAssetsController.latestThinking);
router.get("/latestThinking", dynamicAssetsController.latestThinking);
router.put("/latestThinking/:id", dynamicAssetsController.latestThinking);
router.delete("/latestThinking/:id", dynamicAssetsController.latestThinking);
router.post("/latestProject", dynamicAssetsController.latestProject);
router.get("/latestProject", dynamicAssetsController.latestProject);
router.put("/latestProject/:id", dynamicAssetsController.latestProject);
router.delete("/latestProject/:id", dynamicAssetsController.latestProject);
router.post("/hero", dynamicAssetsController.hero);
router.get("/hero", dynamicAssetsController.hero);
router.put("/hero/:id", dynamicAssetsController.hero);
router.delete("/hero/:id", dynamicAssetsController.hero);
router.post("/client", dynamicAssetsController.client);
router.get("/client", dynamicAssetsController.client);
router.put("/client/:id", dynamicAssetsController.client);
router.delete("/client/:id", dynamicAssetsController.client);
router.post("/service", dynamicAssetsController.service);
router.get('/service', dynamicAssetsController.service); 
router.post('/service', dynamicAssetsController.service); 
router.put('/service/:id', dynamicAssetsController.service); 
router.delete('/service/:id', dynamicAssetsController.service); 

router.get('/service/:id/service-item/:itemId', dynamicAssetsController.service); 
router.post('/service/:id/service-item', dynamicAssetsController.service); 
router.put('/service/:id/service-item/:itemId', dynamicAssetsController.service); 
router.delete('/service/:id/service-item/:itemId', dynamicAssetsController.service); 

router.post("/safeguard", dynamicAssetsController.safeguard);
router.get("/safeguard", dynamicAssetsController.safeguard);
router.put("/safeguard/:id", dynamicAssetsController.safeguard);
router.delete("/safeguard/:id", dynamicAssetsController.safeguard);
router.post("/serviceFooter", dynamicAssetsController.serviceFooter);
router.get("/serviceFooter", dynamicAssetsController.serviceFooter);
router.put("/serviceFooter/:id", dynamicAssetsController.serviceFooter);
router.delete("/serviceFooter/:id", dynamicAssetsController.serviceFooter);
router.post("/footer", dynamicAssetsController.footer);
router.get("/footer", dynamicAssetsController.footer);
router.put("/footer/:id", dynamicAssetsController.footer);
router.delete("/footer/:id", dynamicAssetsController.footer);
router.post("/about", dynamicAssetsController.about);
router.get("/about", dynamicAssetsController.about);
router.put("/about/:id", dynamicAssetsController.about);
router.delete("/about/:id", dynamicAssetsController.about);
router.post("/value", dynamicAssetsController.value);
router.get("/value", dynamicAssetsController.value);
router.put("/value/:id", dynamicAssetsController.value);
router.delete("/value/:id", dynamicAssetsController.value);
router.post("/team", dynamicAssetsController.team);
router.get("/team", dynamicAssetsController.team);
router.get("/team/:id", dynamicAssetsController.team);
router.put("/team/:id", dynamicAssetsController.team);
router.delete("/team/:id", dynamicAssetsController.team);

module.exports = router;
