var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;

var GiftSchema = require('./gift').GiftSchema;
var GiftModel =  mongoose.model('Gift', GiftSchema);

var Holiday = new Schema({
    name: {
        type: String,
        required: true,
    },
    person:{
        type: Schema.Types.ObjectId, 
    },
    user:{
        type: Schema.Types.ObjectId, 
    },
    description: {
        type: String,
    },
    holidayDate: {
        type: Date,
    },
    gifts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Gift',
    }],
});

var HolidayModel = mongoose.model('Holiday', Holiday);
module.exports.HolidayModel = HolidayModel;
module.exports.HolidaySchema = Holiday;