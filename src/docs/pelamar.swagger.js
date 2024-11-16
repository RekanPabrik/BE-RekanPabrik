/**
 * @swagger
 * tags:
 *   - name: Pelamar
 *     description: Endpoint untuk Pelamar (Beberapa digunakan di admin)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pelamar:
 *       type: object
 *       required:
 *         - id_pelamar
 *         - email
 *         - password
 *         - role
 *         - first_name
 *         - last_name
 *       properties:
 *         id_pelamar:
 *           type: integer
 *           description: ID unik untuk pelamar.
 *           example: 1
 *         email:
 *           type: string
 *           description: Email pelamar.
 *           example: pelamar@example.com
 *         password:
 *           type: string
 *           description: Password pelamar (hashed).
 *           example: $2b$10$2mLI9EXAMPLEHASHEDPASSWORD
 *         role:
 *           type: string
 *           description: Role default pelamar.
 *           example: pelamar
 *         first_name:
 *           type: string
 *           description: Nama depan pelamar.
 *           example: Budi
 *         last_name:
 *           type: string
 *           description: Nama belakang pelamar.
 *           example: Santoso
 *         about_me:
 *           type: string
 *           description: Deskripsi tentang pelamar.
 *           example: Saya seorang software engineer berpengalaman 3 tahun.
 *         curriculum_vitae:
 *           type: string
 *           description: Link URL ke file CV pelamar di Firebase.
 *           example: https://firebase.com/link-ke-cv.pdf
 *         date_birth:
 *           type: string
 *           format: date
 *           description: Tanggal lahir pelamar.
 *           example: 1990-01-01
 *         profile_pict:
 *           type: string
 *           description: Link URL ke foto profil pelamar di Firebase.
 *           example: https://firebase.com/link-ke-foto-profil.jpg
 */
