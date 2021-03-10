if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const JWT = require('jsonwebtoken');
const methodOverride = require('method-override');

app.use(express.json());
app.use(methodOverride('_method'));

//login
app.post('/api/user', getJWT, (req, res) => {
    res.send({ token: req.token, type: "success"  });
});

//logout
app.delete('/api/user', (req, res) => {
    //do nothing
    res.send("nothing");
});

//get articles
app.get('/api/article', checkJWT, async (req ,res) => {
    try{
        var articles = await Article.find();
        res.send({ articles: articles, type: "success" });
    } catch(err) {
        res.send({  flashMessage: "db get articles fail", type: "danger" });
    }
});

//post article
app.post('/api/article', checkJWT, async (req, res) => {
    try{
        var article = new Article(req.body);
        await article.save();
        res.send({ flashMessage: "post article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "post article fail", type: "danger" });
    }
});

//delete article
app.delete('/api/article', checkJWT, (req, res) => {
    try{
        var articleID = req.body.id;
        //await article.deleteById({ nanoID: articleID });
        res.send({ flashMessage: "delete article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "delete article fail", type: "danger" });
    }
});

//get commments
app.get('/api/comment', checkJWT, (req ,res) => {
    try{
        var comments = await Comment.find({ articleId: articleId });
        res.send({ comments: comments, type: "success" });
    } catch(err) {
        res.send({ flashMessage: "db get comments fail", type: "danger" });
    }
});

//post comment
app.post('/api/comment', checkJWT, (req, res) => {
    try{
        var comment = new Comment(req.body);
        await comment.save();
        res.send({ flashMessage: "post comment success", type: "success" });
    } catch(err) {
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

// app.get('*', (req, res) => {
//     res.sendFile('./build/index.html');
// })

app.listen(PORT, () => console.log(`Server start on ${PORT}`));