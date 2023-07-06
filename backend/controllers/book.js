const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
    let bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch((error) => {res.status(400).json({ error: error })});
};

exports.modifyBook = (req, res, next) => {
    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => { res.status(200).json(book) })
        .catch((error) => { res.status(404).json({ error: error });
    });
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {res.status(200).json(books)})
        .catch((error) => {res.status(400).json({ error: error })});
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
        .then((book) => {
            const oldRatings = book.ratings;
            const newRatings = oldRatings.push(req.params.rating)
            console.log('rating', req.params.rating)
            book.ratings = newRatings;
            console.log(oldRatings, newRatings, book)
            Book.updateOne({ _id: req.params.id }, { book, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre note a bien été enregistrée !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }))
};
