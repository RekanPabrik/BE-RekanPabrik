const pelamarModel = require("../models/pelamar");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
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

const updateProfilePelamar = async (req, res) => {
  const { idPelamar, aboutMe, dateBirth } = req.body;
  const { CV, profilePict } = req.files; 

  try {
    const { firebaseStorage } = await firebaseConfig();
    
    // Upload CV
    const CVFile = CV ? CV[0] : null;
    if (CVFile) {
      const CVExtension = path.extname(CVFile.originalname);
      const newCVfileName = `${Date.now()}_${CVExtension}`;
      const storageRef01 = ref(firebaseStorage, `curriculum-vitae/${newCVfileName}`);
      const CVFileBuffer = CVFile.buffer;
      const resultCV = await uploadBytes(storageRef01, CVFileBuffer, {
        contentType: CVFile.mimetype,
      });
      var CVdownloadURL = await getDownloadURL(resultCV.ref);
    }

    // Upload foto profile
    const profilePictFile = profilePict ? profilePict[0] : null; 
    if (profilePictFile) {
      const profilePictExtension = path.extname(profilePictFile.originalname);
      const newProfilePictfileName = `${Date.now()}_${profilePictExtension}`;
      const storageRef02 = ref(firebaseStorage, `foto-profile-user/${newProfilePictfileName}`);
      const profilePictFileBuffer = profilePictFile.buffer;
      const resultProfilePict = await uploadBytes(storageRef02, profilePictFileBuffer, {
        contentType: profilePictFile.mimetype,
      });
      var profilePictdownloadURL = await getDownloadURL(resultProfilePict.ref);
    }
    
    // Upload ke DB
    await pelamarModel.updateProfilePelamar(
      idPelamar,
      aboutMe,
      CVdownloadURL,
      dateBirth,
      profilePictdownloadURL
    );

    const RS = {
      idPelamar,
      aboutMe,
      CVdownloadURL,
      dateBirth,
      profilePictdownloadURL,
    };
    console.log(RS)

    res.status(201).json({ 
      message: "Profile berhasil diperbarui.",
      data: RS 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  getAllPelamar,
  updateProfilePelamar
};
