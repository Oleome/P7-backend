const express = require('express');
const auth = require('auth');
const router = express.Router();

const bookCtrl = require('../controllers/book');

router.post('/', auth, bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/' , bookCtrl.getAllBooks);

module.exports = router;