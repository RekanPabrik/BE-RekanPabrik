const conn = require('../config/db_connection')

const getAllPost = () => {
    const SQLQuery = "SELECT * FROM posting_pekerjaan"
    return conn.execute(SQLQuery)
}

const getAllPostByIDPerusahaan = (idPerusahaan) => {
    const SQLQuery = `
    SELECT 
        posting_pekerjaan.id_post_pekerjaan,
        posting_pekerjaan.id_perusahaan,
        posting_pekerjaan.posisi,
        posting_pekerjaan.lokasi,
        posting_pekerjaan.job_details,
        posting_pekerjaan.requirements,
        posting_pekerjaan.status,
        posting_pekerjaan.createdAt,
        perusahaan.nama_perusahaan,
        perusahaan.about_me,
        perusahaan.profile_pict,
        perusahaan.alamat
    FROM 
        posting_pekerjaan
    JOIN 
        perusahaan 
    ON 
        posting_pekerjaan.id_perusahaan = perusahaan.id_perusahaan
    WHERE 
        posting_pekerjaan.id_perusahaan = ?;
    `
    return conn.execute(SQLQuery, [idPerusahaan])
}

const addPostPekerjaan = (idPerusahaan, posisi, lokasi, jobDetails, requirements, status, createdAt) =>  {
    const SQLQuery = "INSERT INTO posting_pekerjaan(id_perusahaan, posisi, lokasi, job_details, requirements, status, createdAt) VALUES (?,?,?,?,?,?,?)"
    return conn.execute(SQLQuery, [idPerusahaan, posisi, lokasi, jobDetails, requirements, status, createdAt]);
}

const deletePostingan = (idPostingan) => {
    const SQLQuery = "DELETE FROM posting_pekerjaan WHERE id_postingan = ?"
    return conn.execute(SQLQuery, [idPostingan])
}

const editStatusPostingan = (idPostingan, status) => {
    const SQLQuery = "UPDATE posting_pekerjaan SET status = ? WHERE id_post_pekerjaan = ?"
    return conn.execute(SQLQuery, [status, idPostingan]);
}

module.exports = {
    getAllPostByIDPerusahaan,
    getAllPost,
    addPostPekerjaan,
    deletePostingan,
    editStatusPostingan,
}