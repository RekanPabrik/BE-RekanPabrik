const conn = require('../config/db_connection')

const simpanPekerjaan = (idPelamar, idPostPekerjaan) => {
    const SQLQuery = "INSERT INTO saved_jobs (id_pelamar, id_post_pekerjaan) VALUES (?, ?)";
    return conn.execute(SQLQuery, [idPelamar, idPostPekerjaan]);
}

const getSavedJobsByIdPelamar = (idPelamar) => {
    const SQLQuery = `
        SELECT 
            sj.id_saved_jobs,
            sj.id_pelamar,
            sj.id_post_pekerjaan,
            pp.posisi,
            pp.lokasi,
            pp.job_details,
            pp.requirements,
            pp.status AS status_pekerjaan,
            pp.createdAt
        FROM 
            saved_jobs sj
        JOIN 
            posting_pekerjaan pp ON sj.id_post_pekerjaan = pp.id_post_pekerjaan
        WHERE 
            sj.id_pelamar = ?
    `;
    return conn.execute(SQLQuery, [idPelamar]);
}

const deletSavedJobsById = (idSavedJobs) => {
    const SQLQuery = "DELETE FROM saved_jobs WHERE id_saved_jobs = ?"
    return conn.execute(SQLQuery, [idSavedJobs]);
} 

module.exports = {
    simpanPekerjaan,
    getSavedJobsByIdPelamar,
    deletSavedJobsById
}