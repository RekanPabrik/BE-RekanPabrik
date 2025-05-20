require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin");
const pelamarModel = require("../models/pelamar");
const perusahaanModel = require("../models/perusahaan");
const transporter = require("../config/mail.config");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
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
    case "pelamar":
      return pelamarModel;
    case "admin":
      return adminModel;
    case "perusahaan":
      return perusahaanModel;
    default:
      throw new Error("Role tidak valid");
  }
};

const getUserLoggedIn = async (req, res) => {
  try {
    const model = getUserModelByRole(req.role);
    const response = await model.searchByID(req.id);
    if (!response) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    res.status(200).json({ message: "User found", data: response });
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

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;
    let role = null;

    const [pelamarRows] = await pelamarModel.searchByEmail(email);
    if (pelamarRows.length > 0) {
      user = pelamarRows[0];
      role = "pelamar";
    }

    if (!user) {
      const [adminRows] = await adminModel.searchByEmail(email);
      if (adminRows.length > 0) {
        user = adminRows[0];
        role = "admin";
      }
    }

    if (!user) {
      const [perusahaanRows] = await perusahaanModel.searchByEmail(email);
      if (perusahaanRows.length > 0) {
        user = perusahaanRows[0];
        role = "perusahaan";
      }
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email tidak ditemukan." });
    }

    const token = jwt.sign(
      { id: user.id_pelamar || user.id_admin || user.id_perusahaan, role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const resetLink = `${process.env.WEB_URL}/resetPassword/${token}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Permintaan Atur Ulang Password Anda",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #333;">Reset Password Akun Anda</h2>
      <p>Halo,</p>
      <p>Kami menerima permintaan untuk mengatur ulang password akun Anda. Jika Anda tidak merasa melakukan permintaan ini, abaikan saja email ini dan tidak akan terjadi perubahan apa pun.</p>
      
      <p>Untuk melanjutkan proses pengaturan ulang password, silakan klik tombol di bawah ini:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>

      <p><strong>Catatan:</strong> Link ini hanya berlaku selama <strong>15 menit</strong> demi keamanan akun Anda.</p>

      <p>Terima kasih telah menggunakan layanan kami.</p>
      
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #888;">Email ini dikirim secara otomatis, mohon untuk tidak membalas. Jika Anda membutuhkan bantuan, silakan hubungi tim dukungan kami.</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      token,
      message: "Email reset password telah dikirim.",
    });
  } catch (error) {
    console.error("Error mengirim email reset password:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const model = getUserModelByRole(req.role);
  const id = req.id;

  try {
    await model.updatePasswordByID(newPassword, id);

    res
      .status(200)
      .json({ success: true, message: "Password berhasil direset." });
  } catch (error) {
    console.error("Error reset password:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  forgetPassword,
  login,
  createAccountPelamar,
  createAccountPerusahaan,
  createAccountAdmin,
  getUserLoggedIn,
  resetPassword,
};
