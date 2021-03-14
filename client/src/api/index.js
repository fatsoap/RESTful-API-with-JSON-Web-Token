import axios from 'axios';

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use(req => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile').token)}`;
    }

    return req;
})

//login
export const login = (user) => API.post('/user', user);
//getArticle
export const getArticle = () => API.get('/article');
//postArticle
export const postArticle = (newPost) => API.post('/article', newPost);
//deleteArticle
export const deleteArticle = (nanoID) => API.delete('/article', nanoID);
//getComment
export const getComments = (nanoID) => API.get(`/comment/${nanoID}`);
//postComment
export const postComment = (comment) => API.post('/comment', comment);
