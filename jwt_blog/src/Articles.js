import React from 'react';
import faker from 'faker';

const Articles = ({ articlePost, user, articles, toArticle, deletePost }) => {
    

    

    const addPost = () => {
        var article = {
            "title": faker.lorem.sentence(),
            "author":  user.name,
            "description": faker.lorem.paragraph(),
            "content": faker.lorem.paragraphs(),
            "comment": 0,
            "like": 0,
            "dislike": 0, 
        }
        articlePost(article);
    }

    const renderArticles = () => {
        return articles.map((article) => {
            return(
                <div key={article.nanoID} className="card">
                    <div className="card-body">
                        <div className="card-title">
                            Title : {article.title}
                        </div>
                        <div className="card-text">
                            Date : {article.date}
                        </div>
                        <div className="card-text">
                            Author : {article.author}
                        </div>
                        <div className="card-text">
                            Description : {article.description}
                        </div>
                        <div className="card-text">
                            Comment : {article.comment} Like : {article.like} Dislike : {article.dislike}
                        </div>
                        <div className="btn btn-success mt-3"  onClick={()=>{toArticle(article)} } > Read </div>
                        <div className="btn btn-danger mt-3"  onClick={()=>{deletePost(article.nanoID)}} > Delete </div>
                    </div>
                </div>
            );
        })
    }

    return(
        <div className="mt-3">
            <div className="mb-3">
                <button className="btn btn-primary" onClick={addPost}>New Post</button>
            </div>
            <div className="mb-3">
                {renderArticles()}
            </div>
            
        </div>
    );
}

export default Articles;