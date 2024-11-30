const conn = require('../config/db_connection');

const reqMelamarPekerjaan = async (idPostPekerjaan, idPelamar, createdAt ,status) => {
    const SQLQuery = "INSERT INTO melamar_pekerjaan (id_post_pekerjaan, id_pelamar, createdAt, status) VALUES (?, ?, ?, ?)"
    return conn.execute(SQLQuery, [idPostPekerjaan, idPelamar, createdAt, status])
} 

const updateStatus = async (status, idPostPekerjaan) => {
    const SQLQuery = "UPDATE melamar_pekerjaan SET status = ? WHERE id_post_pekerjaan = ?";
    return conn.execute(SQLQuery, [status, idPostPekerjaan]);
}


const getDataMelamarPekarjaan = () => {
    const SQLQuery = `
        SELECT 
            pelamar.first_name AS nama_depan_pelamar,
            pelamar.last_name AS nama_belakang_pelamar,
            posting_pekerjaan.posisi AS posisi_pekerjaan,
            melamar_pekerjaan.status AS status_lamaran,
            perusahaan.nama_perusahaan AS nama_perusahaan
        FROM 
            melamar_pekerjaan
        JOIN 
            pelamar ON melamar_pekerjaan.id_pelamar = pelamar.id_pelamar
        JOIN 
            posting_pekerjaan ON melamar_pekerjaan.id_post_pekerjaan = posting_pekerjaan.id_post_pekerjaan
        JOIN 
            perusahaan ON posting_pekerjaan.id_perusahaan = perusahaan.id_perusahaan;
    `
    return conn.execute(SQLQuery);
}

module.exports = {
    reqMelamarPekerjaan,
    updateStatus,
    getDataMelamarPekarjaan,
}