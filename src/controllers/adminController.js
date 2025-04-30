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

    let jumlahPelamar = pelamar.length;
    let jumlahAdmin = admin.length;
    let jumlahPerusahaan = perusahaan.length;
    let jumlahPostinganPekerjaan = postinganPekerjaan.length;
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
        massage: "Tidak ada pelamar terdaftar",
      });
    }
  } catch (error) {
    res.status(500).json({
      massage: "error",
      serverMassage: error,
    });
  }
};

const updateProfileAdmin = async (req, res) => {
  const { id_admin, email, first_name, last_name } = req.body;
  try {
    await adminModel.updateProfileAdmin(email, first_name, last_name, id_admin);
    res.status(201).json({
      message: "Profile berhasil diperbarui.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil perusahaan.",
      serverMessage: error.message,
    });
  }
};

const deleteAdminHandler = async (req, res) => {
  const { id_admin } = req.body; 
  try {
      const result = await adminModel.deleteAdmin(id_admin); 
      if (result[0].affectedRows === 0) {
          return res.status(404).json({ message: "admin tidak ditemukan" });
      }
      res.status(200).json({ message: "admin berhasil dihapus" });
  } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus admin" });
  }
};

module.exports = {
  createAccountAdmin,
  countUser,
  getAllAdmin,
  updateProfileAdmin,
  deleteAdminHandler,
};
