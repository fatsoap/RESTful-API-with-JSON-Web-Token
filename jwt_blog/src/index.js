import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import User from './User';
import Articles from './Articles';

const App = () => {
    
    const [jwt, setJwt] = React.useState("");
    const [flashMessage, setFlashMessage] = React.useState("");


    const login = (user) => {
        //setUser
        //setJwt
        axios.post('/api/user', { user })
            .then(res => {
                if(res.data.type === "success") {
                    setJwt(res.data.token);
                    setFlashMessage("");
                } else {
                    setJwt({});
                    setFlashMessage(res.data.flashMessage);
                }
            })
    }

    return(
        <div className="container" >
            <User login={login} />
            <Articles setFlashMessage={setFlashMessage} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));