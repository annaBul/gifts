var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var ProjectModel =  require('../models').ProjectModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');

router.get('/admin/users',function(req, res, next) { 
    passport.authenticate('jwt', function (err, user) {
        if(err){
            return res.send({error: "Some error!"});
        }
        if (user.role ==='Admin') {

           UserModel.find({} , function (err, users) {
                if (err) {
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                } else {
                    return res.send({
                        users: users});
                }
                
            });
      } else {
        return res.send({error: "No access"});
      }
    } )(req, res, next)  
  });


router.post('/admin/user/blocked',function(req, res, next) {    
     passport.authenticate('jwt', function (err, user) {         
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(user)
            {   
                if (user.role ==='Admin') {
                    UserModel.findOne({"_id": req.body.userId} , function (err, modifiableUser) {
                        if (err) {
                            res.statusCode = 500;
                            console.log('Internal error(%d): %s',res.statusCode,err.message);
                            return res.send({ error: 'Server error' });
                        } else {   
                            modifiableUser.blocked = !modifiableUser.blocked;             
                            modifiableUser.save();
                            return res.send({
                                success: true});
                        }
                    });
                }

            } else {
                return res.send({error: "User don't found!"});
            }          
        }
    } )(req, res, next)  
  });


  router.post('/admin/user/role',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
           if(user)
           {   
               if (user.role ==='Admin') {
                   UserModel.findOne({"_id": req.body.user.id} , function (err, modifiableUser) {
                       
                       if (err) {
                           res.statusCode = 500;
                           console.log('Internal error(%d): %s',res.statusCode,err.message);
                           return res.send({ error: 'Server error' });
                       } else {   
                           modifiableUser.role = req.body.user.newRole;             
                           modifiableUser.save();
                           return res.send({
                               success: true});
                       }
                   });
               }

           } else {
               return res.send({error: "User don't found!"});
           }          
       }
   } )(req, res, next)  
 });



module.exports = router;