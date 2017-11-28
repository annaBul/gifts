var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var ProjectModel =  require('../models').ProjectModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');
   

router.get('/user', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if(err){
           return res.send({error: "Some error!"});
        }
        if (user) {           
            var userInfo = {
                username: user.username,
                id: user.id,
                imageUrl: user.imageUrl,
                people: user.people,
                favorites: user.favorites,
            }
            
            return res.send({
                success: true,
                user: userInfo});

        } else {
            return res.send({error: "User don't found!"});
        }
    });
    
});


router.get('/user/settings',function(req, res, next) {    
     passport.authenticate('jwt', function (err, user) {
         if(err){
            return res.send({error: "Some error!"});
         }
        if (user) {
        var userSettings ={    
            username: user.username,
            id: user.id,
            email: user.email,
            imageUrl: user.imageUrl,
            password: user.password,
        }
        return res.send({
            success: true,
            user: userSettings});
      } else {
        return res.send({error: "No access"});
      }
    } )(req, res, next)  
  });


router.post('/user/settings',function(req, res, next) {    
     passport.authenticate('jwt', function (err, user) {         
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(user)
            {   
                user.username = req.body.username;
                user.email= req.body.email;
                user.imageUrl = req.body.imageUrl;
                if(req.body.password){
                    user.password = req.body.password;
                }
               
                user.save();
                return res.send({
                    success: true});

            } else {
                return res.send({error: "User don't found!"});
            }          
        }
    } )(req, res, next)  
  });



router.get('/user/favorites', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if(err){
           return res.send({error: "Some error!"});
        }
        if (!user) {  
            return res.send({error: "User don't found!"});
        }      

         
        UserModel.findById({'_id': user.id }).populate('favorites').
        exec(function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
            
            return res.send({
                success: true,
                favorites: user.favorites,
            });
        }); 
        
    });
    
});

router.get('/user/people', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if(err){
           return res.send({error: "Some error!"});
        }
        if (!user) {  
            return res.send({error: "User don't found!"});
        }      

         
        UserModel.findById({'_id': user.id }).populate('people').
        exec(function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
            
            return res.send({
                success: true,
                people: user.people,
            });
        }); 
        
    });
    
});


router.get('/person/:id', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if(err){
           return res.send({error: "Some error!"});
        }
        if (!user) {  
            return res.send({error: "User don't found!"});
        }      

         
        PeopleModel.findById({'_id': user.id }).populate(['gifts', 'holidays']).
        exec(function (err, user) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
            
            return res.send({
                success: true,
                people: user.people,
            });
        }); 
        
    });
    
});


module.exports = router;