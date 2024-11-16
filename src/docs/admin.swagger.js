/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Endpoint spesifik untuk admin
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - id_admin
 *         - email
 *         - password
 *         - role
 *         - first_name
 *         - last_name
 *       properties:
 *         id_admin:
 *           type: integer
 *           description: ID unik untuk admin.
 *           example: 1
 *         email:
 *           type: string
 *           description: Email admin.
 *           example: admin@example.com
 *         password:
 *           type: string
 *           description: Password admin (hashed).
 *           example: $2b$10$2mLI9EXAMPLEHASHEDPASSWORD
 *         role:
 *           type: string
 *           description: Role default admin.
 *           example: admin
 *         first_name:
 *           type: string
 *           description: Nama depan admin.
 *           example: John
 *         last_name:
 *           type: string
 *           description: Nama belakang admin.
 *           example: Doe
 */

/**
 * @swagger
 * /admin/countUser:
 *   get:
 *     summary: Menghitung total jumlah pengguna, admin, perusahaan, dan postingan pekerjaan
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Total data yang dihitung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: object
 *                   properties:
 *                     jumlahPelamar:
 *                       type: string
 *                       example: "Jumlah Pelamar: 10"
 *                     jumlahAdmin:
 *                       type: string
 *                       example: "Jumlah Admin: 5"
 *                     jumlahPerusahaan:
 *                       type: string
 *                       example: "Jumlah Perusahaan: 7"
 *                     jumlahPostinganPekerjaan:
 *                       type: string
 *                       example: "Jumlah Postingan Pekerjaan: 20"
 *                 data:
 *                   type: object
 *                   properties:
 *                     jumlahPelamar:
 *                       type: integer
 *                       example: 10
 *                     jumlahAdmin:
 *                       type: integer
 *                       example: 5
 *                     jumlahPerusahaan:
 *                       type: integer
 *                       example: 7
 *                     jumlahPostinganPekerjaan:
 *                       type: integer
 *                       example: 20
 *       500:
 *         description: Terjadi kesalahan server
 */


/**
 * @swagger
 * /admin/getAllAdmin:
 *   get:
 *     summary: Mendapatkan daftar semua akun admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Daftar semua akun admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 massage:
 *                   type: string
 *                   example: menampilkan data akun admin
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /admin/profile:
 *   put:
 *     summary: Memperbarui profil admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_admin
 *               - email
 *               - first_name
 *               - last_name
 *             properties:
 *               id_admin:
 *                 type: integer
 *                 example: 1
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: Profil berhasil diperbarui
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /admin/deleteAdmin:
 *   delete:
 *     summary: Menghapus akun admin berdasarkan ID
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_admin
 *             properties:
 *               id_admin:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Admin berhasil dihapus
 *       404:
 *         description: Admin tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
 