const express = require('express');
const router = express.Router();
const postPekerjaanController = require('../controllers/postingPekerjaanController');

router.get('/getPostAllPostingan', postPekerjaanController.getAllPost);
router.get('/getPost/:idPerusahaan', postPekerjaanController.getAllPostByIdPerusahaan);
router.get('/detailPost/:idPostingan', postPekerjaanController.getPostinganByIdPostPekerjaan);
router.post('/newPostPekerjaan', postPekerjaanController.createdPostinganPekerjaan);
router.delete('/deletePostingan/:idPostPekerjaan', postPekerjaanController.deletePostingan);
router.patch('/updateStatusPostingan/:idPostPekerjaan', postPekerjaanController.updateStatus);
router.get('/getDetailPelamar/:idPelamar', postPekerjaanController.getDetailPelamar);

module.exports = router;