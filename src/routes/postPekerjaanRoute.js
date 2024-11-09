const express = require('express');
const router = express.Router();
const postPekerjaanController = require('../controllers/postingPekerjaanController');

router.get('/getPost/:idPerusahaan', postPekerjaanController.getAllPostByIdPerusahaan);
router.get('/detailPost/:idPostingan', postPekerjaanController.getPostinganByIdPostPekerjaan);
router.post('/newPostPekerjaan', postPekerjaanController.createdPostinganPekerjaan);
router.delete('/deletePostingan/:idPostPekerjaan', postPekerjaanController.deletePostingan);
router.patch('/updateStatusPostingan', postPekerjaanController.updateStatus);

module.exports = router;