const mongoose = require('mongoose');
const { Schema } = mongoose;

const TrialClassNewUserSchema = new Schema ({
    userID: String,
    name: String,
    email: String,
    phone: String,
    cardName: String,
    cardNum: String,
    cardExpDate: String,
    workshopDate: String,
    workshopTime: String
});

const ResModel = mongoose.model('TrialClassNewUser', TrialClassNewUserSchema, 'trialClassNewUser');

module.exports = ResModel;