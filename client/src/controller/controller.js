import * as API from '../api/index';
import faker from 'faker';


export const getUser = () => {
    if(localStorage.getItem('profile')){
        var oldUser = JSON.parse(localStorage.getItem('profile'));
        return oldUser;
    } else {
        return null;
    }
}

export const login = async (setUser, setFlashMessage ) => {
    var name = faker.name.firstName() + " " + faker.name.lastName();
    var avatar = faker.image.people() + "?random=" + Date.now();
    var description = faker.lorem.sentence();
    var user = {
        name,
        avatar,
        description,
    };
    try {
        const { data } = await API.login(user);
        if(data.type === 'success'){
            setUser({ user, token: data.token });
        }
       
        localStorage.setItem('profile', JSON.stringify({ user, token: data.token }));

        setFlashMessage([data.flashMessage, data.type]);
        
    } catch(err) {
        console.log(err);
    }
}

export const logout = (setUser, setFlashMessage) => {
    setUser(null);
    localStorage.removeItem('profile');
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

export const postArticle = async (user, setFlashMessage) => {
    if(!user){
        setFlashMessage(["not login yet", "danger"]);
        return;
    }
    try {
        var article = {
            "title": faker.lorem.sentence(),
            "author": user.user.name,
            "description": faker.lorem.paragraph(),
            "content": faker.lorem.paragraphs(),
            "comment": 0,
            "like": 0,
            "dislike": 0, 
        }
        const { data } = await API.postArticle(article);
        setFlashMessage([data.flashMessage, data.type]);
    } catch(err) {
        console.log(err);
    }
}

export const selectArticle = async (article, setSelectedArticle, setComments) => {
    try {
        const { data } = await API.getComments(article.nanoID);
        setSelectedArticle(article);
        setComments(data.comments);
    } catch(err) {
        console.log(err);
    }
    
}

export const deleteArticle = async (nanoID, setFlashMessage, setSelectedArticle) => {
    try {
        const { data } = await API.deleteArticle(nanoID);
        setFlashMessage([data.flashMessage, data.type]);
        setSelectedArticle(null);
    } catch(err) {
        console.log(err);
    }
    
}

export const postComment = async (articleID, user, setFlashMessage) => {
    if(!user){
        setFlashMessage(["not login yet", "danger"]);
        return;
    }
    try {
        var sentence = faker.lorem.sentence();
        var author = user.user.name;
        var like = ( Math.random() < 0.5 );
        var comment = { articleID, comment: sentence, author, like};
        const { data } = await API.postComment(comment);
        setFlashMessage([data.flashMessage, data.type]);
    } catch(err) {
        console.log(err);
    }
}
