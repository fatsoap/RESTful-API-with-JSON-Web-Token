const jwt = require('jsonwebtoken');
const SECRET_JWT = process.env.SECRET_JWT;

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
    jwt.verify(req.body.token, SECRET_JWT, (err, decode) => {
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
    getJWT,
    checkJWT
}

