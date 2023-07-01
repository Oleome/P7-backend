const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    _id: String,
    userId: String,
    title: String, 
    author: String,
    imageUrl: String,
    year: Number,
    livregenre: String,
    ratings : 
        [ 
            {   
                userId: String,     
                grade: Number
            }
        ],
    averageRating: Number
});

module.exports = mongoose.model('Book', booksSchema);
