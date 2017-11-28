var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config');
var UserModel =  require('../models').UserModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');

router.post('/login' , function(req, res, next) {
    if(!req.body.password || !req.body.email){
        return res.send({ error: 'Incorrected data' });
    }
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.statusCode = 500;
            console.log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } 

        if(!user){ 
            return res.send({error: 'Такого пользователя нет'});
        } else {  
            if(user.blocked){
                return res.send({error: 'Вы заблокированы и не можете войти в свой аккаунт.'});
            } else   
            {                 
                const payload = {
                    id: user.id               
                };
                const token = jwt.sign(payload, config.security.secret); 
                return res.send({username: user.username, id: user.id, role: user.role, blocked: user.blocked,token: 'JWT ' + token});
            }
        }  
      })(req, res, next);
});

router.post('/logout' , function(req, res, next) {
    if(!req.body.token || !req.body.username){
        return res.send({ error: 'Incorrected data' });
    }
    req.logout();
    return res.send({success: true});

});

module.exports = router;
