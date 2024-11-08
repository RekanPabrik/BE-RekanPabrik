const multer = require("multer");

// Konfigurasi multer untuk menyimpan file sebagai buffer di memori
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        const errMsg = 'Hanya boleh upload gambar (jpeg, jpg, png)';
        req.fileValidationError = errMsg;
        return cb(new Error(errMsg), false);
    }
};
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 

});

module.exports = upload;
