const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controllers/book');

router.get('/:id', bookCtrl.getOneBook);
router.get('/' , bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.bestRating);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, multer, bookCtrl.deleteBook);
router.post('/:id/rating', auth, multer, bookCtrl.singleRating);


module.exports = router;