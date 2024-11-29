const conn = require("../config/db_connection");
const bcrypt = require("bcrypt");

const getAllPerusahaan = () => {
  const SQLQuery = "SELECT * FROM perusahaan";
  return conn.execute(SQLQuery);
};

const addPerusahaan = async (email, plainpassword, role, namaPerusahaan) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO perusahaan (email , password, role, nama_perusahaan) VALUES (? ,?, ?, ?)";
  return conn.execute(SQLQuery, [email, hashedPass, role, namaPerusahaan]);
};

const searchByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM perusahaan WHERE email = ? ";
  return conn.execute(SQLQuery, [email]);
};

const searchByID = async (id) => {
  const SQLQuery = "SELECT * FROM perusahaan WHERE id_perusahaan = ? ";
  return conn.execute(SQLQuery, [id]);
};

const updateProfilePictPerusahaan = async (idPerusahaan, profilePict) => {
  const SQLQuery =
    "UPDATE perusahaan SET  profile_pict = ? WHERE id_perusahaan = ?";
  return conn.execute(SQLQuery, [profilePict, idPerusahaan]);
};

const updateDataPerusahaan = async (
  idPerusahaan,
  email,
  nama_perusahaan,
  aboutMe,
  alamat
) => {
  const SQLQuery =
    "UPDATE perusahaan SET email = ?, nama_perusahaan = ?, about_me = ?, alamat = ? WHERE id_perusahaan = ?";
  return conn.execute(SQLQuery, [
    email,
    nama_perusahaan,
    aboutMe,
    alamat,
    idPerusahaan,
  ]);
};

const cekPelamar = async (idPerusahaan) => {
  const SQLQuery = `
    SELECT 
    p.nama_perusahaan, 
    pel.id_pelamar, 
    pel.first_name, 
    pel.last_name, 
    pel.email, 
    pel.profile_pict AS foto_profil, 
    pel.curriculum_vitae AS link_cv, 
    mp.status AS status_lamaran, 
    pp.posisi AS posisi_dilamar
FROM 
    perusahaan p
JOIN 
    posting_pekerjaan pp ON pp.id_perusahaan = p.id_perusahaan
JOIN 
    melamar_pekerjaan mp ON mp.id_post_pekerjaan = pp.id_post_pekerjaan
JOIN 
    pelamar pel ON pel.id_pelamar = mp.id_pelamar
WHERE 
    p.id_perusahaan = ?;


  `;
  return conn.execute(SQLQuery, [idPerusahaan]);
};

const deletePerusahaan = async (id) => {
  const SQLQuery = "DELETE FROM perusahaan WHERE id_perusahaan = ?";
  return conn.execute(SQLQuery, [id]);
};

const updatePasswordByID = async (newPassword, id) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(newPassword, saltRounds);

  const SQLQuery = "UPDATE perusahaan SET password = ? WHERE id_perusahaan = ?";
  return conn.execute(SQLQuery, [hashedPass, id]);
}

module.exports = {
  searchByID,
  getAllPerusahaan,
  addPerusahaan,
  searchByEmail,
  updateProfilePictPerusahaan,
  cekPelamar,
  deletePerusahaan,
  updateDataPerusahaan,
  updatePasswordByID
};
