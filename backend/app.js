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

app.use(bodyParser.json());

app.use('/api/BOOK', bookRoutes);
app.use('/api/SIGN_IN', userRoutes);




module.exports = app;