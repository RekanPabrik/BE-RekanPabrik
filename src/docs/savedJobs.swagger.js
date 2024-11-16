/**
 * @swagger
 * tags:
 *   name: Saved Jobs
 *   description: Endpoint untuk mengelola pekerjaan yang disimpan.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Saved Jobs:
 *       type: object
 *       required:
 *         - id_save_jobs
 *         - id_pelamar
 *         - id_post_pekerjaan
 *       properties:
 *         id_save_jobs:
 *           type: integer
 *           description: otomatis terbuat ketika menambahkan data baru
 *         id_pelamar:
 *           type: integer
 *           description: id dari pelamar
 *         id_post_pekerjaan:
 *           type: integer
 *           description: id dari postingan yang ingin pelamar simpan
 *       example:
 *         id_save_jobs: 1
 *         id_pelamar: 4
 *         id_post_pekerjaan: 2
 */

/**
 * @swagger
 * /saveJobs/addJobs:
 *   post:
 *     summary: Menyimpan pekerjaan yang diminati
 *     tags: [Saved Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPelamar:
 *                 type: integer
 *                 description: ID pelamar yang ingin menyimpan pekerjaan
 *                 example: 1
 *               idPostPekerjaan:
 *                 type: integer
 *                 description: ID pekerjaan yang ingin disimpan
 *                 example: 10
 *     responses:
 *       200:
 *         description: Pekerjaan berhasil disimpan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pekerjaan berhasil di simpan.
 *       500:
 *         description: Terjadi kesalahan pada server.
 */

/**
 * @swagger
 * /saveJobs/getSavedJobs/{idPelamar}:
 *   get:
 *     summary: Mendapatkan daftar pekerjaan yang disimpan berdasarkan ID pelamar
 *     tags: [Saved Jobs]
 *     parameters:
 *       - name: idPelamar
 *         in: path
 *         required: true
 *         description: ID pelamar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Daftar pekerjaan yang disimpan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: menampilkan pekerjaan yang disimpan oleh ID PELAMAR 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_saved_jobs:
 *                         type: integer
 *                         example: 2
 *                       id_pelamar:
 *                         type: integer
 *                         example: 1
 *                       id_post_pekerjaan:
 *                         type: integer
 *                         example: 2
 *                       posisi:
 *                         type: string
 *                         example: Quality Assurance
 *                       lokasi:
 *                         type: string
 *                         example: Jakarta selatan, DKI JAKARTA
 *                       job_details:
 *                         type: string
 *                         example: menjadi quality assurance
 *                       requirements:
 *                         type: string
 *                         example: S1 Informatika atau setara
 *                       status_pekerjaan:
 *                         type: string
 *                         enum:
 *                           - terbuka
 *                           - ditutup
 *                         example: ditutup
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-09-23T17:00:00.000Z
 *       500:
 *         description: Terjadi kesalahan server.
 */

/**
 * @swagger
 * /saveJobs/deletsaveJobs:
 *   delete:
 *     summary: Menghapus pekerjaan yang disimpan
 *     tags: [Saved Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idsaveJobs:
 *                 type: integer
 *                 description: ID pekerjaan yang disimpan untuk dihapus
 *                 example: 5
 *     responses:
 *       200:
 *         description: Pekerjaan berhasil dihapus dari daftar simpan.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pekerjaan disimpan berhasil di hapus
 *       500:
 *         description: Terjadi kesalahan pada server.
 */
