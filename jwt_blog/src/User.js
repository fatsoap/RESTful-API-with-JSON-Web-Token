import React from 'react';
import faker from 'faker';

const User = ({ login }) => {

    const [user, setUser] = React.useState({
        name: "",
        avatar: "",
        description: "",
    });

    const onLogin = () => {
        var name = faker.name.firstName() + " " + faker.name.lastName();
        var avatar = faker.image.people();
        var description = faker.lorem.sentence();
        setUser({
            name,
            avatar,
            description,
        });
        //login(user);
    }

    const onLogout = () => {
        setUser({
            name: "",
            avatar: "",
            description: "",
        });
    }

    if(user.name !== "") {
        return(
            <div className="container">
                <div className="card">
                    <img alt="user_img" style={{ height: "100px" }} src={user.avatar}></img>
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