import React, { useEffect } from 'react';
import axios from 'axios';

const Articles = ({ setFlashMessage }) => {
    const [articles, setArticles] = React.useState([{
        title: "test",
        author: "me",
        description: "AAAA",
        date: "2000/00/00",
        comment: "5",
        like: "3",
        dislike: "2",
    }]);

    // useEffect(() => {
    //     axios.get('/api/article')
    //         .then(res => {
    //             if(res.data.type === 'success') {
    //                 setArticles(res.data.articles);
    //             } else {
    //                 setFlashMessage(res.data.flashMessage);
    //             }
    //         })
    // }, []);



    const renderArticles = () => {
        return articles.map((article) => {
            return(
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            {article.title}
                        </div>
                        <div className="card-text">
                            {article.date}
                        </div>
                        <div className="card-text">
                            {article.author}
                        </div>
                        <div className="card-text">
                            {article.content}
                        </div>
                        <div className="card-text">
                            {article.comment}{article.like}{article.dislike}
                        </div>
                    </div>
                </div>
            );
        })
    }

    return(
        <div>
            <button className="btn btn-primary"></button>
            {renderArticles()}
        </div>
    );
}

export default Articles;