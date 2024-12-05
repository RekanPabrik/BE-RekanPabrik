const express = require('express');
const router = express.Router();
const melamarPekerjaanControllers = require('../controllers/melamarPekerjaanControllers');

router.post('/melamar', melamarPekerjaanControllers.melamarPekerjaan);
router.patch('/updateStatus/:idPostPekerjaan', melamarPekerjaanControllers.updateStatus)
router.get('/getDataMelamarPekarjaan', melamarPekerjaanControllers.getDataMelamarPekarjaan)
router.get('/getDataMelamarPekarjaan/:idpelamar', melamarPekerjaanControllers.getMelamarHistortyByIDpelamar)
router.get('/getDataPostinganBYID/:idPostinganPekerjaan', melamarPekerjaanControllers.getMelamarHistortyByIDPostingan)

module.exports = router;