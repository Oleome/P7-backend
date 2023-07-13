const multer = require('multer');
const sharp = require("sharp");


/*const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};*/


const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: async (req, file, callback) => {
  /*  const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];*/
    const { buffer, originalname } = req.file;
    const timestamp = new Date().toISOString();
    const ref = `${timestamp}-${originalname}.webp`;
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile("./images/" + ref);
  }
});

module.exports = multer({ storage: storage }).single('image');