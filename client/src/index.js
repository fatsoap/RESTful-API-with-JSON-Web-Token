import React from 'react';
import ReactDOM from 'react-dom';

import * as controller from './controller/controller';

import User from './components/User';
import Articles from './components/Articles';
import Article from './components/Article';


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
    }, [flashMessage, selectedArticle]);

    const login = () => {
        controller.login(setUser, setFlashMessage);
    }

    const logout = () => {
        controller.logout(setUser, setFlashMessage);  
    }

    const articlePost = () => {
        controller.postArticle(user, setFlashMessage);
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