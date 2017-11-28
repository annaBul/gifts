var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;

var PersonSchema = require('./person').PersonSchema;
var PersonModel =  mongoose.model('Person', PersonSchema);
var GiftSchema = require('./gift').GiftSchema;
var GiftModel =  mongoose.model('Gift', GiftSchema);

var User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,        
        default: 'User',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        default: 'http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg',
    },
    people: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Person',
    }],
    favorites: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Gift',        
    }],
});

User.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(128).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

var UserModel = mongoose.model('users', User);

module.exports.UserModel = UserModel;
module.exports.UserSchema = User;