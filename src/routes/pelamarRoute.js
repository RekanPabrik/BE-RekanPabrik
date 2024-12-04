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
router.delete("/deletePelamar", pelamarController.deletePelamarHandler);

module.exports = router;
