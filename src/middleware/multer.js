const multer = require("multer");

const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();

        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
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
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;