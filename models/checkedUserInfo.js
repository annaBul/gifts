var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CheckedUserInfo = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    passportUrl: {
        type: String,
        required: true
    },
    resume: {
        type: String,        
    },
    comments: {
        type: String,        
    },
});

var CheckedUserInfoModel = mongoose.model('CheckedUserInfo', CheckedUserInfo);
module.exports = CheckedUserInfoModel;