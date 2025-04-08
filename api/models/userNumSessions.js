const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserNumSessionsSchema = new Schema ({
    userID: String,
    workshopID: String,
    numOfSessions: String
});

const ResModel = mongoose.model('userNumSessions', UserNumSessionsSchema, 'userNumSessions');

module.exports = ResModel;