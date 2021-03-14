if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

//restful api
const methodOverride = require('method-override');

//connect mongodb
const mongoose = require('mongoose');

//import middleware & controller
const { getUser, checkJWT, getJWT } = require('./middleware/index');
const controller = require('./controllers/index');


app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(methodOverride('_method'));

const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

//getUser
app.get('/api/user', getUser, controller.getUser);

//login
app.post('/api/user', getJWT, controller.login);

//logout
app.delete('/api/user', controller.logout);

//get articles
app.get('/api/article',  controller.getArticles);

//post article
app.post('/api/article', checkJWT, controller.postArticle);

//delete article
app.delete('/api/article', checkJWT, controller.deleteArticle);

//get commments
app.get('/api/comment/:id', controller.getComments);

//post comment
app.post('/api/comment', checkJWT, controller.postComment);

//delete comment
app.delete('/api/comment', checkJWT, controller.deleteComment);

//react frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.listen(PORT, () => console.log(`Server start on ${PORT}`));