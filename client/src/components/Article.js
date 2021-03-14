import React from 'react';

const Article = ({ comments, article, addComment }) => {

    const renderComments = () => {
        return comments.map((comment) => {
            return(
                <div key={comment.nanoID} className="card">
                    <div className="card-body">
                        <div className="card-title">Author : {comment.author}</div>
                        <div className="card-text">Date: {comment.date}</div>
                        {comment.like ? <div className="card-text">LIKE</div> : <div className="card-text">DISLIKE</div>}
                        <div className="card-text">Comment : {comment.comment}</div>                        
                    </div>
                </div>
            );
        })
    }

    return(
        <div className="">
            <h1 className="mt-3 mb-3" >Selected Article</h1>
            <div className="card">
                <div className="card-body">
                    <div className="card-title">Title : {article.title}</div>
                    <div className="card-text mt-1">Date : {article.date}</div>
                    <div className="card-text mt-1">Author : {article.author}</div>
                    <div className="card-text mt-3">Content : {article.content}</div>
                    <div className="card-text"></div>
                    <div className="btn btn-success mt-3 mb-3" onClick={()=>{ addComment(article.nanoID) }}>Add comment</div>
                    {renderComments()}
                </div>
            </div>

        </div>
    );
}

export default Article;