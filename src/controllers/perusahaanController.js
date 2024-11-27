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

const updateProfilePictPerusahaan = async (req, res) => {
  const { idPerusahaan } = req.body;
  const file = req.file;

  try {
    const [userData] = await perusahaanModel.searchByID(idPerusahaan);
    const found = userData[0];

    if (!found) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const { img_path } = found;
    if (img_path) {
      const filePath = img_path.split("/o/")[1].split("?")[0];
      const decodedPath = decodeURIComponent(filePath);

      const { firebaseStorage } = await firebaseConfig();
      const fileRef = ref(firebaseStorage, decodedPath);

      try {
        await deleteObject(fileRef);
      } catch (err) {
        console.error("Gagal menghapus gambar lama:", err.message);
        return res.status(500).json({
          message: "Gagal menghapus gambar lama.",
          error: err.message,
        });
      }
    }

    const profilePictURL = await uploadNewProfilePicture(file);
    await perusahaanModel.updateProfilePictPerusahaan(idPerusahaan, profilePictURL);

    res.status(200).json({
      message: "Profile berhasil diperbarui.",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil perusahaan.",
      serverMessage: error.message,
    });
  }
};

const uploadNewProfilePicture = async (profilePictFile) => {
  if (!profilePictFile) {
    throw new Error('File tidak valid');
  }

  const profilePictFileExtension = path.extname(profilePictFile.originalname);
  const profilePictFileOriginalName = path.basename(
    profilePictFile.originalname,
    profilePictFileExtension
  );
  const newProfilePictfileName = `${Date.now()}_${profilePictFileOriginalName}${profilePictFileExtension}`;

  const { firebaseStorage } = await firebaseConfig();
  const storageRef = ref(firebaseStorage, `GymNation/user-img/${newProfilePictfileName}`);

  const profilePictBuffer = profilePictFile.buffer;

  const resultProfilePict = await uploadBytes(storageRef, profilePictBuffer, {
    contentType: profilePictFile.mimetype,
  });

  return await getDownloadURL(resultProfilePict.ref);
};

const updateDataPerusahaan = async (req, res) => {
  const { 
    idPerusahaan,
    email,
    nama_perusahaan,
    aboutMe,
    alamat 
  } = req.body;

  try {
    await perusahaanModel.updateDataPerusahaan(
      idPerusahaan,
      email,
      nama_perusahaan,
      aboutMe,
      alamat 
    );
    res.status(200).json({
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

const cekPelamar = async (req, res) => {
  const { idPerusahaan } = req.params;

  try {
    const [data] = await perusahaanModel.cekPelamar(idPerusahaan);
    res.status(200).json({
      message: `menampilkan pelamar di perusahaan dengan ID ${idPerusahaan}`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deletePerusahaanHandler = async (req, res) => {
  const { id_perusahaan } = req.body;
  try {
    const result = await perusahaanModel.deletePerusahaan(id_perusahaan);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "perusahaan tidak ditemukan" });
    }
    res.status(200).json({ message: "perusahaan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting perusahaan:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus perusahaan" });
  }
};

module.exports = {
  getAllPerusahaan,
  updateProfilePictPerusahaan,
  updateDataPerusahaan,
  cekPelamar,
  deletePerusahaanHandler,
};
