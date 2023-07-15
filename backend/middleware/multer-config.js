const multer = require('multer');

/* const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '.' + 'webp');
  }
}); */
const storage = multer.memoryStorage();

module.exports = multer({storage: storage}).single('image');

