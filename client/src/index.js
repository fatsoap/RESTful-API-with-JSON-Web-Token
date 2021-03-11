import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import faker from 'faker';

import User from './User';
import Articles from './Articles';
import Article from './Article';


const App = () => {
    
    const [token, setToken] = React.useState(null);
    const [flashMessage, setFlashMessage] = React.useState([]);
    const [user, setUser] = React.useState({
        name: "",
        avatar: "",
        description: "",
    });
    const [articles, setArticles] = React.useState([]);
    const [selectedArticle, setSelectedArticle] = React.useState(null);
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        if(localStorage.getItem('token') !== null){
            setToken(localStorage.getItem('token'));
        }
    }, []);

    const login = (user) => {
        setUser(user);
        axios.post('/api/user', { user })
            .then(res => {
                setToken(res.data.token);
                localStorage.setItem('token', token);
                setFlashMessage([res.data.flashMessage, res.data.type]);
       
            })
    }

    const logout = (user) => {
        setUser(user);
        localStorage.setItem('token', null);
        setToken(null);
        axios.post('/api/user?_method=delete')
            .then(res => {
                setFlashMessage([res.data.flashMessage, res.data.type]);
            })
    }

    useEffect(() => {
        axios.get('/api/article')
            .then(res => {
                if(res.data.type === 'success') {
                    setArticles(res.data.articles);
                }
            })
        if(selectedArticle !== null){
            axios.get(`/api/comment/${selectedArticle.nanoID}`)
                .then(res => {
                    setComments(res.data.comments);
                })
        }
    }, [flashMessage]);
        
    

    const articlePost = (article) => {
        axios.post('/api/article', { article, token })
            .then(res => {
                setFlashMessage([res.data.flashMessage, res.data.type]);
            })
    }

    const toArticle = (article) => {
        setSelectedArticle(article);
        axios.get(`/api/comment/${article.nanoID}`)
            .then(res => {
                console.log(res.data.comments);
                setComments(res.data.comments);
            })
    }

    const deletePost = (nanoID) => {
        axios.post('/api/article?_method=delete', { nanoID, token })
            .then(res => {
                setFlashMessage([res.data.flashMessage, res.data.type]);
                setSelectedArticle(null);
            })
    }

    const addComment = (articleID) => {
        var sentence = faker.lorem.sentence();
        var author = user.author;
        var like = ( Math.random() < 0.5 );
        var comment = { articleID, comment: sentence, author, like};
        axios.post('/api/comment', { comment, token } )
            .then(res => {
                setFlashMessage([res.data.flashMessage, res.data.type]);
            })
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