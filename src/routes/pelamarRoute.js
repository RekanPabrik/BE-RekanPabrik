const express = require('express');
const router = express.Router();
const pelamarController = require('../controllers/pelamarController')
const multer = require("../middleware/multer")

router.get('/me', pelamarController.getUserLoggedIn);
router.get('/getAllPelamar', pelamarController.getAllPelamar);
router.post('/createAccountPelamar', pelamarController.createAccountPelamar);
router.patch('/updateProfilePelamar', multer.fields([
    {name: 'CV', maxCount: 1},
    {name: 'profilePict', maxCount: 1},
]),pelamarController.updateProfilePelamar);


module.exports = router;