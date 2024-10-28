const express = require('express');
const router = express.Router();
const perusahaanController = require('../controllers/perusahaanController')
const multer = require("../middleware/multer")

router.patch('/profile', multer.single('file'), perusahaanController.updateProfilePerusahaan);
router.get("/:idPerusahaan/cekPelamar", perusahaanController.cekPelamar)

module.exports = router;