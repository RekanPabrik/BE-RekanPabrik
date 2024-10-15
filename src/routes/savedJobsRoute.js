const express = require('express');
const router = express.Router();
const savedJobsController = require('../controllers/savedJobsControllers')

router.get('/getSavedJobs/:idPelamar', savedJobsController.getSavedJobsByIdPelamar);
router.post('/addJobs', savedJobsController.savedJobs);
router.delete('/deletSavedJobs', savedJobsController.deleteSavedJobs);

module.exports = router;