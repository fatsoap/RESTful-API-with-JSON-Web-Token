import React from 'react';

const Articles = ({ articlePost, user, articles, toArticle, deletePost }) => {
    
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
                <button className="btn btn-primary" onClick={articlePost}>New Post</button>
            </div>
            <div className="mb-3">
                {renderArticles()}
            </div>
            
        </div>
    );
}

export default Articles;