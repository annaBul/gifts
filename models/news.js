var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var News = new Schema({
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
    }
});

var NewsModel = mongoose.model('News', News);
module.exports = NewsModel;