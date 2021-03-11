import React from 'react';
import faker from 'faker';

const User = ({ login, logout, user}) => {

    

    const onLogin = () => {
        var name = faker.name.firstName() + " " + faker.name.lastName();
        var avatar = faker.image.people() + "?random=" + Date.now();
        var description = faker.lorem.sentence();
        login({
            name,
            avatar,
            description,
        });
    }

    const onLogout = () => {
        logout({
            name: "",
            avatar: "",
            description: "",
        });
    }

    if(user.name !== "") {
        return(
            <div className="mt-3">
                <div className="card">
                    <img alt="user_img" src={user.avatar}></img>
                    <div className="card-body">
                        <div className="card-title">
                            {user.name}
                        </div>
                        <div className="card-text">
                            {user.description}
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={onLogout} >Logout</button>
                </div>
            </div>
        );
    } else {
        return(
            <div className="container">
                <button className="btn btn-primary" onClick={onLogin} >Login</button>
            </div>
        )
    }
}

export default User;