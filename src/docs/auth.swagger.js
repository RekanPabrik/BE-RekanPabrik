/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoint untuk autentikasi pengguna
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email pengguna yang akan login
 *         password:
 *           type: string
 *           description: Password pengguna
 *       example:
 *         email: example@mail.com
 *         password: password123
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna berdasarkan email dan password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email pengguna
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan keberhasilan
 *                 token:
 *                   type: string
 *                   description: JWT token untuk autentikasi
 *       400:
 *         description: Email atau password salah
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /auth/createAccountPelamar:
 *   post:
 *     summary: Mendaftarkan akun pelamar baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email pelamar
 *               password:
 *                 type: string
 *                 description: Password pelamar
 *               first_name:
 *                 type: string
 *                 description: Nama depan pelamar
 *               last_name:
 *                 type: string
 *                 description: Nama belakang pelamar
 *     responses:
 *       200:
 *         description: Pendaftaran berhasil
 *       400:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /auth/createAccountPerusahaan:
 *   post:
 *     summary: Mendaftarkan akun perusahaan baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email perusahaan
 *               password:
 *                 type: string
 *                 description: Password perusahaan
 *               namaPerusahaan:
 *                 type: string
 *                 description: Nama perusahaan
 *     responses:
 *       200:
 *         description: Pendaftaran berhasil
 *       400:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /auth/createAccountAdmin:
 *   post:
 *     summary: Mendaftarkan akun admin baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email admin
 *               password:
 *                 type: string
 *                 description: Password admin
 *               first_name:
 *                 type: string
 *                 description: Nama depan admin
 *               last_name:
 *                 type: string
 *                 description: Nama belakang admin
 *     responses:
 *       200:
 *         description: Pendaftaran berhasil
 *       400:
 *         description: Email sudah terdaftar
 *       500:
 *         description: Terjadi kesalahan server
 */

/**
 * @swagger
 * /auth/getUserLoggedIn:
 *   get:
 *     summary: Mendapatkan data pengguna yang sedang login
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: Data pengguna ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Pesan keberhasilan
 *                 data:
 *                   type: object
 *                   description: Data pengguna
 *       404:
 *         description: Pengguna tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */

