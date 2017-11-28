var mongoose = require("mongoose");
var UserModel = require("./user").UserModel;
var PersonModel = require("./person").PersonModel;
var GiftModel = require("./gift").GiftModel;
var HolidayModel = require("./holiday").HolidayModel;
var UserSchema = require("./user").UserSchema;
var PersonSchema = require("./person").PersonSchema;
var GiftSchema = require("./gift").GiftSchema;
var HolidaySchema = require("./holiday").HolidaySchema;

module.exports = {
    UserModel,
    PersonModel,
    GiftModel,
    HolidayModel,
    UserSchema,
    PersonSchema,
    GiftSchema,
    HolidaySchema,
};
