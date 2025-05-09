const sharp = require("sharp");

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024 })
      .jpeg({ quality: 70 })
      .toBuffer();

    req.file.buffer = compressedBuffer;

    next();
  } catch (error) {
    console.error("Compression error:", error);
    return res.status(500).send("Image compression failed");
  }
};

module.exports = compressImage;
