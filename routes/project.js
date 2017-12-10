var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var ProjectModel =  require('../models').ProjectModel;
var UserModel =  require('../models').UserModel;
var CommentModel =  require('../models').CommentModel;
var SupporterModel =  require('../models').SupporterModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');


router.get('/project/:title', function(req, res, next) {
    if(!req.params.title){
        return res.send({ error: 'Incorrected data' });
    }
        ProjectModel.findOne({'title': req.params.title}).populate('author').
        exec( function (err, project) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                if(project)
                {   
                        
                        return res.send({
                            success: true,
                            project: project,
                            authorName: project.author.username});

                } else {
                    return res.send({error: "Project don't found!"});
                }          
            }
        });
});


router.post('/create_project',function(req, res, next) {    
    passport.authenticate('jwt', function (err, user) {         
       if (err) {
           res.statusCode = 500;
           console.log('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       } else {
           if(user)
           {   
                        
                ProjectModel.find({'title': req.body.title} , function (err, projects) {
                    if (err) {
                        res.statusCode = 500;
                        log.error('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        if(projects.length === 0)
                        {                
                            
                            var newProject = {
                                title: req.body.title,
                                description: req.body.description,
                                budget:req.body.budget,
                                imageUrl:req.body.imageUrl,
                                completionDate: req.body.completionDate,
                                author: user.id
                            };
                                                        
                            ProjectModel.create(newProject, function(err, item) {
                                if(!err){

                                    user.projects.push(item._id);
                                    user.save();
                                    return res.send({
                                        success: true,
                                        project: newProject});
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

router.get('/project/:title/comments', function(req, res, next) {
    if(!req.params.title){
        return res.send({ error: 'Incorrected data' });
    }
        ProjectModel.findOne({'title': req.params.title} , function (err, project) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                if(project)
                {                
                    CommentModel.find({'project': project.id }).populate('author').
                    exec(function (err, comments) {
                        if (err) {
                            res.statusCode = 500;
                            console.log('Internal error(%d): %s',res.statusCode,err.message);
                            return res.send({ error: 'Server error' });
                        }
                        
                        return res.send({
                            success: true,
                            comments: comments,
                        });
                    });

                } else {
                    return res.send({error: "Project don't found!"});
                }          
            }
        });
});


router.post('/project/:title/add_comment', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {    
        if (err) {
            res.statusCode = 401;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
        ProjectModel.findOne({'title': req.params.title} , function (err, project) {
            if (err) {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else { 
                var newComment = {
                    author: user.id,
                    content: req.body.content,
                    project: project.id,
                };

                CommentModel.create(newComment, function(err, item) {
                    if(err){
                        res.statusCode = 500;
                        console.log('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        project.comments.push(item);
                        project.save();

                        item.author.username = user.username;
                        return res.send({
                            success: true,
                            comment: item});
                    }
                    
                });
                     
            }
        });
    } )(req, res, next)  
});


router.get('/project/:title/supporters', function(req, res, next) {
    if(!req.params.title){
        return res.send({ error: 'Incorrected data' });
    }
        ProjectModel.findOne({'title': req.params.title} , function (err, project) {
            if (err) {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else {
                if(project)
                {                
                    SupporterModel.find({'project': project.id }).populate('user').
                    exec(function (err, supporters) {
                        if (err) {
                            res.statusCode = 500;
                            console.log('Internal error(%d): %s',res.statusCode,err.message);
                            return res.send({ error: 'Server error' });
                        }
                        
                        return res.send({
                            success: true,
                            supporters: supporters,
                        });
                    });

                } else {
                    return res.send({error: "Project don't found!"});
                }          
            }
        });
});


router.post('/project/:title/add_supporter', function(req, res, next) {
    passport.authenticate('jwt', function (err, user) {    
        if (err) {
            res.statusCode = 401;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
        ProjectModel.findOne({'title': req.params.title} , function (err, project) {
            if (err) {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            } else { 
                
                var newSupporter = {
                    user: user._id,
                    contribution: req.body.contribution,
                    project: project.id,
                };
                if(req.body.currency){
                    newSupporter.currency = req.body.currency;
                }

                SupporterModel.create(newSupporter, function(err, item) {
                    if(err){
                        res.statusCode = 500;
                        console.log('Internal error(%d): %s',res.statusCode,err.message);
                        return res.send({ error: 'Server error' });
                    } else {
                        project.supporters.push(item);
                        project.totalBudget += item.contribution;
                        project.save();

                        return res.send({
                            success: true,
                            supporter: item});
                    }
                    
                });
                     
            }
        });
    } )(req, res, next)  
});


module.exports = router;

/*
router.post('/create_project', function(req, res, next) {
    if(!req.body.title || !req.body.description || !req.body.budget){
        return res.send({ error: 'Incorrected data' });
    }
    ProjectModel.find({'title': req.body.title} , function (err, projects) {
        if (err) {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(projects.length === 0)
            {                
                
                var newProject = {
                    title: req.body.title,
                    description: req.body.description,
                    budget:req.body.budget,

                };
                
                
                ProjectModel.create(newProject, function(err, item) {
                    if(!err){
                        return res.send({
                            success: true,
                            project: newProject});
                    }
                    
                });
            } else {
                return res.send({error: 'Project exists!'});
            }          
        }
    });
});
*/