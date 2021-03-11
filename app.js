if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const JWT = require('jsonwebtoken');
const methodOverride = require('method-override');
const { checkJWT, getJWT } = require('./controllers/app_controller')

const Article = require('./modals/Article');
const Comment = require('./modals/Comment');

app.use(express.static(path.join(__dirname, "./build")));
app.use(express.json());
app.use(methodOverride('_method'));

//login
app.post('/api/user', getJWT, (req, res) => {
    res.send({ token: req.token, flashMessage: "login success", type: "success"  });
});

//logout
app.delete('/api/user', (req, res) => {
    //do nothing
    res.send({ flashMessage: "logout success", type: "success" });
});

//get articles
app.get('/api/article',  async (req ,res) => {
    try{
        var articles = await Article.find().sort({'date': -1});
        res.send({ articles: articles, flashMessage: "get articles success", type: "success" });
    } catch(err) {

        res.send({  flashMessage: "db get articles fail", type: "danger" });
    }
});

//post article
app.post('/api/article', checkJWT, async (req, res) => {
    try{
        var article = new Article(req.body.article);
        await article.save();
        res.send({ flashMessage: "post article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "post article fail", type: "danger" });
    }
});

//delete article
app.delete('/api/article', checkJWT, async (req, res) => {
    try{
        var articleID = req.body.nanoID;
        await Article.findOneAndDelete({ nanoID: articleID });
        await Comment.findOneAndDelete({ articleID: articleID });
        res.send({ flashMessage: "delete article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "delete article fail", type: "danger" });
    }
});

//get commments
app.get('/api/comment/:id', async (req ,res) => {
    try{
        var comments = await Comment.find({ articleID: req.params.id }).sort({ 'date': -1 });
        res.send({ comments: comments, flashMessage: "get comments success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "db get comments fail", type: "danger" });
    }
});

//post comment
app.post('/api/comment', checkJWT, async (req, res) => {
    try{
        var comment = new Comment(req.body.comment);
        await comment.save();
        var increase = comment.like? 'like':'dislike';
        if(comment.like) {
            var article = await Article.findOneAndUpdate({ nanoID : comment.articleID }, {$inc: { 'comment': 1, 'like': 1 } } );
        } else {
            var article = await Article.findOneAndUpdate({ nanoID : comment.articleID }, {$inc: { 'comment': 1, 'dislike': 1 } } );
        }        
        res.send({ flashMessage: "post comment success", type: "success" });
    } catch(err) {
        console.log(err);
        res.send({ flashMessage: "post comment fail", type: "danger" });
    }
});

//delete comment
app.delete('/api/comment', checkJWT, (req, res) => {
    try{
        var commentID = req.body.id;
        //await article.deleteById({ nanoID: commentID });
        res.send({ flashMessage: "delete comment success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "delete comment fail", type: "danger" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
})

app.listen(PORT, () => console.log(`Server start on ${PORT}`));