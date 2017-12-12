var mongoose = require("mongoose");
var crypto = require('crypto');
var Schema = mongoose.Schema;


//maube need category of gift
var Gift = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    href: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: String,
        default: 'http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg',
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "user-gift"
    }
   /* price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        default: "BYN"
    },*/
});

var GiftModel = mongoose.model('Gift', Gift);
module.exports.GiftModel = GiftModel;
module.exports.GiftSchema = Gift;