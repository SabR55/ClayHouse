const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardDetailsSchema = new Schema ({
    userID: String,
    userCardNum: String,
    userCardName: String,
    userCardExpDate: String,
});

const ResModel = mongoose.model('userCard', CardDetailsSchema, 'usersCard');

module.exports = ResModel;