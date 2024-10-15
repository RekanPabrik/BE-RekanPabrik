const conn = require('../config/db_connection')
const bcrypt = require('bcrypt');

const getAllPelamar = () => {
    const SQLQuery = "SELECT * FROM pelamar"
    return conn.execute(SQLQuery)
}

const addPelamar = async (email, plainpassword, role, first_name, last_name) => {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
    const SQLQuery = "INSERT INTO pelamar (email , password, role, first_name, last_name) VALUES (? ,?, ?, ?, ?)"
    return conn.execute(SQLQuery, [email, hashedPass, role, first_name, last_name]);
}

const searchByEmail = async (email) => {
    const SQLQuery = "SELECT * FROM pelamar WHERE email = ? ";
    return conn.execute(SQLQuery, [email]);
}

const searchByID = async (id) => {
    const SQLQuery = "SELECT * FROM pelamar WHERE id_pelamar = ? ";
    return conn.execute(SQLQuery, [id]);
}

const updateProfilePelamar = async (idPelamar, aboutMe, CV, dateBirth, profile_pict) => {
    const SQLQuery = "UPDATE pelamar SET about_me = ?, curriculum_vitae = ?, date_birth = ?, profile_pict = ? WHERE id_pelamar = ?";
    return conn.execute(SQLQuery, [aboutMe, CV, dateBirth, profile_pict, idPelamar]);
}

module.exports = {
    getAllPelamar,
    addPelamar,
    searchByEmail,
    updateProfilePelamar,
    searchByID
}