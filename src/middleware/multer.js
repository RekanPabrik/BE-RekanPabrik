const multer = require("multer");

// Konfigurasi multer untuk menyimpan file sebagai buffer di memori
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
