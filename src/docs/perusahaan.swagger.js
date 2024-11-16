/**
 * @swagger
 * tags:
 *   - name: Perusahaan
 *     description: Endpoint untuk Perusahaan (Beberapa digunakan di admin)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Perusahaan:
 *       type: object
 *       required:
 *         - id_perusahaan
 *         - email
 *         - password
 *         - role
 *         - nama_perusahaan
 *       properties:
 *         id_perusahaan:
 *           type: integer
 *           description: ID unik untuk perusahaan.
 *           example: 1
 *         email:
 *           type: string
 *           description: Email perusahaan.
 *           example: perusahaan@example.com
 *         password:
 *           type: string
 *           description: Password perusahaan (hashed).
 *           example: $2b$10$2mLI9EXAMPLEHASHEDPASSWORD
 *         role:
 *           type: string
 *           description: Role default perusahaan.
 *           example: perusahaan
 *         nama_perusahaan:
 *           type: string
 *           description: Nama perusahaan.
 *           example: PT Maju Jaya
 *         about_me:
 *           type: string
 *           description: Deskripsi tentang perusahaan.
 *           example: Kami adalah perusahaan yang bergerak di bidang teknologi.
 *         profile_pict:
 *           type: string
 *           description: Link URL ke foto profil perusahaan di Firebase.
 *           example: https://firebase.com/link-ke-foto-profil.jpg
 *         alamat:
 *           type: string
 *           description: Alamat perusahaan.
 *           example: Jl. Sudirman No. 123, Jakarta
 */
