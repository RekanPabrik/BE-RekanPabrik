const pengaduanController = require("../controllers/pengaduanController");
const express = require('express');
const verifyJWT = require("../middleware/verififyJWT");
const router = express.Router();

router.post("/addPengaduan", pengaduanController.addPengaduan);
router.get("/getAllPengaduan", verifyJWT, pengaduanController.getAllpengaduan);
router.delete("/deletePengaduan/:id_pengaduan", verifyJWT, pengaduanController.deletePengaduan);

module.exports = router