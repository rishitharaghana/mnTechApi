const express = require("express");
const router = express.Router();
const dynamicAssetsController = require("../controllers/dynamicAssets");


router.post("/saasApplication", dynamicAssetsController.createSaasApplication);
router.get("/saasApplication", dynamicAssetsController.getSaasApplication);
router.put("/saasApplication/:id", dynamicAssetsController.updateSaasApplication);
router.delete("/saasApplication/:id", dynamicAssetsController.deleteSaasApplication);

router.post('/hero', dynamicAssetsController.createHero);
router.get('/hero', dynamicAssetsController.getHero);
router.put('/hero/:id', dynamicAssetsController.updateHero);
router.delete('/hero/:id', dynamicAssetsController.deleteHero);


router.post("/collaboration", dynamicAssetsController.createCollaboration);
router.get("/collaboration", dynamicAssetsController.getCollaboration);
router.put("/collaboration/:id", dynamicAssetsController.updateCollaboration);
router.delete("/collaboration/:id", dynamicAssetsController.deleteCollaboration);

router.post("/review", dynamicAssetsController.createReview);
router.get("/review", dynamicAssetsController.getReview);

router.put("/review/:id", dynamicAssetsController.updateReview);
router.delete("/review/:id", dynamicAssetsController.deleteReview);

router.post("/ourSkills", dynamicAssetsController.createOurSkills);
router.get("/ourSkills", dynamicAssetsController.getOurSkills);
router.put("/ourSkills/:id", dynamicAssetsController.updateOurSkills);
router.delete("/ourSkills/:id", dynamicAssetsController.deleteOurSkills);

// router.get("/ourSkills/:id/skill/:skillId", dynamicAssetsController.ourSkills);
router.post("/ourSkills/:id/skill", dynamicAssetsController.addSkill); 
router.put("/ourSkills/:id/skill/:skillId", dynamicAssetsController.updateSkill); 
router.delete("/ourSkills/:id/skill/:skillId", dynamicAssetsController.deleteSkill);

router.post("/latestThinking", dynamicAssetsController.createLatestThinking);
router.get("/latestThinking", dynamicAssetsController.getLatestThinking);
router.put("/latestThinking/:id", dynamicAssetsController.updateLatestThinking);
router.delete("/latestThinking/:id", dynamicAssetsController.deleteLatestThinking);

router.post("/latestProject", dynamicAssetsController.createLatestProject);
router.get("/latestProject", dynamicAssetsController.getLatestProject);
router.put("/latestProject/:id", dynamicAssetsController.updateLatestProject);
router.delete("/latestProject/:id", dynamicAssetsController.deleteLatestProject);

router.post("/client", dynamicAssetsController.createClient);
router.get("/client", dynamicAssetsController.getClients);
router.put("/client/:id", dynamicAssetsController.updateClient);
router.delete("/client/:id", dynamicAssetsController.deleteClient);

router.post("/safeguard", dynamicAssetsController.createSafeguard);
router.get("/safeguard", dynamicAssetsController.getSafeguard);
router.put("/safeguard/:id", dynamicAssetsController.updateSafeguard);
router.delete("/safeguard/:id", dynamicAssetsController.deleteSafeguard);
;
router.post("/about", dynamicAssetsController.createAbout);
router.get("/about", dynamicAssetsController.getAbout);
router.put("/about/:id", dynamicAssetsController.updateAbout);
router.delete("/about/:id", dynamicAssetsController.deleteAbout);

router.post("/value", dynamicAssetsController.createValue);
router.get("/value", dynamicAssetsController.getValue);
router.put("/value/:id", dynamicAssetsController.updateValue);
router.delete("/value/:id", dynamicAssetsController.deleteValue);

router.post("/team", dynamicAssetsController.createTeamMember);
router.get("/team", dynamicAssetsController.getTeamMember);
router.get("/team/:id", dynamicAssetsController.getTeamMemberById);
router.put("/team/:id", dynamicAssetsController.updateTeamMember);
router.delete("/team/:id", dynamicAssetsController.deleteTeamMember);

module.exports = router;
