const express = require("express");
const router = express.Router();
const pelamarController = require("../controllers/pelamarController");
const multer = require("../middleware/multer");

router.get("/getAllPelamar", pelamarController.getAllPelamar);
router.put('/updateDataPelamar/:idPelamar', pelamarController.updateDataPelamr);
router.patch(
  "/updateProfilePelamar/:idPelamar",
  multer.single("profile_pict"),
  pelamarController.updateProfilePictPelamar
);
router.patch(
  "/updateCV/:idPelamar",
  multer.single("CV"),
  pelamarController.updateCVPelamar
);
router.delete("/deletePelamar", pelamarController.deletePelamarHandler);
router.patch('/changePassword/:id_pelamar', pelamarController.changePassword);

module.exports = router;
