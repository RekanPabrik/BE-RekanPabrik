const conn = require("../config/db_connection");
const bcrypt = require("bcrypt");

const getAllPelamar = () => {
  const SQLQuery = "SELECT * FROM pelamar";
  return conn.execute(SQLQuery);
};

const addPelamar = async (
  email,
  plainpassword,
  role,
  first_name,
  last_name
) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO pelamar (email , password, role, first_name, last_name) VALUES (? ,?, ?, ?, ?)";
  return conn.execute(SQLQuery, [
    email,
    hashedPass,
    role,
    first_name,
    last_name,
  ]);
};

const searchByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM pelamar WHERE email = ? ";
  return conn.execute(SQLQuery, [email]);
};

const searchByID = async (id) => {
  const SQLQuery = "SELECT * FROM pelamar WHERE id_pelamar = ? ";
  return conn.execute(SQLQuery, [id]);
};

const updateDataPelamar = async (
  idPelamar,
  first_name,
  last_name,
  email,
  aboutMe
) => {
  const SQLQuery =
    "UPDATE pelamar SET first_name = ?, last_name = ?, email = ?, about_me = ? WHERE id_pelamar = ?";
  return conn.execute(SQLQuery, [
    first_name,
    last_name,
    email,
    aboutMe,
    idPelamar,
  ]);
};

const updateProfilePictPelamar = async (profilePict, idPelamar) => {
  const SQLQuery = "UPDATE pelamar SET  profile_pict = ? WHERE id_pelamar = ?";
  return conn.execute(SQLQuery, [profilePict, idPelamar]);
};

const updateCV = async (CV, idPelamar) => {
  const SQLQuery = "UPDATE pelamar SET  curriculum_vitae = ? WHERE id_pelamar = ?";
  return conn.execute(SQLQuery, [CV, idPelamar]);
};

const deletePelamar = async (id) => {
  const SQLQuery = "DELETE FROM pelamar WHERE id_pelamar = ?";
  return conn.execute(SQLQuery, [id]);
};

const updatePasswordByID = async (newPassword, id) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(newPassword, saltRounds);

  const SQLQuery = "UPDATE pelamar SET password = ? WHERE id_pelamar = ?";
  return conn.execute(SQLQuery, [hashedPass, id]);
};

module.exports = {
  getAllPelamar,
  updateDataPelamar,
  addPelamar,
  searchByEmail,
  updateProfilePictPelamar,
  updateCV,
  searchByID,
  deletePelamar,
  updatePasswordByID,
};
