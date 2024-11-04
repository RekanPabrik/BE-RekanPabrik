const adminModel = require("../models/admin");
const pelamarModel = require("../models/pelamar");
const perusahaanModel = require("../models/perusahaan");
const postPekerjaanModel = require("../models/postingPekerjaan");

const createAccountAdmin = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const role = "admin";

  try {
    const [cekUser] = await adminModel.searchByEmail(email);

    if (cekUser.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    }

    await adminModel.addAdmin(email, password, role, first_name, last_name);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const countUser = async (req, res) => {
  try {
    const [pelamar] = await pelamarModel.getAllPelamar();
    const [admin] = await adminModel.getAllAdmin();
    const [perusahaan] = await perusahaanModel.getAllPerusahaan();
    const [postinganPekerjaan] = await postPekerjaanModel.getAllPost();

    jumlahPelamar = pelamar.length;
    jumlahAdmin = admin.length;
    jumlahPerusahaan = perusahaan.length;
    jumlahPostinganPekerjaan = postinganPekerjaan.length;
    res.status(200).json({
      message: {
        jumlahPelamar: `Jumlah Pelamar: ${jumlahPelamar}`,
        jumlahAdmin: `Jumlah Admin: ${jumlahAdmin}`,
        jumlahPerusahaan: `Jumlah Perusahaan: ${jumlahPerusahaan}`,
        jumlahPostinganPekerjaan: `Jumlah Postingan Pekerjaan: ${jumlahPostinganPekerjaan}`,
      },
      data: {
        jumlahPelamar,
        jumlahAdmin,
        jumlahPerusahaan,
        jumlahPostinganPekerjaan,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const [data] = await adminModel.getAllAdmin();

    if (data.length > 0) {
      res.json({
        massage: "menampilkan data akun admin",
        data: data,
      });
    } else {
        res.json({
            massage: "Tidak ada pelamar terdaftar"
        })
    }
  } catch (error) {
    res.status(500).json({
      massage: "error",
      serverMassage: error,
    });
  }
};

module.exports = {
  createAccountAdmin,
  countUser,
  getAllAdmin
};
