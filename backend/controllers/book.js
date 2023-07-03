const Book = require('../models/Book');
const Routes = require('../routes/book');

app.use('/api/books', Routes);

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.books);
  delete bookObject._id;
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  book.save()
    .then(
      console.log('ok')
      /*() => {
        if(res.status === 200) {
          res.status(200).json({
            message: 'Post saved successfully!'
          });
        } else {
          console.log(res)
        }
      }*/
      
    ).catch(
      console.log('not ok')
      /*(error) => {
        res.status(400).json({
          error: error
        });
      }*/
    );
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

delete bookObject._userId;
Book.findOne({_id: req.params.id})
  .then((book) => {
    if (book.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized'});
    } else {
        Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));
        }
    })
  .catch((error) => {
      res.status(400).json({ error });
  });
  next();
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id})
  .then(book => {
      if (book.userId != req.auth.userId) {
          res.status(401).json({message: 'Not authorized'});
      } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
  .catch( error => {
      res.status(500).json({ error });
  });
  next();
};

exports.bestRating = (req, res, next) => {
  next();
};

exports.singleRating = (req, res, next) => {
  next();
};

