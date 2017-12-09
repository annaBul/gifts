var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var PersonModel =  require('../models').PersonModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');
   
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

router.post('/add_person',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
           if(user)
           {                         
                PersonModel.find({'name': req.body.name} , function (err, people) {
                    if (err) {
                        res.statusCode = 500;
                        log.error('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        if(people.length === 0)
                        {               
                            var newPerson = {
                                name: req.body.name,
                                imageUrl:req.body.imageUrl,
                                birthDay: req.body.birthDay
                            };
                            console.log(newPerson);
                            PersonModel.create(newPerson, function(err, item) {
                                if(!err){
                                    console.log("3");
                                    user.people.push(item._id);
                                    user.save();
                                    return res.send({
                                        success: true,
                                        person: newPerson});
                                }
                                
                            });
                        } else {
                            return res.send({error: 'Project exists!'});
                        }          
                    }
                });

           } else {
               return res.send({error: "User don't found!"});
           }          
       }
   } )(req, res, next)  
 });



module.exports = router;