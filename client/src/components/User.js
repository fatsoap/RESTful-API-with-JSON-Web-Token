import React from 'react';

const User = ({ login, logout, user}) => {

    if(user) {
        return(
            <div className="mt-3">
                <div className="card">
                    <img alt="user_img" src={user.user.avatar}></img>
                    <div className="card-body">
                        <div className="card-title">
                            {user.user.name}
                        </div>
                        <div className="card-text">
                            {user.user.description}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={logout} >Logout</button>
                </div>
            </div>
        );
    } else {
        return(
            <div className="container">
                <button className="btn btn-primary" onClick={login} >Login</button>
            </div>
        )
    }
}

export default User;