const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
    let bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    book.averageRating = book.calculateAverageRating();
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch((error) => {res.status(400).json({ error })});
};

exports.modifyBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => { res.status(200).json(book) })
        .catch((error) => { res.status(404).json({ error });
    });
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {res.status(200).json(books)})
        .catch((error) => {res.status(400).json({ error })});
};

exports.deleteOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if(book.userId != req.auth.userId) {
            res.status(401).json({ message: 'Non autorisé !' });
            } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Livre supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.addRating = (req, res, next) => {  
    Book.findOne({ _id: req.params.id })
        .then(book => {
            const hasRated = book.ratings.some((rating) => rating.userId.toString() === req.body.userId);
            if (hasRated) {
                return res.status(401).json({ message: 'Vous avez déjà donné une note !' });
            } else {
                book.ratings.push({ userId: req.body.userId, grade: req.body.rating });
                book.averageRating = book.calculateAverageRating();
                return book.save()
                    .then(updatedBook => {
                        res.status(200).json(updatedBook);
                    })
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }));
};



exports.bestRating = (req, res, next) => {
    const bestRatingBooks = [];
  
    Book.find()
        .sort({ averageRating: -1 }) 
        .limit(3)
            .then(books => {
                bestRatingBooks.push(...books);
                res.status(200).json(bestRatingBooks);
            })
            .catch(error => res.status(400).json({ error }));
};