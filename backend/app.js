const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Bilou_Oleome:BwjE0eysupzWrdtw@cluster0.vrb3kzr.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à mongodb réussie'))
  .catch(() => console.log('Connexion à mongodb échouée'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/book', (req, res, next) => {
  const book = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      author: 'bilou',
      year: '2000',
      livregenre: 'polar',
      ratings : 
        [ 
            {   
                userId: 'qsomihvqios',  
                grade: 2,
            }
        ],
      averageRating: 2,
      userId: 'qsomihvqios'
    },
  ]
  res.status(200).json(book);
  next();
});

app.use(bodyParser.json());

app.use('/api/book', bookRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;