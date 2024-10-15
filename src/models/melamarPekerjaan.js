const conn = require('../config/db_connection');

const reqMelamarPekerjaan = async (idPostPekerjaan, idPelamar, createdAt ,status) => {
    const SQLQuery = "INSERT INTO melamar_pekerjaan (id_post_pekerjaan, id_pelamar, createdAt, status) VALUES (?, ?, ?, ?)"
    return conn.execute(SQLQuery, [idPostPekerjaan, idPelamar, createdAt, status])
} 

const updateStatus = async (status, idPostPekerjaan) => {
    const SQLQuery = "UPDATE melamar_pekerjaan SET status = ? WHERE id_post_pekerjaan = ?";
    return conn.execute(SQLQuery, [status, idPostPekerjaan]);
}

module.exports = {
    reqMelamarPekerjaan,
    updateStatus
}