const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const { nanoid } = require('nanoid');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
    },
    content: {
        type: String,
    },
    nanoID: {
        type: String,
    }
});

ArticleSchema.pre('validate', function(){
    this.nanoID = nanoid(10);
    this.date = new Date();
});


module.exports = mongoose.model('article', ArticleSchema);