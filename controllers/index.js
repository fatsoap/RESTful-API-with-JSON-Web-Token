const Article = require('../modals/Article');
const Comment = require('../modals/Comment');


//getUser
function getUser (req, res) {
    res.send({ user: req.user, flashMessage: "get User done!", type: "success" });
};

//login
function login  (req, res) {
    res.send({ token: req.token, flashMessage: "login success", type: "success"  });
};

//logout
function logout  (req, res) {
    //do nothing
    res.send({ flashMessage: "logout success", type: "success" });
};

//get articles
async function getArticles  (req, res) {
    try{
        var articles = await Article.find().sort({'date': -1});
        res.send({ articles: articles, flashMessage: "get articles success", type: "success" });
    } catch(err) {

        res.send({  flashMessage: "db get articles fail", type: "danger" });
    }
};

//post article
async function  postArticle (req, res) {
    try{
        var article = new Article(req.body);
        await article.save();
        res.send({ flashMessage: "post article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "post article fail", type: "danger" });
    }
};

//delete article
async function  deleteArticle (req, res) {
    try{       
        var articleID = req.body.nanoID;
        await Article.findOneAndDelete({ nanoID: articleID });
        await Comment.deleteMany({ articleID: articleID });
        res.send({ flashMessage: "delete article success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "delete article fail", type: "danger" });
    }
};

//get commments
async function  getComments (req, res) {
    try{
        var comments = await Comment.find({ articleID: req.params.id }).sort({ 'date': -1 });
        res.send({ comments: comments, flashMessage: "get comments success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "db get comments fail", type: "danger" });
    }
};

//post comment
async function  postComment (req, res) {
    try{
        var comment = new Comment(req.body);
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
};

//delete comment
async function  deleteComment (req, res) {
    try{
        var commentID = req.body.id;
        //await article.deleteById({ nanoID: commentID });
        res.send({ flashMessage: "delete comment success", type: "success" });
    } catch(err) {
        res.send({ flashMessage: "delete comment fail", type: "danger" });
    }
};

module.exports = {
    getUser,
    login,
    logout,
    getArticles,
    postArticle,
    deleteArticle,
    getComments,
    postComment,
    deleteComment
}
