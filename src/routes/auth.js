const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const verifyJWT = require('../middleware/verififyJWT');

router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgetPassword);
router.get('/me', verifyJWT, authController.getUserLoggedIn);
router.post('/registerPelamar', authController.createAccountPelamar);
router.post('/registerAdmin', authController.createAccountAdmin);
router.post('/registerPerusahaan', authController.createAccountPerusahaan);

module.exports = router;