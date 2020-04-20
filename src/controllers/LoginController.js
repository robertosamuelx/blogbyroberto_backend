const jwt = require('jsonwebtoken');
const credencial = {login: process.env.LOGIN_USER,password: process.env.PASSWORD_USER};


module.exports = {
    login(req,res){
        if(req.body.login == credencial.login && req.body.password == credencial.password){
            const token = jwt.sign(String(req.body),'shhhhh');
            return res.status(200).json({authorization:token});
        }
        else {
            return res.status(403).json({response:'Login failed'});
        }
    }
}