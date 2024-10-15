require("dotenv").config();
const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin")
const pelamarModel = require("../models/pelamar")
const perusahaanModel = require("../models/perusahaan")

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // cek tabel pelamar
        const [pelamarRows] = await pelamarModel.searchByEmail(email);
        if (pelamarRows.length > 0) {
            const pelamar = pelamarRows[0];
            const match = await bcrypt.compare(password, pelamar.password);
            if (match) {
                const token = jwt.sign({id: pelamar.id_pelamar, role: "pelamar"}, process.env.JWT_SECRET, {expiresIn: '2h'})
                return res.status(200).json({
                    massage: 'Login succesful',
                    token
                })
            }
        }

        const [adminRows] = await adminModel.searchByEmail(email);
        if (adminRows.length > 0) {
            const admin = adminRows[0];
            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                const token = jwt.sign({id: admin.id_admin, role: "admin"}, process.env.JWT_SECRET, {expiresIn: '2h'});
                return res.status(200).json({
                    massage: 'login succesful',
                    token
                })
            }
        }

        const [perusahaanRows] = await perusahaanModel.searchByEmail(email);
        if (perusahaanRows.length > 0) {
            const perusahaan = pelamarRows[0];
            const match = await bcrypt.compare(password, perusahaan.password);
            if (match) {
                const token = jwt.sign({id: perusahaan.id_perusahaan, role: "perusahaan"}, process.env.JWT_SECRET, {expiresIn: '2h'});
                return res.status(200).json({
                    massage: 'login succesful',
                    token
                })
            }
        }

        return res.status(400).json({
            message: 'Username or password is incorrect'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const registerPelamar = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try {
        const [pelamarRows] = await pelamarModel.searchByEmail(email);
        if (pelamarRows.length > 0) {
            return res.status(400).json({
                message: 'Email sudah terdaftar sebagai pelamar'
            });
        }

        await pelamarModel.addPelamar(email, password, 'pelamar', firstName, lastName);
        res.status(201).json({
            message: 'Akun berhasil dibuat',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
}

const registerPerusahaan = async (req, res) => {
    const {email, password, namaPerusahaan} = req.body;

    try {
        const [perusahaanRows] = await perusahaanModel.searchByEmail(email);
        if (perusahaanRows.length > 0) {
            return res.status(400).json({
                message: 'Email sudah terdaftar sebagai pelamar'
            });
        }

        await perusahaanModel.addPerusahaan(email, password, 'perusahaan', namaPerusahaan);
        res.status(201).json({
            message: 'Akun berhasil dibuat',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
}

const registerAdmin = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try {
        const [adminRows] = await adminModel.searchByEmail(email);
        if (adminRows.length > 0) {
            return res.status(400).json({
                message: 'Email sudah terdaftar sebagai pelamar'
            });
        }

        await adminModel.addAdmin(email, password, 'admin', firstName, lastName);
        res.status(201).json({
            message: 'Akun berhasil dibuat',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan server',
            error: error.message
        });
    }
}

module.exports = {
    login,
    registerAdmin,
    registerPelamar,
    registerPerusahaan
  };