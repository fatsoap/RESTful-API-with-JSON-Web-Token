const mongoose = require('mongoose');
//const DATABASE_URI = process.env.DATABASE_URI;
const { nanoid } = require('nanoid');

//mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

CommentSchema = new mongoose.Schema({
    articleID:{
        type: String,
    },
    comment:{
        type: String,
    },    
    author:{
        type: String,
    },
    date: {
        type: Date,
    },
    like: {
        type: Boolean,
    },
    nanoID: {
        type: String,
    }
});

CommentSchema.pre('validate', function(){
    this.nanoID = nanoid(10);
    this.date = new Date();
});

module.exports = mongoose.model('RESTful_api_comment', CommentSchema);