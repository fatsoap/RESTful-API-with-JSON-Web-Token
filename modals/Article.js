const mongoose = require('mongoose');
const DATABASE_URI = process.env.DATABASE_URI;
const { nanoid } = require('nanoid');

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

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
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    nanoID: {
        type: String,
    },
    comment: {
        type: Number,
    },
    like: {
        type: Number,
    },
    dislike: {
        type: Number,
    }
});

ArticleSchema.pre('validate', function(){
    this.nanoID = nanoid(10);
    this.date = new Date();
});


module.exports = mongoose.model('jwt_mern_article', ArticleSchema);