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
};

const deletePerusahaanHandler = async (req, res) => {
  const { id_perusahaan } = req.body; 
  console.log(id_perusahaan)
  try {
      const result = await perusahaanModel.deletePerusahaan(id_perusahaan); 
      if (result[0].affectedRows === 0) {
          return res.status(404).json({ message: "perusahaan tidak ditemukan" });
      }
      res.status(200).json({ message: "perusahaan berhasil dihapus" });
  } catch (error) {
      console.error("Error deleting perusahaan:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat menghapus perusahaan" });
  }
};

module.exports = {
  getAllPerusahaan,
  updateProfilePerusahaan,
  cekPelamar,
  deletePerusahaanHandler
};
