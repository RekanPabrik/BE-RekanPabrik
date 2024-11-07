const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/countUser', adminController.countUser);
router.get('/getAllAdmin', adminController.getAllAdmin);
router.put('/profile', adminController.updateProfileAdmin);
router.delete('/deleteAdmin', adminController.deleteAdminHandler);

module.exports = router;