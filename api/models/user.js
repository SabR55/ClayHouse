const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    userID: String,
    userName: String,
    userEmail: String,
    userPhone: String,
    userPassword: String,
    userCreditCard: String
});

const ResModel = mongoose.model('users', UserSchema, 'users');

module.exports = ResModel;