var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');

router.post('/registration', function(req, res, next) {
    if(!req.body.username || !req.body.password || !req.body.email){
        return res.send({ error: 'Incorrected data' });
    }
    UserModel.find({$or:[ {'username': req.body.username}, {'email': req.body.email}]} , function (err, users) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(users.length === 0)
            {                   
                var user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                };
                       
                UserModel.create(user, function(err, item) {
                    if(!err){
                        return res.send({
                            success: true,
                            user: user});
                    }                    
                });
            } else {
                return res.send({error: 'Такой пользователь уже есть!'});
            }          
        }
    });
});

module.exports = router;
