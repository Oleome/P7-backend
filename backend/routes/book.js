const express = require('express');
const router = express.Router();

const Book = require('../models/Book');
const User = require('../models/User');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:id', (req, res, next) => {
    Book.findOne({
      _id: req.params.id
    }).then(
      (book) => {
        res.status(200).json(book);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });
router.get('/' +
  '', (req, res, next) => {
    Book.find()
        .then(
            (books) => {
                res.status(200).json(books);
            }
        ).catch(
            (error) => {
                res.status(400).json({
                    error: error
            });
        }
    );
});
router.get('/bestrating');
router.post('/', multer, (req, res, next) => {
    let bookObject = req.body === {} ? {} : JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(
        (error) => {
          res.status(400).json({
          error: error
        });
      }
    );
});
router.put('/:id');
router.delete('/:id');
router.post('/:id/rating');


module.exports = router;