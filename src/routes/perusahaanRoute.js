const express = require('express');
const router = express.Router();
const perusahaanController = require('../controllers/perusahaanController')
const multer = require("../middleware/multer")

router.patch('/updateProfilePict', multer.single('profile_pict'), perusahaanController.updateProfilePictPerusahaan);
router.put('/updateDataPerusahaan', perusahaanController.updateDataPerusahaan);
router.get("/:idPerusahaan/cekPelamar", perusahaanController.cekPelamar)
router.get("/getAllPerusahaan", perusahaanController.getAllPerusahaan);
router.delete('/deletePerusahaan', perusahaanController.deletePerusahaanHandler);

module.exports = router;