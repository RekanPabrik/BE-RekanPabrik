const pelamarModel = require("../models/pelamar");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");
const path = require("path");

const getAllPelamar = async (req, res) => {
  try {
    const [data] = await pelamarModel.getAllPelamar();

    if (data.length > 0) {
      res.json({
        massage: "menampilkan data akun pelamar",
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

const updateDataPelamr = async(req, res) =>{
  const { idPelamar } = req.params;
  const { first_name, last_name, email, aboutMe } = req.body;

  try {
    await pelamarModel.updateDataPelamar(idPelamar, first_name, last_name, email, aboutMe)
    res.json({
      massage: "data berhasil terupdate",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      massage: "error",
      serverMassage: error,
    });
  }
}

const updateProfilePictPelamar = async (req, res) => {
  const { idPelamar } = req.params;
  const file = req.file;

  try {
    const [userData] = await pelamarModel.searchByID(idPelamar);
    const found = userData[0];

    if (!found) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const { profile_pict } = found;
    if (profile_pict) {
      const filePath = profile_pict.split("/o/")[1].split("?")[0];
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
    await pelamarModel.updateProfilePictPelamar(profilePictURL, idPelamar);

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
  const storageRef = ref(firebaseStorage, `foto-profile-user/${newProfilePictfileName}`);

  const profilePictBuffer = profilePictFile.buffer;

  const resultProfilePict = await uploadBytes(storageRef, profilePictBuffer, {
    contentType: profilePictFile.mimetype,
  });

  return await getDownloadURL(resultProfilePict.ref);
};

const deletePelamarHandler = async (req, res) => {
  const { id_pelamar } = req.body;
  try {
    const result = await pelamarModel.deletePelamar(id_pelamar);
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ message: "Pelamar tidak ditemukan" });
    }
    res.status(200).json({ message: "Pelamar berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting pelamar:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus pelamar" });
  }
};

module.exports = {
  getAllPelamar,
  updateDataPelamr,
  updateProfilePictPelamar,
  deletePelamarHandler,
};
