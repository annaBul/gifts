var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = require('./user').UserSchema;
var UserModel =  mongoose.model('User', UserSchema);
//var ProjectSchema = docs.ProjectSchema;
//var ProjectModel =  mongoose.model('Project', ProjectSchema);

var Comment = new Schema({
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId, 
        ref: 'Project',
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
});

var CommentModel = mongoose.model('Comment', Comment);
module.exports.CommentModel = CommentModel;
module.exports.CommentSchema = Comment;;