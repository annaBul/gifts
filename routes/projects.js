var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose  = require('mongoose');
var ProjectModel =  require('../models').ProjectModel;
var UserModel =  require('../models').UserModel;
var CommentModel =  require('../models').CommentModel;
var jwt  = require('jsonwebtoken');
var passport = require('../services/passport');


router.get('/projects/popular', function(req, res, next) {
    ProjectModel.find({$where: "this.supporters.length >= 0" }).populate('author').
    exec( function (err, projects) {
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(projects)
            {                       
                    return res.send({
                        success: true,
                        popularProjects: projects});

            } else {
                return res.send({error: "Project don't found!"});
            }          
        }
    });
});

router.get('/projects/recent', function(req, res, next) {   
    var date = new Date((new Date).getTime() - 1000*60*60*24*3);
    ProjectModel.find({'createdDate': {"$gt": date}}).populate('author').
    exec( function (err, projects) {
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(projects)
            {                       
                    return res.send({
                        success: true,
                        recentProjects: projects});

            } else {
                return res.send({error: "Project don't found!"});
            }          
        }
    });
});


router.get('/projects/recent', function(req, res, next) {   
    var date = new Date((new Date).getTime() - 1000*60*60*24*1);
    ProjectModel.find({'createdDate': {"$gt": date}}).populate('author').
    exec( function (err, projects) {
        if (err) {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        } else {
            if(projects)
            {                       
                    return res.send({
                        success: true,
                        recentProjects: projects});

            } else {
                return res.send({error: "Project don't found!"});
            }          
        }
    });
});

module.exports = router;
