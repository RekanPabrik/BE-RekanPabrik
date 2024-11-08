require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin");
const pelamarModel = require("../models/pelamar");
const perusahaanModel = require("../models/perusahaan");

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // cek tabel pelamar
    const [pelamarRows] = await pelamarModel.searchByEmail(email);
    if (pelamarRows.length > 0) {
      const pelamar = pelamarRows[0];
      const match = await bcrypt.compare(password, pelamar.password);
      if (match) {
        const token = jwt.sign(
          { id: pelamar.id_pelamar, role: "pelamar" },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          massage: "Login succesful",
          token,
        });
      }
    }

    const [adminRows] = await adminModel.searchByEmail(email);
    if (adminRows.length > 0) {
      const admin = adminRows[0];
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { id: admin.id_admin, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          massage: "login succesful",
          token,
        });
      }
    }

    const [perusahaanRows] = await perusahaanModel.searchByEmail(email);
    if (perusahaanRows.length > 0) {
      const perusahaan = perusahaanRows[0];
      const match = await bcrypt.compare(password, perusahaan.password);
      if (match) {
        const token = jwt.sign(
          { id: perusahaan.id_perusahaan, role: "perusahaan" },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return res.status(200).json({
          massage: "login succesful",
          token,
        });
      }
    }

    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserModelByRole = (role) => {
    switch (role) {
        case 'pelamar':
            return pelamarModel;
        case 'admin':
            return adminModel;
        case 'perusahaan':
            return perusahaanModel;
        default:
            throw new Error('Role tidak valid');
    }
};

const getUserLoggedIn = async (req, res) => {
    try {
        const model = getUserModelByRole(req.role);
        const response = await model.searchByID(req.id); 
        if (!response) {
            return res.status(404).json({ message: 'User not found', data: null });
        }
        res.status(200).json({ message: 'User found', data: response });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
};


const createAccountPelamar = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  const role = "pelamar";

  try {
    const [cekUser] = await pelamarModel.searchByEmail(email);

    if (cekUser.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    }

    await pelamarModel.addPelamar(email, password, role, first_name, last_name);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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

module.exports = {
  login,
  createAccountPelamar,
  createAccountPerusahaan,
  createAccountAdmin,
  getUserLoggedIn
};
