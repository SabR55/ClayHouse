const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserBookingsSchema = new Schema ({
    userID: String,
    workshopID: String,
    workshopDate: String,
    workshopTime: String
});

const ResModel = mongoose.model('userBookings', UserBookingsSchema, 'userBookings');

module.exports = ResModel;