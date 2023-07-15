const multer = require('multer');
const sharp = require("sharp");

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload.single('image'), async (req, res, next) => {

  const { buffer } = req.file;
  const ref = Date.now() + '.' + 'webp';
  try {
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile("./images/" + ref);
    next()
  } catch(error) {
    res.status(401).json({ error });
  }
}



