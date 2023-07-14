const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const compressImg = async (req, res, next) => {
  try {
    const { buffer, filename } = req.file;
    const ref = `${filename}.webp`;

    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile(`./images/${ref}`);

    req.file.filename = ref;
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

module.exports = { upload, compressImg };