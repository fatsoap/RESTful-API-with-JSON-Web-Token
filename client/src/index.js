import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import faker from 'faker';

import * as controller from './controller/controller';

import User from './User';
import Articles from './Articles';
import Article from './Article';


const App = () => {
    
    const [flashMessage, setFlashMessage] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [articles, setArticles] = React.useState([]);
    const [selectedArticle, setSelectedArticle] = React.useState(null);
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        setUser(controller.getUser());
    }, []);

    React.useEffect(() => {
        controller.getArticle(setArticles, selectedArticle, setComments);
    }, [flashMessage]);

    const login = (user) => {
        controller.login(user, setUser, setFlashMessage);
    }

    const logout = () => {
        controller.logout(setUser, setFlashMessage);  
    }

    const articlePost = (article) => {
        controller.postArticle(article, setFlashMessage);
    }

    const toArticle = (article) => {
        controller.selectArticle(article, setSelectedArticle, setComments);
    }

    const deletePost = (nanoID) => {
        controller.deleteArticle(nanoID, setFlashMessage, setSelectedArticle);
    }

    const addComment = (articleID) => {
        controller.postComment(articleID, user, setFlashMessage);
    }

    return(
        <div className="container" >
            <div className="row">
                {flashMessage[0]===""? null : <div className={`alert alert-${flashMessage[1]} mt-3`}>{flashMessage[0]}</div> }
            </div>
            <div className="row">
                <div className="col" style={{maxWidth: "400px"}}>
                    <User login={login} logout={logout} user={user} />
                </div>
                <div className="col">
                    <Articles articles={articles} user={user} articlePost={articlePost} toArticle={toArticle} deletePost={deletePost}  />
                </div>
                <div className="col">
                    { selectedArticle === null ? null : <Article article={selectedArticle} comments={comments} addComment={addComment} />}
                </div>
            </div>
        </div>
    );
}



ReactDOM.render(<App />, document.getElementById('root'));