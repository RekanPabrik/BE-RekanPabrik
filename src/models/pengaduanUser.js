const conn = require('../config/db_connection');

const getAllpengaduan = () => {
    const SQLQuery = "SELECT * FROM pengaduan_user"
    return conn.execute(SQLQuery)
}

const addPengaduan = (first_name, last_name, email, nomor_telpon, pesan) => {
    const SQLQuery = "INSERT INTO pengaduan_user (first_name, last_name, email, nomor_telpon, pesan) VALUES (? ,?, ?, ?, ?)"
    return conn.execute(SQLQuery, [first_name, last_name, email, nomor_telpon, pesan]);
}

const deletePengaduan = async (id) => {
    const SQLQuery = "DELETE FROM pengaduan_user WHERE id_pengaduan = ?";
    return conn.execute(SQLQuery, [id]);
};

module.exports = {
    getAllpengaduan,
    addPengaduan,
    deletePengaduan,
}