import * as API from '../api/index';
import faker from 'faker';


export const getUser = () => {
    if(localStorage.getItem('profile')){
        var oldUser = localStorage.getItem('profile');
        return oldUser;
    } else {
        return null;
    }
}

export const login = async (user, setUser, setFlashMessage ) => {
    try {
        const { data } = await API.login(user);
        if(data.type === 'success'){
            setUser({ user, token: data.token });
        }
        localStorage.setItem('profile', { user, token: data.token });
        setFlashMessage([data.flashMessage, data.type]);
        
    } catch(err) {
        console.log(err);
    }
}

export const logout = (setUser, setFlashMessage) => {
    setUser(null);
    localStorage.setItem('profile', null);
    setFlashMessage(["logout success", "success"]);
}

export const getArticle = async (setArticles, selectedArticle, setComments) => {
    try {
        const { data } = await API.getArticle();
        if(data.type === 'success') {
            setArticles(data.articles);
        }
        if(selectedArticle !== null){
            const { data } = await API.getComments(selectedArticle.nanoID);
            setComments(data.comments);
        }
    } catch (err) {
        console.log(err);
    }
        
}

export const postArticle = async (article, setFlashMessage) => {
    try {
        const { data } = await API.postArticle('/article', article);
        setFlashMessage([data.flashMessage, data.type]);
    } catch(err) {
        console.log(err);
    }
}

export const selectArticle = async (article, setSelectedArticle, setComments) => {
    try {
        const { data } = await API.getComments('/comment', article.nanoID);
        setComments(data.comments);
    } catch(err) {
        console.log(err);
    }
    
}

export const deleteArticle = async (nanoID, setFlashMessage, setSelectedArticle) => {
    try {
        const { data } = await API.deleteArticle('/article?_method=delete', nanoID);
        setFlashMessage([data.flashMessage, data.type]);
        setSelectedArticle(null);
    } catch(err) {
        console.log(err);
    }
    
}

export const postComment = async (articleID, user, setFlashMessage) => {
    try {
        var sentence = faker.lorem.sentence();
        var author = user.name;
        var like = ( Math.random() < 0.5 );
        var comment = { articleID, comment: sentence, author, like};
        const { data } = await API.postComment('/comment', comment)
        setFlashMessage([data.flashMessage, data.type]);
    } catch(err) {
        console.log(err);
    }
}
