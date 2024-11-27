const postPekerjaanModel = require("../models/postingPekerjaan");

const getAllPostByIdPerusahaan = async (req, res) => {
  const { idPerusahaan } = req.params;

  try {
    const [data] = await postPekerjaanModel.getAllPostByIDPerusahaan(
      idPerusahaan
    );
    if (data.length > 0) {
      res.json({
        message: `Menampilkan data postingan pekerjaan untuk perusahaan dengan ID ${idPerusahaan}`,
        status: true,
        data: data,
      });
    } else {
      res.json({
        message: `Data postingan pekerjaan untuk perusahaan dengan ID ${idPerusahaan} tidak ada`,
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error saat memperbarui status pengajuan",
      serverMessage: error,
    });
  }
};

const getPostinganByIdPostPekerjaan = async (req, res) => {
  const { idPostingan } = req.params;
  try {
    const [data] = await postPekerjaanModel.getPostByIDPostingan(
        idPostingan
    );

    if (data.length > 0) {
      res.json({
        message: "success",
        status: true,
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error saat mengambil data",
      serverMessage: error,
    });
  }
};

const createdPostinganPekerjaan = async (req, res) => {
  const { idPerusahaan, posisi, lokasi, jobDetails, requirements } = req.body;
  const status = "terbuka";

  try {
    if (!idPerusahaan || !posisi || !lokasi || !jobDetails || !requirements) {
      return res.status(400).json({
        message:
          "Semua field harus diisi. Pastikan tidak ada field yang kosong.",
      });
    }

    const createdAt = new Date();
    await postPekerjaanModel.addPostPekerjaan(
      idPerusahaan,
      posisi,
      lokasi,
      jobDetails,
      requirements,
      status,
      createdAt
    );

    const insertedData = {
      idPerusahaan,
      posisi,
      lokasi,
      jobDetails,
      requirements,
      status,
      createdAt,
    };

    res.status(200).json({
      message: "Postingan pekerjaan berhasil dibuat.",
      data: insertedData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat postingan pekerjaan.",
      serverMessage: error.message,
    });
  }
};

const deletePostingan = async (req, res) => {
  const { idPostPekerjaan } = req.params;

  try {
    await postPekerjaanModel.deletePostingan(idPostPekerjaan);
    res.status(200).json({
      message: "Postingan pekerjaan berhasil dihapus.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateStatus = async (req, res) => {
  const { idPostPekerjaan, status } = req.body;

  try {
    await postPekerjaanModel.editStatusPostingan(idPostPekerjaan, status);
    res.status(200).json({
      message: "status pekerjaan berhasil diubah.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllPostByIdPerusahaan,
  getPostinganByIdPostPekerjaan,
  createdPostinganPekerjaan,
  deletePostingan,
  updateStatus,
};
