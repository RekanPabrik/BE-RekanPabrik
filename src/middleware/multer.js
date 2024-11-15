const multer = require("multer");

const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();

        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    console.log(file)
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' 
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

// const multer = require("multer");

// // Konfigurasi multer untuk menyimpan file sebagai buffer di memori
// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// module.exports = upload;