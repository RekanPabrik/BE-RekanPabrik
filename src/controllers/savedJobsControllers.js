const savedJobsModel = require("../models/savedJobs");

const savedJobs = async (req, res) => {
  const { idPelamar, idPostPekerjaan } = req.body;

  try {
    await savedJobsModel.simpanPekerjaan(idPelamar, idPostPekerjaan);
    res.status(200).json({
      message: "Pekerjaan berhasil di simpan.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getSavedJobsByIdPelamar = async (req, res) => {
  const { idPelamar } = req.params;

  try {
    const [data] = await savedJobsModel.getSavedJobsByIdPelamar(idPelamar);
    res.status(200).json({
      message: `menampilkan pekerjaan yang disimpan oleh ID PELAMAR ${idPelamar}`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteSavedJobs = async (req, res) => {
  const { idSavedJobs } = req.body;

  try {
    await savedJobsModel.deletSavedJobsById(idSavedJobs);
    res.status(200).json({
      message: "pekerjaan disimpan berhasil di hapus",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  savedJobs,
  getSavedJobsByIdPelamar,
  deleteSavedJobs
};
