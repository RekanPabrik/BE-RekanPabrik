/**
 * @swagger
 * tags:
 *   name: saved jobs
 *   description: saved jobs (simpan pekerjaan) API
 * /addJobs:
 *   post:
 *     summary: membuat data simpan pekerjaan baru
 *     tags: [saved jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/saved jobs'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/saved jobs'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     saved jobs:
 *       type: object
 *       required:
 *         - id_saved_jobs
 *         - id_pelamar
 *         - id_post_pekerjaan
 *       properties:
 *         id_saved_jobs:
 *           type: integer
 *           description: otomatis terbuat ketika menambahkan data baru
 *         id_pelamar:
 *           type: integer
 *           description: id dari pelamar
 *         id_post_pekerjaan:
 *           type: integer
 *           description: id dari postingan yang ingin pelamar simpan
 *       example:
 *         id_saved_jobs: 1
 *         id_pelamar: 4
 *         id_post_pekerjaan: 2
 */
