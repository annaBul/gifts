var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var UserModel =  require('../models').UserModel;
var PersonModel =  require('../models').PersonModel;
var HolidayModel =  require('../models').HolidayModel;
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

        PersonModel.findById({'_id': req.params.id }).populate(['gifts', 'holidays']).
        exec(function (err, person) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
            
            return res.send({
                success: true,
                person: person,
            });
        });         
    
    })(req, res, next)  
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
                            PersonModel.create(newPerson, function(err, item) {
                                if(!err){
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


 router.post('/create_holiday',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
        if(user)
            {                         
             HolidayModel.find({'name': req.body.holiday.name} , function (err, holidays) {
                 if (err) {
                     res.statusCode = 500;
                     log.error('Internal error(%d): %s',res.statusCode,err.message);
                     return res.send({ error: 'Server error' });
                 } else {
                     PersonModel.find({'name': req.body.personName} , function (err, people) {
                         if (err) {
                             res.statusCode = 500;
                             log.error('Internal error(%d): %s',res.statusCode,err.message);
                             return res.send({ error: 'Server error' });
                         } else {
                             if(people.length == 1){ 
                                 person = people[0];                                   
                                // if(holidays.length === 0)
                                // {             
                                     var newHoliday = {
                                         name: req.body.holiday.name,
                                         holidayDate: req.body.holiday.holidayDate
                                     };
                                     HolidayModel.create(newHoliday, function(err, item) {
                                         if(!err){
                                             person.holidays.push(item._id);
                                             person.save();
                                             return res.send({
                                                 success: true,
                                                 holiday: item});
                                         }
                                         
                                     });
                              //   }
                             }
                         }
                     });
 
                 }
             }); 
           } else {
               return res.send({error: "User don't found!"});
           }          
       }
   } )(req, res, next)  
 });




module.exports = router;