const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/countUser', adminController.countUser);
router.get('/getAllAdmin', adminController.getAllAdmin);

module.exports = router;