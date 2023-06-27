const mongoose = require('mongoose');

const thingSchemaUser = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('Thing', thingSchemaUser);

const thingSchemaBook = mongoose.Schema({
    userId: {type: String , required: true},
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    livregenre: {type: String, required: true},
    ratings : 
        [ 
            {   
                userId: {type: String, required: true},     
                grade: {type: Number, required: true},
            }
        ],
    averageRating: {type: Number, required: true},
});

module.exports = mongoose.model('Thing', thingSchemaBook);
