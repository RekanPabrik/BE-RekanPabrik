const melamarPekerjaanModel = require('../models/melamarPekerjaan');

const melamarPekerjaan = async (req, res) => {
    const {idPostPekerjaan, idPelamar} = req.body;
    const status = "diproses";
    const date = new Date();

    try {
        await melamarPekerjaanModel.reqMelamarPekerjaan(idPostPekerjaan, idPelamar, date, status);
        res.status(200).json({ message: "Lamaran terkirim" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateStatus = async (req, res) => {
    const {idPostPekerjaan} = req.params;
    const {status} = req.body;

    try {
        await melamarPekerjaanModel.updateStatus(status, idPostPekerjaan);
        res.status(200).json({ 
            message: "status di ubah", 
            Status : status
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getDataMelamarPekarjaan = async (req, res) => {
    try {
        const [data] = await melamarPekerjaanModel.getDataMelamarPekarjaan();
        if (data.length > 0) {
            res.json({
              massage: "menampilkan data melamar pekerjaan",
              data: data,
            });
          } else {
            res.json({
              massage: "Tidak ada data melamar pekerjaan",
            });
          }
    } catch (error) {
        console.error("Error Details:", error);
        res.status(500).json({
            massage: "error",
            serverMassage: error,
          });
    }
}

module.exports = {
    melamarPekerjaan,
    updateStatus,
    getDataMelamarPekarjaan
}