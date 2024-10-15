const express = require('express');
const router = express.Router();
const melamarPekerjaanControllers = require('../controllers/melamarPekerjaanControllers');

router.post('/melamar', melamarPekerjaanControllers.melamarPekerjaan);
router.patch('/updateStatus/:idPostPekerjaan', melamarPekerjaanControllers.updateStatus)

module.exports = router;