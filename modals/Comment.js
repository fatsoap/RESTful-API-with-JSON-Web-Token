const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const { nanoid } = require('nanoid');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

CommentSchema = new mongoose.Schema({
    articleID:{
        type: String,
    },
    content:{
        type: String,
    },    
    author:{
        type: String,
    },
    date: {
        type: Date,
    },
    nanoID: {
        type: String,
    }
});

CommentSchema.pre('validate', function(){
    this.nanoID = nanoid(10);
    this.date = new Date();
});

module.exports = mongoose.model('comment', CommentSchema);