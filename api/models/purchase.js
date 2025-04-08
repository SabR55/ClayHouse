const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserPurchasesSchema = new Schema ({
    userID: String,
    workshopID: String,
    purchaseDate: String,
    cost: String
});

const ResModel = mongoose.model('userPurchases', UserPurchasesSchema, 'userPurchases');

module.exports = ResModel;