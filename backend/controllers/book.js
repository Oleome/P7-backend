const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      author: req.body.author,
      year: req.body.year,
      livregenre: req.body.livregenre,
      ratings: req.body.ratings,
      averageRating: req.body.averageRating,
      userId: req.body.userId
    });
    book.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

exports.modifyBook = (req, res, next) => {
    const book = new Book({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      author: req.body.author,
      year: req.body.year,
      livregenre: req.body.livregenre,
      ratings: req.body.ratings,
      averageRating: req.body.averageRating,
      userId: req.body.userId
    });
    Book.updateOne({_id: req.params.id}, book).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.getAllBooks = (req, res, next) => {
    Book.find().then(
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
}