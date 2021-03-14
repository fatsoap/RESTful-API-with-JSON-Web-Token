const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT;

function getUser(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, SECRET_JWT, (err, decode) => {
        if(err) {
            res.send({ user: decode, flashMessage: "token wrong!", type: "danger" });
            return
        } else {
            req.user = decode;
            next();
        }
    })
}

function getJWT(req, res, next){
    var data = req.body;
    jwt.sign(data, SECRET_JWT, { expiresIn: '10min'}, (err, token) => {
        if(err) {
            res.send({ token: {}, flashMessage: "jwt generate fail", type: "danger" });
            return;
        } else {
            req.token = token;
            next();
        }
    })
}

function checkJWT(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET_JWT, (err, decode) => {
        if(err) {
            res.send({  flashMessage: "token validate fail", type: "danger" });
            return;
        } else {
            // if (decode.userID === postID).then(do something)
            next();
        }
    })
}

module.exports = {
    getUser,
    getJWT,
    checkJWT
}

