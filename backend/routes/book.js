const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const compress = require('../middleware/compress-img')

router.get('/bestrating', bookCtrl.bestRating);
router.get('/', bookCtrl.getAllBooks);
router.post('/', auth, multer, compress, bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteOneBook);
router.post('/:id/rating', auth, bookCtrl.addRating);

module.exports = router;