const conn = require("../config/db_connection");
const bcrypt = require("bcrypt");

const getAllAdmin = () => {
  const SQLQuery = "SELECT * FROM admin";
  return conn.execute(SQLQuery);
};

const addAdmin = async (email, plainpassword, role, first_name, last_name) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO admin (email , password, role, first_name, last_name) VALUES (? ,?, ?, ?, ?)";
  return conn.execute(SQLQuery, [
    email,
    hashedPass,
    role,
    first_name,
    last_name,
  ]);
};

const searchByID = async (id) => {
  const SQLQuery = "SELECT * FROM admin WHERE id_admin = ? ";
  return conn.execute(SQLQuery, [id]);
};

const searchByEmail = async (email) => {
  const SQLQuery = "SELECT * FROM admin WHERE email = ? ";
  return conn.execute(SQLQuery, [email]);
};

const updateProfileAdmin = async (email, first_name, last_name, id_admin) => {
  const SQLQuery =
    "UPDATE admin SET email = ?,first_name = ?, last_name = ? WHERE id_admin = ?";
  return conn.execute(SQLQuery, [email, first_name, last_name, id_admin]);
};

module.exports = {
  searchByID,
  getAllAdmin,
  addAdmin,
  searchByEmail,
  updateProfileAdmin,
};
