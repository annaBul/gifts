var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = require('./user').UserSchema;
var UserModel =  mongoose.model('User', UserSchema);

var Supporter = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId, 
        ref: 'Project',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    contribution: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "BYN"
    },
});

var SupporterModel = mongoose.model('Supporter', Supporter);
module.exports.SupporterModel = SupporterModel;
module.exports.SupporterShema = Supporter;