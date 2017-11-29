var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;
var schemes = require('./index');

var GiftSchema = require('./gift').GiftSchema;
var GiftModel =  mongoose.model('Gift', schemes.GiftSchema);
var HolidaySchema = require('./holiday').HolidaySchema;
var HolidayModel =  mongoose.model('Holiday', schemes.HolidaySchema);

var Person = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthDay: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        default: 'http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg',
    },
    description: {
        type: String,
    },
    gifts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Gift',
    }],
    holidays: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Holiday',
    }],

});

var PersonModel = mongoose.model('Person', Person);
module.exports.PersonModel = PersonModel;
module.exports.PersonSchema = Person;