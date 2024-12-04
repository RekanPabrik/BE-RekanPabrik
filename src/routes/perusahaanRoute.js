const express = require('express');
const router = express.Router();
const perusahaanController = require('../controllers/perusahaanController')
const multer = require("../middleware/multer");
const verifyJWT = require('../middleware/verififyJWT');

router.patch('/updateProfilePict/:idPerusahaan', verifyJWT,multer.single('profile_pict'), perusahaanController.updateProfilePictPerusahaan);
router.put('/updateDataPerusahaan', verifyJWT,perusahaanController.updateDataPerusahaan);
router.get("/:idPerusahaan/cekPelamar", verifyJWT,perusahaanController.cekPelamar)
router.get("/getAllPerusahaan", perusahaanController.getAllPerusahaan);
router.get("/getAllPerusahaan/:idperusahaan", perusahaanController.getAllPerusahaanByIDPerusahaan);
router.delete('/deletePerusahaan', verifyJWT,perusahaanController.deletePerusahaanHandler);
router.patch('/changePassword/:id_perusahaan', verifyJWT,perusahaanController.changePassword);

module.exports = router;