const perusahaanModel = require("../models/perusahaan");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");
const path = require("path");
const crypto = require("crypto");

const getUserLoggedIn = async (req, res) => {
  try {
      const response = await pelamarModel.searchByID(req.id)
      res.status(200).json({message: 'User found', data: response});
  } catch (error) {
      res.status(500).json({ message: error.message, data: null });
  }
};

const getAllPerusahaan = async (req, res) => {
  try {
    const [data] = await perusahaanModel.getAllPerusahaan();

    if (data.length > 0) {
      res.json({
        massage: "menampilkan data akun perusahaan",
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

const createAccountPerusahaan = async (req, res) => {
  const { email, password, namaPerusahaan } = req.body;
  const role = "perusahaan";

  try {
    const [cekPerusahaan] = await perusahaanModel.searchByEmail(email);

    if (cekPerusahaan.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    }

    await perusahaanModel.addPerusahaan(email, password, role, namaPerusahaan);
    res.status(200).json({ message: "perusahaan registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfilePerusahaan = async (req, res) => {
  const { idPerusahaan, aboutMe, alamat } = req.body;
  const file = req.file;

  try {
    const { firebaseStorage } = await firebaseConfig();
    
    const fileExtension = path.extname(file.originalname); 
    const newFileName = `${Date.now()}-${fileExtension}`; 
    const storageRef = ref(firebaseStorage, `foto-profile-perusahaan/${newFileName}`); 
    const fileBuffer = file.buffer; 
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.mimetype, 
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    await perusahaanModel.updateProfilePerusahaan(
      idPerusahaan,
      aboutMe,
      downloadURL,
      alamat
    );

    const result = {
      idPerusahaan,
      aboutMe,
      downloadURL,
      alamat
    }

    res.status(201).json({ 
      message: "Profile berhasil diperbarui.",
      data: result 
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil perusahaan.",
      serverMessage: error.message,
    });
  }
};

const cekPelamar = async (req, res) => {
  const {idPerusahaan} = req.params

  try {
    const [data] = await perusahaanModel.cekPelamar(idPerusahaan)
    res.status(200).json({ 
      message: `menampilkan pelamar di perusahaan dengan ID ${idPerusahaan}`, 
      data: data
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getUserLoggedIn,
  getAllPerusahaan,
  createAccountPerusahaan,
  updateProfilePerusahaan,
  cekPelamar,
};
