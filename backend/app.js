const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Book = require('./models/Book')

/*const bookRoutes = require('./routes/book');*/
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Bilou_Oleome:BwjE0eysupzWrdtw@cluster0.vrb3kzr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à mongodb réussie'))
  .catch(() => console.log('Connexion à mongodb échouée'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/books', (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/books', (req, res, next) => {
  const books = [
    {
      "id": "1",
      "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
      "title" : "Milwaukee Mission",
      "author": "Elder Cooper",
      "imageUrl" : "https://pixabay.com/get/g3e3fb522f712b11649a04a6435a5caf0362d28aa9a2df35fdf1f4459f54f9c8865a278fac1de79d9b890aa7c4060b5723ad96e95eacd3368f7fbef6a45e1dbf4c1df9f072b4ec69a7b2eca629e02ef71_640.jpg",
      "year" : 2021,
      "genre" : "Policier",
      "ratings" : [{
        "userId" : "1",
        "grade": 5
      },
      {
        "userId" : "1",
        "grade": 5
      },
      {
        "userId" : "clc4wj5lh3gyi0ak4eq4n8syr",
        "grade": 5
      },
      {
        "userId" : "1",
        "grade": 5
      }],
    "averageRating": 3
  },
  {
      "id": "2",
      "userId" : "clbxs3tag6jkr0biul4trzbrv",
      "title" : "Book for Esther",
      "author": "Alabaster",
      "imageUrl" : "https://pixabay.com/get/g3e3fb522f712b11649a04a6435a5caf0362d28aa9a2df35fdf1f4459f54f9c8865a278fac1de79d9b890aa7c4060b5723ad96e95eacd3368f7fbef6a45e1dbf4c1df9f072b4ec69a7b2eca629e02ef71_640.jpg",
      "year" : 2022,
      "genre" : "Paysage",
      "ratings" : [{
        "userId" : "clbxs3tag6jkr0biul4trzbrv",
        "grade": 4
      },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        },
        {
          "userId" : "1",
          "grade": 5
        }],
      "averageRating": 4.2
    }
  ];
  res.status(200).json(books);
  next();
});

/*app.use('/api/books', bookRoutes);*/
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;