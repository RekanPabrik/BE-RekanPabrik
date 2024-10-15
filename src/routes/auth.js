const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.post('/login', authController.login);
router.post('/registerPelamar', authController.registerPelamar);
router.post('/registerAdmin', authController.registerAdmin);
router.post('/registerPerusahaan', authController.registerPerusahaan);

module.exports = router;